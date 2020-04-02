package com.wirvsvirus;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.location.LocationManager;
import android.os.Binder;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.os.Process;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.messages.Message;
import com.google.android.gms.nearby.messages.MessageListener;
import com.google.android.gms.nearby.messages.Strategy;
import com.google.android.gms.nearby.messages.SubscribeOptions;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.util.Random;

interface ChangeNotifyCallback {
    void onChange();
}


public class BeaconService extends Service {
    private static final String CHANNEL_ID = "yo";
    private static final int ONGOING_NOTIFICATION_ID = 1;
    private static final String TAG = "BeaconService";
    private Looper serviceLooper;
    private ServiceHandler serviceHandler;
    private MessageListener mMessageListener;

    private final IBinder binder = new LocalBinder();

    Message mBroadcastMessage;
    LocalDatabase db;

    private Notification notification;
    private ChangeNotifyCallback mCallback;
    private String ownUUID;  // TODO regenerate new UUID after contact circle feature is implemented

    public void registerDataChangeCallback(ChangeNotifyCallback callback) {
        mCallback = callback;
    }

    public class LocalBinder extends Binder {
        BeaconService getService() {
            return BeaconService.this;
        }
    }

    // Handler that receives messages from the thread
    private final class ServiceHandler extends Handler {
        public ServiceHandler(Looper looper) {
            super(looper);
        }

//        @Override
//        public void handleMessage(Message msg) {
//            // Normally we would do some work here, like download a file.
//            // For our sample, we just sleep for 5 seconds.
//            try {
//                Thread.sleep(5000);
//            } catch (InterruptedException e) {
//                // Restore interrupt status.
//                Thread.currentThread().interrupt();
//            }
//            // Stop the service using the startId, so that we don't stop
//            // the service in the middle of handling another job
//            stopSelf(msg.arg1);
//        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onCreate() {

        db = LocalDatabase.getDatabase(getApplicationContext());
        ownUUID = getOrCreateOwnUUID();
        mBroadcastMessage = new Message(ownUUID.getBytes());

       db.getTransactionExecutor().execute(() -> {
           db.encountersDao().insertAll(dummyElement, dummyElement2);
       });
        // Start up the thread running the service. Note that we create a
        // separate thread because the service normally runs in the process's
        // main thread, which we don't want to block. We also make it
        // background priority so CPU-intensive work doesn't disrupt our UI.
        HandlerThread thread = new HandlerThread("ServiceStartArguments",
                Process.THREAD_PRIORITY_BACKGROUND);
        thread.start();

        // Get the HandlerThread's Looper and use it for our Handler
        serviceLooper = thread.getLooper();
        serviceHandler = new ServiceHandler(serviceLooper);

        final Notification notification = notificationFactory("yo");

        final Service service = this;
        mMessageListener = new MessageListener() {
            @Override
            public void onFound(Message message) {
//               notification.contentIntent.cancel();
                String encounterUuid = new String(message.getContent());
                Log.d(TAG, "Found message: " + encounterUuid);
                writeEncounter(encounterUuid);

                if (isLocationEnabled()) {
                    updateWithCurrentLocation(encounterUuid);
                }

                Toast.makeText(service, "Found message: " + new String(message.getContent()), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onLost(Message message) {
                Log.d(TAG, "Lost sight of message: " + new String(message.getContent()));
            }
        };

        Log.i(TAG, "Subscribing.");
        
        SubscribeOptions options = new SubscribeOptions.Builder()
                .setStrategy(Strategy.BLE_ONLY)
                .build();

        Nearby.getMessagesClient(this).subscribe(mMessageListener, options);

        Nearby.getMessagesClient(this).publish(mBroadcastMessage);

        startForeground(ONGOING_NOTIFICATION_ID, notification);
    }

    private String getOrCreateOwnUUID() {
        SharedPreferences sharedPref = getApplicationContext().getSharedPreferences(
                getString(R.string.preference_file_key), Context.MODE_PRIVATE);

        String ownUUID = sharedPref.getString(getString(R.string.ownUuidKey), "");

        if (ownUUID.length() == 0) {
            ownUUID = randomUUID();
            SharedPreferences.Editor editor = sharedPref.edit();
            editor.putString(getString(R.string.ownUuidKey), ownUUID);
            editor.apply();
        }
        return ownUUID;
    }

    public static String randomUUID() {
        Random generator = new Random();
        StringBuilder randomStringBuilder = new StringBuilder();
        int randomLength = generator.nextInt(128);
        char tempChar;
        for (int i = 0; i < randomLength; i++){
            tempChar = (char) (generator.nextInt(96) + 32);
            randomStringBuilder.append(tempChar);
        }
        return randomStringBuilder.toString();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private Notification notificationFactory(String msg) {
        Intent notificationIntent = new Intent(this, BeaconService.class);
        PendingIntent pendingIntent =
                PendingIntent.getActivity(this, 0, notificationIntent, 0);

        return new Notification.Builder(this, CHANNEL_ID)
                .setContentTitle("codar")
                .setContentText(msg)
                // .setSmallIcon(R.drawable.common_google_signin_btn_icon_dark)
                .setContentIntent(pendingIntent)
                .build();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show();

        // For each start request, send a message to start a job and deliver the
        // start ID so we know which request we're stopping when we finish the job
//        Message msg = serviceHandler.obtainMessage();
//        msg.arg1 = startId;
//        serviceHandler.sendMessage(msg);

        // If we get killed, after returning from here, restart
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public void onDestroy() {
        Toast.makeText(this, "service done", Toast.LENGTH_SHORT).show();
        stopForeground(STOP_FOREGROUND_REMOVE);
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private void writeEncounter(String uuid) {
        Encounter newElement = new Encounter(uuid, ownUUID);

        db.getTransactionExecutor().execute(() -> {
            db.encountersDao().insertAll(newElement);
        });
    }

    private boolean isLocationEnabled(){
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) || locationManager.isProviderEnabled(
                LocationManager.NETWORK_PROVIDER
        );
    }

    private void updateWithCurrentLocation(String uuid){
        LocationRequest mLocationRequest = new LocationRequest();
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setInterval(0);
        mLocationRequest.setFastestInterval(0);
        mLocationRequest.setNumUpdates(1);

        FusedLocationProviderClient mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        mFusedLocationClient.requestLocationUpdates(
                mLocationRequest, getLocationCallbackForUuid(uuid),
                serviceLooper
        );
    }

    private LocationCallback getLocationCallbackForUuid(String uuid) {
        return new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                Location mLastLocation = locationResult.getLastLocation();
                writeLocationToDatabase(uuid, mLastLocation);

            }
        };
    }

    private void writeLocationToDatabase(String uuid, Location mLastLocation) {
        db.getTransactionExecutor().execute(() -> {
            db.encountersDao().updateLocation(uuid, mLastLocation.getLatitude(), mLastLocation.getLatitude());
        });
        notifyAppIfRunning();
    }

    private void notifyAppIfRunning() {
        if (mCallback != null && binder.isBinderAlive()) {
            mCallback.onChange();
        }
    }

}
