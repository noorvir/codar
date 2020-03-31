import { HTTP_API } from '../constants/urls';
import { NativeModules } from 'react-native';
const { LocalDatabaseModule } = NativeModules;

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
  return LocalDatabaseModule.getEncounters().then(JSON.parse)
    // TODO: rename uuid to pid
    .then(encounters => encounters.map(encounter => encounter.uuid))
    .then(lookup);
}

/**
 * Publish locally stored encounters to the backend.
 * TODO: Encounters that are older than 1 month should not be published.
 */
export function publish() {
  LocalDatabaseModule.getEncounters().then(JSON.parse)
    .then(encounters => encounters.map(encounter => {
      return {
        pid: encounter.uuid,
        minDistance: encounter.distance,
        duration: encounter.duration,
        timestamp: Number(new Date(encounter.timestamp)),
      }
    }))
    .then(uploadEncounters);
}