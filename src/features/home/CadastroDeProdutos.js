import React, { useState } from 'react';
import LogoGastroFlow from '../../imagens/LogoGastroFlow.png';
import Sidebar from '../../shared/components/Sidebar';

const CadastroDeProdutos = () => {
  const [formState, setFormState] = useState({
    nome: '',
    unidadeMedida: 'gramas',
    categoria: '',
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Ingrediente cadastrado com sucesso!');
    console.log('Formulário enviado:', formState);
  };

  return (
  // Layout principal 
  <div className="flex w-screen h-screen overflow-hidden bg-[#ffffff] text-gray-800 font-sans">
    {/* Sidebar */}
    <aside className="w-64 shrink-0">
      <div className="h-full overflow-y-auto">
        <Sidebar />
      </div>
    </aside>

    {/* Direita: Topbar + Conteúdo */}
    <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-orange-100">
      {/* Topbar */}
      <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
        <h2 className="text-2xl font-bold">Cadastrar Produtos</h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4 md:p-6 bg-orange-100 relative">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

          {/* Formulário */}
          <div className="w-full md:w-[520px] flex-shrink-0 bg-white rounded-2xl p-8 shadow-lg flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Cadastrar novo ingrediente
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Ingrediente
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formState.nome}
                  onChange={handleChange}
                  placeholder="Ex: Arroz Branco"
                  className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 p-2 text-sm"
                  required
                />
              </div>

              {/* Unidade + Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    name="unidadeMedida"
                    value={formState.unidadeMedida}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 p-2 text-sm"
                  >
                    <option value="gramas">Gramas (g)</option>
                    <option value="ml">Mililitros (ml)</option>
                    <option value="unidade">Unidade (un)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    value={formState.categoria}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 p-2 text-sm"
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="graos">Grãos</option>
                    <option value="carnes">Carnes</option>
                    <option value="vegetais">Vegetais</option>
                  </select>
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col space-y-3 pt-2">
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 transition"
                >
                  Cadastrar Ingrediente
                </button>
                <button
                  type="button"
                  onClick={() => console.log('Cancelar')}
                  className="py-2 px-4 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          {/* Logo */}
          <div className="hidden md:flex flex-1 items-center justify-center rounded-2xl p-6">
            <img
              src={LogoGastroFlow}
              alt="Logo"
              className="flex-1 max-w-full h-[21rem]  object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default CadastroDeProdutos;