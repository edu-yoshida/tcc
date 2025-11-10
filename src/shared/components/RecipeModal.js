import React, { useEffect, useState } from "react";
import ReceitaService from "../../features/home/service/ReceitaService"; // ajuste o caminho se necessário

const RecipeModal = ({ isOpen, onClose, onAddReceita }) => {
  const [receitas, setReceitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar receitas ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      fetchReceitas();
    }
  }, [isOpen]);

  const fetchReceitas = async () => {
    setLoading(true);
    try {
      const response = await ReceitaService.GetReceitas(); // método GET no backend
      setReceitas(response);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Aplicar filtro de nome
  const receitasFiltradas = receitas.filter((r) =>
    r.nome.toLowerCase().includes(filtroNome.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Buscar Receitas
        </h2>

        {/* Campo de busca */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm w-full focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Carregando receitas...</p>
        ) : (
          <div className="max-h-80 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Nome da Receita</th>
                  <th className="text-center px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {receitasFiltradas.length > 0 ? (
                  receitasFiltradas.map((receita) => (
                    <tr key={receita.id} className="border-t">
                      <td className="px-4 py-2">{receita.nome}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            onAddReceita(receita);
                            onClose();
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        >
                          Adicionar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center text-gray-500 py-4 italic"
                    >
                      Nenhuma receita encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Botão de fechar */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;