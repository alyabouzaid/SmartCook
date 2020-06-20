
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

export default function counterMessagesReducer (ingredientInventory = [
	{
		"key": 0,
		"description": "Tomato",
		"amount" : 2,
		"selected": false
	},
	{
		"key":1,
		"description": "Apple",
		"amount": 3,
		"selected": true

	}
	], action)  {
	if (action.type === 'ADD_INGREDIENT') {
		console.log(ingredientInventory.type);
        let entry = action.addingIngredient;                    // Rick Edited to add selected property
        entry["selected"] = false;
		return [...ingredientInventory, entry];

	}

	if (action.type === 'CLEAR_INGREDIENT') {

		return [];

	}

	if (action.type === 'DELETE_INGREDIENT') {

		let temp = ingredientInventory.slice()
		temp = removeByAttr(temp, "key", action.deleteIngredient);

		return temp;

	}

	if (action.type === 'SELECT_INGREDIENT'){         // Rick Edited to add selected property
	   ingredientInventory.forEach(item => {if (item.key === action.payload) {item.selected = !item.selected}});
       return [...ingredientInventory];
	}

	console.log(ingredientInventory);

	return ingredientInventory;
};




