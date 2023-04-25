import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import PageTracker from "../../Components/PageTracker/PageTracker";
import { SearchContext } from "../../Contexts/SearchProvider";
import styles from "./ProductGridContainer.module.scss";

const ProductGridContainer = () => {
	const { products } = useContext(ProductsContext);
	const { matchedItems, failedSearch, setFailedSearch, foundItemCount, setFoundItemCount } = useContext(SearchContext);
	const [pageNum, setPageNum] = useState(0);

	const handlePageIncrement = () => {
		setPageNum((prev) => (prev < Math.ceil(foundItemCount / 50) - 1 ? prev + 1 : prev));
	};
	const handlePageDecrement = () => {
		setPageNum((prev) => (prev > 0 ? prev - 1 : prev));
	};
	const handlePageFirst = () => {
		setPageNum(0);
	};
	const handlePageLast = () => {
		setPageNum(Math.ceil(foundItemCount / 50) - 1);
	};

	useEffect(() => {
		setPageNum(0);
	}, [matchedItems]);

	useEffect(() => {}, [pageNum]);

	return (
		<div className={styles.ProductGridContainer}>
			{!products && <p>Loading...</p>}
			{products && (
				<>
					{failedSearch && <p className={styles.NothingFound}>Sorry, no items matched that search.</p>}
					{!failedSearch && (
						<>
							<ProductGrid
								products={matchedItems.length === 0 ? products : matchedItems}
								pageNum={pageNum}
							/>
							<PageTracker
								handlePageFirst={handlePageFirst}
								handlePageLast={handlePageLast}
								handlePageDecrement={handlePageDecrement}
								handlePageIncrement={handlePageIncrement}
								pageNum={pageNum}
								productNum={foundItemCount}
							/>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default ProductGridContainer;
