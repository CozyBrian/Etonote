import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SidebarItem } from "../@types";
import { nanoid } from "nanoid";
import { loadFromLocalStorage } from ".";

interface todoList {
  value: SidebarItem[];
}

const initialState = (): todoList => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.lists as todoList;
  } else {
    return {
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
  }
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
