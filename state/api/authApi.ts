import axios from "axios";

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
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const registerApi = async (
  credentials: SignupCredentials
): Promise<RegisterUser> => {
  const { data } = await axios.post("/api/v1/register", credentials);
  return data;
};

export const activationApi = async (credentials: { code: string }) => {
  const { data } = await axios.post("/api/v1/activation", credentials);
  return data;
};

export const socialAuthApi = async (
  credentials: SocialCredentials
): Promise<LoginUser> => {
  const { data } = await axios.post("/api/v1/social", credentials);
  return data;
};

export const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginUser> => {
  const { data } = await axios.post("/api/v1/login", credentials);
  return data;
};

export const logoutApi = async () => {
  await axios.post("/api/v1/logout");
};
