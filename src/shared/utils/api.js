// src/shared/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/v1/api", // ou apenas "http://localhost:5000" dependendo das rotas do backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
