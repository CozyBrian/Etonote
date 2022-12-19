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
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          id: "Y6JVx4yj9X",
          isDone: false,
          listID: "sbuvgg",
          note: "Etonote is a simple to-do list app with beautiful fluid animations that saves to the cloud, so your to-dos are available everywhere. It is available for web, MacOS, Windows, iOS, and Android.",
          title: "Welcome To Etonote. Have a look around",
        },
        {
          listID: "sbuvgg",
          title: "Right Click a list or todo to open the context menu",
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          isDone: false,
          note: "",
          id: "znUmu-ilC3",
        },
        {
          listID: "sbuvgg",
          title: "Click and drag Items or Categories to rearrange",
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          isDone: false,
          note: "",
          id: "QsDysfFOv0",
        },
        {
          listID: "sbuvgg",
          title: "Click Me!",
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          isDone: false,
          note: "This is the edit panel. You can change the text of the todo item, change its category and attach a note to it. Soon you'll be able to schedule todos over here too. keep an eye out 😉",
          id: "LCkEyf_PRI",
        },
        {
          listID: "sbuvgg",
          title:
            "Tasks that you complete will appear here in the Completed Tab",
          icon: {
            data: "#fa900c",
            type: "COLOR",
          },
          isDone: true,
          note: "",
          id: "UIkCcC_PRI",
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
    reOrder(state, action: PayloadAction<taskItem[]>) {
      state.value = action.payload;
    },
  },
});

export default todos;
