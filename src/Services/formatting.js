export const formatPrice = (price) => {
	let hasDecimal = price - Math.floor(price) !== 0;
	if (!hasDecimal) {
		return `${price}.00`;
	} else {
		let priceBy10 = price * 10;
		let hasOneDecimal = priceBy10 - Math.floor(priceBy10) === 0;
		if (hasOneDecimal) {
			return `${price}0`;
		} else {
			return Math.round(price * 100) / 100;
		}
	}
};

export const makeSentenceCase = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1, string.length);
};
