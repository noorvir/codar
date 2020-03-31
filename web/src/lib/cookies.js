// this file contains utility functions for cookies

/**
 * Creates a cookie but only if cookies are allowes.
 * @param {string} cookieTypes - The cookie types of the cookie to be set.
 * @param {string} cookieName - The cookies name.
 * @param {string} cookieValue - The cookies value.
 * @param {int} days - The number of days for which this cookie shall be valid.
 */
function setCookie(cookieTypes, cookieName, cookieValue, days) {
	if (!cookiesAllowed(cookieTypes)) return;

	_setCookie(cookieName, cookieValue, days);
}

// creates a cookie of the name cookieName and with the value cookieValue.
// the cookie will expire in days days.
function _setCookie(cookieName, cookieValue, days) {
	var d = new Date();
	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

	var expires = 'expires=' + d.toUTCString();

	document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

/**
 * Gets a cookie or if it does not exist returns its deufault value.
 * @param {string} cookieName - The cookies name.
 * @param {string} defaultValue - The default value.
 */
function getCookie(cookieName, defaultValue) {
	var name = cookieName + "=";
	var cookies = document.cookie.split(';');
	var cookiesFiltered = cookies.filter(cookie => cookie.trim().indexOf(name) === 0);
	var cookieValue = defaultValue;

	if (cookiesFiltered.length > 0) {
		var firstCookie = cookiesFiltered[0].trim();
		cookieValue = firstCookie.substring(name.length, firstCookie.length);
	}

	return cookieValue;
}

/** 
 * Check if cookied in the cookieTypes array are allowed.
 */
function cookiesAllowed(cookieTypes) {
	var allowedCookies = JSON.parse(getCookie('_allowed_cookies', '{}'));

	return cookieTypes.every(cookieType => Boolean(allowedCookies[cookieType]));
}

/** 
 * Allow cookies. 
 * pass oprion
 */
function allowCookies(allowedCookies) {
	_setCookie('_allowed_cookies', JSON.stringify(allowedCookies), 365);
}

var cookieutils = {
	set: setCookie,
	get: getCookie,
	allowed: cookiesAllowed,
	allow: allowCookies,

	COOKIE_CONSENT: "_allowed_cookies"
};

export default cookieutils;