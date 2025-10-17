/*
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './features/home/components/Login';
import SplashScreen from './features/home/components/SplashScreen';
import CadastroUsuario from "./features/home/components/CadastroUsuario";
import Sidebar from "./shared/components/Sidebar";
import CadastroDeProdutos from "./features/home/components/CadastroDeProdutos";
import InserirProduto from "./features/storage/InserirProduto";
import CadastroDeReceita from "./features/recipe/CadastroDeReceita";
import CadastroCompra from "./features/supplies/Compra";
import CadastroReceitasPorAula from "./features/recipe/CadastroReceitaPorAula";
import CadastroIngrediente from "./features/recipe/CadastroDeIngrediente";
import Fornecedor from "./features/supplies/Fornecedor";
import RetirarProduto from "./features/storage/RetirarProduto";
import ProtectedRoute from "./shared/components/PrivateRoute";
import { AuthProvider } from "./shared/context/AuthContext";


const Usuarios = () => {
  return <Sidebar />
}

const Acessver = () => {
  return <Sidebar />
}

const Configuracoes = () => {
  return <Sidebar />
}
const Relatorios = () => {
  return <Sidebar />
}
const Estoque = () => {
  return <Sidebar />
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      <div>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <Router>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="/CadastroUsuario" element={<CadastroUsuario />} />

              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/acessver" element={<Acessver />} />

              <Route path="/produtos" element={<ProtectedRoute><CadastroDeProdutos /></ProtectedRoute>} />
              <Route path="/produtos" element={<ProtectedRoute><CadastroDeProdutos /></ProtectedRoute>} />
              <Route path="/produtos/add" element={<ProtectedRoute><InserirProduto /></ProtectedRoute >} />
              <Route path="/produtos/remove" element={<ProtectedRoute><RetirarProduto /></ProtectedRoute >} />
              <Route path="/produtos/storage" element={<ProtectedRoute><Estoque /></ProtectedRoute >} />




              <Route path="/receitas" element={<ProtectedRoute><CadastroDeReceita /></ProtectedRoute >} />
              <Route path="/receitas/class" element={<ProtectedRoute><CadastroReceitasPorAula /></ProtectedRoute >} />

              <Route path="/compra" element={<ProtectedRoute><CadastroCompra /></ProtectedRoute >} />
              <Route path="/fornecedor" element={<ProtectedRoute><Fornecedor /></ProtectedRoute >} />


              <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute >} />
              <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute >} />

            </Routes>
          </Router>
        )}
      </div>
    </AuthProvider> 

  );
}

export default App;

*/

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

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/CadastroUsuario" element={<CadastroUsuario />} />

            {/* Rotas com Sidebar */}
              {/* <Route path="/usuarios" element={<Usuarios />} /> */}
              {/* <Route path="/usuarios/acessver" element={<Acessver />} /> */}
              <Route path="/produtos" element={<CadastroDeProdutos />} />
              <Route path="/produtos/add" element={<InserirProduto />} />
              <Route path="/produtos/remove" element={<RetirarProduto />} />
              {/* <Route path="/produtos/storage" element={<Estoque />} /> */}
              <Route path="/receitas" element={<CadastroDeReceita />} />
              <Route path="/receitas/class" element={<CadastroReceitasPorAula />} />
              <Route path="/compra" element={<CadastroCompra />} />
              <Route path="/fornecedor" element={<Fornecedor />} />
              {/* <Route path="/configuracoes" element={<Configuracoes />} /> */}
              {/* <Route path="/relatorios" element={<Relatorios />} /> */}
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;