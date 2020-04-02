import React from 'react';

export default function Button({
	Component = "button",
	small, large,
	outlined, text,
	primary, info, success, danger, warning, dark,
	loading,
	children, ...props
}) {
	let cssClasses = ["button"];

	const appendClasses = (props) => {
		Object.keys(props).forEach((prop) => {
			if (props[prop]) {
				cssClasses.push(`is-${prop}`)
			}
		});
	}

	appendClasses({
		small, large,
		outlined, text,
		primary, info, success, danger, warning, dark,
		loading,
	});

	return React.createElement(Component, {
		className: cssClasses.join(" "), ...props
	}, children)
}