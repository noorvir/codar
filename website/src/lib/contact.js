

export function sendContactRequest(name, email, text) {
	return fetch(`${process.env.REACT_APP_HTTPS_FUNCTIONS_DOMAIN}/api/contact`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, text }),
	}).then(res => {
		if (!res.ok) {
			return res.text().then(text => Promise.reject(new Error(text)));
		}

		return res;
	});
}