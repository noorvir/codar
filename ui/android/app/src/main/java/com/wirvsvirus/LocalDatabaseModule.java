// ToastModule.java

package com.wirvsvirus;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import org.covidwatch.android.data.ContactEvent;
import org.covidwatch.android.data.CovidWatchDatabase;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class LocalDatabaseModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    LocalDatabaseModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "LocalDatabase";
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
    public String[] getInteractionList() {
        List<ContactEvent> contactEvents = CovidWatchDatabase.Companion.getInstance(reactContext).contactEventDAO().getAll();

        String[] interactionList = new String[contactEvents.size()];

        for (int i = 0; i < contactEvents.size(); i++) {
            interactionList[i] = contactEvents.get(i).getIdentifier();
        }

        return interactionList;
    }
}
