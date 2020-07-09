export const getRecommendation = (ingredients) => {
	return async dispatch => {
		fetch("http://localhost:9000/recipes/recommendation", {
			method: 'POST',
			body: JSON.stringify({ingredients: ingredients}),
			headers: {'Content-Type': 'application/json'},
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
