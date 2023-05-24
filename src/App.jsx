import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomePage from "./Containers/Pages/HomePage/HomePage";
import ShopPage from "./Containers/Pages/ShopPage/ShopPage";
import ProductPage from "./Containers/Pages/ProductPage/ProductPage";
import SavedItemsPage from "./Containers/Pages/SavedItemsPage/SavedItemsPage";
import CheckoutPage from "./Containers/Pages/CheckoutPage/CheckoutPage";
import NotRealCompanyPage from "./Containers/Pages/NotRealCompanyPage/NotRealCompanyPage";
import SearchProvider from "./Contexts/SearchProvider";
import ProductsProvider from "./Contexts/ProductsProvider";
import ShoppingCartProvider from "./Contexts/ShoppingCartProvider";
import UserProvider from "./Contexts/UserProvider";

function App() {
	return (
		<ProductsProvider>
			<UserProvider>
				<SearchProvider>
					<ShoppingCartProvider>
						<HashRouter>
							<div className="App"></div>
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/shop" element={<ShopPage />} />
								<Route path="/saved-items" element={<SavedItemsPage />} />
								<Route path="/checkout" element={<CheckoutPage />} />
								<Route path="/:id" element={<ProductPage />} />
								<Route path="/not-a-real-company" element={<NotRealCompanyPage />} />
								{/* doesn't work with HashRouter */}
								{/* <Route path="*" element={<NotRealCompanyPage />} /> */}
							</Routes>
						</HashRouter>
					</ShoppingCartProvider>
				</SearchProvider>
			</UserProvider>
		</ProductsProvider>
	);
}

export default App;
