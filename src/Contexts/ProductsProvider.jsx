import React, { createContext, useState } from "react";
//this context is used for defining all products in the database
export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
	//products is all available products
	//this will only be called on Shop mount page
	const [products, setProducts] = useState([]);

	const toPass = { products, setProducts };

	return <ProductsContext.Provider value={toPass}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
