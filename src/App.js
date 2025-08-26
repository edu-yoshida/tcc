// src/App.jsx
import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './features/home/components/Login';
import SplashScreen from './features/home/components/SplashScreen';
import CadastroUsuario from "./features/home/components/CadastroUsuario";

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
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;