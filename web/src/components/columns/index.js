import React from 'react';

export default function Columns({ className, children }) {
	let cssClasses = ["columns", className];

	return (
		<div className={cssClasses.join(" ")}>
			{children}
		</div>
	);
}

export function Column({ size, offset, className = "", children }) {
	let cssClasses = ["column"];

	if (size) {
		cssClasses.push(`is-${size}`);
	}

	if (offset) {
		cssClasses.push(`is-offset-${offset}`);
	}

	cssClasses.push(className);

	return (
		<div className={cssClasses.join(" ")}>
			{children}
		</div>
	);
}