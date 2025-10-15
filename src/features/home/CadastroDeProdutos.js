import React, { useState } from 'react';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';
import Sidebar from '../../shared/components/Sidebar';

const CadastroDeProdutos = () => {
  const [formState, setFormState] = useState({
    nome: '',
    unidadeMedida: 'gramas',
    categoria: '',
    dataValidade: '',
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formState);
  };

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#fff9d6] text-gray-800 font-sans">
      {/* DIREITA: Topbar + Conteúdo */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-between shadow-lg px-6">
          {/* BOTÃO / SIDEBAR */}
          <div className="flex items-center">
            <Sidebar />
          </div>

          {/* TÍTULO CENTRAL */}
          <h2 className="text-lg font-bold text-center flex-1">
            Cadastro de Produtos - GastroFlow
          </h2>

          {/* Espaço fantasma para balancear visualmente */}
          <div className="w-10" />
        </div>

        {/* CONTEÚDO CENTRAL */}
        <div className="flex-1 flex items-center justify-center bg-orange-100 relative overflow-y-auto p-6">

          {/* CONTAINER PRINCIPAL */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl">

            {/* FORMULÁRIO */}
            <div className="w-full max-w-md md:w-[480px] rounded-xl shadow-2xl bg-white p-8">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Nome do Ingrediente
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formState.nome}
                    onChange={handleChange}
                    placeholder="Ex: Arroz"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-sm transition duration-150"
                  />
                </div>

                {/* Unidade */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    name="unidadeMedida"
                    value={formState.unidadeMedida}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-sm bg-white transition duration-150"
                  >
                    <option value="gramas">Gramas (g)</option>
                    <option value="ml">Mililitros (ml)</option>
                    <option value="unidade">Unidade (un)</option>
                  </select>
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    name="categoria"
                    value={formState.categoria}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-3 border text-sm bg-white transition duration-150"
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="graos">Grãos</option>
                    <option value="carnes">Carnes</option>
                    <option value="vegetais">Vegetais</option>
                  </select>
                </div>

                {/* Botões */}
                <div className="flex flex-col space-y-3 pt-4">
                  <button
                    type="submit"
                    className="py-3 px-4 rounded-lg shadow-md text-base font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full transition duration-150 transform hover:scale-[1.01]"
                  >
                    Cadastrar Ingrediente
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log('Cancelar')}
                    className="py-3 px-4 rounded-lg shadow-md text-base font-bold text-gray-700 bg-orange-200 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full transition duration-150"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            {/* LOGO */}
            <div className="hidden md:flex items-center justify-center w-[400px] h-[400px]">
              <img
                src={LogoGastroFlow}
                alt="Logo GastroFlow"
                className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] object-contain"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroDeProdutos;