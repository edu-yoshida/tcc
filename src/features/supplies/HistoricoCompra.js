import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../../shared/components/Sidebar";
import CompraService from "./Service/CompraService";
import ProdutoService from "../home/service/ProdutoService";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";

const HistoricoCompras = () => {
  const [entradas, setEntradas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [entradaAberta, setEntradaAberta] = useState(null);

  const toggleEntrada = (id) => {
    setEntradaAberta((prev) => (prev === id ? null : id));
  };

  // Carrega nomes dos produtos
  const carregarProdutos = async () => {
    try {
      const dados = await ProdutoService.GetProducts();
      const mapa = {};
      dados.forEach((p) => (mapa[p.id] = p.nome));
      setProdutosMap(mapa);
    } catch (err) {
      console.error("Erro ao carregar nomes dos produtos:", err);
    }
  };

  // Carrega entradas
  const fetchEntradas = async () => {
    setLoading(true);
    try {
      const data = await CompraService.getAllEntradas();

      // Ordenar mais recente primeiro
      const ordenado = [...data].sort(
        (a, b) => new Date(b.dataEntrada) - new Date(a.dataEntrada)
      );

      setEntradas(ordenado);
      setFiltradas(ordenado);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
    fetchEntradas();
  }, []);

  // Filtro
  useEffect(() => {
    const lista = entradas.filter((e) =>
      `${e.observacao ?? ""}`.toLowerCase().includes(search.toLowerCase())
    );
    setFiltradas(lista);
  }, [search, entradas]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-orange-100 text-gray-800 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        {/* HEADER */}
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
          <h2 className="text-lg font-bold">Histórico de Compras</h2>
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 flex p-6 bg-orange-100 items-center justify-center overflow-auto">
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Compras Registradas
            </h3>

            {/* Barra de pesquisa */}
            <div className="flex space-x-3 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Filtrar por observação..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 pl-10 text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* LISTA */}
            <div className="overflow-x-auto border border-gray-200 rounded-md flex-1">
              {loading ? (
                <div className="p-4 text-center text-gray-500">
                  Carregando histórico...
                </div>
              ) : filtradas.length > 0 ? (
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Data</th>
                      <th className="px-4 py-2 text-left">Fornecedor</th>
                      <th className="px-4 py-2 text-left">Observação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtradas.map((entrada) => (
                      <React.Fragment key={entrada.id}>
                        <tr
                          className="hover:bg-[#fff5e6] transition duration-150 cursor-pointer"
                          onClick={() => toggleEntrada(entrada.id)}
                        >
                          <td className="px-4 py-2">
                            {new Date(entrada.dataEntrada).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-2">
                            {entrada.fornecedorNome ??
                              `Fornecedor #${entrada.fornecedorId}`}
                          </td>

                          <td className="px-4 py-2">
                            {entrada.observacao || "—"}
                          </td>
                        </tr>

                        {/* EXPANSÃO */}
                        {entradaAberta === entrada.id && (
                          <tr>
                            <td colSpan="3" className="bg-orange-50 p-4">
                              <h4 className="font-semibold mb-2">
                                Produtos da Compra
                              </h4>

                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-200">
                                    <tr>
                                      <th className="px-3 py-2 text-left">
                                        Produto
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Quantidade
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Preço
                                      </th>
                                      <th className="px-3 py-2 text-left">
                                        Total
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {entrada.produtos?.map((item, index) => (
                                      <tr key={index} className="border-t">
                                        <td className="px-3 py-2">
                                          {produtosMap[item.produtoId] ??
                                            `Produto #${item.produtoId}`}
                                        </td>

                                        <td className="px-3 py-2">
                                          {item.quantidade}
                                        </td>

                                        <td className="px-3 py-2">
                                          R$ {(item.preco / 100).toFixed(2)}
                                        </td>

                                        <td className="px-3 py-2 font-semibold">
                                          R${" "}
                                          {(
                                            (item.preco * item.quantidade) /
                                            100
                                          ).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Nenhuma compra encontrada.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LOGO */}
        <div className="hidden md:flex items-center justify-center rounded-2xl p-6">
          <img
            src={LogoGastroFlow}
            alt="Logo"
            className="hidden md:block absolute right-10 bottom-10 w-40 opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default HistoricoCompras;
