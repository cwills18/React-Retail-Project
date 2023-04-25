import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import ProductCardDetailed from "../ProductCardDetailed/ProductCardDetailed";
import Footer from "../../Components/Footer/Footer";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
	const { products } = useContext(ProductsContext);
	console.log(products);
	const { id } = useParams();
	console.log(id);
	const product = products.find((product) => product.id === id);

	return (
		<div className={styles.Page}>
			<NavBar />
			<NavLink to="/shop" className={styles.BackBtn}>
				&lt; &lt; Back
			</NavLink>
			<ProductCardDetailed product={product} />
			<Footer />
		</div>
	);
};

export default ProductPage;
