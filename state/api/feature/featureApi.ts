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
    featuredPost: builder.query({
      query: () => "featured-post",
    }),
    latestPost: builder.query({
      query: () => "latest-post",
    }),
    popularCategory: builder.query({
      query: () => "popular-categories",
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
  usePopularCategoryQuery,
  useFeaturedAuthorQuery,
} = feature;
