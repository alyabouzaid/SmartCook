const initialState = [];

export default function ingredientAmountReducer(state = initialState, action) {
    if (action.type === "GET_RECIPE_INGREDIENTS") {
        return  action.payload;
    } else {
        return state;
    }
}