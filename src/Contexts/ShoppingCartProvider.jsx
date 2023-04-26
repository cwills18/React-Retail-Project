import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
	const [totalCartCount, setTotalCartCount] = useState(0);
	const [priceSubtotal, setPriceSubtotal] = useState(0);
	const [totalSavings, setTotalSavings] = useState(0);
	const [cartProducts, setCartProducts] = useState([]);

	const toPass = {
		totalCartCount,
		setTotalCartCount,
		priceSubtotal,
		setPriceSubtotal,
		totalSavings,
		setTotalSavings,
		cartProducts,
		setCartProducts,
	};

	return <ShoppingCartContext.Provider value={toPass}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartProvider;
