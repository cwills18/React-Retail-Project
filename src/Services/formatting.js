export const formatPrice = (price) => {
	// console.log(price);
	let hasDecimal = price - Math.floor(price) !== 0;
	// console.log("hasDecimal", hasDecimal);
	if (!hasDecimal) {
		return `${price}.00`;
	} else {
		const priceBy10 = price * 10;
		// console.log("priceby10 is", priceBy10);
		let hasOneDecimal = priceBy10 - Math.floor(priceBy10) === 0;
		// console.log("has 1 decimal", hasOneDecimal);
		if (hasOneDecimal) {
			return `${price}0`;
		} else {
			//The computer rounding issues have occasionally caused a bug with an extra 0 missing, the following code is what I have started working
			//on - to be completed at a later date

			// const roundPrice = Math.round(price * 100) / 100;
			// const string = "" + roundPrice;
			// const deconstructedPrice = string.split(".");
			// const decimal = deconstructedPrice[1];
			/* 	if (decimal.length < 2) {
				decimal += "0";
			} */
			// console.log(decimal);
			return Math.round(price * 100) / 100;
		}
	}
};

export const makeSentenceCase = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1, string.length);
};
