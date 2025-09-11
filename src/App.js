// src/App.jsx
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './features/home/components/Login';
import SplashScreen from './features/home/components/SplashScreen';
import CadastroUsuario from "./features/home/components/CadastroUsuario";
import Sidebar from "./shared/components/Sidebar";
import CadastroDeProdutos from "./features/home/CadastroDeProdutos";
import InserirProduto from "./features/storage/InserirProduto";
import CadastroDeReceita from "./features/recipe/CadastroDeReceita";
import CadastroCompra from "./features/supplies/Compra";
import CadastroReceitasPorAula from "./features/recipe/CadastroReceitaPorAula";
import CadastroIngrediente from "./features/recipe/CadastroDeIngrediente";
import Fornecedor from "./features/supplies/Fornecedor";
import RetirarProduto from "./features/storage/RetirarProduto";


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
    <div>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
            <Route path="/" element={<Login />} />

            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/acessver" element={<Acessver />} />

            <Route path="/produtos" element={<CadastroDeProdutos />} />
            <Route path="/produtos/add" element={<InserirProduto />} />
            <Route path="/produtos/remove" element={<RetirarProduto />} />
            <Route path="/produtos/storage" element={<Estoque />} />


            

            <Route path="/receitas" element={<CadastroDeReceita />} />
            <Route path="/receitas/class" element={<CadastroReceitasPorAula />} />
            <Route path="/receitas/ingrediente" element={<CadastroIngrediente />} />

            <Route path="/compra" element={<CadastroCompra />} />
            <Route path="/fornecedor" element={<Fornecedor />} />
           
            
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/relatorios" element={<Relatorios />} />
            
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;