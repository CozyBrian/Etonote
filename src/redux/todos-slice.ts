import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskItem } from "../@types";
import { nanoid } from "nanoid";

interface todosList {
  value: taskItem[];
}

const initialState: todosList = {
  value: [
    {
      id: "Zc8CvQsq-X",
      listID: "rFZbxg",
      title: "Play Full-Metal Alchemist",
      icon: "🎮",
      isDone: false,
    },
    {
      id: "eLPgPZZj-H",
      listID: "2qSZYP",
      title: "Make a todo list app",
      icon: "👨🏾‍💻",
      isDone: false,
    },
    {
      id: "XKcRT9C3Eo",
      listID: "ZslvWl",
      title: "Study Numerical Algerbra",
      icon: "📚",
      isDone: true,
    },
    {
      id: "rnx0ul9z-e",
      listID: "rFZbxg",
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
    addTodo(state, action: PayloadAction<taskItem>) {
      const newItem = { ...action.payload, id: nanoid(10) };
      state.value = [newItem, ...state.value];
    },
    toggleDone(state, action: PayloadAction<string | undefined>) {
      state.value = state.value.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        }

        return item;
      });
    },
    deleteTodo(state, action: PayloadAction<string | undefined>) {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export default todos;
