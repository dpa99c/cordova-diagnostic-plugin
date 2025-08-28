/* globals cordova, require, exports, module */

/**
 *  Diagnostic Location plugin for Android
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic_Location = (function(){
    /***********************
     *
     * Internal properties
     *
     *********************/
    var Diagnostic_Location = {};

    var Diagnostic = require("cordova.plugins.diagnostic.Diagnostic");

    /********************
     *
     * Public properties
     *
     ********************/

    Diagnostic.locationMode = Diagnostic_Location.locationMode = {
        "HIGH_ACCURACY": "high_accuracy",
        "DEVICE_ONLY": "device_only",
        "BATTERY_SAVING": "battery_saving",
        "LOCATION_OFF": "location_off"
    };


    Diagnostic.locationAuthorizationMode = Diagnostic_Location.locationAuthorizationMode = {
        "ALWAYS": "always",
        "WHEN_IN_USE": "when_in_use"
    };

    Diagnostic.locationAccuracyAuthorization = Diagnostic_Location.locationAccuracyAuthorization = {
        "FULL": "full",
        "REDUCED": "reduced"
    };

    /********************
     *
     * Internal functions
     *
     ********************/

    function combineLocationStatuses(statuses){
        var coarseStatus = statuses[Diagnostic.permission.ACCESS_COARSE_LOCATION],
            fineStatus = statuses[Diagnostic.permission.ACCESS_FINE_LOCATION],
            backgroundStatus = typeof statuses[Diagnostic.permission.ACCESS_BACKGROUND_LOCATION] !== "undefined" ? statuses[Diagnostic.permission.ACCESS_BACKGROUND_LOCATION] : true;

        var status = cordova.plugins.diagnostic._combinePermissionStatuses([coarseStatus, fineStatus]);
        if(status === Diagnostic.permissionStatus.GRANTED && backgroundStatus !== Diagnostic.permissionStatus.GRANTED){
            status = Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE;
        }

        return status;
    }

    /*****************************
     *
     * Protected member functions
     *
     ****************************/
    // Placeholder listener
    Diagnostic_Location._onLocationStateChange = function(){};

    /**********************
     *
     * Public API functions
     *
     **********************/

    /**
     * Checks if location is available for use by the app.
     * On Android, this returns true if Location Mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
     * AND if the app is authorised to use location.
     *
     * @param {Function} successCallback - The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if location is available for use.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isLocationAvailable = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isLocationAvailable',
            []);
    };

    /**
     * Checks if the device location setting is enabled.
     * On Android, this returns true if Location Mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
     *
     * @param {Function} successCallback - The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if location setting is enabled.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isLocationEnabled = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isLocationEnabled',
            []);
    };

    /**
     * Checks if high-accuracy locations are available to the app from GPS hardware.
     * Returns true if Location mode is enabled and is set to "Device only" or "High accuracy"
     * AND if the app is authorised to use location.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if high-accuracy GPS-based location is available.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isGpsLocationAvailable = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isGpsLocationAvailable',
            []);
    };

    /**
     * Checks if the device location setting is set to return high-accuracy locations from GPS hardware.
     * Returns true if Location mode is enabled and is set to either:
     * Device only = GPS hardware only (high accuracy)
     * High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if device setting is set to return high-accuracy GPS-based location.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isGpsLocationEnabled = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isGpsLocationEnabled',
            []);
    };

    /**
     * Checks if low-accuracy locations are available to the app from network triangulation/WiFi access points.
     * Returns true if Location mode is enabled and is set to "Battery saving" or "High accuracy"
     * AND if the app is authorised to use location.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if low-accuracy network-based location is available.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isNetworkLocationAvailable = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isNetworkLocationAvailable',
            []);
    };

    /**
     * Checks if the device location setting is set to return low-accuracy locations from network triangulation/WiFi access points.
     * Returns true if Location mode is enabled and is set to either:
     * Battery saving = network triangulation and Wifi network IDs (low accuracy)
     * High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if device setting is set to return low-accuracy network-based location.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isNetworkLocationEnabled = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isNetworkLocationEnabled',
            []);
    };

    /**
     * Returns the current location mode setting for the device.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.locationMode`.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.getLocationMode = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Location',
            'getLocationMode',
            []);
    };

    /**
     * Switches to the Location page in the Settings app
     */
    Diagnostic_Location.switchToLocationSettings = function() {
        return cordova.exec(null,
            null,
            'Diagnostic_Location',
            'switchToLocationSettings',
            []);
    };

    /**
     * Requests location authorization for the application.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will have no effect as the permissions are already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permissions.
     * This callback function is passed a single string parameter which defines the resulting authorisation status as a value in cordova.plugins.diagnostic.permissionStatus.
     * @param {Function} errorCallback - function to call on failure to request authorisation.
     * @param {String} mode - (optional) location authorization mode as a constant in `cordova.plugins.diagnostic.locationAuthorizationMode`.
     * If not specified, defaults to `cordova.plugins.diagnostic.locationAuthorizationMode.WHEN_IN_USE`.
     * @param {String} accuracy - (optional) requested location accuracy as a constant in in `cordova.plugins.diagnostic.locationAccuracyAuthorization`.
     * If not specified, defaults to `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`.
     */
    Diagnostic_Location.requestLocationAuthorization = function(successCallback, errorCallback, mode, accuracy){
        function onSuccess(statuses){
            successCallback(combineLocationStatuses(statuses));
        }
        return cordova.exec(
            onSuccess,
            errorCallback,
            'Diagnostic_Location',
            'requestLocationAuthorization',
            [mode === Diagnostic_Location.locationAuthorizationMode.ALWAYS, accuracy !== Diagnostic_Location.locationAccuracyAuthorization.REDUCED]
        );
    };

    /**
     * Returns the combined location authorization status for the application.
     * Combines FINE, COARSE and BACKGROUND statuses into a single status.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permissions status.
     * This callback function is passed a single string parameter which defines the current authorisation status as a value in cordova.plugins.diagnostic.permissionStatus.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_Location.getLocationAuthorizationStatus = function(successCallback, errorCallback){
        function onSuccess(statuses){
            successCallback(combineLocationStatuses(statuses));
        }
        Diagnostic_Location.getLocationAuthorizationStatuses(onSuccess, errorCallback);
    };

    /**
     * Returns the individual location authorization status for each type of location access (FINE, COARSE and BACKGROUND)
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return GRANTED status as permissions are already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permissions statuses.
     * This callback function is passed a single string parameter which defines the current authorisation status as a value in cordova.plugins.diagnostic.permissionStatus.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_Location.getLocationAuthorizationStatuses = function(successCallback, errorCallback){
        Diagnostic.getPermissionsAuthorizationStatus(successCallback, errorCallback, [
            Diagnostic.permission.ACCESS_COARSE_LOCATION,
            Diagnostic.permission.ACCESS_FINE_LOCATION,
            Diagnostic.permission.ACCESS_BACKGROUND_LOCATION
        ]);
    };

    /**
     * Checks if the application is authorized to use location.
     * Note: this is intended for Android 6 / API 23 and above. Calling on Android 5 / API 22 and below will always return TRUE as permissions are already granted at installation time.
     * @param {Function} successCallback - function to call on successful request for runtime permissions status.
     * This callback function is passed a single boolean parameter which is TRUE if the app currently has runtime authorisation to use location.
     * @param {Function} errorCallback - function to call on failure to request authorisation status.
     */
    Diagnostic_Location.isLocationAuthorized = function(successCallback, errorCallback){
        function onSuccess(status){
            successCallback(status === Diagnostic.permissionStatus.GRANTED || status === Diagnostic.permissionStatus.GRANTED_WHEN_IN_USE);
        }
        Diagnostic_Location.getLocationAuthorizationStatus(onSuccess, errorCallback);
    };

    /**
     * Registers a function to be called when a change in Location state occurs.
     * On Android, this occurs when the Location Mode is changed.
     * Pass in a falsey value to de-register the currently registered function.
     *
     * @param {Function} successCallback -  The callback which will be called when the Location state changes.
     * This callback function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.locationMode`.
     */
    Diagnostic_Location.registerLocationStateChangeHandler = function(successCallback) {
        Diagnostic_Location._onLocationStateChange = successCallback || function(){};
    };

    /**
     * Returns the location accuracy authorization for the application.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the location accuracy authorization as a constant in `cordova.plugins.diagnostic.locationAccuracyAuthorization`.
     * Possible values are:
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED`
     *  `false` if no location permission is granted.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.getLocationAccuracyAuthorization = function(successCallback, errorCallback) {
        Diagnostic.getPermissionsAuthorizationStatus(function(statuses){
            var coarseStatus = statuses[Diagnostic.permission.ACCESS_COARSE_LOCATION],
                fineStatus = statuses[Diagnostic.permission.ACCESS_FINE_LOCATION];

            if(fineStatus === Diagnostic.permissionStatus.GRANTED){
                successCallback(Diagnostic_Location.locationAccuracyAuthorization.FULL);
            }else if(coarseStatus === Diagnostic.permissionStatus.GRANTED){
                successCallback(Diagnostic_Location.locationAccuracyAuthorization.REDUCED);
            }else{
                successCallback(false);
            }
        }, errorCallback, [
            Diagnostic.permission.ACCESS_COARSE_LOCATION,
            Diagnostic.permission.ACCESS_FINE_LOCATION
        ]);
    };

    /**
     * Checks if compass is available on the device for use by the app.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if compass is available for use.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isCompassAvailable = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isCompassAvailable',
            []);
    };

    return Diagnostic_Location;
});
module.exports = new Diagnostic_Location();
