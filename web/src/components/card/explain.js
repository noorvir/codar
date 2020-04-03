import React from 'react';
import Card, { CardImage, CardContent, CardFooter, CardFooterItem } from '.';
import Text from '../text';
// import Tag from '../tag';
import Link from '../link';

export default function ExplainCard({ title, subtitle, src, alt }) {
	return (
		<>
		<Card className="is-elevated-on-hover explain-card">
			<CardImage
				imgProps={{
					className: "has-background-white is-1by1",
					src, alt,
					style: { overflow: 'hidden', position: "relative" },
					imgStyle: { position: 'absolute', width: '100%', height: '100%'}
				}} />
		</Card>

		<div>
		</div>
		</>
			// <CardContent style={{ padding: '0.75rem' }}>
			// 	<Text h5>
			// 		{title}
			// 	</Text>
        	// 	<Text subtitle h6>
			// 		{subtitle}
			// 	</Text>
			// </CardContent>
	);
}