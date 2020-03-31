const admin = require('./admin');
const config = require('./config');

// eslint-disable-next-line
exports.validateApiKey = function (req, res, next) {
	var apiKey;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		apiKey = req.headers.authorization.split('Bearer ')[1];
	}

	if (apiKey === config.mobileApiKey) {
		return next();
	}

	res.status(403).send('Unauthorized');
};
