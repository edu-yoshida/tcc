import { create } from "zustand";
import api from "../utils/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  setAuthData: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => set({ user }),

  clearAuthData: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  fetchUser: async () => {
    try {
      const response = await api.get("/v1/api/users/me");

      const data = response.data;

      const normalized = {
        nome: data.nome || "",
        email: data.email || "",
        cnpj: data.cnpj || "",
        cpf: data.cpf || "",
        tipo: data.tipo || "",
        picture: data.picture || null, // <- AGORA CASA COM O HEADER
      };

      set({ user: normalized });
    } catch (err) {
      console.log("Erro ao carregar usuário", err);
      set({ user: null });
    }
  },
}));

export default useAuthStore;
