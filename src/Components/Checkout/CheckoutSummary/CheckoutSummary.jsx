import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./CheckoutSummary.module.scss";
import { formatPrice } from "../../../Services/formatting";

const CheckoutSummary = ({ itemCount, subtotal, savings, total }) => {
	useEffect(() => {}, [itemCount, subtotal, savings, total]);
	return (
		<div className={styles.CheckoutSummary}>
			<h4 className={styles.Heading}>Order Summary</h4>
			<div className={styles.Subtotal}>
				<p className={styles.Subtotal_Label}>
					Subtotal - {itemCount} item{itemCount > 1 ? "s" : ""}
				</p>
				<p className={styles.Subtotal_Price}>${formatPrice(subtotal)}</p>
			</div>
			<div className={styles.Savings}>
				<p className={styles.Savings_Label}>Sale Savings</p>
				{savings > 0 && <p className={styles.Savings_Price}>-${formatPrice(savings)}</p>}
				{(!savings || savings === 0) && <p className={styles.Savings_Price}>-</p>}
			</div>
			<div className={styles.Shipping}>
				<p className={styles.Shipping_Label}>Estimated shipping</p>
				<p className={styles.Shipping_Price}>$9.95</p>
			</div>
			<div className={styles.Total}>
				<p className={styles.Total_Label}>Total</p>
				<p className={styles.Total_Price}>${formatPrice(total)}</p>
			</div>
			<NavLink to={"/not-a-real-company"} className={styles.NavLink}>
				<div className={styles.ContinueToCheckout}>Continue to Checkout</div>
			</NavLink>
		</div>
	);
};

export default CheckoutSummary;
