const initialState = "";

export default function formReducer(state = initialState, action){
    switch (action.type){
        case 'JOURNAL_EDITOR':
            return action.payload;
        default:
            return state;
    }

}
