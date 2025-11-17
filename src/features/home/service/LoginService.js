import api from "../../../shared/utils/api";

// Registrar usuário padrão (STANDARD)
async function registerUser(data) {
  try {
    const response = await api.post("/v1/api/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Erro no registro:", error);
    throw error;
  }
}

async function loginUser({ email, password }) {
  try {
    const response = await api.post("/v1/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

async function sendToken(tokenData) {
  try {
    const response = await api.put("/v1/api/notifications/token", tokenData);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar token FCM:", error);

    let msg = "Erro ao fazer login. Tente novamente.";

    if (error.response?.status === 401) {
      msg = "Email ou senha inválidos.";
    } else if (error.response?.data?.message) {
      msg = error.response.data.message;
    }

    throw new Error(msg);
  }
}

export default { registerUser, loginUser, sendToken };
