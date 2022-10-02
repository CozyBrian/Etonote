import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";

interface user_state {
  user_id: string;
  username: string;
}

const initialState = (): user_state => {
  if (loadFromLocalStorage() !== undefined) {
    return {
      user_id: "",
      username: "",
    };
    //return loadFromLocalStorage()?.user as user_state;
  } else {
    return {
      user_id: "",
      username: "",
    };
  }
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userState;
