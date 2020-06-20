import { combineReducers } from 'redux';
import formReducer from "./formReducer";
import ingrecientInventoryReducer from "./ingredientInventoryReducer";
import recommendationReducer from "./recommendationReducer";

export default combineReducers({
    formStore: formReducer,
    ingredientInventory: ingrecientInventoryReducer,
    recommendationStore: recommendationReducer,
});
