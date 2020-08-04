import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFoodPicPost } from "./foodPicturesActions";

export const uploadProfilePicImage = (image, email) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      const res = await axios.post("/images/image-upload", formData);
      const imageData = await res.data;
      const singleImageData = imageData[0];
      dispatch(addProfilePic(singleImageData, email));
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
      if (error instanceof TypeError) {
        toast.error(
          "Profile picture not found. Please upload your profile picture and save again.",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
          }
        );
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

export const getProfilePic = () => {
  return async (dispatch) => {
    try {
      const userData = await axios.get("/auth/user");

      const res = await axios.get("/userProfilePic/", {
        params: {
          email: userData.data.email,
        },
      });

      const allUserData = await res.data;
      const userProfilePic = allUserData.userUploadedPic;
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
