import React, { useState } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';
import { FaCalendarAlt } from 'react-icons/fa';

const CadastroCompra = () => {
  const [formState, setFormState] = useState({
    notaFiscal: '',
    dataCompra: '',
    produto: '',
    quantidade: '',
    preco: '',
    fornecedor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Compra cadastrada:', formState);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff9d6] text-gray-800 font-sans">
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
          <h2 className="text-lg font-bold">Cadastro de Compra - Gastroflow</h2>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-center justify-center p-6 bg-orange-100 relative">
          <div className="w-full max-w-lg bg-orange-50 rounded-lg shadow-lg p-8">
            <h3 className="text-center text-lg font-bold text-orange-700 mb-5">
              Cadastro de Compra
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nota Fiscal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nota Fiscal (N°)
                </label>
                <input
                  type="text"
                  name="notaFiscal"
                  value={formState.notaFiscal}
                  onChange={handleChange}
                  placeholder="Ex: 123456789"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Data da Compra */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Compra
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dataCompra"
                    value={formState.dataCompra}
                    onChange={handleChange}
                    placeholder="dd/mm/aaaa"
                    className="block w-full rounded-md border border-gray-300 p-2 pr-10 shadow-sm focus:border-orange-500 text-sm"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                  />
                  <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Produto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produto
                </label>
                <input
                  type="text"
                  name="produto"
                  value={formState.produto}
                  onChange={handleChange}
                  placeholder="Ex: Farinha de Trigo"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Quantidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade (g ou ml)
                </label>
                <input
                  type="number"
                  name="quantidade"
                  value={formState.quantidade}
                  onChange={handleChange}
                  placeholder="Ex: 1000"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Preço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço (R$)
                </label>
                <input
                  type="text"
                  name="preco"
                  value={formState.preco}
                  onChange={handleChange}
                  placeholder="Ex: 15.90"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fornecedor
                </label>
                <input
                  type="text"
                  name="fornecedor"
                  value={formState.fornecedor}
                  onChange={handleChange}
                  placeholder="Nome do fornecedor"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Botão */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Cadastrar Compra
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

export default CadastroCompra;
