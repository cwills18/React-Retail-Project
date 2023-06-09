import React, { useContext, useEffect } from "react";
import NavBar from "../../../Components/Layout/NavBar/NavBar";
import styles from "./ShopPage.module.scss";
import ItemsFound from "../../../Components/Layout/ItemsFound/ItemsFound";
import Footer from "../../../Components/Layout/Footer/Footer";
import { ProductsContext } from "../../../Contexts/ProductsProvider";
import { getAllProducts } from "../../../Services/products";
import ProductGridContainer from "../../Products/ProductGridContainer/ProductGridContainer";
import { SearchContext } from "../../../Contexts/SearchProvider";
import { getTotalItemsInCart } from "../../../Services/cartHandling";
import { ShoppingCartContext } from "../../../Contexts/ShoppingCartProvider";
import { UserContext } from "../../../Contexts/UserProvider";

const ShopPage = () => {
	const { products, setProducts } = useContext(ProductsContext);
	const { user } = useContext(UserContext);
	const { setTotalCartCount } = useContext(ShoppingCartContext);
	const { matchedItems, setMatchedItems, setFoundItemCount } = useContext(SearchContext);

	useEffect(() => {
		const loadAll = async () => {
			const data = await getAllProducts();
			setProducts(data);
			if (matchedItems.length === 0) {
				setFoundItemCount(data.length);
			}
			const cartNum = await getTotalItemsInCart(user);
			setTotalCartCount(cartNum);
		};
		loadAll();
	}, []);

	return (
		<div className={styles.ShopPage}>
			<NavBar className={styles.NavBar} />
			<ItemsFound />
			<ProductGridContainer />
			<Footer />
		</div>
	);
};

export default ShopPage;
