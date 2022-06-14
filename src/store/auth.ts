import create from 'zustand';

import { User } from '../services/auth';

export const useAuthStore = create<{
  user: null | User;
  setUser: (user: User) => void;
  logOut: () => void;
}>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({ user: user })),
  logOut: () => set({ user: null }),
}));
