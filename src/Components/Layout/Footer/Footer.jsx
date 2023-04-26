import React from "react";
import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div className={styles.FooterContainer}>
			<div className={styles.Main}>
				<div className={styles.Subscribe}>
					<h4 className={styles.Main_Subheading}>STAY INFORMED</h4>
					<div className={styles.Subscribe_Signup}>
						<input className={styles.Subscribe_Signup_Input} type="text" />
						<NavLink to="/not-a-real-company">
							<button className={styles.Subscribe_Signup_Button} type="submit">
								Sign Up
							</button>
						</NavLink>
					</div>
					<p className={styles.Main_Para}>
						By entering your email address and submitting this form, you consent to receive emails (such as
						promotion codes and cart reminders) from Silly Socks at the email address provided. Consent is not a
						condition of any purchase. You can unsubscribe at any time by clicking the unsubscribe link in one of
						our emails.
					</p>
				</div>
				<div className={styles.Company}>
					<h4 className={styles.Main_Subheading}>COMPANY</h4>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						About Us
					</NavLink>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Sustainability Statement
					</NavLink>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Privacy Policy
					</NavLink>
				</div>
				<div className={styles.Support}>
					<h4 className={styles.Main_Subheading}>HELP & SUPPORT</h4>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Refund Policy
					</NavLink>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Shipping
					</NavLink>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Contact Us
					</NavLink>
					<NavLink to="/not-a-real-company" className={styles.Main_Links}>
						Terms and Conditions
					</NavLink>
				</div>
			</div>
			<div className={styles.BottomLine}>
				<p className={styles.BottomLine_Para}>© 2023 All Rights Reserved</p>
				<img className={styles.BottomLine_Logo} src="src/assets/sillySocksSingleLinePurple.png" />
				<div className={styles.BottomLine_SocialMedia}>
					<NavLink to="/not-a-real-company">
						<img
							className={styles.BottomLine_SocialMedia_Icon}
							src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
						/>
					</NavLink>
					<NavLink to="/not-a-real-company">
						<img
							className={styles.BottomLine_SocialMedia_Icon}
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png"
						/>
					</NavLink>
					<NavLink to="/not-a-real-company">
						<img
							className={styles.BottomLine_SocialMedia_Icon}
							src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
						/>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Footer;
