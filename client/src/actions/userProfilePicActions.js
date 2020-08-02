import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFoodPicPost } from "./foodPicturesActions";

export const uploadProfilePicImage = (image, email) => {
  // console.log("in profile pic ", JSON.stringify(image));
  // console.log("in profile pic email ", JSON.stringify(email));
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);

      const res = await axios.post("/images/image-upload", formData);
      const imageData = await res.data;
      const singleImageData = imageData[0];
      // console.log("image data: ", JSON.stringify(imageData));
      // console.log("single image: ", JSON.stringify(singleImageData));
      dispatch(addProfilePic(singleImageData, email));
      // dispatch(get());
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
};

export const addProfilePic = (uploadedImage, userEmail) => {
  return async (dispatch) => {
    try {
      const params = {
        image: uploadedImage.secure_url,
      };
      const res = await axios.put(`/userProfilePic/add/${userEmail}`, params);
      const allUserData = await res.data;
      const userProfilePic = allUserData.userUploadedPic;
      dispatch(updateUserInfo(userProfilePic));

      await axios.put(`/userProfilePic/updatePostAvatar/${userEmail}`, params);
      await axios.put(
        `/userProfilePic/updatePostCommentAvatar/${userEmail}`,
        params
      );
      dispatch(getAllFoodPicPost());
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

// // just to test endpoints
// export const get = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get("/userProfilePic/");

//       const allPosts = await res.data;
//       // console.log("check data get", JSON.stringify(allPosts));
//     } catch (error) {
//       console.log("Error: ", error);
//       toast.error("API error", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//       });
//     }
//   };
// };

export const getProfilePic = () => {
  return async (dispatch) => {
    try {
      const userData = await axios.get("/auth/user");
      // console.log("check email", JSON.stringify(userData.data.email));

      const res = await axios.get("/userProfilePic/", {
        params: {
          email: userData.data.email,
        },
      });

      const allUserData = await res.data;
      // console.log("check all data", JSON.stringify(allUserData));
      const userProfilePic = allUserData.userUploadedPic;
      // console.log("check data get", JSON.stringify(userProfilePic));
      dispatch(updateUserInfo(userProfilePic));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("API error", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
};

export const updateUserInfo = (userProfilePic) => {
  return {
    type: "ADD_PROFILE_PIC",
    payload: userProfilePic,
  };
};
