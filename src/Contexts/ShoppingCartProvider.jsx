import React, { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
	const [cartCount, setCartCount] = useState(0);

	const toPass = { cartCount, setCartCount };

	return <ShoppingCartContext.Provider value={toPass}>{children}</ShoppingCartContext.Provider>;
};

export default ShoppingCartProvider;
