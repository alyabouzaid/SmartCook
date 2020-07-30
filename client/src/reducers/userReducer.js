const initialState = {
  isLoggedIn: false,
  firstName: "",
  email: "",
  fullName: "",
  googleDefaultPic: "",
  userUploadedPic: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOAD":
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        fullName: action.payload.fullName,
        googleDefaultPic: action.payload.googleDefaultPic,
        isLoggedIn: true,
      };
    case "ADD_PROFILE_PIC":
      return {
        ...state,
        userUploadedPic: action.payload,
      };
    default:
      return state;
  }
}
