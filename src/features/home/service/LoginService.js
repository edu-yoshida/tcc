import api from "../../../shared/utils/api";

async function registerUser({ name, email, password }) {
  try {
    const response = await api.post("/v1/api/auth/register", { name, email, password })
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function loginUser({ email, password }) {
  try {
    const response = await api.post("/v1/api/auth/login", { email, password })
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function sendToken(tokenData) {
  try {
    const response = await api.put('/v1/api/notifications/token', tokenData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Erro no envio do token:', error.response || error);

    let errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
    if (error.response && error.response.status === 401) {
      errorMessage = 'Email ou senha inválidos.';
    } else if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }

    throw new Error(errorMessage);
  }
}

export default { registerUser, loginUser, sendToken }