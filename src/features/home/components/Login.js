import React from "react";
import LogoGastroFlow from "../../../assets/LogoGastroFlow.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LoginService from "../service/LoginService";
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../../../shared/store/auth-store';

export default function Login() {

  const { setAuthData, fcmToken } = useAuthStore();

  const navigate = useNavigate();

  const [form, setForm] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Preencha ambos os campos abaixo");
      return;
    }

    try {
      const data = await LoginService.loginUser({
        email: form.email,
        password: form.password
      });


      const { token } = data;
      const receivedTokenFromBackend = data.token;

      localStorage.setItem("token", token);

      const decodedUser = jwtDecode(receivedTokenFromBackend);
      setAuthData(receivedTokenFromBackend, decodedUser);
      console.log('Dados do usuário decodificados e armazenados:', decodedUser);

      await LoginService.sendToken({ fcmToken })
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Email ou senha incorretos!");
      } else if (err.response && err.response.status === 403) {
        setError("Acesso negado! Verifique suas credenciais.");
      } else {
        setError("Erro ao tentar fazer login.");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen 
                 bg-gradient-to-br from-orange-500/80 via-yellow-500/70 to-orange-600/80"
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl">

        <section className="flex justify-center items-center mb-4">
          <img
            src={LogoGastroFlow}
            alt="Logo GastroFlow"
            className="w-4/4 max-w-lg h-auto p-4"
          />
        </section>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            id="email"
            name="email"
            type="text"
            value={form.email}
            onChange={handleForm}
            placeholder="Email"
            className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                       focus:ring-2 focus:ring-orange-500"
          />

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleForm}
              placeholder="Senha"
              className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                         focus:ring-2 focus:ring-orange-500 w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl
                       shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
