import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";
import { getTotalCartSum } from "../../../Services/cartHandling";
import { UserContext } from "../../../Contexts/UserProvider";
import CheckoutSummary from "../../../Components/Checkout/CheckoutSummary/CheckoutSummary";

const CheckoutSummaryContainer = () => {
	const { totalCartCount, priceSubtotal, setPriceSubtotal, totalSavings } = useContext(ShoppingCartContext);
	const { user } = useContext(UserContext);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		const getDatabaseSubtotal = async () => {
			const sub = await getTotalCartSum(user);
			if (sub !== priceSubtotal) {
				setPriceSubtotal(sub);
			}
		};
		getDatabaseSubtotal();
	}, []);

	useEffect(() => {
		setTotal(priceSubtotal - totalSavings + 9.95);
	}, [priceSubtotal, totalSavings, totalCartCount]);

	return <CheckoutSummary itemCount={totalCartCount} subtotal={priceSubtotal} savings={totalSavings} total={total} />;
};

export default CheckoutSummaryContainer;
