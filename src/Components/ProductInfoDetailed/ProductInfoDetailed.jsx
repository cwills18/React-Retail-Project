import React from "react";
import { formatPrice } from "./../../Services/formattedPrice.js";
import styles from "./ProductInfoDetailed.module.scss";

const ProductInfoDetailed = ({ product, descriptionModal, toggleDescriptionModal, selectedCategory, sizeOptions }) => {
	const { name, price, description, adultSizes, kidsSizes, material, onSale } = product;

	return (
		<div className={styles.DetailsContainer}>
			<h1 className={styles.ProductName}>{name}</h1>
			<div className={styles.Prices}>
				<h5 className={styles.Prices_Price}>${formatPrice(price)}</h5>
				{onSale && <h5 className={styles.Prices_FullPrice}>${formatPrice(price * 2)}</h5>}
				{onSale && <h5 className={styles.Prices_Discount}>50% off</h5>}
			</div>
			<h3 className={styles.SizeHeader}>Select Your Size</h3>
			<div className={styles.Sizing}>
				{adultSizes && kidsSizes && (
					<>
						<input className={styles.Sizing_CategoryRadio} type="radio" name="size-category" value="adultSizes" />
						<label className={styles.Sizing_Label} htmlFor="adultSizes">
							Adult
						</label>
						<input className={styles.Sizing_CategoryRadio} type="radio" name="size-category" value="kidSizes" />
						<label className={styles.Sizing_Label} htmlFor="kidSizes">
							Kids
						</label>
					</>
				)}
				{!kidsSizes && <p>Adults</p>}
				{!adultSizes && <p>Kids</p>}
				<select className={styles.Sizing_Dropdown}>
					<option className={styles.Sizing_Dropdown_Option}></option>
				</select>
			</div>
			<button className={styles.AddCartBtn}>Add To Cart</button>
			<p className={styles.InStock}>In Stock</p>
			<button className={styles.Description_Container} onClick={toggleDescriptionModal}>
				<p className={styles.Description_Label}>Description </p>
				<p className={descriptionModal ? styles.Description_ArrowUp : styles.Description_ArrowDown}>
					{descriptionModal ? "⌃" : "⌄"}{" "}
				</p>
			</button>
			{descriptionModal && (
				<div className={styles.Description_Modal_Container}>
					<p className={styles.Description_Modal_Description}>{description}</p>
					<h6 className={styles.Description_Modal_MaterialLabel}>Material:</h6>
					<p className={styles.Description_Modal_Material}>{`${material.charAt(0).toUpperCase()}${material.slice(
						1,
						material.length
					)}`}</p>
				</div>
			)}
		</div>
	);
};

export default ProductInfoDetailed;
