const functions = require('firebase-functions');
const encounters = require('../lib/encounters');

//1 month in seconds
const MAX_ENCOUNTER_AGE = 30 * 24 * 60 * 60 * 1000;

/**
 * Encounters that are older than 1 month can be deleted.
 */
module.exports = functions.region('europe-west1').pubsub.schedule('every 24 hours').onRun((context) => {
	return encounters.deleteOldEncounters(MAX_ENCOUNTER_AGE);
});