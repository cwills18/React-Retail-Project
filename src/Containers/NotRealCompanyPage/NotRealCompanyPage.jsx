import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./NotRealCompanyPage.module.scss";
import Footer from "../../Components/Footer/Footer";

const NotRealCompanyPage = () => {
	return (
		<div className={styles.Page}>
			<NavBar />
			<div className={styles.Main}>
				<h1 className={styles.Heading}>Oops!</h1>
				<p className={styles.Para}>
					Unfortunately, that link doesn't exist right now, because this isn't a real company and website that you can
					actually make purchases from.
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default NotRealCompanyPage;
