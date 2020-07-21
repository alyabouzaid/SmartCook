import axios from 'axios'

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i]
           && arr[i].hasOwnProperty(attr)
           && (arguments.length > 2 && arr[i][attr] === value ) ){

           arr.splice(i,1);

       }
    }
    return arr;
}

export default function counterMessagesReducer (ingredientInventory = [], action)  {
	if (action.type === 'ADD_INGREDIENT') {
		axios({url:'/inventories',method:'POST',data:action.addingIngredient}).then(res => console.log(res)).catch(err => console.log(err))

		return [...ingredientInventory, action.addingIngredient.inventory[0]];

	}

	if (action.type === 'CLEAR_INGREDIENT') {
		axios({url:'/inventories/'+ action.clearIngredients, method:'DELETE'}).then(res => console.log(res)).catch(err => console.log(err))

		return [];

	}

	if (action.type === 'DELETE_INGREDIENT') {

		let temp = ingredientInventory.slice()
		temp = removeByAttr(temp, "key", action.deleteIngredient.key);
		axios({url:'/inventories/'+ action.deleteIngredient.email +'/'+ action.deleteIngredient.key, method:'DELETE'}).then(res => console.log(res)).catch(err => console.log(err))

		return temp;

	}

	if (action.type === 'SELECT_INGREDIENT'){         // Rick Edited to add selected property
	   ingredientInventory.forEach(item => {if (item.key === action.payload) {item.selected = !item.selected}});
       return [...ingredientInventory];
	}


	if (action.type === 'INITIALIZE_MESSAGES') {
		return action.payload;

	}

	console.log(ingredientInventory);

	return ingredientInventory;
};




