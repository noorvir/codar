import React from 'react';

export default function Buttons({ children, style }) {
	return (
		<div className="buttons" style={style}>
			{children}
		</div>
	)
}