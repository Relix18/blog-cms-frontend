import {
  activationApi,
  loginApi,
  logoutApi,
  registerApi,
  socialAuthApi,
  getUserApi,
} from "@/state/api/authApi";
import useAuthStore from "../../state/authStore";

const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    socialAuth,
    login,
    logout,
    getUser,
    register,
    activation,
  } = useAuthStore();

  const registerUser = async (credentials: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { token, activationCode } = await registerApi(credentials);
    register(token, activationCode);
  };

  const activateUser = async (credentials: { code: string }) => {
    await activationApi(credentials);
    activation();
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
    return;
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
    socialAuthUser,
    getLoggedUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
