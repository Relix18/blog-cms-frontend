import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feature = createApi({
  reducerPath: "feature",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  endpoints: (builder) => ({
    relatedPost: builder.mutation({
      query: (data) => ({
        url: "related-post",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRelatedPostMutation } = feature;
