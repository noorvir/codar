const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const encounters = require('../lib/encounters');

const api = express();
api.use(cors);
api.use(express.json());


/**
 * GET /encounters/exports?startAfter=<timestamp>
 * 
 * Get all export references with timestamp greater than `startAfter`.
 */
api.get('/encounters/exports', (req, res) => {
	const { startAfter } = req.query;
	encounters.fetchExportReferences(Number(startAfter))
		.then(exportReferences => res.send({ exportReferences }))
		// TODO: better error handling
		.catch(error => res.status(500).send(error.message));
});

/**
 * GET /encounters?pids=<pid1>,<pid2>,...
 * 
 * Get all encounters that contain one of the supplied pids.
 */
api.get('/encounters', (req, res) => {

	const pids = (req.query.pids && req.query.pids.split(",")) || []
	console.log(`Encounter query for ${pids.length} pids`, { pids });
	encounters.lookupN(pids)
		.then(encounters => res.send({ encounters }))
		// TODO: better error handling
		.catch(error => res.status(500).send(error.message));
});

/**
 * POST /encounters
 * 
 * Upload encounters.
 * 
 * encounters: [{
 * 		pid: <string>, 
 * 		min_distance: <float>,
 * 		duration: <int>,
 * 		timestamp: <int>,
 * }, ...]
 */
api.post('/encounters', (req, res) => {
	encounters.store(req.body.encounters)
		.then(() => res.status(200).end())
		// TODO: better error handling
		.catch(error => res.status(500).send(error.message))
});

module.exports = functions.region('europe-west1').https.onRequest(api);
