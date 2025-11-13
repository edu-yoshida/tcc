import React, { useState, useEffect } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import RecipeModal from '../../shared/components/RecipeModal';
import AulaService from '../home/service/AulaService';

// Ícone de remover
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const AulasReceitas = () => {
  const [formState, setFormState] = useState({
    nome: "",
    descricao: "",
    data: "",
    instrutor: "",
    materia: "",
    semestre: "",
    modulo: "",
    periodo: "",
    receitasSelecionadas: [], // ← única fonte de verdade
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Adiciona múltiplas receitas (inclusive duplicadas)
  const handleAddReceitas = (novasReceitas) => {
    setFormState((prev) => ({
      ...prev,
      receitasSelecionadas: [...prev.receitasSelecionadas, ...novasReceitas],
    }));
  };

  // Remove uma receita específica (apenas uma ocorrência)
  const handleRemoveReceita = (index) => {
    setFormState((prev) => {
      const novas = [...prev.receitasSelecionadas];
      novas.splice(index, 1);
      return { ...prev, receitasSelecionadas: novas };
    });
  };

  // Submete o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const receitaIds = formState.receitasSelecionadas.map((r) => r.id);

      const response = await AulaService.RegisterAula({
        nome: formState.nome,
        descricao: formState.descricao,
        data: formState.data,
        instrutor: formState.instrutor,
        materia: formState.materia,
        semestre: formState.semestre,
        modulo: formState.modulo,
        periodo: formState.periodo,
        receitaIds: receitaIds, // ex: [1, 1, 2, 3, 3]
      });

      console.log("✅ Aula enviada com sucesso:", response);
      setSubmissionMessage("✅ Aula cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar aula:", error);
      setSubmissionMessage("❌ Erro ao cadastrar aula.");
    }
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

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col bg-orange-100">
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
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 border border-orange-200">
            {submissionMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center font-medium">
                {submissionMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formState.nome}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  name="descricao"
                  value={formState.descricao}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                />
              </div>

              {/* Data e Instrutor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    name="data"
                    value={formState.data}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Instrutor
                  </label>
                  <input
                    type="text"
                    name="instrutor"
                    value={formState.instrutor}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                  />
                </div>
              </div>

              {/* Matéria */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Matéria
                </label>
                <input
                  type="text"
                  name="materia"
                  value={formState.materia}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition"
                />
              </div>

              {/* Semestre, Módulo e Período */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Semestre
                  </label>
                  <select
                    name="semestre"
                    value={formState.semestre}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition"
                  >
                    <option value="">Selecione</option>
                    <option value="1">1º</option>
                    <option value="2">2º</option>
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
                    <option value="">Selecione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Período
                  </label>
                  <select
                    name="periodo"
                    value={formState.periodo}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition"
                  >
                    <option value="">Selecione</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                  </select>
                </div>
              </div>

              {/* Receitas */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Receitas Associadas
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
                    formState.receitasSelecionadas.map((recipe, index) => (
                      <div
                        key={`${recipe.id}-${index}`}
                        className="flex justify-between items-center p-2 text-sm bg-white rounded-md shadow-sm border border-gray-100"
                      >
                        <span className="truncate">{recipe.nome}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveReceita(index)}
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
        onAddReceitas={handleAddReceitas}
      />
    </div>
  );
};

export default AulasReceitas;
