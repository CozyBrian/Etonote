import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface app_state {
  selectedTab: string;
  homeId: string;
}

const initialState: app_state = {
  selectedTab: "IzeReY",
  homeId: "IzeReY",
};

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
  },
});

export default appState;
