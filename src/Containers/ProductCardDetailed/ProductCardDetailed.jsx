import React, { useState, useEffect, useContext } from "react";
import ProductImagesDetailed from "../../Components/ProductImagesDetailed/ProductImagesDetailed";
import ProductInfoDetailed from "../../Components/ProductInfoDetailed/ProductInfoDetailed";
import styles from "./ProductCardDetailed.module.scss";
import { addToCart, checkIfInCart, incrementCartQuantity, decrementCartQuantity, noThisInCart, removeFromCart } from "../../Services/cartHandling";
import { UserContext } from "../../Contexts/UserProvider";
import { stockQuantityAvailable } from "../../Services/products";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartProvider";

const ProductCardDetailed = ({ product }) => {
	const { name, images, adultSizes, kidsSizes } = product;
	const { user } = useContext(UserContext);
	const { setTotalCartCount } = useContext(ShoppingCartContext);
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
		console.log(size);
		setSelectedSize(size);
		if (thisInCart) {
			setThisInCart(false);
			setThisQuantityInCart(0);
		}
	};

	const validateForm = () => {
		if (!selectedSize) {
			console.log("you didn't select a size");
			setValidForm(false);
			return false;
		} else if (selectedSize && selectedCategory) {
			console.log("both fields set");
			setValidForm(true);
			return true;
		} else {
			if (!product.adultSizes) {
				console.log("no adult sizes found, setting to kids");
				setSelectedCategory("kids");
				setValidForm(true);
				return true;
			} else if (!product.kidsSizes) {
				console.log("no kids sizes found, setting to adults");
				setSelectedCategory("adults");
				setValidForm(true);
				return true;
			} else {
				console.log("no category is selected yet");
				return false;
			}
		}
	};

	const handleAddToCart = async () => {
		if (validateForm()) {
			setThisQuantityInCart(thisQuantityInCart + 1);
			setTotalCartCount((prev) => prev + 1);
			console.log("the form validated");
			setThisInCart(true);
			setTimeout(async () => {
				let size = `${selectedCategory} ${selectedSize}`;
				console.log(size);
				const numInCart = await noThisInCart(user, product, size);
				console.log("the number in the cart already is", numInCart);
				const inCart = await checkIfInCart(user, product, size);
				console.log("IS IT IN THE CART?", inCart);
				const stockNum = await stockQuantityAvailable(product.id);
				if (numInCart < stockNum) {
					if (inCart) {
						incrementCartQuantity(user, product, size);
					} else {
						addToCart(user, product, size);
					}
				}
			}, 2000);
		}
	};

	const handleRemoveFromCart = async () => {
		if (thisQuantityInCart > 1) {
			setThisQuantityInCart((prev) => prev - 1);
		} else {
			setThisQuantityInCart(0);
			setThisInCart(false);
		}
		const size = `${selectedCategory} ${selectedSize}`;
		const quantity = await noThisInCart(user, product, size);
		if (quantity === 1) {
			removeFromCart(user, product, size);
			setTotalCartCount((prev) => prev - 1);
		} else if (quantity > 1) {
			decrementCartQuantity(user, product, size);
			setTotalCartCount((prev) => prev - 1);
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
