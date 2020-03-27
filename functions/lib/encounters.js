const admin = require('./admin');
const ENCOUNTERS_COLLECTION = 'encounters';
// TODO: set to correct length
const PID_LENGTH = 16

// checks if an encounter has the required fields
function validEncounter(encounter) {
	const encounterFields = {
		duration: (val) => typeof val === 'number',
		pid: (val) => typeof val === 'string' && val.length <= PID_LENGTH,
		min_distance: (val) => typeof val === 'number',
		timestamp: (val) => typeof val === 'number',
	};

	const encounterKeys = Object.keys(encounter);
	const filteredKeys = encounterKeys.filter(field => encounterFields[field](encounter[field]));
	return filteredKeys.length === encounterKeys.length;
}

function snapshotToData(snap) {
	return snap.docs.map(doc => doc.data())
}

function flatten(array) {
	return array.reduce((acc, val) => acc.concat(val), [])
}

/**
 * lookupN fetches all encouters that match one of the supplied pids.
 * 
 * TODO: set a limit to the number of supplied pids.
 */
exports.lookupN = function (pids) {
	const encounterQueries = pids.map(pid => exports.lookup(pid))
	return Promise.all(encounterQueries).then(flatten)
}

exports.lookup = function (pid) {
	return admin.firestore().collection(ENCOUNTERS_COLLECTION)
		.where('pid', '==', pid)
		.orderBy('timestamp')
		.get()
		.then(snapshotToData)
		.catch(error => {
			console.error("Error while lookingup encounter!", error);
			return new Error("Internal error");
		});
}

exports.store = function (encounters) {
	if (!encounters) {
		return Promise.reject(new Error("No encounters supplied"));
	}

	if (encounters.filter(validEncounter) < encounters.length) {
		return Promise.reject(new Error("Invalid encounter supplied"));
	}

	const batch = admin.firestore().batch();
	encounters.forEach(encounter => {
		batch.set(
			admin.firestore().collection(ENCOUNTERS_COLLECTION).doc(),
			encounter
		)
	});
	return batch.commit().catch(error => {
		console.error("Error while storing encounters!", error);
		return new Error("Internal error");
	})
}