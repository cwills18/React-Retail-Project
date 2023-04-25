import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserCartItems } from "./userInformation";
import { increaseQuantityAvailable, reduceQuantityAvailable } from "./products";

export const checkIfInCart = async (userObj, productObj, productSize) => {
	//Note that  product size should come in as a string, formatted like: "adults S", "kids M", "adults XL" etc.
	const cart = await getUserCartItems(userObj);
	console.log("current inCart items are", cart);
	const result = cart.some((product) => product.id === productObj.id && product.size === productSize);
	console.log("the product is in the cart:", result);
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
	console.log(productToAdd);
	cart.push(productToAdd);
	console.log(cart);
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
	console.log("product found at index", cartRef);
	const targetProduct = cart.slice(cartRef);
	console.log("the target product is", targetProduct);
	targetProduct[0].quantity += 1;
	console.log(targetProduct[0].quantity);
	console.log(cart);
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
	console.log("product found at index", cartRef);
	const targetProduct = cart.slice(cartRef);
	console.log("the target product is", targetProduct);
	targetProduct[0].quantity -= 1;
	console.log(targetProduct[0].quantity);
	console.log(cart);
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
	console.log("the prices are", pricesForEachType);
	const subtotal = pricesForEachType.reduce((acc, next) => (acc += next), 0);
	console.log(subtotal);
	return subtotal;
};
