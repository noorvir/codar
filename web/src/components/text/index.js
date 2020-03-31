import React from 'react';

export default function Text({
	children, subtitle, Component,
	className,
	...headerSizes
}) {
	let cssClasses = [];

	const truthyHeaderSizes = Object.values(headerSizes).filter(headerSize => headerSize).length;
	if (truthyHeaderSizes > 1) {
		throw new Error("Text component can't have more than 1 truthy header property. Choose one from h1-h6.")
	}

	if (truthyHeaderSizes === 1) {
		const headerSize = Object.keys(headerSizes).find(key => {
			if (headerSizes[key]) {
				return key;
			}

			return undefined;
		});

		cssClasses.push(subtitle ? "subtitle" : "title");
		cssClasses.push(`is-size-${headerSize[1]}`);
	}

	if (className) {
		cssClasses.push(className);
	}

	return React.createElement(Component || "p", {
		className: cssClasses.join(" "),
	}, children)
}