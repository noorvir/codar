package com.wirvsvirus;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.os.Process;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.messages.Message;
import com.google.android.gms.nearby.messages.MessageListener;
import com.google.android.gms.nearby.messages.Strategy;
import com.google.android.gms.nearby.messages.SubscribeOptions;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

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

    Message mMessage = new Message("Hello World from Background Service asd".getBytes());
    LocalDatabase db;

    private Notification notification;
    private ChangeNotifyCallback mCallback;

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
       Encounter dummyElement = new Encounter("testpid1000");
       Encounter dummyElement2 = new Encounter("aasdsdunaosidnmaosind");

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
                Log.d(TAG, "Found message: " + new String(message.getContent()));
                writeEncounter(new String(message.getContent()));
                notifyAppIfRunning();

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

        Nearby.getMessagesClient(this).publish(mMessage);

        startForeground(ONGOING_NOTIFICATION_ID, notification);
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
        Encounter dummyElement = new Encounter(uuid);

        db.getTransactionExecutor().execute(() -> {
            db.encountersDao().insertAll(dummyElement);
        });
    }

    private void notifyAppIfRunning() {
        if (mCallback != null && binder.isBinderAlive()) {
            mCallback.onChange();
        }
    }
}
