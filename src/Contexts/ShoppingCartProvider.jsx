import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
	const [totalCartCount, setTotalCartCount] = useState(0);
	const [cartProducts, setCardProducts] = useState([]);

	const toPass = { totalCartCount, setTotalCartCount };

	return <ShoppingCartContext.Provider value={toPass}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartProvider;
