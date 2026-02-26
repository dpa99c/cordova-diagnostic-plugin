/*
 *  Diagnostic_Bluetooth.m
 *  Diagnostic Plugin - Bluetooth Module
 *
 *  Copyright (c) 2018 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 */

#import "Diagnostic_Bluetooth.h"

@implementation Diagnostic_Bluetooth

// Internal reference to Diagnostic singleton instance
static Diagnostic* diagnostic;

// Internal constants
static NSString*const LOG_TAG = @"Diagnostic_Bluetooth[native]";

- (void)pluginInitialize {
    
    [super pluginInitialize];

    diagnostic = [Diagnostic getInstance];
}

/********************************/
#pragma mark - Plugin API
/********************************/

- (void) isBluetoothAvailable: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            NSString* state = [self getBluetoothState];
            bool bluetoothEnabled;
            if([state  isEqual: @"powered_on"]){
                bluetoothEnabled = true;
            }else{
                bluetoothEnabled = false;
            }
            [diagnostic sendPluginResultBool:bluetoothEnabled :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) getBluetoothState: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            NSString* state = [self getBluetoothState];
            [diagnostic logDebug:[NSString stringWithFormat:@"Bluetooth state is: %@", state]];
            [diagnostic sendPluginResultString:state:command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];

}

- (void) requestBluetoothAuthorization: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            
            NSString* authState = [self getAuthorizationStatus];
            
            if([authState isEqual:AUTHORIZATION_GRANTED]){
                [diagnostic sendPluginError:@"Bluetooth authorization is already granted" :command];
            }else if([authState isEqual:AUTHORIZATION_DENIED]){
                [diagnostic sendPluginError:@"Bluetooth authorization has been denied" :command];
            }else{ // AUTHORIZATION_NOT_DETERMINED
                [self ensureBluetoothManager]; // invoke Bluetooth manager to trigger permission dialog
                [diagnostic sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] :command];
            }
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

- (void) ensureBluetoothManager: (CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        @try {
            [self ensureBluetoothManager];
            [diagnostic sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK] :command];
        }
        @catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];

}

- (void) getAuthorizationStatus: (CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        @try {
            NSString* authState = [self getAuthorizationStatus];
            [diagnostic sendPluginResultString:authState :command];
        }@catch (NSException *exception) {
            [diagnostic handlePluginException:exception :command];
        }
    }];
}

/********************************/
#pragma mark - Internals
/********************************/

- (NSString*)getBluetoothState{
    NSString* state;
    NSString* description;

    [self ensureBluetoothManager];
    switch(self.bluetoothManager.state)
    {

        case CBManagerStateResetting:
            state = @"resetting";
            description =@"The connection with the system service was momentarily lost, update imminent.";
            break;

        case CBManagerStateUnsupported:
            state = @"unsupported";
            description = @"The platform doesn't support Bluetooth Low Energy.";
            break;

        case CBManagerStateUnauthorized:
            state = @"unauthorized";
            description = @"The app is not authorized to use Bluetooth Low Energy.";
            break;

        case CBManagerStatePoweredOff:
            state = @"powered_off";
            description = @"Bluetooth is currently powered off.";
            break;

        case CBManagerStatePoweredOn:
            state = @"powered_on";
            description = @"Bluetooth is currently powered on and available to use.";
            break;
        default:
            state = UNKNOWN;
            description = @"State unknown, update imminent.";
            break;
    }
    [diagnostic logDebug:[NSString stringWithFormat:@"Bluetooth state changed: %@",description]];


    return state;
}

- (void) ensureBluetoothManager {
    @synchronized(self) {
      if(![self.bluetoothManager isKindOfClass:[CBCentralManager class]]){
        self.bluetoothManager = [[CBCentralManager alloc]
                                 initWithDelegate:self
                                 queue:dispatch_get_main_queue()
                                 options:@{CBCentralManagerOptionShowPowerAlertKey: @(NO)}];
        [self centralManagerDidUpdateState:self.bluetoothManager]; // Send initial state
      }
    }
}

// https://stackoverflow.com/q/57238647/777265
- (NSString*) getAuthorizationStatus {
    NSString* authState;
    if (@available(iOS 13.0, *)){
        CBManagerAuthorization authorization;
        if(@available(iOS 13.1, *)){
            authorization = CBCentralManager.authorization;
        }else{
            // iOS 13.0 requires BT manager to be initialized in order to check authorization which results in BT permissions dialog if not already authorized
            [self ensureBluetoothManager];
            authorization = [self.bluetoothManager authorization];
        }
        
        switch(authorization){
            case CBManagerAuthorizationAllowedAlways:
                authState = AUTHORIZATION_GRANTED;
                break;
            case CBManagerAuthorizationDenied:
                authState = AUTHORIZATION_DENIED;
                break;
            case CBManagerAuthorizationRestricted:
                authState = AUTHORIZATION_DENIED;
                break;
            case CBManagerAuthorizationNotDetermined:
                authState = AUTHORIZATION_NOT_DETERMINED;
                break;
        }
    }else{
        // Device is running iOS <13.0 so doesn't require Bluetooth permission at run-time
        authState = AUTHORIZATION_GRANTED;
    }
    return authState;
}

/********************************/
#pragma mark - CBCentralManagerDelegate
/********************************/

- (void) centralManagerDidUpdateState:(CBCentralManager *)central {
    NSString* state = [self getBluetoothState];
    NSString* jsString = [NSString stringWithFormat:@"cordova.plugins.diagnostic.bluetooth._onBluetoothStateChange(\"%@\");", state];
    [diagnostic executeGlobalJavascript:jsString];
}

@end
