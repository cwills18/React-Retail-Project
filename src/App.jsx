import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Containers/HomePage/HomePage";
import ShopPage from "./Containers/ShopPage/ShopPage";
import ProductPage from "./Containers/ProductPage/ProductPage";
import CheckoutPage from "./Containers/CheckoutPage/CheckoutPage";
import SearchProvider from "./Contexts/SearchProvider";
import ShoppingCartProvider from "./Contexts/ShoppingCartProvider";

function App() {
	return (
		<SearchProvider>
			<ShoppingCartProvider>
				<HashRouter>
					<div className="App"></div>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/shop" element={<ShopPage />} />
						<Route path="/checkout" element={<CheckoutPage />} />
						<Route
							path="/:id
        "
							element={<ProductPage />}
						/>
					</Routes>
				</HashRouter>
			</ShoppingCartProvider>
		</SearchProvider>
	);
}

export default App;
