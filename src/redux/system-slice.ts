import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";

interface system_state {
  THEME: string;
  userColors: string[];
}

const initialState = (): system_state => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.system as system_state;
  } else {
    return {
      THEME: "Light",
      userColors: [],
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
    setColor(state, action: PayloadAction<string>) {
      if (state.userColors.length < 7) {
        state.userColors = [...state.userColors, action.payload];
      }
      if (state.userColors.length === 7) {
        const tempColors = state.userColors.filter((_, i) => i !== 0);

        state.userColors = [...tempColors, action.payload];
      }
    },
  },
});

export default systemState;
