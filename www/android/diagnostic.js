/**
 *  Diagnostic plugin for Android
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
**/
var Diagnostic = function(){};

/**
 * Checks if location is enabled.
 * On Android, this returns true if Location mode is enabled and any mode is selected (e.g. Battery saving, Device only, High accuracy)
 * When location is enabled, the locations returned are dependent on the location mode:
 * Battery saving = network triangulation and Wifi network IDs (low accuracy)
 * Device only = GPS hardware only (high accuracy)
 * High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
 *
 * @param {Function} successCallback - The callback which will be called when diagnostic is successful. 
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isLocationEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
						errorCallback,
						'Diagnostic',
						'isLocationEnabled',
						[]);
};

/**
 * Checks if location mode is set to return high-accuracy locations from GPS hardware.
 * Returns true if Location mode is enabled and is set to either:
 * Device only = GPS hardware only (high accuracy)
 * High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
 *
 * @param {Function} successCallback -  The callback which will be called when diagnostic is successful.
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isGpsLocationEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
		errorCallback,
		'Diagnostic',
		'isGpsLocationEnabled',
		[]);
};

/**
 * Checks if location mode is set to return low-accuracy locations from network triangulation/WiFi access points.
 * Returns true if Location mode is enabled and is set to either:
 * Battery saving = network triangulation and Wifi network IDs (low accuracy)
 * High accuracy = GPS hardware, network triangulation and Wifi network IDs (high and low accuracy)
 *
 * @param {Function} successCallback -  The callback which will be called when diagnostic is successful.
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isNetworkLocationEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
		errorCallback,
		'Diagnostic',
		'isNetworkLocationEnabled',
		[]);
};

/**
 * Checks if Wifi is connected/enabled.
 * On Android this returns true if the WiFi setting is set to enabled.
 *
 * @param {Function} successCallback -  The callback which will be called when diagnostic is successful.
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isWifiEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
						errorCallback,
						'Diagnostic',
						'isWifiEnabled',
						[]);
};

/**
 * Checks if exists camera.
 *
 * @param {Function} successCallback -  The callback which will be called when diagnostic is successful.
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isCameraEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
						errorCallback,
						'Diagnostic',
						'isCameraEnabled',
						[]);
};

/**
 * Checks if Bluetooth is enabled
 *
 * @param {Function} successCallback -  The callback which will be called when diagnostic is successful.
 * This callback function is passed a single boolean parameter with the diagnostic result.
 * @param {Function} errorCallback -  The callback which will be called when diagnostic encounters an error.
 *  This callback function is passed a single string parameter containing the error message.
 */
Diagnostic.prototype.isBluetoothEnabled = function(successCallback, errorCallback) {
	return cordova.exec(successCallback,
		errorCallback,
		'Diagnostic',
		'isBluetoothEnabled',
		[]);
};

/**
 * Switches to the Location page in the Settings app
 */
Diagnostic.prototype.switchToLocationSettings = function() {
	return cordova.exec(null,
		null,
		'Diagnostic',
		'switchToLocationSettings',
		[]);
};

/**
 * Switches to the Mobile Data page in the Settings app
 */
Diagnostic.prototype.switchToMobileDataSettings = function() {
	return cordova.exec(null,
		null,
		'Diagnostic',
		'switchToMobileDataSettings',
		[]);
};

/**
 * Switches to the Bluetooth page in the Settings app
 */
Diagnostic.prototype.switchToBluetoothSettings = function() {
	return cordova.exec(null,
		null,
		'Diagnostic',
		'switchToBluetoothSettings',
		[]);
};

/**
 * Switches to the WiFi page in the Settings app
 */
Diagnostic.prototype.switchToWifiSettings = function() {
	return cordova.exec(null,
		null,
		'Diagnostic',
		'switchToWifiSettings',
		[]);
};

/**
 * Enables/disables WiFi on the device.
 *
 * @param {Function} successCallback - function to call on successful setting of WiFi state
 * @param {Function} errorCallback - function to call on failure to set WiFi state.
 * This callback function is passed a single string parameter containing the error message.
 * @param {Boolean} state - WiFi state to set: TRUE for enabled, FALSE for disabled.
 */
Diagnostic.prototype.setWifiState = function(successCallback, errorCallback, state) {
	return cordova.exec(successCallback,
		errorCallback,
		'Diagnostic',
		'setWifiState',
		[state]);
};

/**
 * Enables/disables Bluetooth on the device.
 *
 * @param {Function} successCallback - function to call on successful setting of Bluetooth state
 * @param {Function} errorCallback - function to call on failure to set Bluetooth state.
 * This callback function is passed a single string parameter containing the error message.
 * @param {Boolean} state - Bluetooth state to set: TRUE for enabled, FALSE for disabled.
 */
Diagnostic.prototype.setBluetoothState = function(successCallback, errorCallback, state) {
	return cordova.exec(successCallback,
		errorCallback,
		'Diagnostic',
		'setBluetoothState',
		[state]);
};

module.exports = new Diagnostic();

