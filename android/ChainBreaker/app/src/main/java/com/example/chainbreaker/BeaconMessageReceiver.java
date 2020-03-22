package com.example.chainbreaker;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.messages.Message;
import com.google.android.gms.nearby.messages.MessageListener;

public class BeaconMessageReceiver extends BroadcastReceiver {
    private static final String TAG = BeaconMessageReceiver.class.getName();

    @Override
    public void onReceive(final Context context, Intent intent) {
        Nearby.getMessagesClient(context).handleIntent(intent, new MessageListener() {
            @Override
            public void onFound(Message message) {
                Log.i(TAG, "Found message via PendingIntent: " + message);
                NotificationCompat.Builder builder = new NotificationCompat.Builder(context, MainActivity.CHANNEL_ID)
                        .setSmallIcon(R.drawable.common_google_signin_btn_icon_dark)
                        .setContentTitle("YO")
                        .setContentText("Got a YO")
                        .setPriority(NotificationCompat.PRIORITY_DEFAULT);

            }

            @Override
            public void onLost(Message message) {
                Log.i(TAG, "Lost message via PendingIntent: " + message);
            }
        });
    }
}