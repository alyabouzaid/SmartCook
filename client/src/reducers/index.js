import {combineReducers} from "redux";
import ingredientInventoryReducer from "./ingredientInventoryReducer";
import recommendationReducer from "./recommendationReducer";
import journalEditorReducer from "./journalEditorReducer";
import journalsReducer from "./journalsReducer";
import userReducer from "./userReducer";
import foodPicturesReducer from "./foodPicturesReducer";
import recommendationFilterReducer from "./recommendationFilterReducer";
import colorReducer from "./colorReducer";
import filterReducer from "./filterReducer";
import ingredientAmountReducer from "./ingredientAmountReducer";


export default combineReducers({
    ingredientInventory: ingredientInventoryReducer,
    recommendationStore: recommendationReducer,
    recommendationFilterStore: recommendationFilterReducer,
    journalEditorStore: journalEditorReducer,
    journalsStore: journalsReducer,
    userStore: userReducer,
    foodPicturesStore: foodPicturesReducer,
    colorStore: colorReducer,
    filterStore: filterReducer,
    ingredientAmountStore: ingredientAmountReducer,
});
