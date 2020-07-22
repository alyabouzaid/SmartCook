const initialState = {
    author: "",
    title: "",
    body: "",
    images: [],
    initialData: ""
};

export default function formReducer(state = initialState, action){
    switch (action.type){
        case 'JOURNAL_EDITOR_BODY':
            return {...state, body: action.payload};
        case 'JOURNAL_EDITOR_ADD_IMAGE':
            return {...state, images: [...state.images, action.payload]};
        case 'JOURNAL_EDITOR_TITLE':
            return {...state, title: action.payload};
        case 'RECIPE_ANNOTATION':
            return {...state, title: action.payload.label, images: [{secure_url: action.payload.image}], initialData: action.payload.url + action.payload.ingredientLines};
        case 'JOURNAL_EDITOR_SUBMIT':
            return initialState;
        default:
            return state;
    }

}
