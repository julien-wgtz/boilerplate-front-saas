import {create} from 'zustand';

type UserState = {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,  // Initialement, l'utilisateur est null
  setUser: (user) => set({ user }),  // Pour mettre à jour l'utilisateur
  clearUser: () => set({ user: null }),  // Pour déconnecter l'utilisateur
}));

export default useUserStore;
