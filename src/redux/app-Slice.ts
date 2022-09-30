import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface app_state {
  selectedTab: string;
  homeId: string;
  isSplash: boolean;
  showSettingsPanel: boolean;
  selectedSettingsTab: string;
  appConfig: { THEME: string };
}

const initialState: app_state = {
  selectedTab: "IzeReY",
  homeId: "IzeReY",
  isSplash: true,
  showSettingsPanel: false,
  selectedSettingsTab: "AA",
  appConfig: {
    THEME: "Light",
  },
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
    setTheme(state, action: PayloadAction<string>) {
      state.appConfig.THEME = action.payload;
    },
    setShowSettingsPanel(state) {
      state.showSettingsPanel = !state.showSettingsPanel;
    },
  },
});

export default appState;
