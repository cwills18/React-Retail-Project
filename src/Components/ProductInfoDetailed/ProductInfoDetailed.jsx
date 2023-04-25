import React, { useContext, useEffect } from "react";
import { formatPrice, makeSentenceCase } from "../../Services/formatting.js";
import styles from "./ProductInfoDetailed.module.scss";
import { getUser, getUserCartItems, getUserFavourites } from "../../Services/userInformation.js";
import { UserContext } from "../../Contexts/UserProvider.jsx";
import { getProduct } from "../../Services/products.js";
import { addFavourite, checkIfFavourite, removeFavourite, toggleFavourite } from "../../Services/favouritesHandling.js";
import { addToCart, checkIfInCart, decrementCartQuantity, incrementCartQuantity } from "../../Services/cartHandling.js";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartProvider.jsx";

const ProductInfoDetailed = ({
	product,
	descriptionModal,
	toggleDescriptionModal,
	selectedCategory,
	selectedSize,
	handleRadioSelect,
	handleDropdownSelect,
	addToCart,
	removeFromCart,
	thisInCart,
	thisQuantityInCart,
}) => {
	const { name, price, description, adultSizes, kidsSizes, material, onSale } = product;
	const { user, favourites, inCart } = useContext(UserContext);

	console.log("the props are");
	console.log("selected category:", selectedCategory);

	const handleClick = () => {
		console.log(user);
		console.log(favourites);
		console.log(inCart);
		// console.log(addFavourite(user, favourites, product));
		// console.log(getUserFavourites(user));
		// console.log(toggleFavourite(user, product));
		// console.log(getUserCartItems(user));
		// console.log(checkIfInCart(user, product));
		const size = `${selectedCategory} ${selectedSize}`;
		// console.log(addToCart(user, product, size));
		// console.log(incrementCartQuantity(user, product, size));
		// console.log(decrementCartQuantity(user, product, size));
	};

	useEffect(() => {}, [selectedCategory]);

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
					<div className={styles.Sizing_CategoriesContainer}>
						<input
							className={styles.Sizing_CategoryRadio}
							type="radio"
							name="size-category"
							value="adults"
							onChange={handleRadioSelect}
						/>
						<label className={styles.Sizing_Label} htmlFor="adultSizes">
							Adult
						</label>
						<input
							className={styles.Sizing_CategoryRadio}
							type="radio"
							name="size-category"
							value="kids"
							onChange={handleRadioSelect}
						/>
						<label className={styles.Sizing_Label} htmlFor="kidSizes">
							Kids
						</label>
					</div>
				)}
				{!kidsSizes && <p className={styles.Sizing_Label}>Adults</p>}
				{!adultSizes && <p className={styles.Sizing_Label}>Kids</p>}
				<select className={styles.Sizing_Dropdown} onChange={handleDropdownSelect}>
					<option className={styles.Sizing_Dropdown_Option}></option>
					<option>S</option>
					<option>M</option>
					<option>L</option>
					{adultSizes && selectedCategory !== "kids" && <option>XL</option>}
				</select>
			</div>
			{!thisInCart && (
				<button className={styles.AddCartBtn} onClick={addToCart}>
					Add To Cart
				</button>
			)}
			{thisInCart && (
				<div className={styles.InCartBtn}>
					<button className={styles.InCartBtn_Btns} onClick={removeFromCart}>
						-
					</button>
					<p className={styles.InCartBtn_Quantity}>{thisQuantityInCart > 0 && thisQuantityInCart}</p>
					<button className={styles.InCartBtn_Btns} onClick={addToCart}>
						+
					</button>
				</div>
			)}
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
					<p className={styles.Description_Modal_Material}>{`${makeSentenceCase(material)}`}</p>
				</div>
			)}
			<button onClick={handleClick}>Get user</button>
		</div>
	);
};

export default ProductInfoDetailed;
