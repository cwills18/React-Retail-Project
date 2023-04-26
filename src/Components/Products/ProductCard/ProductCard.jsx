import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { formatPrice } from "../../../Services/formatting.js";
import styles from "./ProductCard.module.scss";
import { UserContext } from "../../../Contexts/UserProvider.jsx";
import { checkIfFavourite, toggleFavourite } from "../../../Services/favouritesHandling.js";

const ProductCard = ({ product }) => {
	const { id, name, images, price } = product;
	const { user } = useContext(UserContext);
	const formattedPrice = formatPrice(price);
	const [isFavourite, setIsFavourite] = useState(false);
	const favouriteClasses = isFavourite ? styles.Favourited_Star_Checked : styles.Favourited_Star_Unchecked;
	const handleFavourite = () => {
		toggleFavourite(user, product);
		setIsFavourite(!isFavourite);
	};

	useEffect(() => {
		const wrapper = async () => {
			const result = await checkIfFavourite(user, product);
			setIsFavourite(result);
		};
		wrapper();
	}, []);

	useEffect(() => {}, [isFavourite]);

	return (
		<>
			<div className={styles.ProductCard}>
				{images && (
					<div className={styles.ProductImgHolder}>
						<img className={styles.ProductImgHolder_Img} src={images[0]} />
						<div className={styles.Favourited_Container}>
							<p className={favouriteClasses} onClick={handleFavourite}>
								&#9733;
							</p>
						</div>
					</div>
				)}
				<h4 className={styles.ProductName}>{name}</h4>
				<p className={styles.ProductPrice}>${formattedPrice}</p>
				<NavLink to={`/${id}`} className={styles.NavLink}>
					<button className={styles.BuyNow}>Buy Now</button>
				</NavLink>
			</div>
		</>
	);
};

export default ProductCard;
