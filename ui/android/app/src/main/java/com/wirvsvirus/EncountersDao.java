package com.wirvsvirus;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;

import java.util.List;

@Dao
public interface EncountersDao {
    @Query("SELECT * FROM encounters")
    List<Encounter> getAll();

    @Insert
    void insertAll(Encounter... encounters);
}
