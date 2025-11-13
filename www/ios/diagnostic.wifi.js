/* globals cordova, require, exports, module */

/**
 *  Diagnostic Wifi plugin for iOS
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic_Wifi = (function(){
    /***********************
     *
     * Internal properties
     *
     *********************/
    var Diagnostic_Wifi = {};

    var Diagnostic = require("cordova.plugins.diagnostic.Diagnostic");

    /********************
     *
     * Public properties
     *
     ********************/
    
    /********************
     *
     * Internal functions
     *
     ********************/
    function processLocalNetworkStatus(nativeStatus, successCallback) {
        let status;
        switch (nativeStatus) {
            case 1: // LocalNetworkPermissionStateGranted
                status = Diagnostic.permissionStatus.GRANTED;
                break;
            case -1: // LocalNetworkPermissionStateDenied
                status = Diagnostic.permissionStatus.DENIED_ALWAYS;
                break;
            case -2: // LocalNetworkPermissionStateIndeterminate
                status = Diagnostic.permissionStatus.UNKNOWN;
                break;
            case 0: // LocalNetworkPermissionStateUnknown
            default:
                status = Diagnostic.permissionStatus.NOT_REQUESTED;
                break;
        }
        successCallback(status);
    }

    function buildLocalNetworkArgs(options) {
        if (options && typeof options === "object" && options.timeoutMs != null) {
            var timeoutMs = Number(options.timeoutMs);
            if (isFinite(timeoutMs)) {
                return [{
                    timeoutMs: Math.max(0, timeoutMs)
                }];
            }
        }
        return [];
    }

    /*****************************
     *
     * Protected member functions
     *
     ****************************/


    /**********************
     *
     * Public API functions
     *
     **********************/

    /**
     * Checks if Wi-Fi is connected.
     * On iOS this returns true if the WiFi setting is set to enabled AND the device is connected to a network by WiFi.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if device is connected by WiFi.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Wifi.isWifiAvailable = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Wifi',
            'isWifiAvailable',
            []);
    };

    /**
     * Checks if Wifi is enabled.
     * On iOS this returns true if the WiFi setting is set to enabled (regardless of whether it's connected to a network).
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if WiFi is enabled.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Wifi.isWifiEnabled = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic_Wifi',
            'isWifiEnabled',
            []);
    };

    /**
     * Checks if the app is authorized to use Local Network.
     * On iOS 14+ this returns true if the user has authorized the app to access devices on the local network.
     * On iOS versions prior to 14, this always returns true as no authorization is required.
     *
     * @param {Function} successCallback -  The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if the app is authorized to use Local Network.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     * @param {Object} [options] - Optional timeout control object containing an optional `timeoutMs` number.
     */
    Diagnostic_Wifi.isLocalNetworkAuthorized = function(successCallback, errorCallback, options) {
        var args = buildLocalNetworkArgs(options);
        return cordova.exec(function(status) {
                var authorized = (status === 1); // LocalNetworkPermissionStateAuthorized
                successCallback(authorized);
            },
            errorCallback,
            'Diagnostic_Wifi',
            'getLocalNetworkAuthorizationStatus',
            args);
    };


    /**     
     * Returns the app's Local Network authorization status.
     * On iOS 14+ this returns one of the values in Diagnostic.permissionStatus: NOT_REQUESTED, GRANTED, DENIED_ALWAYS, UNKNOWN.
     * On iOS versions prior to 14, this always returns GRANTED as no authorization is required.
     *
     * @param {Function} successCallback -  The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which is one of the values in Diagnostic.permissionStatus:
     * NOT_REQUESTED, GRANTED, DENIED_ALWAYS, UNKNOWN.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     * @param {Object} [options] - Optional control over the timeout used when inferring the permission state.
     * Defaults to 2 seconds when omitted. Provide `{ timeoutMs: <number> }` to override the timeout in milliseconds.
     */
    Diagnostic_Wifi.getLocalNetworkAuthorizationStatus = function(successCallback, errorCallback, options) {
        var args = buildLocalNetworkArgs(options);
        return cordova.exec(function(nativeStatus) {
                processLocalNetworkStatus(nativeStatus, successCallback);
            },
            errorCallback,
            'Diagnostic_Wifi',
            'getLocalNetworkAuthorizationStatus',
            args);
    };

    /**
     * Requests the user to authorize the app to use Local Network.
     * On iOS 14+ this will prompt the user to authorize the app to access devices on the local network.
     * On iOS versions prior to 14, this does nothing as no authorization is required and will return success.
     *
     * @param {Function} successCallback -  The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which is one of the values in Diagnostic.permissionStatus:
     * NOT_REQUESTED, GRANTED, DENIED_ALWAYS, UNKNOWN.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Wifi.requestLocalNetworkAuthorization = function(successCallback, errorCallback) {
        return cordova.exec(function(nativeStatus) {
                processLocalNetworkStatus(nativeStatus, successCallback);
            },
            errorCallback,
            'Diagnostic_Wifi',
            'requestLocalNetworkAuthorization',
            []);
    };

    return Diagnostic_Wifi;
});
module.exports = new Diagnostic_Wifi();
