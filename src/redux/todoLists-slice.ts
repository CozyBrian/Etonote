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
    },
    {
      id: "rFZbxg",
      title: "Gaming",
      icon: "🎮",
    },
    {
      id: "ZslvWl",
      title: "School",
      icon: "📚",
    },
    {
      id: "2qSZYP",
      title: "React Todo",
      icon: "👨🏾‍💻",
    },
  ],
};

const todoLists = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addList(state, action: PayloadAction<{ title: string; icon: string }>) {
      const newList = { ...action.payload, id: nanoid(6) };
      state.value = [...state.value, newList];
    },
  },
});

export default todoLists;
