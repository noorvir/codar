package com.example.chainbreaker;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.content.ContextCompat;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.toast.ToastModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.example.chainbreaker.MainActivity.CHANNEL_ID;

public class BeaconReactPackage implements ReactPackage {

    @Override
        public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
            return Collections.emptyList();
        }

        @Override
        public List<NativeModule> createNativeModules(
                ReactApplicationContext reactContext) {
            List<NativeModule> modules = new ArrayList<>();

            modules.add(new ToastModule(reactContext));

            return modules;
        }

        @Override
        public List<Class<? extends JavaScriptModule>> createJSModules() {
            return null;
        }
}

class BeaconReact extends ReactContextBaseJavaModule implements LifecycleEventListener {

    Context context;
    public BeaconReact(ReactApplicationContext reactContext) {
        super(reactContext);
        context = this.getReactApplicationContext().getApplicationContext();
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "ao";
    }

    @Override
    public void onHostResume() {

        createNotificationChannel();
        Intent mServiceIntent = new Intent(context, BeaconService.class);
        ContextCompat.startForegroundService(context, mServiceIntent);
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = context.getString(R.string.channel_name);
            String description = context.getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
//            NotificationManager notificationManager = getSystemService(NotificationManager.class);
//            notificationManager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}