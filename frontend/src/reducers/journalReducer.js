const initialState = {
    author: "",
    title: "",
    body: "",
    images: [],
};

export default function formReducer(state = initialState, action){
    switch (action.type){
        case 'JOURNAL_EDITOR':
            return {...state, body: action.payload};
        case 'JOURNAL_ADD_IMAGE':
            return {...state, images: [...state.images, action.payload]};
        default:
            return state;
    }

}
