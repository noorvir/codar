import React from 'react';
import Card, { CardImage, CardContent, CardFooter, CardFooterItem } from '.';
import Text from '../text';
// import Tag from '../tag';
import Link from '../link';
import Container from "../container";

export default function ExplainCard({ title, subtitle, src, alt }) {
	return (
		<div className="explain-container">
			<Card className="is-elevated-on-hover explain-card">
				<CardImage
					imgProps={{
						className: "has-background-white is-1by1",
						src, alt,
						style: { overflow: 'hidden', position: "relative" },
						imgStyle: { position: 'absolute', width: '100%', height: '100%'}
					}} />
			</Card>
			 <CardContent style={{ padding: '0.75rem' }}>
				<Text className="explain-title" h5>
					{title}
				</Text>
				<Text subtitle className="explain-text" h6>
					{subtitle}
				</Text>
			 </CardContent>
		</div>
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