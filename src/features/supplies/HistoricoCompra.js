import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/components/Sidebar";
import CompraService from "./Service/CompraService";
import ProdutoService from "../home/service/ProdutoService";
import FornecedorService from "./Service/FornecedorService";

// Modal de filtro de datas
const HistoricoModal = ({ isOpen, onClose, dataInicio, dataFim, setDataInicio, setDataFim }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Filtrar por datas</h3>
        <div className="flex space-x-4 items-center">
          <label className="font-medium">de</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 text-sm"
          />
          <label className="font-medium">até</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-md text-sm font-medium bg-gray-300 hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

const HistoricoCompras = () => {
  const [entradas, setEntradas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [fornecedoresMap, setFornecedoresMap] = useState({});
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loading, setLoading] = useState(true);
  const [entradaAberta, setEntradaAberta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => setIsModalOpen(false);
  const toggleEntrada = (id) => setEntradaAberta(prev => prev === id ? null : id);

  // Carregar produtos
  const carregarProdutos = async () => {
    try {
      const dados = await ProdutoService.GetProducts();
      const mapa = {};
      dados.forEach(p => mapa[p.id] = p.nome);
      setProdutosMap(mapa);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  // Carregar fornecedores (ajustado para pegar content da paginação)
  const carregarFornecedores = async () => {
    try {
      const response = await FornecedorService.GetFornecedores();
      // Se vier paginado (Page), usar content; senão usar array direto
      const fornecedores = response.content ?? response;
      const map = {};
      fornecedores.forEach(f => {
        map[f.id] = f.nomeFantasia;
      });
      setFornecedoresMap(map);
    } catch (err) {
      console.error("Erro ao carregar fornecedores:", err);
    }
  };

  // Buscar entradas
  const fetchEntradas = async () => {
    setLoading(true);
    try {
      const data = await CompraService.getAllEntradas();
      const ordenado = [...data].sort((a, b) => isoToNumber(b.dataEntrada) - isoToNumber(a.dataEntrada));
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
    carregarFornecedores();
    fetchEntradas();
  }, []);

  // Funções de formatação de datas
  const isoDatePart = (isoString) => {
    if (!isoString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) return isoString;
    const part = isoString.split("T")[0].split(" ")[0];
    return part.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";
  };

  const isoToNumber = (isoString) => parseInt(isoDatePart(isoString).replace(/-/g, ""), 10) || 0;
  const formatFromISO = (isoString) => {
    const [y, m, d] = isoDatePart(isoString).split("-");
    return d && m && y ? `${d}/${m}/${y}` : "";
  };

  // Filtrar entradas por datas
  useEffect(() => {
    if (!dataInicio && !dataFim) {
      setFiltradas(entradas);
      return;
    }
    const inicioNum = dataInicio ? parseInt(dataInicio.replace(/-/g, ""), 10) : null;
    const fimNum = dataFim ? parseInt(dataFim.replace(/-/g, ""), 10) : null;

    const lista = entradas.filter(e => {
      const entradaNum = isoToNumber(e.dataEntrada);
      if (inicioNum && entradaNum < inicioNum) return false;
      if (fimNum && entradaNum > fimNum) return false;
      return true;
    });
    setFiltradas(lista);
  }, [dataInicio, dataFim, entradas]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-orange-100 text-gray-800 font-sans">
      <aside className="w-64 shrink-0"><Sidebar /></aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
          <h2 className="text-lg font-bold">Histórico de Compras</h2>
        </div>

        <div className="flex-1 flex p-6 bg-orange-100 items-center justify-center overflow-auto">
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Compras Registradas</h3>

            <div className="flex justify-end">
              <button onClick={abrirModal} className="py-2 px-4 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600">
                Filtrar por datas
              </button>
            </div>

            <div className="overflow-y-auto overflow-x-auto border border-gray-200 rounded-md flex-1 max-h-[400px]">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Carregando histórico...</div>
              ) : filtradas.length > 0 ? (
                <table className="w-full text-sm border">
                  <thead className="bg-orange-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Data</th>
                      <th className="px-4 py-2 text-left">Fornecedor</th>
                      <th className="px-4 py-2 text-left">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtradas.map(entrada => (
                      <React.Fragment key={entrada.id}>
                        <tr
                          className="hover:bg-orange-100 transition duration-150 cursor-pointer"
                          onClick={() => toggleEntrada(entrada.id)}
                        >
                          <td className="px-4 py-2">{formatFromISO(entrada.dataEntrada)}</td>
                          <td className="px-4 py-2">{fornecedoresMap[entrada.fornecedorId] ?? `Fornecedor #${entrada.fornecedorId}`}</td>
                          <td className="px-4 py-2">{entrada.observacao || "—"}</td>
                        </tr>

                        <tr>
                          <td colSpan="3" className="p-0">
                            <div className={`transition-all duration-300 overflow-hidden ${entradaAberta === entrada.id ? "max-h-[600px] p-4" : "max-h-0 p-0"} bg-orange-200 border-l-4 border-orange-500`}>
                              <h4 className="font-semibold mb-2">Produtos da Compra</h4>
                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full text-sm">
                                  <thead className="bg-orange-300 text-gray-900">
                                    <tr>
                                      <th className="px-3 py-2 text-left">Produto</th>
                                      <th className="px-3 py-2 text-left">Quantidade</th>
                                      <th className="px-3 py-2 text-left">Preço</th>
                                      <th className="px-3 py-2 text-left">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {entrada.produtos?.map((item, idx) => (
                                      <tr key={idx} className="border-t">
                                        <td className="px-3 py-2">{produtosMap[item.produtoId] ?? `Produto #${item.produtoId}`}</td>
                                        <td className="px-3 py-2">{item.quantidade}</td>
                                        <td className="px-3 py-2">R$ {item.preco.toFixed(2)}</td>
                                        <td className="px-3 py-2 font-semibold">R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-gray-500">Nenhuma compra encontrada.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <HistoricoModal
          isOpen={isModalOpen}
          onClose={fecharModal}
          dataInicio={dataInicio}
          dataFim={dataFim}
          setDataInicio={setDataInicio}
          setDataFim={setDataFim}
        />
      )}
    </div>
  );
};

export default HistoricoCompras;
