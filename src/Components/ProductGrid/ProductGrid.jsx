import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

const ProductGrid = ({ products, pageNum }) => {
	return (
		<div className={styles.Products}>
			<div className={styles.ProductGrid}>
				{products &&
					products
						.filter((x, index) => index >= pageNum * 50 && index < (pageNum + 1) * 50)
						.map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
			</div>
		</div>
	);
};

export default ProductGrid;
