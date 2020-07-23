const initialState = {
    author: "",
    title: "",
    body: "",
    images: [],
    initialData: ""
};

const parseRecipe = (recipe) => {
  let link = `<a href=${recipe.url}> ${recipe.url} </a>`;
  let ingredients = recipe.ingredientLines.map(ingredient => `<p>${ingredient}</p>`);
  let healthLabels = recipe.healthLabels.map(label => `<p>${label}</p>`);
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
            return {...state, title: action.payload.label, images: [{secure_url: action.payload.image}], initialData: parseRecipe(action.payload)};
        case 'JOURNAL_EDITOR_SUBMIT':
            return initialState;
        default:
            return state;
    }

}
