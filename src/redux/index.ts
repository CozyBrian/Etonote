import { configureStore } from "@reduxjs/toolkit";
import todoLists from "./todoLists-slice";
import todos from "./todos-slice";
import appState from "./app-Slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const HomeId = "IzeReY";

export const action = {
  app: appState.actions,
  lists: todoLists.actions,
  todos: todos.actions,
};

function saveToLocalStorage(state: RootState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    const state: RootState = JSON.parse(serialisedState);
    return state;
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    app: appState.reducer,
    lists: todoLists.reducer,
    todos: todos.reducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
