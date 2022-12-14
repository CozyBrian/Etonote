import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { app_state } from "../@types";

const initialState: app_state = {
  selectedTab: "IzeReY",
  homeId: "IzeReY",
  isSplash: true,
  showSettingsPanel: false,
  selectedSettingsTab: "AA",
  showAddEditPanel: false,
  addEditPanelMode: "ADD",
  addEditPanelData: null,
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
    setShowAddEditPanel(state, action: PayloadAction<boolean>) {
      if (action.payload === false) {
        state.addEditPanelData = null;
      }
      state.showAddEditPanel = action.payload;
    },
    setAddEditPanelMode(state, action: PayloadAction<"ADD" | "EDIT">) {
      state.addEditPanelMode = action.payload;
    },
    setAddEditPanelData(
      state,
      action: PayloadAction<app_state["addEditPanelData"]>
    ) {
      state.addEditPanelData = action.payload;
    },
  },
});

export default appState;
