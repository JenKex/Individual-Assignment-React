import { Link, NavLink, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import './root.css'

const Root = () => {

	return (
		<div className="app">

			<header>
				<div className="header-row">
					<NavLink to="/">Startsida</NavLink>
					<NavLink to="/Kundvagn">Kundvagn</NavLink>
					<NavLink to="/Logga-in">Logga in</NavLink>
					<NavLink to="/Administration">Administration</NavLink>
				</div>
			</header>

			<main>
				<Outlet />
			</main>

		<footer className="footer-row">
			
		</footer>

		</div>
	);
}

export default Root