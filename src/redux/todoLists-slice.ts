import { nanoid } from "nanoid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SidebarItem } from "../@types";

interface todoList {
  value: SidebarItem[];
}

const initialState: todoList = {
  value: [
    {
      id: "IzeReY",
      title: "Home",
      icon: "🏠",
      number: 23,
    },
    {
      id: "rFZbxg",
      title: "Gaming",
      icon: "🎮",
      number: 4,
    },
    {
      id: "ZslvWl",
      title: "School",
      icon: "📚",
      number: 13,
    },
    {
      id: "2qSZYP",
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
      const newList = { ...action.payload, id: nanoid(6) };
      state.value = [...state.value, newList];
    },
  },
});

export default todoLists;
