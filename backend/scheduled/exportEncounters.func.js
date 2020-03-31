const functions = require('firebase-functions');
const encounters = require('../lib/encounters');

/**
 * Export all public encounters to cloud storage.
 * This serves as a public db of all encounters and enables people to search for matching encounters
 * themselves if they dont trust us.
 */
module.exports = functions.region('europe-west1').pubsub.schedule('every 24 hours').onRun((context) => {
	return encounters.export().catch(error => {
		console.log(error.message);
	});
});