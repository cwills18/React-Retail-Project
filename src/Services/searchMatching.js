export const foundInName = (searchInput, obj) => {
	const searchTerms = searchInput.toLowerCase().split(" ");
	const name = obj.name.toLowerCase();
	const result1 = searchTerms.some((search) => name.includes(search));
	//check if word was singular and needs to be plural
	const result2 = searchTerms.some((search) => name.includes(search + "s"));
	//check if word was plural and needs to be singular
	const result3 = getSingularWords(searchTerms).some((search) => name.includes(search));
	return result1 || result2 || result3;
};

export const foundInDescription = (searchInput, obj) => {
	console.log(obj.name);
	const searchTerms = searchInput.toLowerCase().split(" ");
	const descriptionArray = obj.description.toLowerCase().split(" ");
	const result1 = searchTerms.some((search) => descriptionArray.includes(search));
	//check if word was singular and needs to be plural
	const result2 = searchTerms.some((search) => descriptionArray.includes(search + "s"));
	//check if word was plural and needs to be singular
	const result3 = getSingularWords(searchTerms).some((search) => descriptionArray.includes(search));
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

const getSingularWords = (stringArray) => {
	let singularWords = [];
	stringArray.forEach((search) => {
		if (search.charAt(search.length - 1) === "s") {
			singularWords.push(search.slice(0, search.length - 1));
		} else {
			singularWords.push(search);
		}
	});
	return singularWords;
};
