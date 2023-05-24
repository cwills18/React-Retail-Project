import React, { useContext, useEffect, useState } from "react";
import CheckoutProductCard from "../../../Components/Checkout/CheckoutProductCard/CheckoutProductCard";
import { UserContext } from "../../../Contexts/UserProvider";
import {
	noThisInCart,
	checkIfInCart,
	incrementCartQuantity,
	decrementCartQuantity,
	addToCart,
	removeFromCart,
	prepareForCartAdd,
	prepareForCartRemove,
} from "../../../Services/cartHandling";
import { stockQuantityAvailable } from "../../../Services/products";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";

const CheckoutCardHolder = ({ product }) => {
	const { size, price, onSale } = product;
	const { user } = useContext(UserContext);
	const { setTotalCartCount, setPriceSubtotal, setTotalSavings, cartProducts, setCartProducts } = useContext(ShoppingCartContext);
	const [thisQuantityInCart, setThisQuantityInCart] = useState(1);

	useEffect(() => {
		const wrapper = async () => {
			const num = await noThisInCart(user, product, size);
			setThisQuantityInCart(num);
		};
		wrapper();
	}, []);

	const handleAddToCart = async () => {
		//update local state setters for quicker UI
		setThisQuantityInCart(thisQuantityInCart + 1);
		setPriceSubtotal((prev) => prev + price);
		setTotalCartCount((prev) => prev + 1);
		const newLocalCart = prepareForCartAdd(cartProducts, product, size);
		// console.log("the new local cart is:", newLocalCart);
		setCartProducts(newLocalCart);
		if (onSale) {
			//assuming 50% off for now;
			setTotalSavings((prev) => prev + price);
		}
		//communicate with database
		const numInCart = await noThisInCart(user, product, size);
		const stockNum = await stockQuantityAvailable(product.id);
		if (numInCart < stockNum) {
			const inCart = await checkIfInCart(user, product, size);
			if (inCart) {
				incrementCartQuantity(user, product, size);
			} else {
				addToCart(user, product, size);
			}
		} else {
			//still need to work on this code. this is a bit clunky at the moment.
			setThisQuantityInCart(thisQuantityInCart - 1);
			setPriceSubtotal((prev) => prev - price);
			setTotalCartCount((prev) => prev - 1);
			setTotalSavings((prev) => prev - price);
		}
	};

	const handleRemoveFromCart = async () => {
		//deal with local variables first for quicker loading of UI
		if (thisQuantityInCart > 0) {
			setPriceSubtotal((prev) => prev - price);
			setThisQuantityInCart((prev) => prev - 1);
			setTotalCartCount((prev) => prev - 1);
			if (onSale) {
				//assuming 50% for now;
				setTotalSavings((prev) => prev - price);
			}
			const cart = prepareForCartRemove(cartProducts, product, size);
			setCartProducts(cart);
		}
		//handling database
		const quantity = await noThisInCart(user, product, size);
		if (quantity === 1) {
			removeFromCart(user, product, size);
		} else if (quantity > 1) {
			decrementCartQuantity(user, product, size);
		}
	};

	return (
		<CheckoutProductCard
			product={product}
			addToCart={handleAddToCart}
			removeFromCart={handleRemoveFromCart}
			quantityInCart={thisQuantityInCart}
		/>
	);
};

export default CheckoutCardHolder;
