import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [favourites, setFavourites] = useState([]);
	const [inCart, setInCart] = useState([]);

	const toPass = { user, setUser, favourites, setFavourites, inCart, setInCart };

	return <UserContext.Provider value={toPass}>{children}</UserContext.Provider>;
};

export default UserProvider;
