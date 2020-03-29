package org.covidwatch.android.ble

import android.app.*
import android.bluetooth.*
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.lifecycle.LifecycleService
import org.covidwatch.android.BleAdvertiserScanner
import org.covidwatch.android.MainActivity
import org.covidwatch.android.R
import org.covidwatch.android.data.ContactEvent
import org.covidwatch.android.data.ContactEventDAO
import org.covidwatch.android.data.CovidWatchDatabase
import org.covidwatch.android.utils.UUIDs
import java.util.*

class BLEForegroundService : LifecycleService() {

    // APP
    private var bleAdvertiserScanner = BleAdvertiserScanner
    private var timer: Timer? = null

    companion object {
        // CONSTANTS
        private const val CHANNEL_ID = "CovidBluetoothContactChannel"
        private const val CONTACT_EVENT_NUMBER_CHANGE_INTERVAL_MIN = 5
        private const val MS_TO_MIN = 60000
        private const val TAG = "BLEForegroundService"
    }

    override fun onCreate() {
        super.onCreate()
        if (BluetoothAdapter.getDefaultAdapter() == null) {
            val message = "This device has no bluetooth capabilities. Service is not doing anything"
            Toast.makeText(this, message, Toast.LENGTH_LONG).show()
            Log.w("BLFoergroundService", message)

            return
        }
        bleAdvertiserScanner.bleAdvertiser = BLEAdvertiser(this, BluetoothAdapter.getDefaultAdapter())
        bleAdvertiserScanner.bleScanner = BLEScanner(this, BluetoothAdapter.getDefaultAdapter())
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        super.onStartCommand(intent, flags, startId)

        createNotificationChannelIfNeeded()

        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT
        )
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("CovidWatch passively logging")
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentIntent(pendingIntent)
            .setCategory(Notification.CATEGORY_SERVICE)
            .build()
        startForeground(6, notification)

        // scheduler a new timer to start changing the contact event numbers
        timer?.cancel()
        timer = Timer()
        timer?.scheduleAtFixedRate(
            object : TimerTask() {
                override fun run() {
                    bleAdvertiserScanner?.bleAdvertiser?.changeContactEventIdentifier()
                }
            },
            MS_TO_MIN * CONTACT_EVENT_NUMBER_CHANGE_INTERVAL_MIN.toLong(),
            MS_TO_MIN * CONTACT_EVENT_NUMBER_CHANGE_INTERVAL_MIN.toLong()
        )

        val newContactEventUUID = UUID.randomUUID()
        CovidWatchDatabase.databaseWriteExecutor.execute {
            val dao: ContactEventDAO = CovidWatchDatabase.getInstance(this).contactEventDAO()
            val contactEvent = ContactEvent(newContactEventUUID.toString())
            val isCurrentUserSick = getSharedPreferences(
                getString(R.string.preference_file_key),
                Context.MODE_PRIVATE
            ).getBoolean(getString(R.string.preference_is_current_user_sick), false)
            contactEvent.wasPotentiallyInfectious = isCurrentUserSick
            dao.insert(contactEvent)
        }
        bleAdvertiserScanner?.bleAdvertiser?.startAdvertiser(UUIDs.CONTACT_EVENT_SERVICE, newContactEventUUID)
        bleAdvertiserScanner?.bleScanner?.startScanning(arrayOf<UUID>(UUIDs.CONTACT_EVENT_SERVICE))

        return START_STICKY
    }

    override fun onDestroy() {
        bleAdvertiserScanner?.bleAdvertiser?.stopAdvertiser()
        bleAdvertiserScanner?.bleScanner?.stopScanning()
        timer?.apply {
            cancel()
            purge()
        }
        super.onDestroy()
    }


    override fun onBind(intent: Intent): IBinder? {
        return super.onBind(intent)
    }

    /**
     * This notification channel is only required for android versions above
     * android O. This creates the necessary notification channel for the foregroundService
     * to function.
     */
    private fun createNotificationChannelIfNeeded() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Foreground Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(
                NotificationManager::class.java
            )
            manager.createNotificationChannel(serviceChannel)
        }
    }

}