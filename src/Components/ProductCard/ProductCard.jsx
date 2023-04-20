import React from "react";
import { NavLink } from "react-router-dom";
import { formatPrice } from "./../../Services/formattedPrice.js";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
	const { id, name, images, price } = product;
	const formattedPrice = formatPrice(price);
	return (
		<div className={styles.ProductCard}>
			{images && (
				<div className={styles.ProductImgHolder}>
					<img className={styles.ProductImgHolder_Img} src={images[0]} />
				</div>
			)}
			<h4 className={styles.ProductName}>{name}</h4>
			<p className={styles.ProductPrice}>${formattedPrice}</p>
			<NavLink to={`/${id}`} className={styles.NavLink}>
				<button className={styles.BuyNow}>Buy Now</button>
			</NavLink>
		</div>
	);
};

export default ProductCard;
