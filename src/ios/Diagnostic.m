//
//  Diagnostic.m
//  Plugin diagnostic
//
//  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
//

#import "Diagnostic.h"
#import <CoreLocation/CoreLocation.h>

#import <arpa/inet.h> // For AF_INET, etc.
#import <ifaddrs.h> // For getifaddrs()
#import <net/if.h> // For IFF_LOOPBACK



@implementation Diagnostic

- (void)pluginInitialize {

    NSLog(@"RFduino Cordova Plugin");
    NSLog(@"(c)2013-2015 Don Coleman");

    [super pluginInitialize];

    self.bluetoothManager = [[CBCentralManager alloc]
                             initWithDelegate:self
                             queue:dispatch_get_main_queue()
                             options:@{CBCentralManagerOptionShowPowerAlertKey: @(NO)}];
}

- (void) isLocationEnabled: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading Location status...");
    CDVPluginResult* pluginResult;
    if([self isLocationEnabled] && [self isLocationAuthorized]) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void) isLocationEnabledSetting: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading Location status...");
    CDVPluginResult* pluginResult;
    if([self isLocationEnabled]) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    }
    else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void) switchToLocationSettings: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Switch To Location Settings not available...");
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void) isLocationAuthorized: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading Location authentication...");
    CDVPluginResult* pluginResult;
    if([self isLocationAuthorized]) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    } else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (void) isLocationAuthorizedAlways: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading Location authentication for always...");
    CDVPluginResult* pluginResult;
    if([self isLocationAuthorizedAlways]) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    } else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}

- (BOOL) isLocationEnabled
{

    if([CLLocationManager locationServicesEnabled]) {
        NSLog(@"Location is enabled.");
        return true;
    } else {
        NSLog(@"Location is disabled.");
        return false;
    }


}

- (BOOL) isLocationAuthorizedAlways
{

    CLAuthorizationStatus authStatus = [CLLocationManager  authorizationStatus];
    if(authStatus == kCLAuthorizationStatusAuthorizedAlways) {
        NSLog(@"This app is authorized to use location always.");
        return true;
    } else {
        NSLog(@"This app is not authorized to use location always.");
        return false;
    }

}

- (BOOL) isLocationAuthorized
{

    if([CLLocationManager  authorizationStatus] != kCLAuthorizationStatusDenied) {
        NSLog(@"This app is authorized to use location.");
        return true;
    } else {
        NSLog(@"This app is not authorized to use location.");
        return false;
    }

}


- (void) isWifiEnabled: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading WiFi status...");
    CDVPluginResult* pluginResult;
    if([self connectedToWifi]) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    } else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

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

                NSLog(@"Wifi ON");
                wiFiAvailable = YES;
                break;

            }

        }

        cursor = cursor -> ifa_next;
    }

    freeifaddrs(addresses);
    return wiFiAvailable;
}

- (void) isCameraEnabled: (CDVInvokedUrlCommand*)command
{
    NSLog(@"Loading camera status...");
    CDVPluginResult* pluginResult;
    if([self isCameraEnabled]) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    }
    else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}


- (BOOL) isCameraEnabled
{

    BOOL cameraAvailable =
    [UIImagePickerController
     isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera];
    if(cameraAvailable) {
        NSLog(@"Camera enabled");
        return true;
    }
    else {
        NSLog(@"Camera disabled");
        return false;
    }

}

- (void) isBluetoothEnabled: (CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult;
    if(self.bluetoothEnabled) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:1];

    } else {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:0];

    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

}


#pragma mark - CBCentralManagerDelegate

- (void) centralManagerDidUpdateState:(CBCentralManager *)central {

    if ([central state] == CBCentralManagerStatePoweredOn) {
        NSLog(@"Bluetooth enabled");
        self.bluetoothEnabled = true;
    }
    else {
        NSLog(@"Bluetooth disabled or unavailable");
        self.bluetoothEnabled = false;
    }
}



@end
