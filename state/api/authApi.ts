import axios from "axios";
import { User } from "../authStore";

const baseUrl = "http://localhost:4000/api/v1/";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface SocialCredentials {
  name: string;
  email: string;
}

interface RegisterUser {
  token: string;
  activationCode: string;
}

interface LoginUser {
  user: User;
  token: string;
}

export const registerApi = async (
  credentials: SignupCredentials
): Promise<RegisterUser> => {
  const { data } = await axios.post(`${baseUrl}register`, credentials, {
    withCredentials: true,
  });
  return data;
};

export const activationApi = async (credentials: { otp: string }) => {
  const { data } = await axios.post(`${baseUrl}activation`, credentials, {
    withCredentials: true,
  });
  return data;
};

export const resendOtp = async () => {
  const { data } = await axios.post(
    `${baseUrl}resend-otp`,
    {},
    { withCredentials: true }
  );
  return data;
};

export const forgotPasswordApi = async (credentials: { email: string }) => {
  const { data } = await axios.post(`${baseUrl}forget-password`, credentials);
  return data;
};

export const resetPasswordApi = async (credentials: {
  password: string;
  confirmPassword: string;
  token: string;
}) => {
  const { data } = await axios.post(
    `${baseUrl}reset-password/${credentials.token}`,
    credentials
  );
  return data;
};

export const socialAuthApi = async (
  credentials: SocialCredentials
): Promise<LoginUser> => {
  const { data } = await axios.post(`${baseUrl}social`, credentials, {
    withCredentials: true,
  });
  return data;
};

export const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginUser> => {
  const { data } = await axios.post(`${baseUrl}login`, credentials, {
    withCredentials: true,
  });
  return data;
};

export const getUserApi = async () => {
  const { data } = await axios.get(`${baseUrl}me`, {
    withCredentials: true,
  });
  return data;
};

export const logoutApi = async () => {
  await axios.post(`${baseUrl}logout`);
};
