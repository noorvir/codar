import React from 'react';
import Link from '../../link';
import Text from "../../text";

function toggleBurgerMenu() {
	let burgerIcon = document.getElementById('burger');
	let dropMenu = document.getElementById('menu');
	burgerIcon.classList.toggle('is-active');
	dropMenu.classList.toggle('is-active');
}

function LanguageDropdown() {

	return (
		<div className="dropdown is-hoverable navbar-item">
			<div className="dropdown-trigger">
				<button
					className="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
					style={{borderWidth: '0px'}}>

							<span className="icon is-small">
        						<i className="fas fa-angle-down" aria-hidden="true"></i>
     						</span>
				</button>
			</div>
			<div className="dropdown-menu" id="dropdown-menu" role="menu">
				<div className="dropdown-content">
					<a href="#" className="dropdown-item">
						EN
					</a>
				</div>
				<div className="dropdown-content">
					<a href="#" className="dropdown-item">
						DE
					</a>
				</div>
			</div>
		</div>
	)
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
					<Text h6>Contact</Text>
				</a>

				<a className='navbar-item' href='/#faq' onClick={toggleBurgerMenu}>
					<Text h6>FAQ</Text>
				</a>

				<LanguageDropdown/>

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
