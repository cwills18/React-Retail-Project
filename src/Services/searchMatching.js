export const foundInName = (searchInput, obj) => {
	const searchTerms = searchInput.toLowerCase().split(" ");
	const name = obj.name.toLowerCase();
	const result1 = searchTerms.some((search) => name.includes(search));
	//check if word was plural and needs to be singular
	const result2 = searchTerms.some((search) => name.includes(search.slice(0, search.length - 1)));
	//check if word was singular and needs to be plural
	const result3 = searchTerms.some((search) => name.includes(search + "s"));
	return result1 || result2 || result3;
};

export const foundInDescription = (searchInput, obj) => {
	const searchTerms = searchInput.toLowerCase().split(" ");
	const description = obj.description.toLowerCase();
	const result1 = searchTerms.some((search) => description.includes(search));
	//check if word was plural and needs to be singular
	const result2 = searchTerms.some((search) => description.includes(search.slice(0, search.length - 1)));
	//check if word was singular and needs to be plural
	const result3 = searchTerms.some((search) => description.includes(search + "s"));
	return result1 || result2 || result3;
};

export const foundInCategories = (searchInput, obj) => {
	const searchTerms = searchInput.toLowerCase().split(" ");
	const categories = obj.categories;
	const result1 = searchTerms.some((search) => categories.includes(search));
	//check if words are possibly singular and need to be pluralised to match categories in database
	const result2 = searchTerms.some((search) => categories.includes(search + "s"));
	return result1 || result2;
};

export const foundInColours = (searchInput, obj) => {
	if (!obj.colours) {
		return false;
	} else {
		const colours = obj.colours;
		const searchTerms = searchInput.toLowerCase().split(" ");
		const result = searchTerms.some((search) => colours.includes(search));
		return result;
	}
};
