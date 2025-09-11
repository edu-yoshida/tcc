import React, { useState } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';

const CadastroIngrediente = () => {
  const [formState, setFormState] = useState({
    nomeIngrediente: '',
    quantidade: '',
    justificativa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ingrediente Avulso Salvo:', formState);
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
          <h2 className="text-lg font-bold">Cadastro Avulso - Gastroflow</h2>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-center justify-center p-6 bg-orange-100 relative">
          <div className="w-full max-w-lg bg-[#ffe8a3] rounded-lg shadow-lg p-8">
            <h3 className="text-center text-lg font-bold text-orange-700 mb-5">
              Cadastro de Ingrediente Avulso
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome do Ingrediente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Ingrediente
                </label>
                <input
                  type="text"
                  name="nomeIngrediente"
                  value={formState.nomeIngrediente}
                  onChange={handleChange}
                  placeholder="Ex: Maionese"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Quantidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="text"
                  name="quantidade"
                  value={formState.quantidade}
                  onChange={handleChange}
                  placeholder="Em g ou ml"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Justificativa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Justificativa
                </label>
                <input
                  type="text"
                  name="justificativa"
                  value={formState.justificativa}
                  onChange={handleChange}
                  placeholder="Motivo do uso avulso"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Botão */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none"
                >
                  Salvar Ingrediente
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

export default CadastroIngrediente;
