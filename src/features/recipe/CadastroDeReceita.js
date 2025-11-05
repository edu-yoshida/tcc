import React, { useState } from 'react';
import LogoGastroFlow from '../../assets/LogoGastroFlow.png';
import Sidebar from '../../shared/components/Sidebar';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import StockModal from '../../shared/components/StockModal';
import ReceitaService from '../home/service/ReceitaService';

const CadastroDeReceita = () => {
  const [formState, setFormState] = useState({
    nome: '',
    descricao: '',
    produtoIds: [],
    tempoPreparo: '',
    rendimento: '',
    tipo: '',
    professorReceita: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProdutos, setLoadingProdutos] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Limpa o erro do campo conforme o usuário digita
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // 🔎 Função de validação
  const validateForm = () => {
    const newErrors = {};

    if (!formState.nome.trim()) newErrors.nome = 'O nome da receita é obrigatório.';
    if (!formState.descricao.trim()) newErrors.descricao = 'A descrição é obrigatória.';
    if (formState.produtoIds.length === 0) newErrors.produtoIds = 'Adicione pelo menos um ingrediente.';
    if (!formState.tempoPreparo.trim()) newErrors.tempoPreparo = 'Informe o tempo de preparo.';
    if (!formState.rendimento.trim()) newErrors.rendimento = 'Informe o rendimento.';
    if (!formState.tipo.trim()) newErrors.tipo = 'Informe o tipo de receita.';
    if (!formState.professorReceita.trim()) newErrors.professorReceita = 'Informe o professor ou autor.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // retorna true se válido
  };

  // ✅ Função para enviar ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // interrompe o envio se houver erros
    }

    const receitaData = {
      nome: formState.nome,
      descricao: formState.descricao,
      tempoPreparo: formState.tempoPreparo,
      rendimento: formState.rendimento,
      tipo: formState.tipo,
      professorReceita: formState.professorReceita,
      produtoIds: formState.produtoIds.map((ing) => ing.id),
    };

    try {
      setSubmitting(true);
      await ReceitaService.RegisterRecipe(receitaData);
      alert('✅ Receita cadastrada com sucesso!');

      setFormState({
        nome: '',
        descricao: '',
        produtoIds: [],
        tempoPreparo: '',
        rendimento: '',
        tipo: '',
        professorReceita: '',
      });
      setErrors({});
    } catch (error) {
      console.error('❌ Erro ao cadastrar receita:', error);
      alert('Ocorreu um erro ao cadastrar a receita. Verifique o console.');
    } finally {
      setSubmitting(false);
    }
  };

  // Modal
  const openAdjustStockModal = () => setIsModalOpen(true);
  const closeAdjustStockModal = () => setIsModalOpen(false);

  const handleAddIngredients = (ingredientesSelecionados) => {
    setFormState((prev) => ({
      ...prev,
      produtoIds: [...prev.produtoIds, ...ingredientesSelecionados],
    }));
    setIsModalOpen(false);
    setErrors((prev) => ({ ...prev, produtoIds: '' }));
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setFormState((prev) => ({
      ...prev,
      produtoIds: prev.produtoIds.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff9d6] text-gray-800 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* TOPBAR */}
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden shadow-lg">
          <h2 className="text-2xl font-extrabold tracking-tight">Cadastro de Receitas</h2>
          <p className="text-sm opacity-90">GastroFlow</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="flex-1 flex items-start justify-center md:p-6 overflow-y-auto relative">
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome da Receita</label>
                <input
                  type="text"
                  name="nome"
                  value={formState.nome}
                  onChange={handleChange}
                  placeholder="Ex: Pão de Queijo"
                  className={`block w-full rounded-lg border p-3 text-sm transition ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
              </div>

              {/* Ingredientes */}
              <div className="flex flex-col space-y-3">
                <label className="text-xl text-gray-800">Ingredientes</label>

                <button
                  type="button"
                  onClick={openAdjustStockModal}
                  className="py-2 px-4 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition flex items-center justify-center space-x-1"
                >
                  <FaPlusCircle className="mr-1" size={16} /> Adicionar Ingredientes
                </button>

                {errors.produtoIds && (
                  <p className="text-red-500 text-xs mt-1">{errors.produtoIds}</p>
                )}

                {formState.produtoIds.length > 0 && (
                  <div className="mt-4 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      Ingredientes Selecionados
                    </h3>

                    <ul className="divide-y divide-gray-200">
                      {formState.produtoIds.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-2 px-2 hover:bg-orange-50 rounded-lg transition-all duration-150"
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-lg">
                              {item.nomeProduto}
                            </span>
                            <div className="text-xs text-gray-500">
                              {item.categoria && (
                                <span className="mr-2">
                                  Categoria: <span className="text-gray-700">{item.categoria}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(index)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-all duration-200"
                            title="Remover ingrediente"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                <input
                  name="descricao"
                  value={formState.descricao}
                  onChange={handleChange}
                  placeholder="Adicione uma breve descrição"
                  className={`block w-full rounded-lg border p-3 text-sm transition h-24 ${
                    errors.descricao ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.descricao && <p className="text-red-500 text-xs mt-1">{errors.descricao}</p>}
              </div>

              {/* Tempo e Rendimento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Tempo de Preparo (min)
                  </label>
                  <input
                    type="text"
                    name="tempoPreparo"
                    value={formState.tempoPreparo}
                    onChange={handleChange}
                    placeholder="Ex: 45"
                    className={`block w-full rounded-lg border p-3 text-sm transition ${
                      errors.tempoPreparo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.tempoPreparo && (
                    <p className="text-red-500 text-xs mt-1">{errors.tempoPreparo}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Rendimento (porções)
                  </label>
                  <input
                    type="text"
                    name="rendimento"
                    value={formState.rendimento}
                    onChange={handleChange}
                    placeholder="Ex: 8"
                    className={`block w-full rounded-lg border p-3 text-sm transition ${
                      errors.rendimento ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.rendimento && (
                    <p className="text-red-500 text-xs mt-1">{errors.rendimento}</p>
                  )}
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tipo de Receita
                </label>
                <input
                  type="text"
                  name="tipo"
                  value={formState.tipo}
                  onChange={handleChange}
                  placeholder="Ex: Sobremesa, Prato Principal..."
                  className={`block w-full rounded-lg border p-3 text-sm transition ${
                    errors.tipo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.tipo && <p className="text-red-500 text-xs mt-1">{errors.tipo}</p>}
              </div>

              {/* Professor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Professor/Autor
                </label>
                <input
                  type="text"
                  name="professorReceita"
                  value={formState.professorReceita}
                  onChange={handleChange}
                  placeholder="Nome do responsável pela receita"
                  className={`block w-full rounded-lg border p-3 text-sm transition ${
                    errors.professorReceita ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.professorReceita && (
                  <p className="text-red-500 text-xs mt-1">{errors.professorReceita}</p>
                )}
              </div>

              {/* Botões */}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-3 px-4 rounded-lg shadow-md text-base font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition w-full"
                >
                  {submitting ? 'Salvando...' : 'Cadastrar Receita'}
                </button>
                <button
                  type="button"
                  onClick={() => console.log('Cancelar')}
                  className="py-3 px-4 rounded-lg shadow-sm text-base font-medium bg-orange-300 hover:bg-orange-400 text-gray-800 transition w-full"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <img
            src={LogoGastroFlow}
            alt="Logo"
            className="hidden md:block absolute right-10 bottom-10 w-40 opacity-80"
          />
        </div>
      </div>

      <StockModal
        isOpen={isModalOpen}
        onClose={closeAdjustStockModal}
        onAddIngredients={handleAddIngredients}
        loadingProdutos={loadingProdutos}
      />
    </div>
  );
};

export default CadastroDeReceita;
