import React, { useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import NavBar from "../../../Components/Layout/NavBar/NavBar";
import ProductCardDetailed from "../../Products/ProductCardDetailed/ProductCardDetailed";
import Footer from "../../../Components/Layout/Footer/Footer";
import { ProductsContext } from "../../../Contexts/ProductsProvider";
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
	const { products } = useContext(ProductsContext);
	const { id } = useParams();
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
