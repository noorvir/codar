import React, { createContext, useEffect, useState } from 'react';
import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage, DeviceEventEmitter } from 'react-native';
import { checkPublicEncounters, getLocalEncounters } from '../lib/encounters';

const STORAGE_KEY_ENCOUNTERS_CACHE = "encounters_cache"
const STORAGE_FETCH_INTERVAL = 5000; // 5 sec.

export const EncounterContext = createContext([]);

export default function EncounterFetcher({ children }) {
  const [mounted, setMounted] = useState(false);
  // any local encounters
  const [encounters, setEncounters] = useState([]);
  // any potentially infectious encounters (symptoms not tested)
  const [potInfectiousEncounters, setPotInfectiousEncounters] = useState([]);
  // any infectious encounters (symptoms tested positive)
  const [infectiousEncounters, setInfectiousEncounters] = useState([]);

  async function backgroundFetcher(taskId) {
    populateCache()
      .then(() => BackgroundFetch.finish(taskId))
      .catch(error => {
        console.log(error);
        BackgroundFetch.finish(taskId);
      });
  }

  function populateCache() {
    console.log("[populateCache]");
    return checkPublicEncounters()
      .then(storeInfectiousEncounters);
  }

  function forceRefresh() {
    console.log("[forceRefresh]");
    return populateCache().then(foregroundCacheFetch);
  }

  function foregroundCacheFetch() {
    console.log("[foregroundCacheFetch]");
    function filterPotInfectious(encounter) {
      return encounter.reportType === "SYMPTOMS_NOT_TESTED";
    }

    function filterInfectious(encounter) {
      return encounter.reportType === "SYMPTOMS_TESTED_POSITIVE";
    }

    return Promise.all([
      getLocalEncounters().then(encounters => {
        // encounters from the local db have different field names
        setEncounters(encounters);
      }),
      AsyncStorage.getItem(STORAGE_KEY_ENCOUNTERS_CACHE).then((value) => {
        if (value) {
          const encounters = JSON.parse(value);
          console.log(encounters)
          setPotInfectiousEncounters(encounters.filter(filterPotInfectious));
          setInfectiousEncounters(encounters.filter(filterInfectious));
        }
      })
    ]);
  }


  useEffect(() => {
    if (!mounted) {
      // register background task
      BackgroundFetch.configure({
        minimumFetchInterval: 15,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      }, backgroundFetcher);
      // populate state with from cache and local db then do a refresh.
      foregroundCacheFetch().then(forceRefresh);
      setMounted(true);
    }

    const intervalId = setInterval(foregroundCacheFetch, STORAGE_FETCH_INTERVAL);

    DeviceEventEmitter.addListener(
      'newDataAvailable',
      (event) => foregroundCacheFetch()
    );

    return () => {
      clearInterval(intervalId);
      DeviceEventEmitter.removeListener(
        'newDataAvailable',
        (event) => foregroundCacheFetch()
      );

    };
  });

  return (
    <EncounterContext.Provider
      value={{ localEncounters: encounters, potentiallyInfectiousEncounters: potInfectiousEncounters, infectiousEncounters, forceRefresh }}>
      {children}
    </EncounterContext.Provider>
  );
}

function storeInfectiousEncounters(encounters) {
  return AsyncStorage.setItem(STORAGE_KEY_ENCOUNTERS_CACHE, JSON.stringify(encounters));
}