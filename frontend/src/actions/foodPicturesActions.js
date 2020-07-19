import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const uploadImageAndCreatePost = (
  description,
  image,
  email,
  userFirstName,
  userFullName
) => {
  console.log("in getImage and createPost");
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
      dispatch(
        createNewFoodPicPost(
          description,
          imageData,
          email,
          userFirstName,
          userFullName
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
  userFullName
) => {
  // console.log("in createNewFoodPic");
  // console.log("description: ", JSON.stringify(description));
  // console.log("image: ", JSON.stringify(imageData));
  // console.log("username: ", JSON.stringify(username));
  return async (dispatch) => {
    try {
      const params = {
        description: description,
        image: imageData,
        email: email,
        userFirstName: userFirstName,
        userFullName: userFullName,
      };
      // console.log("create post waiting before");
      // dispatch(postMessagePostingsLoading());
      const res = await axios.post(
        "http://localhost:9000/foodPictures/add",
        params
      );
      // console.log("create post waiting");
      const newFoodPicPost = await res.data;
      await dispatch(addNewFoodPicPost(newFoodPicPost));
      toast.success("A new food picture post is addded!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location = "/foodPicAllView";
      }, 2000);
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
  console.log("in addNewFoodPic: " + JSON.stringify(newFoodPicPost));
  return {
    type: "ADD_NEW_FOODPIC_POST",
    payload: newFoodPicPost,
  };
};

// get all food pic post request for food post page
export const getAllFoodPicPost = () => {
  return async (dispatch) => {
    try {
      await dispatch(loadingAllFoodPicPost());
      const res = await axios.get("http://localhost:9000/foodPictures/allpost");

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

export const loadingAllFoodPicPost = () => {
  return {
    type: "FOODPIC_POSTS_LOADING",
  };
};

export const loadAllFoodPicPost = (posts) => {
  return {
    type: "LOAD_ALL_FOODPIC_POSTS",
    payload: posts,
  };
};

// get one food pic post with highest like to feature on landing page
export const getFeaturedFoodPicPost = () => {
  return async (dispatch) => {
    try {
      // await dispatch(loadingAllFoodPicPost());
      const res = await axios.get(
        "http://localhost:9000/foodPictures/featuredPost"
      );

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
export const updateLike = (idPayload, email) => {
  // console.log("like");
  return async (dispatch) => {
    try {
      const params = {
        email: email,
      };
      const res = await axios.put(
        `http://localhost:9000/foodPictures/like/${idPayload}`,
        params
      );
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
export const updateComment = (
  idPayload,
  comment,
  userFirstName,
  userFullName,
  email
) => {
  // console.log("comment");
  return async (dispatch) => {
    try {
      const params = {
        comment: comment,
        userFirstName: userFirstName,
        userFullName: userFullName,
        email: email,
      };
      const res = await axios.put(
        `http://localhost:9000/foodPictures/comment/${idPayload}`,
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
      console.log("in action1:", idPayload);
      console.log("in action2:", email);

      const res = await axios.delete(
        `http://localhost:9000/foodPictures/delete/${idPayload}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            email,
          },
        }
      );
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
      await axios.delete("http://localhost:9000/foodPictures/deleteAll");

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
