import React from 'react';

export default function Hero({ children, size, color, style, className }) {
	let cssClasses = ["hero"];

	if (size) {
		cssClasses.push(`is-${size}`);
	}

	if (color) {
		cssClasses.push(`has-background-${color}`);
	}

	if (className) {
		cssClasses.push(className);
	}

	return (
		<section className={cssClasses.join(" ")} style={style}>
			{children}
		</section>
	);
}

export function HeroBody({ children, style }) {
	return (
		<div className="hero-body" style={style}>
			{children}
		</div>
	);
}

export function HeroFooter({ children }) {
	return (
		<footer className="hero-foot">
			{children}
		</footer>
	);
}