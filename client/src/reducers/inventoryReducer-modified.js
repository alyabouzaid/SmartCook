const initialInventoryState = {
  inventory: [],
};

export default function ingredientInventoryModifiedReducer(
  state = initialInventoryState,
  action
) {
  switch (action.type) {
    case "LOAD_ALL":
      return {
        ...state,
        inventory: action.payload,
      };
    default:
      return state;
  }
}
