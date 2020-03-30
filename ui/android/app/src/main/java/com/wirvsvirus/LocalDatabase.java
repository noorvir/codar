package com.wirvsvirus;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

@Database(entities = {Encounter.class}, version = 1)
public abstract class LocalDatabase extends RoomDatabase {
    private static volatile LocalDatabase INSTANCE;

    public abstract EncountersDao encountersDao();

    static LocalDatabase getDatabase(final Context context) {
        if (INSTANCE == null) {
            synchronized (LocalDatabase.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(context.getApplicationContext(),
                            LocalDatabase.class, "encounters")
                            .build();
                }
            }
        }
        return INSTANCE;
    }


}
