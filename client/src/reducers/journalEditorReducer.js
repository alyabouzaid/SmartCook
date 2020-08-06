const initialState = {
    _id: "",
    author: "",
    title: "",
    body: "",
    images: [],
    initialData: ""
};

const parseRecipe = (recipe) => {
    let link = `<a href=${recipe.url} target="_blank"> ${recipe.url} </a>`;
    let ingredients = '<ul>' + recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('') + '<ul>';
    let healthLabels ='<ul>' + recipe.healthLabels.map(label => `<li>${label}</li>`).join('') + '<ul>';
    let ret = link + ingredients + healthLabels;
    return ret;
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
            return {...state, title: action.payload.label, images: [{secure_url: action.payload.image}],
                body: parseRecipe(action.payload), initialData: parseRecipe(action.payload)};
        case 'JOURNAL_IMPORT':
            return {...state, _id: action.payload._id, author: action.payload.author, title: action.payload.title,
                body: action.payload.body, images: action.payload.images, initialData: action.payload.body};
        case 'JOURNAL_EDITOR_CLEAR':
            return initialState;
        default:
            return state;
    }

}
