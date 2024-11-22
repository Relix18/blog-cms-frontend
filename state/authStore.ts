import { create } from "zustand";

interface IAuth {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  activationCode: string | null;
  login: (user: User, token: string) => void;
  getUser: (user: User) => void;
  register: (token: string, activationCode: string) => void;
  socialAuth: (user: User, token: string) => void;
  activation: () => void;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const useAuthStore = create<IAuth>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  activationCode: null,

  activation: () => set({ activationCode: null }),
  register: (token, activationCode) => set({ token, activationCode }),
  socialAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  getUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
