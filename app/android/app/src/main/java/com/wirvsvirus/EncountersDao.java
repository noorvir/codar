package com.wirvsvirus;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface EncountersDao {
    @Query("SELECT * FROM encounters")
    List<Encounter> getAll();

    // TODO remove this for live use
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    void insertAll(Encounter... encounters);

    @Query("UPDATE encounters SET location_lat = :latitude, location_long = :longitude WHERE uuid =:uuid")
    void updateLocation(String uuid, double latitude, double longitude);
}
