const nodemailer = require('nodemailer');

// TODO: These smtp settings will need to be replaced. Currently no email will be delivered.
const mailTransport = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'howard24@ethereal.email',
		pass: 'jJRAdSyJNasKhtu3sn'
	},
});

exports.sendEmail = function (options) {
	return mailTransport.sendMail(options);
};


exports.validateEmail = function (email) {
	// eslint-disable-next-line
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
