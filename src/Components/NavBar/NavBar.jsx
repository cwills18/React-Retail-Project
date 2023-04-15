import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.scss";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartProvider";

const NavBar = () => {
	const { cartCount } = useContext(ShoppingCartContext);

	useEffect(() => {}, [cartCount]);

	return (
		<div className={styles.NavHolder}>
			{/* This is what will be returned for a mobile nav (using media queries in scss) */}
			<div></div>
			{/* This is what will be returned for a desktop nav (using media queries in scss) */}
			<div className={styles.DesktopNav}>
				<div className={styles.DesktopNav_Tabs}>
					<NavLink to={"/"}>
						<img className={styles.DesktopNav_Tabs_Img} src="src/assets/sillySocksLogo.png" />
					</NavLink>
					<NavLink to={"/shop"} className={styles.DesktopNav_Tabs_TextLink}>
						SHOP
					</NavLink>
				</div>
				<div className={styles.DesktopNav_SearchContainer}>
					<SearchBar className={styles.DesktopNav_SearchContainer_SearchBar} />
				</div>
				<NavLink to="/checkout">
					<div className={styles.DesktopNav_CartContainer}>
						{cartCount > 0 && <div className={styles.DesktopNav_CartContainer_Num}>{cartCount}</div>}
						<img className={styles.DesktopNav_CartContainer_Img} src="src/assets/shoppingcart.png" />
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default NavBar;
