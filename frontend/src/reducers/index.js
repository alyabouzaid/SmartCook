import { combineReducers } from 'redux';
import formReducer from "./formReducer";
import ingrecientInventoryReducer from "./ingredientInventoryReducer";

export default combineReducers({
    formStore: formReducer,
    ingredientInventory: ingrecientInventoryReducer,
});