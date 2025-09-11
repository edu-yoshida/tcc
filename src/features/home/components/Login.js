import React from "react";
import logo from "../../../imagens/LogoGastroFlow.png";
import api from "../../../shared/utils/api";
import { Link } from "react-router-dom";

export default function Login() {

    const [form, setForm] = React.useState({ usuario: '', senha: '' })

    const [error, setError] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.user || !form.password) {
            setError("Preencha ambos os campos abaixo")
            return;
        } else {
            setError("")
        }

        if (/['";=<>]/.test(form.user)) {
            setError("Usuário contém caracteres inválidos");
            return;

        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen 
                        bg-gradient-to-br from-orange-500/80 via-yellow-500/70 to-orange-600/80">

            <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl ">

                <section className="flex justify-center items-center ">
                    <img
                        src={logo}
                        alt="Logo GastroFlow"
                        className="w-4/4 max-w-lg h-auto p-6"
                    />
                </section>

                {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        id="user"
                        name="user"
                        type="text"
                        value={form.user}
                        onChange={handleForm}
                        placeholder="Usuário"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                                   focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleForm}
                        placeholder="Senha"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                                   focus:ring-2 focus:ring-orange-500"
                    />
                    <Link to="/produtos"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl
                                    shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0
                                    flex justify-center items-center"
                        >
                        Entrar
                    </Link>
                </form>

                <Link
                    to="/CadastroUsuario"
                    className="block text-center text-orange-600 font-bold mt-6 cursor-pointer 
                               hover:text-orange-500 hover:underline"
                >
                    Cadastrar novo usuário
                </Link>
            </div>
        </div>
    );
}