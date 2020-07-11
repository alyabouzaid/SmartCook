const initialfoodPicPostState = {
  loading: false,
  foodPicPosts: [],
};

export default function foodPicturesReducer(
  state = initialfoodPicPostState,
  action
) {
  switch (action.type) {
    case "ADD_NEW_FOODPIC_POST":
      return {
        ...state,
        foodPicPosts: [...state.foodPicPosts, action.payload],
      };
    case "LOADING_ALL_FOODPIC_POSTS":
      return {
        ...state,
        loading: true,
      };
    case "LOAD_ALL_FOODPIC_POSTS":
      return {
        loading: false,
        foodPicPosts: action.payload,
      };
    case "ADD_UPDATED_FOODPIC_POST":
      return {
        loading: false,
        foodPicPosts: state.foodPicPosts.map((item) => {
          if (item._id == action.payload._id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "DELETE_ONE_FOODPIC_POST":
      return {
        loading: false,
        foodPicPosts: state.foodPicPosts.filter(
          (post) => post._id !== action.payload
        ),
      };
    case "DELETE_ALL_FOODPIC_POSTS":
      return {
        loading: false,
        foodPicPosts: [],
      };
    default:
      return state;
  }
}
