
  import { useState } from "react";
  import { HashRouter as Router, Routes, Route } from "react-router-dom";
  import './App.css';

  import Login from './features/home/components/Login';
  import SplashScreen from './features/home/components/SplashScreen';
  import CadastroUsuario from "./features/home/components/CadastroUsuario";
  import CadastroDeProdutos from "./features/home/components/CadastroDeProdutos";
  import InserirProduto from "./features/storage/InserirProduto";
  import CadastroDeReceita from "./features/recipe/CadastroDeReceita";
  import CadastroCompra from "./features/supplies/Compra";
  import CadastroReceitasPorAula from "./features/recipe/CadastroReceitaPorAula";
  import Fornecedor from "./features/supplies/Fornecedor";
  import RetirarProduto from "./features/storage/RetirarProduto";
  import { AuthProvider } from "./shared/context/AuthContext";
  import React from 'react';
  import { Toaster } from 'react-hot-toast';
  import { requestForToken, onMessageListener } from './firebase';
  import useAuthStore from './shared/store/auth-store';
  import PublicRoute from "./shared/components/PublicRoute";
  import PrivateRoute from "./shared/components/PrivateRoute";

  function App() {
    const [showSplash, setShowSplash] = useState(true);

    const [token, setToken] = React.useState(null);
    const { setFcmToken } = useAuthStore()

    // 1. Obtém o Token na montagem do componente
    React.useEffect(() => {
      requestForToken()
        .then((currentToken) => {
          setToken(currentToken);
          setFcmToken(currentToken)
        })
        .catch((err) => {
          console.error("Erro ao solicitar token:", err);
        });
    }, []);

    // 2. Configura o Listener para mensagens em Foreground
    React.useEffect(() => {
      // Registra o listener e obtém a função de limpeza (unsubscribe)
      const unsubscribe = onMessageListener().then(() => {
        // O then é chamado quando uma mensagem chega, mas o listener continua ativo
      });

      // Retorna a função de limpeza para que o listener seja removido ao desmontar o componente
      return () => {
        // Se necessário, implemente o unsubscribe do listener aqui.
        // Para onMessage(), o listener é geralmente ativo enquanto o app está montado.
      };
    }, []);

    return (
    <AuthProvider>
      <div>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route 
                path="/CadastroUsuario" 
                element={
                  <PrivateRoute>
                    <CadastroUsuario />
                  </PrivateRoute>
                }
              />
              <Route
                path="/produtos"
                element={
                  <PrivateRoute>
                    <CadastroDeProdutos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/produtos/add"
                element={
                  <PrivateRoute>
                    <InserirProduto />
                  </PrivateRoute>
                }
              />
              <Route
                path="/produtos/remove"
                element={
                  <PrivateRoute>
                    <RetirarProduto />
                  </PrivateRoute>
                }
              />
              <Route
                path="/receitas"
                element={
                  <PrivateRoute>
                    <CadastroDeReceita />
                  </PrivateRoute>
                }
              />
              <Route
                path="/receitas/class"
                element={
                  <PrivateRoute>
                    <CadastroReceitasPorAula />
                  </PrivateRoute>
                }
              />
              <Route
                path="/compra"
                element={
                  <PrivateRoute>
                    <CadastroCompra />
                  </PrivateRoute>
                }
              />
              <Route
                path="/fornecedor"
                element={
                  <PrivateRoute>
                    <Fornecedor />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        )}
        <Toaster />
      </div>
    </AuthProvider>
  );
  }

  export default App;