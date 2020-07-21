const initialState = {

};

export default function recommendationReducer(state = initialState, action){
    switch (action.type){
        case 'NEW_RECOMMENDATION':
            return action.payload;
        case 'CLEAR_RECOMMENDATION':
            return initialState;
        default:
            return state;
    }

}
