export const selectingIngredient = key => {
	return {
		type: 'SELECT_INGREDIENT',
		payload: key
	};
};
