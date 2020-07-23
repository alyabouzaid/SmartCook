const initialState = false;

export default function colorReducer(state = initialState, action) {
    if (action.type === "COLOR_MODE") {
        return action.payload;
    } else {
        return state;
    }
}