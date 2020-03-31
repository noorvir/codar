import React from 'react';
import Text from '../text';

export function FaqSection({ children }) {
	return (
		<div className="faq-section">
			{children}
		</div>
	)
}

export function Question({ children }) {
	return (
		<Text h4>{children}</Text>
	)
}

export function Answer({ children }) {
	return (
		<Text className="faq-answer" subtitle h6>{children}</Text>
	)
}