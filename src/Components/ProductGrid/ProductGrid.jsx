import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

const ProductGrid = () => {
	const { products } = useContext(ProductsContext);
	const [pageNum, setPageNum] = useState(0);

	const handlePageIncrement = () => {
		setPageNum((prev) => (prev < Math.ceil(products.length / 50) - 1 ? prev + 1 : prev));
	};
	const handlePageDecrement = () => {
		setPageNum((prev) => (prev > 0 ? prev - 1 : prev));
	};
	const handlePageFirst = () => {
		setPageNum(0);
	};
	const handlePageLast = () => {
		setPageNum(Math.ceil(products.length / 50) - 1);
	};

	useEffect(() => {
		setPageNum(0);
	}, [products]);

	useEffect(() => {}, [pageNum]);

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
			<div className={styles.PageSelector}>
				<button className={styles.PageSelector_Btn} onClick={handlePageFirst}>
					&lt; &lt;
				</button>
				<button className={styles.PageSelector_Btn} onClick={handlePageDecrement}>
					&lt;
				</button>
				<p className={styles.PageSelector_Text}>
					Page {pageNum + 1} of {Math.ceil(products.length / 50)}
				</p>
				<button className={styles.PageSelector_Btn} onClick={handlePageIncrement}>
					&gt;
				</button>
				<button className={styles.PageSelector_Btn} onClick={handlePageLast}>
					&gt; &gt;
				</button>
			</div>
		</div>
	);
};

export default ProductGrid;
