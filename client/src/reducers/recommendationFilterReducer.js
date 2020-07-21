const initialState = {
    diet: "balanced",
    calories: 1500,
    time: 100,
    healthType: "alcohol-free",
};

export default function recommendationReducer(state = initialState, action){
    switch (action.type){
        case 'HEALTH_ENUM':
            return {...state, healthType: action.payload};
        case 'DIET_ENUM':
            return {...state, diet: action.payload};
        case 'CALORIES_RANGE':
            return {...state, calories: action.payload};
        case 'TIME_RANGE':
            return {...state, time: action.payload};
        default:
            return state;
    }

}
