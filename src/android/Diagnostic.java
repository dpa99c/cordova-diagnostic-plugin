/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package cordova.plugins;

        import java.util.TimeZone;

        import org.apache.cordova.CordovaWebView;
        import org.apache.cordova.CallbackContext;
        import org.apache.cordova.CordovaPlugin;
        import org.apache.cordova.LOG;
        import org.apache.cordova.CordovaInterface;
        import org.json.JSONArray;
        import org.json.JSONException;
        import org.json.JSONObject;

        import android.bluetooth.BluetoothAdapter;
        import android.util.Log;

        import android.content.BroadcastReceiver;
        import android.content.Context;
        import android.content.Intent;
        import android.content.IntentFilter;
        import android.content.pm.PackageManager;
        import android.provider.Settings;
        import android.location.LocationManager;
        import android.location.LocationListener;
        import android.net.wifi.WifiManager;

public class Diagnostic extends CordovaPlugin {
    public static final String TAG = "Diagnostic";

    /**
     * Constructor.
     */
    public Diagnostic() {
    }

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        JSONObject r = new JSONObject();

        try {
            if (action.equals("switchToLocationSettings")){
                switchToLocationSettings();
                callbackContext.success();
            } else if (action.equals("switchToMobileDataSettings")){
                switchToMobileDataSettings();
                callbackContext.success();
            } else if (action.equals("switchToBluetoothSettings")){
                switchToBluetoothSettings();
                callbackContext.success();
            } else if (action.equals("switchToWifiSettings")){
                switchToWifiSettings();
                callbackContext.success();
            } else if(action.equals("isLocationEnabled")) {
                callbackContext.success(isGpsLocationEnabled() || isNetworkLocationEnabled() ? 1 : 0);
            } else if(action.equals("isGpsLocationEnabled")) {
                callbackContext.success(isGpsLocationEnabled() ? 1 : 0);
            } else if(action.equals("isNetworkLocationEnabled")) {
                callbackContext.success(isNetworkLocationEnabled() ? 1 : 0);
            } else if(action.equals("isWifiEnabled")) {
                callbackContext.success(isWifiEnabled() ? 1 : 0);
            } else if(action.equals("isCameraEnabled")) {
                callbackContext.success(isCameraEnabled() ? 1 : 0);
            } else if(action.equals("isBluetoothEnabled")) {
                callbackContext.success(isBluetoothEnabled() ? 1 : 0);
            } else if(action.equals("setWifiState")) {
                setWifiState(args.getBoolean(0));
                callbackContext.success();
            } else if(action.equals("setBluetoothState")) {
                setBluetoothState(args.getBoolean(0));
                callbackContext.success();
            } else {
                String msg = "Invalid action";
                Log.e(TAG, msg);
                callbackContext.error(msg);
                return false;
            }
        }catch(Exception e ) {
            String msg = e.getMessage();
            Log.e(TAG, "Exception occurred: ".concat(msg));
            callbackContext.error(msg);
            return false;
        }
        return true;
    }


    public boolean isGpsLocationEnabled() {
        boolean result = isLocationProviderEnabled(LocationManager.GPS_PROVIDER);
        Log.d(TAG, "GPS enabled: " + result);
        return result;
    }

    public boolean isNetworkLocationEnabled() {
        boolean result = isLocationProviderEnabled(LocationManager.NETWORK_PROVIDER);
        Log.d(TAG, "Network enabled: " + result);
        return result;
    }

    public boolean isWifiEnabled() {
        WifiManager wifiManager = (WifiManager) this.cordova.getActivity().getSystemService(Context.WIFI_SERVICE);
        boolean result = wifiManager.isWifiEnabled();
        return result;
    }

    public boolean isCameraEnabled() {
        PackageManager pm = this.cordova.getActivity().getPackageManager();
        boolean result = pm.hasSystemFeature(PackageManager.FEATURE_CAMERA);
        return result;
    }

    public boolean isBluetoothEnabled() {
        BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        boolean result = mBluetoothAdapter != null && mBluetoothAdapter.isEnabled();
        return result;
    }

    private boolean isLocationProviderEnabled(String provider) {
        LocationManager locationManager = (LocationManager) this.cordova.getActivity().getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(provider);
    }

    public void switchToLocationSettings() {
        Log.d(TAG, "Switch to Location Settings");
        Intent settingsIntent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
        cordova.getActivity().startActivity(settingsIntent);
    }

    public void switchToMobileDataSettings() {
        Log.d(TAG, "Switch to Mobile Data Settings");
        Intent settingsIntent = new Intent(Settings.ACTION_DATA_ROAMING_SETTINGS);
        cordova.getActivity().startActivity(settingsIntent);
    }

    public void switchToBluetoothSettings() {
        Log.d(TAG, "Switch to Bluetooth Settings");
        Intent settingsIntent = new Intent(Settings.ACTION_BLUETOOTH_SETTINGS);
        cordova.getActivity().startActivity(settingsIntent);
    }

    public void switchToWifiSettings() {
        Log.d(TAG, "Switch to Wifi Settings");
        Intent settingsIntent = new Intent(Settings.ACTION_WIFI_SETTINGS);
        cordova.getActivity().startActivity(settingsIntent);
    }

    public void setWifiState(boolean enable) {
        WifiManager wifiManager = (WifiManager) this.cordova.getActivity().getSystemService(Context.WIFI_SERVICE);
        if (enable == true && !wifiManager.isWifiEnabled()) {
            wifiManager.setWifiEnabled(true);
        } else if (enable == false && wifiManager.isWifiEnabled()) {
            wifiManager.setWifiEnabled(false);
        }
    }

    public static boolean setBluetoothState(boolean enable) {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        boolean isEnabled = bluetoothAdapter.isEnabled();
        if (enable && !isEnabled) {
            return bluetoothAdapter.enable();
        }
        else if(!enable && isEnabled) {
            return bluetoothAdapter.disable();
        }
        return true;
    }

}

