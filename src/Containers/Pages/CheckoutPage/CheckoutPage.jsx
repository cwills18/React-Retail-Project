import React, { useEffect, useContext } from "react";
import NavBar from "../../../Components/Layout/NavBar/NavBar";
import Footer from "../../../Components/Layout/Footer/Footer";
import styles from "./CheckoutPage.module.scss";
import CheckoutProductGrid from "./../../Checkout/CheckoutProductGrid/CheckoutProductGrid";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";
import { getTotalItemsInCart } from "../../../Services/cartHandling";
import { UserContext } from "../../../Contexts/UserProvider";

const CheckoutPage = () => {
	const { setTotalCartCount } = useContext(ShoppingCartContext);
	const { user } = useContext(UserContext);
	useEffect(() => {
		const wrapper = async () => {
			const cartNum = await getTotalItemsInCart(user);
			setTotalCartCount(cartNum);
		};
		wrapper();
	}, []);
	return (
		<div className={styles.CheckoutPage}>
			<NavBar />
			<CheckoutProductGrid />
			<Footer />
		</div>
	);
};

export default CheckoutPage;
