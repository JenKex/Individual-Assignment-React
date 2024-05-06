import { Link, NavLink, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useStore } from '../data/store.js'
import { getToyList} from '../data/crud.js'
import './root.css'
import LogoPC from '../assets/logo pc.png'
import ShoppingCart from '../assets/shopping-cart-34.png'

const Root = () => {

	const { setToyList } = useStore((state) => ({
        setToyList: state.setToyList
	} ))
	
	const handleGetToyList = async () => {
        setToyList(await getToyList())
    }

	useEffect(() => {
        handleGetToyList()}, [])


	return (
		<div className="app">

			<header>
				<div className="header-row">
					<NavLink className="landing-link" to="/">
						<img className="logga-pc" src={LogoPC} />
					</NavLink>
					<NavLink className="shopping-cart-link" to="/Kundvagn">
						<img className="shopping-cart" src={ShoppingCart} />
					</NavLink>
				</div>
			</header>

			<main>
				<Outlet />
			</main>

			<footer className="footer-row">
				<NavLink to="/Logga-in">Logga in</NavLink>
			</footer>

		</div>
	);
}

export default Root