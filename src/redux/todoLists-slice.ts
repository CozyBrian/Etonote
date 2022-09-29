import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListIconData, SidebarItem } from "../@types";
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
          icon: { type: "COLOR", data: "#0ea5e9" },
        },
        {
          id: "rFZbxg",
          title: "Gaming",
          icon: { type: "EMOJI", data: "🎮" },
        },
        {
          id: "ZslvWl",
          title: "School",
          icon: { type: "EMOJI", data: "📚" },
        },
        {
          id: "2qSZYP",
          title: "React Todo",
          icon: { type: "EMOJI", data: "👨🏾‍💻" },
        },
      ],
    };
  }
};

const todoLists = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    addList(
      state,
      action: PayloadAction<{ title: string; icon: ListIconData }>
    ) {
      const newList = { ...action.payload, id: nanoid(6) };
      state.value = [...state.value, newList];
    },
    deleteList(state, action: PayloadAction<string | undefined>) {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export default todoLists;
