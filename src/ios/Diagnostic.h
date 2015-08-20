//
//  Diagnostic.h
//  Plugin diagnostic
//
//  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
//

#import <Cordova/CDV.h>
#import <CoreBluetooth/CoreBluetooth.h>


@interface Diagnostic : CDVPlugin <CBCentralManagerDelegate>

    @property (nonatomic, retain) CBCentralManager *bluetoothManager;
    @property (nonatomic) BOOL bluetoothEnabled;

- (void) isLocationEnabled: (CDVInvokedUrlCommand*)command;
- (void) isLocationEnabledSetting: (CDVInvokedUrlCommand*)command;
- (void) switchToLocationSettings: (CDVInvokedUrlCommand*)command;
- (void) isLocationAuthorized: (CDVInvokedUrlCommand*)command;
- (void) isLocationAuthorizedAlways: (CDVInvokedUrlCommand*)command;
- (void) isWifiEnabled: (CDVInvokedUrlCommand*)command;
- (void) isCameraEnabled: (CDVInvokedUrlCommand*)command;
- (void) isBluetoothEnabled: (CDVInvokedUrlCommand*)command;

@end
