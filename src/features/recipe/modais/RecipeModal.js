import React, { useEffect, useState } from "react";
import ReceitaService from "../service/ReceitaService";

const RecipeModal = ({ isOpen, onClose, onAddReceitas }) => {
  const [receitas, setReceitas] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [loading, setLoading] = useState(false);

  // Armazena quantidades: { id: quantidade }
  const [selecionadas, setSelecionadas] = useState({});

  useEffect(() => {
    if (isOpen) {
      fetchReceitas();
    }
  }, [isOpen]);

  const fetchReceitas = async () => {
    setLoading(true);
    try {
      const response = await ReceitaService.GetRecipes();
      setReceitas(response);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filtro sem includes e sem lowercase
  const listaReceitas = Array.isArray(receitas) ? receitas : [];

  const receitasFiltradas = listaReceitas.filter((r) => {
    const nomeReceita = r?.nome?.toLowerCase() ?? "";
    const busca = filtroNome?.toLowerCase().trim() ?? "";

    if (!busca) return true;            // sem filtro → retorna tudo
    return nomeReceita.includes(busca); // match parcial, case-insensitive
  });

  // Atualiza quantidade digitada
  const handleQtd = (id, valor) => {
    setSelecionadas((prev) => ({
      ...prev,
      [id]: valor.trim() === "" ? "" : valor // sem Number(), sem parseInt
    }));
  };

  const handleConfirmar = () => {
    // Garante que receitas seja sempre um array
    const listaReceitas = Array.isArray(receitas) ? receitas : [];

    const resultado = Object.entries(selecionadas)
      .filter(([_, qtd]) => {
        const numero = Number(qtd);
        return numero > 0 && !isNaN(numero);
      })
      .map(([id, qtd]) => {
        const receitaId = Number(id);
        const receita = listaReceitas.find((r) => Number(r.id) === receitaId);

        if (!receita) {
          console.warn(`Receita com id ${id} não encontrada.`);
          return null; // evita erro
        }

        return {
          id: receita.id,
          nome: receita.nome || "Sem nome",
          quantidade: Number(qtd)
        };
      })
      .filter(Boolean); // remove nulls

    if (resultado.length === 0) {
      alert("Selecione quantidade para pelo menos uma receita!");
      return;
    }

    onAddReceitas(resultado);
    setSelecionadas({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Selecionar Receitas
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
                  <th className="text-center px-4 py-2">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {receitasFiltradas.length > 0 ? (
                  receitasFiltradas.map((receita) => (
                    <tr key={receita.id} className="border-t">
                      <td className="px-4 py-2">{receita.nome}</td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={selecionadas[receita.id] || ""}
                          onChange={(e) => handleQtd(receita.id, e.target.value)}
                          className="w-20 text-center border border-gray-300 rounded-md p-1 focus:ring-orange-500 focus:border-orange-500"
                        />
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

        {/* Rodapé */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition font-semibold"
          >
            Confirmar Seleção
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
