import React from "react";
import { addNewProduct } from "../../../Services/products";

const AddProductForm = () => {
	const initialState = {
		name: "Socks",
		price: Math.round(Math.random() * 7 * 100) / 100 + 10,
		images: ["https://cdn.shopify.com/s/files/1/0045/7349/5389/products/BinChicken1_1000x.jpg?v=1669262283"],
		description: "",
		adultSizes: ["S", "M", "L", "XL"],
		kidsSizes: ["S", "M", "L"],
		material: "cotton",
		categories: ["sports"],
		onSale: false,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(initialState);
		await addNewProduct(initialState);
	};

	return <button onClick={handleSubmit}>Add a new product</button>;
};

export default AddProductForm;
