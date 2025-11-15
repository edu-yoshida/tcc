import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import ProdutoService from "../../features/home/service/ProdutoService";

const AdjustStockModal = ({ isOpen, onClose, onUpdateStockBatch }) => {
  const [products, setProducts] = useState([]);
  const [stockChanges, setStockChanges] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 Filtros
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // 🔄 Buscar produtos ao abrir o modal
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const produtos = await ProdutoService.GetProducts();
        setProducts(produtos || []);
      } catch (error) {
        console.error("❌ Erro ao buscar produtos:", error);
        setErrorMessage("Erro ao carregar produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      setStockChanges({});
      setErrorMessage("");
      setFiltroNome("");
      setFiltroCategoria("");
      fetchProducts();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStockChange = (id, value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setStockChanges((prev) => ({ ...prev, [id]: parsedValue }));
    } else if (value === "") {
      setStockChanges((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updates = products
        .map((p) => {
          const addValue = stockChanges[p.id];
          if (addValue === undefined || addValue === "" || isNaN(addValue))
            return null;

          const newStock = (p.quantidadeEstoque || 0) + parseInt(addValue, 10);
          return {
            id: p.id,
            quantidadeEstoque: newStock,
          };
        })
        .filter(Boolean);

      if (updates.length === 0) {
        setErrorMessage("Nenhuma alteração válida para salvar.");
        return;
      }

      await onUpdateStockBatch(updates);
      alert("✅ Estoque atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("❌ Erro ao atualizar estoque:", error);
      setErrorMessage("Erro ao atualizar estoque. Tente novamente.");
    }
  };

  const productsWithStock = Array.isArray(products)
    ? products.map((p) => ({
      ...p,
      addValue: stockChanges[p.id] ?? "",
    }))
    : [];

  // 🔎 Filtro aplicado
  const produtosFiltrados = productsWithStock.filter((p) => {
    const nomeMatch = p.nome === filtroNome.trim();
    const categoriaMatch =
      filtroCategoria === "" ||
      (p.categoria && p.categoria === filtroCategoria);

    return nomeMatch && categoriaMatch;
  });



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl h-5/6 flex flex-col relative">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800">
            Ajuste de Estoque em Lote
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* 🔍 Filtros */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm w-full md:w-1/2 focus:ring-orange-500 focus:border-orange-500"
          />

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm w-full md:w-1/2 focus:ring-orange-500 focus:border-orange-500 mt-2 md:mt-0"
          >
            <option value="">Todas as categorias</option>
            <option value="hortifruti">Hortifruti</option>
            <option value="estocaveis">Estocáveis</option>
            <option value="laticinios">Laticínios</option>
            <option value="acougues">Açougues</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Carregando produtos...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto flex-1 mb-4 border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                      Produto (Categoria)
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Estoque Atual
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      Novo Estoque
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((produto) => (
                      <tr key={produto.id}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {produto.nome}
                          <span className="text-gray-500 text-xs ml-2">
                            ({produto.categoria})
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {produto.quantidadeEstoque ?? 0}{" "}
                          {produto.unidadeMedida}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <input
                            type="number"
                            value={produto.addValue}
                            onChange={(e) =>
                              handleStockChange(produto.id, e.target.value)
                            }
                            className="w-full rounded-md border border-orange-300 focus:border-orange-500 p-1 text-sm text-center"
                            min="0"
                            placeholder="Nova Qtde"
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-4 py-4 text-center text-sm text-gray-500"
                      >
                        Nenhum produto encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={Object.keys(stockChanges).length === 0}
                className={`py-2 px-4 rounded-md text-sm font-medium text-white transition flex items-center ${Object.keys(stockChanges).length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
                  }`}
              >
                <FaSave className="mr-2" /> Salvar Alterações (
                {Object.keys(stockChanges).length})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdjustStockModal;
