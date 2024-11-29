import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login } from "../auth/authSlice";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            login({
              user: data.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "update-profile",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "update-avatar",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "change-password",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
} = user;
