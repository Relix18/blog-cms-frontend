import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analytics = createApi({
  reducerPath: "analytics",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: (days) => ({
        url: `post-analytics/${days}`,
        credentials: "include",
      }),
    }),
    getOverview: builder.query({
      query: (days) => ({
        url: `admin-overview/${days}`,
        credentials: "include",
      }),
    }),
    getPostAnalytics: builder.query({
      query: () => ({
        url: "admin-post-analytics",
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserAnalytics: builder.query({
      query: () => ({
        url: "admin-user-analytics",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetOverviewQuery,
  useGetPostAnalyticsQuery,
  useGetUserAnalyticsQuery,
} = analytics;
