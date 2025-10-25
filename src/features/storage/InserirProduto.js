import React, { useState, useEffect } from "react";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import Sidebar from "../../shared/components/Sidebar";
import ProdutoService from "../home/service/ProdutoService";
import AdjustStockModal from "../../shared/components/AdjustStockModal";

const InserirProduto = () => {
  // ESTADOS DE LISTAGEM E FILTRO
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // ESTADOS DO MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FUNÇÃO DE CARREGAMENTO DE DADOS
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

  // FILTRAGEM
  useEffect(() => {
    let listaFiltrada = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );

    if (filtroCategoria) {
      listaFiltrada = listaFiltrada.filter(produto =>
        produto.categoria && produto.categoria.toLowerCase() === filtroCategoria.toLowerCase()
      );
    }
    setProdutosFiltrados(listaFiltrada);
  }, [filtroNome, filtroCategoria, produtos]);

  // MODAL
  const openAdjustStockModal = () => setIsModalOpen(true);
  const closeAdjustStockModal = () => setIsModalOpen(false);

  // ATUALIZAÇÃO EM LOTE
  const handleUpdateStockBatch = async (updates) => {
    if (!updates || updates.length === 0) return;

    setLoadingProdutos(true);

    const patchPromises = updates.map(update =>
      ProdutoService.UpdateProductStock({
        id: update.id,
        quantidadeEstoque: update.quantidadeEstoque,
      })
    );

    try {
      await Promise.all(patchPromises);
      alert(`✅ Estoque de ${updates.length} produtos atualizado com sucesso!`);
      fetchProdutos();
    } catch (err) {
      console.error("Erro ao atualizar estoque em lote:", err);
      alert("❌ Erro ao atualizar o estoque de um ou mais produtos.");
    } finally {
      setLoadingProdutos(false);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#fff5e6] text-gray-800 font-sans">
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto"><Sidebar /></div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="h-16 shrink-0 bg-orange-600 text-white flex items-center justify-center">
          <h2 className="text-lg font-bold">Gerenciar Produtos - GastroFlow</h2>
        </div>

        <div className="flex-1 flex p-6 bg-[#fff5e6] space-x-6 overflow-auto items-center justify-center">
          <div className="w-1/2 shrink-0 bg-white rounded-lg shadow-md p-6 space-y-4 max-h-full flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800">Produtos Cadastrados</h3>

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
                className="py-2 px-4 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 border-none appearance-none cursor-pointer"
              >
                <option value="">Todas as Categorias</option>
                <option value="graos">Grãos</option>
                <option value="carnes">Carnes</option>
              </select>

              <button
                onClick={openAdjustStockModal}
                className="py-2 px-4 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition flex items-center justify-center space-x-1 shrink-0"
                title="Adicionar ou Ajustar Estoque em Lote"
              >
                <FaPlusCircle className="mr-1" size={16} /> Estoque
              </button>
            </div>

            <div className="overflow-y-auto flex-1 border border-gray-200 rounded-md">
              <ul className="divide-y divide-gray-200">
                {loadingProdutos ? (
                  <li className="p-4 text-center text-gray-500">Carregando produtos...</li>
                ) : produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto) => (
                    <li key={produto.id} className="p-3 hover:bg-[#fff5e6] transition duration-150 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{produto.nome}</p>
                        <p className="text-xs text-gray-500">
                          Categoria: {produto.categoria} | Medida: {produto.unidadeMedida} | Quantidade: {produto.quantidadeEstoque ?? 0}
                        </p>
                      </div>

                      <button
                        onClick={() => console.log("Preparar PATCH para id:", produto.id)}
                        className="py-1 px-3 text-xs rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                      >
                        Definir Acesso
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-gray-500">
                    {produtos.length === 0 ? "Nenhum produto cadastrado." : "Nenhum produto encontrado com os filtros aplicados."}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal não precisa receber 'products', ele busca os produtos sozinho */}
      <AdjustStockModal
        isOpen={isModalOpen}
        onClose={closeAdjustStockModal}
        onUpdateStockBatch={handleUpdateStockBatch}
      />
    </div>
  );
};

export default InserirProduto;
