import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
	const { id, name, images, price } = product;
	return (
		<div className={styles.ProductCard}>
			{images && <img className={styles.ProductImg} src={images[0]} />}
			<h4 className={styles.ProductName}>{name}</h4>
			<p className={styles.ProductPrice}>${price}</p>
			<NavLink to={`/${id}`} className={styles.NavLink}>
				<button className={styles.BuyNow}>Buy Now</button>
			</NavLink>
		</div>
	);
};

export default ProductCard;
