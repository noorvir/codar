import React from 'react';

export default function Spinner({ small, medium, large }) {
	let cssClasses = ["icon"];
	let iconCssClasses = ["fas", "fa-spinner"];

	if (small) {
		cssClasses.push("is-small");
	}

	if (medium) {
		cssClasses.push("is-medium");
		iconCssClasses.push("fa-lg");
	}

	if (large) {
		cssClasses.push("is-large");
		iconCssClasses.push("fa-2x");
	}

	if (cssClasses.length > 2) {
		throw new Error("Spinner component can only have one size: small, medium or large.")
	}

	return (
		<span className={cssClasses.join(" ")} style={{ animation: "spinAround 500ms infinite linear" }}>
			<i className={iconCssClasses.join(" ")} />
		</span>
	)
}