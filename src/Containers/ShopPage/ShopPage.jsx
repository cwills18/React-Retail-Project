import React, { useContext, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./ShopPage.module.scss";
import ItemsFound from "../../Components/ItemsFound/ItemsFound";
import Footer from "../../Components/Footer/Footer";
import AddProductForm from "../../Components/AddProductForm/AddProductForm";
import { ProductsContext } from "../../Contexts/ProductsProvider";
import { getAllProducts } from "../../Services/products";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";

const ShopPage = () => {
	const { products, setProducts, setFoundItemCount } = useContext(ProductsContext);

	useEffect(() => {
		const loadAll = async () => {
			const data = await getAllProducts();
			setProducts(data);
			setFoundItemCount(data.length);
			console.log(data);
		};
		loadAll();
	}, []);

	return (
		<div className={styles.ShopPage}>
			<NavBar className={styles.NavBar} />
			<ItemsFound />
			<ProductGrid />
			<Footer />
		</div>
	);
};

export default ShopPage;
