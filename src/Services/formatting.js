export const formatPrice = (price) => {
	return price.toFixed(2);
};

// const noDecimalPlaces = (num) => {
// 	const number = "" + num;
// 	if (number.indexOf(".") === -1) {
// 		return 0;
// 	}
// 	const decimalIndex = number.split("").indexOf(".");
// 	return number.slice(decimalIndex + 1).length;
// };

export const makeSentenceCase = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1, string.length);
};
