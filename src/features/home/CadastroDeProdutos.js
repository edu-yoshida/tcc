import React, { useState } from 'react';
import { FaBox, FaCalendarAlt } from 'react-icons/fa';
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

  const handleImageChange = (e) => {
    setFormState((prev) => ({ ...prev, imagem: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formState);
  };

  return (
    // TELA TODA (amarelo)
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff9d6] text-gray-800 font-sans">
      {/* BARRA LATERAL (laranja) */}
      <aside className="w-64 shrink-0 ">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* DIREITA: Topbar + Conteúdo */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR (roxo) */}
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-center">
          <h2 className="text-lg font-bold">Cadastro de Produtos - GastroFlow</h2>
        </div>

        {/* CONTEÚDO (cinza invisível) */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-4 md:p-6 bg-orange-100 relative">
          {/* QUADRO CENTRAL (moldura preta/cinza) */}
          <div
            className="w-full max-w-5xl mx-auto"
            // altura = 100vh - topbar(4rem) - paddings verticais (~3rem) => sem scroll
            style={{ height: 'calc(100vh - 4rem - 3rem)' }}
          >
            {/* CONTEÚDO DO QUADRO */}
            <div className="h-full w-full flex flex-col md:flex-row items-start justify-between p-6 md:p-8 gap-6">
              {/* FORM (vermelho, alto e estreito à esquerda) */}
              <div className="w-full md:w-[520px] h-full rounded-lg bg-white p-5 h-full">
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500  p-2 border text-sm"
                    />
                  </div>

                  {/* Unidade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidade de Medida
                    </label>
                    <select
                      name="unidadeMedida"
                      value={formState.unidadeMedida}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500  p-2 border text-sm"
                    >
                      <option value="gramas">Gramas (g)</option>
                      <option value="ml">Mililitros (ml)</option>
                      <option value="unidade">Unidade (un)</option>
                    </select>
                  </div>

                  {/* Categoria */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoria
                    </label>
                    <select
                      name="categoria"
                      value={formState.categoria}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500  p-2 border text-sm"
                    >
                      <option value="">Selecione a categoria</option>
                      <option value="graos">Grãos</option>
                      <option value="carnes">Carnes</option>
                      <option value="vegetais">Vegetais</option>
                    </select>
                  </div>

                  {/* Data */}
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
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500  p-2 border pr-10 text-sm"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Imagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Adicionar imagem do produto (opcional)
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
                          className="h-20 w-auto object-contain"
                        />
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center text-gray-400 text-xs">
                          <FaBox className="w-10 h-10" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex flex-col space-y-3 pt-2">
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none  w-full"
                    >
                      Cadastrar Ingrediente
                    </button>
                    <button
                      type="button"
                      onClick={() => console.log('Cancelar')}
                      className="py-2 px-4 rounded-md shadow-sm text-sm font-medium  bg-orange-300 hover:bg-orange-200 focus:outline-none  w-full"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>

              {/* LOGO (ciano, quadrado à direita) */}
              <div className="w-1/3 ">
                <img
                  src={LogoGastroFlow}
                  alt="Logo"
                  className="absolute top-40 left-100 w-100 h-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroDeProdutos;
