import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const site = createApi({
  reducerPath: "site",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  tagTypes: ["Site"],
  endpoints: (builder) => ({
    getSiteSettings: builder.query({
      query: () => "get-site-settings",
      providesTags: ["Site"],
    }),
    updateSiteSettings: builder.mutation({
      query: (data) => ({
        url: "update-site-settings",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Site"],
    }),
  }),
});

export const { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } = site;
