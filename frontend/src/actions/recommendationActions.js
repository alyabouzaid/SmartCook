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
