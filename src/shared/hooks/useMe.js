import { useEffect, useState } from "react";
import api from "../utils/api";
import useAuthStore from "../store/auth-store";

export default function useMe() {
  const { user, setUser, logout } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    console.log("🔎 useMe() rodou");
    console.log("🔹 Token no localStorage:", storedToken);
    console.log("🔹 user no Zustand:", user);

    // Não tem token → não logado
    if (!storedToken) {
      console.log("❌ Não há token salvo → usuário deslogado");
      setLoading(false);
      return;
    }

    // Se já temos user em memória → não chama /me
    if (user) {
      console.log("✅ User já carregado no Zustand → sem chamar /me");
      setLoading(false);
      return;
    }

    async function fetchMe() {
      console.log("📡 Chamando /v1/api/users/me ...");

      try {
        const response = await api.get("/v1/api/users/me");
        const userData = response.data;

        console.log("✅ /me retornou usuário:", userData);

        setUser(userData);

      } catch (err) {
        console.log("❌ Erro no /me:", err);
        setError(err);

        if (err.response) {
          console.log("❌ Status da API:", err.response.status);
          console.log("❌ Body da API:", err.response.data);
        }

        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log("⚠️ Token inválido → limpando login");
          logout();
          localStorage.removeItem("token");
        }
      } finally {
        console.log("⏳ Finalizando loading do useMe()");
        setLoading(false);
      }
    }

    fetchMe();

  }, [user, setUser, logout]);

  return { user, loading, error };
}
