import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";

interface system_state {
  THEME: string;
}

const initialState = (): system_state => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.system as system_state;
  } else {
    return {
      THEME: "Light",
    };
  }
};

const systemState = createSlice({
  name: "system",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.THEME = action.payload;
    },
  },
});

export default systemState;
