import React from "react";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
	return (
		<div className={styles.SearchContainer}>
			<input className={styles.SearchBar} type="text" placeholder="Search by keyword" />
		</div>
	);
};

export default SearchBar;
