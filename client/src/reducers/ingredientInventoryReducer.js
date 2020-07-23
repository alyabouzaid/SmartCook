import axios from 'axios'


export default function counterMessagesReducer (ingredientInventory = [], action)  {
	switch (action.type){
		
		case 'ADD_INGREDIENT': 
			return [...ingredientInventory, action.addingIngredient];
		case 'CLEAR_INGREDIENT': 
			return [];
		case 'SELECT_INGREDIENT':        // Rick Edited to add selected property
	 		  ingredientInventory.forEach(item => {if (item.key === action.payload) {item.selected = !item.selected}});
       		  return [...ingredientInventory];
		case  'LOAD_ALL_INVENTORY':
			return action.payload;
		default:
			return ingredientInventory;
	}
};




