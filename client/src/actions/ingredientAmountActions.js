

import { editingIngredient } from "./ingredientInventoryActions";
import { toast } from 'react-toastify';
import React from 'react';


export const getRecipeIngredients = (ingredientLinesArray,email,ingredientInventory) => {
	return async (dispatch) => {
	  try {
        let retArray = []
        retArray =  ingredientLinesArray.map((item) =>    {
            return fetch(`https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${item.replace(/ /g,"%20")}&app_id=bcf76032&app_key=935b4ba268d89ad8e604ad7e26c4187e`).then(ret => ret.json().then(ret => ret))
        })

        let foodNameArray = []
        let foodAmountArray = []

        Promise.all(retArray).then(ret => {
            foodAmountArray = ret.map((item) => item.parsed[0].quantity) 
            foodNameArray = ret.map((item) => item.parsed[0].food.label)})
        // .then(ret => dispatch(getRecipeIngredientsDispatch(foodNameArray)))
        .then(res => 
            
            {
                let arr = Array.from(Array(foodNameArray.length).keys())
                let foodNamesString = []
                let missingFoodNamesString =[]

                arr.map(item => {
                    let tempArray = ingredientInventory.filter(inventory => {
                        if(inventory.description === foodNameArray[item]){
                            if(!(-foodAmountArray[item]+inventory.amount <0)){
                            foodNamesString.push(foodNameArray[item])
                            return true
                            }
                        } 
                    })
                    
                    if(tempArray.length ===0){
                        missingFoodNamesString.push(foodNameArray[item]) 
                    }
                    return item})

                toast.success(<div>Items used from inventory:      
                    <br />       {foodNamesString.map(item =><div> {item} <br /></div>  )}     </div>, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                });

                toast.error(<div>Items with no enough found in inventory:       
                    <br />       {missingFoodNamesString.map(item =><div> {item} <br /></div>  )}     </div>, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: false
                });

                arr.map(index =>
                    dispatch(editingIngredient(
                {"email": email,
                 "description":[foodNameArray[index]],
                 "amount":-foodAmountArray[index]
                    }, ingredientInventory)))
        })


	  } catch (error) {
		console.log("Error: ", error);
	  }
	};
  };




export const getRecipeIngredientsDispatch = (filter) => {
    return {
        type: 'GET_RECIPE_INGREDIENTS',
        payload: filter
    };
};