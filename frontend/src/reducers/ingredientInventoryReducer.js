
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
		"amount" : 2
	},
	{	
		"key":1,
		"description": "Apple",
		"amount":3

	}
	], action)  {
	if (action.type === 'ADD_INGREDIENT') {
		console.log(ingredientInventory.type);

		return [...ingredientInventory, action.addingIngredient];

	}

	if (action.type === 'CLEAR_INGREDIENT') {

		return [];

	}

	if (action.type === 'DELETE_INGREDIENT') {

		let temp = ingredientInventory.slice()
		temp = removeByAttr(temp, "key", action.deleteIngredient);

		return temp;

	}


	console.log(ingredientInventory);

	return ingredientInventory;
};




