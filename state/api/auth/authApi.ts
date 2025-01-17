import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, logout } from "./authSlice";

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: "activation",
        method: "POST",
        body: data,
        credentials: "include",
      }),
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
    resendOtp: builder.mutation({
      query: () => ({
        url: "resend-otp",
        method: "POST",
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "forget-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `reset-password/${data.token}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "social",
        method: "POST",
        body: data,
        credentials: "include",
      }),
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
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
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
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(logout());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivateUserMutation,
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutQuery,
  useResendOtpMutation,
  useResetPasswordMutation,
  useSocialAuthMutation,
} = auth;
