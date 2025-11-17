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
import MostrarAulas from "./features/recipe/MostrarAulas"
import MostrarReceitas from "./features/recipe/MostrarReceitas"

import { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";
import useAuthStore from "./shared/store/auth-store";

import PublicRoute from "./shared/components/PublicRoute";
import PrivateRoute from "./shared/components/PrivateRoute";

// 🔥 NOVO: Importa o modal global
import StatusModal from "./shared/components/StatusModal";
import MostrarAulas from "./features/recipe/MostrarAulas";
import MostrarReceitas from "./features/recipe/MostrarReceitas";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { setFcmToken } = useAuthStore();

  // 🔥 Pegando FCM token
  useEffect(() => {
    requestForToken().then(setFcmToken);
  }, []);

  // 🔥 Listener de notificações
  useEffect(() => {
    onMessageListener().then(() => {});
  }, []);

  return (
    <>
      {/* TELA DE SPLASH */}
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

            {/* ROTAS PRIVADAS */}
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
              <Route path="/MostrarReceitas" element={<MostrarReceitas />} />
              <Route path="/MostrarAulas" element={<MostrarAulas />} />
              <Route path="/compra" element={<CadastroCompra />} />
              <Route path="/fornecedor" element={<Fornecedor />} />
              <Route path="/historicoCompra" element={<HistoricoCompra />} />
              
            </Route>
          </Routes>
        </Router>
      )}

      {/* TOASTS */}
      <Toaster />

      {/* 🔥 MODAL GLOBAL — AGORA FUNCIONA EM QUALQUER PÁGINA */}
      <StatusModal />
    </>
  );
}

export default App;
