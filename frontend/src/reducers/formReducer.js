import {formConstants} from '../actions/index'

const initialState = {
    name: "",
    message: "",
};

export default function formReducer(state = initialState, action){
    switch (action.type){
        case formConstants.FORM_UPDATE_NAME:
            return {...state, name: action.payload};
        case formConstants.FORM_UPDATE_MESSAGE:
            return {...state, message: action.payload};
        case formConstants.FORM_SUBMIT:
            return initialState;
        case formConstants.FORM_CLEAR:
            return initialState;
        default:
            return state;
    }

}