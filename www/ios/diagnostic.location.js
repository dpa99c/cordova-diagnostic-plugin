/* globals cordova, require, exports, module */

/**
 *  Diagnostic Location plugin for iOS
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

    /*****************************
     *
     * Protected member functions
     *
     ****************************/
    Diagnostic_Location._onLocationStateChange = function(){};
    Diagnostic_Location._onLocationAccuracyAuthorizationChange = function(){};


    /**********************
     *
     * Public API functions
     *
     **********************/

    /**
     * Checks if location is available for use by the app.
     * On iOS this returns true if both the device setting for Location Services is ON AND the application is authorized to use location.
     * When location is enabled, the locations returned are by a mixture GPS hardware, network triangulation and Wifi network IDs.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if location is available for use.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
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
     * Returns true if Location Services is enabled.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if Location Services is enabled.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isLocationEnabled = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isLocationEnabled',
            []);
    };


    /**
     * Checks if the application is authorized to use location.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if application is authorized to use location either "when in use" (only in foreground) OR "always" (foreground and background).
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.isLocationAuthorized = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Location',
            'isLocationAuthorized',
            []);
    };

    /**
     * Returns the location authorization status for the application.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the location authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     * Possible values are:
     * `cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED`
     * `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED`
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE`
     * Note that `GRANTED` indicates the app is always granted permission (even when in background).
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.getLocationAuthorizationStatus = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Location',
            'getLocationAuthorizationStatus',
            []);
    };

    /**
     * Returns the location accuracy authorization for the application.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the location accuracy authorization as a constant in `cordova.plugins.diagnostic.locationAccuracyAuthorization`.
     * Possible values are:
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED`
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.getLocationAccuracyAuthorization = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Location',
            'getLocationAccuracyAuthorization',
            []);
    };

    /**
     * Requests location authorization for the application.
     * Authorization can be requested to use location either "when in use" (only in foreground) or "always" (foreground and background).
     * Should only be called if authorization status is NOT_REQUESTED. Calling it when in any other state will have no effect.
     *
     * @param {Function} successCallback - Invoked in response to the user's choice in the permission dialog.
     * It is passed a single string parameter which defines the resulting authorisation status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     * Possible values are:
     * `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED`
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE`
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     * @param {String} mode - (optional) location authorization mode as a constant in `cordova.plugins.diagnostic.locationAuthorizationMode`.
     * If not specified, defaults to `cordova.plugins.diagnostic.locationAuthorizationMode.WHEN_IN_USE`.
     */
    Diagnostic_Location.requestLocationAuthorization = function(successCallback, errorCallback, mode) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Location',
            'requestLocationAuthorization',
            [mode && mode === Diagnostic_Location.locationAuthorizationMode.ALWAYS]);
    };

    /**
     * Requests temporary access to full location accuracy for the application.
     * By default on iOS 14+, when a user grants location permission, the app can only receive reduced accuracy locations.
     * If your app requires full (high-accuracy GPS) locations (e.g. a SatNav app), you need to call this method.
     * Should only be called if location authorization has been granted.
     *
     * @param {String} purpose - (required) corresponds to a key in the NSLocationTemporaryUsageDescriptionDictionary entry in your app's `*-Info.plist`
     * which contains a message explaining the user why your app needs their exact location.
     * This will be presented to the user via permission dialog in which they can either accept or reject the request.
     * @param {Function} successCallback - (optional) Invoked in response to the user's choice in the permission dialog.
     * It is passed a single string parameter which defines the resulting accuracy authorization as a constant in `cordova.plugins.diagnostic.locationAccuracyAuthorization`.
     * Possible values are:
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.FULL`
     * `cordova.plugins.diagnostic.locationAccuracyAuthorization.REDUCED`
     * @param {Function} errorCallback -  (optional) The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Location.requestTemporaryFullAccuracyAuthorization = function(purpose, successCallback, errorCallback) {
        if(typeof purpose !== "string"){
            var errMessage = "'purpose' must be specified";
            if(errorCallback){
                return errorCallback(errMessage);
            }
            throw errMessage;
        }
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Location',
            'requestTemporaryFullAccuracyAuthorization',
            [purpose]);
    };

    /**
     * Registers a function to be called when a change in Location state occurs.
     * On iOS, this occurs when location authorization status is changed.
     * This can be triggered either by the user's response to a location permission authorization dialog,
     * by the user turning on/off Location Services,
     * or by the user changing the Location authorization state specifically for your app.
     * Pass in a falsey value to de-register the currently registered function.
     *
     * @param {Function} successCallback -  The callback which will be called when the Location state changes.
     * This callback function is passed a single string parameter indicating the new location authorisation status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     */
    Diagnostic_Location.registerLocationStateChangeHandler = function(successCallback) {
        Diagnostic_Location._onLocationStateChange = successCallback || function(){};
    };

    /**
     * Registers a function to be called when a change in location accuracy authorization occurs.
     * This occurs when location accuracy authorization is changed.
     * This can be triggered either by the user's response to a location accuracy authorization dialog,
     * or by the user changing the location accuracy authorization specifically for your app in Settings.
     * Pass in a falsey value to de-register the currently registered function.
     *
     * @param {Function} successCallback -  The callback which will be called when the location accuracy authorization changes.
     * This callback function is passed a single string parameter indicating the new location accuracy authorization as a constant in `cordova.plugins.diagnostic.locationAccuracyAuthorization`.
     */
    Diagnostic_Location.registerLocationAccuracyAuthorizationChangeHandler = function(successCallback) {
        Diagnostic_Location._onLocationAccuracyAuthorizationChange = successCallback || function(){};
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
