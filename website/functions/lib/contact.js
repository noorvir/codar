const admin = require('./admin');

exports.storeContactRequest = function (contactRequest) {
	return admin.firestore().collection('contact-requests').add(contactRequest);
}