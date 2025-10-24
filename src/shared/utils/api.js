import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
});

// Lista de caminhos que não exigem token (rotas públicas)
// Use o caminho exato após o baseURL
const PUBLIC_PATHS = [
    '/v1/api/auth/register',
    '/v1/api/auth/login', // Adicione o login aqui também!
];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
    
    // Verifica se a URL da requisição é uma rota pública
    const isPublicPath = PUBLIC_PATHS.some(path => 
        // Verifica se a URL de destino (config.url) contém o caminho público
        config.url.includes(path) 
    );

    // Se a rota for pública, retorna a configuração sem token
    if (isPublicPath) {
        // Garantir que o cabeçalho Authorization não exista, mesmo se houver um valor residual
        delete config.headers.Authorization; 
        return config;
    }

    // Se a rota for segura e houver token, adiciona o token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default api;

