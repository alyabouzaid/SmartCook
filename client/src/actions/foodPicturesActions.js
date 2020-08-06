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
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post("/images/image-upload", formData);
      const imageData = await res.data;
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

export const createNewFoodPicPost = (
    description,
    imageData,
    email,
    userFirstName,
    userFullName,
    googleDefaultPic,
    userUploadedPic
) => {
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
      const res = await axios.post("/foodPictures/addPost", params);
      const newFoodPicPost = await res.data;
      await dispatch(addNewFoodPicPost(newFoodPicPost));
      toast.success("A new food picture post is added!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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
  return {
    type: "ADD_NEW_FOODPIC_POST",
    payload: newFoodPicPost,
  };
};

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
  return async (dispatch) => {
    try {
      dispatch(myFoodPicPostLoading());
      const userData = await axios.get("/auth/user");
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

export const getFeaturedFoodPicPost = () => {
  return async (dispatch) => {
    try {
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

export const addLike = (idPayload, email, name) => {
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
    }
  };
};

export const addComment = (
    idPayload,
    comment,
    userFirstName,
    userFullName,
    email,
    googleDefaultPic,
    userUploadedPic
) => {
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
  return {
    type: "ADD_UPDATED_FOODPIC_POST",
    payload: updatedFoodPicPost,
  };
};

export const deleteOneFoodPicPost = (idPayload, email) => {
  return async (dispatch) => {
    try {
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
