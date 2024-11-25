import { create } from "zustand";

interface IAuth {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  getUser: (user: User) => void;
  socialAuth: (user: User, token: string) => void;
  logout: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}

interface Profile {
  avatar: string;
  bio: string | null;
}

const useAuthStore = create<IAuth>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  socialAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  getUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
