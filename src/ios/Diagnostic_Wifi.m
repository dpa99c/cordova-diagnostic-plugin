/*
 *  Diagnostic_Wifi.m
 *  Diagnostic Plugin - Wifi Module
 *
 *  Copyright (c) 2018 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 */

#import "Diagnostic_Wifi.h"

#import <arpa/inet.h> // For AF_INET, etc.
#import <ifaddrs.h> // For getifaddrs()
#import <net/if.h> // For IFF_LOOPBACK
#import <Network/Network.h>
#import <Network/browser.h>
#import <dns_sd.h>
#import <errno.h>

// UserDefaults key for caching local network permission
static NSString*const kLocalNetworkPermissionKey = @"Diagnostic_LocalNetworkPermission";

typedef NS_ENUM(NSInteger, LocalNetworkPermissionState) {
    LocalNetworkPermissionStateUnknown = 0,
    LocalNetworkPermissionStateGranted = 1,
    LocalNetworkPermissionStateDenied = -1,
    LocalNetworkPermissionStateIndeterminate = -2,
};
@implementation Diagnostic_Wifi {
    nw_browser_t _browser;
    NSNetService *_netService;
    // Completion callbacks stored as CDV callbacks (we'll send results to all when done)
    NSMutableArray<CDVInvokedUrlCommand*> *_localNetworkCommands;
    NSTimer* _localNetworkTimer;
    
    // If we have a cached granted/denied value, fall through to the normal path which will verify current status
    // (this may trigger a prompt only if requestLocalNetworkAuthorization was previously called).
    BOOL _isPublishing;

    BOOL _isRequesting;
}

// Internal reference to Diagnostic singleton instance
static Diagnostic* diagnostic;

// Internal constants
static NSString*const LOG_TAG = @"Diagnostic_Wifi[native]";
static NSTimeInterval const kLocalNetworkDefaultTimeoutSeconds = 30.0; // Default timeout for local network permission flow, after which we'll return indeterminate if we haven't received a response. This is needed to prevent hanging requests in cases where delegate callbacks are not fired (e.g. due to iOS bugs or edge-case network conditions).
static const char* kLocalNetworkBonjourServiceTypeBrowse = "_lnp._tcp";
static NSString*const kLocalNetworkBonjourServiceTypePublish = @"_lnp._tcp.";
static NSString*const kLocalNetworkBonjourServiceDomain = @"local.";
static NSString*const kLocalNetworkBonjourServiceName = @"LocalNetworkPrivacy";
static NSInteger const kLocalNetworkBonjourServicePort = 1100;

- (void)pluginInitialize {
    
    [super pluginInitialize];

    diagnostic = [Diagnostic getInstance];
    // initialize commands array
    _localNetworkCommands = [NSMutableArray new];
}

/**************************************/
#pragma mark - Local Network Plugin API
/**************************************/

- (void) getLocalNetworkAuthorizationStatus: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {

            // Read cached permission state first
            NSInteger cached = [[NSUserDefaults standardUserDefaults] integerForKey:kLocalNetworkPermissionKey];
            LocalNetworkPermissionState state = (LocalNetworkPermissionState)cached;

            if (state == LocalNetworkPermissionStateUnknown) {
                // If unknown, do not attempt to start browsing/publishing (that would trigger the system prompt).
                // respond with NO (unauthorized) when never requested.
                [diagnostic sendPluginResultInt:LocalNetworkPermissionStateUnknown :command];
                [diagnostic logDebug:@"Local network permission status is NOT_REQUESTED"];
                return;
            }
        
            // Store command so we can send the result later
            @synchronized(self->_localNetworkCommands) {
                [self->_localNetworkCommands addObject:command];
            }

            BOOL requestInProgress = NO;
            @synchronized(self) {
                if (self->_isRequesting) {
                    requestInProgress = YES;
                } else {
                    self->_isRequesting = YES;
                    self->_isPublishing = NO;
                }
            }

            if(requestInProgress){
                // A request is already in progress so await the result
                [diagnostic logDebug:@"A request is already in progress, will return result when done"];
                return;
            }

            NSTimeInterval timeoutSeconds = [self resolveLocalNetworkTimeoutFromCommand:command];

            if (@available(iOS 14.0, *)) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Starting local network permission status check (timeout %.2fs)", timeoutSeconds]];
                [self startLocalNetworkAuthorizationFlowWithTimeout:timeoutSeconds context:@"status check"];
            }else{
                [diagnostic logDebug:@"iOS version < 14.0, so local network permission is not required"];
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateGranted shouldCache:YES];
            }
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

// This code is based on https://stackoverflow.com/a/67758105/2618437 with slight modifications
- (void) requestLocalNetworkAuthorization: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            BOOL requestInProgress = NO;
            @synchronized(self) {
                if (self->_isRequesting) {
                    requestInProgress = YES;
                } else {
                    self->_isRequesting = YES;
                    self->_isPublishing = NO;
                }
            }

            if(requestInProgress){
                // A request is already in progress
                [diagnostic sendPluginError:@"A request is already in progress" :command];
                return;
            }

            // Store command so we can send the result later
            @synchronized(self->_localNetworkCommands) {
                [self->_localNetworkCommands addObject:command];
            }
            
            if (@available(iOS 14.0, *)) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Starting local network authorization request (timeout %.2fs)", kLocalNetworkDefaultTimeoutSeconds]];
                [self startLocalNetworkAuthorizationFlowWithTimeout:kLocalNetworkDefaultTimeoutSeconds context:@"authorization request"];
            }else{
                // iOS version < 14.0, so local network permission is not required
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateGranted shouldCache:YES];
            }
        } @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) resetLocalNetwork
{
    [diagnostic logDebug:@"resetting"];
    // stop the timer if active so it doesn't keep firing
    if (_localNetworkTimer) {
        [_localNetworkTimer invalidate];
        _localNetworkTimer = nil;
    }

    // reset state flags
    self->_isPublishing = NO;
    self->_isRequesting = NO;

    if (_browser) {
        if (@available(iOS 13.0, *)) {
            nw_browser_cancel(_browser);
        }
        _browser = nil;
    }
    if (_netService) {
        [_netService stop];
        _netService = nil;
    }
}

- (void) callLocalNetworkCallbacks:(LocalNetworkPermissionState)result
{
    @synchronized(self->_localNetworkCommands) {
        for (CDVInvokedUrlCommand *c in self->_localNetworkCommands) {
            [diagnostic sendPluginResultInt:(int)result :c];
        }
        [self->_localNetworkCommands removeAllObjects];
    }
}

- (void)completeLocalNetworkFlowWithState:(LocalNetworkPermissionState)state shouldCache:(BOOL)shouldCache
{
    dispatch_block_t completion = ^{
        [self performLocalNetworkCallbackSafelyWithContext:@"flow completion" block:^{
            [self resetLocalNetwork];
            if (shouldCache && (state == LocalNetworkPermissionStateGranted || state == LocalNetworkPermissionStateDenied)) {
                [[NSUserDefaults standardUserDefaults] setInteger:state forKey:kLocalNetworkPermissionKey];
                [[NSUserDefaults standardUserDefaults] synchronize];
            }
            [self callLocalNetworkCallbacks:state];
        }];
    };

    if ([NSThread isMainThread]) {
        completion();
    } else {
        dispatch_async(dispatch_get_main_queue(), completion);
    }
}

- (NSTimeInterval)resolveLocalNetworkTimeoutFromCommand:(CDVInvokedUrlCommand*)command
{
    NSTimeInterval timeout = kLocalNetworkDefaultTimeoutSeconds;
    if (!command || !command.arguments || command.arguments.count == 0) {
        return timeout;
    }

    id rawValue = command.arguments[0];
    if (![rawValue isKindOfClass:[NSDictionary class]]) {
        return timeout;
    }

    NSDictionary *dict = (NSDictionary *)rawValue;
    id timeoutMsValue = dict[@"timeoutMs"];
    if ([timeoutMsValue isKindOfClass:[NSNumber class]]) {
        double milliseconds = [timeoutMsValue doubleValue];
        if (milliseconds < 0) {
            milliseconds = 0;
        }
        return milliseconds / 1000.0;
    }

    return timeout;
}

- (void)handleLocalNetworkCallbackException:(NSException *)exception context:(NSString *)context
{
    NSString *resolvedContext = context ?: @"local network callback";
    NSString *reason = exception.reason ?: @"No reason provided";
    [diagnostic logDebug:[NSString stringWithFormat:@"Caught exception in %@: %@ (%@)", resolvedContext, exception.name, reason]];

    [self resetLocalNetwork];

    @try {
        [self callLocalNetworkCallbacks:LocalNetworkPermissionStateIndeterminate];
    }
    @catch (NSException *fallbackException) {
        NSString *fallbackReason = fallbackException.reason ?: @"No reason provided";
        [diagnostic logDebug:[NSString stringWithFormat:@"Failed to send fallback local network callback after %@: %@ (%@)", resolvedContext, fallbackException.name, fallbackReason]];
    }
}

- (void)performLocalNetworkCallbackSafelyWithContext:(NSString *)context block:(dispatch_block_t)block
{
    @try {
        if (block) {
            block();
        }
    }
    @catch (NSException *exception) {
        [self handleLocalNetworkCallbackException:exception context:context];
    }
}

- (void)startLocalNetworkAuthorizationFlowWithTimeout:(NSTimeInterval)timeoutSeconds context:(NSString *)context
{
    dispatch_block_t startFlow = ^{
        NSString *operationContext = context ?: @"local network authorisation";
        [self performLocalNetworkCallbackSafelyWithContext:[NSString stringWithFormat:@"%@ setup", operationContext] block:^{
            if (!self->_isRequesting) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Ignoring %@ start because there is no active request", operationContext]];
                return;
            }

            if (self->_isPublishing) {
                [diagnostic logDebug:@"Local network permission request already publishing, skipping start"];
                return;
            }

            // Cancel any stale timer before starting a fresh flow.
            if (self->_localNetworkTimer) {
                [self->_localNetworkTimer invalidate];
                self->_localNetworkTimer = nil;
            }

            nw_parameters_t parameters = nw_parameters_create_secure_tcp(NW_PARAMETERS_DISABLE_PROTOCOL, NW_PARAMETERS_DEFAULT_CONFIGURATION);
            if (!parameters) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Failed to create network parameters for %@", operationContext]];
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
                return;
            }

            nw_parameters_set_include_peer_to_peer(parameters, true);

            nw_browse_descriptor_t descriptor = nw_browse_descriptor_create_bonjour_service(kLocalNetworkBonjourServiceTypeBrowse, NULL);
            if (!descriptor) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Failed to create browse descriptor for %@", operationContext]];
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
                return;
            }

            nw_browser_t browser = nw_browser_create(descriptor, parameters);
            if (!browser) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Failed to create browser for %@", operationContext]];
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
                return;
            }

            NSNetService *netService = [[NSNetService alloc] initWithDomain:kLocalNetworkBonjourServiceDomain
                                                                        type:kLocalNetworkBonjourServiceTypePublish
                                                                        name:kLocalNetworkBonjourServiceName
                                                                        port:(int)kLocalNetworkBonjourServicePort];
            if (!netService) {
                [diagnostic logDebug:[NSString stringWithFormat:@"Failed to create net service for %@", operationContext]];
                [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
                return;
            }

            self->_browser = browser;
            self->_netService = netService;
            self->_netService.delegate = self;
            self->_isPublishing = YES;

            __weak __typeof__(self) weakSelf = self;
            nw_browser_set_queue(browser, dispatch_get_main_queue());
            nw_browser_set_state_changed_handler(browser, ^(nw_browser_state_t newState, nw_error_t error) {
                __strong __typeof__(weakSelf) strongSelf = weakSelf;
                if (!strongSelf) {
                    return;
                }

                [strongSelf performLocalNetworkCallbackSafelyWithContext:[NSString stringWithFormat:@"%@ browser state", operationContext] block:^{
                    [strongSelf handleBrowserState:newState error:error context:operationContext];
                }];
            });

            nw_browser_start(browser);
            [netService publish];
            [netService scheduleInRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];

            if (timeoutSeconds > 0) {
                self->_localNetworkTimer = [NSTimer scheduledTimerWithTimeInterval:timeoutSeconds
                                                                            repeats:NO
                                                                              block:^(NSTimer * _Nonnull timer) {
                    __strong __typeof__(weakSelf) strongSelf = weakSelf;
                    if (!strongSelf) {
                        return;
                    }

                    [strongSelf performLocalNetworkCallbackSafelyWithContext:[NSString stringWithFormat:@"%@ timeout", operationContext] block:^{
                        [diagnostic logDebug:[NSString stringWithFormat:@"Local network %@ timed out after %.2fs", operationContext, timeoutSeconds]];
                        [strongSelf completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
                    }];
                }];
            }
        }];
    };

    if ([NSThread isMainThread]) {
        startFlow();
    } else {
        dispatch_async(dispatch_get_main_queue(), startFlow);
    }
}

- (BOOL)isPermissionDeniedError:(nw_error_t)error
{
	if (!error) {
		return NO;
	}

	nw_error_domain_t errorDomain = nw_error_get_error_domain(error);
	int errorCode = (int)nw_error_get_error_code(error);
	if (errorDomain == nw_error_domain_posix && errorCode == EPERM) {
		return YES;
	}

	if (errorDomain == nw_error_domain_dns && errorCode == kDNSServiceErr_PolicyDenied) {
		return YES;
	}

	return NO;
}

- (void)handleBrowserState:(nw_browser_state_t)newState error:(nw_error_t)error context:(NSString *)context
{
    if (newState == nw_browser_state_waiting || newState == nw_browser_state_failed) {
        if ([self isPermissionDeniedError:error]) {
            nw_error_domain_t domain = nw_error_get_error_domain(error);
            int code = (int)nw_error_get_error_code(error);
            [diagnostic logDebug:[NSString stringWithFormat:@"Local network permission denied during %@ (domain=%d, code=%d)", context, (int)domain, code]];
            [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateDenied shouldCache:YES];
            return;
        }

        if (error) {
            nw_error_domain_t domain = nw_error_get_error_domain(error);
            int code = (int)nw_error_get_error_code(error);
            [diagnostic logDebug:[NSString stringWithFormat:@"Local network browser %@ state %ld error domain=%d code=%d", context, (long)newState, (int)domain, code]];
        } else {
            [diagnostic logDebug:[NSString stringWithFormat:@"Local network browser %@ entered state %ld without error", context, (long)newState]];
        }

        if (newState == nw_browser_state_failed) {
            [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
        }
    }
}

/********************************/
#pragma mark - Wifi Plugin API
/********************************/

- (void) isWifiAvailable: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [diagnostic sendPluginResultBool:[self connectedToWifi] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) isWifiEnabled: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [diagnostic sendPluginResultBool:[self isWifiEnabled] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

/********************************/
#pragma mark - Internals
/********************************/

- (BOOL) isWifiEnabled {

    NSCountedSet * cset = [NSCountedSet new];

    struct ifaddrs *interfaces;

    if( ! getifaddrs(&interfaces) ) {
        for( struct ifaddrs *interface = interfaces; interface; interface = interface->ifa_next) {
            if ( (interface->ifa_flags & IFF_UP) == IFF_UP ) {
                [cset addObject:[NSString stringWithUTF8String:interface->ifa_name]];
            }
        }
    }

    return [cset countForObject:@"awdl0"] > 1 ? YES : NO;
}

- (BOOL) connectedToWifi  // Don't work on iOS Simulator, only in the device
{
    struct ifaddrs *addresses;
    struct ifaddrs *cursor;
    BOOL wiFiAvailable = NO;

    if (getifaddrs(&addresses) != 0) {
        return NO;
    }

    cursor = addresses;
    while (cursor != NULL)  {
        if (cursor -> ifa_addr -> sa_family == AF_INET && !(cursor -> ifa_flags & IFF_LOOPBACK)) // Ignore the loopback address
        {
            // Check for WiFi adapter
            if (strcmp(cursor -> ifa_name, "en0") == 0) {

                [diagnostic logDebug:@"Wifi ON"];
                wiFiAvailable = YES;
                break;
            }
        }
        cursor = cursor -> ifa_next;
    }
    freeifaddrs(addresses);
    return wiFiAvailable;
}


/********************************/
#pragma mark - NetServiceDelegate
/********************************/

- (void)netServiceDidPublish:(NSNetService *)sender {
    [self performLocalNetworkCallbackSafelyWithContext:@"netServiceDidPublish" block:^{
        [diagnostic logDebug:@"netServiceDidPublish: Local network permission has been granted"];
        [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateGranted shouldCache:YES];
    }];
}

- (void)netService:(NSNetService *)sender didNotPublish:(NSDictionary<NSString *,NSNumber *> *)errorDict {
    [self performLocalNetworkCallbackSafelyWithContext:@"netService didNotPublish" block:^{
        NSNumber *errorDomain = errorDict[NSNetServicesErrorDomain];
        NSNumber *errorCode = errorDict[NSNetServicesErrorCode];
        [diagnostic logDebug:[NSString stringWithFormat:@"netService didNotPublish (domain=%@, code=%@)", errorDomain, errorCode]];
        // NSNetService can fail to publish for many reasons unrelated to permissions (network issues,
        // name collisions, configuration problems, etc.). We cannot reliably determine permission denial
        // from NSNetService error codes alone, so return indeterminate. The browser state handler in
        // handleBrowserState will catch actual permission denials via isPermissionDeniedError.
        [self completeLocalNetworkFlowWithState:LocalNetworkPermissionStateIndeterminate shouldCache:NO];
    }];
}
@end
