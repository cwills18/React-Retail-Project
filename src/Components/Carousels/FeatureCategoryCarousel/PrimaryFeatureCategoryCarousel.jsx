import React, { useState, useEffect } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import styles from "./PrimaryFeatureCategoryCarousel.module.scss";
import { getProductsByCategory } from "../../../Services/productCategories";
import ProductCard from "../../Products/ProductCard/ProductCard";
import { makeSentenceCase } from "../../../Services/formatting";

const PrimaryFeatureCategoryCarousel = ({ categoryName }) => {
	const [categoryProducts, setCategoryProducts] = useState([]);

	useEffect(() => {
		const wrapper = async () => {
			const data = await getProductsByCategory(categoryName);
			setCategoryProducts(data);
		};
		wrapper();
	}, [categoryName]);

	return (
		<div className={styles.PrimaryFeaturedCategory}>
			<h1 className={styles.Heading}>{makeSentenceCase(categoryName)}-Themed Socks</h1>
			<CarouselProvider
				naturalSlideWidth={10}
				naturalSlideHeight={20}
				totalSlides={categoryProducts.length + 5}
				visibleSlides={5.4}
				className={styles.Carousel}
			>
				<Slider className={styles.Carousel_Slider}>
					{categoryProducts &&
						categoryProducts.map((product, index) => {
							return (
								<Slide index={index} className={styles.Carousel_Slide} key={product.id}>
									<div className={styles.Carousel_CardHolder}>
										<ProductCard
											product={product}
											className={styles.Carousel_ProductCard}
										/>
									</div>
								</Slide>
							);
						})}
				</Slider>
				<ButtonBack className={styles.Carousel_Buttons + " " + styles.Carousel_Buttons_Back}>&#8249;</ButtonBack>
				<ButtonNext className={styles.Carousel_Buttons + " " + styles.Carousel_Buttons_Next}>&#8250;</ButtonNext>
			</CarouselProvider>
		</div>
	);
};

export default PrimaryFeatureCategoryCarousel;
