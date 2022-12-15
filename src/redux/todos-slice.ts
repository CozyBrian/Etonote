import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskItem, todosList } from "../@types";
import { nanoid } from "nanoid";
import { loadFromLocalStorage } from ".";

const initialState = (): todosList => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.todos as todosList;
  } else {
    return {
      value: [
        {
          id: "Zc8CvQsq-X",
          listID: "rFZbxg",
          title: "Buy a PS5",
          icon: { type: "EMOJI", data: "🎮" },
          isDone: true,
          note: "",
        },
        {
          id: "XKcRT9C3Eo",
          listID: "ZslvWl",
          title: "Study Numerical Algerbra",
          icon: { type: "EMOJI", data: "📚" },
          isDone: true,
          note: "",
        },
        {
          id: "rnx0ul9z-e",
          listID: "rFZbxg",
          title: "Buy Playstation 4 and get some games",
          icon: { type: "EMOJI", data: "🎮" },
          isDone: false,
          note: "",
        },
      ],
    };
  }
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
    editTodo(state, action: PayloadAction<taskItem>) {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value[index] = action.payload;
    },
    setState(state, action: PayloadAction<todosList>) {
      state.value = action.payload.value;
    },
  },
});

export default todos;
