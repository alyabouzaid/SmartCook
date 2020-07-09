import axios from 'axios'


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


export const deleteIngredient = amount => {
	return {
		type: 'DELETE_INGREDIENT',
		deleteIngredient: amount
	};
};


export const initialData = () => {
	return  (dispatch) => {

    axios.get('http://localhost:9000/')
    .then(
		(res) => {
			console.log(2222222222222)
			console.log(res.data)
			dispatch(initialMessages(res.data))
	}
    )

	.catch(err => err)
	}
}

export const initialMessages = (recommendation) => {
	return {
		type: 'INITIALIZE_MESSAGES',
		payload: recommendation
	};
};