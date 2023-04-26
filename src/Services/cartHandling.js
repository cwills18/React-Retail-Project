import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserCartItems } from "./userInformation";
import { increaseQuantityAvailable, reduceQuantityAvailable } from "./products";

//Local functions for faster loading of cart items in UI
export const prepareForCartAdd = (cartArray, productToAdd, sizeToAdd) => {
	const alreadyInCart = cartArray.find((product) => product.id === productToAdd.id && product.size === sizeToAdd);
	console.log("already in cart?", alreadyInCart);
	if (alreadyInCart) {
		console.log("before update");
		console.log(alreadyInCart.quantity);
		alreadyInCart.quantity += 1;
		console.log("after update");
		console.log(alreadyInCart.quantity);
		return cartArray;
	} else {
		const newAddition = {
			id: productToAdd.id,
			name: productToAdd.name,
			images: productToAdd.images,
			price: productToAdd.price,
			onSale: productToAdd.onSale,
			size: sizeToAdd,
			quantity: 1,
		};
		console.log("new addition", newAddition);
		const newCart = [newAddition, ...cartArray];
		console.log(newCart);
		return newCart;
	}
};

export const prepareForCartRemove = (cartArray, productToAdd, sizeToAdd) => {
	const alreadyInCart = cartArray.find((product) => product.id === productToAdd.id && product.size === sizeToAdd);
	console.log("already in cart?", alreadyInCart);
	const currentQuantity = alreadyInCart.quantity;
	console.log("current quantity is", currentQuantity);
	if (currentQuantity > 1) {
		console.log("before update");
		alreadyInCart.quantity -= 1;
		console.log("after update");
		console.log(alreadyInCart.quantity);
		return cartArray;
	} else {
		const updatedCartArray = cartArray.filter((product) => !(product.id === productToAdd.id && product.size === sizeToAdd));
		console.log(updatedCartArray);
		return updatedCartArray;
	}
};

//the following functions all interact with the firebase storage
export const checkIfInCart = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	const result = cart.some((product) => product.id === productObj.id && product.size === productSize);
	return result;
};

export const addToCart = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	const { id, name, images, price, onSale } = productObj;
	const productToAdd = {
		id: id,
		name: name,
		images: images,
		price: price,
		onSale: onSale,
		size: productSize,
		quantity: 1,
	};
	cart.push(productToAdd);
	reduceQuantityAvailable(productObj.id);
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		inCart: cart,
	});
};

export const removeFromCart = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	const newCart = cart.filter((product) => !(product.id === productObj.id && product.size === productSize));
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		inCart: newCart,
	});
	increaseQuantityAvailable(productObj.id);
};

export const incrementCartQuantity = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	const cartRef = cart.findIndex((product) => product.id === productObj.id && product.size === productSize);
	const targetProduct = cart.slice(cartRef);
	targetProduct[0].quantity += 1;
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		inCart: cart,
	});
	reduceQuantityAvailable(productObj.id);
};

export const decrementCartQuantity = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	const cartRef = cart.findIndex((product) => product.id === productObj.id && product.size === productSize);
	const targetProduct = cart.slice(cartRef);
	targetProduct[0].quantity -= 1;
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		inCart: cart,
	});
	increaseQuantityAvailable(productObj.id);
};

export const noThisInCart = (userObj, productObj, productSize) => {
	const wrapper = async () => {
		const cart = await getUserCartItems(userObj);
		const targetProduct = cart.find((product) => product.id === productObj.id && product.size === productSize);
		if (targetProduct) {
			return targetProduct.quantity;
		} else {
			return 0;
		}
	};
	const number = wrapper();
	return number;
};

export const getTotalItemsInCart = async (userObj) => {
	const cart = await getUserCartItems(userObj);
	const quantities = [];
	cart.forEach((item) => {
		quantities.push(item.quantity);
	});
	const quantity = quantities.reduce((acc, next) => (acc += next), 0);
	return quantity;
};

export const getTotalCartSum = async (userObj) => {
	const cart = await getUserCartItems(userObj);
	const pricesForEachType = [];
	cart.forEach((item) => {
		const thisSubtotal = item.price * item.quantity;
		pricesForEachType.push(thisSubtotal);
	});
	const subtotal = pricesForEachType.reduce((acc, next) => (acc += next), 0);
	return subtotal;
};
