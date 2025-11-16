import React, { useEffect, useState } from "react";
import ProdutoService from "../../features/home/service/ProdutoService";

const StockModal = ({ isOpen, onClose, onAddIngredients }) => {
  const [produtos, setProdutos] = useState([]);
  const [valores, setValores] = useState({});
  const [quantidades, setQuantidades] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔍 Filtros
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // 🔄 Buscar produtos ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      fetchProdutos();
    }
  }, [isOpen]);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const response = await ProdutoService.GetProducts();
      setProdutos(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza quantidade digitada
  const handleQuantidadeChange = (id, value) => {
    setQuantidades((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Atualiza valor digitado 💰
  const handleValorChange = (id, value) => {
    setValores((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Adiciona produtos selecionados
  const handleAdd = () => {
    // Garante que produtos é sempre um array válido
    const listaProdutos = Array.isArray(produtos)
      ? produtos
      : produtos?.produtos || [];

    const selecionados = listaProdutos
      .filter((produto) => {
        const quantidade = Number(quantidades?.[produto?.id] ?? 0);
        const valor = Number(valores?.[produto?.id] ?? 0);

        return quantidade > 0 && valor > 0;
      })
      .map((produto) => ({
        id: produto.id,
        nomeProduto: produto.nome,
        categoria: produto.categoria || "Sem categoria",
        quantidadeEstoque: Number(quantidades?.[produto.id] ?? 0),
        valor: Number(valores?.[produto.id] ?? 0),
      }));

    if (selecionados.length === 0) {
      alert("⚠️ Informe quantidade e valor para pelo menos um produto.");
      return;
    }

    onAddIngredients(selecionados);
    setQuantidades({});
    setValores({});
    onClose();
  };

  if (!isOpen) return null;

  // 🔎 Aplicar filtros de nome e categoria
  const listaProdutos = Array.isArray(produtos)
    ? produtos
    : produtos?.produtos || [];

  const produtosFiltrados = listaProdutos.filter((p) => {
    const nomeMatch = p.nome?.toLowerCase().includes(filtroNome.toLowerCase().trim());
    const categoriaMatch =
      filtroCategoria === "" ||
      (p.categoria && p.categoria.toLowerCase() === filtroCategoria.toLowerCase());
    return nomeMatch && categoriaMatch;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Adicionar Produtos à Compra
        </h2>

        {/* 🔎 Campos de filtro */}
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
            <option value="acougues">Açougues</option>
            <option value="estocaveis">Estocáveis</option>
            <option value="hortifruti">Hortifruti</option>
            <option value="laticinios">Laticínios</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Carregando produtos...</p>
        ) : (
          <div className="max-h-80 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Produto</th>
                  <th className="text-left px-4 py-2">Categoria</th>
                  <th className="text-center px-4 py-2">Quantidade</th>
                  <th className="text-center px-4 py-2">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto) => (
                    <tr key={produto.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{produto.nome}</td>
                      <td className="px-4 py-2">
                        {produto.categoria || "Sem categoria"}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="number"
                          min="0"
                          value={quantidades[produto.id] || ""}
                          onChange={(e) =>
                            handleQuantidadeChange(produto.id, e.target.value)
                          }
                          placeholder="0"
                          className="w-20 border rounded-md p-1 text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={valores[produto.id] || ""}
                          onChange={(e) =>
                            handleValorChange(produto.id, e.target.value)
                          }
                          placeholder="0.00"
                          className="w-24 border rounded-md p-1 text-center"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-500 py-4 italic"
                    >
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Botões */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
