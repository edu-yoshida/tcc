import React, { useState } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';

const CadastroReceitasPorAula = () => {
  const [formState, setFormState] = useState({
    nomeAula: '',
    dataAula: '',
    nomeReceita: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formState);
  };

  const handleCancel = () => {
    setFormState({ nomeAula: '', dataAula: '', nomeReceita: '' });
    console.log('Formulário cancelado');
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
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
          <h2 className="text-lg font-bold">Cadastro de Receitas por Aula - GastroFlow</h2>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-center justify-center p-6 bg-orange-100 relative">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome da Aula */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Aula
                </label>
                <input
                  type="text"
                  name="nomeAula"
                  value={formState.nomeAula}
                  onChange={handleChange}
                  placeholder="Ex: Aula 01 - Pães"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Data da Aula */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Aula
                </label>
                <input
                  type="date"
                  name="dataAula"
                  value={formState.dataAula}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Nome da Receita */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Receita
                </label>
                <input
                  type="text"
                  name="nomeReceita"
                  value={formState.nomeReceita}
                  onChange={handleChange}
                  placeholder="Ex: Pão de Queijo"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Botões */}
              <div className="flex flex-col space-y-3 pt-2">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none w-full"
                >
                  Cadastrar Receita na aula
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2 px-4 rounded-md shadow-sm text-sm font-medium bg-orange-300 hover:bg-orange-200 focus:outline-none w-full"
                >
                  Cancelar
                </button>
              </div>
            </form>

            {/* Logo no final */}
            <div className="flex justify-center mt-6">
              <img src={LogoGastroFlow} alt="Logo GastroFlow" className="h-20 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroReceitasPorAula;
