import React, { useState } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';

const RetirarProduto = () => {
  const [formState, setFormState] = useState({
    ingrediente: '',
    quantidade: '',
    motivo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Retirada registrada:', formState);
  };

  const handleCancel = () => {
    setFormState({ ingrediente: '', quantidade: '', motivo: '' });
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
          <h2 className="text-lg font-bold">Retirar Produtos - GastroFlow</h2>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-center justify-center p-6 bg-orange-100 relative">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ingrediente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingrediente
                </label>
                <select
                  name="ingrediente"
                  value={formState.ingrediente}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                >
                  <option value="">Selecione o ingrediente</option>
                  <option value="Farinha de Trigo">Farinha de Trigo</option>
                  <option value="Açúcar">Açúcar</option>
                  <option value="Leite">Leite</option>
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
                  placeholder="Ex: 100"
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Motivo da Retirada */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo da Retirada
                </label>
                <textarea
                  name="motivo"
                  value={formState.motivo}
                  onChange={handleChange}
                  placeholder="Ex: Aula prática, doação, substituição, validade próxima, etc."
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-orange-500 text-sm"
                />
              </div>

              {/* Botões */}
              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="py-2 px-6 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  Registrar Retirada
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2 px-6 rounded-md shadow-sm text-sm font-medium text-orange-700 bg-orange-100 hover:bg-orange-200"
                >
                  Cancelar
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

export default RetirarProduto;
