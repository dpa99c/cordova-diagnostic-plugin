/*
 *  Diagnostic_Notifications.m
 *  Diagnostic Plugin - Notifications Module
 *
 *  Copyright (c) 2018 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 */

#import "Diagnostic_Notifications.h"

@implementation Diagnostic_Notifications

// Internal reference to Diagnostic singleton instance
static Diagnostic* diagnostic;

// Internal constants
static NSString*const LOG_TAG = @"Diagnostic_Notifications[native]";

static NSString*const REMOTE_NOTIFICATIONS_ALERT = @"alert";
static NSString*const REMOTE_NOTIFICATIONS_SOUND = @"sound";
static NSString*const REMOTE_NOTIFICATIONS_BADGE = @"badge";

- (void)pluginInitialize {
    
    [super pluginInitialize];

    diagnostic = [Diagnostic getInstance];
}

/********************************/
#pragma mark - Plugin API
/********************************/

- (void) isRemoteNotificationsEnabled: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
            [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
                BOOL userSettingEnabled = settings.authorizationStatus == UNAuthorizationStatusAuthorized;
                [self isRemoteNotificationsEnabledResult:userSettingEnabled:command];
            }];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception:command];
        }
    }];
}
- (void) isRemoteNotificationsEnabledResult: (BOOL) userSettingEnabled : (CDVInvokedUrlCommand*)command
{
    [self _isRegisteredForRemoteNotifications:^(BOOL remoteNotificationsEnabled) {
        BOOL isEnabled = remoteNotificationsEnabled && userSettingEnabled;
        [diagnostic sendPluginResultBool:isEnabled:command];
    }];
}

- (void) getRemoteNotificationTypes: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
            [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
                BOOL alertsEnabled = settings.alertSetting == UNNotificationSettingEnabled;
                BOOL badgesEnabled = settings.badgeSetting == UNNotificationSettingEnabled;
                BOOL soundsEnabled = settings.soundSetting == UNNotificationSettingEnabled;
                BOOL noneEnabled = !alertsEnabled && !badgesEnabled && !soundsEnabled;
                [self getRemoteNotificationTypesResult:command:noneEnabled:alertsEnabled:badgesEnabled:soundsEnabled];
            }];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}
- (void) getRemoteNotificationTypesResult: (CDVInvokedUrlCommand*)command :(BOOL)noneEnabled :(BOOL)alertsEnabled :(BOOL)badgesEnabled :(BOOL)soundsEnabled
{
    NSMutableDictionary* types = [[NSMutableDictionary alloc]init];
    if(alertsEnabled) {
        [types setValue:@"1" forKey:REMOTE_NOTIFICATIONS_ALERT];
    } else {
        [types setValue:@"0" forKey:REMOTE_NOTIFICATIONS_ALERT];
    }
    if(badgesEnabled) {
        [types setValue:@"1" forKey:REMOTE_NOTIFICATIONS_BADGE];
    } else {
        [types setValue:@"0" forKey:REMOTE_NOTIFICATIONS_BADGE];
    }
    if(soundsEnabled) {
        [types setValue:@"1" forKey:REMOTE_NOTIFICATIONS_SOUND];
    } else {;
        [types setValue:@"0" forKey:REMOTE_NOTIFICATIONS_SOUND];
    }
    [diagnostic sendPluginResultString:[diagnostic objectToJsonString:types]:command];
}


- (void) isRegisteredForRemoteNotifications: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [self _isRegisteredForRemoteNotifications:^(BOOL registered) {
                [diagnostic sendPluginResultBool:registered :command];
            }];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) getRemoteNotificationsAuthorizationStatus: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
            [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
                NSString* status = UNKNOWN;
                UNAuthorizationStatus authStatus = settings.authorizationStatus;
                if(authStatus == UNAuthorizationStatusDenied){
                    status = AUTHORIZATION_DENIED;
                }else if(authStatus == UNAuthorizationStatusNotDetermined){
                    status = AUTHORIZATION_NOT_DETERMINED;
                }else if(authStatus == UNAuthorizationStatusAuthorized){
                    status = AUTHORIZATION_GRANTED;
                }else if(@available(iOS 12.0, *)) {
                    if(authStatus == UNAuthorizationStatusProvisional) {
                        status = AUTHORIZATION_PROVISIONAL;
                    }
                }else if (@available(iOS 14.0, *)) {
                    if(authStatus == UNAuthorizationStatusEphemeral) {
                        status = AUTHORIZATION_EPHEMERAL;
                    }
                }
                [diagnostic logDebug:[NSString stringWithFormat:@"Remote notifications authorization status is: %@", status]];
                [diagnostic sendPluginResultString:status:command];
            }];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception:command];
        }
    }];
}

- (void) requestRemoteNotificationsAuthorization: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            NSString* s_options = [command.arguments objectAtIndex:0];
            if([diagnostic isNull:s_options]){
                NSArray* a_options = [NSArray arrayWithObjects:REMOTE_NOTIFICATIONS_ALERT, REMOTE_NOTIFICATIONS_SOUND, REMOTE_NOTIFICATIONS_BADGE, nil];
                s_options = [diagnostic arrayToJsonString:a_options];
            }
            NSDictionary* d_options = [diagnostic jsonStringToDictionary:s_options];

            BOOL omitRegistration = [[command argumentAtIndex:1] boolValue];
            UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];

            [center getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
                UNAuthorizationStatus authStatus = settings.authorizationStatus;
                BOOL shouldAskForAuthorization = FALSE;
                
                if (authStatus == UNAuthorizationStatusNotDetermined) {
                    shouldAskForAuthorization = TRUE;
                } else if(@available(iOS 12,*)) {
                    if(authStatus == UNAuthorizationStatusProvisional) {
                        shouldAskForAuthorization = TRUE;
                    }
                } else if(@available(iOS 14,*)) {
                    if(authStatus == UNAuthorizationStatusEphemeral) {
                        shouldAskForAuthorization = TRUE;
                    }
                }
                
                if(shouldAskForAuthorization){
                    UNAuthorizationOptions options = UNAuthorizationOptionNone;
                    for(id key in d_options){
                        NSString* s_key = (NSString*) key;
                        if([s_key isEqualToString:REMOTE_NOTIFICATIONS_ALERT]){
                            options = options + UNAuthorizationOptionAlert;
                        }else if([s_key isEqualToString:REMOTE_NOTIFICATIONS_SOUND]){
                            options = options + UNAuthorizationOptionSound;
                        }else if([s_key isEqualToString:REMOTE_NOTIFICATIONS_BADGE]){
                            options = options + UNAuthorizationOptionBadge;
                        }
                    }

                    [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError * _Nullable error) {
                        if(error != nil){
                            [diagnostic sendPluginError:[NSString stringWithFormat:@"Error when requesting remote notifications authorization: %@", error] :command];
                        }else if (granted) {
                            [diagnostic logDebug:@"Remote notifications authorization granted"];
                            if(!omitRegistration){
                                dispatch_async(dispatch_get_main_queue(), ^{
                                    [[UIApplication sharedApplication] registerForRemoteNotifications];
                                    [diagnostic sendPluginResultString:AUTHORIZATION_GRANTED:command];
                                });
                            }else{
                                [diagnostic sendPluginResultString:AUTHORIZATION_GRANTED:command];
                            }
                        }else{
                            [diagnostic sendPluginError:@"Remote notifications authorization was denied" :command];
                        }
                    }];
                }else if(authStatus == UNAuthorizationStatusAuthorized){
                    [diagnostic logDebug:@"Remote notifications already authorized"];
                    if(!omitRegistration){
                        dispatch_async(dispatch_get_main_queue(), ^{
                            [[UIApplication sharedApplication] registerForRemoteNotifications];
                            [diagnostic sendPluginResultString:AUTHORIZATION_GRANTED:command];
                        });
                    }else{
                        [diagnostic sendPluginResultString:AUTHORIZATION_GRANTED:command];
                    }
                    [diagnostic sendPluginResultString:@"already_authorized":command];
                }else if(authStatus == UNAuthorizationStatusDenied){
                    [diagnostic sendPluginError:@"Remote notifications authorization is denied" :command];
                }
            }];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception:command];
        }
    }];
}

- (void) _isRegisteredForRemoteNotifications:(void (^)(BOOL result))completeBlock {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL registered = [UIApplication sharedApplication].isRegisteredForRemoteNotifications;
        if( completeBlock ){
            completeBlock(registered);
        }
    });
};

@end
