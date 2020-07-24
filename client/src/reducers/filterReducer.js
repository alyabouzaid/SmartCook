const initialState = [];

export default function filterReducer(state = initialState, action) {
    if (action.type === "ADD_FILTER") {
        return  action.payload;
    } else {
        return state;
    }
}