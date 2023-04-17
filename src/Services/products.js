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
