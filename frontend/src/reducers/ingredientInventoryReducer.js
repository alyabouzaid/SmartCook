


export default function counterMessagesReducer (ingredientInventory = [
	{	
		"key": 0,
		"description": "Tomato",
		"amount" : 2
	},
	{	
		"key":1,
		"description": "apples",
		"amount":3

	}
	], action)  {
	if (action.type === 'ADD_INGREDIENT') {

		return [...ingredientInventory, action.addingIngredient];

	}

	if (action.type === 'CLEAR_INGREDIENT') {

		return [];

	}
	console.log(ingredientInventory);

	return ingredientInventory;
};




