export const addingIngredient= amount => {
	return {
		type: 'ADD_INGREDIENT',
		addingIngredient: amount
	};
};


export const clearIngredients = amount => {
	return {
		type: 'CLEAR_INGREDIENT',
		clearIngredients: amount
	};
};