import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../shared/components/Sidebar";
import ProdutoService from "../home/service/ProdutoService";
import EstoqueModal from "./EstoqueModal";

const VerificarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [loadingProdutos, setLoadingProdutos] = useState(true);


  // MODAL
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAbrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  // CARREGAR PRODUTOS
  const fetchProdutos = async () => {
    setLoadingProdutos(true);
    try {
      const data = await ProdutoService.GetProducts();
      setProdutos(data);
      setProdutosFiltrados(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setLoadingProdutos(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // FILTRO
  useEffect(() => {
    let listaFiltrada = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    if (filtroCategoria) {
      listaFiltrada = listaFiltrada.filter(
        (produto) =>
          produto.categoria &&
          produto.categoria.toLowerCase() === filtroCategoria.toLowerCase()
      );
    }

    setProdutosFiltrados(listaFiltrada);
  }, [filtroNome, filtroCategoria, produtos]);

  // Atualizar estoque de um único produto
  const handleUpdateStock = async (produtoAtualizado) => {
    try {
      await ProdutoService.UpdateProductStock({
        id: produtoAtualizado.id,
        quantidadeEstoque: produtoAtualizado.quantidadeEstoque,
      });
      alert("✅ Estoque atualizado com sucesso!");
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao atualizar estoque:", error);
      alert("❌ Erro ao atualizar estoque.");
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-orange-100 text-gray-800 font-sans">
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
          <h2 className="text-lg font-bold">Gerenciar Produtos - GastroFlow</h2>
        </div>

        <div className="flex-1 flex p-6 bg-orange-100 items-center justify-center overflow-auto">
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Produtos Cadastrados
            </h3>

            <div className="flex space-x-3 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Filtrar por nome do produto..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 pl-10 text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <select
                value={filtroCategoria || ""}
                onChange={(e) => setFiltroCategoria(e.target.value || null)}
                className="py-2 px-4 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 border-none cursor-pointer"
              >
                <option value="">Todas as categorias</option>
                <option value="estocaveis">Estocáveis</option>
                <option value="hortifruti">Hortifruti</option>
                <option value="acougues">Açougues</option>
                <option value="laticinios">Laticínios</option>
              </select>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-md flex-1">
              {loadingProdutos ? (
                <div className="p-4 text-center text-gray-500">
                  Carregando produtos...
                </div>
              ) : produtosFiltrados.length > 0 ? (
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Produto</th>
                      <th className="px-4 py-2 text-left">Categoria</th>
                      <th className="px-4 py-2 text-left">Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtos.map((produto) => (
                      <tr
                        key={produto.id}
                        className="hover:bg-[#fff5e6] transition duration-150 cursor-pointer"
                        onClick={() => handleAbrirModal(produto)}
                      >
                        <td className="px-4 py-2">{produto.nome}</td>
                        <td className="px-4 py-2">{produto.categoria || "Sem categoria"}</td>
                        <td className="px-4 py-2">{produto.quantidadeEstoque ?? "0"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {produtos.length === 0
                    ? "Nenhum produto cadastrado."
                    : "Nenhum produto encontrado com os filtros aplicados."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {produtoSelecionado && (
        <EstoqueModal
          isOpen={isModalOpen}
          onClose={handleFecharModal}
          produtoSelecionado={produtoSelecionado}
        />

      )}
    </div>
  );
};

export default VerificarProdutos;
