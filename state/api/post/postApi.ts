import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const post = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/",
  }),
  tagTypes: ["Post", "AuthorPost", "Category", "Tag", "Comment"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "create-post",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Post", "AuthorPost", "Category", "Tag"],
    }),
    publishPost: builder.mutation({
      query: (id) => ({
        url: `publish-post/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Post", "AuthorPost"],
    }),
    unpublishPost: builder.mutation({
      query: (data) => ({
        url: "unpublish-post",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
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
    getAllPosts: builder.query({
      query: () => ({
        url: "get-all-post-admin",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "get-category",
      }),
      providesTags: ["Category"],
    }),
    getTags: builder.query({
      query: () => ({
        url: "get-tags",
      }),
      providesTags: ["Tag"],
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
    getLikePost: builder.query({
      query: () => ({
        url: "liked-post",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    recentActivity: builder.query({
      query: () => ({
        url: "recent-activity",
        credentials: "include",
      }),
      providesTags: ["Post"],
    }),
    deletePostAdmin: builder.mutation({
      query: (postId) => ({
        url: "delete-post-admin",
        method: "DELETE",
        body: { postId },
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
    editCategory: builder.mutation({
      query: (data) => ({
        url: "edit-category",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    editTag: builder.mutation({
      query: (data) => ({
        url: "edit-tag",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: "delete-comment",
        method: "DELETE",
        body: { id },
        credentials: "include",
      }),
    }),
    deleteReply: builder.mutation({
      query: (id) => ({
        url: "delete-reply",
        method: "DELETE",
        body: { id },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  usePublishPostMutation,
  useUnpublishPostMutation,
  useGetAuthorPostQuery,
  useGetPostsQuery,
  useGetAllPostsQuery,
  useGetCategoryQuery,
  useGetTagsQuery,
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  usePostCommentMutation,
  useGetCommentQuery,
  useCommentReplyMutation,
  useLikePostMutation,
  useViewUpdateMutation,
  useGetLikePostQuery,
  useRecentActivityQuery,
  useEditCategoryMutation,
  useEditTagMutation,
  useDeletePostAdminMutation,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
} = post;
