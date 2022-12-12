import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";
import { user_state } from "../@types";

const initialState = (): user_state => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.user as user_state;
  } else {
    return {
      user_id: null,
      userName: null,
      userEmail: null,
    };
  }
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user_id = action.payload.user_id;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    setUserLogout: (state) => {
      state.user_id = null;
      state.userName = null;
      state.userEmail = null;
    },
  },
});

export default userState;
