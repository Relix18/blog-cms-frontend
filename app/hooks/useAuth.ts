import {
  activationApi,
  loginApi,
  logoutApi,
  registerApi,
  socialAuthApi,
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
    const { user, token } = await loginApi(credentials);
    login(user, token);
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
    loginUser,
    logoutUser,
  };
};

export default useAuth;
