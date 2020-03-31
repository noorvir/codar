import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Faqs from './pages/faqs';
import Contact from './pages/contact';


function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/faqs" component={Faqs} />
				<Route path="/contact" component={Contact} />
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
