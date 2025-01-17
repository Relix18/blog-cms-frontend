import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login } from "../auth/authSlice";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["User", "Users"],
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
    getAuthorProfile: builder.query({
      query: (id) => `get-author-profile/${id}`,
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
    contactUs: builder.mutation({
      query: (data) => ({
        url: "contact-us",
        method: "POST",
        body: data,
      }),
    }),
    authorRequest: builder.mutation({
      query: () => ({
        url: "author-request",
        credentials: "include",
        method: "POST",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Users"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `user-details/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllComments: builder.query({
      query: () => ({
        url: "get-all-comments",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateRole: builder.mutation({
      query: (data) => ({
        url: `/update-role/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAuthorProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
  useContactUsMutation,
  useAuthorRequestMutation,
  useGetAllUserQuery,
  useGetAllCommentsQuery,
  useGetUserDetailsQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
} = user;
