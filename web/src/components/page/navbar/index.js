import React from 'react';
import Link from '../../link';

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
					src="/images/codar.svg"
					style={
						{
							WebkitFilter: 'grayscale(100%)',
							filter: 'grayscale(100%)'
						}
					} />
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

				{signedIn ?
					<>
						<span className='navbar-item'>
							<Link className="button is-text" onClick={toggleBurgerMenu}>
								Measurements
							</Link>
						</span>
						<span className='navbar-item'>
							<Link className="button is-text" onClick={toggleBurgerMenu}>
								Find my size
							</Link>
						</span>
						<span className='navbar-item'>
							<Link onClick={() => {
								signOut();
								toggleBurgerMenu();
							}}
								className="button is-text" to='/'>
								Sign out
							</Link>
						</span>
					</>
					:
					<>
						<span className='navbar-item'>
							<Link className="navbar-button" to='/contact' onClick={toggleBurgerMenu}>
								Contact us
							</Link>
						</span>

						<span className='navbar-item'>
							<Link className="navbar-button" to='/faqs' onClick={toggleBurgerMenu}>
								FAQ
							</Link>
						</span>
					</>
				}

			</div>
		</div >
	);
}


function Navbar({ signedIn, signIn, signOut }) {
	return (
		<nav id="navbar"
			role="navigation" aria-label="main navigation"
			className="navbar is-white">
			<div className="container">
				<NavbarBrand />
				<NavbarMenu/>
			</div>
		</nav>
	);
}

export default Navbar;
