import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { app_state } from "../@types";

const initialState: app_state = {
  selectedTab: "IzeReY",
  homeId: "IzeReY",
  isSplash: true,
  showSettingsPanel: false,
  selectedSettingsTab: "AA",
};

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
    setSelectedSettingsTab(state, action: PayloadAction<string>) {
      state.selectedSettingsTab = action.payload;
    },
    setSplashFalse(state) {
      state.isSplash = false;
    },
    setShowSettingsPanel(state) {
      state.showSettingsPanel = !state.showSettingsPanel;
    },
  },
});

export default appState;
