const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const admin = require('../lib/admin');

const { validateEmail } = require('../lib/email');
const { storeContactRequest } = require('../lib/contact');

// https api
const api = express();
api.use(cors({ origin: true }));

api.post('/contact', (req, resp) => {
	const { name, email, text } = req.body;

	if (!name.trim()) {
		resp.status(400).send("You have to enter your name!");
		return;
	}

	if (!text.trim()) {
		resp.status(400).send("The message can not be empty!");
		return;
	}

	if (!validateEmail(email)) {
		resp.status(400).send("Please enter a valid email address.");
		return;
	}

	storeContactRequest({ name, email, text })
		.then(() => resp.status(200).send())
		.catch(error => {
			console.error(error);
			resp.status(500).send("An error occured please try again later.");
		});
});

module.exports = functions.region('europe-west1').https.onRequest(api);