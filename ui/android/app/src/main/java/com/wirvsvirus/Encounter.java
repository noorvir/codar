package com.wirvsvirus;


import android.icu.text.SimpleDateFormat;
import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import org.jetbrains.annotations.NotNull;

import java.util.Date;


@Entity(tableName = "encounters")
class Encounter {
     @RequiresApi(api = Build.VERSION_CODES.N)
     public Encounter(String uuid) {
         this.uuid = uuid;
         SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy-hh-mm-ss");
         this.timestamp = simpleDateFormat.format(new Date());
     }

    @PrimaryKey @NotNull
    public String uuid;

    @ColumnInfo(name = "own_uuid")
    public String ownUuid;

    @ColumnInfo(name = "time_stamp")
    public String timestamp;

    @ColumnInfo(name = "duration")
    public int duration;

    @ColumnInfo(name = "distance")
    public int distance;

    @ColumnInfo(name = "location")
    public String location;
}
