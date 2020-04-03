import React, { useState } from 'react';
import Button from '../../button';
import Text from '../../text';
import { sendContactRequest } from '../../../lib/contact';

export default function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [text, setText] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	function reset() {
		setName("");
		setEmail("");
		setText("");
		setLoading(false);
	}

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onEmailChange(event) {
		setEmail(event.target.value);
	}

	function onTextChange(event) {
		setText(event.target.value);
	}

	function onSubmit() {
		setLoading(true);
		setSuccess(false);
		setError("");
		sendContactRequest(name, email, text)
			.then(() => {
				setSuccess(true);
				reset();
			})
			.catch(error => {
				setSuccess(false);
				setError(error.message);
				setLoading(false);
			});
	}

	return (
		<>
			<Text className={'is-header-title'} h3>Contact us</Text>
			<Text subtitle h4>If you have any question or inquiries you can send us a message and we will get back to you as soon as possible.</Text>
			<fieldset>

				<div class="field">
					<label class="label">Name</label>
					<div class="control">
						<input class="input" type="text" value={name} onChange={onNameChange} />
					</div>
				</div>

				<div class="field">
					<label class="label">Email</label>
					<div class="control">
						<input class="input" type="email" value={email} onChange={onEmailChange} />
					</div>
				</div>

				<div class="field">
					<label class="label">Your message</label>
					<div class="control">
						<textarea class="textarea" value={text} onChange={onTextChange} />
					</div>
				</div>

				<div class="field">
					<Button primary loading={loading} onClick={onSubmit}>
						Send message
					</Button>
				</div>

			</fieldset>
			<p className="help is-danger">{error}</p>
			{success && <p className="help is-success">We have received your message and will get back to you as soon as possible!</p>}
		</>
	);
}