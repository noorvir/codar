package com.example.chainbreaker;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.connection.Payload;
import com.google.android.gms.nearby.messages.Message;
import com.google.android.gms.nearby.messages.MessageListener;
import com.google.android.gms.nearby.messages.Strategy;
import com.google.android.gms.nearby.messages.SubscribeOptions;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = AppCompatActivity.class.getName();
    public static final String CHANNEL_ID = "yo";

    MessageListener mMessageListener;
    Message mActiveMessage;
    Message mMessage = new Message("Hello World".getBytes());

    TextView mText;

    int peerCounter = 0;
    private Intent mServiceIntent;

    private void publish(String message) {
        Log.i(TAG, "Publishing message: " + message);
        mActiveMessage = new Message(message.getBytes());
        Payload bytesPayload = Payload.fromBytes(new byte[] {0xa, 0xb, 0xc, 0xd});

        Nearby.getMessagesClient(this).publish(mActiveMessage);
    }


    private void updateText() {
        mText.setText(Integer.toString(peerCounter));
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.channel_name);
            String description = getString(R.string.channel_description);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mText = (TextView) findViewById(R.id.mainText);
        updateText();

        createNotificationChannel();

        mServiceIntent = new Intent(this, BeaconService.class);
        ContextCompat.startForegroundService(this, mServiceIntent);
//
//        final Context context = getApplicationContext();
//        mMessageListener = new MessageListener() {
//            @Override
//            public void onFound(Message message) {
//                peerCounter++;
//                updateText();
//                Toast.makeText(context, "Found message: " + new String(message.getContent()), Toast.LENGTH_SHORT).show();
//
//                Log.d(TAG, "Found message: " + new String(message.getContent()));
//            }
//
//            @Override
//            public void onLost(Message message) {
//                Log.d(TAG, "Lost sight of message: " + new String(message.getContent()));
//            }
//        };

//        publish("YO");

    }
    @Override
    public void onStart() {
        super.onStart();
//        backgroundSubscribe();
//        Nearby.getMessagesClient(this).publish(mMessage);
//        Nearby.getMessagesClient(this).subscribe(mMessageListener);
    }

    @Override
    public void onStop() {
//        Nearby.getMessagesClient(this).unpublish(mMessage);
//        Nearby.getMessagesClient(this).unsubscribe(mMessageListener);

        super.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ServiceConnection mConnection = new ServiceConnection() {
            BeaconService customService = null;
            @Override
            public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
                customService = ((BeaconService) iBinder);
                customService.stopForeground(true);
                // now you have the instance of service.
            }

            @Override
            public void onServiceDisconnected(ComponentName componentName) {
                customService = null;
            }
        };
    }

    // Subscribe to messages in the background.
    private void backgroundSubscribe() {
        Log.i(TAG, "Subscribing for background updates.");
        SubscribeOptions options = new SubscribeOptions.Builder()
                .setStrategy(Strategy.BLE_ONLY)
                .build();
        Nearby.getMessagesClient(this).subscribe(getPendingIntent(), options);
    }

    private PendingIntent getPendingIntent() {
        return PendingIntent.getBroadcast(this, 0, new Intent(this, BeaconMessageReceiver.class),
                PendingIntent.FLAG_UPDATE_CURRENT);
    }
//
//    protected List<ReactPackage> getPackages() {
//        @SuppressWarnings("UnnecessaryLocalVariable")
//        List<ReactPackage> packages = new ReactPackage.PackageList(this).getPackages();
//        // Packages that cannot be autolinked yet can be added manually here, for example:
//        // packages.add(new MyReactNativePackage());
//        packages.add(new CustomToastPackage()); // <-- Add this line with your package name.
//        return packages;
//    }
}
