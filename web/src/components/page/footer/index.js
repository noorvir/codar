import React from 'react';
import Buttons from '../../buttons';
import Button from '../../button';
import Link from '../../link';
import Text from '../../text';

export default function Footer() {
	return (
		<footer class="footer has-background-white" style={{ maxHeight: 100 }}>
			<div class="content has-text-centered" >
				<Text>© {new Date().getFullYear()} codar </Text>
			</div>
		</footer>
	)
}