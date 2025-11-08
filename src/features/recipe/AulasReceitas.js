import React, { useState, useEffect } from 'react';
import Sidebar from '../../shared/components/Sidebar';
import RecipeModal from '../../shared/components/RecipeModal';
// Note: Imports for Sidebar, LogoGastroFlow, and Firebase utilities are omitted/simulated
// to comply with the single-file mandate. We are using functional components and hooks.

// --- Mock Data and Utilities (Simulating external imports) ---

// Mock data for the select field
const MOCK_DISCIPLINAS = ['Gastronomia', 'Panificação', 'Confeitaria', 'Cozinha Regional', 'Bebidas'];
const MOCK_RECEITAS = [
  { id: 'r1', name: 'Pão Italiano' },
  { id: 'r2', name: 'Bolo Red Velvet' },
  { id: 'r3', name: 'Risoto de Camarão' },
  { id: 'r4', name: 'Mousse de Maracujá' },
  { id: 'r5', 'name': 'Moqueca Baiana' },
  { id: 'r6', 'name': 'Torta Holandesa' },
];

// Inline SVG Icon for selection (lucide-react check)
const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

// Inline SVG Icon for close (lucide-react x)
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);



const App = () => {
  // 1. State for the new form fields and the modal
  const [formState, setFormState] = useState({
    nome: '',
    disciplina: MOCK_DISCIPLINAS[0], // Default to the first discipline
    descricao: '',
    modulo: '1', // Default to module 1 (string for select)
    receitasSelecionadas: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  // 2. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleRecipe = (recipe) => {
    setFormState(prev => {
      const isSelected = prev.receitasSelecionadas.some(r => r.id === recipe.id);
      const newRecipes = isSelected
        ? prev.receitasSelecionadas.filter(r => r.id !== recipe.id)
        : [...prev.receitasSelecionadas, recipe];
      return { ...prev, receitasSelecionadas: newRecipes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da Aula para Cadastro:', formState);

    // Show confirmation message
    setSubmissionMessage('Aula cadastrada com sucesso! Verifique o console para os dados completos.');

    // Optionally clear form after successful submission
    // handleCancel();
  };

  const handleCancel = () => {
    setFormState({
      nome: '',
      disciplina: MOCK_DISCIPLINAS[0],
      descricao: '',
      modulo: '1',
      receitasSelecionadas: [],
    });
    setSubmissionMessage('Formulário cancelado/limpo.');
    console.log('Formulário cancelado');
  };

  // Clear submission message after a delay
  useEffect(() => {
    if (submissionMessage) {
      const timer = setTimeout(() => setSubmissionMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submissionMessage]);


  // 3. Render
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar (Simulated) */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl shadow-xl overflow-hidden px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">Cadastro de Aulas e Receitas</h2>
          <p className="text-sm mt-1 opacity-90">Organize o currículo da sua escola com GastroFlow.</p>
        </div>

        {/* Área do conteúdo */}
        <div className="flex-1 flex items-start justify-center p-6 sm:p-10 relative overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-orange-200">
            
            {/* Submission Message */}
            {submissionMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center font-medium">
                {submissionMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nome da Aula */}
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome da Aula
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formState.nome}
                  onChange={handleChange}
                  placeholder="Ex: Pães Fermentados e Técnicas de Sobremesa"
                  required
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition duration-200 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Disciplina (Select) */}
                <div>
                  <label htmlFor="disciplina" className="block text-sm font-semibold text-gray-700 mb-2">
                    Disciplina
                  </label>
                  <select
                    id="disciplina"
                    name="disciplina"
                    value={formState.disciplina}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition duration-200 text-base appearance-none"
                  >
                    {MOCK_DISCIPLINAS.map((disc) => (
                      <option key={disc} value={disc}>{disc}</option>
                    ))}
                  </select>
                </div>

                {/* Módulo (Select) */}
                <div>
                  <label htmlFor="modulo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Módulo
                  </label>
                  <select
                    id="modulo"
                    name="modulo"
                    value={formState.modulo}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner bg-white focus:border-orange-500 transition duration-200 text-base appearance-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>


              {/* Descrição (Textarea) */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  rows="4"
                  value={formState.descricao}
                  onChange={handleChange}
                  placeholder="Detalhe os objetivos de aprendizado, métodos e carga horária da aula."
                  className="block w-full rounded-lg border-2 border-gray-300 p-3 shadow-inner focus:border-orange-500 transition duration-200 text-base"
                ></textarea>
              </div>

              {/* Receitas (Modal Trigger and Display) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receitas Selecionadas
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center flex-grow py-3 px-4 rounded-lg shadow-md text-sm font-bold text-orange-800 bg-orange-200 hover:bg-orange-300 transition duration-200 border-2 border-orange-300"
                  >
                    Selecionar Receitas ({formState.receitasSelecionadas.length})
                  </button>
                </div>
                
                {/* List of selected recipes */}
                <div className="mt-3 space-y-2 max-h-40 overflow-y-auto p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                  {formState.receitasSelecionadas.length > 0 ? (
                    formState.receitasSelecionadas.map((recipe) => (
                      <div key={recipe.id} className="flex justify-between items-center p-2 text-sm bg-white rounded-md shadow-sm border border-gray-100">
                        <span className="truncate">{recipe.name}</span>
                        <button 
                          type="button" 
                          onClick={() => handleToggleRecipe(recipe)}
                          className="text-red-500 hover:text-red-700 transition duration-150 p-1"
                          title="Remover receita"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm italic">Nenhuma receita associada a esta aula ainda.</p>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row-reverse space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse pt-4">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-lg shadow-lg text-base font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none w-full sm:w-auto transition transform hover:scale-[1.02]"
                >
                  Cadastrar Nova Aula
                </button>
              </div>
            </form>

            {/* Logo no final (Simulated) */}
            <div className="flex justify-center mt-10">
              <span className="text-4xl font-serif font-extrabold text-orange-700 italic">GastroFlow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Selection Modal */}
      {isModalOpen && (
        <RecipeModal
          mockReceitas={MOCK_RECEITAS}
          selectedRecipes={formState.receitasSelecionadas}
          onToggleRecipe={handleToggleRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;