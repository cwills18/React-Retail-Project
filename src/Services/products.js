import { db } from "./../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const getAllProducts = async () => {
	const querySnapshot = await getDocs(collection(db, "products"));
	const data = querySnapshot.docs.map((product) => {
		const id = product.id;
		const restOfData = product.data();
		return { id, ...restOfData };
	});
	return data;
};

export const addNewProduct = async (someObj) => {
	const productRef = await addDoc(collection(db, "products"), someObj);
};

export const getProduct = async (productId) => {
	const docRef = doc(db, "products", productId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log(docSnap.data());
		return docSnap.data();
	} else {
		console.log("The document could not be found");
	}
};

export const stockQuantityAvailable = async (productId) => {
	const product = await getProduct(productId);
	const quantity = await product.quantity;
	console.log("the stock quantity available is", quantity);
	return quantity;
};

export const reduceQuantityAvailable = async (productId) => {
	const product = await getProduct(productId);
	const quantity = await product.quantity;
	if (quantity <= 0) {
		throw new Error("Not enough stock available");
	}
	let newQuantity;
	try {
		newQuantity = quantity - 1;
	} catch (e) {
		newQuantity = 0;
	}
	const productRef = doc(db, "products", productId);
	await updateDoc(productRef, {
		quantity: newQuantity,
	});
};

export const increaseQuantityAvailable = async (productId) => {
	const product = await getProduct(productId);
	const quantity = await product.quantity;
	let newQuantity;
	try {
		newQuantity = quantity + 1;
	} catch (e) {
		newQuantity = 100;
	}
	const productRef = doc(db, "products", productId);
	await updateDoc(productRef, {
		quantity: newQuantity,
	});
};
