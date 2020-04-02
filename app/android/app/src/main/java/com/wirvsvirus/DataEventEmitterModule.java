package com.wirvsvirus;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class DataEventEmitterModule extends ReactContextBaseJavaModule {
    private boolean mBeaconServiceBound;

    private BeaconService mBeaconService;

    public DataEventEmitterModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        Intent intent = new Intent(getReactApplicationContext(), BeaconService.class);
        getReactApplicationContext().bindService(intent, connection, Context.BIND_AUTO_CREATE);
    }

    @Override
    public void invalidate() {
        // TODO check whether invalidate is the right callback
        super.invalidate();
        getReactApplicationContext().unbindService(connection);
        mBeaconServiceBound = false;
    }

    private void sendEvent(String eventName) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, "");
    }

    private ServiceConnection connection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName className,
                                       IBinder service) {
            BeaconService.LocalBinder binder = (BeaconService.LocalBinder) service;
            mBeaconService = binder.getService();
            mBeaconService.registerDataChangeCallback(new ChangeNotifyCallback() {
                public void onChange() {
                    sendEvent("newDataAvailable");
                }
            });
            mBeaconServiceBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName arg0) {
            mBeaconServiceBound = false;
        }
    };

    @NonNull
    @Override
    public String getName() {
        return "DataEventEmitterModule";
    }
}
