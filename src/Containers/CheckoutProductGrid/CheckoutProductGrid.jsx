import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Contexts/UserProvider";
import CheckoutProductCard from "../../Components/CheckoutProductCard/CheckoutProductCard";
import { getUserCartItems } from "../../Services/userInformation";
import styles from "./CheckoutProductGrid.module.scss";
import CheckoutCardHolder from "../CheckoutCardHolder/CheckoutCardHolder";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
import CheckoutSummaryContainer from "../CheckoutSummaryContainer/CheckoutSummaryContainer";

const CheckoutProductGrid = () => {
	const { user } = useContext(UserContext);
	const [checkoutItems, setCheckoutItems] = useState([]);
	useEffect(() => {
		const wrapper = async () => {
			const cart = await getUserCartItems(user);
			setCheckoutItems(cart);
		};
		wrapper();
	}, []);
	useEffect(() => {}, [checkoutItems]);

	return (
		<div className={styles.CheckoutProducts}>
			<h1 className={styles.Header}>In Cart</h1>
			<div className={styles.CheckoutProductGrid}>
				{checkoutItems &&
					checkoutItems.map((item) => {
						return <CheckoutCardHolder key={`${item.id} ${item.size}`} product={item} />;
					})}
				{checkoutItems.length < 1 && <p className={styles.NothingInCart}>Nothing in cart.</p>}
				{checkoutItems.length > 0 && <CheckoutSummaryContainer />}
			</div>
		</div>
	);
};

export default CheckoutProductGrid;
