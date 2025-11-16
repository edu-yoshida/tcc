import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import CadastroUsuario from "./features/home/components/CadastroUsuario";
import CadastroDeProdutos from "./features/home/components/CadastroDeProdutos";
import CadastroDeReceita from "./features/recipe/CadastroDeReceita";
import AulasReceitas from "./features/recipe/AulasReceitas";
import CadastroCompra from "./features/supplies/Compra";
import VerificarProdutos from "./features/storage/VerificarProdutos";
import Login from "./features/home/components/Login";
import SplashScreen from "./features/home/components/SplashScreen";
import Fornecedor from "./features/supplies/Fornecedor";
import HistoricoCompra from "./features/supplies/HistoricoCompra";
import PrivateLayout from "./shared/components/PrivateLayout";

import { AuthProvider } from "./shared/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";
import useAuthStore from "./shared/store/auth-store";

import PublicRoute from "./shared/components/PublicRoute";
import PrivateRoute from "./shared/components/PrivateRoute";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { setFcmToken } = useAuthStore();

  useEffect(() => {
    requestForToken().then(setFcmToken);
  }, []);

  useEffect(() => {
    const unsub = onMessageListener().then(() => {});
    return () => {};
  }, []);

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            {/* LOGIN */}
            <Route path="/" element={<Login />} />

            {/* ROTA PÚBLICA */}
            <Route
              path="/cadastroUsuario"
              element={
                <PublicRoute>
                  <CadastroUsuario />
                </PublicRoute>
              }
            />

            {/* TODAS AS ROTAS PRIVADAS AQUI */}
            <Route
              element={
                <PrivateRoute>
                  <PrivateLayout />
                </PrivateRoute>
              }
            >
              <Route path="/usuariosAcessver" element={<></>} />
              <Route path="/produtos" element={<CadastroDeProdutos />} />
              <Route path="/estoque" element={<VerificarProdutos />} />
              <Route path="/receitas" element={<CadastroDeReceita />} />
              <Route path="/receitasClass" element={<AulasReceitas />} />
              <Route path="/compra" element={<CadastroCompra />} />
              <Route path="/fornecedor" element={<Fornecedor />} />
              <Route path="/historicoCompra" element={<HistoricoCompra />} />
            </Route>
          </Routes>
        </Router>
      )}

      <Toaster />
    </AuthProvider>
  );
}

export default App;
