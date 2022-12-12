import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from ".";
import { system_state } from "../@types";

const initialState = (): system_state => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.system as system_state;
  } else {
    return {
      THEME: "Light",
      userColors: [
        "#FFB100",
        "#56494C",
        "#00AF54",
        "#3CBBB1",
        "#007CBE",
        "#5E7CE2",
        "#CFDEE7",
      ],
    };
  }
};

const systemState = createSlice({
  name: "system",
  initialState,
  reducers: {
    setState(state, action: PayloadAction<system_state>) {
      state.THEME = action.payload.THEME;
      state.userColors = action.payload.userColors;
    },
    setTheme(state, action: PayloadAction<string>) {
      state.THEME = action.payload;
    },
    setColor(state, action: PayloadAction<string>) {
      if (state.userColors.length < 14) {
        state.userColors = [...state.userColors, action.payload];
      }
      if (state.userColors.length === 14) {
        const tempColors = state.userColors.filter((_, i) => i !== 0);

        state.userColors = [...tempColors, action.payload];
      }
    },
  },
});

export default systemState;
