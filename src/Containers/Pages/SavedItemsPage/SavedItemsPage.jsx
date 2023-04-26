import React, { useContext, useState, useEffect } from "react";
import NavBar from "../../../Components/Layout/NavBar/NavBar";
import Footer from "../../../Components/Layout/Footer/Footer";
import { getUserFavourites } from "../../../Services/userInformation";
import { UserContext } from "../../../Contexts/UserProvider";
import ProductGrid from "../../../Components/Products/ProductGrid/ProductGrid";
import styles from "./SavedItemsPage.module.scss";

const SavedItemsPage = () => {
	const { user } = useContext(UserContext);
	const [savedItems, setSavedItems] = useState([]);
	const [pageNum, setPageNum] = useState(0);

	useEffect(() => {
		const wrapper = async () => {
			const favourites = await getUserFavourites(user);
			setSavedItems(favourites);
		};
		wrapper();
	}, []);

	useEffect(() => {}, [savedItems, user]);

	return (
		<div className={styles.SavedItemsPage}>
			<NavBar />
			<h3 className={styles.Heading}>Saved Items</h3>
			<ProductGrid products={savedItems} pageNum={pageNum} />
			<Footer />
		</div>
	);
};

export default SavedItemsPage;
