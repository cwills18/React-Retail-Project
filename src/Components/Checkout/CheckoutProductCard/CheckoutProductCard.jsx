import React, { useContext, useState, useEffect } from "react";
import { formatPrice, makeSentenceCase } from "../../../Services/formatting";
import styles from "./CheckoutProductCard.module.scss";

const CheckoutProductCard = ({ product, addToCart, removeFromCart, quantityInCart }) => {
	const { name, images, price, size, quantity, onSale } = product;

	useEffect(() => {}, [quantity]);

	return (
		<div className={styles.CheckoutProductCard}>
			{images && (
				<div className={styles.ProductImgHolder}>
					<img className={styles.ProductImgHolder_Img} src={images[0]} />
				</div>
			)}
			<div className={styles.CartDetails}>
				<h4 className={styles.CartDetails_ProductName}>{name}</h4>
				<h5 className={styles.CartDetails_Sizing}>Size: {makeSentenceCase(size)}</h5>
				<div className={styles.CartDetails_ProductPrice}>
					{onSale && <p className={styles.CartDetails_ProductPrice_Original}>${formatPrice(price * 2)}</p>}
					<p className={styles.CartDetails_ProductPrice_Current}>${formatPrice(price)} / each</p>
				</div>
				<div className={styles.InCartBtn}>
					<button className={styles.InCartBtn_Btns} onClick={removeFromCart}>
						-
					</button>
					<p className={styles.InCartBtn_Quantity}>{quantityInCart}</p>
					<button className={styles.InCartBtn_Btns} onClick={addToCart}>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutProductCard;
