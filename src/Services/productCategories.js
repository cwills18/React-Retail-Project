import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./../firebase";

/* export const getUniqueCategories = (objArray) => {
	objArray.reduce((object, acc) => {
		if (object.categories) {
			categoriesToAdd = categories.filter((category) => !acc.includes(category));
			categoriesToAdd.forEach(acc.push);
		}
	}, []);
}; */

export const getProductsByCategory = async (nameOfCategory) => {
	let results = [];
	const q = query(collection(db, "products"), where("categories", "array-contains", nameOfCategory));
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const obj = { id: doc.id, ...data };
		results.push(obj);
	});
	return results;
};
