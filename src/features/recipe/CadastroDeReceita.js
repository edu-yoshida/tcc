import React, { useState } from 'react';
import { FaBox } from 'react-icons/fa';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';
import Sidebar from '../../shared/components/Sidebar';

const CadastroDeReceita = () => {
    const [formState, setFormState] = useState({
    nome: '',
    descricao: '',
    ingredientes: '',
    imagem: null,
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
    setFormState((prev) => ({ ...prev, imagem: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formState);
    };

    return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff9d6] text-gray-800 font-sans">
        {/* SIDEBAR */}
        <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
            <Sidebar />
        </div>
        </aside>

        {/* DIREITA */}
        <div className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR */}
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-center">
            <h2 className="text-lg font-bold">Cadastro de Receitas - GastroFlow</h2>
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-6 bg-orange-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Receita
                </label>
                <input
                    type="text"
                    name="nome"
                    value={formState.nome}
                    onChange={handleChange}
                    placeholder="Ex: Pão de Queijo"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 p-2 border text-sm"
                />
                </div>

                {/* Descrição */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição da Receita
                </label>
                <textarea
                    name="descricao"
                    value={formState.descricao}
                    onChange={handleChange}
                    placeholder="Descreva a receita"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 p-2 border text-sm h-20"
                />
                </div>

                {/* Ingredientes */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredientes
                </label>
                <textarea
                    name="ingredientes"
                    value={formState.ingredientes}
                    onChange={handleChange}
                    placeholder="Liste os ingredientes da receita"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 p-2 border text-sm h-20"
                />
                </div>

                {/* Imagem */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adicionar imagem da receita (opcional)
                </label>
                <div className="flex items-center gap-4 mt-1">
                    <input
                    type="file"
                    name="imagem"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    />
                    <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                    Escolher Arquivo
                    </label>
                    {formState.imagem ? (
                    <span className="text-sm text-gray-600">{formState.imagem.name}</span>
                    ) : (
                    <span className="text-sm text-gray-400">Nenhum arquivo escolhido</span>
                    )}
                </div>
                <div className="mt-4 p-2 border border-gray-300 rounded-md w-fit bg-gray-50">
                    {formState.imagem ? (
                    <img
                        src={URL.createObjectURL(formState.imagem)}
                        alt="Preview"
                        className="h-24 w-auto object-contain"
                    />
                    ) : (
                    <div className="h-24 w-24 flex items-center justify-center text-gray-400 text-xs">
                        <FaBox className="w-10 h-10" />
                    </div>
                    )}
                </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col space-y-3 pt-2">
                <button
                    type="submit"
                    className="py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none w-full"
                >
                    Cadastrar Receita
                </button>
                <button
                    type="button"
                    onClick={() => console.log('Cancelar')}
                    className="py-2 px-4 rounded-md shadow-sm text-sm font-medium bg-orange-300 hover:bg-orange-200 focus:outline-none w-full"
                >
                    Cancelar
                </button>
                </div>
            </form>
            </div>

            {/* Logo (fixo no canto direito) */}
            <img
            src={LogoGastroFlow}
            alt="Logo"
            className="absolute right-10 bottom-10 w-40 opacity-80"
            />
        </div>
        </div>
    </div>
    );
};

export default CadastroDeReceita;
