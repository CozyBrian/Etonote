import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListIconData, SidebarItem, todoList } from "../@types";
import { nanoid } from "nanoid";
import { loadFromLocalStorage } from ".";

const initialState = (): todoList => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.lists as todoList;
  } else {
    return {
      value: [
        {
          icon: {
            data: "#0ea5e9",
            type: "COLOR",
          },
          id: "IzeReY",
          title: "Home",
        },
        {
          icon: {
            data: "✅",
            type: "EMOJI",
          },
          id: "ldMI0P",
          title: "Completed",
        },
        {
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          id: "sbuvgg",
          title: "Etonote",
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
    editList(state, action: PayloadAction<SidebarItem>) {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value[index] = action.payload;
    },
    setState(state, action: PayloadAction<todoList>) {
      state.value = action.payload.value;
    },
    reOrder(state, action: PayloadAction<SidebarItem[]>) {
      state.value = action.payload;
    },
  },
});

export default todoLists;
