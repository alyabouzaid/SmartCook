import { combineReducers } from "redux";
import formReducer from "./formReducer";
import ingrecientInventoryReducer from "./ingredientInventoryReducer";
import recommendationReducer from "./recommendationReducer";
import journalEditorReducer from "./journalEditorReducer";
import journalsReducer from "./journalsReducer";
import userReducer from "./userReducer";
import foodPicturesReducer from "./foodPicturesReducer";

export default combineReducers({
  formStore: formReducer,
  ingredientInventory: ingrecientInventoryReducer,
  recommendationStore: recommendationReducer,
  journalEditorStore: journalEditorReducer,
  journalsStore: journalsReducer,
  userStore: userReducer,
  foodPicturesStore: foodPicturesReducer,
});
