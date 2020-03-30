package com.wirvsvirus;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import org.jetbrains.annotations.NotNull;

@Entity(tableName = "encounters")
class Encounter {
     public Encounter(String uuid) {
         this.uuid = uuid;
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
