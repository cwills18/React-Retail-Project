import React from "react";

const ProductCardDetailed = ({ product }) => {
	const { name, price, images, description, adultSizes, kidsSizes, material, onSale } = product;

	return (
		<div>
			<img src={images[0]} alt={name} />
		</div>
	);
};

export default ProductCardDetailed;
