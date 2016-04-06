Cordova diagnostic plugin
=========================

<!-- START table-of-contents -->
**Table of Contents**

- [Overview](#overview)
  - [Important Android Note](#important-android-note)
    - [Building for API 22 or lower](#building-for-api-22-or-lower)
- [Installation](#installation)
  - [Using the Cordova/Phonegap CLI](#using-the-cordovaphonegap-cli)
  - [Using Cordova Plugman](#using-cordova-plugman)
  - [PhoneGap Build](#phonegap-build)
- [Usage](#usage)
  - [Android, iOS and Windows 10 Mobile](#android-ios-and-windows-10-mobile)
    - [isLocationEnabled()](#islocationenabled)
    - [isWifiEnabled()](#iswifienabled)
    - [isCameraEnabled()](#iscameraenabled)
    - [isBluetoothEnabled()](#isbluetoothenabled)
  - [Android and Windows 10 Mobile only](#android-and-windows-10-mobile-only)
    - [switchToLocationSettings()](#switchtolocationsettings)
    - [switchToMobileDataSettings()](#switchtomobiledatasettings)
    - [switchToBluetoothSettings()](#switchtobluetoothsettings)
    - [switchToWifiSettings()](#switchtowifisettings)
    - [setWifiState()](#setwifistate)
    - [setBluetoothState()](#setbluetoothstate)
  - [Android and iOS](#android-and-ios)
    - [isLocationAuthorized()](#islocationauthorized)
    - [getLocationAuthorizationStatus()](#getlocationauthorizationstatus)
    - [requestLocationAuthorization()](#requestlocationauthorization)
    - [isCameraPresent()](#iscamerapresent)
    - [isCameraAuthorized()](#iscameraauthorized)
    - [getCameraAuthorizationStatus()](#getcameraauthorizationstatus)
    - [requestCameraAuthorization()](#requestcameraauthorization)
    - [isMicrophoneAuthorized()](#ismicrophoneauthorized)
    - [getMicrophoneAuthorizationStatus()](#getmicrophoneauthorizationstatus)
    - [requestMicrophoneAuthorization()](#requestmicrophoneauthorization)
    - [switchToSettings()](#switchtosettings)    
  - [Android only](#android-only)
    - [isGpsLocationEnabled()](#isgpslocationenabled)
    - [isNetworkLocationEnabled()](#isnetworklocationenabled)
    - [getLocationMode()](#getlocationmode)
    - [getPermissionAuthorizationStatus()](#getpermissionauthorizationstatus)
    - [getPermissionsAuthorizationStatus()](#getpermissionsauthorizationstatus)
    - [requestRuntimePermission()](#requestruntimepermission)
    - [requestRuntimePermissions()](#requestruntimepermissions)
    - [hasBluetoothLESupport()](#hasBluetoothLESupport)
    - [hasBluetoothLEPeripheralSupport()](#hasBluetoothLEPeripheralSupport)
  - [iOS only](#ios-only)
    - [isLocationEnabledSetting()](#islocationenabledsetting)
    - [registerLocationAuthorizationStatusChangeHandler()](#registerlocationauthorizationstatuschangehandler)
    - [isCameraRollAuthorized()](#iscamerarollauthorized)
    - [getCameraRollAuthorizationStatus()](#getcamerarollauthorizationstatus)
    - [requestCameraRollAuthorization()](#requestcamerarollauthorization)
    - [getBluetoothState()](#getbluetoothstate)
    - [registerBluetoothStateChangeHandler()](#registerbluetoothstatechangehandler)
    - [isRemoteNotificationsEnabled()](#isremotenotificationsenabled)
    - [isRegisteredForRemoteNotifications()](#isregisteredforremotenotifications)
    - [getRemoteNotificationTypes()](#getremotenotificationtypes)
- [Notes](#notes)
  - [Android permissions](#android-permissions)
    - [Android runtime permissions](#android-runtime-permissions)
  - [Windows 10 Mobile permissions](#windows-10-mobile-permissions)
  - [iOS location permission messages](#ios-location-permission-messages)
- [Example project](#example-project)
  - [Screenshots](#screenshots)
    - [Android](#android)
    - [iOS](#ios)
- [Credits](#credits)
- [License](#license)

<!-- END table-of-contents -->


# Overview

This Cordova/Phonegap plugin for iOS, Android and Windows 10 Mobile is used to check the state of the following device settings:

- Location
- WiFi
- Camera
- Bluetooth

The plugin also enables an app to show the relevant settings screen, to allow users to change the above device settings.

The plugin is registered in on [npm](https://www.npmjs.com/package/cordova.plugins.diagnostic) as `cordova.plugins.diagnostic`

## Important Android Note

This plugin has been updated to support Android 6 (API 23) [runtime permissions](http://developer.android.com/training/permissions/requesting.html).

In order to do this it must depend on libraries only present in API 23+, so you __must build using Android SDK Platform v23 or above__. To do this you must have [Cordova Android platform](https://github.com/apache/cordova-android)@5.0.0 or above installed in your project. You can check the currently installed platform versions with the following command:

    cordova platform ls

Currently the default version installed (if not specified) is cordova-android@4 which uses API 22, so you need to explicitly specify the version when adding the platform:

    cordova platform add android@5.0.0

__Note:__ Attempting to build with API 22 or below will result in a build error.


You __must__ also make sure your build environment has the following Android libraries installed. In a local build environment, you'd install these via the Android SDK Manager:

 -  Android Support Library - Rev. 23 or above
 -  Android Support Repository - Rev. 23 or above

### Building for API 22 or lower

Phonegap Build (at the time of writing) does not support API 23, so for its users and others who wish to build against API 22 or below, there is a [legacy branch of this plugin repo](https://github.com/dpa99c/cordova-diagnostic-plugin/tree/api-22) which contains all the functionality __except Android 6 runtime permissions__. This removes the dependency on API 23 and will allow you to build against earlier API versions.

The legacy branch is published to npm as [`cordova.plugins.diagnostic.api-22`](https://www.npmjs.com/package/cordova.plugins.diagnostic.api-22), so you'll need to use this plugin ID when adding it:

    cordova plugin add cordova.plugins.diagnostic.api-22

# Installation

## Using the Cordova/Phonegap CLI

    $ cordova plugin add cordova.plugins.diagnostic
    $ phonegap plugin add cordova.plugins.diagnostic

**NOTE**: Make sure your Cordova CLI version is 5.0.0+ (check with `cordova -v`). Cordova 4.x and below uses the now deprecated [Cordova Plugin Registry](http://plugins.cordova.io) as its plugin repository, so using a version of Cordova 4.x or below will result in installing an [old version](http://plugins.cordova.io/#/package/cordova.plugins.diagnostic) of this plugin.

## Using Cordova Plugman

    $ plugman install --plugin=cordova.plugins.diagnostic --platform=<platform> --project=<project_path> --plugins_dir=plugins

For example, to install for the Android platform

    $ plugman install --plugin=cordova.plugins.diagnostic --platform=android --project=platforms/android --plugins_dir=plugins

## PhoneGap Build
Add the following xml to your config.xml to use the latest version of this plugin from [npm](https://www.npmjs.com/package/cordova.plugins.diagnostic):

    <gap:plugin name="cordova.plugins.diagnostic" source="npm" />

# Usage

The plugin is exposed via the `cordova.plugins.diagnostic` object and provides the following functions:

## Android, iOS and Windows 10 Mobile

### isLocationEnabled()

Checks if app is able to access device location.

    cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback);

On iOS and Windows 10 Mobile this returns true if both the device setting for Location Services is ON, AND the application is authorized to use location.
When location is enabled, the locations returned are by a mixture GPS hardware, network triangulation and Wifi network IDs.

On Android, this returns true if Location mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
When location is enabled, the locations returned are dependent on the location mode:

* Battery saving = network triangulation and Wifi network IDs (low accuracy)
* Device only = GPS hardware only (high accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if location is available for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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
On Android and Windows 10 Mobile this returns true if the WiFi setting is set to enabled.

On Android this requires permission `<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`

    cordova.plugins.diagnostic.isWifiEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if device is connected by WiFi.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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
On Windows 10 Mobile this returns true if both the device has a rear-facing camera AND the application is authorized to use it.

    cordova.plugins.diagnostic.isCameraEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if camera is present and authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraEnabled(function(exists){
        console.log("Device " + (exists ? "does" : "does not") + " have a camera");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isBluetoothEnabled()

Checks if the device has Bluetooth capabilities and if so that Bluetooth is switched on (same on Android, iOS and Windows 10 Mobile)

On Android this requires permission `<uses-permission android:name="android.permission.BLUETOOTH" />`

    cordova.plugins.diagnostic.isBluetoothEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if device has Bluetooth LE and Bluetooth is switched on.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isBluetoothEnabled(function(enabled){
        console.log("Bluetooth is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

## Android and Windows 10 Mobile only

### switchToLocationSettings()

Displays the device location settings to allow user to enable location services/change location mode.

    cordova.plugins.diagnostic.switchToLocationSettings();

Note: On Android, you may want to consider using the [Request Location Accuracy Plugin for Android](https://github.com/dpa99c/cordova-plugin-request-location-accuracy) to request the desired location accuracy without needing the user to manually do this on the Location Settings page.

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

Requires the following permissions for Android:

    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>

Requires the following capabilities for Windows 10 Mobile:

    <DeviceCapability Name="radios" />

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

Requires the following permissions on Android:

    <uses-permission android:name="android.permission.BLUETOOTH"/>
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>

Requires the following capabilities for Windows 10 Mobile:

    <DeviceCapability Name="radios" />

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

## Android and iOS

### isLocationAuthorized()

Checks if the application is authorized to use location.

Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

    cordova.plugins.diagnostic.isLocationAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter.
On iOS this will return TRUE if application is authorized to use location either "when in use" (only in foreground) OR "always" (foreground and background).
On Android this will return TRUE if the app currently has runtime authorisation to use location.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationAuthorized(function(enabled){
        console.log("Location authorization is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getLocationAuthorizationStatus()

 Returns the location authorization status for the application.

 Note for Android: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the location authorization status.
On iOS, possible values are: "unknown", "denied", "not_determined", "authorized_always", "authorized_when_in_use".
On Android, possible values are defined in the [Runtime permission statuses](#runtime-permission-statuses) section.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
       console.log("Location authorization status: " + status);
    }, onError);


### requestLocationAuthorization()

 Requests location authorization for the application.

 Notes for iOS:

 - Calling this on iOS 7 or below will have no effect, as location permissions are are implicitly granted.
 - On iOS 8+, authorization can be requested to use location either "when in use" (only in foreground) or "always" (foreground and background).
 - This should only be called if authorization status is NOT_DETERMINED - calling it when in any other state will have no effect.
 - This plugin adds default messages which are displayed to the user upon requesting location authorization - see the [iOS location permission messages](#ios-location-permission-messages) section for how to customise them.
 - The successCallback is now invoked in response to the user's choice in the permission dialog, **NOT** on requesting the permission
    - **NOTE:** this was changed in v2.3.12, prior to which these conditions were the reverse of the above.

 Notes for Android:

 - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.
 - The successCallback is invoked in response to the user's choice in the permission dialog and is passed the resulting authorization status.

    `cordova.plugins.diagnostic.requestLocationAuthorization(successCallback, errorCallback, mode);`

#### Parameters

- {Function} successCallback -
On iOS, this is invoked on successfully requesting the permission, **NOT** in response to the user's choice in the permission dialog. No parameters are passed to the callback.
On Android, this is is invoked in response to the user's choice in the permission dialog. It is passed a single string parameter which defines the [resulting authorisation status](#runtime-permission-statuses).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.
- {String} mode - (iOS-only / optional) location authorization mode: "always" or "when_in_use". If not specified, defaults to "when_in_use".

#### Example iOS usage

    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        console.log("Authorisation status is now: "+status);
    }, function(error){
        console.error(error);
    }, "always");

#### Example Android usage

    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        console.log("Authorisation status is now: "+status);
    }, function(error){
        console.error(error);
    });

### isCameraPresent()

Checks if camera hardware is present on device.

    cordova.plugins.diagnostic.isCameraPresent(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if camera is present
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraPresent(function(present){
        console.log("Camera is " + (present ? "present" : "absent"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isCameraAuthorized()

Checks if the application is authorized to use the camera.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.
- This only checks run-time permission for `READ_EXTERNAL_STORAGE` (not `CAMERA`) - see [Android Camera permissions](#android-camera-permissions).

    `cordova.plugins.diagnostic.isCameraAuthorized(successCallback, errorCallback);`

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if camera is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getCameraAuthorizationStatus()

 Returns the camera authorization status for the application.

 Notes for Android:
 - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
 - This only checks run-time permission for `READ_EXTERNAL_STORAGE` (not `CAMERA`) - see [Android Camera permissions](#android-camera-permissions).

    `cordova.plugins.diagnostic.getCameraAuthorizationStatus(successCallback, errorCallback);`

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the authorization status.
On iOS, possible values are: "unknown", "denied", "not_determined", "authorized".
On Android, possible values are defined in the [Runtime permission statuses](#runtime-permission-statuses) section.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getCameraAuthorizationStatus(function(status){
       console.log("Camera authorization status: " + status);
    }, onError);

### requestCameraAuthorization()

Requests camera authorization for the application.

Notes for iOS:
 - Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect.

Notes for Android:
 - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.
 - This only requests run-time permission for `READ_EXTERNAL_STORAGE` (not `CAMERA`) - see [Android Camera permissions](#android-camera-permissions).

    `cordova.plugins.diagnostic.requestCameraAuthorization(successCallback, errorCallback);`

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
On iOS, the callback function is passed a single boolean parameter indicating whether access to the camera was granted or denied.
On Android, the callback function is passed a single string parameter which defines the [resulting authorisation status](#runtime-permission-statuses).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example iOS usage

    cordova.plugins.diagnostic.requestCameraAuthorization(function(granted){
        console.log("Authorization request for camera use was " + (granted ? "granted" : "denied"));
    }, function(error){
        console.error(error);
    });

#### Example Android usage

    cordova.plugins.diagnostic.requestCameraAuthorization(function(status){
        console.log("Authorization status for camera is " + status);
    }, function(error){
        console.error(error);
    });

### isMicrophoneAuthorized()

Checks if the application is authorized to use the microphone.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.

Notes for iOS:
- Requires iOS 8+

    `cordova.plugins.diagnostic.isMicrophoneAuthorized(successCallback, errorCallback);`

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if microphone is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isMicrophoneAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the microphone");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getMicrophoneAuthorizationStatus()

 Returns the microphone authorization status for the application.

 Notes for Android:
 - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

 Notes for iOS:
 - Requires iOS 8+

    `cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(successCallback, errorCallback);`

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the authorization status.
On iOS, possible values are: "unknown", "denied", "not_determined", "authorized".
On Android, possible values are defined in the [Runtime permission statuses](#runtime-permission-statuses) section.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status){
       console.log("Camera authorization status: " + status);
    }, onError);


### requestMicrophoneAuthorization()

Requests microphone authorization for the application.

Notes for iOS:
 - Should only be called if authorization status is NOT_DETERMINED. Calling it when in any other state will have no effect and just return the current authorization status.
 - Requires iOS 7+

Notes for Android:
 - This is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.

    cordova.plugins.diagnostic.requestMicrophoneAuthorization(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
On Android this callback function is passed a single string parameter which indicates the authorization status - possible values are: "unknown", "denied", "not_determined", "authorized".
On iOS this callback function is passed a single boolean parameter which indicates the authorization status.

- {Function} errorCallback - The callback which will be called when an error occurs. This callback function is passed a single string parameter containing the error message.

#### Example usage

#### Example iOS usage

     cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(granted){
            console.log("Microphone access is: "+(granted ? "granted" : "denied"));
        }, function(error){
            console.error("The following error occurred: "+error);
        });
#### Example Android usage

    cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
        console.log(Microphone access is: "+status);
    }, function(error){
        console.error(error);
    });

### switchToSettings()

Opens settings page for this app.

On Android, this opens the "App Info" page in the Settings app.

On iOS, this opens the app settings page in the Settings app. This works only on iOS 8+ - iOS 7 and below will invoke the errorCallback.

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

## Android only

### isGpsLocationEnabled()

Checks if location mode is set to return high-accuracy locations from GPS hardware.

    cordova.plugins.diagnostic.isGpsLocationEnabled(successCallback, errorCallback);

Returns true if Location mode is enabled and is set to either:

* Device only = GPS hardware only (high accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if high-accuracy GPS-based location is available for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if low-accuracy network-based location is available for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNetworkLocationEnabled(function(enabled){
        console.log("Network location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getLocationMode()

Returns the current location mode setting for the device.

    cordova.plugins.diagnostic.getLocationMode(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the current location mode.
Values that may be passed to the success callback:
    - "high_accuracy" - GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
    - "device_only" - GPS hardware only (high accuracy)
    - "battery_saving" - network triangulation and Wifi network IDs (low accuracy)
    - "location_off" - Location is turned off
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.getLocationMode(function(mode){
        console.log("Current location mode is: " + mode);
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getPermissionAuthorizationStatus()

Returns the current authorisation status for a given permission.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful retrieval of status.
This callback function is passed a single string parameter which defines the current [authorisation status](#runtime-permission-statuses)
- {Function} errorCallback - function to call on failure to retrieve authorisation status.
This callback function is passed a single string parameter containing the error message.
- {String} permission - permission to request authorisation status for, defined as a [runtime permission constant](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                console.log("Permission granted to use the camera");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                console.log("Permission to use the camera has not been requested yet");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                console.log("Permission denied to use the camera - ask again?");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.runtimePermission.CAMERA);

### getPermissionsAuthorizationStatus()

Returns the current authorisation status for multiple permissions.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful retrieval of status.
This callback function is passed a single object parameter which defines a key/value map, where the key is the requested [runtime permission](#dangerous-runtime-permissions), and the value is the current [authorisation status](#runtime-permission-statuses).
- {Function} errorCallback - function to call on failure to retrieve authorisation status.
This callback function is passed a single string parameter containing the error message.
- {Array} permissions - list of permissions to request authorisation statuses for, defined as [runtime permission constants](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.getPermissionsAuthorizationStatus(function(statuses){
        for (var permission in statuses){
            switch(statuses[permission){
                case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                    console.log("Permission denied to use "+permission+" - ask again?");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                    break;
            }
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    },[
        cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION,
        cordova.plugins.diagnostic.runtimePermission.ACCESS_COARSE_LOCATION
    ]);

### requestRuntimePermission()

Requests app to be granted authorisation for a runtime permission.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful request for runtime permission.
This callback function is passed a single string parameter which defines the resulting [authorisation status](#runtime-permission-statuses)
- {Function} errorCallback - function to call on failure to request authorisation.
This callback function is passed a single string parameter containing the error message.
 - {String} permission - permission to request authorisation for, defined as a [runtime permission constant](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
            case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                console.log("Permission granted to use the camera");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                console.log("Permission to use the camera has not been requested yet");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                console.log("Permission denied to use the camera - ask again?");
                break;
            case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.runtimePermission.CAMERA);


### requestRuntimePermissions()

Requests app to be granted authorisation for multiple runtime permissions.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful request for runtime permissions.
This callback function is passed a single object parameter which defines a key/value map, where the key is the [runtime permission](#dangerous-runtime-permissions) to request, and the value is the current [authorisation status](#runtime-permission-statuses).
- {Function} errorCallback - function to call on failure to request authorisation.
This callback function is passed a single string parameter containing the error message.
- {Array} permissions - list of permissions to request authorisation for, defined as [runtime permission constants](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.requestRuntimePermissions(function(statuses){
        for (var permission in statuses){
            switch(statuses[permission]){
                case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                    console.log("Permission denied to use "+permission+" - ask again?");
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                    break;
            }
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    },[
        cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION,
        cordova.plugins.diagnostic.runtimePermission.ACCESS_COARSE_LOCATION
    ]);

### hasBluetoothLESupport()

Check if the hardware supports Bluetooth Low Energy

### hasBluetoothLEPeripheralSupport()

Check if the hardware supports Bluetooth Low Energy Peripheral mode

## iOS only

### isLocationEnabledSetting()

Returns true if the device setting for location is on.

    cordova.plugins.diagnostic.isLocationEnabledSetting(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if Location Services is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationEnabledSetting(function(enabled){
        console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### registerLocationAuthorizationStatusChangeHandler()

**DEPRECATED: This function will be removed in a future version. You should now use the successCallback of [requestLocationAuthorization()](#requestLocationAuthorization) to determine the outcome of user choice in the native dialog.**

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

### isCameraRollAuthorized()

Checks if the application is authorized to use the Camera Roll in Photos app.

    cordova.plugins.diagnostic.isCameraRollAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if access to Camera Roll is authorized.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the authorization status.
Possible values are: "unknown", "denied", "not_determined", "authorized"
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter indicating whether access to the camera roll was granted or denied.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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

- {Function} successCallback -  The callback which will be called when operation is successful.
This callback function is passed a single string parameter which indicates the bluetooth state.
Possible values are: "unknown", "resetting", "unsupported", "unauthorized", "powered_off", "powered_on"
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
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


### isRemoteNotificationsEnabled()

Checks if remote (push) notifications are enabled.

On iOS 8+, returns true if app is registered for remote notifications **AND** "Allow Notifications" switch is ON **AND** alert style is not set to "None" (i.e. "Banners" or "Alerts").

On iOS <=7, returns true if app is registered for remote notifications **AND** alert style is not set to "None" (i.e. "Banners" or "Alerts") - same as [isRegisteredForRemoteNotifications()](#isregisteredforremotenotifications).

    cordova.plugins.diagnostic.isRemoteNotificationsEnabled(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if remote (push) notifications are enabled.
- {Function} errorCallback - The callback which will be called when an error occurs. This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isRemoteNotificationsEnabled(function(enabled){
        console.log("Remote notifications are " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isRegisteredForRemoteNotifications()

Indicates if the app is registered for remote (push) notifications on the device.

On iOS 8+, returns true if the app is registered for remote notifications and received its device token, or false if registration has not occurred, has failed, or has been denied by the user.
Note that user preferences for notifications in the Settings app will not affect this.

On iOS <=7, returns true if app is registered for remote notifications AND alert style is not set to "None" (i.e. "Banners" or "Alerts") - same as [isRemoteNotificationsEnabled()](#isremotenotificationsenabled).

    cordova.plugins.diagnostic.isRegisteredForRemoteNotifications(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
This callback function is passed a single boolean parameter which is TRUE if the device is registered for remote (push) notifications.
- {Function} errorCallback - The callback which will be called when an error occurs. This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isRegisteredForRemoteNotifications(function(registered){
        console.log("Device " + (registered ? "is" : "isn't") + " registered for remote notifications");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getRemoteNotificationTypes()

Indicates the current setting of notification types for the app in the Settings app.

Note: on iOS 8+, if "Allow Notifications" switch is OFF, all types will be returned as disabled.

    cordova.plugins.diagnostic.getRemoteNotificationTypes(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
This callback function is passed a single object parameter where the key is the notification type and the value is a boolean indicating whether it's enabled:
	 * "alert" => alert style is not set to "None" (i.e. "Banners" or "Alerts");
	 * "badge" => "Badge App Icon" switch is ON;
	 * "sound" => "Sounds"/"Alert Sound" switch is ON.
- {Function} errorCallback - The callback which will be called when an error occurs. This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getRemoteNotificationTypes(function(types){
        for(var type in types){
            console.log(type + " is " + (types[type] ? "enabled" : "disabled"));
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

# Notes

## Android permissions

Some of functions offered by this plugin require specific permissions to be set in the AndroidManifest.xml. Where additional permissions are needed, they are listed alongside the function that requires them.

These permissions will not be set by this plugin, to avoid asking for unnecessary permissions in your app, in the case that you do not use a particular part of the plugin.
Instead, you can add these permissions as necessary, depending what functions in the plugin you decide to use.

You can add these permissions either by manually editing the AndroidManifest.xml in `/platforms/android/`, or define them in the config.xml and apply them using the [cordova-custom-config](https://github.com/dpa99c/cordova-custom-config) plugin, for example:

    <platform name="android">
        <plugin name="cordova-custom-config" version="*"/>
        <config-file target="AndroidManifest.xml" parent="/*">
            <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
            <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        </config-file>
    </platform>

### Android runtime permissions

Android 6 / API 23 introduces the concept of [runtime permissions](http://developer.android.com/training/permissions/requesting.html). Similar to iOS, certain "dangerous" permissions must be requested at runtime __in addition__ to being listed in the Android manifest.

Runtime permissions only apply if the device/emulator the app is running on has Android 6.0 or above. If the app is running on Android 5.x or below, runtime permissions do not apply - all permissions are granted at installation time.

This plugin supports [checking](#getpermissionauthorizationstatus) and [requesting](#requestruntimepermission) of Android runtime permissions.

#### "Dangerous" runtime permissions

The plugin defines the [full list of dangersous permissions available in API 23](http://developer.android.com/guide/topics/security/permissions.html#perm-groups) as a list of constants available via the `cordova.plugins.diagnostic.runtimePermission` object. The following permissions are available:

- `cordova.plugins.diagnostic.runtimePermission.READ_CALENDAR`
- `cordova.plugins.diagnostic.runtimePermission.WRITE_CALENDAR`
- `cordova.plugins.diagnostic.runtimePermission.CAMERA`
- `cordova.plugins.diagnostic.runtimePermission.READ_CONTACTS`
- `cordova.plugins.diagnostic.runtimePermission.WRITE_CONTACTS`
- `cordova.plugins.diagnostic.runtimePermission.GET_ACCOUNTS`
- `cordova.plugins.diagnostic.runtimePermission.ACCESS_FINE_LOCATION`
- `cordova.plugins.diagnostic.runtimePermission.ACCESS_COARSE_LOCATION`
- `cordova.plugins.diagnostic.runtimePermission.RECORD_AUDIO`
- `cordova.plugins.diagnostic.runtimePermission.READ_PHONE_STATE`
- `cordova.plugins.diagnostic.runtimePermission.CALL_PHONE`
- `cordova.plugins.diagnostic.runtimePermission.ADD_VOICEMAIL`
- `cordova.plugins.diagnostic.runtimePermission.USE_SIP`
- `cordova.plugins.diagnostic.runtimePermission.PROCESS_OUTGOING_CALLS`
- `cordova.plugins.diagnostic.runtimePermission.READ_CALL_LOG`
- `cordova.plugins.diagnostic.runtimePermission.WRITE_CALL_LOG`
- `cordova.plugins.diagnostic.runtimePermission.SEND_SMS`
- `cordova.plugins.diagnostic.runtimePermission.RECEIVE_SMS`
- `cordova.plugins.diagnostic.runtimePermission.READ_SMS`
- `cordova.plugins.diagnostic.runtimePermission.RECEIVE_WAP_PUSH`
- `cordova.plugins.diagnostic.runtimePermission.RECEIVE_MMS`
- `cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE`
- `cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE`
- `cordova.plugins.diagnostic.runtimePermission.BODY_SENSORS`

#### Runtime permission statuses

A permission may have one of the following states, which are defined as constants by the `cordova.plugins.diagnostic.runtimePermissionStatus` object:

- `cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED` - Permission has already been granted, the device is running Android 5.x or below, or the app is built with API 22 or below.
- `cordova.plugins.diagnostic.runtimePermissionStatus.NOT_REQUESTED` - App has not yet requested this permission. App can request permission and user will be prompted to allow/deny.
- `cordova.plugins.diagnostic.runtimePermissionStatus.DENIED` - User denied access to this permission (without checking "Never Ask Again" box). App can request permission again and user will be prompted again to allow/deny again.
- `cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS` - User denied access to this permission and checked "Never Ask Again" box. App can never ask for permission again. The only way around this is to instruct the user to manually change the permission on the app permissions settings page.

#### Runtime permission groups

Each runtime permission belongs to a permission group. Requesting a permission also requests authorisation for all other permissions in that group. If other permissions in the group are not defined in the manifest, they will default to DENIED_ALWAYS status. Otherwise, if user grants permission, all other permissions in the group will be granted; if user denies permission, all other permissions in the group will be denied.

Permissions are grouped as follows:

    CALENDAR: [READ_CALENDAR, WRITE_CALENDAR],
    CAMERA: [CAMERA],
    CONTACTS: [READ_CONTACTS, WRITE_CONTACTS, GET_ACCOUNTS],
    LOCATION: [ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION],
    MICROPHONE: [RECORD_AUDIO],
    PHONE: [READ_PHONE_STATE, CALL_PHONE, ADD_VOICEMAIL, USE_SIP, PROCESS_OUTGOING_CALLS, READ_CALL_LOG, WRITE_CALL_LOG],
    SENSORS: [BODY_SENSORS],
    SMS: [SEND_SMS, RECEIVE_SMS, READ_SMS, RECEIVE_WAP_PUSH, RECEIVE_MMS],
    STORAGE: [READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE]

#### Runtime permissions example project

While the [cordova-diagnostic-plugin-example](https://github.com/dpa99c/cordova-diagnostic-plugin-example) illustrates use of runtime permissions in the context of requesting location and camera access, the [cordova-diagnostic-plugin-android-runtime-example](https://github.com/dpa99c/cordova-diagnostic-plugin-android-runtime-example) project explicitly illustrates use of Android runtime permissions with this plugin:

[https://github.com/dpa99c/cordova-diagnostic-plugin-android-runtime-example](https://github.com/dpa99c/cordova-diagnostic-plugin-android-runtime-example)

#### Android Camera permissions

Note that (currently) the Android variant of [`requestCameraAuthorization()`](#requestcameraauthorization) only requests `READ_EXTERNAL_STORAGE` permission, not `CAMERA` permission.
This is because the [Cordova camera plugin](https://github.com/apache/cordova-plugin-camera) only needs `READ_EXTERNAL_STORAGE` permission.

In fact, due to [a bug in the Cordova camera plugin](https://issues.apache.org/jira/browse/CB-10120), requesting `CAMERA` permission actually causes the camera activity of `cordova-plugin-camera` to crash if it's denied.

If you need to request `CAMERA` permission explicitly, you can do so using [`requestRuntimePermission()`](#requestruntimepermission):

    cordova.plugins.diagnostic.requestRuntimePermission(successFn,
        errorFn,
        cordova.plugins.diagnostic.runtimePermission.CAMERA
    );

**UPDATE**

[The bug](https://issues.apache.org/jira/browse/CB-10120]) causing the [Cordova camera plugin](https://github.com/apache/cordova-plugin-camera) to crash when `CAMERA` permission is denied has [been fixed](https://github.com/apache/cordova-plugin-camera/commit/0cd962466d2641fcd05155690e23432db02cc79a) on the [master branch of cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) which is currently on `v2.1.2-dev`. That fix causes `CAMERA` permission to be requested again by `cordova-plugin-camera`.

Once `cordova-plugin-camera@2.1.2` is published as a release [to npm](https://www.npmjs.com/package/cordova-plugin-camera), [`requestCameraAuthorization()`](#requestcameraauthorization) will be updated to request `CAMERA` permission.

## Windows 10 Mobile permissions

Some of functions offered by this plugin require specific permissions to be set in the package.windows10.appxmanifest. Where additional permissions are needed, they are listed alongside the function that requires them.

These permissions will not be set by this plugin, to avoid asking for unnecessary permissions in your app, in the case that you do not use a particular part of the plugin.
Instead, you can add these permissions as necessary, depending what functions in the plugin you decide to use.

You can add these permissions by manually editing the package.windows10.appxmanifest in `/platforms/windows/`.

## iOS location permission messages

When location permission is requested on iOS 8+, a message is displayed to the user indicating the reason for the request. These messages are stored in the `{project}-Info.plist` file under the keys `NSLocationAlwaysUsageDescription` and `NSLocationWhenInUseUsageDescription`, which are displayed when requesting to use location **always** or **when in use**, respectively.

Upon installing this plugin into your project, it will add the following default messages to your plist:

- NSLocationAlwaysUsageDescription: "This app requires constant access to your location in order to track your position, even when the screen is off."
- NSLocationWhenInUseUsageDescription: "This app will now only track your location when the screen is on and the app is displayed."

To override these defaults, you can either edit the messages directly in the plist file, or to persist the changes between platform updates, use my [cordova-custom-config](https://github.com/dpa99c/cordova-custom-config) plugin to add overrides directly from the config xml:

`config.xml`

    <platform name="ios">
        <plugin name="cordova-custom-config" version="*"/>
        <config-file platform="ios" target="*-Info.plist" parent="NSLocationAlwaysUsageDescription">
            <string>My custom message for always using location.</string>
        </config-file>
        <config-file platform="ios" target="*-Info.plist" parent="NSLocationWhenInUseUsageDescription">
            <string>My custom message for using location when in use.</string>
        </config-file>
    </platform>

# Example project

An example project illustrating use of this plugin can be found here: [https://github.com/dpa99c/cordova-diagnostic-plugin-example](https://github.com/dpa99c/cordova-diagnostic-plugin-example)

## Screenshots

### Android

![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_1.png)
![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_2.png)
![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_3.png)

### iOS

![iOS screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/ios_1.png)
![iOS screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/ios_2.png)


# Credits

Forked from: [https://github.com/mablack/cordova-diagnostic-plugin](https://github.com/mablack/cordova-diagnostic-plugin)

Original Cordova 2 implementation by: AVANTIC ESTUDIO DE INGENIEROS ([www.avantic.net](http://www.avantic.net/))

Windows 10 implementation by [Mike Dailor](https://github.com/mdailor) / [Next Wave Software, Inc.](http://nextwavesoftware.com/)

# License
================

The MIT License

Copyright (c) 2015 Dave Alden / Working Edge Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
