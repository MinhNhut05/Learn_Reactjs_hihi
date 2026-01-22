import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";
import filterReducer from "../features/todos/filterSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    filter: filterReducer,
    users: usersReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
