import React from 'react';
import logo from "../../../imagens/LogoGastroFlow.png";
import api from "../../../shared/utils/api";

const CadastroUsuario = () => {
    const [form, setForm] = React.useState({
        usuario: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const [error, setError] = React.useState('');

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const validarEmail = (email) => {
    return email.includes('@') && email.includes('.');
};  

    const sendData = async (e) => {
        e.preventDefault();

        if (!form.usuario || !form.email || !form.senha || !form.confirmarSenha) {
            setError('Todos os campos são obrigatórios!');
            return;
        }

        if (!validarEmail(form.email)) {
            setError('Digite um e-mail válido!');
            return;
        }

        if (form.senha !== form.confirmarSenha) {
            setError('As senhas não coincidem!');
            return;
        }

        try {
            const data = await api.post('/usuarios', form);
            console.log(data);
            alert("Usuário cadastrado com sucesso!");
            setForm({ usuario: '', email: '', senha: '', confirmarSenha: '' });
        } catch (err) {
            console.log(err);
            setError("Erro ao cadastrar usuário.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen 
                    bg-gradient-to-br from-orange-500/80 via-yellow-500/70 to-orange-600/80">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl">
                <form onSubmit={sendData} className="flex flex-col gap-5">

                    {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

                    <input
                        id="usuario"
                        name="usuario"
                        type="text"
                        value={form.usuario}
                        onChange={handleForm}
                        placeholder="Usuário"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                       focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleForm}
                        placeholder="Email"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                       focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        id="senha"
                        name="senha"
                        type="password"
                        value={form.senha}
                        onChange={handleForm}
                        placeholder="Senha"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                       focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                        id="confirmarSenha"
                        name="confirmarSenha"
                        type="password"
                        value={form.confirmarSenha}
                        onChange={handleForm}
                        placeholder="Confirmar Senha"
                        className="p-3 rounded-xl border-2 border-orange-300 outline-none transition
                       focus:ring-2 focus:ring-orange-500"
                    />

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl
                       shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CadastroUsuario;
