import axios from "axios";

export const uploadImageAndCreatePost = (description, image, username) => {
  // console.log("in getImage and createPost");
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post(
        "http://localhost:9000/images/image-upload",
        formData
      );
      const imageData = await res.data;
      console.log("image data: ", JSON.stringify(imageData));
      dispatch(createNewFoodPicPost(description, imageData, username));
    } catch (error) {
      console.log("error", error);
    }
  };
};

// post request
export const createNewFoodPicPost = (description, imageData, username) => {
  // console.log("in createNewFoodPic");
  // console.log("description: ", JSON.stringify(description));
  // console.log("image: ", JSON.stringify(imageData));
  // console.log("username: ", JSON.stringify(username));
  return async (dispatch) => {
    try {
      const params = {
        description: description,
        image: imageData,
        user: username,
      };
      console.log("create post waiting before");
      // dispatch(postMessagePostingsLoading());
      const res = await axios.post(
        "http://localhost:9000/foodPictures/add",
        params
      );
      console.log("create post waiting");
      const newFoodPicPost = await res.data;
      await dispatch(addNewFoodPicPost(newFoodPicPost));
      window.location = "/foodPicAllView";
    } catch (error) {
      console.log("error", error);
    }
  };
};

// export const createNewFoodPicPost = (description, imageData, username) => {
//   console.log("in createNewFoodPic");
//   console.log("description: ", JSON.stringify(description));
//   console.log("image: ", JSON.stringify(imageData));
//   console.log("username: ", JSON.stringify(username));
//   return (dispatch) => {
//     const params = {
//       description: description,
//       image: imageData,
//       user: username,
//     };
//     console.log("create post waiting before");
//     console.log("params", JSON.stringify(params));

//     // dispatch(postMessagePostingsLoading());
//     axios
//       .post("http://localhost:9000/foodPictures/addPost", params)
//       .then((res) => {
//         console.log("create post waiting");
//         const newFoodPicPost = res.data;
//         dispatch(addNewFoodPicPost(newFoodPicPost));
//       })
//       .catch((error) => {
//         console.log("Error ", error);
//       });
//   };
// };

export const addNewFoodPicPost = (newFoodPicPost) => {
  // console.log("this is to message list: " + JSON.stringify(newPosting));
  console.log("in addNewFoodPic: " + JSON.stringify(newFoodPicPost));
  return {
    type: "ADD_NEW_FOODPIC_POST",
    payload: newFoodPicPost,
  };
};

export const getAllFoodPicPost = () => {
  return async (dispatch) => {
    try {
      await dispatch(loadingAllFoodPicPost());
      const res = await axios.get("http://localhost:9000/foodPictures/allpost");

      const allPosts = await res.data;
      dispatch(loadAllFoodPicPost(allPosts));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const loadingAllFoodPicPost = () => {
  return {
    type: "LOADING_ALL_FOODPIC_POSTS",
  };
};

export const loadAllFoodPicPost = (posts) => {
  return {
    type: "LOAD_ALL_FOODPIC_POSTS",
    payload: posts,
  };
};

//update like request
export const updateLike = (idPayload, username) => {
  // console.log("like");
  return async (dispatch) => {
    try {
      const params = {
        user: username,
      };
      const res = await axios.put(
        `http://localhost:9000/foodPictures/like/${idPayload}`,
        params
      );
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("error", error);
    }
  };
};

//update comment request
export const updateComment = (idPayload, comment, username) => {
  // console.log("comment");
  return async (dispatch) => {
    try {
      const params = {
        comment: comment,
        user: username,
      };
      const res = await axios.put(
        `http://localhost:9000/foodPictures/comment/${idPayload}`,
        params
      );
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addUpdatedFoodPicPost = (updatedFoodPicPost) => {
  // console.log("this is to message list: " + JSON.stringify(newPosting));
  // console.log("in addNewFoodPic: " + JSON.stringify(newFoodPicPost));
  return {
    type: "ADD_UPDATED_FOODPIC_POST",
    payload: updatedFoodPicPost,
  };
};

//Delete one post request
export const deleteOneFoodPicPost = (idPayload) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `http://localhost:9000/foodPictures/delete/${idPayload}`
      );
      dispatch(deleteOne(idPayload));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteOne = (idPayload) => {
  return {
    type: "DELETE_ONE_FOODPIC_POST",
    payload: idPayload,
  };
};

//Delete all posts request
export const deleteAllFoodPicPosts = () => {
  return async (dispatch) => {
    try {
      await axios.delete("http://localhost:9000/foodPictures/deleteAll");

      dispatch(deleteAll());
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const deleteAll = () => {
  return {
    type: "DELETE_ALL_FOODPIC_POSTS",
  };
};
