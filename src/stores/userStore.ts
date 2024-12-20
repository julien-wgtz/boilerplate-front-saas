import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

type UserState = {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
  currentAccount: any;
  roleCurrentAccount: string;
  lang: string;
  setCurrentAccount: (
    currentAccount: any
  ) => void;
  clearCurrentAccount: () => void;
  logOut: () => void;
};

const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        set({ user: user, lang: user.language });
      },
      clearUser: () => set({ user: null }),
      roleCurrentAccount: "",
      currentAccount: null,
      lang: "en",
      setCurrentAccount: (currentAccount) => {
        const role = currentAccount.users.find(
          (u: any) => u.userId === get().user.id
        ).role;
        set({
          currentAccount,
          roleCurrentAccount: role,
        });
      },
      clearCurrentAccount: () =>
        set({ currentAccount: null }),
      logOut: () => {
        set({ user: null });
        set({ currentAccount: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(
        () => localStorage
      ),
    }
  )
);

export default useUserStore;
