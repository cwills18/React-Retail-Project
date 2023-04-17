import React, { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
	const [search, setSearch] = useState("");
	const [matchedItems, setMatchedItems] = useState([]);

	const toPass = { search, setSearch, matchedItems, setMatchedItems };

	return <SearchContext.Provider value={toPass}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
