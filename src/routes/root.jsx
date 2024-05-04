import { Link, NavLink, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import './root.css'
import LogoPC from '../assets/logo pc.png'
import ShoppingCart from '../assets/shopping-cart-34.png'

const Root = () => {

	return (
		<div className="app">

			<header>
				<div className="header-row">
					<NavLink to="/">
						<img className="logga-pc" src={LogoPC} />
					</NavLink>
					<NavLink to="/Kundvagn">
						<img className="shopping-cart" src={ShoppingCart} />
					</NavLink>
				</div>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className="footer-row">
				<NavLink to="/Logga-in">Logga in</NavLink>
				<NavLink to="/Administration">Administration</NavLink>
			</footer>

		</div>
	);
}

export default Root