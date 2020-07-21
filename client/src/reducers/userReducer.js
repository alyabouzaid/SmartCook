const initialState = {"isLoggedIn": false,"firstName": "","email": "", "fullName":""};

export default function userReducer(state = initialState, action) {
  if (action.type === "USER_LOAD") {
    return {...state, email: action.payload.email, firstName: action.payload.firstName, fullName: action.payload.fullName, isLoggedIn: true};
  } else {
    return state;
  }
}
