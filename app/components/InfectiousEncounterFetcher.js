import React, { createContext, useEffect, useState } from 'react';
import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage } from 'react-native';
import { checkPublicEncounters } from '../lib/encounters';

const STORAGE_KEY = "infectious_encounters";
const STORAGE_FETCH_INTERVAL = 5000; // 5 sec.

export const InfectiousEncounterContext = createContext([]);

/**
 * InfectiousEncounterContext provider.
 * 
 * Usage:
 *  <InfectiousEncounterFetcher>
 *    <ComponentThatUsesThe_InfectiousEncounterContext />
 *  </InfectiousEncounterFetcher>
 */
export default function InfectiousEncounterFetcher({ children }) {
  const [mounted, setMounted] = useState(false);
  const [encounters, setEncounters] = useState([]);

  useEffect(() => {
    if (!mounted) {
      // register background task that fetches infectious matching encounters 
      // writes results to AsyncStorage with key: STORAGE_KEY
      // TODO: send push notifications
      BackgroundFetch.configure({
        minimumFetchInterval: 15,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      }, async (taskId) => {
        checkPublicEncounters()
          .then(encounters => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ encounters })))
          .then(() => BackgroundFetch.finish(taskId))
          .catch(error => {
            console.log(error);
            BackgroundFetch.finish(taskId);
          });
      });
    }

    // Updates the `encounters` state every `STORAGE_FETCH_INTERVAL` interval.
    const intervalId = setInterval(() => {
      AsyncStorage.getItem(STORAGE_KEY).then(value => {
        if (value) {
          setEncounters(JSON.parse(value).encounters);
        }
      })
    }, STORAGE_FETCH_INTERVAL);

    setMounted(true);
    return () => clearInterval(intervalId);
  });

  return (
    <InfectiousEncounterContext.Provider value={encounters}>
      {children}
    </InfectiousEncounterContext.Provider>
  );
}

