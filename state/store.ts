import { configureStore } from "@reduxjs/toolkit";
import { user } from "./api/user/userApi";
import { auth } from "./api/auth/authApi";
import authSlice from "./api/auth/authSlice";
import { post } from "./api/post/postApi";
import { feature } from "./api/feature/featureApi";
import { analytics } from "./api/analytics/analyticsApi";
import { site } from "./api/site/siteApi";
import settingsSlice from "./api/site/siteSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
    [post.reducerPath]: post.reducer,
    [feature.reducerPath]: feature.reducer,
    [analytics.reducerPath]: analytics.reducer,
    [site.reducerPath]: site.reducer,
    authSlice: authSlice,
  },
  middleware: (mid) =>
    mid()
      .concat(user.middleware)
      .concat(auth.middleware)
      .concat(post.middleware)
      .concat(feature.middleware)
      .concat(analytics.middleware)
      .concat(site.middleware),
});
