import axios from "axios";

export const getInventory = () => {
  return async (dispatch) => {
    try {
      const userData = await axios.get("/auth/user");

      const res = await axios.get("/inventories/", {
        params: {
          email: userData.data.email,
        },
      });

      const inventory = await res.data;
      dispatch(loadAllInventory(inventory));
    } catch (error) {
      console.log("Error: ", error);
    }
  };
};

export const loadAllInventory = (items) => {
  return {
    type: "LOAD_ALL",
    payload: items,
  };
};
