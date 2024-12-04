import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      activeTab: "posts", // Default tab
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "ui-store",
    }
  )
);

export default useUIStore;
