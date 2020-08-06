import axios from 'axios'



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


			let inventoryTemp = ingredientInventory.slice()

			inventoryTemp =   inventoryTemp.filter(item =>{

				if( emailAndKeyObject.key.includes(item.key)){

					axios({url:'/inventories/'+ emailAndKeyObject.email +'/'+ item.key, method:'DELETE'})
						.then(res => console.log(res))
						.catch(err => console.log(err))


					return false
				}
				return true})




			dispatch(loadAllInventory(inventoryTemp));

		} catch (error) {
			console.log("Error: ", error);
		}
	};
};


export const editingIngredient = (emailAndIngredientAndAmountObject,ingredientInventory) => {


	return async (dispatch) => {

		try {

			let inventoryTemp = ingredientInventory.slice()
			inventoryTemp =   inventoryTemp.map(item =>{

				if(emailAndIngredientAndAmountObject.description.includes(item.description)){
					if(!(item.amount+emailAndIngredientAndAmountObject.amount <0)){

						item.amount = item.amount + emailAndIngredientAndAmountObject.amount

						axios({url:'/inventories/edit',method:'POST',data:{
								email: emailAndIngredientAndAmountObject.email,
								description: item.description,
								amount: emailAndIngredientAndAmountObject.amount,
							}})
							.then(res => console.log(res))
							.catch(err => console.log(err))


					}
				}
				return item
			})


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


