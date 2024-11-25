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
  const { user, token, isAuthenticated, socialAuth, login, logout, getUser } =
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
  }) => {
    const { user, token } = await socialAuthApi(credential);
    socialAuth(user, token);
  };

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    const data = await loginApi(credentials);
    login(data.user, data.token);
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
    token,
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
