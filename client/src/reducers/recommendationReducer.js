const initialState = {
    hits: [],
    recipes: [],
    popular: [],
};

export default function recommendationReducer(state = initialState, action){
    switch (action.type){
        case 'NEW_RECOMMENDATION':
            return {...state, hits: action.payload["hits"]};
        case 'RECIPES_ADD':
            return {...state, recipes: [...state.recipes, action.payload]};
        case 'RECIPES_LOAD':
            return {...state, recipes: action.payload};
        case 'RECIPES_POPULAR':
            return {...state, popular: action.payload};
        case 'RECIPES_DELETE_ONE':
            return {...state, recipes: state.recipes.filter((recipe) => recipe._id !== action.payload)};
        case 'CLEAR_RECOMMENDATION':
            return initialState;
        default:
            return state;
    }

}
