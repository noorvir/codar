const archiver = require('archiver');
const admin = require('./admin');
const ENCOUNTERS_EXPORT_COLLECTION = "encounters_exports";
const ENCOUNTERS_COLLECTION = "encounters";
const ENCOUNTERS_BUCKET = "chainbreaker-public";

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

function fetchUnexported() {
	return admin.firestore().collection(ENCOUNTERS_COLLECTION)
		.where("exported", "==", false).get();
}

function createExportRef(fileName, downloadLink) {
	return admin.firestore().collection(ENCOUNTERS_EXPORT_COLLECTION).add({
		fileName,
		downloadLink,
		timestamp: Date.now(),
	});
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

/**
 * lookup fetches all encouters with the supplied pid.
 */
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

/**
 * store stores the supplied encouters in firestore.
 * 
 * TODO: limit the number of encounters per call
 */
exports.store = function (encounters) {
	if (!encounters) {
		return Promise.reject(new Error("No encounters supplied"));
	}

	if (encounters.filter(validEncounter) < encounters.length) {
		return Promise.reject(new Error("Invalid encounter supplied"));
	}

	const batch = admin.firestore().batch();
	encounters.forEach(encounter => {
		// mark new encounters as not exported
		encounter.exported = false;
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

/**
 * deleteOldEncounters deletes all encounters that are older than `age` in seconds
 */
exports.deleteOldEncounters = function (age) {
	return admin.firestore().collection(ENCOUNTERS_COLLECTION)
		.where("timestamp", "<", Date.now() - age)
		.then((querySnapshot) => {
			var batch = db.batch();

			querySnapshot.forEach((doc) => {
				batch.delete(doc.ref);
			});

			return batch.commit();
		});
}

/**
 * export exports all unexported encounters to a new file on google cloud storage.
 * 
 * WARNING: Depending on how many unexported encounters exist this function may run out of memory assuming it is run in a FaaS env.
 */
exports.export = function () {
	// use firestore api to generate a random id.
	const randomId = admin.firestore().collection(ENCOUNTERS_EXPORT_COLLECTION).doc().id;
	const fileName = `encounters_${randomId}.zip`;
	const batch = admin.firestore().batch();
	const fileRef = admin.storage().bucket(ENCOUNTERS_BUCKET).file(fileName);
	const archiveStream = fileRef.createWriteStream({ contentType: 'application/zip' });
	const archive = archiver('zip');

	return fetchUnexported().then(snapshot => {
		const encounters = snapshotToData(snapshot);
		if (encounters.length === 0) {
			return Promise.reject(new Error("There are no unexported encounters!"));
		}

		snapshot.docs.forEach(doc => batch.update(doc.ref, { exported: true }));
		archive.pipe(archiveStream);
		archive.append(JSON.stringify({ encounters }), { name: `encounters.json` });

		return Promise.all([archive.finalize(), archiveStream]);
	}).then(([_, archiveStream]) => Promise.all([
		// finish uploading zip to storage
		new Promise((resolve, reject) =>
			archiveStream.on('finish', resolve).on('error', reject)),
		// mark encounter references as exported
		batch.commit(),
	])).then(() => createExportRef(
		fileName,
		`https://firebasestorage.googleapis.com/v0/b/${ENCOUNTERS_BUCKET}/o/${encodeURIComponent(fileName)}?alt=media`
	));
}

exports.fetchExportReferences = function (startAfter) {
	return admin.firestore().collection(ENCOUNTERS_EXPORT_COLLECTION)
		.orderBy("timestamp", "asc")
		.startAfter(startAfter)
		.get().then(snapshotToData);
}