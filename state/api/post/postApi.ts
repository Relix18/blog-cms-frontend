import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const post = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  tagTypes: ["Post", "AuthorPost", "Category", "Comment"],
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
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `get-single-post/${slug}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `update-post/${data.id}`,
        method: "PUT",
        body: data.post,
        credentials: "include",
      }),
      invalidatesTags: ["Post", "AuthorPost"],
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
    postComment: builder.mutation({
      query: (data) => ({
        url: `post-comment/${data.slug}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Comment"],
    }),
    commentReply: builder.mutation({
      query: (data) => ({
        url: `comment-reply`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    getComment: builder.query({
      query: (slug) => ({
        url: `get-comments/${slug}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
    likePost: builder.mutation({
      query: (postId) => ({
        url: `like-post`,
        method: "POST",
        body: postId,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    viewUpdate: builder.mutation({
      query: (slug) => ({
        url: `post-view/${slug}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  usePublishPostMutation,
  useGetAuthorPostQuery,
  useGetPostsQuery,
  useGetCategoryQuery,
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  usePostCommentMutation,
  useGetCommentQuery,
  useCommentReplyMutation,
  useLikePostMutation,
  useViewUpdateMutation,
} = post;
