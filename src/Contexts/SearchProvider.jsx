import React, { createContext, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { foundInCategories, foundInColours, foundInDescription, foundInName } from "./../Services/searchMatching.js";
import { ProductsContext } from "./ProductsProvider";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
	//products refers to all products in database
	const { products } = useContext(ProductsContext);
	//search refers to the string of search terms put in by the user
	const [search, setSearch] = useState("");
	//matched items are those to return if a search is active
	const [matchedItems, setMatchedItems] = useState([]);
	//how many items are being displayed in the product grid. default is num of all products, but this will be updated when searches take place
	const [foundItemCount, setFoundItemCount] = useState(products.length);
	//a boolean used to store whether a search returned with no results so that an appropriate message can be displayed to user
	const [failedSearch, setFailedSearch] = useState(false);

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	const findMatches = () => {
		const results = products.filter(
			(product) =>
				foundInName(search, product) ||
				foundInDescription(search, product) ||
				foundInCategories(search, product) ||
				foundInColours(search, product)
		);
		if (results.length > 0) {
			setFailedSearch(false);
			setMatchedItems(results);
		} else {
			setFailedSearch(true);
		}
		setFoundItemCount(results.length);
		// navigate("/shop");
	};

	const resetSearch = () => {
		setFailedSearch(false);
		setSearch("");
		setMatchedItems([]);
		setFoundItemCount(products.length);
	};

	const toPass = {
		search,
		setSearch,
		matchedItems,
		setMatchedItems,
		foundItemCount,
		setFoundItemCount,
		handleSearchChange,
		findMatches,
		failedSearch,
		setFailedSearch,
		resetSearch,
	};

	return <SearchContext.Provider value={toPass}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
