import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../shared/components/Sidebar";
import ProdutoService from "../home/service/ProdutoService";
import EstoqueModal from "./EstoqueModal";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";

const VerificarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [pageSize, setPageSize] = useState(5);   
  const [pageNumber, setPageNumber] = useState(0); 

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
    setProdutoSelecionado(null);
    setIsModalOpen(false);
  };

  // 📌 Buscar produtos da API (com paginação)
  const fetchProdutos = async () => {
    setLoadingProdutos(true);
    try {
      const data = await ProdutoService.GetProductsPages(pageSize, pageNumber);

      const lista = Array.isArray(data.produtos) ? data.produtos : [];

      setProdutos(lista);
      setProdutosFiltrados(lista);

      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 0);

    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setProdutos([]);
      setProdutosFiltrados([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoadingProdutos(false);
    }
  };

  // 🔄 Atualiza quando mudar pageSize ou pageNumber
  useEffect(() => {
    fetchProdutos();
  }, [pageSize, pageNumber]);

  // 🎯 FILTRAGEM POR NOME + CATEGORIA
  useEffect(() => {
    const termo = filtroNome.toLowerCase().trim();

    const filtrados = produtos.filter((produto) => {
      
      const id = produto.id 
      const nome = produto.nome?.toLowerCase() || "";
      const categoria = produto.categoria || "";

      const nomeMatch = !termo || nome.includes(termo);
      const categoriaMatch = !filtroCategoria || categoria === filtroCategoria;

      return nomeMatch && categoriaMatch;
    });

    setProdutosFiltrados(filtrados);
  }, [filtroNome, filtroCategoria, produtos]);

  // 🔼 Página anterior
  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  // 🔽 Próxima página
  const nextPage = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1);
    }
  };


  return (
    <div className="flex w-screen h-screen overflow-hidden bg-orange-100 text-gray-800 font-sans">
      
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">

        {/* HEADER */}
        <div className="h-28 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex items-center justify-center text-white rounded-b-3xl">
          <h2 className="text-lg font-bold">Listar Estoque</h2>
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 flex p-6 bg-orange-100 items-center justify-center overflow-auto">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-4">

            <h3 className="text-xl font-semibold">Produtos Cadastrados</h3>

            {/* FILTROS */}
            <div className="flex space-x-3 items-center">

              {/* FILTRO POR NOME */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Filtrar por nome..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                  className="w-full rounded-md border p-2 pl-10"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* FILTRO POR CATEGORIA */}
              <select
                value={filtroCategoria || ""}
                onChange={(e) => setFiltroCategoria(e.target.value || null)}
                className="py-2 px-4 rounded-md bg-orange-500 text-white cursor-pointer"
              >
                <option value="">Todas as categorias</option>
                <option value="estocaveis">Estocáveis</option>
                <option value="hortifruti">Hortifruti</option>
                <option value="acougues">Açougues</option>
                <option value="laticinios">Laticínios</option>
              </select>
            </div>

            {/* TABELA */}
            <div className="overflow-x-auto border rounded-md">
              {loadingProdutos ? (
                <div className="p-4 text-center text-gray-500">Carregando…</div>
              ) : produtosFiltrados.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Produto</th>
                      <th className="px-4 py-2 text-left">Categoria</th>
                      <th className="px-4 py-2 text-left">Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((produto) => (
                      <tr
                        key={produto.id}
                        onClick={() => handleAbrirModal(produto)}
                        className="hover:bg-[#fff5e6] cursor-pointer"
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
                  Nenhum produto encontrado.
                </div>
              )}
            </div>

            {/* PAGINAÇÃO */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={prevPage}
                disabled={pageNumber === 0}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
              >
                Anterior
              </button>

              <span className="text-sm">
                Página {pageNumber + 1} de {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={pageNumber >= totalPages - 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
              >
                Próxima
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* LOGO */}
      <img
        src={LogoGastroFlow}
        alt="Logo"
        className="hidden md:block absolute right-10 bottom-10 w-40 opacity-80"
      />

      {/* MODAL */}
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
