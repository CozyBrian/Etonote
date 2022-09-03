import { configureStore } from "@reduxjs/toolkit";
import todoLists from "./todoLists-slice";
import todos from "./todos-slice";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const action = { lists: todoLists.actions, todos: todos.actions };

export const store = configureStore({
  reducer: { lists: todoLists.reducer, todos: todos.reducer },
});
