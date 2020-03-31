package com.wirvsvirus;
import android.widget.Toast;

import androidx.room.Room;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.google.gson.Gson;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class LocalDatabaseModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private LocalDatabase mDb;

    LocalDatabaseModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        mDb = LocalDatabase.getDatabase(context);
    }

    @Override
    public String getName() {
        return "LocalDatabaseModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map< String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        constants.put("passThisValueToJS", 10);
        return constants;
    }

    @ReactMethod
    public void getEncounters(Promise promise) {
        mDb.getQueryExecutor().execute(() -> {
            String result;
            Gson gson = new Gson();
            result = gson.toJson(mDb.encountersDao().getAll());
            promise.resolve(result);
        });
    }
}
