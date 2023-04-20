import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Containers/HomePage/HomePage";
import ShopPage from "./Containers/ShopPage/ShopPage";
import ProductPage from "./Containers/ProductPage/ProductPage";
import CheckoutPage from "./Containers/CheckoutPage/CheckoutPage";
import SearchProvider from "./Contexts/SearchProvider";
import ProductsProvider from "./Contexts/ProductsProvider";
import ShoppingCartProvider from "./Contexts/ShoppingCartProvider";
import NotRealCompanyPage from "./Containers/NotRealCompanyPage/NotRealCompanyPage";

function App() {
	return (
		<ProductsProvider>
			<SearchProvider>
				<ShoppingCartProvider>
					<HashRouter>
						<div className="App"></div>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/shop" element={<ShopPage />} />
							<Route path="/checkout" element={<CheckoutPage />} />
							<Route path="/:id" element={<ProductPage />} />
							<Route path="/not-a-real-company" element={<NotRealCompanyPage />} />
						</Routes>
					</HashRouter>
				</ShoppingCartProvider>
			</SearchProvider>
		</ProductsProvider>
	);
}

export default App;
