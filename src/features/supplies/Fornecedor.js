import React, { useState } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';

const Fornecedor = () => {
  const [formState, setFormState] = useState({
    nomeFornecedor: '',
    cnpj: '',
    telefone: '',
    email: '',
    produtoFornecido: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fornecedor Cadastrado:', formState);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff3e0] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-center">
          <h2 className="text-lg font-bold">Cadastro de Fornecedor - Gastroflow</h2>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-center justify-center p-6 bg-orange-100 relative">
          <div className="w-full max-w-lg bg-[#ffe0b2] rounded-lg shadow-lg p-8">
            <h3 className="text-center text-lg font-bold text-orange-700 mb-5">
              Cadastro de Fornecedor
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome do Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Fornecedor
                </label>
                <input
                  type="text"
                  name="nomeFornecedor"
                  value={formState.nomeFornecedor}
                  onChange={handleChange}
                  placeholder="Ex: Distribuidora Silva"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* CNPJ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  name="cnpj"
                  value={formState.cnpj}
                  onChange={handleChange}
                  placeholder="Ex: 00.000.000/0001-00"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  name="telefone"
                  value={formState.telefone}
                  onChange={handleChange}
                  placeholder="Ex: (85) 91234-5678"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* E-mail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Ex: fornecedor@email.com"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Produto Fornecido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produto Fornecido
                </label>
                <input
                  type="text"
                  name="produtoFornecido"
                  value={formState.produtoFornecido}
                  onChange={handleChange}
                  placeholder="Ex: Arroz, Feijão..."
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Botão */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Cadastrar Fornecedor
                </button>
              </div>
            </form>

            {/* Logo */}
            <div className="flex justify-center mt-6">
              <img src={LogoGastroFlow} alt="Logo GastroFlow" className="h-20 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fornecedor;
