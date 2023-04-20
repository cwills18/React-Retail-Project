import React, { useState, useEffect } from "react";
import ProductImagesDetailed from "../../Components/ProductImagesDetailed/ProductImagesDetailed";
import ProductInfoDetailed from "../../Components/ProductInfoDetailed/ProductInfoDetailed";
import styles from "./ProductCardDetailed.module.scss";

const ProductCardDetailed = ({ product }) => {
	const { name, images, adultSizes, kidsSizes } = product;
	const [featuredImg, setFeaturedImg] = useState(images[0]);
	const [descriptionModal, setDescriptionModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [sizeOptions, setSizeOptions] = useState([]);
	const [selectedSize, setSelectedSize] = useState(null);

	const handleImgClick = (e) => {
		setFeaturedImg(e.target.src);
	};

	const handleRadioSelect = (e) => {
		setSelectedCategory(e.target.value);
		if (selectedCategory === adults) {
			setSizeOptions(adultSizes);
		} else {
			setSizeOptions(kidsSizes);
		}
	};

	const handleSizeSelect = (e) => {
		setSelectedSize(e.target.value);
	};

	const toggleDescriptionModal = () => {
		setDescriptionModal(!descriptionModal);
	};

	useEffect(() => {}, [product]);

	return (
		<div className={styles.ProductCardDetailed}>
			<ProductImagesDetailed images={images} name={name} featuredImg={featuredImg} onClick={handleImgClick} />
			<ProductInfoDetailed product={product} descriptionModal={descriptionModal} toggleDescriptionModal={toggleDescriptionModal} />
		</div>
	);
};

export default ProductCardDetailed;
