Cordova diagnostic plugin [![Latest Stable Version](https://img.shields.io/npm/v/cordova.plugins.diagnostic.svg)](https://www.npmjs.com/package/cordova.plugins.diagnostic) [![Total Downloads](https://img.shields.io/npm/dt/cordova.plugins.diagnostic.svg)](https://npm-stat.com/charts.html?package=cordova.plugins.diagnostic)
=========================

<!-- doctoc README.md --maxlevel=3 -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
  - [Important notes](#important-notes)
    - [Minimum supported versions](#minimum-supported-versions)
    - [Native environment required](#native-environment-required)
    - [Building for Android](#building-for-android)
- [Installation](#installation)
  - [Using the Cordova/Phonegap/Ionic CLI](#using-the-cordovaphonegapionic-cli)
  - [AndroidX Library](#androidx-library)
  - [Specifying modules](#specifying-modules)
    - [Available modules](#available-modules)
- [Reporting issues](#reporting-issues)
  - [Reporting a bug or problem](#reporting-a-bug-or-problem)
  - [Requesting a new feature](#requesting-a-new-feature)
- [Usage](#usage)
  - [Core module](#core-module)
    - [switchToSettings()](#switchtosettings)
    - [switchToWirelessSettings()](#switchtowirelesssettings)
    - [switchToMobileDataSettings()](#switchtomobiledatasettings)
    - [permissionStatus constants](#permissionstatus-constants)
    - [getPermissionAuthorizationStatus()](#getpermissionauthorizationstatus)
    - [getPermissionsAuthorizationStatus()](#getpermissionsauthorizationstatus)
    - [requestRuntimePermission()](#requestruntimepermission)
    - [requestRuntimePermissions()](#requestruntimepermissions)
    - [isRequestingPermission()](#isrequestingpermission)
    - [registerPermissionRequestCompleteHandler()](#registerpermissionrequestcompletehandler)
    - [isDataRoamingEnabled()](#isdataroamingenabled)
    - [isADBModeEnabled()](#isadbmodeenabled)
    - [isDeviceRooted()](#isdevicerooted)
    - [isBackgroundRefreshAuthorized()](#isbackgroundrefreshauthorized)
    - [getBackgroundRefreshStatus()](#getbackgroundrefreshstatus)
    - [cpuArchitecture constants](#cpuarchitecture-constants)
    - [getArchitecture()](#getarchitecture)
    - [restart()](#restart)
    - [enableDebug()](#enabledebug)
    - [getCurrentBatteryLevel()](#getcurrentbatterylevel)
    - [isAirplaneModeEnabled()](#isairplanemodeenabled)
    - [isMobileDataEnabled()](#ismobiledataenabled)
    - [isAccessibilityModeEnabled()](#isaccessibilitymodeenabled)
    - [isTouchExplorationEnabled()](#istouchexplorationenabled)
    - [getDeviceOSVersion()](#getdeviceosversion)
    - [getBuildOSVersion()](#getbuildosversion)
  - [Location module](#location-module)
    - [locationMode constants](#locationmode-constants)
    - [locationAuthorizationMode constants](#locationauthorizationmode-constants)
    - [locationAccuracyAuthorization constants](#locationaccuracyauthorization-constants)
    - [isLocationAvailable()](#islocationavailable)
    - [isLocationEnabled()](#islocationenabled)
    - [isGpsLocationAvailable()](#isgpslocationavailable)
    - [isGpsLocationEnabled()](#isgpslocationenabled)
    - [isNetworkLocationAvailable()](#isnetworklocationavailable)
    - [isNetworkLocationEnabled()](#isnetworklocationenabled)
    - [getLocationMode()](#getlocationmode)
    - [isLocationAuthorized()](#islocationauthorized)
    - [getLocationAuthorizationStatus()](#getlocationauthorizationstatus)
    - [getLocationAuthorizationStatuses()](#getlocationauthorizationstatuses)
    - [requestLocationAuthorization()](#requestlocationauthorization)
    - [registerLocationStateChangeHandler()](#registerlocationstatechangehandler)
    - [getLocationAccuracyAuthorization()](#getlocationaccuracyauthorization)
    - [requestTemporaryFullAccuracyAuthorization()](#requesttemporaryfullaccuracyauthorization)
    - [registerLocationAccuracyAuthorizationChangeHandler()](#registerlocationaccuracyauthorizationchangehandler)
    - [switchToLocationSettings()](#switchtolocationsettings)
  - [Bluetooth module](#bluetooth-module)
    - [bluetoothState constants](#bluetoothstate-constants)
    - [isBluetoothAvailable()](#isbluetoothavailable)
    - [isBluetoothEnabled()](#isbluetoothenabled)
    - [hasBluetoothSupport()](#hasbluetoothsupport)
    - [hasBluetoothLESupport()](#hasbluetoothlesupport)
    - [hasBluetoothLEPeripheralSupport()](#hasbluetoothleperipheralsupport)
    - [getBluetoothState()](#getbluetoothstate)
    - [setBluetoothState()](#setbluetoothstate)
    - [getBluetoothAuthorizationStatus()](#getbluetoothauthorizationstatus)
    - [getBluetoothAuthorizationStatuses()](#getbluetoothauthorizationstatuses)
    - [requestBluetoothAuthorization()](#requestbluetoothauthorization)
    - [registerBluetoothStateChangeHandler()](#registerbluetoothstatechangehandler)
    - [switchToBluetoothSettings()](#switchtobluetoothsettings)
  - [WiFi module](#wifi-module)
    - [isWifiAvailable()](#iswifiavailable)
    - [isWifiEnabled()](#iswifienabled)
    - [setWifiState()](#setwifistate)
    - [switchToWifiSettings()](#switchtowifisettings)
  - [Camera module](#camera-module)
    - [isCameraPresent()](#iscamerapresent)
    - [isCameraAvailable()](#iscameraavailable)
    - [isCameraAuthorized()](#iscameraauthorized)
    - [getCameraAuthorizationStatus()](#getcameraauthorizationstatus)
    - [getCameraAuthorizationStatuses()](#getcameraauthorizationstatuses)
    - [requestCameraAuthorization()](#requestcameraauthorization)
    - [isCameraRollAuthorized()](#iscamerarollauthorized)
    - [getCameraRollAuthorizationStatus()](#getcamerarollauthorizationstatus)
    - [requestCameraRollAuthorization()](#requestcamerarollauthorization)
    - [presentLimitedLibraryPicker()](#presentlimitedlibrarypicker)
  - [Notifications module](#notifications-module)
    - [remoteNotificationType constants](#remotenotificationtype-constants)
    - [isRemoteNotificationsEnabled()](#isremotenotificationsenabled)
    - [isRegisteredForRemoteNotifications()](#isregisteredforremotenotifications)
    - [getRemoteNotificationTypes()](#getremotenotificationtypes)
    - [getRemoteNotificationsAuthorizationStatus()](#getremotenotificationsauthorizationstatus)
    - [requestRemoteNotificationsAuthorization()](#requestremotenotificationsauthorization)
    - [switchToNotificationSettings()](#switchtonotificationsettings)
  - [Microphone module](#microphone-module)
    - [isMicrophoneAuthorized()](#ismicrophoneauthorized)
    - [getMicrophoneAuthorizationStatus()](#getmicrophoneauthorizationstatus)
    - [requestMicrophoneAuthorization()](#requestmicrophoneauthorization)
  - [Contacts module](#contacts-module)
    - [isContactsAuthorized()](#iscontactsauthorized)
    - [getContactsAuthorizationStatus()](#getcontactsauthorizationstatus)
    - [requestContactsAuthorization()](#requestcontactsauthorization)
  - [Calendar module](#calendar-module)
    - [isCalendarAuthorized()](#iscalendarauthorized)
    - [getCalendarAuthorizationStatus()](#getcalendarauthorizationstatus)
    - [requestCalendarAuthorization()](#requestcalendarauthorization)
  - [Reminders module](#reminders-module)
    - [isRemindersAuthorized()](#isremindersauthorized)
    - [getRemindersAuthorizationStatus()](#getremindersauthorizationstatus)
    - [requestRemindersAuthorization()](#requestremindersauthorization)
  - [Motion module](#motion-module)
    - [motionStatus constants](#motionstatus-constants)
    - [isMotionAvailable()](#ismotionavailable)
    - [isMotionRequestOutcomeAvailable()](#ismotionrequestoutcomeavailable)
    - [requestMotionAuthorization()](#requestmotionauthorization)
    - [getMotionAuthorizationStatus()](#getmotionauthorizationstatus)
  - [NFC module](#nfc-module)
    - [NFCState constants](#nfcstate-constants)
    - [isNFCPresent()](#isnfcpresent)
    - [isNFCEnabled()](#isnfcenabled)
    - [isNFCAvailable()](#isnfcavailable)
    - [registerNFCStateChangeHandler()](#registernfcstatechangehandler)
    - [switchToNFCSettings()](#switchtonfcsettings)
  - [External storage module](#external-storage-module)
    - [isExternalStorageAuthorized()](#isexternalstorageauthorized)
    - [getExternalStorageAuthorizationStatus()](#getexternalstorageauthorizationstatus)
    - [requestExternalStorageAuthorization()](#requestexternalstorageauthorization)
    - [getExternalSdCardDetails()](#getexternalsdcarddetails)
- [Platform Notes](#platform-notes)
  - [Android](#android)
    - [Android permissions](#android-permissions)
    - [Android Auto Backup](#android-auto-backup)
  - [iOS](#ios)
    - [iOS usage description messages](#ios-usage-description-messages)
- [Example project](#example-project)
  - [Screenshots](#screenshots)
    - [Android](#android-1)
    - [iOS](#ios-1)
- [Release notes](#release-notes)
- [Credits](#credits)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Overview

This Cordova/Phonegap plugin for iOS & Android is used to manage device settings such as Location,  Bluetooth and WiFi. It enables management of run-time permissions, device hardware and core OS features.

The plugin is registered in on [npm](https://www.npmjs.com/package/cordova.plugins.diagnostic) as `cordova.plugins.diagnostic`

<!-- DONATE -->
[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG_global.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZRD3W47HQ3EMJ)

I dedicate a considerable amount of my free time to developing and maintaining this Cordova plugin, along with my other Open Source software.
To help ensure this plugin is kept updated, new features are added and bugfixes are implemented quickly, please donate a couple of dollars (or a little more if you can stretch) as this will help me to afford to dedicate time to its maintenance. Please consider donating if you're using this plugin in an app that makes you money, if you're being paid to make the app, if you're asking for new features or priority bug fixes.
<!-- END DONATE -->


## Important notes

### Minimum supported versions
- Cordova CLI: `cordova@9.0.0`
- Android platform: `cordova-android@8.0.0` (recommended version `cordova-android@9.0.0`)
    - Android version: Android 5.0 (API 21)
- iOS platform: `cordova-ios@5.0.0`
    - iOS 10.0

Note: If you need to support older OS versions, please use an older version of this plugin.

### Native environment required
Note that this plugin is intended for use in a **native** mobile environment.
It will **NOT** work in a browser-emulated Cordova environment, for example by running `cordova serve` or using the [Ripple emulator](https://github.com/ripple-emulator/ripple).
### Building for Android

In order to avoid build problems with Android, please make sure you have the latest versions of the following Android SDK components installed:

- Android SDK Tools
- Android SDK Platform-tools
- Android SDK Build-tools
- Target SDK Platform - e.g. Android 10.0 (API 29)
- Google Repository

* Make sure you have a [supported version](#minimum-supported-versions) of the `cordova-android` platform installed.
    * You can check if the Android platform in your Cordova project is up-to-date using `cordova platform check android` and if it's not, update it using `cordova platform rm android && cordova platform add android@latest`.
    * Since `cordova.plugins.diagnostic@6` the recommended Cordova Android platform version is `cordova-android@9.0.0` (which includes AndroidX support).
    * To use this plugin with `cordova-android@8`, install [cordova-plugin-androidx](https://github.com/dpa99c/cordova-plugin-androidx) and [cordova-plugin-androidx-adapter](https://github.com/dpa99c/cordova-plugin-androidx-adapter).
* Phonegap Build uses should use the latest available CLI version ([listed here](https://build.phonegap.com/current-support)) by specifying using the `phonegap-version` tag in your `config.xml`.

# Installation

## Using the Cordova/Phonegap/Ionic CLI

    $ cordova plugin add cordova.plugins.diagnostic
    $ cordova plugin add cordova.plugins.diagnostic --variable ANDROIDX_VERSION=1.0.0
    $ phonegap plugin add cordova.plugins.diagnostic
    $ ionic cordova plugin add cordova.plugins.diagnostic

## AndroidX Library
This plugin uses/depends on the [AndroidX (Jetpack) libraries](https://developer.android.com/jetpack/androidx) (these supersede the [Android Support Library](https://developer.android.com/topic/libraries/support-library/index.html) which is no longer used by this plugin since `cordova.plugins.diagnostic@6`).

This plugin pins default versions of the legacy and appcompat versions of the library  in [its `plugin.xml`](https://github.com/dpa99c/cordova-diagnostic-plugin/blob/master/plugin.xml) however you can override these to specify different versions using the `ANDROIDX_VERSION` (legacy) and `ANDROIDX_APPCOMPAT_VERSION` variables at plugin installation time, for example:

    $ cordova plugin add cordova.plugins.diagnostic --variable ANDROIDX_VERSION=1.0.0 --variable ANDROIDX_APPCOMPAT_VERSION=1.3.1


## Specifying modules
Since `cordova.plugins.diagnostic@4` the plugin is split into optional functional modules.
The reason for this is so you can choose to install only those parts of the plugin you'll use and therefore not install redundant code/components/frameworks.

By default, all the modules will be added to your project when you install the plugin.

You can specify which modules are installed by adding a `<preference>` to your `config.xml` which specifies the modules you wish to add as a space-separated list.
Module names should be capitalised.

The preference takes the form:

    <preference name="cordova.plugins.diagnostic.modules" value="[list of modules]" />

For example, to explicitly include all optional modules:

    <preference name="cordova.plugins.diagnostic.modules" value="LOCATION BLUETOOTH WIFI CAMERA NOTIFICATIONS MICROPHONE CONTACTS CALENDAR REMINDERS MOTION NFC EXTERNAL_STORAGE" />

To install only the core module and no optional modules, leave the preference value blank:

    <preference name="cordova.plugins.diagnostic.modules" value="" />

**IMPORTANT:** After adding the preference to your `config.xml`, you'll need to uninstall then re-install the plugin to your project to apply the changes:
```
cordova plugin rm cordova.plugins.diagnostic --nosave && cordova plugin add cordova.plugins.diagnostic --nosave
```

### Available modules

The following optional modules are currently supported by the plugin:

- [LOCATION](#location-module) - Android & iOS
- [BLUETOOTH](#bluetooth-module) - Android & iOS
- [WIFI](#wifi-module) - Android & iOS
- [CAMERA](#camera-module) - Android & iOS
- [NOTIFICATIONS](#notifications-module) - Android & iOS
- [MICROPHONE](#microphone-module) - Android & iOS
- [CONTACTS](#contacts-module) - Android & iOS
- [CALENDAR](#calendar-module) - Android & iOS
- [REMINDERS](#reminders-module) - iOS
- [MOTION](#motion-module) - iOS
- [NFC](#nfc-module) - Android
- [EXTERNAL_STORAGE](#external-storage-module) - Android

**IMPORTANT:** It's vital that the preference be added to your `config.xml` **before** you install the plugin, otherwise the preference will not be applied and all modules will be added.
This is because, due to limitations of the Cordova CLI hooks, this plugin must use the `npm install` process to apply the module preferences and this runs before the Cordova CLI when installing a plugin.
If you change the modules specified in the preference, you'll need to uninstall then re-install the plugin to your project to apply the changes.

# Reporting issues
**IMPORTANT:** Please read the following carefully.
Failure to follow the issue template guidelines below will result in the issue being immediately closed.

## Reporting a bug or problem
Before [opening a bug issue](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/new?assignees=&labels=&template=bug_report.md&title=), please do the following:
- *DO NOT* open issues asking for support in using/integrating the plugin into your project
    - Only open issues for suspected bugs/issues with the plugin that are generic and will affect other users
    - I don't have time to offer free technical support: this is free open-source software
    - Ask for help on StackOverflow, Ionic Forums, etc.
    - Use the [example project](https://github.com/dpa99c/cordova-diagnostic-plugin-example) as a known working reference
    - Any issues requesting support will be closed immediately.
- *DO NOT* open issues related to the  [Ionic Typescript wrapper for this plugin](https://github.com/ionic-team/ionic-native/blob/master/src/%40ionic-native/plugins/diagnostic/index.ts)
    - This is owned/maintained by [Ionic](https://github.com/ionic-team) and is not part of this plugin
    - Please raise such issues/PRs against [Ionic Native](https://github.com/ionic-team/ionic-native/) instead.
    - To verify an if an issue is caused by this plugin or its Typescript wrapper, please re-test using the vanilla Javascript plugin interface (without the Ionic Native wrapper).
    - Any issue opened here which is obviously an Ionic Typescript wrapper issue will be closed immediately.
- Read the above documentation thoroughly
- Check the [CHANGELOG](https://github.com/dpa99c/cordova-diagnostic-plugin/blob/master/CHANGELOG.md) for any breaking changes that may be causing your issue.
- Check a similar issue (open or closed) does not already exist against this plugin.
    - Duplicates or near-duplicates will be closed immediately.
- When [creating a new issue](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/new/choose)
    - Choose the "Bug report" template
    - Fill out the relevant sections of the template and delete irrelevant sections
    - *WARNING:* Failure to complete the issue template will result in the issue being closed immediately.
- Reproduce the issue using the [example project](https://github.com/dpa99c/cordova-diagnostic-plugin-example)
    - This will eliminate bugs in your code or conflicts with other code as possible causes of the issue
    - This will also validate your development environment using a known working codebase
    - If reproducing the issue using the example project is not possible, create an isolated test project that you are able to share
- Include full verbose console output when reporting build issues
    - If the full console output is too large to insert directly into the Github issue, then post it on an external site such as [Pastebin](https://pastebin.com/) and link to it from the issue
    - Often the details of an error causing a build failure is hidden away when building with the CLI
        - To get the full detailed console output, append the `--verbose` flag to CLI build commands
        - e.g. `cordova build ios --verbose`
    - Failure to include the full console output will result in the issue being closed immediately
- If the issue relates to the plugin documentation (and not the code), please of a [documentation issue](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/new?assignees=&labels=&template=documentation-issue.md&title=)

## Requesting a new feature
Before [opening a feature request issue](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/new?assignees=&labels=&template=feature_request.md&title=), please do the following:
- Check the above documentation to ensure the feature you are requesting doesn't already exist
- Check the list if open/closed issues to check if there's a reason that feature hasn't been included already
- Ensure the feature you are requesting is actually possible to implement and generically useful to other users than yourself
- Where possible, post a link to the documentation related to the feature you are requesting
- Include other relevant links, e.g.
    - Stack Overflow post illustrating a solution
    - Code within another Github repo that illustrates a solution


# Usage

The core plugin module is exposed via the global `cordova.plugins.diagnostic` object and it aliases all functions and properties of the other optional modules.
If a function is called on the core module for an optional module which is not installed, a JS error will be raised by the core module.

## Core module

Purpose: Generic and miscellaneous functionality.

Platforms: Android & iOS

Configuration name: N/A - always installed, regardless of whether the module preference key is present in `config.xml`.

### switchToSettings()

Platforms: Android and iOS

Opens settings page for this app.

On Android, this opens the "App Info" page in the Settings app.

On iOS, this opens the app settings page in the Settings app.

    cordova.plugins.diagnostic.switchToSettings(successCallback, errorCallback);

#### Parameters

- {Function} successCallback - The callback which will be called when switch to settings is successful.
- {Function} errorCallback - The callback which will be called when switch to settings encounters an error. The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.switchToSettings(function(){
        console.log("Successfully switched to Settings app");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### switchToWirelessSettings()

Platforms: Android

Switches to the wireless settings page in the Settings app.
Allows configuration of wireless controls such as Wi-Fi, Bluetooth and Mobile networks.

    cordova.plugins.diagnostic.switchToWirelessSettings();

### switchToMobileDataSettings()

Platforms: Android

Displays mobile settings to allow user to enable mobile data.

    cordova.plugins.diagnostic.switchToMobileDataSettings();


### permissionStatus constants

Platforms: Android and iOS

Both Android and iOS define constants for requesting and reporting the various permission states.

    cordova.plugins.diagnostic.permissionStatus

#### Android

The following permission states are defined for Android:

- `NOT_REQUESTED` - App has not yet requested access to this permission.
App can request permission and user will be prompted to allow/deny.
- `DENIED_ONCE` - User denied access to this permission (without checking "Never Ask Again" box).
App can request permission again and user will be prompted again to allow/deny again.
- `DENIED_ALWAYS` - User denied access to this permission and checked "Never Ask Again" box.
App can never ask for permission again.
The only way around this is to instruct the user to manually change the permission on the app permissions page in Settings.
- `GRANTED` - User granted access to this permission or the device is running Android 5.x or below.

⚠ Since it's impossible to distinguish between NOT_REQUESTED and DENIED_ALWAYS using the native Android runtime permissions API (they both return the same constant value), this plugin attempts to distinguish the difference by using HTML5 local storage to keep track of which permissions have been requested since the app was first installed. On requesting a permission for the first time, an entry is put into local storage against the permission name. If the user then selects DENY_ALWAYS, the plugin uses the flag in local storage to distinguish this from NOT_REQUESTED.

Some things to watch out for:

 - Clearing local storage will result in this data being lost and will result in NOT_REQUESTED being returned even if the user previously chose to always deny permission.
 - If the relevant `<uses-permission>` tag is missing from the Android manifest, then the native API will return the NOT_REQUESTED/DENIED_ALWAYS constant value. Since the plugin is unable to make the native permissions request in order to show the native dialog, the plugin will always return NOT_REQUESTED.

If [Android Autobackup](https://developer.android.com/guide/topics/data/backup.html#Choosing) is enabled (which it is by default ), Android does not backup app permissions after uninstall but does backup HTML5 local storage. This may lead to a permission being reported by the plugin as DENIED_ALWAYS when the actual status is NOT_REQUESTED.
To avoid this you may want to disable Android Autobackup. You can do this using the [cordova-custom-config plugin](https://github.com/dpa99c/cordova-custom-config), for example:

```
<platform name="android">
    <plugin name="cordova-custom-config" version="*"/>
    <custom-preference name="android-manifest/application/@android:allowBackup" value="false" />
    <custom-preference name="android-manifest/application/@android:fullBackupContent" value="false" />
</platform>
```

#### iOS

The following permission states are defined for iOS:

- `NOT_REQUESTED` - App has not yet requested access to this permission.
App can request permission and user will be prompted to allow/deny.
- `DENIED_ALWAYS` - User denied access to this permission.
App can never ask for permission again.
The only way around this is to instruct the user to manually change the permission in Settings.
- `RESTRICTED` - Permission is unavailable and user cannot enable it.
For example, when parental controls are in effect for the current user.
- `GRANTED` - User granted access to this permission.
For location permission, this indicates the user has granted access to the permission "always" (when app is both in foreground and background).
- `GRANTED_WHEN_IN_USE` - Used only for location permission.
Indicates the user has granted access to the permission "when in use" (only when the app is in the foreground).

Addtionally, for notifications permissions:
- `PROVISIONAL` - The app is provisionally authorized to post non-interruptive user notifications.
- `EPHEMERAL` - The app is authorized to schedule or receive notifications for a limited amount of time.

#### Example

    if(somePermissionStatus === cordova.plugins.diagnostic.permissionStatus.GRANTED){
        // Do something
    }

### getPermissionAuthorizationStatus()

Platforms: Android

Returns the current authorisation status for a given permission.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful retrieval of status.
The function is passed a single string parameter which defines the current [permission status](#permissionstatus-constants)
- {Function} errorCallback - function to call on failure to retrieve authorisation status.
The function is passed a single string parameter containing the error message.
- {String} permission - permission to request authorisation status for, defined as a [runtime permission constant](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.getPermissionAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted to use the camera");
                break;
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission to use the camera has not been requested yet");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                console.log("Permission denied to use the camera - ask again?");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.permission.CAMERA);

### getPermissionsAuthorizationStatus()

Platforms: Android

Returns the current authorisation status for multiple permissions.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful retrieval of status.
The function is passed a single object parameter which defines a key/value map, where the key is the requested [runtime permission](#dangerous-runtime-permissions), and the value is the current [permission status](#permissionstatus-constants).
- {Function} errorCallback - function to call on failure to retrieve authorisation status.
The function is passed a single string parameter containing the error message.
- {Array} permissions - list of permissions to request authorisation statuses for, defined as [runtime permission constants](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.getPermissionsAuthorizationStatus(function(statuses){
        for (var permission in statuses){
            switch(statuses[permission]){
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                    console.log("Permission denied to use "+permission+" - ask again?");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                    break;
            }
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    },[
        cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION,
        cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION
    ]);

### requestRuntimePermission()

Platforms: Android

Requests app to be granted authorisation for a runtime permission.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful request for runtime permission.
The function is passed a single string parameter which defines the resulting [permission status](#permissionstatus-constants)
- {Function} errorCallback - function to call on failure to request authorisation.
The function is passed a single string parameter containing the error message.
- {String} permission - permission to request authorisation for, defined as a [runtime permission constant](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.requestRuntimePermission(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted to use the camera");
                break;
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission to use the camera has not been requested yet");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCe:
                console.log("Permission denied to use the camera - ask again?");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.permission.CAMERA);

### requestRuntimePermissions()

Platforms: Android

Requests app to be granted authorisation for multiple runtime permissions.

Note: this is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

#### Parameters

- {Function} successCallback - function to call on successful request for runtime permissions.
The function is passed a single object parameter which defines a key/value map, where the key is the [runtime permission](#dangerous-runtime-permissions) to request, and the value is the current [permission status](#permissionstatus-constants).
- {Function} errorCallback - function to call on failure to request authorisation.
The function is passed a single string parameter containing the error message.
- {Array} permissions - list of permissions to request authorisation for, defined as [runtime permission constants](#dangerous-runtime-permissions).

#### Example usage

    cordova.plugins.diagnostic.requestRuntimePermissions(function(statuses){
        for (var permission in statuses){
            switch(statuses[permission]){
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                    console.log("Permission denied to use "+permission+" - ask again?");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission+" - guess we won't be using it then!");
                    break;
            }
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    },[
        cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION,
        cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION
    ]);

### isRequestingPermission()

Platforms: Android

Indicates if the plugin is currently requesting a runtime permission via the native API.
Note that only one request can be made concurrently because the native API cannot handle concurrent requests,
so the plugin will invoke the error callback if attempting to make more than one simultaneous request.
Multiple permission requests should be grouped into a single call since the native API is setup to handle batch requests of multiple permission groups.

    var isRequesting = cordova.plugins.diagnostic.isRequestingPermission();

#### Example usage

    var isRequesting = cordova.plugins.diagnostic.isRequestingPermission();
    if(!isRequesting){
        requestSomePermissions();
    }else{
        cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(function(statuses){
            cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(null); // de-register handler after single call
            requestSomePermissions();
        });
    }

### registerPermissionRequestCompleteHandler()

Platforms: Android

Registers a function to be called when a runtime permission request has completed.
Pass in a falsey value to de-register the currently registered function.

    cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(successCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when a runtime permission request has completed.
The function is passed a single object parameter which defines a key/value map, where the key is the permission requested (defined as a value in cordova.plugins.diagnostic.permission) and the value is the resulting authorisation status of that permission as a value in cordova.plugins.diagnostic.permissionStatus.

#### Example usage

    function onPermissionRequestComplete(statuses){
        console.info("Permission request complete");
        for (var permission in statuses){
            switch(statuses[permission]){
                case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                    console.log("Permission granted to use "+permission);
                    break;
                case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                    console.log("Permission to use "+permission+" has not been requested yet");
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                    console.log("Permission denied to use "+permission);
                    break;
                case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied to use "+permission);
                    break;
            }
        }
        cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(null); // de-register handler
    }
    cordova.plugins.diagnostic.registerPermissionRequestCompleteHandler(onPermissionRequestComplete);

### isDataRoamingEnabled()

Platforms: Android

Checks if the device data roaming setting is enabled.
Returns true if data roaming is enabled.
Not available on Android 12L / API 32+

    cordova.plugins.diagnostic.isDataRoamingEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
The function is passed a single boolean parameter which is TRUE if data roaming is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isDataRoamingEnabled(function(enabled){
        console.log("Data roaming is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### isADBModeEnabled()

Platforms: Android

Checks if the device setting for ADB(debug) is switched on.
Returns true if ADB(debug) setting is switched on.

    cordova.plugins.diagnostic.isADBModeEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if ADB mode(debug mode) is switched on.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isADBModeEnabled(function(enabled){
        console.log("ADB mode(debug mode) is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isDeviceRooted()

Platforms: Android

Checks if the device is rooted.
Returns true if the device is rooted.

    cordova.plugins.diagnostic.isDeviceRooted(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if the device is rooted.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isDeviceRooted(function(rooted){
        console.log("device is " + (rooted ? "rooted" : "not rooted"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### isBackgroundRefreshAuthorized()

Platforms: iOS

Checks if the application is authorized for background refresh.

    cordova.plugins.diagnostic.isBackgroundRefreshAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if background refresh access is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isBackgroundRefreshAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "not authorized") + " to perform background refresh");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getBackgroundRefreshStatus()

Platforms: iOS

Returns the background refresh authorization status for the application.

    cordova.plugins.diagnostic.getBackgroundRefreshStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getBackgroundRefreshStatus(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Background refresh is allowed");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### cpuArchitecture constants

Platforms: Android and iOS

Defines constants for the various CPU architectures of the current hardware returned by [getArchitecture()](#getarchitecture).

    cordova.plugins.diagnostic.cpuArchitecture

#### Android

- `UNKNOWN` - Unknown CPU architecture
- `ARMv6` - ARM v6 or below (32 bit)
- `ARMv7` - ARM v7 (32 bit)
- `ARMv8` - ARM v8 (64 bit)
- `X86` - Intel x86 (32 bit)
- `X86_64` - Intel x86 (64 bit)
- `MIPS` - MIPS (32 bit)
- `MIPS_64` - MIPS (64 bit)

#### iOS

- `UNKNOWN` - Unknown CPU architecture
- `ARMv6` - ARM v6 or below (32 bit)
- `ARMv7` - ARM v7 (32 bit)
- `ARMv8` - ARM v8 (64 bit)
- `X86` - Intel x86 (32 bit)
- `X86_64` - Intel x86 (64 bit)

#### Example usage

See [getArchitecture()](#getarchitecture).


### getArchitecture()

Platforms: Android and iOS

Returns the CPU architecture of the current device.

    cordova.plugins.diagnostic.getArchitecture(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which indicates the location authorization status as a [cpuArchitecture constant](#cpuarchitecture-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getArchitecture(function(arch){
        if(arch === cordova.plugins.diagnostic.cpuArchitecture.X86
        || arch === cordova.plugins.diagnostic.cpuArchitecture.X86_64){
            console.log("Intel inside");
        }
    }, function(error){
        console.error(error);
    });


### restart()

Platforms: Android

Restarts the application.
By default, a "warm" restart will be performed in which the main Cordova activity is immediately restarted, causing the Webview instance to be recreated.

However, if the `cold` parameter is set to true, then the application will be "cold" restarted, meaning a system exit will be performed, causing the entire application to be restarted.
This is useful if you want to fully reset the native application state but will cause the application to briefly disappear and re-appear.

Note: There is no `successCallback()` since if the operation is successful, the application will restart immediately before any success callback can be applied.

    cordova.plugins.diagnostic.restart(errorCallback, cold);

#### Parameters

- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
- {Boolean} cold - if true the application will be cold restarted. Defaults to false.


#### Example usage

    var onError = function(error){
        console.error("The following error occurred: "+error);
    }

    // Warm restart
    cordova.plugins.diagnostic.restart(onError, false);

    // Cold restart
    cordova.plugins.diagnostic.restart(onError, true);


### enableDebug()

Platforms: Android and iOS

Enables the plugin's debug mode, which logs native debug messages related to anything done with the plugin to the native and JS consoles.
- For Android, log messages will appear in the native logcat output and in the JS console if Chrome Developer Tools is connected to the app Webview.
- For iOS, log messages will appear in the native Xcode console output and in the JS console if Safari Web Inspector is connected to the app Webview.
- Debug mode is initially disabled on plugin initialisation.

```
cordova.plugins.diagnostic.enableDebug(successCallback);
```

#### Parameters

- {Function} successCallback - The callback which will be called when debug has been enabled.

#### Example usage

    cordova.plugins.diagnostic.enableDebug(function(){
        console.log("Debug is enabled"));
    });

### getCurrentBatteryLevel()

Platforms: Android and iOS

Returns the current battery level of the device as a percentage.


    cordova.plugins.diagnostic.getCurrentBatteryLevel(successCallback, successCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single `int` parameter which indicates the current battery level percentage.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single `string` parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getCurrentBatteryLevel(function(level){
        console.log(`Current battery level is ${level}%`);
    });

### isAirplaneModeEnabled()

Platforms: Android

Checks if Airplane mode is currently enabled.


    cordova.plugins.diagnostic.isAirplaneModeEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if Airplane mode is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isAirplaneModeEnabled(function(enabled){
        console.log(`Airplane mode is currently ${enabled ? 'enabled' : 'disabled'}%`);
    });


=======
    
### isMobileDataEnabled()

Platforms: Android and iOS

Checks if mobile (cellular) data is currently enabled on the device.

On Android this requires permission `<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />`


    cordova.plugins.diagnostic.isMobileDataEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if mobile data is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isMobileDataEnabled(function(enabled){
        console.log(`Mobile data is currently ${enabled ? 'enabled' : 'disabled'}%`);
    });
    
### isAccessibilityModeEnabled()

Platforms: Android and iOS

Checks if Accessibility Mode (Talkback on Android, VoiceOver on iOS) is currently enabled on the device.

    cordova.plugins.diagnostic.isAccessibilityModeEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
This callback function is passed a single boolean parameter which is TRUE if accessibility mode is enabled.
- {Function} errorCallback -  The callback which will be called when the operation encounters an error.
 This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isAccessibilityModeEnabled(function(enabled){
        console.log(`Accessibility Mode is currently ${enabled ? 'enabled' : 'disabled'}%`);
    });
    

### isTouchExplorationEnabled()

Platforms: Android

Checks if touch exploration (in accessibility mode) is currently enabled on the device.

    cordova.plugins.diagnostic.isTouchExplorationEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
This callback function is passed a single boolean parameter which is TRUE if touch exploration (in accessibility mode) is enabled.
- {Function} errorCallback -  The callback which will be called when the operation encounters an error.
 This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isTouchExplorationEnabled(function(enabled){
        console.log(`touch exploration is currently ${enabled ? 'enabled' : 'disabled'}%`);
    });
    

### getDeviceOSVersion()

Platforms: Android and iOS

Returns details of the OS of the device on which the app is currently running.


    cordova.plugins.diagnostic.getDeviceOSVersion(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is  passed a single object parameter with the following fields:
    - {string} version - version string of the OS e.g. "11.0"
    - {integer} apiLevel - API level of the OS e.g. 30 on Android / 16000 on iOS
    - {string} apiName - code name for API level e.g. "FROYO" on Android / "11.0" on iOS
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.getDeviceOSVersion(function(details){
        console.log(`Version: ${details.version}%`); // "13.0"
        console.log(`API level: ${details.apiLevel}%`); // 33
        console.log(`API name: ${details.apiName}%`); // "TIRAMISU"
    });

### getBuildOSVersion()

Platforms: Android and iOS

Returns details of the SDK levels used to build the app.


    cordova.plugins.diagnostic.getBuildOSVersion(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is  passed a single object parameter with the following fields:
    - {integer} targetApiLevel - API level of the target SDK (used to build the app) e.g. 30 on Android / 16000 on iOS
    - {string} targetApiName - code name for API level of the target SDK e.g. "FROYO" on Android / "11.0" on iOS
    - {integer} minApiLevel - API level of the minimum SDK (lowest on which the app can be installed) e.g. 30 on Android / 16000 on iOS
    - {string} minApiName - code name for API level of the minimum SDK e.g. "FROYO" on Android / "11.0" on iOS
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.getBuildOSVersion(function(details){
        console.log(`Target API level: ${details.targetApiLevel}%`); // 33
        console.log(`Target API name: ${details.targetApiLevel}%`); // "TIRAMISU"
        console.log(`Minimum API level: ${details.targetApiLevel}%`); // 21
        console.log(`Target API name: ${details.targetApiLevel}%`); // "LOLLIPOP"
    });



## Location module

Purpose: Location/GPS functionality

Platforms: Android & iOS

Configuration name: `LOCATION`

### locationMode constants

Platforms: Android

Defines constants for the various location modes on Android.

    cordova.plugins.diagnostic.locationMode

#### Values

- `HIGH_ACCURACY` - GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
- `BATTERY_SAVING` - Network triangulation and Wifi network IDs (low accuracy)
- `DEVICE_ONLY` -  GPS hardware (high accuracy)
- `LOCATION_OFF` - Location services disabled (no accuracy)

#### Example

    cordova.plugins.diagnostic.getLocationMode(function(locationMode){
        switch(locationMode){
            case cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY:
                console.log("High accuracy");
                break;
            case cordova.plugins.diagnostic.locationMode.BATTERY_SAVING:
                console.log("Battery saving");
                break;
            case cordova.plugins.diagnostic.locationMode.DEVICE_ONLY:
                console.log("Device only");
                break;
            case cordova.plugins.diagnostic.locationMode.LOCATION_OFF:
                console.log("Location off");
                break;
        }
    },function(error){
        console.error("The following error occurred: "+error);
    });

### locationAuthorizationMode constants

Platforms: Android & iOS

Defines constants for the various location authorization modes on iOS and Android >= 10.

    cordova.plugins.diagnostic.locationAuthorizationMode

#### Values

- `ALWAYS` - Requires constant access to location in order to track position, even when the screen is off or the app is in the background.
- `WHEN_IN_USE` - Requires access to location when the screen is on and the app is displayed.

#### Example

    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        console.log(status);
    }, function(error){
        console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.WHEN_IN_USE);

_Requesting the `ALWAYS` permission initially with `requestLocationAuthorization()`, on Android 11/API 30 and iOS 13+ versions onwards is not advised and may lead to unexpected behaviour. See [requestLocationAuthorization()](#requestlocationauthorization)_

### locationAccuracyAuthorization constants

Platforms: Android & iOS

- Defines constants for the various location accuracy authorization states on iOS 14+ and Android 12+.
- See [CLAccuracyAuthorization](https://developer.apple.com/documentation/corelocation/claccuracyauthorization) for iOS 14+ and [approximate location](https://developer.android.com/training/location/permissions#approximate-request) for Android 12+

```
cordova.plugins.diagnostic.locationAccuracyAuthorization
```

#### Values

- `FULL` - The user authorized the app to access location data with full accuracy.
- `REDUCED` - The user authorized the app to access location data with reduced accuracy.


### isLocationAvailable()

Platforms: Android & iOS

Checks if app is able to access device location.

    cordova.plugins.diagnostic.isLocationAvailable(successCallback, errorCallback);

On iOS this returns true if both the device setting is enabled AND the application is authorized to use location.
When location is enabled, the locations returned are by a mixture GPS hardware, network triangulation and Wifi network IDs.

On Android, this returns true if Location mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
AND if the app is authorised to use location.
When location is enabled, the locations returned are dependent on the location mode:

* Battery saving = network triangulation and Wifi network IDs (low accuracy)
* Device only = GPS hardware only (high accuracy)
* High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if location is available for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationAvailable(function(available){
        console.log("Location is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isLocationEnabled()

Platforms: Android and iOS

Returns true if the device setting for location is on.
On Android this returns true if Location Mode is switched on.
On iOS this returns true if Location Services is switched on.

    cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if location setting is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
        console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isGpsLocationAvailable()

Platforms: Android

Checks if high-accuracy locations are available to the app from GPS hardware.
Returns true if Location mode is enabled and is set to "Device only" or "High accuracy" AND if the app is authorised to use location.

    cordova.plugins.diagnostic.isGpsLocationAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if high-accuracy GPS-based location is available.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
        console.log("GPS location is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isGpsLocationEnabled()

Platforms: Android

Checks if the device location setting is set to return high-accuracy locations from GPS hardware.
Returns true if Location mode is enabled and is set to either:

- Device only = GPS hardware only (high accuracy)
- High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

```
cordova.plugins.diagnostic.isGpsLocationEnabled(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if device setting is set to return high-accuracy GPS-based location.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        console.log("GPS location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isNetworkLocationAvailable()

Platforms: Android

Checks if low-accuracy locations are available to the app from network triangulation/WiFi access points.
Returns true if Location mode is enabled and is set to "Battery saving" or "High accuracy"
AND if the app is authorised to use location.

    cordova.plugins.diagnostic.isNetworkLocationAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if low-accuracy network-based location is available.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNetworkLocationAvailable(function(available){
        console.log("Network location is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isNetworkLocationEnabled()

Platforms: Android

Checks if location mode is set to return low-accuracy locations from network triangulation/WiFi access points
Returns true if Location mode is enabled and is set to either:

- Battery saving = network triangulation and Wifi network IDs (low accuracy)
- High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)

```
cordova.plugins.diagnostic.isNetworkLocationEnabled(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if device setting is set to return low-accuracy network-based location.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNetworkLocationEnabled(function(enabled){
        console.log("Network location is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### getLocationMode()

Platforms: Android

Returns the current location mode setting for the device.

    cordova.plugins.diagnostic.getLocationMode(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter indicating the current location mode
as a constant in `cordova.plugins.diagnostic.locationMode`.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.getLocationMode(function(locationMode){
        switch(locationMode){
            case cordova.plugins.diagnostic.locationMode.HIGH_ACCURACY:
                console.log("High accuracy");
                break;
            case cordova.plugins.diagnostic.locationMode.BATTERY_SAVING:
                console.log("Battery saving");
                break;
            case cordova.plugins.diagnostic.locationMode.DEVICE_ONLY:
                console.log("Device only");
                break;
            case cordova.plugins.diagnostic.locationMode.LOCATION_OFF:
                console.log("Location off");
                break;
        }
    },function(error){
        console.error("The following error occurred: "+error);
    });

### isLocationAuthorized()

Platforms: Android and iOS

Checks if the application is authorized to use location.

Notes for Android:

- This is intended for Android 6 / API 23 and above.
Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

```
cordova.plugins.diagnostic.isLocationAuthorized(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter.
On iOS this will return TRUE if application is authorized to use location either "when in use" (only in foreground) OR "always" (foreground and background).
On Android this will return TRUE if the app currently has runtime authorisation to use location.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
        console.log("Location is " + (authorized ? "authorized" : "unauthorized"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getLocationAuthorizationStatus()

Platforms: Android and iOS

Returns the location authorization status for the application.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
- This is the combined location status for both `COARSE` and `FINE` permissions.
- On Android 10+/API 29+, if `COARSE` or `FINE` permission is `GRANTED` but `BACKGROUND_LOCATION` permission is not `GRANTED`, will return `GRANTED_WHEN_IN_USE`.

```
cordova.plugins.diagnostic.getLocationAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the location authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example iOS usage

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
       switch(status){
           case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
               console.log("Permission not requested");
               break;
           case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
               console.log("Permission denied");
               break;
           case cordova.plugins.diagnostic.permissionStatus.GRANTED:
               console.log("Permission granted always");
               break;
           case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
               console.log("Permission granted only when in use");
               break;
       }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

#### Example Android usage

    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
                console.log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
               console.log("Permission granted always");
               break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
               console.log("Permission granted only when in use (Android >= 10)");
               break;

        }
    }, function(error){
        console.error(error);
    });

### getLocationAuthorizationStatuses()

Platforms: Android

Returns the individual location authorization status for each type of location access (`FINE`, `COARSE` and `BACKGROUND`).

- Calling on Android 5.1 / API 22 and below will always return `GRANTED` status as permissions are already granted at installation time.
- Calling on Android 9 / API 28 and below, `BACKGROUND_LOCATION` permission is always implicitly `GRANTED`.

```
cordova.plugins.diagnostic.getLocationAuthorizationStatuses(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single array parameter which contains a list indicating the authorization status of each location permission as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

```
cordova.plugins.diagnostic.getLocationAuthorizationStatuses(function(statuses){
    console.log("FINE permission status: " + statuses[cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION])
    console.log("COARSE permission status: " + statuses[cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION])
    console.log("BACKGROUND permission status: " + statuses[cordova.plugins.diagnostic.permission.ACCESS_BACKGROUND_LOCATION])
}, function(error){
    console.error(error);
});
```

### requestLocationAuthorization()

Platforms: Android and iOS

Requests location authorization for the application.

Notes for iOS:

- Authorization can be requested to use location either "when in use" (only in foreground) or "always" (foreground and background).
- This should only be called if authorization status is `NOT_REQUESTED` - calling it when in any other state will have no effect.
- When calling this function, the messages contained in the `NSLocationWhenInUseUsageDescription` and `NSLocationAlwaysAndWhenInUseUsageDescription` (iOS 11+) / `NSLocationAlwaysUsageDescription` (iOS 10)  .plist keys are displayed to the user when requesting to use location **always** or **when in use**, respectively;
this plugin provides default messages, but you should override them with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise them.
- From iOS 13+, setting `mode` to `cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS`, will initially present the user with a `WHEN_IN_USE` dialog.
- From iOS 14+, the resulting permission status depends on whether on which mode was requested (see [issue #454](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/454)):

| Permission requested | User choice | Native constant | Plugin constant |
| -------------------- | ----------- | --------------- | --------------- |
| ALWAYS | Allow While Using App | `kCLAuthorizationStatusAuthorizedAlways` | `GRANTED` |
| ALWAYS | Allow Once | `kCLAuthorizationStatusAuthorizedWhenInUse` | `GRANTED_WHEN_IN_USE` |
| WHEN_IN_USE | Allow While Using App | `kCLAuthorizationStatusAuthorizedWhenInUse` | `GRANTED_WHEN_IN_USE` |
| WHEN_IN_USE | Allow Once | `kCLAuthorizationStatusAuthorizedWhenInUse` | `GRANTED_WHEN_IN_USE` |

Notes for Android:

- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- For Android 11+ / API 30+), make an initial request with `mode` set to `cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS` will NOT present the user with a dialog at all and immediately returns a `DENIED` result.
    - You must request `mode=WHEN_IN_USE` _before_ requesting `mode=ALWAYS`
- The successCallback is invoked in response to the user's choice in the permission dialog and is passed the resulting authorization status.
- When the plugin is running on/built with Android 10+ / API 29+, you can request background location permission by specifying the `mode` argument as `cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS`.
    - If the build SDK/device version is <= Android 9 / API 28, granting location permission implicitly grants background location permission.
- When the plugin is running on/built with Android 12+ / API 31+, you can specify requested location accuracy using the `accuracy` parameter.
    - If the build SDK/device version is <= Android 11 / API 30, `FULL` accuracy is implicitly granted.

```
cordova.plugins.diagnostic.requestLocationAuthorization(successCallback, errorCallback, mode, accuracy);
```

#### Parameters

- {Function} successCallback - Invoked in response to the user's choice in the permission dialog.
    - It is passed a single string parameter which defines the [resulting authorisation status](#runtime-permission-statuses).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
    - The function is passed a single string parameter containing the error message.
- {String} mode - (optional / iOS & Android >= 10) location authorization mode specified as a [locationAuthorizationMode constant](#locationauthorizationmode-constants).
    - If not specified, defaults to `WHEN_IN_USE`.
- {String} accuracy - (optional / Android 12+) requested location accuracy as a constant in `cordova.plugins.diagnostic.locationAccuracyAuthorization`
    - If not specified, defaults to `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`
    - On Android <12 & iOS, has no effect.

#### Example usage

    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                break;
        }
    }, function(error){
        console.error(error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS
    , cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED);

### registerLocationStateChangeHandler()

Platforms: Android and iOS

Registers a function to be called when a change in Location state occurs.
Pass in a falsey value to de-register the currently registered function.

This is triggered when Location state changes so is useful for detecting changes made in quick settings which would not result in pause/resume events being fired.

On Android, this occurs when the Location Mode is changed.

On iOS, this occurs when location authorization status is changed.
This can be triggered either by the user's response to a location permission authorization dialog,
by the user turning on/off Location Services,
or by the user changing the Location authorization state specifically for your app.

    cordova.plugins.diagnostic.registerLocationStateChangeHandler(successCallback);

#### Parameters

- {Function} successCallback - function call when a change in location state occurs.
On Android, the function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.locationMode`.
On iOS, the function is passed a single string parameter indicating the new location authorisation status as a constant in `cordova.plugins.diagnostic.permissionStatus`.

#### Example usage

    cordova.plugins.diagnostic.registerLocationStateChangeHandler(function(state){
        if((device.platform === "Android" && state !== cordova.plugins.diagnostic.locationMode.LOCATION_OFF)
            || (device.platform === "iOS") && ( state === cordova.plugins.diagnostic.permissionStatus.GRANTED
                || state === cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
        )){
            console.log("Location is available");
        }
    });

### getLocationAccuracyAuthorization()

Platforms: Android & iOS

Returns the location accuracy authorization for the application on iOS 14+ and Android 12+.
Note: calling on iOS <14 or Android <12 will always return `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`.

    cordova.plugins.diagnostic.getLocationAccuracyAuthorization(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the location accuracy authorization as a [locationAccuracyAuthorization constant](#locationaccuracyauthorization-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getLocationAccuracyAuthorization(function(accuracy){
       switch(accuracy){
           case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
               console.log("Full location accuracy is authorized");
               break;
           case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
               console.log("Reduced location accuracy is authorized");
               break;
       }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestTemporaryFullAccuracyAuthorization()

Platforms: iOS

Requests temporary access to full location accuracy for the application on iOS 14+.
- By default on iOS 14+, when a user grants location permission, the app can only receive reduced accuracy locations.
- If your app requires full (high-accuracy GPS) locations (e.g. a SatNav app), you need to call this method.
- You must specify a purpose corresponds to a key in the `NSLocationTemporaryUsageDescriptionDictionary` entry in your app's `*-Info.plist` containing a message explaining the user why your app needs their exact location.
You'll need to add this entry using a `<config-file>` or `<edit-config>` block in your `config.xml`, e.g.:


    <platform name="ios">
      <config-file target="*-Info.plist" parent="NSLocationTemporaryUsageDescriptionDictionary">
        <dict>
          <key>navigation</key>
          <string>This app requires access to your exact location in order to provide SatNav route navigation.</string>
          <key>emergency</key>
          <string>This app requires access to your exact location in order to report your location to emergency services.</string>
        </dict>
      </config-file>
    </platform>


- Should only be called on iOS 14+ - calling on iOS <14 will invoke the `errorCallback`.
- Should only be called if location authorization has been granted, otherwise `errorCallback` will be invoked.
- See [requestTemporaryFullAccuracyAuthorizationWithPurposeKey](https://developer.apple.com/documentation/corelocation/cllocationmanager/3600217-requesttemporaryfullaccuracyauth?language=objc).

```
cordova.plugins.diagnostic.requestTemporaryFullAccuracyAuthorization(purpose, successCallback, errorCallback);
```

#### Parameters

- {String} purpose - (required) corresponds to a key in the `NSLocationTemporaryUsageDescriptionDictionary` entry in your app's `*-Info.plist`
which contains a message explaining the user why your app needs their exact location.
This will be presented to the user via permission dialog in which they can either accept or reject the request.
- {Function} successCallback - (optional) Invoked in response to the user's choice in the permission dialog.
It is passed a single string parameter which defines the resulting accuracy authorization as a [locationAccuracyAuthorization constant](#locationaccuracyauthorization-constants).
- errorCallback -  (optional) The callback which will be called when operation encounters an error.
This callback function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestTemporaryFullAccuracyAuthorization("navigation", function(accuracyAuthorization){
        switch(accuracyAuthorization){
            case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
                console.log("Full accuracy authorized");
                break;
            case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
                console.log("Full accuracy denied");
                break;
        }
    }, function(error){
        console.error(error);
    });


### registerLocationAccuracyAuthorizationChangeHandler()

Platforms: iOS

Registers a function to be called when a change in location accuracy authorization occurs on iOS 14+.
 * On iOS <14 this will not be called.
 * This occurs when location accuracy authorization is changed.
 * This can be triggered either by the user's response to a location accuracy authorization dialog,
 * or by the user changing the location accuracy authorization specifically for your app in Settings.
 * Pass in a falsey value to de-register the currently registered function.


    cordova.plugins.diagnostic.registerLocationAccuracyAuthorizationChangeHandler(successCallback);

#### Parameters

- {Function} successCallback - function call when a change in location accuracy authorization occurs.
The function is passed a single string parameter indicating the new location accuracy authorization as a [locationAccuracyAuthorization constant](#locationaccuracyauthorization-constants).

#### Example usage

    cordova.plugins.diagnostic.registerLocationAccuracyAuthorizationChangeHandler(function(accuracyAuthorization){
        switch(accuracyAuthorization){
            case cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL:
                console.log("Accuracy authorization changed to full");
                break;
            case cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED:
                console.log("Accuracy authorization changed to reduced");
                break;
        }
    });

### switchToLocationSettings()

Platforms: Android

Displays the device location settings to allow user to enable location services/change location mode.

    cordova.plugins.diagnostic.switchToLocationSettings();

Note: On Android, you may want to consider using the [Request Location Accuracy Plugin for Android](https://github.com/dpa99c/cordova-plugin-request-location-accuracy) to request the desired location accuracy without needing the user to manually do this on the Location Settings page.

## Bluetooth module

Purpose: Bluetooth functionality to get/set Bluetooth Radio state.

Platforms: Android & iOS

Configuration name: `BLUETOOTH`

### bluetoothState constants

Platforms: Android and iOS

Defines constants for the various Bluetooth hardware states

    cordova.plugins.diagnostic.bluetoothState

#### Android

- `UNKNOWN` - Bluetooth hardware state is unknown or unavailable
- `POWERED_OFF` - Bluetooth hardware is switched off
- `POWERED_ON` - Bluetooth hardware is switched on and available for use
- `POWERING_OFF`- Bluetooth hardware is currently switching off
- `POWERING_ON`- Bluetooth hardware is currently switching on

#### iOS

- `UNKNOWN` - Bluetooth hardware state is unknown
- `RESETTING` - Bluetooth hardware state is currently resetting
- `POWERED_OFF` - Bluetooth hardware is switched off
- `POWERED_ON` - Bluetooth hardware is switched on and available for use
- `UNAUTHORIZED`- Bluetooth hardware use is not authorized for the current application

#### Example

    cordova.plugins.diagnostic.getBluetoothState(function(state){
        if(state === cordova.plugins.diagnostic.bluetoothState.POWERED_ON){
            // Do something with Bluetooth
        }
    }, function(error){
        console.error(error);
    });



### isBluetoothAvailable()

Platforms: Android & iOS

Checks if Bluetooth is available to the app.
Returns true if the device has Bluetooth capabilities AND if Bluetooth setting is switched on (same on Android & iOS)

On Android this requires permission `<uses-permission android:name="android.permission.BLUETOOTH" />`
Calling on iOS 13+ will request runtime permission to access Bluetooth (if not already requested).

    cordova.plugins.diagnostic.isBluetoothAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if Bluetooth is available.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isBluetoothAvailable(function(available){
        console.log("Bluetooth is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

Purpose: Bluetooth functionality
Platforms: Android & iOS
Configuration name: `BLUETOOTH`

### isBluetoothEnabled()

Platforms: Android

Checks if the device setting for Bluetooth is switched on.

On Android this requires permission `<uses-permission android:name="android.permission.BLUETOOTH" />`
Calling on iOS 13+ will request runtime permission to access Bluetooth (if not already requested).

    cordova.plugins.diagnostic.isBluetoothAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if Bluetooth is switched on.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isBluetoothEnabled(function(enabled){
        console.log("Bluetooth is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### hasBluetoothSupport()

Platforms: Android

Checks if the device has Bluetooth capabilities.
See http://developer.android.com/guide/topics/connectivity/bluetooth.html.

    cordova.plugins.diagnostic.hasBluetoothSupport(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
The function is passed a single boolean parameter which is TRUE if device has Bluetooth capabilities.
- {Function} errorCallback -  The callback which will be called when the operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.hasBluetoothSupport(function(supported){
        console.log("Bluetooth is " + (supported ? "supported" : "unsupported"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### hasBluetoothLESupport()

Platforms: Android

Checks if the device has Bluetooth Low Energy (LE) capabilities.
See http://developer.android.com/guide/topics/connectivity/bluetooth-le.html.

    cordova.plugins.diagnostic.hasBluetoothLESupport(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
The function is passed a single boolean parameter which is TRUE if device has Bluetooth LE capabilities.
- {Function} errorCallback -  The callback which will be called when the operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.hasBluetoothLESupport(function(supported){
        console.log("Bluetooth LE is " + (supported ? "supported" : "unsupported"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### hasBluetoothLEPeripheralSupport()

Platforms: Android

Checks if the device supports Bluetooth Low Energy (LE) Peripheral mode.
See http://developer.android.com/guide/topics/connectivity/bluetooth-le.html#roles.

#### Parameters

- {Function} successCallback -  The callback which will be called when the operation is successful.
The function is passed a single boolean parameter which is TRUE if device supports Bluetooth LE Peripheral mode.
- {Function} errorCallback -  The callback which will be called when the operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.hasBluetoothLEPeripheralSupport(function(supported){
        console.log("Bluetooth LE Peripheral Mode is " + (supported ? "supported" : "unsupported"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### getBluetoothState()

Platforms: Android and iOS

Returns the state of Bluetooth on the device.
Calling on iOS 13+ will request runtime permission to access Bluetooth (if not already requested).

    cordova.plugins.diagnostic.getBluetoothState(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the Bluetooth state as a constant in [`cordova.plugins.diagnostic.bluetoothState`](#bluetoothstate-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getBluetoothState(function(state){
       if(state === cordova.plugins.diagnostic.bluetoothState.POWERED_ON){
           console.log("Bluetooth is able to connect");
       }
    }, function(error){
        console.error(error);
    });

### setBluetoothState()

Platforms: Android

Enables/disables Bluetooth on the device.

    cordova.plugins.diagnostic.setBluetoothState(successCallback, errorCallback, state);

Requires the following permissions on Android:

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


### getBluetoothAuthorizationStatus()

Platforms: Android & iOS

Returns the Bluetooth authorization status of the application on the device.

Android:
- Returns the combined authorization status for the various Bluetooth run-time permissions on Android 12+ / API 31+
  - If any of 3 Bluetooth permissions is GRANTED, it will return GRANTED.
- On Android 11 / API 30 and below, will return GRANTED if the manifest has BLUETOOTH since they are implicitly granted at build-time.

iOS:
- On iOS 13+ returns the Bluetooth authorization status of application
- On iOS 12 and below, always return GRANTED as Bluetooth permission is not required.

```
cordova.plugins.diagnostic.getBluetoothAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
  The function is passed a single string parameter which is the authorization status for the Bluetooth run-time permission.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
  The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getBluetoothAuthorizationStatuses(function(statuses){
        for(var permission in statuses){
            console.log(permission + " permission is: " + statuses[permission]));
        }
    }, function(error){
        console.error(error);
    });

### getBluetoothAuthorizationStatuses()

Platforms: Android

- Returns the individual authorization status for each Bluetooth run-time permission on Android 12+ / API 31+
- On Android 11 / API 30 and below, all will be returned as GRANTED if the manifest has BLUETOOTH since they are implicitly granted at build-time.

```
cordova.plugins.diagnostic.getBluetoothAuthorizationStatuses(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
  The function is passed a single array parameter which is a list of authorization statuses for the various Bluetooth run-time permissions.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
  The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getBluetoothAuthorizationStatuses(function(statuses){
        for(var permission in statuses){
            console.log(permission + " permission is: " + statuses[permission]));
        }
    }, function(error){
        console.error(error);
    });

### requestBluetoothAuthorization()

Platforms: Android & iOS

Requests Bluetooth authorization for the application.

Notes for Android:
- On Android 12+ / API 31+ (build SDK and device OS), run-time permission must be requested before using Bluetooth APIs.
- On Android 11 / API 30 and below (build SDK and/or device OS), Bluetooth permission is granted at build-time by including the `BLUETOOTH` permission in the manifest so calling this function will have no effect but will always be successful.

Notes for iOS:
- The outcome of the authorization request can be determined by registering a handler using [`registerBluetoothStateChangeHandler()`](#registerbluetoothstatechangehandler).
- When calling this function, the message contained in the `NSBluetoothPeripheralUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

```
cordova.plugins.diagnostic.requestBluetoothAuthorization(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is not passed any parameters.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
- {Array} permissions - (optional / Android only) - list of Bluetooth permissions to request.
    - Valid values: "BLUETOOTH_ADVERTISE", "BLUETOOTH_CONNECT", "BLUETOOTH_SCAN".
    - If not specified, all 3 permissions will be requested.
    - This parameter will be ignored on iOS.

#### Example usage

    var permissions = ["BLUETOOTH_SCAN", "BLUETOOTH_CONNECT"];
    cordova.plugins.diagnostic.requestBluetoothAuthorization(function(){
        console.log("Bluetooth authorization was requested."));
    }, function(error){
        console.error(error);
    }, permissions);


### registerBluetoothStateChangeHandler()

Platforms: Android and iOS

Registers a function to be called when a change in Bluetooth state occurs.
Pass in a falsey value to de-register the currently registered function.
This is triggered when Bluetooth state changes so is useful for detecting changes made in quick settings which would not result in pause/resume events being fired.

Calling on iOS 13+ will request runtime permission to access Bluetooth (if not already requested).

    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(successCallback);

#### Parameters

- {Function} successCallback - function call when a change in Bluetooth state occurs.
The function is passed a single string parameter which indicates the Bluetooth state as a constant in [`cordova.plugins.diagnostic.bluetoothState`](#bluetoothstate-constants).

#### Example usage

    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(function(state){
        if(state === cordova.plugins.diagnostic.bluetoothState.POWERED_ON){
            console.log("Bluetooth is able to connect");
        }
    });


### switchToBluetoothSettings()

Platforms: Android

Displays Bluetooth settings to allow user to enable Bluetooth.

    cordova.plugins.diagnostic.switchToBluetoothSettings();

## WiFi module

Purpose: WiFi functionality to get/set Wifi state

Platforms: Android & iOS

Configuration name: `WIFI`

### isWifiAvailable()

Platforms: Android & iOS

Checks if Wifi is available.
On iOS this returns true if the device is connected to a network by WiFi.
On Android this returns true if the WiFi setting is set to enabled, and is the same as [`isWifiEnabled()`](#iswifienabled)

On Android this requires permission `<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`

    cordova.plugins.diagnostic.isWifiAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if WiFi is available.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isWifiAvailable(function(available){
        console.log("WiFi is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isWifiEnabled()

Platforms: Android & iOS

On iOS this returns true if the WiFi setting is set to enabled (regardless of whether it's connected to a network).
On Android this returns true if the WiFi setting is set to enabled, and is the same as [`isWifiAvailable()`](#iswifiavailable)
On Android this requires permission `<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />`

    cordova.plugins.diagnostic.isWifiEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is true if the device setting is enabled.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isWifiEnabled(function(enabled){
        console.log("WiFi is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### setWifiState()

Platforms: Android

Enables/disables WiFi on the device.

    cordova.plugins.diagnostic.setWifiState(successCallback, errorCallback, state);

Requires the following permissions for Android:

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

### switchToWifiSettings()

Platforms: Android

Displays WiFi settings to allow user to enable WiFi.

    cordova.plugins.diagnostic.switchToWifiSettings();

## Camera module

Purpose: Camera functionality to capture images / record video

Platforms: Android & iOS

Configuration name: `CAMERA`

### isCameraPresent()

Platforms: Android and iOS

Checks if camera hardware is present on device.

    cordova.plugins.diagnostic.isCameraPresent(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if camera is present
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCameraPresent(function(present){
        console.log("Camera is " + (present ? "present" : "absent"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isCameraAvailable()

Platforms: Android & iOS

Checks if camera is available.

Notes:
- On Android this returns true if the device has a camera.
- On iOS this returns true if both the device has a camera AND the application is authorized to use it.
- On Windows 10 Mobile this returns true if both the device has a rear-facing camera AND the application is authorized to use it.

Notes for Android:
- By default this also checks run-time storage permissions in addition to `CAMERA` permission because [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) requires both of these permission sets.
  - On Android 13+, storage permissions are `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO`. On Android 12 and below, storage permissions are `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`.

```
cordova.plugins.diagnostic.isCameraAvailable(successCallback, errorCallback, storage)
```

#### Parameters
- {Object} params - (optional) parameters:
    - {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if camera is present and authorized for use.
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
  - {Boolean} storage - (Android only) If true, requests storage permissions in addition to `CAMERA` run-time permission. Defaults to true.


#### Example usage

    cordova.plugins.diagnostic.isCameraAvailable(
        function(available){
            console.log("Camera is " + (available ? "available" : "not available"));
        }, function(error){
            console.error("The following error occurred: "+error);
        }, false
    );

### isCameraAuthorized()

Platforms: Android and iOS

Checks if the application is authorized to use the camera.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return TRUE as permissions are already granted at installation time.
- By default this also checks run-time storage permissions in addition to `CAMERA` permission because [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) requires both of these permission sets.
  - On Android 13+, storage permissions are `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO`. On Android 12 and below, storage permissions are `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`.

```
cordova.plugins.diagnostic.isCameraAuthorized(successCallback, errorCallback, storage)
```

#### Parameters
- {Object} params - (optional) parameters:
    - {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if camera is authorized for use.
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
  - {Boolean} storage - (Android only) If true, requests storage permissions in addition to `CAMERA` run-time permission. Defaults to true.

#### Example usage

    cordova.plugins.diagnostic.isCameraAuthorized(
        function(authorized){
            console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera");
        }, function(error){
            console.error("The following error occurred: "+error);
        }, false
    );

### getCameraAuthorizationStatus()

Platforms: Android and iOS

Returns the combined camera authorization status for the application based on the relevant permissions.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
- By default this also checks run-time storage permissions in addition to `CAMERA` permission because [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) requires both of these permission sets.
  - On Android 13+, storage permissions are `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO`. On Android 12 and below, storage permissions are `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`.

```
cordova.plugins.diagnostic.getCameraAuthorizationStatus(successCallback, errorCallback, storage)
```

#### Parameters
- {Object} params - (optional) parameters:
    - {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
  - {Boolean} storage - (Android only) If true, requests storage permissions in addition to `CAMERA` run-time permission. Defaults to true.


#### Example usage

    cordova.plugins.diagnostic.getCameraAuthorizationStatus(
        function(status){
            if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
                console.log("Camera use is authorized");
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        }, false
    );

### getCameraAuthorizationStatuses()

Platforms: Android

Returns the individual camera authorization statuses for each of the relevant permissions.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
- By default this also checks run-time storage permissions in addition to `CAMERA` permission because [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) requires both of these permission sets.
  - On Android 13+, storage permissions are `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO`. On Android 12 and below, storage permissions are `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`.

```
cordova.plugins.diagnostic.getCameraAuthorizationStatuses(successCallback, errorCallback, storage)
```

#### Parameters
- {Object} params - (optional) parameters:
  - {Function} successCallback -  The callback which will be called when operation is successful.
    The function is passed a single object parameter where each key indicates the permission name and the value indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
  - {Function} errorCallback -  The callback which will be called when operation encounters an error.
    The function is passed a single string parameter containing the error message.
  - {Boolean} storage - (Android only) If true, requests storage permissions in addition to `CAMERA` run-time permission. Defaults to true.


#### Example usage

    cordova.plugins.diagnostic.getCameraAuthorizationStatuses(
        function(statuses){
            for(var permission in statuses){
                console.log(permission + " permission is: " + statuses[permission]));
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        }, false
    );

### requestCameraAuthorization()

Platforms: Android and iOS

Requests camera authorization for the application.


Notes for iOS:
- Should only be called if authorization status is `NOT_REQUESTED`. Calling it when in any other state will have no effect.
- When calling this function, the message contained in the `NSCameraUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- By default this requests run-time storage permissions in addition to `CAMERA` permission because [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) requires both of these permission sets.
  - On Android 13+, storage permissions are `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO`. On Android 12 and below, storage permissions are `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`.
- Requested run-time permissions which must be added to `AndroidManifest.xml` - see [Android camera permissions](#android-camera-permissions).

```
cordova.plugins.diagnostic.requestCameraAuthorization(successCallback, errorCallback, storage)
```

#### Parameters

- {Object} params - (optional) parameters:
    - {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter indicating the resulting permission status.
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
    - {Boolean} storage - (Android only) If true, requests storage permissions in addition to `CAMERA` run-time permission. Defaults to true.

#### Example usage

    cordova.plugins.diagnostic.requestCameraAuthorization(
        function(status){
            console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
        }, function(error){
            console.error("The following error occurred: "+error);
        }, false
    );

### isCameraRollAuthorized()

Platforms: iOS

Checks if the application is authorized to use the Camera Roll in Photos app.

    cordova.plugins.diagnostic.isCameraRollAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
  - The function is passed a single boolean parameter which is TRUE if access to Camera Roll is authorized.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
  - The function is passed a single string parameter containing the error message.
- {Function} accessLevel - (optional) On iOS 14+, specifies the level of access to the photo library to query as a constant in cordova.plugins.diagnostic.photoLibraryAccessLevel`
  - Possible values are:
    - ADD_ONLY - can add to but not read from Photo Library
    - READ_WRITE - can both add to and read from Photo Library
  - Defaults to ADD_ONLY if not specified
  - Has no effect on iOS 13 or below


#### Example usage

    cordova.plugins.diagnostic.isCameraRollAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the camera roll");
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.photoLibraryAccessLevel.ADD_ONLY);

### getCameraRollAuthorizationStatus()

Platforms: iOS

Returns the authorization status for the application to use the Camera Roll in Photos app.

    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.
- {Function} accessLevel - (optional) On iOS 14+, specifies the level of access to the photo library to query as a constant in cordova.plugins.diagnostic.photoLibraryAccessLevel`
  - Possible values are:
    - ADD_ONLY - can add to but not read from Photo Library
    - READ_WRITE - can both add to and read from Photo Library
  - Defaults to ADD_ONLY if not specified
  - Has no effect on iOS 13 or below

#### Example usage

    cordova.plugins.diagnostic.getCameraRollAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted to access all photos");
                break;
            case cordova.plugins.diagnostic.permissionStatus.LIMITED: // iOS 14+
                console.log("Permission granted to access limited set of photos");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    }, cordova.plugins.diagnostic.photoLibraryAccessLevel.ADD_ONLY);

### requestCameraRollAuthorization()

Platforms: iOS

Requests camera roll authorization for the application.
Should only be called if authorization status is NOT_REQUESTED. Calling it when in any other state will have no effect.
When calling this function, the message contained in the `NSPhotoLibraryUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

    cordova.plugins.diagnostic.requestCameraRollAuthorization(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
  - The function is passed a single string parameter indicating the new authorization status:
  `cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
  - The function is passed a single string parameter containing the error message.
- {Function} accessLevel - (optional) On iOS 14+, specifies the level of access to the photo library to query as a constant in cordova.plugins.diagnostic.photoLibraryAccessLevel`
  - Possible values are:
    - ADD_ONLY - can add to but not read from Photo Library
    - READ_WRITE - can both add to and read from Photo Library
  - Defaults to ADD_ONLY if not specified
  - Has no effect on iOS 13 or below

#### Example usage

    cordova.plugins.diagnostic.requestCameraRollAuthorization(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted to access all photos");
                break;
            case cordova.plugins.diagnostic.permissionStatus.LIMITED: // iOS 14+
                console.log("Permission granted to access limited set of photos");
                break;
        }
    }, function(error){
        console.error(error);
    }, cordova.plugins.diagnostic.photoLibraryAccessLevel.ADD_ONLY);


### presentLimitedLibraryPicker()

Platforms: iOS

- Presents limited library picker UI on iOS 14+
  - Calling on iOS < 14 will have no effect
- Should only be called if Photo Roll authorization status is LIMITED.
  - Calling it when in any other status will invoke the error callback.
- Can only be used if the automatic prompt to select limited library is disabled in the app's `Info.plist` by adding the following section to `<platform name="ios">` in the app's `config.xml`:

```xml
<config-file target="*-Info.plist" parent="PHPhotoLibraryPreventAutomaticLimitedAccessAlert">
  <true/>
</config-file>
```
- See the [example project](https://github.com/dpa99c/cordova-diagnostic-plugin-example) for reference
- See the [Apple documentation](https://github.com/dpa99c/cordova-diagnostic-plugin-example) for more detail

Signature:

    cordova.plugins.diagnostic.presentLimitedLibraryPicker(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
  - On iOS 15+, will be passed a list of image identifiers that were added by the user to the limited Photo Library selection.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
  - The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.presentLimitedLibraryPicker(function(identifiers){
        var msg = "Successfully presented limited library picker UI";
        if(identifiers && identifiers.length){
            msg += " - added identifiers: " + identifiers.join(',');
        }
        console.log(msg);
    }, function(error){
        console.error(error);
    });

## Notifications module

Purpose: Remote notifications functionality

Platforms: Android & iOS

Configuration name: `NOTIFICATIONS`

### remoteNotificationType constants

Platforms: iOS

Constants for requesting/reporting the various types of remote notification permission types on iOS devices.

    cordova.plugins.diagnostic.remoteNotificationType

The following notification types are defined:

- `ALERT` - Permission to display Alerts or Banners
- `SOUND` - Permission to play sounds.
- `BADGE` - Permission to change app icon badge.

#### Example

    cordova.plugins.diagnostic.getRemoteNotificationTypes(function(types){
        if(types[cordova.plugins.diagnostic.remoteNotificationType.ALERT]){
            console.log("Has permission to display alerts");
        }
        if(types[cordova.plugins.diagnostic.remoteNotificationType.SOUND]){
            console.log("Has permission to play sounds");
        }
        if(types[cordova.plugins.diagnostic.remoteNotificationType.BADGE]){
            console.log("Has permission to modify icon badge");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isRemoteNotificationsEnabled()

Platforms: Android and iOS

Checks if remote (push) notifications are enabled.

On Android, returns whether notifications for the app are not blocked.

Returns true if app is registered for remote notifications **AND** "Allow Notifications" switch is ON **AND** alert style is not set to "None" (i.e. "Banners" or "Alerts").

    cordova.plugins.diagnostic.isRemoteNotificationsEnabled(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if remote (push) notifications are enabled.
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isRemoteNotificationsEnabled(function(enabled){
        console.log("Remote notifications are " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isRegisteredForRemoteNotifications()

Platforms: iOS

Indicates if the app is registered for remote (push) notifications on the device.

Returns true if the app is registered for remote notifications and received its device token, or false if registration has not occurred, has failed, or has been denied by the user.
Note that user preferences for notifications in the Settings app will not affect this.

    cordova.plugins.diagnostic.isRegisteredForRemoteNotifications(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if the device is registered for remote (push) notifications.
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.isRegisteredForRemoteNotifications(function(registered){
        console.log("Device " + (registered ? "is" : "isn't") + " registered for remote notifications");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getRemoteNotificationTypes()

Platforms: iOS

Indicates the current setting of notification types for the app in the Settings app.

Note: if "Allow Notifications" switch is OFF, all types will be returned as disabled.

    cordova.plugins.diagnostic.getRemoteNotificationTypes(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single object parameter where the key is the notification type as a constant in [`cordova.plugins.diagnostic.remoteNotificationType`](#remotenotificationtype-constants) and the value is a boolean indicating whether it's enabled:
     * `cordova.plugins.diagnostic.remoteNotificationType.ALERT` => alert style is not set to "None" (i.e. "Banners" or "Alerts").
     * `cordova.plugins.diagnostic.remoteNotificationType.BADGE` => "Badge App Icon" switch is ON.
     * `cordova.plugins.diagnostic.remoteNotificationType.SOUND` => "Sounds"/"Alert Sound" switch is ON.
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getRemoteNotificationTypes(function(types){
        for(var type in types){
            console.log(type + " is " + (types[type] ? "enabled" : "disabled"));
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### getRemoteNotificationsAuthorizationStatus()

Platforms: iOS

Returns the authorization status for the application to use Remote Notifications.

    cordova.plugins.diagnostic.getRemoteNotificationsAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
This can be [provisional](https://developer.apple.com/documentation/usernotifications/unauthorizationstatus/unauthorizationstatusprovisional?language=objc) or [ephemeral](https://developer.apple.com/documentation/usernotifications/unauthorizationstatus/unauthorizationstatusephemeral?language=objc) authorization status.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getRemoteNotificationsAuthorizationStatus(function(status){
        switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not yet requested");
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted");
                break;
            case cordova.plugins.diagnostic.permissionStatus.PROVISIONAL:
                console.log("Provisional permission granted");
                break;
            case cordova.plugins.diagnostic.permissionStatus.EPHEMERAL:
                console.log("Ephemeral permission granted");
                break;
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### requestRemoteNotificationsAuthorization()

Platforms: iOS

Requests remote notifications authorization for the application.

    cordova.plugins.diagnostic.requestRemoteNotificationsAuthorization(params);

#### Parameters

- {Object} params - (optional) parameters:
    - {Function} successCallback - The callback which will be called when operation is successful.
    - {Function} errorCallback -  The callback which will be called when operation encounters an error.
        * The function is passed a single string parameter containing the error message.
    - {Array} types - list of notifications to register for as constants in [`cordova.plugins.diagnostic.remoteNotificationType`](#remotenotificationtype-constants).
        * On iOS 13+ at least one type must be specified or the result will be permission denied and authorization will not be granted.
        * On iOS 12 and below if no type is specified, all notification types will be authorized.
    - {Boolean} omitRegistration - If true, registration for remote notifications will not be carried out once remote notifications authorization is granted.
        * Defaults to false (registration will automatically take place once authorization is granted).

#### Example usage

    cordova.plugins.diagnostic.requestRemoteNotificationsAuthorization({
        successCallback: function(){
            console.log("Successfully requested remote notifications authorization");
        },
        errorCallback: function(err){
           console.error("Error requesting remote notifications authorization: " + err);
        },
        types: [
            cordova.plugins.diagnostic.remoteNotificationType.ALERT,
            cordova.plugins.diagnostic.remoteNotificationType.SOUND,
            cordova.plugins.diagnostic.remoteNotificationType.BADGE
        ],
        omitRegistration: false
    });


### switchToNotificationSettings()

Platforms: Android & iOS

Open notification settings for your app

On Android versions lower than O and on iOS versions lower than 15.4, this will open the same page as `switchToSettings()`.

    cordova.plugins.diagnostic.switchToNotificationSettings();

## Microphone module

Purpose: Microphone permission to record audio.

Platforms: Android & iOS

Configuration name: `MICROPHONE`

### isMicrophoneAuthorized()

Platforms: Android and iOS

Checks if the application is authorized to use the microphone.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return TRUE as permissions are already granted at installation time.

```
cordova.plugins.diagnostic.isMicrophoneAuthorized(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if microphone is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isMicrophoneAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the microphone");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getMicrophoneAuthorizationStatus()

Platforms: Android and iOS

Returns the microphone authorization status for the application.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

```
cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status){
       if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
           console.log("Microphone use is authorized");
       }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestMicrophoneAuthorization()

Platforms: Android and iOS

Requests microphone authorization for the application.

Notes for iOS:
- Should only be called if authorization status is `NOT_REQUESTED`. Calling it when in any other state will have no effect and just return the current authorization status.
- When calling this function, the message contained in the `NSMicrophoneUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- This requests permission for `RECORD_AUDIO` which must be added to `AndroidManifest.xml` - see [Android permissions](#android-permissions).

```
cordova.plugins.diagnostic.requestMicrophoneAuthorization(successCallback, errorCallback);
```

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating whether access to the microphone was granted or denied:
`cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestMicrophoneAuthorization(function(status){
       if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
           console.log("Microphone use is authorized");
       }
    }, function(error){
        console.error(error);
    });

## Contacts module

Purpose: Contacts permission to read/write address book.

Platforms: Android & iOS

Configuration name: `CONTACTS`

### isContactsAuthorized()

Platforms: Android and iOS

Checks if the application is authorized to use contacts (address book).

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return TRUE as permissions are already granted at installation time.

```
cordova.plugins.diagnostic.isContactsAuthorized(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if contacts is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isContactsAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to contacts");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getContactsAuthorizationStatus()

Platforms: Android and iOS

Returns the contacts authorization status for the application.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

```
cordova.plugins.diagnostic.getContactsAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getContactsAuthorizationStatus(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Contacts use is authorized");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestContactsAuthorization()

Platforms: Android and iOS

Requests contacts authorization for the application.

Notes for iOS:
- Should only be called if authorization status is `NOT_REQUESTED`. Calling it when in any other state will have no effect and just return the current authorization status.
- When calling this function, the message contained in the `NSContactsUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- This requests permission for `READ_CONTACTS` run-time permission
- Required permissions must be added to `AndroidManifest.xml` as appropriate - see [Android permissions](#android-permissions): `READ_CONTACTS, WRITE_CONTACTS, GET_ACCOUNTS`

```
cordova.plugins.diagnostic.requestContactsAuthorization(successCallback, errorCallback);
```

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating whether access to contacts was granted or denied:
`cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Contacts use is authorized");
        }
    }, function(error){
        console.error(error);
    });


## Calendar module

Purpose: Calendar events permission.

Platforms: Android & iOS

Configuration name: `CALENDAR`

### isCalendarAuthorized()

Platforms: Android and iOS

Checks if the application is authorized to use the calendar.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return TRUE as permissions are already granted at installation time.

Notes for iOS:
- This relates to Calendar Events (not Calendar Reminders)

```
cordova.plugins.diagnostic.isCalendarAuthorized(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if calendar is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isCalendarAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to calendar");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getCalendarAuthorizationStatus()

Platforms: Android and iOS

Returns the calendar authorization status for the application.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.

Notes for iOS:
- This relates to Calendar Events (not Calendar Reminders)

```
cordova.plugins.diagnostic.getCalendarAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getCalendarAuthorizationStatus(function(status){
       if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
           console.log("Calendar use is authorized");
       }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestCalendarAuthorization()

Platforms: Android and iOS

Requests calendar authorization for the application.

Notes for iOS:
- Should only be called if authorization status is `NOT_REQUESTED`. Calling it when in any other state will have no effect and just return the current authorization status.
- When calling this function, the message contained in the `NSCalendarsUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.
- This relates to Calendar Events (not Calendar Reminders)

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- This requests permission for `READ_CALENDAR` run-time permission
- Required permissions must be added to `AndroidManifest.xml` as appropriate - see [Android permissions](#android-permissions): `READ_CALENDAR, WRITE_CALENDAR`

```
cordova.plugins.diagnostic.requestCalendarAuthorization(successCallback, errorCallback);
```

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating whether access to calendar was granted or denied:
`cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestCalendarAuthorization(function(status){
       if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
           console.log("Calendar use is authorized");
       }
    }, function(error){
        console.error(error);
    });


## Reminders module

Purpose: Calendar reminders permission.

Platforms: iOS

Configuration name: `REMINDERS`

### isRemindersAuthorized()

Platforms: iOS

Checks if the application is authorized to use reminders.

    cordova.plugins.diagnostic.isRemindersAuthorized(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if reminders access is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isRemindersAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to reminders");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getRemindersAuthorizationStatus()

Platforms: iOS

Returns the reminders authorization status for the application.

    cordova.plugins.diagnostic.getRemindersAuthorizationStatus(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getRemindersAuthorizationStatus(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Reminders authorization allowed");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestRemindersAuthorization()

Platforms: iOS

Requests reminders authorization for the application.
Should only be called if authorization status is `NOT_REQUESTED`. Calling it when in any other state will have no effect and just return the current authorization status.
When calling this function, the message contained in the `NSRemindersUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

    cordova.plugins.diagnostic.requestRemindersAuthorization(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating whether access to calendar was granted or denied:
`cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestRemindersAuthorization(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Reminders authorization allowed");
        }
    }, function(error){
        console.error(error);
    });



## Motion module

Purpose: Motion/fitness tracking permission.

Platforms: iOS

Configuration name: `MOTION`

### motionStatus constants

Platforms: iOS

Constants for reporting the various states of Motion Tracking on iOS devices.

    cordova.plugins.diagnostic.motionStatus

The following permission states are defined:

- `NOT_REQUESTED` - App has not yet requested this permission.
App can request permission and user will be prompted to allow/deny.
- `GRANTED` - User granted access to this permission.
- `DENIED_ALWAYS` - User denied access to this permission.
App can never ask for permission again.
The only way around this is to instruct the user to manually change the permission in the Settings app.
- `RESTRICTED` - Permission is unavailable and user cannot enable it.
For example, when parental controls are in effect for the current user.
- `NOT_AVAILABLE` - device does not support Motion Tracking.
Motion tracking is supported by iOS devices with an M7 co-processor (or above): that is iPhone 5s (or above), iPad Air (or above), iPad Mini 2 (or above).
- `NOT_DETERMINED` - authorization outcome cannot be determined because device does not support Pedometer Event Tracking.
Pedometer Event Tracking is only available on iPhones with an M7 co-processor (or above): that is iPhone 5s (or above). No iPads yet support it.
- `UNKNOWN` - motion tracking authorization is in an unknown state.


#### Example

    if(status === cordova.plugins.diagnostic.motionStatus.NOT_REQUESTED){
        cordova.plugins.diagnostic.requestMotionAuthorization(successCallback, errorCallback);
    }

### isMotionAvailable()

Platforms: iOS

Checks if motion tracking is available on the current device.
Motion tracking is supported by iOS devices with an M7 co-processor (or above): that is iPhone 5s (or above), iPad Air (or above), iPad Mini 2 (or above).

    cordova.plugins.diagnostic.isMotionAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if motion tracking is available on the current device.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isMotionAvailable(function(available){
        console.log("Motion tracking is " + (available ? "available" : "not available") + " on this device");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isMotionRequestOutcomeAvailable()

Platforms: iOS

Checks if it's possible to determine the outcome of a motion authorization request on the current device.
There's no direct way to determine if authorization was granted or denied, so the Pedometer API must be used to indirectly determine this:
therefore, if the device supports motion tracking but not Pedometer Event Tracking, the outcome of requesting motion detection cannot be determined.
Pedometer Event Tracking is only available on iPhones with an M7 co-processor (or above): that is iPhone 5s (or above). No iPads yet support it.

    cordova.plugins.diagnostic.isMotionRequestOutcomeAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if it's possible to determine the outcome of a motion authorization request on the current device.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isMotionRequestOutcomeAvailable(function(available){
        console.log("Motion tracking authorization request outcome is " + (available ? "available" : "not available") + " on this device");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestMotionAuthorization()

Platforms: iOS

Requests motion tracking authorization for the application.

The native dialog asking user's consent can only be invoked once after the app is installed by calling this function.
Once the user has either allowed or denied access, calling this function again will result in an error.
It is not possible to re-invoke the dialog if the user denied permission in the native dialog,
so in this case you will have to instruct the user how to change motion authorization manually via the Settings app.

When calling this function, the message contained in the `NSMotionUsageDescription` .plist key is displayed to the user;
this plugin provides a default message, but you should override this with your specific reason for requesting access - see the [iOS usage description messages](#ios-usage-description-messages) section for how to customise it.

There's no direct way to determine if authorization was granted or denied, so the Pedometer API must be used to indirectly determine this:
therefore, if the device supports motion tracking but not Pedometer Event Tracking, the outcome of requesting motion detection cannot be determined.

    cordova.plugins.diagnostic.requestMotionAuthorization(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating the result:
   - `cordova.plugins.diagnostic.motionStatus.GRANTED` - user granted motion authorization.
   - `cordova.plugins.diagnostic.motionStatus.DENIED_ALWAYS` - user denied authorization.
   - `cordova.plugins.diagnostic.motionStatus.RESTRICTED` - user cannot grant motion authorization.
   - `cordova.plugins.diagnostic.motionStatus.NOT_AVAILABLE` - device does not support Motion Tracking.
   Motion tracking is supported by iOS devices with an M7 co-processor (or above): that is iPhone 5s (or above), iPad Air (or above), iPad Mini 2 (or above).
   - `cordova.plugins.diagnostic.motionStatus.NOT_DETERMINED` - authorization outcome cannot be determined because device does not support Pedometer Event Tracking.
   Pedometer Event Tracking is only available on iPhones with an M7 co-processor (or above): that is iPhone 5s (or above). No iPads yet support it.
   - `cordova.plugins.diagnostic.motionStatus.UNKNOWN` - motion tracking authorization is in an unknown state.
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestMotionAuthorization(function(status){
        if(status === cordova.plugins.motionStatus.permissionStatus.GRANTED){
            console.log("Motion tracking authorized");
        }
    }, function(error){
        console.error(error);
    });

### getMotionAuthorizationStatus()

Platforms: iOS

Checks motion authorization status for the application.
There's no direct way to determine if authorization was granted or denied, so the Pedometer API is used to indirectly determine this.


    cordova.plugins.diagnostic.getMotionAuthorizationStatus(successCallback, errorCallback);

#### Parameters
- {Function} successCallback - The callback which will be called when operation is successful.
The function is passed a single string parameter indicating the result:
   - `cordova.plugins.diagnostic.motionStatus.NOT_REQUESTED` - App has not yet requested this permission.
   - `cordova.plugins.diagnostic.motionStatus.GRANTED` - user granted motion authorization.
   - `cordova.plugins.diagnostic.motionStatus.DENIED_ALWAYS` - user denied authorization.
   - `cordova.plugins.diagnostic.motionStatus.RESTRICTED` - user cannot grant motion authorization.
   - `cordova.plugins.diagnostic.motionStatus.NOT_AVAILABLE` - device does not support Motion Tracking.
   Motion tracking is supported by iOS devices with an M7 co-processor (or above): that is iPhone 5s (or above), iPad Air (or above), iPad Mini 2 (or above).
   - `cordova.plugins.diagnostic.motionStatus.NOT_DETERMINED` - authorization outcome cannot be determined because device does not support Pedometer Event Tracking.
   Pedometer Event Tracking is only available on iPhones with an M7 co-processor (or above): that is iPhone 5s (or above). No iPads yet support it.
   - `cordova.plugins.diagnostic.motionStatus.UNKNOWN` - motion tracking authorization is in an unknown state.
- {Function} errorCallback - The callback which will be called when an error occurs. The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getMotionAuthorizationStatus(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("Motion authorization allowed");
        }
    }, function(error){
        console.error(error);
    });

## NFC module

Purpose: Near Field Communication functionality.

Platforms: Android

Configuration name: `NFC`

### NFCState constants

Platforms: Android

Defines constants for the various NFC power states.

    cordova.plugins.diagnostic.NFCState

#### Values

- `UNKNOWN` - NFC hardware state is unknown or unavailable
- `POWERED_OFF` - NFC hardware is switched off
- `POWERED_ON` - NFC hardware is switched on and available for use
- `POWERING_OFF`- NFC hardware is currently switching off
- `POWERING_ON`- NFC hardware is currently switching on

#### Example

    cordova.plugins.diagnostic.registerNFCStateChangeHandler(function(state){
        switch(state){
            case cordova.plugins.diagnostic.NFCState.UNKNOWN:
                console.log("NFC state is unknown");
                break;
            case cordova.plugins.diagnostic.NFCState.POWERED_OFF:
                console.log("NFC is powered off");
                break;
            case cordova.plugins.diagnostic.NFCState.POWERED_ON:
                console.log("NFC is powered on");
                break;
            case cordova.plugins.diagnostic.NFCState.POWERING_OFF:
                console.log("NFC is powering off");
                break;
            case cordova.plugins.diagnostic.NFCState.POWERING_ON:
                console.log("NFC is powering on);
                break;
        }
    },function(error){
        console.error("The following error occurred: "+error);
    });



### isNFCPresent()

Platforms: Android

Checks if NFC hardware is present on device.

    cordova.plugins.diagnostic.isNFCPresent(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if NFC is present
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNFCPresent(function(present){
        console.log("NFC hardware is " + (present ? "present" : "absent"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });


### isNFCEnabled()

Platforms: Android

Checks if the device setting for NFC is switched on.

Note: this operation **does not** require NFC permission in the manifest.

    cordova.plugins.diagnostic.isNFCEnabled(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if NFC is switched on.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNFCEnabled(function(enabled){
        console.log("NFC is " + (enabled ? "enabled" : "disabled"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### isNFCAvailable()

Platforms: Android

Checks if NFC is available to the app.
Returns true if the device has NFC capabilities AND if NFC setting is switched on.

Note: this operation **does not** require NFC permission in the manifest.

    cordova.plugins.diagnostic.isNFCAvailable(successCallback, errorCallback);

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if NFC is available.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isNFCAvailable(function(available){
        console.log("NFC is " + (available ? "available" : "not available"));
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### registerNFCStateChangeHandler()

Platforms: Android

Registers a function to be called when a change in NFC state occurs.
Pass in a falsey value to de-register the currently registered function.

This is triggered when NFC state changes so is useful for detecting changes made in quick settings which would not result in pause/resume events being fired.

    cordova.plugins.diagnostic.registerNFCStateChangeHandler(successCallback);

#### Parameters

- {Function} successCallback - function call when a change in NFC state occurs.
The function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.NFCState`.

#### Example usage

    cordova.plugins.diagnostic.registerNFCStateChangeHandler(function(state){
        console.log("NFC state changed to: " + state);
    });

### switchToNFCSettings()

Platforms: Android

Displays NFC settings to allow user to enable NFC.

On some versions of Android, this may open the same page as `switchToWirelessSettings()` if the NFC switch is on the Wireless settings page.

    cordova.plugins.diagnostic.switchToNFCSettings();

## External storage module

Purpose: External storage functionality.

Platforms: Android

Configuration name: `EXTERNAL_STORAGE`

### isExternalStorageAuthorized()

Platforms: Android

Checks if the application is authorized to use external storage.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return TRUE as permissions are already granted at installation time.
- This checks for `READ_EXTERNAL_STORAGE` run-time permission.

```
cordova.plugins.diagnostic.isExternalStorageAuthorized(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single boolean parameter which is TRUE if external storage is authorized for use.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.


#### Example usage

    cordova.plugins.diagnostic.isExternalStorageAuthorized(function(authorized){
        console.log("App is " + (authorized ? "authorized" : "denied") + " access to the external storage");
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### getExternalStorageAuthorizationStatus()

Platforms: Android

Returns the external storage authorization status for the application.

Notes for Android:
- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
- This checks for `READ_EXTERNAL_STORAGE` run-time permission.

```
cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter which indicates the authorization status as a [permissionStatus constant](#permissionstatus-constants).
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
            console.log("External storage use is authorized");
        }
    }, function(error){
        console.error("The following error occurred: "+error);
    });

### requestExternalStorageAuthorization()

Platforms: Android

Requests external storage authorization for the application.

- This is intended for Android 6 / API 23 and above. Calling on Android 5.1 / API 22 and below will have no effect as the permissions are already granted at installation time.
- This requests permission for `READ_EXTERNAL_STORAGE` run-time permission which must be added to `AndroidManifest.xml`.

```
cordova.plugins.diagnostic.requestExternalStorageAuthorization(successCallback, errorCallback);
```

#### Parameters

- {Function} successCallback -  The callback which will be called when operation is successful.
The function is passed a single string parameter indicating whether access to the external storage was granted or denied:
`cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.requestExternalStorageAuthorization(function(status){
        console.log("Authorization request for external storage use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
    }, function(error){
        console.error(error);
    });

### getExternalSdCardDetails()

Platforms: Android

Returns details of external SD card(s): absolute path, is writable, free space.

The intention of this method is to return the location and details of *removable* _external_ SD cards.
This differs from the "external directories" returned by [cordova-plugin-file](https://github.com/apache/cordova-plugin-file) which return mount points relating to non-removable (internal) storage.

For example, on a Samsung Galaxy S4 running Android 7.1.1:

- `cordova.file.externalRootDirectory` returns `file:///storage/emulated/0/`
- `cordova.file.externalApplicationStorageDirectory` returns `file:///storage/emulated/0/Android/data/cordova.plugins.diagnostic.example/`

which are on non-removable internal storage.

Whereas this method returns:

```
[{
    "path": "/storage/4975-1401/Android/data/cordova.plugins.diagnostic.example/files",
    "filePath": "file:///storage/4975-1401/Android/data/cordova.plugins.diagnostic.example/files",
    "canWrite": true,
    "freeSpace": 16254009344,
    "type": "application"
}, {
    "path": "/storage/4975-1401",
    "filePath": "file:///storage/4975-1401",
    "canWrite": false,
    "freeSpace": 16254009344,
    "type": "root"
}]
```

which are on external removable storage.

```
cordova.plugins.diagnostic.getExternalSdCardDetails(successCallback, errorCallback);
```

- Note: this function is intended to find paths of external removable SD cards on which the SD card adapter is directly mounted on the device, such as those in the Samsung Galaxy S range of devices. It explicitly attempts to filter out non-SD card storage paths such as OTG devices since access to these devices on Android 6.+ via the File API requires root access and normal access requires use of the Storage Access Framework.

#### Parameters

- {Function} successCallback -  function to call on successful request for external SD card details.
The function is passed a single argument which is an array consisting of an entry for each external storage location found.
Each array entry is an object with the following keys:
    - {String} path - absolute path to the storage location
    - {String} filePath - absolute path prefixed with file protocol for use with cordova-plugin-file
    - {Boolean} canWrite - true if the location is writable
    - {Integer} freeSpace - number of bytes of free space on the device on which the storage location is mounted.
    - {String} type - indicates the type of storage location: either "application" if the path is an Android application sandbox path or "root" if the path is the device root.
- {Function} errorCallback -  The callback which will be called when operation encounters an error.
The function is passed a single string parameter containing the error message.

#### Example usage

    cordova.plugins.diagnostic.getExternalSdCardDetails(function(details){
        details.forEach(function(detail){
            if(detail.canWrite && details.freeSpace > 100000){
                cordova.file.externalSdCardDirectory = detail.filePath;
                // Then: write file to external SD card
            }
        });
    }, function(error){
        console.error(error);
    });


# Platform Notes

## Android

### Android permissions

Some of functions offered by this plugin require specific permissions to be set in the AndroidManifest.xml. Where additional permissions are needed, they are listed alongside the function that requires them.

These permissions will not be set by this plugin, to avoid asking for unnecessary permissions in your app, in the case that you do not use a particular part of the plugin.
Instead, you can add these permissions as necessary, depending what functions in the plugin you decide to use.

You can add these permissions either by manually editing the AndroidManifest.xml in `/platforms/android/`, or define them in the config.xml and apply them using the [cordova-custom-config](https://github.com/dpa99c/cordova-custom-config) plugin, for example:

    <platform name="android">
        <plugin name="cordova-custom-config" version="*"/>
        <custom-config-file target="AndroidManifest.xml" parent="/*">
            <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
            <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        </custom-config-file>
    </platform>

Note: If you're using Phonegap Build (or some other Cloud build system), `cordova-custom-config` won't work because it relies on hook scripts.
For Phonegap Build you can use [`<config-file>` blocks](http://docs.phonegap.com/phonegap-build/configuring/config-file-element/) so long as you use `cli-6.5.0` or below (support for `<config-file>` blocks was dropped in `cli-7.0.1`).

#### Android runtime permissions

Android 6 / API 23 introduces the concept of [runtime permissions](http://developer.android.com/training/permissions/requesting.html). Similar to iOS, certain "dangerous" permissions must be requested at runtime __in addition__ to being listed in the Android manifest.

Runtime permissions only apply if the device/emulator the app is running on has Android 6.0 or above. If the app is running on Android 5.x or below, runtime permissions do not apply - all permissions are granted at installation time.

This plugin supports [checking](#getpermissionauthorizationstatus) and [requesting](#requestruntimepermission) of Android runtime permissions.

##### "Dangerous" runtime permissions

The plugin defines all [dangerous permissions](http://developer.android.com/guide/topics/security/permissions.html#perm-groups) available up to API 33 as a list of constants available via the `cordova.plugins.diagnostic.permission` object. The following permissions are available:

- `cordova.plugins.diagnostic.permission.ACCEPT_HANDOVER`
- `cordova.plugins.diagnostic.permission.ACCESS_BACKGROUND_LOCATION`
- `cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION`
- `cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION`
- `cordova.plugins.diagnostic.permission.ACCESS_MEDIA_LOCATION`
- `cordova.plugins.diagnostic.permission.ACTIVITY_RECOGNITION`
- `cordova.plugins.diagnostic.permission.ADD_VOICEMAIL`
- `cordova.plugins.diagnostic.permission.ANSWER_PHONE_CALLS`
- `cordova.plugins.diagnostic.permission.BLUETOOTH_ADVERTISE`
- `cordova.plugins.diagnostic.permission.BLUETOOTH_CONNECT`
- `cordova.plugins.diagnostic.permission.BLUETOOTH_SCAN`
- `cordova.plugins.diagnostic.permission.BODY_SENSORS`
- `cordova.plugins.diagnostic.permission.BODY_SENSORS_BACKGROUND`
- `cordova.plugins.diagnostic.permission.CALL_PHONE`
- `cordova.plugins.diagnostic.permission.CAMERA`
- `cordova.plugins.diagnostic.permission.GET_ACCOUNTS`
- `cordova.plugins.diagnostic.permission.NEARBY_WIFI_DEVICES`
- `cordova.plugins.diagnostic.permission.POST_NOTIFICATIONS`
- `cordova.plugins.diagnostic.permission.PROCESS_OUTGOING_CALLS`
- `cordova.plugins.diagnostic.permission.READ_CALENDAR`
- `cordova.plugins.diagnostic.permission.READ_CALL_LOG`
- `cordova.plugins.diagnostic.permission.READ_CONTACTS`
- `cordova.plugins.diagnostic.permission.READ_EXTERNAL_STORAGE`
- `cordova.plugins.diagnostic.permission.READ_MEDIA_AUDIO`
- `cordova.plugins.diagnostic.permission.READ_MEDIA_IMAGES`
- `cordova.plugins.diagnostic.permission.READ_MEDIA_VIDEO`
- `cordova.plugins.diagnostic.permission.READ_PHONE_NUMBERS`
- `cordova.plugins.diagnostic.permission.READ_PHONE_STATE`
- `cordova.plugins.diagnostic.permission.READ_SMS`
- `cordova.plugins.diagnostic.permission.RECEIVE_MMS`
- `cordova.plugins.diagnostic.permission.RECEIVE_SMS`
- `cordova.plugins.diagnostic.permission.RECEIVE_WAP_PUSH`
- `cordova.plugins.diagnostic.permission.RECORD_AUDIO`
- `cordova.plugins.diagnostic.permission.SEND_SMS`
- `cordova.plugins.diagnostic.permission.USE_SIP`
- `cordova.plugins.diagnostic.permission.UWB_RANGING`
- `cordova.plugins.diagnostic.permission.WRITE_CALENDAR`
- `cordova.plugins.diagnostic.permission.WRITE_CALL_LOG`
- `cordova.plugins.diagnostic.permission.WRITE_CONTACTS`
- `cordova.plugins.diagnostic.permission.WRITE_EXTERNAL_STORAGE`


##### Android 11+ runtime permissions
Android 11 introduced a new option for the user when granting runtime permissions: "Only this time"/"Ask every time".
This allows the user to temporarily grant a permission only for the current app session: the requested permission will be available to the app during the current session but when the app is restarted, permission will be revoked and the app will have to request it again.
This causes a problem for this plugin because it is unable to detect that the permission has been silently revoked by Android in the new app session.

When runtime permissions were introduced in Android 6.0, there was already a deficiency in the Android permissions model: the Android SDK provides no way to differentiate between a permission that has not been requested yet (`NOT_REQUESTED`) or has been permanently denied (`DENIED_ALWAYS`) - they have the same programmatic state. Therefore this plugin uses local persistent storage to flag when a given permission has been requested and granted via the plugin. So if Android indicates `NOT_REQUESTED`/`DENIED_ALWAYS`, the plugin uses the state of the persistent flag to determine if that permission has been requested before and therefore can differentiate between `NOT_REQUESTED` and `DENIED_ALWAYS`.

This worked fine up until Android 10, however the "Only this time" option added in Android 11 causes a problem:
There's no way for the plugin to tell if the user pressed "Only this time" or "Allow always" in the permissions dialog because the programmatic outcome in Android is the same: the permission state is `GRANTED`.
Therefore in both cases, the plugin flags this permission as having been requested.
But if the user pressed "Only this time", when the app is restarted the permission is silently revoked by Android and so when the native Android state indicates `NOT_REQUESTED`/`DENIED_ALWAYS`, the plugin determines that since the flag has been set for that permission, the state must be `DENIED_ALWAYS`.

There is no programmatic solution that the plugin can implement to solve this - it is a deficiency in the Android permission states model.
There is however a workaround which is to assume that even if the reported permission status is `DENIED_ALWAYS`, the permission *may* still be requestable.

Here's a short example of how to do this using the `CAMERA` permission:

```javascript

let diagnostic, deviceOS;
let cameraDeniedAlwaysAfterRequesting = false;

function onDeviceReady(){
    diagnostic = cordova.plugins.diagnostic; // alias to shorter namespace
    diagnostic.getDeviceOSVersion(function(osDetails){
        deviceOS = osDetails;
        checkCameraPermission();
    })
}

function checkCameraPermission(){
    diagnostic.getPermissionAuthorizationStatus(function(status){

        // If running on Android 11+ and status is DENIED_ALWAYS, assume it can still be requested (i.e. user selected "Only once" in previous app session)
        if(deviceOS.apiLevel >= 30 && status === diagnostic.permissionStatus.DENIED_ALWAYS && !cameraDeniedAlwaysAfterRequesting){
            status = diagnostic.permissionStatus.DENIED_ONCE;
        }

        switch(status){
            case diagnostic.permissionStatus.GRANTED:
                console.log("Camera permission is allowed")
                break;
            case diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Camera permission not requested yet - requesting...")
                requestCameraPermission();
                break;
            case diagnostic.permissionStatus.DENIED_ONCE:
                console.log("Camera permission denied but can still request - requesting...")
                requestCameraPermission();
                break;
            case diagnostic.permissionStatus.DENIED_ONCE:
                console.log("Camera permission permanently denied - can't request");
                break;
        }
    }, console.error, diagnostic.permission.CAMERA)
};

function requestCameraPermission(){
    diagnostic.requestRuntimePermission(function(status){

        // If result is DENIED_ALWAYS after requesting then it really is permanently denied
        if(status === diagnostic.permissionStatus.DENIED_ALWAYS){
            cameraDeniedAlwaysAfterRequesting = true;
        }

        // Re-check permission
        checkCameraPermission();

    }, console.error, diagnostic.permission.CAMERA);
}

document.addEventListener("deviceready", onDeviceReady, false);

```



##### Runtime permissions example project

While the [cordova-diagnostic-plugin-example](https://github.com/dpa99c/cordova-diagnostic-plugin-example) illustrates use of runtime permissions in the context of requesting location and camera access, the [cordova-diagnostic-plugin-android-runtime-example](https://github.com/dpa99c/cordova-diagnostic-plugin-android-runtime-example) project explicitly illustrates use of Android runtime permissions with this plugin.

##### Android Camera permissions

Note that the Android variant of [`requestCameraAuthorization()`](#requestcameraauthorization), in addition to the `CAMERA` permission, by default also requests storage permissions.
This is because the Android camera API requires access to the device's storage to store captured images and videos.

On Android <=12, this requires the `WRITE_EXTERNAL_STORAGE` and `READ_EXTERNAL_STORAGE` permissions.
On Android >12, this requires the `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO` permissions.

This is because the [cordova-plugin-camera@2.2+](https://github.com/apache/cordova-plugin-camera) requires both of these permissions.

So to use this method in conjunction with the Cordova camera plugin, make sure you are using the most recent `cordova-plugin-camera` release: v2.2.0 or above.

### Android Auto Backup

* Android 6 and above introduces an [Auto Backup](http://androiddoc.qiniudn.com/training/backup/autosyncapi.html) mechanism whereby app data is backed up to the Cloud and restored when the app is re-installed or installed on a different device signed in with the same Google account.
* By default, Auto Backup will sync **all local app data** including file storage, databases, shared preferences (k/v storage), etc.
* This plugin uses Android's [SharedPreferences API](https://developer.android.com/reference/android/content/SharedPreferences) in order to track whether a runtime permission has been requested during the current installation.
* This enables the plugin to determine if a permission's status is `NOT_REQUESTED` vs `DENIED_ALWAYS` since the Android runtime permissions API does not distinguish between these states.
* So if Auto Backup is enabled for your app, you'll need to exclude the shared preferences used by this plugin, otherwise preferences that were requested during a previous installation will be wrongly determined as `DENIED_ALWAYS` if the shared preferences data is restored from Cloud storage
* To exclude this plugin's data, add the following rule to your XML backup rules: `<exclude domain="sharedpref" path="Diagnostic.xml"/>`

## iOS

### iOS usage description messages

When requesting permission to use device functionality, a message is displayed to the user indicating the reason for the request.
These messages are stored in the `{project}-Info.plist` file under `NS*UsageDescription` keys.

Upon installing this plugin into your project, it will add the following default messages to your plist.
To override these defaults, you can use `<edit-config>` blocks in your `config.xml`:

`config.xml`

    <platform name="ios">
        <edit-config file="*-Info.plist" target="NSLocationAlwaysUsageDescription" mode="merge">
            <string>My custom message for always using location.</string>
        </edit-config>
        <edit-config file="*-Info.plist" target="NSLocationWhenInUseUsageDescription" mode="merge">
            <string>My custom message for using location when in use.</string>
        </edit-config>
    </platform>

# Example project

Example project using simple HTML/CSS/JS (no frameworks): [cordova-diagnostic-plugin-example](https://github.com/dpa99c/cordova-diagnostic-plugin-example)

Example project using Ionic Framework: [cordova-diagnostic-plugin-ionic-example](https://github.com/dpa99c/cordova-diagnostic-plugin-ionic-example)

Phonegap Build users who want to validate the plugin in that environment can try building: [https://github.com/dpa99c/cordova-diagnostic-plugin-phonegap-build-example](https://github.com/dpa99c/cordova-diagnostic-plugin-phonegap-build-example)

## Screenshots

### Android

![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_1.png)
![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_2.png)
![Android screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/android_3.png)

### iOS

![iOS screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/ios_1.png)
![iOS screenshot](https://raw.githubusercontent.com/dpa99c/cordova-diagnostic-plugin-example/master/screenshots/ios_2.png)

# Release notes

See the [CHANGELOG.md](https://github.com/dpa99c/cordova-diagnostic-plugin/blob/master/CHANGELOG.md)

# Credits

Forked from: [https://github.com/mablack/cordova-diagnostic-plugin](https://github.com/mablack/cordova-diagnostic-plugin)

Original Cordova 2 implementation by: AVANTIC ESTUDIO DE INGENIEROS ([www.avantic.net](http://www.avantic.net/))

# License
================

The MIT License

Copyright (c) 2016 Dave Alden / Working Edge Ltd.

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
