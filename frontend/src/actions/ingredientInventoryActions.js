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


export const editIngredients = amount => {
	return {
		type: 'EDIT_INGREDIENT',
		editIngredients: amount
	};
};