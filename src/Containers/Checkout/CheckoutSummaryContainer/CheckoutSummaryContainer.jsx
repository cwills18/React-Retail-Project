import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";
import { calculateSavings, getTotalCartSum } from "../../../Services/cartHandling";
import { UserContext } from "../../../Contexts/UserProvider";
import CheckoutSummary from "../../../Components/Checkout/CheckoutSummary/CheckoutSummary";

const CheckoutSummaryContainer = () => {
	const { totalCartCount, priceSubtotal, setPriceSubtotal, totalSavings, setTotalSavings } = useContext(ShoppingCartContext);
	const { user } = useContext(UserContext);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		const getDatabaseSubtotal = async () => {
			const sub = await getTotalCartSum(user);
			if (sub !== priceSubtotal) {
				setPriceSubtotal(sub);
			}
		};
		const getDatabaseSavings = async () => {
			const savings = await calculateSavings(user);
			if (savings !== totalSavings) {
				setTotalSavings(savings);
			}
		};
		getDatabaseSubtotal();
		getDatabaseSavings();
	}, []);

	useEffect(() => {
		setTotal(priceSubtotal + 9.95);
	}, [priceSubtotal, totalCartCount]);

	// useEffect(() => {
	// 	// calculateSavings(user).then((savings) => setTotalSavings(savings));
	// 	const getDatabaseSavings = async () => {
	// 		const savings = await calculateSavings(user);
	// 		if (savings !== totalSavings) {
	// 			setTotalSavings(savings);
	// 		}
	// 	};
	// 	getDatabaseSavings();
	// }, [priceSubtotal, totalCartCount]);

	return <CheckoutSummary itemCount={totalCartCount} subtotal={priceSubtotal} savings={totalSavings} total={total} />;
};

export default CheckoutSummaryContainer;
