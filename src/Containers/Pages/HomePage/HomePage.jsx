import React, { useContext, useEffect } from "react";
import NavBar from "../../../Components/Layout/NavBar/NavBar";
import Footer from "../../../Components/Layout/Footer/Footer";
import { getAllProducts } from "../../../Services/products";
import styles from "./HomePage.module.scss";
import HomeCarousel from "../../../Components/Carousels/HomeCarousel/HomeCarousel";
import { ProductsContext } from "../../../Contexts/ProductsProvider";
import { SearchContext } from "../../../Contexts/SearchProvider";
import PrimaryFeatureCategoryCarousel from "../../../Components/Carousels/FeatureCategoryCarousel/PrimaryFeatureCategoryCarousel";
import SecondaryFeatureCategoryCarousel from "../../../Components/Carousels/FeatureCategoryCarousel/SecondaryFeatureCategoryCarousel";
import { UserContext } from "../../../Contexts/UserProvider";
import { getUser } from "../../../Services/userInformation";
import { getTotalItemsInCart } from "../../../Services/cartHandling";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";

const HomePage = () => {
	const { setProducts } = useContext(ProductsContext);
	const { matchedItems, setFoundItemCount } = useContext(SearchContext);
	const { setTotalCartCount } = useContext(ShoppingCartContext);
	const { user, setUser, favourites, setFavourites, inCart, setInCart } = useContext(UserContext);

	useEffect(() => {
		const loadAll = async () => {
			const data = await getAllProducts();
			setProducts(data);
			if (matchedItems.length === 0) {
				setFoundItemCount(data.length);
			}
		};
		loadAll();
	}, []);

	useEffect(() => {
		const loadUser = async () => {
			const userInfo = await getUser("BeorY05zH7u4GyNdDByE");
			setUser(userInfo);
		};
		loadUser();
	}, []);

	useEffect(() => {
		const checkCart = async () => {
			const cartNum = await getTotalItemsInCart(user);
			setTotalCartCount(cartNum);
		};
		checkCart();
		setFavourites(user.favourites);
		setInCart(user.inCart);
	}, [user]);

	return (
		<div className={styles.HomePage}>
			<NavBar />
			<HomeCarousel />
			<PrimaryFeatureCategoryCarousel categoryName="food" />
			<SecondaryFeatureCategoryCarousel categoryName="character" />
			<Footer />
		</div>
	);
};

export default HomePage;
