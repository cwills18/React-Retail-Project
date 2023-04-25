import React, { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartProvider";
import { NavLink } from "react-router-dom";
import { getTotalCartSum } from "../../Services/cartHandling";
import { UserContext } from "../../Contexts/UserProvider";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";

const CheckoutSummaryContainer = () => {
	const { totalCartCount } = useContext(ShoppingCartContext);
	const { user } = useContext(UserContext);
	const [subtotal, setSubtotal] = useState(0);
	const [savings, setSavings] = useState(0);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		const getSubtotal = async () => {
			const sub = await getTotalCartSum(user);
			setSubtotal(sub);
		};
		getSubtotal();
	}, [totalCartCount]);

	useEffect(() => {
		setTotal(subtotal - savings + 9.95);
	}, [subtotal, savings]);

	return <CheckoutSummary itemCount={totalCartCount} subtotal={subtotal} /* savings={savings} */ total={total} />;
};

export default CheckoutSummaryContainer;
