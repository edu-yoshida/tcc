import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";
import Sidebar from "../../shared/components/Sidebar";

const InserirProduto = () => {
  const [formState, setFormState] = useState({
    ingrediente: "",
    quantidade: "",
    dataValidade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inserir produto:", formState);
    // aqui você chamaria o service/api para salvar
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff5e6] text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Área direita */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-center">
          <h2 className="text-lg font-bold">Inserir Produtos - GastroFlow</h2>
        </div>

        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#fff5e6]">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-md p-8 w-full max-w-md space-y-5"
          >
            {/* Ingrediente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingrediente
              </label>
              <select
                name="ingrediente"
                value={formState.ingrediente}
                onChange={handleChange}
                className="block w-full rounded-md border border-orange-400 focus:border-orange-500 p-2 text-sm"
              >
                <option value="">Selecione o ingrediente</option>
                <option value="arroz">Arroz</option>
                <option value="feijao">Feijão</option>
                <option value="carne">Carne</option>
              </select>
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
                placeholder="100"
                className="block w-full rounded-md border border-orange-400 focus:border-orange-500 p-2 text-sm"
              />
            </div>

            {/* Data de Validade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Validade
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="dataValidade"
                  value={formState.dataValidade}
                  onChange={handleChange}
                  placeholder="dd/mm/aaaa"
                  className="block w-full rounded-md border border-orange-400 focus:border-orange-500 p-2 pr-10 text-sm"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col space-y-3 pt-2">
              <button
                type="submit"
                className="py-2 px-4 rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 w-full"
              >
                Registrar Inserção
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormState({ ingrediente: "", quantidade: "", dataValidade: "" });
                }}
                className="py-2 px-4 rounded-md text-sm font-medium bg-orange-200 hover:bg-orange-300 w-full"
              >
                Cancelar
              </button>
            </div>
          </form>

          {/* Logo centralizada abaixo */}
          <div className="mt-8 flex justify-center">
            <img
              src={LogoGastroFlow}
              alt="Logo GastroFlow"
              className="h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InserirProduto;