// Type definitions for cordova.plugins.diagnostic v4
// Project: https://github.com/dpa99c/cordova-diagnostic-plugin
// Definitions by: Dave Alden <https://github.com/dpa99c/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="cordova" />

/**
 * Checks whether device hardware features are enabled or available to the app, e.g. camera, GPS, wifi
 */
interface Diagnostic {

    /**
     * ANDROID ONLY
     * "Dangerous" permissions that need to be requested at run-time (Android 6.0/API 23 and above)
     * See http://developer.android.com/guide/topics/security/permissions.html#perm-groups
     * @type {Object}
     */
    permission: {
        "ACCEPT_HANDOVER": "ACCEPT_HANDOVER";
        "ACCESS_BACKGROUND_LOCATION": "ACCESS_BACKGROUND_LOCATION";
        "ACCESS_COARSE_LOCATION": "ACCESS_COARSE_LOCATION";
        "ACCESS_FINE_LOCATION": "ACCESS_FINE_LOCATION";
        "ACCESS_MEDIA_LOCATION": "ACCESS_MEDIA_LOCATION";
        "ACTIVITY_RECOGNITION": "ACTIVITY_RECOGNITION";
        "ADD_VOICEMAIL": "ADD_VOICEMAIL";
        "ANSWER_PHONE_CALLS": "ANSWER_PHONE_CALLS";
        "BLUETOOTH_ADVERTISE": "BLUETOOTH_ADVERTISE";
        "BLUETOOTH_CONNECT": "BLUETOOTH_CONNECT";
        "BLUETOOTH_SCAN": "BLUETOOTH_SCAN";
        "BODY_SENSORS": "BODY_SENSORS";
        "BODY_SENSORS_BACKGROUND": "BODY_SENSORS_BACKGROUND";
        "CALL_PHONE": "CALL_PHONE";
        "CAMERA": "CAMERA";
        "GET_ACCOUNTS": "GET_ACCOUNTS";
        "NEARBY_WIFI_DEVICES": "NEARBY_WIFI_DEVICES";
        "POST_NOTIFICATIONS": "POST_NOTIFICATIONS";
        "PROCESS_OUTGOING_CALLS": "PROCESS_OUTGOING_CALLS";
        "READ_CALENDAR": "READ_CALENDAR";
        "READ_CALL_LOG": "READ_CALL_LOG";
        "READ_CONTACTS": "READ_CONTACTS";
        "READ_EXTERNAL_STORAGE": "READ_EXTERNAL_STORAGE";
        "READ_MEDIA_AUDIO": "READ_MEDIA_AUDIO";
        "READ_MEDIA_IMAGES": "READ_MEDIA_IMAGES";
        "READ_MEDIA_VIDEO": "READ_MEDIA_VIDEO";
        "READ_PHONE_NUMBERS": "READ_PHONE_NUMBERS";
        "READ_PHONE_STATE": "READ_PHONE_STATE";
        "READ_SMS": "READ_SMS";
        "RECEIVE_MMS": "RECEIVE_MMS";
        "RECEIVE_SMS": "RECEIVE_SMS";
        "RECEIVE_WAP_PUSH": "RECEIVE_WAP_PUSH";
        "RECORD_AUDIO": "RECORD_AUDIO";
        "SEND_SMS": "SEND_SMS";
        "USE_SIP": "USE_SIP";
        "UWB_RANGING": "UWB_RANGING";
        "WRITE_CALENDAR": "WRITE_CALENDAR";
        "WRITE_CALL_LOG": "WRITE_CALL_LOG";
        "WRITE_CONTACTS": "WRITE_CONTACTS";
        "WRITE_EXTERNAL_STORAGE": "WRITE_EXTERNAL_STORAGE";
    };
    

    /**
     * Constants for requesting and reporting the various permission states.
     * @type {Object}
     */
    permissionStatus: {
        // Android only
        "DENIED_ONCE": "DENIED_ONCE";

        // iOS only
        "RESTRICTED": "restricted";
        "EPHEMERAL": "ephemeral";
        "PROVISIONAL": "provisional";

        // Both iOS and Android
        "GRANTED": "authorized"|"GRANTED";
        "GRANTED_WHEN_IN_USE": "authorized_when_in_use";
        "NOT_REQUESTED": "not_determined"|"NOT_REQUESTED";
        "DENIED_ALWAYS": "denied_always"|"DENIED_ALWAYS";
        "UNKNOWN": "unknown"|"UNKNOWN";
    };

    /**
     * iOS ONLY
     * Constants for requesting and reporting the various motion states.
     * @type {Object}
     */
    motionStatus: {
        UNKNOWN: "unknown";
        NOT_REQUESTED: "not_requested";
        DENIED_ALWAYS: "denied_always";
        RESTRICTED: "restricted";
        GRANTED: "authorized";
        NOT_AVAILABLE: "not_available";
        NOT_DETERMINED: "not_determined";
    };

    /**
     * Location authorization mode
     * @type {Object}
     */
    locationAuthorizationMode: {
        "ALWAYS": "always";
        "WHEN_IN_USE": "when_in_use";
    };

    /**
     * Location accuracy authorization
     * @type {Object}
     */
    locationAccuracyAuthorization: {
        "FULL": "full";
        "REDUCED": "reduced";
    };


    /**
     * ANDROID ONLY
     * Constants for the various location modes on Android.
     * @type {Object}
     */
    locationMode: {
        "HIGH_ACCURACY": "high_accuracy";
        "DEVICE_ONLY": "device_only";
        "BATTERY_SAVING": "battery_saving";
        "LOCATION_OFF": "location_off";
    };

    /**
     * Constants for the various Bluetooth hardware states.
     * @type {Object}
     */
    bluetoothState: {
        // iOS only
        "RESETTING": "resetting";
        "UNSUPPORTED": "unsupported";
        "UNAUTHORIZED": "unauthorized";

        // Android only
        "POWERING_OFF": "powering_off";
        "POWERING_ON": "powering_on";

        // Both iOS and Android
        "UNKNOWN": "unknown";
        "POWERED_OFF": "powered_off";
        "POWERED_ON": "powered_on";
    };


    /**
     * ANDROID ONLY
     * Constants for the various NFC power states.
     * @type {Object}
     */
    NFCState: {
        "UNKNOWN": "unknown";
        "POWERED_OFF": "powered_off";
        "POWERING_ON": "powering_on";
        "POWERED_ON": "powered_on";
        "POWERING_OFF": "powering_off";
    };

    /**
     * ANDROID ONLY
     * Constants for the various CPU architectures.
     * @type {Object}
     */
    cpuArchitecture: {
        // Android only
        MIPS: "MIPS";
        MIPS_64: "MIPS_64";

        // Both iOS and Android
        UNKNOWN: "unknown";
        ARMv6: "ARMv6";
        ARMv7: "ARMv7";
        ARMv8: "ARMv8";
        X86: "X86";
        X86_64: "X86_64";
    };

    /**
     * iOS ONLY
     * Constants for requesting/reporting the various types of remote notification permission types on iOS devices.
     * @type {Object}
     */
    remoteNotificationType: {
        ALERT: "alert";
        SOUND: "sound";
        BADGE: "badge";
    };

    /**
     * Checks if app is able to access device location.
     * @param successCallback
     * @param errorCallback
     */
    isLocationAvailable: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if app is able to access device heading.
     * @param successCallback
     * @param errorCallback
     */
    isCompassAvailable: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if Wifi is available.
     * On iOS this returns true if the device is connected to a network by WiFi.
     * On Android this returns true if the WiFi setting is set to enabled, and is the same as isWifiEnabled()
     * @param successCallback
     * @param errorCallback
     */
    isWifiAvailable: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if camera is available.
     * On Android & iOS this returns true if the device has a camera AND the application is authorized to use it.
     * @param successCallbackOrParams
     * @param errorCallback
     * @param externalStorageOrParams
     */
    isCameraAvailable: (
        successCallbackOrParams?: (available: boolean) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * Checks if Bluetooth is available to the app.
     * Returns true if the device has Bluetooth capabilities AND if Bluetooth setting is switched on (same on Android, iOS)
     * @param successCallback
     * @param errorCallback
     */
    isBluetoothAvailable: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;


    /**
     * ANDROID ONLY
     * Displays the device location settings to allow user to enable location services/change location mode.
     */
    switchToLocationSettings?: () => void;

    /**
     * ANDROID ONLY
     * Displays mobile settings to allow user to enable mobile data.
     */
    switchToMobileDataSettings?: () => void;

    /**
     * ANDROID ONLY
     * Displays Bluetooth settings to allow user to enable Bluetooth.
     */
    switchToBluetoothSettings?: () => void;

    /**
     * ANDROID ONLY
     * Displays WiFi settings to allow user to enable WiFi.
     */
    switchToWifiSettings?: () => void;

    /**
     * ANDROID ONLY
     * Returns true if the WiFi setting is set to enabled, and is the same as isWifiAvailable()
     * @param successCallback
     * @param errorCallback
     */
    isWifiEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Enables/disables WiFi on the device.
     * @param successCallback
     * @param errorCallback
     * @param state
     */
    setWifiState?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void,
        state: boolean
    ) => void;

    /**
     * ANDROID ONLY
     * Enables/disables Bluetooth on the device.
     * @param successCallback
     * @param errorCallback
     * @param state
     */
    setBluetoothState?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void,
        state: boolean
    ) => void;

    /**
     * Enables debug mode, which logs native plugin debug messages to the native and JS consoles.
     * Debug mode is initially disabled on plugin initialisation.
     */
    enableDebug?: (
        successCallback: () => void
    ) => void;

    /**
     * Returns true if the current build is a debug build.
     * @param successCallback
     * @param errorCallback
     */
    isDebugBuild?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;



    /**
     * ANDROID ONLY
     *
     * Checks if airplane mode is enabled on device.
     *
     * @param successCallback
     * @param errorCallback
     */
    isAirplaneModeEnabled?: (
        successCallback: () => boolean,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     *
     * Checks if mobile data is enabled on device.
     *
     * @param successCallback
     * @param errorCallback
     */
    isMobileDataEnabled?: (
        successCallback: () => boolean,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * IOS ONLY
     *
     * Checks if mobile data is authorized for this app.
     *
     * @param successCallback
     * @param errorCallback
     */
    isMobileDataAuthorized?: (
        successCallback: () => boolean,
        errorCallback: (error: string) => void
    ) => void;

    /**
     *
     * Checks if accessibility mode is enabled on device.
     *
     * @param successCallback
     * @param errorCallback
     */
    isAccessibilityModeEnabled?: (
            successCallback: () => boolean,
            errorCallback: (error: string) => void
        ) => void;

    /**
     * ANDROID ONLY
     *
     * Checks if touch exploration of accessibility mode is enabled on device.
     *
     * @param successCallback
     * @param errorCallback
     */
    isTouchExplorationEnabled?: (
        successCallback: () => boolean,
        errorCallback: (error: string) => void
    ) => void;
        
    /**
     * Returns details of the OS of the device on which the app is currently running
     *
     * @param successCallback
     * @param errorCallback
     */
    getDeviceOSVersion?: (
        successCallback: (details: {version: string, apiLevel: number, apiName: string}) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns details of the SDK levels used to build the app.
     *
     * @param successCallback
     * @param errorCallback
     */
    getBuildOSVersion?: (
        successCallback: (details: {targetApiLevel: number, targetApiName: string, minApiLevel: number, minApiName: string}) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns true if the device setting for location is on.
     * On Android this returns true if Location Mode is switched on.
     * On iOS this returns true if Location Services is switched on.
     * @param successCallback
     * @param errorCallback
     */
    isLocationEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if the application is authorized to use location.
     * @param successCallback
     * @param errorCallback
     */
    isLocationAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the location authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getLocationAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;


    /**
     * Android ONLY
     * Returns the individual location authorization status for each type of location access (FINE, COARSE and BACKGROUND).
     * @param successCallback
     * @param errorCallback
     */
    getLocationAuthorizationStatuses?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Requests location authorization for the application.
     * @param successCallback
     * @param errorCallback
     * @param mode - (optional / iOS & Android >= 10) location authorization mode specified as a locationAuthorizationMode constant. If not specified, defaults to WHEN_IN_USE.
     * @param accuracy
     */
    requestLocationAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        mode?: string,
        accuracy?: string
    ) => void;

    /**
     * Returns the location accuracy authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    getLocationAccuracyAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Requests temporary access to full location accuracy for the application.
     * @param purpose
     * @param successCallback
     * @param errorCallback
     */
    requestTemporaryFullAccuracyAuthorization?: (
        purpose: string,
        successCallback?: (status: string) => void,
        errorCallback?: (error: string) => void
    ) => void;


    /**
     * Checks if camera hardware is present on device.
     * @param successCallback
     * @param errorCallback
     */
    isCameraPresent?: (
        successCallback: (present: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if the application is authorized to use the camera.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    isCameraAuthorized?: (
        successCallbackOrParams?: (authorized: boolean) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * Returns the camera authorization status for the application.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    getCameraAuthorizationStatus?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * Requests camera authorization for the application.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    requestCameraAuthorization?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * Checks if the application is authorized to use the microphone.
     * @param successCallback
     * @param errorCallback
     */
    isMicrophoneAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the microphone authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getMicrophoneAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Requests microphone authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestMicrophoneAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if the application is authorized to use contacts (address book).
     * @param successCallback
     * @param errorCallback
     */
    isContactsAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the contacts authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getContactsAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Requests contacts authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestContactsAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if the application is authorized to use the calendar.
     * @param successCallback
     * @param errorCallback
     */
    isCalendarAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the calendar authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getCalendarAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Requests calendar authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestCalendarAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Opens settings page for this app.
     * On Android, this opens the "App Info" page in the Settings app.
     * On iOS, this opens the app settings page in the Settings app.
     */
    switchToSettings?: (
        successCallback: () => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the state of Bluetooth on the device.
     * @param successCallback
     * @param errorCallback
     */
    getBluetoothState?: (
        successCallback: (state: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Registers a function to be called when a change in Bluetooth state occurs. Pass in a falsey value to de-register the currently registered function.
     * @param successCallback
     */
    registerBluetoothStateChangeHandler?: (
        successCallback?: (state: string|null) => void
    ) => void;

    /**
     * Registers a function to be called when a change in Location state occurs. Pass in a falsey value to de-register the currently registered function.
     * On Android, this occurs when the Location Mode is changed.
     * On iOS, this occurs when location authorization status is changed. This can be triggered either by the user's response to a location permission authorization dialog, by the user turning on/off Location Services, or by the user changing the Location authorization state specifically for your app.
     * @param successCallback
     */
    registerLocationStateChangeHandler?: (
        successCallback?: (state: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Registers a function to be called when a change in location accuracy authorization occurs.
     * @param successCallback
     */
    registerLocationAccuracyAuthorizationChangeHandler?: (
        successCallback: (state: string) => void
    ) => void;


    /**
     * ANDROID ONLY
     * Restarts the application.
     * By default, a "warm" restart will be performed in which the main Cordova activity is immediately restarted, causing the Webview instance to be recreated.
     * However, if the `cold` parameter is set to true, then the application will be "cold" restarted, meaning a system exit will be performed, causing the entire application to be restarted.
     * This is useful if you want to fully reset the native application state but will cause the application to briefly disappear and re-appear.
     *
     * Note: There is no successCallback() since if the operation is successful, the application will restart immediately before any success callback can be applied.
     * @param {(error: string) => void} errorCallback
     * @param {boolean} cold
     */
    restart?: (
        errorCallback: (error: string) => void,
        cold: boolean
    ) => void;

    /**
     * Returns CPU architecture of the current device.
     * @param successCallback
     * @param errorCallback
     */
    getArchitecture?: (
        successCallback: (state: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the current battery level of the device as a percentage.
     * @param successCallback
     * @param errorCallback
     */
    getCurrentBatteryLevel?: (
        successCallback: (level: number) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if high-accuracy locations are available to the app from GPS hardware.
     * Returns true if Location mode is enabled and is set to "Device only" or "High accuracy" AND if the app is authorised to use location.
     * @param successCallback
     * @param errorCallback
     */
    isGpsLocationAvailable?: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device location setting is set to return high-accuracy locations from GPS hardware.
     * Returns true if Location mode is enabled and is set to either Device only or High accuracy
     * @param successCallback
     * @param errorCallback
     */
    isGpsLocationEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if low-accuracy locations are available to the app from network triangulation/WiFi access points.
     * Returns true if Location mode is enabled and is set to "Battery saving" or "High accuracy" AND if the app is authorised to use location.
     * @param successCallback
     * @param errorCallback
     */
    isNetworkLocationAvailable?: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device location setting is set to return high-accuracy locations from GPS hardware.
     * Returns true if Location mode is enabled and is set to either Battery saving or High accuracy
     * @param successCallback
     * @param errorCallback
     */
    isNetworkLocationEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device data roaming setting is enabled.
     * Returns true if data roaming is enabled.
     * @param successCallback
     * @param errorCallback
     */
    isDataRoamingEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the current location mode setting for the device.
     * @param successCallback
     * @param errorCallback
     */
    getLocationMode?: (
        successCallback: (mode: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the current authorisation status for a given permission.
     * @param successCallback
     * @param errorCallback
     * @param permission
     */
    getPermissionAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        permission: string
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the current authorisation status for multiple permissions.
     * @param successCallback
     * @param errorCallback
     * @param permissions
     */
    getPermissionsAuthorizationStatus?: (
        successCallback: (status: Record<string,string>) => void,
        errorCallback: (error: string) => void,
        permissions: string[]
    ) => void;

    /**
     * ANDROID ONLY
     * Requests app to be granted authorisation for a runtime permission.
     * @param successCallback
     * @param errorCallback
     * @param permission
     */
    requestRuntimePermission?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        permission: string
    ) => void;

    /**
     * ANDROID ONLY
     * Requests app to be granted authorisation for multiple runtime permissions.
     * @param successCallback
     * @param errorCallback
     * @param permissions
     */
    requestRuntimePermissions?: (
        successCallback: (status: Record<string,string>) => void,
        errorCallback: (error: string) => void,
        permissions: string[]
    ) => void;

    /**
     * ANDROID ONLY
     * Indicates if the plugin is currently requesting a runtime permission via the native API.
     */
    isRequestingPermission?: () => boolean;

    /**
     * ANDROID ONLY
     * Registers a function to be called when a runtime permission request has completed. Pass in a falsey value to de-register the currently registered function.
     * @param successCallback
     */
    registerPermissionRequestCompleteHandler?: (
        successCallback?: (statuses: any) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device setting for Bluetooth is switched on.
     * @param successCallback
     * @param errorCallback
     */
    isBluetoothEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device has Bluetooth capabilities.
     * @param successCallback
     * @param errorCallback
     */
    hasBluetoothSupport?: (
        successCallback: (supported: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device has Bluetooth Low Energy (LE) capabilities.
     * @param successCallback
     * @param errorCallback
     */
    hasBluetoothLESupport?: (
        successCallback: (supported: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device supports Bluetooth Low Energy (LE) Peripheral mode.
     * @param successCallback
     * @param errorCallback
     */
    hasBluetoothLEPeripheralSupport?: (
        successCallback: (supported: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Returns the Bluetooth authorization status of the application on the device.
     * @param successCallback
     * @param errorCallback
     */
    getBluetoothAuthorizationStatus: (
        successCallback: (statuses: [{string: boolean}]) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the authorization statuses for various Bluetooth run-time permissions on Android 12+ / API 31+
     * On Android 11 / API 30 and below, all will be returned as GRANTED if the manifest has BLUETOOTH since they are implicitly granted at build-time.
     * @param successCallback
     * @param errorCallback
     */
    getBluetoothAuthorizationStatuses?: (
        successCallback: (statuses: [{string: boolean}]) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device setting for Airplane Mode is switched on.
     * @param successCallback
     * @param errorCallback
     */
    isAirplaneModeOn?: (
      successCallback: (enabled: boolean) => void,
      errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the application is authorized to use external storage.
     * @param successCallback
     * @param errorCallback
     */
    isExternalStorageAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the authorisation status for runtime permission to use the external storage.
     * @param successCallback
     * @param errorCallback
     */
    getExternalStorageAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Requests authorisation for runtime permission to use the external storage.
     * @param successCallback
     * @param errorCallback
     */
    requestExternalStorageAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns details of external SD card(s): absolute path, is writable, free space
     * @param successCallback
     * @param errorCallback
     */
    getExternalSdCardDetails?: (
        successCallback: (status: any) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if NFC hardware is present on device.
     * @param successCallback
     * @param errorCallback
     */
    isNFCPresent?: (
        successCallback: (present: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device setting for NFC is switched on.
     * @param successCallback
     * @param errorCallback
     */
    isNFCEnabled?: (
        successCallback: (present: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     *  Checks if NFC is available to the app.
     * @param successCallback
     * @param errorCallback
     */
    isNFCAvailable?: (
        successCallback: (present: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Registers a function to be called when a change in NFC state occurs.
     * Pass in a falsey value to de-register the currently registered function.
     * @param successCallback
     */
    registerNFCStateChangeHandler?: (
        successCallback?: (state: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized to use the Camera Roll in Photos app.
     * @param successCallback
     * @param errorCallback
     */
    isCameraRollAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void,
        accessLevel?: string
    ) => void;

    /**
     * iOS ONLY
     * Returns the authorization status for the application to use the Camera Roll in Photos app.
     * @param successCallback
     * @param errorCallback
     */
    getCameraRollAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        accessLevel?: string
    ) => void;

    /**
     * iOS ONLY
     * Requests camera roll authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestCameraRollAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        accessLevel?: string
    ) => void;

    /**
     * iOS ONLY
     * Presents limited library picker UI on iOS 14+
     * @param successCallback
     * @param errorCallback
     */
    presentLimitedLibraryPicker?: (
        successCallback: (identifiers?: string[]) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if remote (push) notifications are enabled.
     * @param successCallback
     * @param errorCallback
     */
    isRemoteNotificationsEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Opens the notification settings page for this app.
     */
    switchToNotificationSettings?: (
        successCallback: () => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if ADB mode(debug mode) is enabled.
     * @param successCallback
     * @param errorCallback
     */
    isADBModeEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if device is rooted.
     * @param successCallback
     * @param errorCallback
     */
    isDeviceRooted?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Indicates if the app is registered for remote (push) notifications on the device.
     * @param successCallback
     * @param errorCallback
     */
    isRegisteredForRemoteNotifications?: (
        successCallback: (registered: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Indicates the current setting of notification types for the app in the Settings app.
     * @param successCallback
     * @param errorCallback
     */
    getRemoteNotificationTypes?: (
        successCallback: (types: any) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Returns the remote notifications authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getRemoteNotificationsAuthorizationStatus?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Requests remote notifications authorization for the application.
     * @param successCallback
     * @param errorCallback
     * @param types
     * @param omitRegistration
     */
    requestRemoteNotificationsAuthorization?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void,
        types?: string[],
        omitRegistration?: boolean
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized to use reminders.
     * @param successCallback
     * @param errorCallback
     */
    isRemindersAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Returns the reminders authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getRemindersAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Requests reminders authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestRemindersAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized for background refresh.
     * @param successCallback
     * @param errorCallback
     */
    isBackgroundRefreshAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Returns the background refresh authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getBackgroundRefreshStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Requests Bluetooth authorization for the application.
     * @param successCallback
     * @param errorCallback
     * @param permissions - ANDROID ONLY
     */
    requestBluetoothAuthorization?: (
        successCallback: () => void,
        errorCallback: (error: string) => void,
        permissions?: (string[])
    ) => void;

    /**
     * iOS ONLY
     * Checks if motion tracking is available on the current device.
     * @param successCallback
     * @param errorCallback
     */
    isMotionAvailable?: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if it's possible to determine the outcome of a motion authorization request on the current device.
     * @param successCallback
     * @param errorCallback
     */
    isMotionRequestOutcomeAvailable?: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Requests motion authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestMotionAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks motion authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getMotionAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized to use local network.
     * @param successCallback
     * @param errorCallback
     */
    isLocalNetworkAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void,
        options?: {
            timeoutMs?: number;
        }
    ) => void;

    /**
     * iOS ONLY
     * Returns the local network authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getLocalNetworkAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        options?: {
            timeoutMs?: number;
        }
    ) => void;

    /**
     * iOS ONLY
     * Requests local network authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestLocalNetworkAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;
}

interface CordovaPlugins {
    diagnostic: Diagnostic
}
