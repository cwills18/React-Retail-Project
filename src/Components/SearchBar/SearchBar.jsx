import React, { useContext } from "react";
import styles from "./SearchBar.module.scss";
import { SearchContext } from "../../Contexts/SearchProvider";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const { search, handleSearchChange, findMatches } = useContext(SearchContext);
	const navigate = useNavigate();

	const handleEnterKey = (e) => {
		if (e.keyCode === 13) {
			navigate("/shop");
			findMatches();
		}
	};

	return (
		<div className={styles.SearchContainer}>
			<input
				className={styles.SearchBar}
				type="text"
				value={search}
				placeholder="Search by keyword"
				onChange={handleSearchChange}
				onKeyDown={handleEnterKey}
			/>
		</div>
	);
};

export default SearchBar;
