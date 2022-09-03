import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskItem } from "../@types";

interface todosList {
  value: taskItem[];
}

const initialState: todosList = {
  value: [
    {
      title: "Play Full-Metal Alchemist",
      icon: "🎮",
      isDone: false,
    },
    {
      title: "Make a todo list app",
      icon: "👨🏾‍💻",
      isDone: false,
    },
    {
      title: "Study Numerical Algerbra",
      icon: "📚",
      isDone: true,
    },
    {
      title: "Buy Playstation 4 and get some games",
      icon: "🎮",
      isDone: false,
    },
  ],
};

const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleDone(state, action: PayloadAction<number>) {
      state.value[action.payload].isDone = !state.value[action.payload].isDone;
    },
  },
});

export default todos;
