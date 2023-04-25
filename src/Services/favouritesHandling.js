import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getProduct } from "./products";
import { getUser, getUserFavourites } from "./userInformation";

export const toggleFavourite = async (userObj, productObj) => {
	const isFavourite = await checkIfFavourite(userObj, productObj);
	console.log(isFavourite);
	if (isFavourite) {
		removeFavourite(userObj, productObj);
	} else {
		addFavourite(userObj, productObj);
	}
};

export const checkIfFavourite = async (userObj, productObj) => {
	const favourites = await getUserFavourites(userObj);
	// console.log("current favourites are", favourites);
	const result = favourites.some((product) => product.id === productObj.id);
	// console.log("the product is a favourite:", result);
	return result;
};

export const addFavourite = async (userObj, productObj) => {
	const favourites = await getUserFavourites(userObj);
	favourites.push(productObj);
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		favourites: favourites,
	});
};

export const removeFavourite = async (userObj, productObj) => {
	const favourites = await getUserFavourites(userObj);
	const newFavourites = favourites.filter((product) => product.id !== productObj.id);
	const userRef = doc(db, "users", userObj.id);
	await updateDoc(userRef, {
		favourites: newFavourites,
	});
};
