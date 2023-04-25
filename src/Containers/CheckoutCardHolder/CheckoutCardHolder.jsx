import React, { useContext, useEffect, useState } from "react";
import CheckoutProductCard from "../../Components/CheckoutProductCard/CheckoutProductCard";
import { UserContext } from "../../Contexts/UserProvider";
import { noThisInCart, checkIfInCart, incrementCartQuantity, decrementCartQuantity, addToCart, removeFromCart } from "../../Services/cartHandling";
import { stockQuantityAvailable } from "../../Services/products";
import { ShoppingCartContext } from "../../Contexts/ShoppingCartProvider";

const CheckoutCardHolder = ({ product }) => {
	const { size } = product;
	const { user } = useContext(UserContext);
	const { setTotalCartCount } = useContext(ShoppingCartContext);
	const [thisQuantityInCart, setThisQuantityInCart] = useState(1);

	useEffect(() => {
		const wrapper = async () => {
			const num = await noThisInCart(user, product, size);
			setThisQuantityInCart(num);
		};
		wrapper();
	}, []);

	const handleAddToCart = async () => {
		setThisQuantityInCart(thisQuantityInCart + 1);
		setTotalCartCount((prev) => prev + 1);
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
	};

	const handleRemoveFromCart = async () => {
		if (thisQuantityInCart > 0) {
			setThisQuantityInCart((prev) => prev - 1);
			setTotalCartCount((prev) => prev - 1);
		}
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
