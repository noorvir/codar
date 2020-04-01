import React from 'react';
import Image from '../image';

export default function Card({ children, className }) {
	return (
		<div className={`card ${className}`}>
			{children}
		</div>
	);
}

export function CardImage({ children, imgProps, ...props }) {
	return (
		<div className="card-image" {...props}>
			<Image  {...imgProps} />
		</div>
	);
}

export function CardContent({ children, ...props }) {
	return (
		<div className="card-content" {...props}>
			{children}
		</div>
	);
}

export function CardFooter({ children }) {
	return (
		<footer className="card-footer">
			{children}
		</footer>
	);
}

export function CardFooterItem({ children, Component = "a", className, ...props }) {
	return (
		React.createElement(Component, {
			className: ["card-footer-item", className].join(" "),
			...props,
		}, children)
	);
}