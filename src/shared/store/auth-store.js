import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  fcmToken: null,

  setAuthData: (token, user = null) => {
    localStorage.setItem("token", token);
    set({ token, user });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  setFcmToken: (fcmToken) => set({ fcmToken }),
}));

export default useAuthStore;
