const functions = require('firebase-functions');
const { sendInviteEmail } = require('../lib/invites');

module.exports = functions.region('europe-west1').firestore.document(
	'invite-requests/{requestId}').onUpdate((change, context) => {
	if (!change.before.data().invite && change.after.data().invite) {
		// send invite email
		return sendInviteEmail(change.after);
	}

	// ignore updates where the invite field already was set to true
	return Promise.resolve();
});