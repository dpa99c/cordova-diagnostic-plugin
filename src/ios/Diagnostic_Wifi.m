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

// UserDefaults key for caching local network permission
static NSString*const kLocalNetworkPermissionKey = @"Diagnostic_LocalNetworkPermission";

typedef NS_ENUM(NSInteger, LocalNetworkPermissionState) {
    LocalNetworkPermissionStateUnknown = 0,
    LocalNetworkPermissionStateGranted = 1,
    LocalNetworkPermissionStateDenied = -1,
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

            if(self->_isRequesting){
                // A request is already in progress so await the result
                [diagnostic logDebug:@"A request is already in progress, will return result when done"];
                return;
            }

            // Create parameters, and allow browsing over peer-to-peer link.
            if (@available(iOS 14.0, *)) {
                // Create parameters, and allow browsing over peer-to-peer link.
                nw_parameters_t parameters = nw_parameters_create_secure_tcp(NW_PARAMETERS_DISABLE_PROTOCOL, NW_PARAMETERS_DEFAULT_CONFIGURATION);
                nw_parameters_set_include_peer_to_peer(parameters, true);
                
                // Browse for a custom service type.
                nw_browse_descriptor_t descriptor =
                nw_browse_descriptor_create_bonjour_service("_bonjour._tcp", NULL);
                self->_browser = nw_browser_create(descriptor, parameters);
                
                nw_browser_set_queue(self->_browser, dispatch_get_main_queue());
                
                self->_netService = [[NSNetService alloc] initWithDomain:@"local." type:@"_lnp._tcp." name:@"LocalNetworkPrivacy" port:1100];
                
                self->_isRequesting = YES;
                self->_isPublishing = NO;

               [diagnostic logDebug:@"Starting local network permission status check"];
                // Start the browsing/publish flow on the main queue immediately and create a single-shot timeout.
                dispatch_async(dispatch_get_main_queue(), ^{
                    __weak __typeof__(self) weakSelf = self;

                    __strong __typeof__(weakSelf) strongSelf = weakSelf;
                    if (!strongSelf) return;

                    // Ensure we only start once for this check
                    if (strongSelf->_isPublishing) {
                        [diagnostic logDebug:@"Local network permission request already publishing, skipping start"];
                        return;
                    }

                    strongSelf->_isPublishing = YES;
                    strongSelf->_netService.delegate = strongSelf;

                    // Install a state handler so the browser emits state changes (silences the warning about missing handlers)
                    if (strongSelf->_browser) {
                        nw_browser_set_state_changed_handler(strongSelf->_browser, ^(nw_browser_state_t newState, nw_error_t error) {
                            switch (newState) {
                                case nw_browser_state_failed:
                                    if (error) {
                                        nw_error_domain_t errorDomain = nw_error_get_error_domain(error);
                                        [diagnostic logDebug:[NSString stringWithFormat:@"Browser failed (status check): domain=%d", (int)errorDomain]];
                                    }
                                    break;
                                case nw_browser_state_ready:
                                case nw_browser_state_cancelled:
                                case nw_browser_state_waiting:
                                default:
                                    break;
                            }
                        });

                        nw_browser_start(strongSelf->_browser);
                    } else {
                        [diagnostic logDebug:@"Attempted to start browser but browser is null"];
                    }

                    [strongSelf->_netService publish];
                    [strongSelf->_netService scheduleInRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];

                    // Set a single-shot timeout to consider the permission request failed
                    strongSelf->_localNetworkTimer = [NSTimer scheduledTimerWithTimeInterval:2.0
                                                                                       repeats:NO
                                                                                         block:^(NSTimer * _Nonnull timer) {
                        __strong __typeof__(weakSelf) innerSelf = weakSelf;
                        if (!innerSelf) return;

                        [diagnostic logDebug:@"Local network permission request timed out"];
                        [self callLocalNetworkCallbacks:LocalNetworkPermissionStateDenied];
                        [innerSelf resetLocalNetwork];
                    }];
                });
            }else{
                [diagnostic logDebug:@"iOS version < 14.0, so local network permission is not required"];
                [self callLocalNetworkCallbacks:LocalNetworkPermissionStateGranted];
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
            if(self->_isRequesting){
                // A request is already in progress
                [diagnostic sendPluginError:@"A request is already in progress" :command];
                return;
            }
            self->_isRequesting = YES;

            // Store command so we can send the result later
            @synchronized(self->_localNetworkCommands) {
                [self->_localNetworkCommands addObject:command];
            }
            
            if (@available(iOS 14.0, *)) {
                // Create parameters, and allow browsing over peer-to-peer link.
                nw_parameters_t parameters = nw_parameters_create_secure_tcp(NW_PARAMETERS_DISABLE_PROTOCOL, NW_PARAMETERS_DEFAULT_CONFIGURATION);
                nw_parameters_set_include_peer_to_peer(parameters, true);
                
                // Browse for a custom service type.
                nw_browse_descriptor_t descriptor =
                nw_browse_descriptor_create_bonjour_service("_bonjour._tcp", NULL);
                self->_browser = nw_browser_create(descriptor, parameters);
                
                nw_browser_set_queue(self->_browser, dispatch_get_main_queue());
                
                __weak __typeof__(self) weakSelf = self;
                nw_browser_set_state_changed_handler(self->_browser, ^(nw_browser_state_t newState, nw_error_t error) {
                    __strong __typeof__(weakSelf) strongSelf = weakSelf;
                    switch (newState) {
                        case nw_browser_state_failed:
                            if (error) {
                                nw_error_domain_t errorDomain = nw_error_get_error_domain(error);
                                [diagnostic logDebug:[NSString stringWithFormat:@"Browser failed: domain=%d", (int)errorDomain]];
                            }
                            break;
                        case nw_browser_state_ready:
                        case nw_browser_state_cancelled:
                            break;
                        case nw_browser_state_waiting:
                            if (error) {
                                nw_error_domain_t errorDomain = nw_error_get_error_domain(error);
                                [diagnostic logDebug:[NSString stringWithFormat:@"Local network permission has been denied: domain=%d", (int)errorDomain]];
                            } else {
                                [diagnostic logDebug:@"Local network permission has been denied"];
                            }
                            [strongSelf resetLocalNetwork];
                            // cache denied
                            [[NSUserDefaults standardUserDefaults] setInteger:LocalNetworkPermissionStateDenied forKey:kLocalNetworkPermissionKey];
                            [[NSUserDefaults standardUserDefaults] synchronize];
                            // send false result to all waiting commands
                            [self callLocalNetworkCallbacks:LocalNetworkPermissionStateDenied];
                            break;
                        default:
                            break;
                    }
                });
                
                self->_netService = [[NSNetService alloc] initWithDomain:@"local." type:@"_lnp._tcp." name:@"LocalNetworkPrivacy" port:1100];
                self->_netService.delegate = self;
                
                // Start browsing on main queue
                nw_browser_start(self->_browser);
                [self->_netService publish];
                // the netService needs to be scheduled on a run loop, in this case the main runloop
                [self->_netService scheduleInRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
            }else{
                // iOS version < 14.0, so local network permission is not required
                [self callLocalNetworkCallbacks:LocalNetworkPermissionStateGranted];
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
    [diagnostic logDebug:@"netServiceDidPublish: Local network permission has been granted"];
    [self resetLocalNetwork];
    if (_localNetworkTimer) {
        [_localNetworkTimer invalidate];
        _localNetworkTimer = nil;
    }
    _isPublishing = NO;
    
    // cache granted
    [[NSUserDefaults standardUserDefaults] setInteger:LocalNetworkPermissionStateGranted forKey:kLocalNetworkPermissionKey];
    [[NSUserDefaults standardUserDefaults] synchronize];

    [self callLocalNetworkCallbacks:LocalNetworkPermissionStateGranted];
}
@end
