import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./ShopPage.module.scss";

const ShopPage = () => {
	return (
		<div className={styles.ShopPage}>
			<NavBar className={styles.NavBar} />
		</div>
	);
};

export default ShopPage;
