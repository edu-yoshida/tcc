import React, { useState, useEffect } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import RecipeModal from '../../shared/components/RecipeModal';

// Mock Data (exemplo para select)
const MOCK_DISCIPLINAS = [
  'Gastronomia',
  'Panificação',
  'Confeitaria',
  'Cozinha Regional',
  'Bebidas',
];

// Ícones inline
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const AulasReceitas = () => {
  const [formState, setFormState] = useState({
    nome: '',
    disciplina: MOCK_DISCIPLINAS[0],
    descricao: '',
    modulo: '1',
    receitasSelecionadas: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Adiciona receita vinda do modal
  const handleAddReceita = (novaReceita) => {
    const jaExiste = formState.receitasSelecionadas.some(
      (r) => r.id === novaReceita.id
    );
    if (!jaExiste) {
      setFormState((prev) => ({
        ...prev,
        receitasSelecionadas: [...prev.receitasSelecionadas, novaReceita],
      }));
    }
  };

  // Remove receita da lista
  const handleRemoveReceita = (receita) => {
    setFormState((prev) => ({
      ...prev,
      receitasSelecionadas: prev.receitasSelecionadas.filter(
        (r) => r.id !== receita.id
      ),
    }));
  };

  // Submete o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da Aula para Cadastro:', formState);
    setSubmissionMessage('Aula cadastrada com sucesso! ✅');
  };

  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => setSubmissionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionMessage]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl shadow-xl px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Cadastro de Aulas e Receitas
          </h2>
          <p className="text-sm mt-1 opacity-90">
            Organize o currículo da sua escola com GastroFlow.
          </p>
        </div>

        {/* Formulário */}
        <div className="flex-1 flex items-start justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 border border-orange-200">
            {submissionMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center font-medium">
                {submissionMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome da Aula
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formState.nome}
                  onChange={handleChange}
                  placeholder="Ex: Pães Fermentados e Técnicas de Sobremesa"
                  required
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                />
              </div>

              {/* Disciplina e módulo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Disciplina
                  </label>
                  <select
                    name="disciplina"
                    value={formState.disciplina}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition"
                  >
                    {MOCK_DISCIPLINAS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Módulo
                  </label>
                  <select
                    name="modulo"
                    value={formState.modulo}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  rows="4"
                  value={formState.descricao}
                  onChange={handleChange}
                  placeholder="Detalhe os objetivos da aula."
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                />
              </div>

              {/* Receitas */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Receitas Selecionadas
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center flex-grow py-3 px-4 rounded-lg shadow-md text-sm font-bold text-orange-800 bg-orange-200 hover:bg-orange-300 border-2 border-orange-300 transition"
                  >
                    Selecionar Receitas ({formState.receitasSelecionadas.length})
                  </button>
                </div>

                <div className="mt-3 space-y-2 max-h-40 overflow-y-auto p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  {formState.receitasSelecionadas.length > 0 ? (
                    formState.receitasSelecionadas.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex justify-between items-center p-2 text-sm bg-white rounded-md shadow-sm border border-gray-100"
                      >
                        <span className="truncate">{recipe.nome}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveReceita(recipe)}
                          className="text-red-500 hover:text-red-700 transition p-1"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm italic">
                      Nenhuma receita associada a esta aula ainda.
                    </p>
                  )}
                </div>
              </div>

              {/* Botão de submit */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-lg shadow-lg text-base font-bold text-white bg-orange-600 hover:bg-orange-700 transition transform hover:scale-[1.02]"
                >
                  Cadastrar Aula
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de receitas */}
      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddReceita={handleAddReceita}
      />
    </div>
  );
};

export default AulasReceitas;