const functions = require('firebase-functions');
const config = functions.config();

exports.mobileApiKey = config.secrets.mobile_apikey;