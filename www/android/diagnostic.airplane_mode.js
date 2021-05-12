/* globals cordova, require, exports, module */

/**
 *  Diagnostic Airplane mode plugin for Android
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic_Airplane_Mode = (function(){
    /***********************
     *
     * Internal properties
     *
     *********************/
    var Diagnostic_Airplane_Mode = {};

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
     * Checks if airplane mode is 'on' on device.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if airplane mode is 'on'
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic_Airplane_Mode.isAirplaneModeOn = function(successCallback, errorCallback) {
        return cordova.exec(Diagnostic._ensureBoolean(successCallback),
            errorCallback,
            'Diagnostic_Airplane_Mode',
            'isAirplaneModeOn',
            []);
    };

    return Diagnostic_Airplane_Mode;
});
module.exports = new Diagnostic_Airplane_Mode();
