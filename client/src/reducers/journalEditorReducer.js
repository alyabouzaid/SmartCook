const initialState = {
    author: "",
    title: "",
    body: "",
    images: [],
};

export default function formReducer(state = initialState, action){
    switch (action.type){
        case 'JOURNAL_EDITOR_BODY':
            return {...state, body: action.payload};
        case 'JOURNAL_EDITOR_ADD_IMAGE':
            return {...state, images: [...state.images, action.payload]};
        case 'JOURNAL_EDITOR_TITLE':
            return {...state, title: action.payload};
        case 'JOURNAL_EDITOR_SUBMIT':
            return initialState;
        default:
            return state;
    }

}
