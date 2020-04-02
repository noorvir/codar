import { HTTP_API } from '../constants/urls';
import { NativeModules } from 'react-native';
const { LocalDatabaseModule } = NativeModules;

const REPORT_TYPES = [
  "SYMPTOMS_TESTED_POSITIVE",
  "SYMPTOMS_TESTED_NEGATIVE",
  "SYMPTOMS_NOT_TESTED",
];

function lookup(pids) {
  return fetch(
    `${HTTP_API}/encounters?pids=${pids.join(",")}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer L8WDxw/TzbRFah0Jy6yQiaEj+tFfz14wtE9R+AecEKY=`
      },
    }
  ).then(res => res.json()).then(({ encounters }) => encounters);
}

function uploadEncounters(encounters) {
  return fetch(
    `${HTTP_API}/encounters`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer L8WDxw/TzbRFah0Jy6yQiaEj+tFfz14wtE9R+AecEKY=`
      },
      body: JSON.stringify({ encounters }),
    }
  );
}

/**
 * Check for matching encounters in the database.
 * Returns a promise that resolves into all matching encounters.
 */
export function checkPublicEncounters() {
  return getLocalEncounters()
    // TODO: rename uuid to pid
    .then(encounters => encounters.map(encounter => encounter.ownUuid))
    .then(lookup);
}

/**
 * Publish locally stored encounters to the backend.
 * TODO: Encounters that are older than 1 month should not be published.
 */
export function publish(reportType) {

  return LocalDatabaseModule.getEncounters().then(JSON.parse)
    .then(encounters => encounters.map(encounter => {
      if(!REPORT_TYPES.includes(reportType)) {
        return Promise.reject(new Error(`Invalid reportType: ${reportType}`));
      }

      return {
        pid: encounter.uuid,
        minDistance: encounter.distance,
        duration: encounter.duration,
        timestamp: encounter.timestamp,
        reportType,
      }
    }))
    .then(uploadEncounters);
}

export function getLocalEncounters() {
	return LocalDatabaseModule.getEncounters().then(JSON.parse)
}