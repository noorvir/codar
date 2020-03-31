import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from './navbar';
import withTracker from './withTracker';
import Footer from './footer';
import Container from "../container";

const Page = withRouter(withTracker(function ({ children, noNav, noFooter }) {
	return (
		<div>
			<Navbar/>
			{children}
			{!noFooter && <Footer />}
		</div>
	);
}));

export default Page;