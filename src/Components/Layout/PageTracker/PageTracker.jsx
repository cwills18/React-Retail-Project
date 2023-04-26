import React from "react";
import styles from "./PageTracker.module.scss";

const PageTracker = ({ handlePageFirst, handlePageDecrement, handlePageIncrement, handlePageLast, pageNum, productNum }) => {
	return (
		<div className={styles.PageSelector}>
			<button className={styles.PageSelector_Btn} onClick={handlePageFirst}>
				&lt; &lt;
			</button>
			<button className={styles.PageSelector_Btn} onClick={handlePageDecrement}>
				&lt;
			</button>
			<p className={styles.PageSelector_Text}>
				Page {pageNum + 1} of {Math.ceil(productNum / 50)}
			</p>
			<button className={styles.PageSelector_Btn} onClick={handlePageIncrement}>
				&gt;
			</button>
			<button className={styles.PageSelector_Btn} onClick={handlePageLast}>
				&gt; &gt;
			</button>
		</div>
	);
};

export default PageTracker;
