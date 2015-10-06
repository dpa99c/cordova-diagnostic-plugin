Cordova diagnostic plugin
=========================

* [Overview](#overview)
* [Installation](#installation)
* [Usage](#usage)
    * [Android and iOS](#android-and-ios)
        - [isLocationEnabled()](#islocationenabled)
        - [isWifiEnabled()](#iswifienabled)
        - [isCameraEnabled()](#iscameraenabled)
        - [isBluetoothEnabled()](#isbluetoothenabled)
    * [Android only](#android-only)
        - [isGpsLocationEnabled()](#isgpslocationenabled)
        - [isNetworkLocationEnabled()](#isnetworklocationenabled)
        - [switchToLocationSettings()](#switchtolocationsettings)
        - [switchToMobileDataSettings()](#switchtomobiledatasettings)
        - [switchToBluetoothSettings()](#switchtobluetoothsettings)
        - [switchToWifiSettings()](#switchtowifisettings)
        - [setWifiState()](#setwifistate)
        - [setBluetoothState()](#setbluetoothstate)
    * [iOS only](#ios-only)
        - [isLocationEnabledSetting()](#isLocationEnabledSetting)
        - [isLocationAuthorized()](#islocationauthorized)
        - [getLocationAuthorizationStatus()](#getlocationauthorizationstatus)
        - [requestLocationAuthorization()](#requestlocationauthorization)
        - [registerLocationAuthorizationStatusChangeHandler()](#registerlocationauthorizationstatuschangehandler)
        - [isCameraPresent()](#iscamerapresent)
        - [isCameraAuthorized()](#iscameraauthorized)
        - [getCameraAuthorizationStatus()](#getcameraauthorizationstatus)
        - [requestCameraAuthorization()](#requestcameraauthorization)
        - [isCameraRollAuthorized()](#iscamerarollauthorized)
        - [getCameraRollAuthorizationStatus()](#getcamerarollauthorizationstatus)
        - [requestCameraRollAuthorization()](#requestcamerarollauthorization)
        - [getBluetoothState()](#getbluetoothstate)
        - [registerBluetoothStateChangeHandler()](#registerbluetoothstatechangehandler)
        - [switchToSettings()](#switchtosettings)
* [Notes](#notes)
    * [Android permissions](#android-permissions)
* [Example project](#example-project)
* [Credits](#credits)

# Overview

This Cordova/Phonegap plugin for iOS and Android is used to check the state of the following device settings:

- Location
- WiFi
- Camera
- Bluetooth

The plugin also enables an app to show the relevant settings screen, to allow users to change the above device settings.

The plugin is registered in on [npm](https://www.npmjs.com/package/cordova.plugins.diagnostic) as `cordova.plugins.diagnostic`

# Installation

## Using the Cordova/Phonegap [CLI](http://docs.phonegap.com/en/edge/guide_cli_index.md.html)

    $ cordova plugin add cordova.plugins.diagnostic
    $ phonegap plugin add cordova.plugins.diagnostic

**NOTE**: Make sure your Cordova CLI version is 5.0.0+ (check with `cordova -v`). Cordova 4.x and below uses the now deprecated [Cordova Plugin Registry](http://plugins.cordova.io) as its plugin repository, so using a version of Cordova 4.x or below will result in installing an [old version](http://plugins.cordova.io/#/package/cordova.plugins.diagnostic) of this plugin.

## Using [Cordova Plugman](https://github.com/apache/cordova-plugman)

    $ plugman install --plugin=cordova.plugins.diagnostic --platform=<platform> --project=<project_path> --plugins_dir=plugins

For example, to install for the Android platform

    $ plugman install --plugin=cordova.plugins.diagnostic --platform=android --project=platforms/android --plugins_dir=plugins

## PhoneGap Build
Add the following xml to your config.xml to use the latest version of this plugin from [npm](https://www.npmjs.com/package/cordova.plugins.diagnostic):

    <gap:plugin name="cordova.plugins.diagnostic" source="npm" />

# Usage

The plugin is exposed via the `cordova.plugins.diagnostic` object and provides the following functions:

## Android and iOS

### isLocationEnabled()

Checks if app is able to access device location.

    cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback);

On iOS this returns true if both the device setting for Location Services is ON, AND the application is authorized to use location.
When location is enabled, the locations returned are by a mixture GPS hardware, network triangulation and Wifi network IDs.

On Android, this returns true if Location mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
When location is enabled, the locations returned are dependent on the location mode:

* Battery saving = network triangulation and Wifi network IDs (low accuracy)
* Device only = GPS hardware only (high accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful. 
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
        console.log("Location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isWifiEnabled()

Checks if Wifi is connected/enabled.
On iOS this returns true if the device is connected to a network by WiFi.
On Android this returns true if the WiFi setting is set to enabled.

On Android this requires permission `<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`

    cordova.plugins.diagnostic.isWifiEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isWifiEnabled(function(enabled){
        console.log("WiFi is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### isCameraEnabled()

Checks if the device has a camera.
On Android this returns true if the device has a camera.
On iOS this returns true if both the device has a camera AND the application is authorized to use it.

    cordova.plugins.diagnostic.isCameraEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraEnabled(function(exists){
        console.log("Device " + (exists ? "does" : "does not") + " have a camera");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isBluetoothEnabled()

Checks if the device has Bluetooth capabilities and if so that Bluetooth is switched on (same on Android and iOS)

On Android this requires permission `<uses-permission android:name="android.permission.BLUETOOTH" />`

    cordova.plugins.diagnostic.isBluetoothEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isBluetoothEnabled(function(enabled){
        console.log("Bluetooth is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

## Android only

### isGpsLocationEnabled()

Checks if location mode is set to return high-accuracy locations from GPS hardware.

    cordova.plugins.diagnostic.isGpsLocationEnabled(successCallback, errorCallback);

Returns true if Location mode is enabled and is set to either:

* Device only = GPS hardware only (high accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isNetworkLocationEnabled()

Checks if location mode is set to return low-accuracy locations from network triangulation/WiFi access points.

    cordova.plugins.diagnostic.isNetworkLocationEnabled(successCallback, errorCallback);

Returns true if Location mode is enabled and is set to either:

* Battery saving = network triangulation and Wifi network IDs (low accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNetworkLocationEnabled(function(enabled){
        console.log("Network location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### switchToLocationSettings()

Displays the device location settings to allow user to enable location services/change location mode.

    cordova.plugins.diagnostic.switchToLocationSettings();

### switchToMobileDataSettings()

Displays mobile settings to allow user to enable mobile data.

    cordova.plugins.diagnostic.switchToMobileDataSettings();

### switchToBluetoothSettings()

Displays Bluetooth settings to allow user to enable Bluetooth.

    cordova.plugins.diagnostic.switchToBluetoothSettings();


### switchToWifiSettings()

Displays WiFi settings to allow user to enable WiFi.

    cordova.plugins.diagnostic.switchToWifiSettings();

### setWifiState()

Enables/disables WiFi on the device.

    cordova.plugins.diagnostic.setWifiState(successCallback, errorCallback, state);

Requires the following permissions:

    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>

#### Parameters

- {Function} successCallback - function to call on successful setting of WiFi state
- {Function} errorCallback - function to call on failure to set WiFi state.
- {Boolean} state - WiFi state to set: TRUE for enabled, FALSE for disabled.


#### Example usage

    cordova.plugins.diagnostic.setWifiState(function(){
        console.log("Wifi was enabled");
    }, function(error){
        console.error("The following error occurred: "+error);
    },
    true);

### setBluetoothState()

Enables/disables Bluetooth on the device.

    cordova.plugins.diagnostic.setBluetoothState(successCallback, errorCallback, state);

Requires the following permissions:

    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>

#### Parameters

- {Function} successCallback - function to call on successful setting of Bluetooth state
- {Function} errorCallback - function to call on failure to set Bluetooth state.
- {Boolean} state - Bluetooth state to set: TRUE for enabled, FALSE for disabled.


#### Example usage

    cordova.plugins.diagnostic.setBluetoothState(function(){
        console.log("Bluetooth was enabled");
    }, function(error){
        console.error("The following error occurred: "+error);
    },
    true);

## iOS only

### isLocationEnabledSetting()

Returns true if the device setting for location is on.

    cordova.plugins.diagnostic.isLocationEnabledSetting(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationEnabledSetting(function(enabled){
        console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### isLocationAuthorized()

Returns true if the application is authorized to use location AND the device setting for location is on.

    cordova.plugins.diagnostic.isLocationAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationAuthorized(function(enabled){
        console.log("Location authorization is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getLocationAuthorizationStatus()

 Returns the location authorization status for the application.

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single string parameter which indicates the location authorization status.
Possible values are: "unknown", "denied", "not_determined", "authorized_always", "authorized_when_in_use"
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
       console.log("Location authorization status: " + status);
    }, onError);


### requestLocationAuthorization()

 Requests location authorization for the application.
 Authorization can be requested to use location either "when in use" (only in foreground) or "always" (foreground and background).
 Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect.

    cordova.plugins.diagnostic.requestLocationAuthorization(successCallback, errorCallback, mode);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.
- {String} mode - (optional) location authorization mode: "always" or "when_in_use". If not specified, defaults to "when_in_use".

#### Example usage

    cordova.plugins.diagnostic.requestLocationAuthorization(function(){
        console.log("Successfully requested location authorization always");
    }, function(error){
        console.error(error);
    }, "always");

### registerLocationAuthorizationStatusChangeHandler()

 Registers a function to be called when a change in location authorization status occurs.

 Note that the callback function registered with `registerLocationAuthorizationStatusChangeHandler()` will only be called when your app is in the foreground, so if you are leaving your app to go to Settings in order to change the app-specific location authorization setting, then your app is in the background and so `registerLocationAuthorizationStatusChangeHandler()` callback will not be invoked. To handle this situation, you should use `cordova.plugins.diagnostic.isLocationAuthorized()` to check the location authorization state when your app is resumed from the background.

 In practice, `registerLocationAuthorizationStatusChangeHandler()` is only useful when the location authorization is requested for the first time and the native dialog pops up asking the user to allow or deny location access by the app. This only happens the first time the app is run and when location authorization status changes from "not_determined" to "authorized_always" or "authorized_when_in_use". When the user presses either "OK" or "Don't Allow" in the native dialog, the registered callback will be invoked.

    cordova.plugins.diagnostic.registerLocationAuthorizationStatusChangeHandler(fn);

#### Parameters

- {Function} fn - function call when a change in location authorization status occurs.
This callback function is passed a single string parameter containing new status.
Expected values are: "denied", "authorized_always" or "authorized_when_in_use"

#### Example usage

    cordova.plugins.diagnostic.registerLocationAuthorizationStatusChangeHandler(function(status){
        console.log("Location authorization status changed from \"not_determined\" to: "+status);
    });

### isCameraPresent()

Checks if the device has a camera present.

    cordova.plugins.diagnostic.isCameraPresent(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraPresent(function(present){
        console.log("Camera is " + (present ? "present" : "absent"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isCameraAuthorized()

Checks if the application is authorized to use the camera.

    cordova.plugins.diagnostic.isCameraAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getCameraAuthorizationStatus()

 Returns the camera authorization status for the application.

    cordova.plugins.diagnostic.getCameraAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single string parameter which indicates the authorization status.
Possible values are: "unknown", "denied", "not_determined", "authorized"
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getCameraAuthorizationStatus(function(status){
       console.log("Camera authorization status: " + status);
    }, onError);

### requestCameraAuthorization()

 Requests camera authorization for the application.
 Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect.

    cordova.plugins.diagnostic.requestCameraAuthorization(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter indicating whether access to the camera was granted or denied.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestCameraAuthorization(function(granted){
        console.log("Authorization request for camera use was " + (granted ? "granted" : "denied"));
    }, function(error){
        console.error(error);
    });

### isCameraRollAuthorized()

Checks if the application is authorized to use the Camera Roll in Photos app.

    cordova.plugins.diagnostic.isCameraRollAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter with the diagnostic result.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraRollAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera roll");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getCameraRollAuthorizationStatus()

 Returns the authorization status for the application to use the Camera Roll in Photos app.

    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single string parameter which indicates the authorization status.
Possible values are: "unknown", "denied", "not_determined", "authorized"
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(function(status){
       console.log("Camera roll authorization status: " + status);
    }, onError);

### requestCameraRollAuthorization()

 Requests camera roll authorization for the application.
 Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect.

    cordova.plugins.diagnostic.requestCameraRollAuthorization(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single boolean parameter indicating whether access to the camera roll was granted or denied.
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestCameraRollAuthorization(function(granted){
        console.log("Authorization request for camera roll was " + (granted ? "granted" : "denied"));
    }, function(error){
        console.error(error);
    });

### getBluetoothState()

 Returns the state of Bluetooth LE on the device.

    cordova.plugins.diagnostic.getBluetoothState(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when diagnostic is successful.
This callback function is passed a single string parameter which indicates the bluetooth state.
Possible values are: "unknown", "resetting", "unsupported", "unauthorized", "powered_off", "powered_on"
- {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getBluetoothState(function(state){
        console.log("Current bluetooth state is: " + state);
    }, function(error){
        console.error(error);
    });

### registerBluetoothStateChangeHandler()

 Registers a function to be called when a change in Bluetooth state occurs.

    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(fn);

#### Parameters

- {Function} fn - function call when a change in Bluetooth state occurs.
This callback function is passed a single string parameter containing new state.
Possible values are: "unknown", "resetting", "unsupported", "unauthorized", "powered_off", "powered_on"

#### Example usage

    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(function(state){
        console.log("Bluetooth state changed to: " + state);
    });


### switchToSettings()

Switch to Settings app. Opens settings page for this app. This works only on iOS 8+. iOS 7 and below will invoke the errorCallback.

    cordova.plugins.diagnostic.switchToSettings(successCallback, errorCallback);

#### Parameters

- {Function} successCallback - The callback which will be called when switch to settings is successful.
- {Function} errorCallback - The callback which will be called when switch to settings encounters an error. This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.switchToSettings(function(){
        console.log("Successfully switched to Settings app"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

# Notes

## Android permissions

Some of functions offered by this plugin require specific permissions to be set in the AndroidManifest.xml. Where additional permissions are needed, they are listed alongside the function that requires them.

These permissions will not be set by this plugin, to avoid asking for unnecessary permissions in your app, in the case that you do not use a particular part of the plugin.
Instead, you can add these permissions as necessary, depending what functions in the plugin you decide to use.

You can add these permissions either by manually editing the AndroidManifest.xml if `/platform/android/`, or define them in the config.xml and apply them using the [cordova-custom-config](https://github.com/dpa99c/cordova-custom-config) plugin.

# Example project

An example project illustrating use of this plugin can be found here: [https://github.com/dpa99c/cordova-diagnostic-plugin-example](https://github.com/dpa99c/cordova-diagnostic-plugin-example)


# Credits

Forked from: [https://github.com/mablack/cordova-diagnostic-plugin](https://github.com/mablack/cordova-diagnostic-plugin)

Orignal Cordova 2 implementation by: AVANTIC ESTUDIO DE INGENIEROS ([www.avantic.net](http://www.avantic.net/))