import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feature = createApi({
  reducerPath: "feature",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    relatedPost: builder.mutation({
      query: (data) => ({
        url: "related-post",
        method: "POST",
        body: data,
      }),
    }),
    featuredPost: builder.query({
      query: () => "featured-post",
    }),
    latestPost: builder.query({
      query: () => "latest-post",
    }),
    popularTag: builder.query({
      query: () => "popular-tags",
    }),
    featuredAuthor: builder.query({
      query: () => "featured-author",
    }),
  }),
});

export const {
  useRelatedPostMutation,
  useFeaturedPostQuery,
  useLatestPostQuery,
  usePopularTagQuery,
  useFeaturedAuthorQuery,
} = feature;
