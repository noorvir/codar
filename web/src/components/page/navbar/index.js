import React from 'react';
import Link from '../../link';
import Text from "../../text";

function toggleBurgerMenu() {
	let burgerIcon = document.getElementById('burger');
	let dropMenu = document.getElementById('menu');
	burgerIcon.classList.toggle('is-active');
	dropMenu.classList.toggle('is-active');
}

function NavbarBrand(props) {
	return (
		<div className="navbar-brand">
			<Link className="navbar-item" to='/'>
				<img
					className="navbar-logo"
					alt='codar logo'
					src="/images/codar-text.svg" />
			</Link>

			<span className="navbar-burger burger" id='burger' onClick={toggleBurgerMenu}>
				<span></span>
				<span></span>
				<span></span>
			</span>
		</div>
	);
}


function NavbarMenu({ signedIn, signOut, ...props }) {
	return (
		<div className="navbar-menu" id='menu'>
			<div className="navbar-end">

				<a className='navbar-item' href='/#contact' onClick={toggleBurgerMenu}>
					<Text h5>Contact</Text>
				</a>

				<a className='navbar-item' href='/#faq' onClick={toggleBurgerMenu}>
					<Text h5>FAQ</Text>
				</a>

			</div>
		</div >
	);
}


function Navbar({ signedIn, signIn, signOut }) {
	return (
		<nav id="navbar"
			role="navigation" aria-label="main navigation"
			className="navbar is-white is-shadowless is-fixed-top">
			<div className="container">
				<NavbarBrand />
				<NavbarMenu />
			</div>
		</nav>
	);
}

export default Navbar;
