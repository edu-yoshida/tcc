// src/services/LoginService.js

const API_BASE_URL = "http://localhost:5000/v1/api/auth";

export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao registrar usuário: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data; // retorna o objeto User
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao fazer login: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data; // retorna o objeto User
  } catch (error) {
    console.error(error);
    throw error;
  }
}
