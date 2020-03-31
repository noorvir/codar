import React from 'react';
import Buttons from '../../buttons';
import Button from '../../button';
import Link from '../../link';
import Text from '../../text';

export default function Footer() {
	return (
		<footer class="footer has-background-white-bis" style={{ maxHeight: 100 }}>
			<div class="content has-text-centered" >
				<Text>© {new Date().getFullYear()} codar </Text>
				<Buttons style={{ justifyContent: 'center' }}>
					<Button Component={Link} text to='/contact'>
						Contact
					</Button>
					<Button Component={Link} text to='/faqs'>
						FAQs
					</Button>
				</Buttons>
			</div>
		</footer>
	)
}