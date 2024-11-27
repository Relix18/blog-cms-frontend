"use client";
import {
  activationApi,
  loginApi,
  logoutApi,
  registerApi,
  socialAuthApi,
  getUserApi,
  resendOtp,
  forgotPasswordApi,
  resetPasswordApi,
} from "@/state/api/authApi";
import useAuthStore from "../../state/authStore";

const useAuth = () => {
  const { user, isAuthenticated, socialAuth, login, logout, getUser } =
    useAuthStore();

  const registerUser = async (credentials: {
    name: string;
    email: string;
    password: string;
  }) => {
    return await registerApi(credentials);
  };

  const activateUser = async (credentials: { otp: string }) => {
    await activationApi(credentials);
  };

  const resendOTP = async () => {
    return await resendOtp();
  };

  const forgotPassword = async (credentials: { email: string }) => {
    return await forgotPasswordApi(credentials);
  };

  const resetPassword = async (credentials: {
    password: string;
    confirmPassword: string;
    token: string;
  }) => {
    return await resetPasswordApi(credentials);
  };

  const socialAuthUser = async (credential: {
    name: string;
    email: string;
    avatar: string;
  }) => {
    const { user } = await socialAuthApi(credential);
    socialAuth(user);
  };

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const data = await loginApi(credentials);
    login(data.user);
    return data;
  };

  const getLoggedUser = async () => {
    const { user } = await getUserApi();
    getUser(user);
  };

  const logoutUser = async () => {
    await logoutApi();
    logout();
  };

  return {
    user,

    isAuthenticated,
    registerUser,
    activateUser,
    resendOTP,
    forgotPassword,
    resetPassword,
    socialAuthUser,
    getLoggedUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
