import React, { useState, useEffect, useContext } from "react";
import ProductImagesDetailed from "../../../Components/Products/ProductImagesDetailed/ProductImagesDetailed";
import ProductInfoDetailed from "../../../Components/Products/ProductInfoDetailed/ProductInfoDetailed";
import styles from "./ProductCardDetailed.module.scss";
import {
	addToCart,
	checkIfInCart,
	incrementCartQuantity,
	decrementCartQuantity,
	noThisInCart,
	removeFromCart,
	prepareForCartAdd,
	prepareForCartRemove,
} from "../../../Services/cartHandling";
import { UserContext } from "../../../Contexts/UserProvider";
import { stockQuantityAvailable } from "../../../Services/products";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";

const ProductCardDetailed = ({ product }) => {
	const { name, images, price, onSale } = product;
	const { user } = useContext(UserContext);
	const { setTotalCartCount, setPriceSubtotal, setTotalSavings, cartProducts, setCartProducts } = useContext(ShoppingCartContext);
	const [featuredImg, setFeaturedImg] = useState(images[0]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [validForm, setValidForm] = useState(false);
	const [thisInCart, setThisInCart] = useState(false);
	const [thisQuantityInCart, setThisQuantityInCart] = useState(0);
	const [descriptionModal, setDescriptionModal] = useState(false);

	const handleImgClick = (e) => {
		setFeaturedImg(e.target.src);
	};

	const handleSizeRadioSelect = (e) => {
		const category = e.target.value;
		setSelectedCategory(category);
		if (thisInCart) {
			setThisInCart(false);
			setThisQuantityInCart(0);
		}
	};

	const handleSizeDropdownSelect = async (e) => {
		const size = e.target.value;
		setSelectedSize(size);
		if (thisInCart) {
			setThisInCart(false);
			setThisQuantityInCart(0);
		}
	};

	const validateForm = () => {
		if (!selectedSize) {
			setValidForm(false);
			return false;
		} else if (selectedSize && selectedCategory) {
			setValidForm(true);
			return true;
		} else {
			if (!product.adultSizes) {
				setSelectedCategory("kids");
				setValidForm(true);
				return true;
			} else if (!product.kidsSizes) {
				setSelectedCategory("adults");
				setValidForm(true);
				return true;
			} else {
				return false;
			}
		}
	};

	const handleAddToCart = async () => {
		if (validateForm()) {
			//update locally-stored states for quicker updates on UI
			setThisQuantityInCart(thisQuantityInCart + 1);
			setTotalCartCount((prev) => prev + 1);
			setThisInCart(true);
			setPriceSubtotal((prev) => prev + price);
			if (onSale) {
				//pretending everything is 50% off for now
				setTotalSavings((prev) => prev + price);
			}
			//need to use timeout due to validateForm's setSelectedCategory taking a bit of time
			setTimeout(async () => {
				let size = `${selectedCategory} ${selectedSize}`;
				const numInCart = await noThisInCart(user, product, size);
				const stockNum = await stockQuantityAvailable(product.id);
				if (numInCart < stockNum) {
					//update local state first
					const newLocalCart = prepareForCartAdd(cartProducts, product, size);
					setCartProducts(newLocalCart);
					const inCart = await checkIfInCart(user, product, size);
					//updating database here
					if (inCart) {
						incrementCartQuantity(user, product, size);
					} else {
						addToCart(user, product, size);
					}
				} else {
					//this will execute if not enough stock available. Functionality still needs developing. This is a bit clunky still.
					setThisQuantityInCart(thisQuantityInCart - 1);
					setTotalCartCount((prev) => prev - 1);
					setPriceSubtotal((prev) => prev - price);
				}
			}, 500);
		}
	};

	const handleRemoveFromCart = async () => {
		//updating local cart quantity first, so that if the new quantity is 0, the button will revert back to "Add To Cart"
		if (thisQuantityInCart > 1) {
			setThisQuantityInCart((prev) => prev - 1);
		} else {
			setThisQuantityInCart(0);
			setThisInCart(false);
		}
		const size = `${selectedCategory} ${selectedSize}`;
		const quantity = await noThisInCart(user, product, size);
		if (quantity > 0) {
			//update local states
			setTotalCartCount((prev) => prev - 1);
			setPriceSubtotal((prev) => prev - price);
			const newLocalCart = prepareForCartRemove(cartProducts, product, size);
			setCartProducts(newLocalCart);
			if (onSale) {
				//pretending everything is 50% off for now
				setTotalSavings((prev) => prev - price);
			}
			//update database
			if (quantity === 1) {
				removeFromCart(user, product, size);
			} else {
				decrementCartQuantity(user, product, size);
			}
		}
	};

	const toggleDescriptionModal = () => {
		setDescriptionModal(!descriptionModal);
	};

	useEffect(() => {}, [product]);

	return (
		<div className={styles.ProductCardDetailed}>
			<ProductImagesDetailed images={images} name={name} featuredImg={featuredImg} onClick={handleImgClick} />

			<ProductInfoDetailed
				product={product}
				descriptionModal={descriptionModal}
				toggleDescriptionModal={toggleDescriptionModal}
				selectedCategory={selectedCategory}
				selectedSize={selectedSize}
				handleRadioSelect={handleSizeRadioSelect}
				handleDropdownSelect={handleSizeDropdownSelect}
				addToCart={handleAddToCart}
				thisInCart={thisInCart}
				thisQuantityInCart={thisQuantityInCart}
				removeFromCart={handleRemoveFromCart}
			/>
		</div>
	);
};

export default ProductCardDetailed;
