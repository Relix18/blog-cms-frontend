import { create } from "zustand";

interface IAuth {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  getUser: (user: User) => void;
  socialAuth: (user: User) => void;
  logout: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "AUTHOR" | "USER";
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}

interface Profile {
  id: number;
  avatar: string;
  bio: string | null;
  social: SOCIAL;
}

interface SOCIAL {
  id: number;
  facebookLink: string | null;
  githubLink: string | null;
  instaLink: string | null;
  linkedinLink: string | null;
}

const useAuthStore = create<IAuth>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  socialAuth: (user) => set({ user, isAuthenticated: true }),
  login: (user) => set({ user, isAuthenticated: true }),
  getUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
