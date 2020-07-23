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



export const addingIngredient = emailAndIngredientObject => {
	return async (dispatch) => {
	  try {

		axios({url:'/inventories',method:'POST',data:emailAndIngredientObject})
		.then(res => console.log(res))
		.catch(err => console.log(err))
		
		dispatch(addingIngredientDispatch(emailAndIngredientObject.inventory[0]));

	  } catch (error) {
		console.log("Error: ", error);
	  }
	};
  };


export const addingIngredientDispatch= ingredient => {
	return {
		type: 'ADD_INGREDIENT',
		addingIngredient: ingredient
	};
};



export const clearIngredients = email => {
	return async (dispatch) => {
	  try {

		axios({url:'/inventories/'+ email, method:'DELETE'})
		.then(res => console.log(res))
		.catch(err => console.log(err))

		dispatch(clearIngredientsDispatch());

	  } catch (error) {
		console.log("Error: ", error);
	  }
	};
  };



export const clearIngredientsDispatch = () => {
	return {
		type: 'CLEAR_INGREDIENT'};
};



export const deleteIngredient = (emailAndKeyObject,ingredientInventory) => {
	return async (dispatch) => {
	  try {

		axios({url:'/inventories/'+ emailAndKeyObject.email +'/'+ emailAndKeyObject.key, method:'DELETE'})
		.then(res => console.log(res))
		.catch(err => console.log(err))

		let inventoryTemp = ingredientInventory.slice()
		inventoryTemp = removeByAttr(inventoryTemp, "key", emailAndKeyObject.key);
  

		dispatch(loadAllInventory(inventoryTemp));

	  } catch (error) {
		console.log("Error: ", error);
	  }
	};
  };



export const initialData = () => {
	return async (dispatch) => {
	  try {
		const userData = await axios.get("/auth/user");
  
		const res = await axios.get(`/inventories/${userData.data.email}`);
  
		const inventory = await res.data;

		if(!Array.isArray(inventory)){
			inventory =[]
		}

		dispatch(loadAllInventory(inventory));

	  } catch (error) {
		console.log("Error: ", error);
	  }
	};
  };

export const loadAllInventory = (inventory) => {
	return {
		type: 'LOAD_ALL_INVENTORY',
		payload: inventory
	};
};
