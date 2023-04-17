import React, { useContext } from "react";
import styles from "./ItemsFound.module.scss";
import { ProductsContext } from "../../Contexts/ProductsProvider";

const ItemsFound = () => {
	const { foundItemCount } = useContext(ProductsContext);

	return <div className={styles.ItemsFound}>{foundItemCount} Items Found</div>;
};

export default ItemsFound;
