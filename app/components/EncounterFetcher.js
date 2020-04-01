import React, { createContext, useEffect, useState } from 'react';
import BackgroundFetch from "react-native-background-fetch";
import { AsyncStorage } from 'react-native';
import { checkPublicEncounters, getLocalEncounters } from '../lib/encounters';

const STORAGE_KEY_ENCOUNTERS = "local_encounters";
const STORAGE_KEY_POT_INFECTIOUS = "pot_infectious_encounters";
const STORAGE_KEY_INFECTIOUS = "infectious_encounters";
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

  useEffect(() => {
    if (!mounted) {
      BackgroundFetch.configure({
        minimumFetchInterval: 15,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      }, async (taskId) => {

        Promise.all([
          getLocalEncounters()
            .then(storeLocalEncounters),
          checkPublicEncounters()
            .then(storeInfectiousEncounters),
        ]).then(() => BackgroundFetch.finish(taskId))
          .catch(error => {
            console.log(error);
            BackgroundFetch.finish(taskId);
          });
      });
    }

    const intervalId = setInterval(() => {
      AsyncStorage.multiGet([
        STORAGE_KEY_ENCOUNTERS,
        STORAGE_KEY_INFECTIOUS,
        STORAGE_KEY_POT_INFECTIOUS
      ]).then((stores) => {
        const [[_, _encounters], [__, _infectiousEncounters], [___, _potInfectiousEncounters]] = stores;
        console.log({ stores });
        setEncounters(JSON.parse(_encounters || "[]"));
        setPotInfectiousEncounters(JSON.parse(_potInfectiousEncounters || "[]"));
        setInfectiousEncounters(JSON.parse(_infectiousEncounters || "[]"));
      })
    }, STORAGE_FETCH_INTERVAL);

    setMounted(true);
    return () => clearInterval(intervalId);
  });

  return (
    <EncounterContext.Provider
      value={[encounters, potInfectiousEncounters, infectiousEncounters]}>
      {children}
    </EncounterContext.Provider>
  );
}

function storeLocalEncounters(encounters) {
  return AsyncStorage.setItem(STORAGE_KEY_ENCOUNTERS, JSON.stringify(encounters));
}


function storeInfectiousEncounters(encounters) {
  function filterPotInfectious(encounter) {
    return encounter.reportType === "SYMPTOMS_NOT_TESTED";
  }

  function filterInfectious(encounter) {
    return encounter.reportType === "SYMPTOMS_TESTED_POSITIVE";
  }

  return AsyncStorage.multiSet([
    [STORAGE_KEY_POT_INFECTIOUS, JSON.stringify(encounters.filter(filterPotInfectious))],
    [STORAGE_KEY_INFECTIOUS, JSON.stringify(encounters.filter(filterInfectious))],
  ]);
}