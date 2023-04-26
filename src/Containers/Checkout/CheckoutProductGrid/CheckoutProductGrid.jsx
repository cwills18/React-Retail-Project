import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../Contexts/UserProvider";
import { getUserCartItems } from "../../../Services/userInformation";
import styles from "./CheckoutProductGrid.module.scss";
import CheckoutCardHolder from "../CheckoutCardHolder/CheckoutCardHolder";
import CheckoutSummaryContainer from "../CheckoutSummaryContainer/CheckoutSummaryContainer";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";

const CheckoutProductGrid = () => {
	const { user } = useContext(UserContext);
	const { cartProducts, setCartProducts } = useContext(ShoppingCartContext);
	// const [sendToCartItems, setSendToCartItems]

	console.log("the cart products are: ", cartProducts);
	//on mount, make sure that local cart matches cart in database
	useEffect(() => {
		const wrapper = async () => {
			const cart = await getUserCartItems(user);
			setCartProducts(cart);
		};
		wrapper();
	}, []);

	useEffect(() => {}, [cartProducts]);

	return (
		<div className={styles.CheckoutProducts}>
			<h1 className={styles.Header}>In Cart</h1>
			<div className={styles.CheckoutProductGrid}>
				{cartProducts.length < 1 && <p className={styles.NothingInCart}>Nothing in cart.</p>}
				{cartProducts &&
					cartProducts.map((item) => {
						return <CheckoutCardHolder key={`${item.id} ${item.size}`} product={item} />;
					})}
				{cartProducts.length > 0 && <CheckoutSummaryContainer />}
			</div>
		</div>
	);
};

export default CheckoutProductGrid;
