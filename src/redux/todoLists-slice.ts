import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SidebarItem } from "../@types";

interface todoList {
  value: SidebarItem[];
}

const initialState: todoList = {
  value: [
    {
      title: "Home",
      icon: "🏠",
      number: 23,
    },
    {
      title: "Gaming",
      icon: "🎮",
      number: 4,
    },
    {
      title: "School",
      icon: "📚",
      number: 13,
    },
    {
      title: "React Todo",
      icon: "👨🏾‍💻",
      number: 6,
    },
  ],
};

const todoLists = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addNumber(state, action: PayloadAction<number>) {
      state.value[action.payload].number += 1;
    },
    addList(state, action: PayloadAction<SidebarItem>) {
      state.value = [...state.value, action.payload];
    },
  },
});

export default todoLists;
