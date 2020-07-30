import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const uploadImageAndCreatePost = (
  description,
  image,
  email,
  userFirstName,
  userFullName,
  googleDefaultPic,
  userUploadedPic
) => {
  console.log("in getImage and createPost ", JSON.stringify(googleDefaultPic));
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const res = await axios.post("/images/image-upload", formData);
      const imageData = await res.data;
      console.log("image data: ", JSON.stringify(imageData));
      console.log("single image data: ", JSON.stringify(imageData[0]));

      dispatch(
        createNewFoodPicPost(
          description,
          imageData,
          email,
          userFirstName,
          userFullName,
          googleDefaultPic,
          userUploadedPic
        )
      );
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

// post request
export const createNewFoodPicPost = (
  description,
  imageData,
  email,
  userFirstName,
  userFullName,
  googleDefaultPic,
  userUploadedPic
) => {
  // console.log("in createNewFoodPic");
  // console.log("description: ", JSON.stringify(description));
  // console.log("image: ", JSON.stringify(imageData));
  // console.log("username: ", JSON.stringify(username));
  console.log("in createNewPost ", JSON.stringify(googleDefaultPic));
  return async (dispatch) => {
    try {
      const params = {
        description: description,
        image: imageData,
        email: email,
        userFirstName: userFirstName,
        userFullName: userFullName,
        googleDefaultPic: googleDefaultPic,
        userUploadedPic: userUploadedPic,
      };
      // console.log("create post waiting before");
      // dispatch(postMessagePostingsLoading());
      const res = await axios.post("/foodPictures/addPost", params);
      // console.log("create post waiting");
      const newFoodPicPost = await res.data;
      await dispatch(addNewFoodPicPost(newFoodPicPost));
      toast.success("A new food picture post is added!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      // setTimeout(() => {
      //   window.location = "/foodPicAllPost";
      // }, 2000);
      // console.log("in all pic view page");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

export const addNewFoodPicPost = (newFoodPicPost) => {
  // console.log("this is to message list: " + JSON.stringify(newPosting));
  // console.log("in addNewFoodPic: " + JSON.stringify(newFoodPicPost));
  return {
    type: "ADD_NEW_FOODPIC_POST",
    payload: newFoodPicPost,
  };
};

// get all food pic post request for food post page
export const getAllFoodPicPost = () => {
  return async (dispatch) => {
    try {
      dispatch(allFoodPicPostLoading());
      const res = await axios.get("/foodPictures/allPost");

      const allPosts = await res.data;
      dispatch(loadAllFoodPicPost(allPosts));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const allFoodPicPostLoading = () => {
  return {
    type: "ALL_FOODPIC_POSTS_LOADING",
  };
};

export const loadAllFoodPicPost = (posts) => {
  return {
    type: "LOAD_ALL_FOODPIC_POSTS",
    payload: posts,
  };
};

export const getMyFoodPicPost = () => {
  // console.log("action email: ", email);
  return async (dispatch) => {
    try {
      dispatch(myFoodPicPostLoading());
      const userData = await axios.get("/auth/user");
      // console.log("userData: ", JSON.stringify(userData.data.email));

      const res = await axios.get(`/foodPictures/myPost`, {
        params: {
          email: userData.data.email,
        },
      });
      const myPosts = await res.data;
      dispatch(loadMyFoodPicPost(myPosts));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const myFoodPicPostLoading = () => {
  return {
    type: "MY_FOODPIC_POSTS_LOADING",
  };
};

export const loadMyFoodPicPost = (myPosts) => {
  return {
    type: "LOAD_MY_FOODPIC_POSTS",
    payload: myPosts,
  };
};

// get one food pic post with highest like to feature on landing page
export const getFeaturedFoodPicPost = () => {
  return async (dispatch) => {
    try {
      // await dispatch(loadingAllFoodPicPost());
      const res = await axios.get("/foodPictures/featuredPost");

      const featuredPosts = await res.data;
      dispatch(loadFeaturedPicPost(featuredPosts));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const loadFeaturedPicPost = (posts) => {
  return {
    type: "LOAD_FEATURED_FOODPIC_POSTS",
    payload: posts,
  };
};

//update like request
export const addLike = (idPayload, email, name) => {
  // console.log("like");
  return async (dispatch) => {
    try {
      const params = {
        email: email,
        name: name,
      };
      const res = await axios.put(`/foodPictures/addLike/${idPayload}`, params);
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("Error: ", error);
      if (error instanceof TypeError) {
        toast.error("Cannot like the same post twice", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      } else {
        console.log("Error: ", error);
        toast.error("API error", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
      // console.log("error", error);
      // toast.error("API error", {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 3000,
      // });
    }
  };
};

//update comment request
export const addComment = (
  idPayload,
  comment,
  userFirstName,
  userFullName,
  email,
  googleDefaultPic,
  userUploadedPic
) => {
  // console.log("comment");
  return async (dispatch) => {
    try {
      const params = {
        comment: comment,
        userFirstName: userFirstName,
        userFullName: userFullName,
        email: email,
        googleDefaultPic: googleDefaultPic,
        userUploadedPic: userUploadedPic,
      };
      const res = await axios.put(
        `/foodPictures/addComment/${idPayload}`,
        params
      );
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const editPostDescription = (idPayload, editedPostDescription) => {
  // console.log("like");
  return async (dispatch) => {
    try {
      const params = {
        editedPostDescription: editedPostDescription,
      };
      const res = await axios.put(
        `/foodPictures/editDescription/${idPayload}`,
        params
      );
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const editPostComment = (idPayload, commentId, editedComment) => {
  // console.log("editedComment: ", commentId, editedComment);
  return async (dispatch) => {
    try {
      const params = {
        commentId: commentId,
        editedComment: editedComment,
      };
      const res = await axios.put(
        `/foodPictures/editComment/${idPayload}`,
        params
      );
      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const deleteComment = (idPayload, commentId) => {
  // console.log("editedComment: ", commentId, editedComment);
  return async (dispatch) => {
    try {
      const params = {
        commentId: commentId,
      };
      const res = await axios.put(
        `/foodPictures/deleteComment/${idPayload}`,
        params
      );

      const updatedFoodPicPost = await res.data;
      dispatch(addUpdatedFoodPicPost(updatedFoodPicPost));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
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
export const deleteOneFoodPicPost = (idPayload, email) => {
  return async (dispatch) => {
    try {
      // console.log("in action1:", idPayload);
      // console.log("in action2:", email);

      const res = await axios.delete(`/foodPictures/deletePost/${idPayload}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
        },
      });
      dispatch(deleteOne(idPayload));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
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
      await axios.delete("/foodPictures/deleteAll");

      dispatch(deleteAll());
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const deleteAll = () => {
  return {
    type: "DELETE_ALL_FOODPIC_POSTS",
  };
};
