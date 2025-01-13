import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notification = createApi({
  reducerPath: "notification",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "get-notification",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Notification"],
    }),
    updateNotification: builder.mutation({
      query: (id) => ({
        url: `update-notification/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Notification"],
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: "read-all-notifications",
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationMutation,
  useReadAllNotificationMutation,
} = notification;
