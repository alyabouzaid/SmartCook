
const queryBuilder = (ingredients) => {
	let items = ingredients.map((ingredient) => ingredient.description);
    let query = "q=";
    for (let i = 0; i < items.length; i++) {
       if(i === items.length - 1){
       	  query = query + items[i];
	   }else{
       	  query = query + items[i] + "%26";
	   }
	}
    console.log(query);
    return query;
};

export const getRecommendation = (ingredients) => {
	return async dispatch => {
		let query = queryBuilder(ingredients);
		fetch(`https://api.edamam.com/search?${query}&app_id=43011121&app_key` +
			"=8ded8a6fbd319218357df399687664aa&from=0&to=10&calories=591-722&health=alcohol-free", {
			method: 'GET',
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch(newRecommendation(res));
			})
	}
};

export const newRecommendation = (recommendation) => {
	return {
		type: 'NEW_RECOMMENDATION',
		payload: recommendation
	};
};

export const clearRecommendation = () => {
	return {
		type: 'CLEAR_RECOMMENDATION',
	};
};
