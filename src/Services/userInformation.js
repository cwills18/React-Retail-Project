import { db } from "./../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const getUser = async (userId) => {
	const docRef = doc(db, "users", userId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const id = userId;
		const restOfData = docSnap.data();
		return { id, ...restOfData };
	} else {
		console.log("Something went wrong");
	}
};
export const getUserFavourites = async (userObj) => {
	const docRef = doc(db, "users", userObj.id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		const favourites = data.favourites;
		return favourites;
	} else {
		console.log("Something went wrong");
	}
};

export const getUserCartItems = async (userObj) => {
	const docRef = doc(db, "users", userObj.id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data = docSnap.data();
		const cart = data.inCart;
		return cart;
	} else {
		console.log("Something went wrong");
	}
};
