const initialState = { isAuthenticated: false, name: "", email: "" };

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case "USER_LOAD":
//       return {
//         ...state,
//         isAuthenticated: action.payload.isLoggedIn,
//         name: action.payload.firstName,
//         email: action.payload.email,
//       };
//     default:
//       return state;
//   }
// }

export default function userReducer(state = initialState, action) {
  if (action.type === "USER_LOAD") {
    return action.payload;
  } else {
    return state;
  }
}
