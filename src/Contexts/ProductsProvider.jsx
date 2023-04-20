import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);

	const toPass = { products, setProducts };

	return <ProductsContext.Provider value={toPass}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
