import { configureStore } from "@reduxjs/toolkit";
import { user } from "./api/user/userApi";
import { auth } from "./api/auth/authApi";
import authSlice from "./api/auth/authSlice";
import { post } from "./api/post/postApi";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
    [post.reducerPath]: post.reducer,
    authSlice: authSlice,
  },
  middleware: (mid) =>
    mid()
      .concat(user.middleware)
      .concat(auth.middleware)
      .concat(post.middleware),
});
