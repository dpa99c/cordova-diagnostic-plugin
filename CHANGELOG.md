# CHANGELOG

**v7.2.7**
(ios) bugfix: Handle DNS PolicyDenied like EPERM for local network permission detection

**v7.2.6**
* (ios) fix: Local Network status check now accepts a configurable timeout, detects permission denials via NWBrowser errors/NSNetService failures, and returns `UNKNOWN` instead of `DENIED_ALWAYS` when the probe times out. This works around an issue where, if the network stack is under load, local network permission may be falsely reported as denied because iOS fails to resolve the Bonjour service within the default timeout period.

**v7.2.5**
* (ios) feat: add check/request local network authorization to Wifi module
  * Resolves [#524](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/524)

**v7.2.4**
* (android & ios) feat: add `isCompassAvailable()` to detect availability of compass for device heading.
* (doc) update getCameraRollAuthorizationStatus example to include accessLevel parameter
  * Merged from PR [#532](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/532)
* (android) fix(Diagnostic_Bluethooth.java): Value null at 0 of type org.json.JSONObject$1 cannot be converted to JSONArray
  * Merged from PR [#529](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/529)

**v7.2.3**
* (android) bugfix: dynamically resolve BuildConfig class (and remove hard-coded example app package name) when determining isDebugBuild()

**v7.2.2**
* (ios & android) feat: add isDebugBuild()
* fix: Separate isMobileDataEnabled() for Android vs isMobileDataAuthorized() for iOS. 
  * Resolves [#482](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/482)


**v7.2.1**
* (android) fix logic in native resolution of single combined permission status in `getCameraAuthorizationStatus()` so it handles case where storage permissions are not requested

**v7.2.0**
* (android) feat: direct getExternalSdCardDetails without permission request
  * Merged from PR [#501](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/501)
* (doc) Add note about reinstalling plugin after adding modules preference to config.xml
* (doc) Clarify functionality of `enableDebug()` method
  * Merged from PR [#522](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/522)
* (ios) Add conditions to not use CTCellularData on Mac Catalyst.
  * Merged from PR [#521](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/521)
  * Resolves [#520](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/520)
* (ios) feat: add switchToNotificationSettings function for iOS platform
  * Merged from PR [#517](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/517)
* (ios) feat: add Resource Bundle to provide the Privacy Manifest
  * Merged from PR [#516](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/516)
* (android) fix: Bump WRITE_EXTERNAL_STORAGE to 32 for camera
  * Merged from PR [#510](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/510)
  * Resolves [#518](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/518)
* (doc) fix: recommend use of `<edit-config>` instead of `<config-file>`
  * Merged from PR [#505](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/505)
* (android) fix: remove unused imports
  * Merged from PR [#504](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/504)
* (doc) correct example log for Ephemeral permission granted
  * Merged from PR [#503](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/503)
* (android) fix: replace deprecated StatFs functions
  * Merged from PR [#502](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/502)
* (android) improve camera authorisation handling and support new behaviour in API 34 / Android 14
  * Add `getCameraAuthorizationStatuses()` to return the individual statuses of requested permissions related to camera
  * Change `getCameraAuthorizationStatus()` to natively derive the single combined status result based upon build SDK version and requested permission statuses
    * Return a `LIMITED` status on Android 14 if user selects limited access to photo library (return `GRANTED` if user selects to allow access to all)
  * Resolves [#519](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/519)


**v7.1.4**
* (android) bugfix: decide if a permission is implicitly granted by checking if the device runtime is less than, but the build SDK used for the app is greater is or equal than, the SDK version in which the permission was added.
  * Resolves [#508](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/508)
* (android) tweak: throw error if a requested runtime permission is not supported by the build SDK version
* (android) bugfix: when requesting camera permission, storage permission should also be requested by default if not specified but is currently not being


**v7.1.3**
* (android) update camera module to support READ_MEDIA permissions on Android 13+
* (android): For new runtime permissions added in API 33, consider them implicitly granted if the build SDK >= 33 and device runtime is < 33.
  * Resolves [#493](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/493)
* (android) fix: Return error if attempting to change Bluetooth state when build SDK >= API 33 as this is no longer support.
  * Resolves [#496](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/496)
* (android) fix: getExternalSdCardDetails on API 33
  * Merged from PR [#495](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/495)
* (types) Using unlimited arrays in the TypeScript definition
  * Merged from PR [#497](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/497)    


**v7.1.2**
* (Android) fix: Data roaming setting not available on API 32+
* (Android) Support new media storage permissions on Android 13 / API 33.
  * Resolves [#488](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/488).
* (ios) bugfix: Check argument for Photo Library Access Level is not null before attempting to perform string compare.
  * Resolves [#483](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/483).
* (doc) Document issue with "Only this time" option in run-time permissions on Android 11+.
  * Resolves [#486](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/486).


**v7.1.1**
* (Android, iOS) feat: Add `isMobileDataEnabled()` to core module.
    * Based on PR [#478](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/478)
* (iOS) bugfix: Only allow Bluetooth permission request if not already requested.
    * Resolves [#477](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/477).
* (iOS) bugfix: Resolve the correct authorization status after requesting camera roll authorization and granting LIMITED access.
    * Resolves [#476](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/476).


**v7.1.0**
* (Android, iOS) feat: add support to fetch device OS and build SDK details


**v7.0.0**
* (Android) BREAKING chore: Remove deprecated aliases `cordova.plugins.diagnostic.runtimePermission` and  `cordova.plugins.diagnostic.runtimePermissionStatus`
    - Use `cordova.plugins.diagnostic.permission` and `cordova.plugins.diagnostic.permissionStatus` instead.
* (iOS) feat: Add support for Photo Library access levels on iOS 14+
    * Resolves [#473](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/473).
    * Add support to show Limited-Library Selection UI for Photo Roll in iOS 14+
* (Android) feat: Add `isAirplaneModeEnabled()` to check if airplane mode is enabled on the device.
* (iOS) feat: add support for checking Bluetooth authorization status on iOS
* (Android) feat: Add support Bluetooth run-time permissions on API 31+
    * Merged from PR [#465](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/465)
* (Android) BREAKING fix: Update location API for approximate vs precise location permission on Android 12+
    * See https://developer.android.com/training/location/permissions#approximate-request
    * Resolves [#468](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/468).
* (Android) fix: Update Android Location module to use LocationManager instead of Settings.Secure.LOCATION_MODE for APIs 28 and higher.
    * Merged from PR [#466](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/466)    
* (iOS) BREAKING fix: If `getLocationAccuracyAuthorization()` is called on <iOS 14, return `FULL` accuracy to success handler (instead of invoking error handler).
* (iOS) fix: expose and document EPHEMERAL and PROVISIONAL authorization statues for iOS notifications.
    * Resolves [#443](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/443).
* (Android) fix Add support for all dangerous (runtime) permissions up to API 33.
    * Resolves [#448](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/448) and [#460](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/460).
* (Android) bugfix: fix cold restart for API 29+
    * Resolves [#453](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/453).
* (Windows) BREAKING chore: Remove support for deprecated Windows 10 Mobile platform
* (Build) fix: Bump minimist to v1.2.6 to prevent security issues
    * Merged from PR [#464](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/464)


**v6.1.1**
* Assorted type corrections
    * Merged from PR [#446](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/446)
    * Pin `colors` to `1.4.0`
        * Resolves [#451](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/451).
        * Merged from PR [#452](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/452)
        
**v6.1.0**
* (Android, iOS) Add `getCurrentBatteryLevel()` to core module to retrieve current device battery level.

**v6.0.4**
* (iOS) Add support for Provisional and Ephemeral notification permission statuses,
    * Merged from PR [#437](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/437)
* (Android) Add support for `ACTIVITY_RECOGNITION` runtime permission
    * Merged from PR [#430](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/430)
* (Android) Add `switchToNotifications()`  
    * Merged from PR [#434](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/434)
* (Android): Add separate plugin variable for AndroidX appcompat vs legacy version and pin to exact version numbers. 
    * Resolves [#440](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/440).
    * Based on PR [#441](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/441).

**v6.0.3**
* (iOS) Update assertion to require `NSLocationAlwaysAndWhenInUseUsageDescription` instead of `NSLocationAlwaysUsageDescription` since the latter is deprecated since iOS 11.
* Fix docs referring to `NOT_REQUESTED` constant
    * Merged from PR [#414](https://github.com/dpa99c/cordova-diagnostic-plugin/pull/414)
* (Android) Fix issues with background location permission when running on less than Android API 29 / 10.0.
    * Resolves [#423](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/423). 

**v6.0.2**
* (iOS) Update location accuracy authorization logic based on iOS 14 Beta 3. 
    * Relates to [#402](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/402). 

**v6.0.1**
* (iOS, bug fix): Fix handling of conditional logic for iOS version in location module. 
    * Resolves [#406](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/406).

**v6.0.0**
* (iOS) Support new location accuracy authorization API on iOS 14+.
    * Resolves [#402](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/402).
* (Android) *BREAKING CHANGE:*  Migrate to AndroidX from Android Support Library
    * The recommended Cordova Android platform version is now `cordova-android@9.0.0` (which includes AndroidX support).
        * To use this plugin with `cordova-android@8`, install [cordova-plugin-androidx](https://github.com/dpa99c/cordova-plugin-androidx) and [cordova-plugin-androidx-adapter](https://github.com/dpa99c/cordova-plugin-androidx-adapter).
* (iOS) *BREAKING CHANGE:* Remove conditional code to support iOS <= 9

**v5.0.2**
* (Android) Add support for background location permission on Android 10 / API 29. Resolves [#398](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/398).
* (Doc) Add doc about `locationAuthorizationMode` constants
* (Doc) Fix error in `hasBluetoothSupport()` example
* (Doc) Fix `enableDebug()` for iOS note
* (iOS) Add return statement to getBackgroundRefreshStatus following handling of an exception raised when attempting to retrieve status. Resolves [#389](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/389).
* (iOS): If motion tracking is not available on the device, return "not available" when calling getMotionAuthorizationStatus(). Further resolves [#372](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/372).


**v5.0.1**
* Add types for various statuses constants (thanks to [@fcamblor](https://github.com/fcamblor))
* (iOS) Add placeholder `NSBluetoothAlwaysUsageDescription` to Bluetooth module. 
    * Resolves [#369](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/369).
* (iOS) Only initialise the native Bluetooth manager on calling a plugin API operation in the Bluetooth module.
    * This is necessary because on iOS 13, since initialising the Bluetooth manager implicitly requests runtime access to Bluetooth, presenting the user with a permission dialog.
    * Fixes [#365](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/365).
* (iOS): Fix setting/getting of persistent user settings so motion permission status is correctly determined. Fixes [#372](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/372).    

**v5.0.0**
* BREAKING CHANGE - Align permission status constants between iOS and Android platforms. Resolves [#230](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/230).

**v4.0.12**
* Enable default version of Android Support Library to be overridden at plugin installation via ANDROID_SUPPORT_VERSION plugin variable. Resolves [#338](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/338).
* Bump default Android Support Library version to `28.+` to match `cordova-android@8.0.0`.

**v4.0.11**
* Bug fix: On Android, count number of available cameras in order to determine if camera is present (since FEATURE_CAMERA can't be relied upon). Resolves [#339](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/339).

**v4.0.10**
* Bug fix: return string instead of object to success function after requesting single runtime permission on Android. Fixes [#324](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/324).

**v4.0.9**
* Add minimum version restriction on Cordova CLI and platforms to prevent anomalous issues being reported due to outdated Cordova environment. Resolves [#323](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/323).

**v4.0.8**
* iOS build fix: Make static the definition of the diagnostic variable which references the Diagnostic singleton instance to prevent it leaking to global scope and causing duplicate symbol build errors. Fixes [#308](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/308).
* Fix typo which references wrong namespace. See [#306](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/306).

**v4.0.7**
Use native SharedPreferences to track request permissions (instead of HTML5 Local Storage) in order to avoid issues with Android Autobackup. Fixes [#304](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/304).

**v4.0.6**
* Remove obselete `windows-target-version` preference which is causing Window platform build failure. Fixes [#295](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/295).
* Add missing call to getMotionAuthorizationStatus() in iOS motion module.

**v4.0.5**
* Bug fix: ensure complete camera module inclusion and default Info.plist strings on iOS. 
Merges [#292](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/292). 

**v4.0.4**
* Ensure all Android code entry points are handled in try/catch blocks to prevent app crashes by unhandled exceptions.
* Enable the `types` parameter for `requestRemoteNotificationsAuthorization` to be omitted (rather than requiring empty object). Fixes [#286](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/286).

**v4.0.3**
* Remove literal angle brackets in comment attributes as they cause XML parse issue in Visual Studio. Fixes [#284](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/284).

**v4.0.2**
* Add `<uses-permission>` manifest entry for Bluetooth since registering broadcast receiver is now done at runtime. Fixes [#282](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/282)/[#283](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/283).

**v4.0.1**
* Register explicit broadcast receivers for location/Bluetooth/NFC state change listeners at run-time, due to [removal of support for implicit broadcast receivers in Android 8.0 (API 26)](https://developer.android.com/about/versions/oreo/background.html#broadcasts).
Fixes [#279](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/279).

**v4.0.0**
* Major rework of plugin code (both native and JS) into separate modules.
    * Adds mechanism for including optional modules via config preference.
    * Resolves [#181](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/181).
* Removed deprecated iOS method `requestAndCheckMotionAuthorization()`

**v3.9.2**
* Run iOS plugin initialisation on-load (rather than on-demand) to avoid race conditions when querying async native managers such as Bluetooth. Fixes [#271](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/271).
* Run all iOS native plugin commands on a background thread (other than those which call methods on `[UIApplication sharedApplication]` so must explicitly run on the main thread) to prevent THREAD WARNING messages in the console.
Fixes [#272](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/272).


**v3.9.1**
* Declare Objective-C constants as static. Fixes [#270](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/270).

**v3.9.0**
* Add `requestRemoteNotificationsAuthorization()` for iOS. Resolves [#269](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/269).
* Add `remoteNotificationType` constants for iOS to enumerate the various notification types when checking with `getRemoteNotificationsAuthorizationStatus()` or requesting with `requestRemoteNotificationsAuthorization()`.
* Minor refactor/code cleanup of native iOS implementation.

**v3.8.1**
* Use `if else` instead of `switch` on CPU arch strings for backward-compatibility to Java 6. [PR #263](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/263). Fixes [#264](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/264). 

**v3.8.0**
* Add `enableDebug()` to Android and iOS which outputs native plugin debug messages to native and JS consoles.
* Add `restart()` to Android which warm/cold restarts the app.
* Add `getArchitecture()` to Android and iOS to return the CPU architecture of the current device.

**v3.7.3**
* Revert "add switchToLocationSettings to iOS" (PR [#223](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/223) / commit 74e1d97939a3f7d3d14424761100d4506b55afa6). Resolves [#262](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/262).

**v3.7.2**
* Fix Android build errors due to stricter checks on WifiManager reference. Fixes [#251](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/251).

**v3.7.1**
* Set Android Support Library version to v26.+. Fixes [#240](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/240) - again!

**v3.7.0**
* Adds `isADBmodeEnabled()` and `isDeviceRooted()` for Android (thanks to [wangjian2672](https://github.com/wangjian2672))
* Adds `isDataRoamingEnabled()` for Android (thanks to [dukhanov](https://github.com/dukhanov))
* Calls `isRegisteredForRemoteNotifications` on background thread for iOS 11. Fixes [#238](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/238).
* Rewrites Motion Tracking authorization for iOS to fix bugs and edge cases (see [#197](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/197)).
    * Splits `requestAndCheckMotionAuthorization()` into `requestMotionAuthorization()` and `getMotionAuthorizationStatus()`.
        * `getMotionAuthorizationStatus()` returns the current authorization status only and does not request permission if it has not already been requested.
        * `requestMotionAuthorization()` should now only be called once when `motionStatus` is `NOT_REQUESTED`. Calling more than once will invoke the error callback. 
    * Adds `cordova.plugins.diagnostic.motionStatus` constants to full describe authorization states.
    * Deprecates `requestAndCheckMotionAuthorization()`. Calling this will invoke `requestMotionAuthorization()` but also generate a console warning.

**v3.6.7**
* Adds `isRemoteNotificationsEnabled()` for Android (in addition to iOS).
* Adds `getRemoteNotificationsAuthorizationStatus()` for iOS 10+.

**v3.6.6**
Adds `switchToLocationSettings()` for iOS. 

**v3.6.5**
Pin Android Compat and Support library deps to v25.+ to prevent unwanted v26 alpha/beta versions from being pulled in.

**v3.6.4**
Fix Android bug with legacy API signatures for Camera functions, where 3rd argument (`externalStorage`) is `false`.

**v3.6.3**
Fix iOS bug causing location state change handlers to erroneously trigger early. Fixes [#185](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/185) for iOS.

**v3.6.2**
Fix bug in mapping of legacy camera API function signatures for iOS and Windows.

**v3.6.1**
Fix bug in mapping of legacy camera API function signatures for Android.

**v3.6.0**
* Undeprecate legacy camera API and support multiple call signatures for camera API methods for the benefit of ionic-native wrapper.

**v3.5.0**
* Enable option to request/check only CAMERA permission on Android when using camera methods. Fixes [#178](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/178).

**v3.4.2**
* Check Android SDK version for attempting to check for Bluetooth LE Peripheral support
* Support isWifiEnabled on iOS


**v3.4.1**
* Add missing export. Fixes [#173](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/173)
* Add missing NFC state constant and cordova reference to typings

**v3.4.0**
* Add notes for Phonegap Build regarding setting latest CLI version and PGB example project. Clarifies [#168](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/168).
* customize to add api for requestExternalStorage permission for android
* Standardize and document Android external storage permissions convenience methods.
* Support for Android external SD card details
* Add NFC operations for Android to check for NFC hardware, if NFC is enabled and open NFC settings page
* Adds NFC state change monitoring.

**v3.3.3**
* Update docs regarding Android SDK component versions

**v3.3.2**
* Wrap motion handlers in try/catch to prevent unhandled errors causing native crash.
* Test for presence of CMPedometer.isPedometerEventTrackingAvailable() before attempting to call it, since it was only added in iOS 10 but CMPedometer was added in iOS 8.


**v3.3.1**
* Remove erroneous wrapping of iOS JS in require module (since Cordova does this dynamically)

**v3.3.0**
* Add type definitions and tests
* Add download and version badges
* Return current (rather than cached) Bluetooth state.
* Add requestBluetoothAuthorization() for iOS
* Add support for requesting and checking motion tracking authorization on iOS.
* Add notes indicating which functions require which usage descriptions for iOS.
* Document how to handle outcome of requesting Bluetooth authorization

**v3.2.2**
* Fix switchToSettings for iOS 9. Resolves [#127](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/127).
* Fix isRemoteNotificationsEnabled() and isRemoteNotificationsEnabled() for iOS 9. Resolves [#129](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/129).

**v3.2.1**
* Conditionally include UserNotifications framework only for iOS 10+ to prevent errors in older versions.
* Move imports to Diagnostic.h
* Use conditional compiler comments to wrap iOS 10-specific code to prevent compiler errors on XCode 7
* Add note on v3.2 build requirements. Resolves [#124](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/124).
* Fix erroneous early invocation of requestLocationAuthorization callback on iOS. Fixes [#123](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/123).

**v3.2.0**
* Add missing usage description for reminders (required by iOS 10).
* Add UserNotifications framework to enable diagnostics of remote (push) notifications on iOS 10.
* Rework remote notifications diagnostics to use new UserNotifications framework in iOS 10+. Fixes [#121](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/121).
* Rework sending of plugin results to factorise out common code.
* Add iOS-version conditionality to fix deprecation warnings in iOS 10.

**v3.1.7**
* Adds NSContactsUsageDescription (iOS10)

**v3.1.6**
* Add new iOS usage description keys, as now required by iOS 10 to prevent build rejection on submission to App Store. Fixes [#116](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/116).

**v3.1.5**
* Bug fix: getMicrophoneAuthorizationStatus() returns "granted" but the Diagnostic.permissionStatus.GRANTED constant is "authorized"

**v3.1.4**
* Add missing reference to Contacts framework for iOS. Resolves [#106](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/106).
* Add missing initialisation of contacts store (introduce by pull request [#98](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/98)). Fixes [#113](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/113).
* Enable de-registering of existing handler functions by passing an falsey value.
* Prevent multiple runtime permission requests on Android using a semaphore. Resolves [#99](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/99). 
* Add functions to listen for completion of runtime permission requests and to indicate if a permission request is in progress.

**v3.1.3**
* Fixed iOS Warnings for deprecations

**v3.1.2**
* Unpin major version of Android support library to enable latest SDK version to be used. Resolves [#105](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/105).


**v3.1.1**
* Return current (rather than cached) state of Bluetooth adapter on Android. Fixes [#97](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/97).
* Add empty locationAuthorizationMode object to Android implementation. Resolves [#90](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/90).
* Add support for checking iOS background refresh authorization status. Resolves [#95](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/95)

**v3.1.0**

**NOTE:** This version contains backwardly-incompatible renaming of some functions. Either fix the version of the plugin in your config.xml to `cordova.plugins.diagnostic@3.0` or update your code to use the revised names below.

- Revised function names to logically separate those which check if device OS setting is enabled (`isSomethingEnabled()`) vs those which check if hardware/sensor is available for use by the app (device OS setting is enabled AND app has authorisation AND hardware is present - `isSomethingAvailable()`).
    - Renamed `isLocationEnabled()` => `isLocationAvailable()` (Android, iOS and Windows 10 Mobile) - if location is available to app
    - Renamed `isLocationEnabledSetting()` => `isLocationEnabled()` (iOS) - if device setting for location is enabled
    - Added `isLocationEnabled()` (Android) - if device setting for location is enabled
    - Renamed `isCameraEnabled()` => `isCameraAvailable()` (Android, iOS and Windows 10 Mobile) - if camera is available to app
    - Renamed `isBluetoothEnabled()` => `isBluetoothAvailable()` (Android, iOS and Windows 10 Mobile) - if Bluetooth is available to app
    - Added `isBluetoothEnabled()` (Android) - if the device setting for Bluetooth is enabled
    - Renamed `isGpsLocationEnabled()` => `isGpsLocationAvailable()` (Android) - if GPS location is available to app
    - Added `isGpsLocationEnabled()` (Android) - if device setting for GPS location is enabled
    - Renamed `isNetworkLocationEnabled()` => `isNetworkLocationAvailable()` (Android) - if network location is available to app
    - Added `isNetworkLocationEnabled()` (Android) - if device setting for network location is enabled

**v3.0.3**

- Fix for [#80](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/80), where change in Location Mode on Android would cause exception if plugin has not been initialised by a call from JS.

**v3.0.2**

- Updated plugin and documentation to explicitly support only Windows 10 Mobile (and not Windows Phone 8.x)

**v3.0.1**

- Fixed Android issues for apps not using Bluetooth state listening

**v3.0.0**

- Added permissions management for Contacts and Calendar to Android & iOS
- Added permissions management for Reminders to iOS
- Enable registration of listeners to be notified of location and Bluetooth state changes on Android and iOS
- Replace string literals returned with constants

*Backward-incompatibility with v2*

In order to make cross-platform use of the shared plugin functions easier, some **backwardly-incompatible changes** have been made to existing API functions.

To avoid breaking existing code which uses the old API syntax, you can continue to use the v2 API by specifying the plugin version when adding it: `cordova.plugins.diagnostic@2`

v3 contains the following backwardly-incompatible changes:

iOS:

- `requestCameraAuthorization()` and `requestMicrophoneAuthorization()`: success callback is now passed a {string} referencing the `permissionStatus` constants instead of a {boolean}

**v2.3.16**

- Update Android variant of camera authorization methods to request CAMERA permission in addition to READ_EXTERNAL_STORAGE. This is due to permission changes in cordova-plugin-camera@2.2.0.

**v2.3.15**

- Add checks for Bluetooth Low Energy (LE) and Bluetooth LE Peripheral Mode to Android
- Fix bug causing getMicrophoneAuthorizationStatus() to always return NOT_DETERMINED

**v2.3.14**

- Add support for checking and requesting microphone access to Android and iOS
- Document current quirks with requestCameraAuthorization() on Android.

**v2.3.13**

- Fix erroneous reference to invalidPermissions. Fixes [#42](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/42).
- Document deprecation of registerLocationAuthorizationStatusChangeHandler()

**v2.3.12**

- Simplify the handling of user response to location authorization request on iOS. Fixes [#35](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/35).

**v2.3.11**

- Callback to JS in WebView-agnostic way from iOS native
- Change so only one location permission type is needed more location to be authorized on Android
- Robustify check for UIApplicationOpenSettingsURLString. Fixes [#34](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/34).
- Update docs regarding requestLocationAuthorization on iOS vs Android. Improves [#35](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/35) but doesn't entirely fix it.
- Fixed requestCameraAuthorization returning DENIED_ALWAYS when access is granted on Android

**v2.3.10**

- Update documentation regarding Android API version and legacy API 22 branch

**v2.3.9**

- Ensure plugin methods return boolean true/false (not integer 0/1). Fixes [#28](https://github.com/dpa99c/cordova-diagnostic-plugin/issues/28).

**v2.3.0**

This version updates the plugin to support Android 6 (API 23) [runtime permissions](http://developer.android.com/training/permissions/requesting.html).

In order to do this it must depend on libraries only present in API 23+, so you __must build using Android SDK Platform v23 or above__. To do this you must have [Cordova Android platform](https://github.com/apache/cordova-android)@5.0.0 or above installed in your project. You can check the currently installed platform versions with the following command:

    cordova platform ls

Currently the default version installed (if not specified) is cordova-android@4 which uses API 22, so you need to explicitly specify the version when adding the platform:

    cordova platform add android@5.0.0

__Note:__ Attempting to build with API 22 or below will result in a build error.


You __must__ also make sure your build environment has the following Android libraries installed. In a local build environment, you'd install these via the Android SDK Manager:

 -  Android Support Library - Rev. 23 or above
 -  Android Support Repository - Rev. 23 or above
 
**v2.2.4**
* Added support for Windows 10 Mobile

**v2.2.2**
* Add getLocationMode() for Android

**v2.2.1**
* Note about Cordova Plugin Repo deprecation

**v2.2.0**
* Add bluetooth state change handlers
* Add documentation for new iOS functions
* Add functionality to request camera roll authorization on iOS.

**v2.1.0**
* Rework iOS location authorization to return authorization status
* Add iOS camera authorization functionality

**v1.1.1**
* Add switchToSettings() method for iOS
* Enable switching to settings screens on Android
* Split JS component into platform-specific versions
* Update documentation to clarify Android location state
* Added documentation for isBluetoothEnabled()
* Added isBluetoothEnabled() for iOS
* Add isBluetoothEnabled() for Android
