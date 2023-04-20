import React, { useContext } from "react";
import styles from "./ItemsFound.module.scss";
import { SearchContext } from "../../Contexts/SearchProvider";

const ItemsFound = () => {
	const { foundItemCount } = useContext(SearchContext);

	return (
		<div className={styles.ItemsFound}>
			{foundItemCount} Item{foundItemCount > 1 ? "s" : ""} Found
		</div>
	);
};

export default ItemsFound;
