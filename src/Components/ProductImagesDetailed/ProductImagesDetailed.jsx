import React from "react";
import styles from "./ProductImagesDetailed.module.scss";

const ProductImagesDetailed = ({ images, name, featuredImg, onClick }) => {
	return (
		<div className={styles.ImagesContainer}>
			<div className={styles.SideBar}>
				{images &&
					images.map((image, index) => {
						return (
							<img
								className={styles.SideBar_Img}
								src={image}
								alt={name}
								key={`${name} ${index}`}
								onClick={onClick}
							/>
						);
					})}
			</div>
			<div className={styles.FeatureImg}>
				<img className={styles.FeatureImg_Img} src={featuredImg} />
			</div>
		</div>
	);
};

export default ProductImagesDetailed;
