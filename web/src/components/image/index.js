import React from 'react';

export default function Image({ src, alt, eager, className, style = {} }) {
	return (
		<figure className={`image ${className}`} style={style}>
			<img src={src} alt={alt} />
		</figure>
	)
}