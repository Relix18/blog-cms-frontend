import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const post = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  tagTypes: ["Post", "AuthorPost", "Category"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "create-post",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Post", "AuthorPost", "Category"],
    }),
    publishPost: builder.mutation({
      query: (id) => ({
        url: `publish-post/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Post", "AuthorPost"],
    }),
    getAuthorPost: builder.query({
      query: () => ({
        url: "get-author-post",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["AuthorPost"],
    }),
    getPosts: builder.query({
      query: () => ({
        url: "get-all-posts",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "get-category",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  usePublishPostMutation,
  useGetAuthorPostQuery,
  useGetPostsQuery,
  useGetCategoryQuery,
} = post;
