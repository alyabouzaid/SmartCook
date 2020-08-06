const initialfoodPicPostState = {
  loadingAllPost: false,
  loadingMyPost: false,
  allPost: [],
  myPost: [],
  featuredPost: [],
};

export default function foodPicturesReducer(
    state = initialfoodPicPostState,
    action
) {
  switch (action.type) {
    case "ADD_NEW_FOODPIC_POST":
      return {
        ...state,
        allPost: [action.payload, ...state.allPost],
      };
    case "ALL_FOODPIC_POSTS_LOADING":
      return {
        ...state,
        loadingAllPost: true,
      };
    case "LOAD_ALL_FOODPIC_POSTS":
      return {
        ...state,
        loadingAllPost: false,
        allPost: action.payload,
      };
    case "MY_FOODPIC_POSTS_LOADING":
      return {
        ...state,
        loadingMyPost: true,
      };
    case "LOAD_MY_FOODPIC_POSTS":
      return {
        ...state,
        loadingMyPost: false,
        myPost: action.payload,
      };
    case "LOAD_FEATURED_FOODPIC_POSTS":
      return {
        ...state,
        featuredPost: action.payload,
      };
    case "ADD_UPDATED_FOODPIC_POST":
      return {
        ...state,
        allPost: state.allPost.map((item) => {
          if (item._id == action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        myPost: state.myPost.map((item) => {
          if (item._id == action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "DELETE_ONE_FOODPIC_POST":
      return {
        ...state,
        allPost: state.allPost.filter((post) => post._id !== action.payload),
        myPost: state.myPost.filter((post) => post._id !== action.payload),
      };
    case "DELETE_ALL_FOODPIC_POSTS":
      return {
        ...state,
        allPost: [],
        featuredPost: [],
        myPost: [],
      };
    default:
      return state;
  }
}
