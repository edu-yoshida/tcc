import React, { useState, useEffect } from "react";
import Sidebar from "../../shared/components/Sidebar";
import CompraService from "../supplies/Service/CompraService";
import ProdutoService from "../home/service/ProdutoService";
import FornecedorService from "../supplies/Service/FornecedorService";

import CompraDetalhesModal from "../../shared/components/CompraDetalhesModal.js";

const HistoricoCompras = () => {
  const [entradas, setEntradas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [fornecedoresMap, setFornecedoresMap] = useState({});
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [compraSelecionada, setCompraSelecionada] = useState(null);

  // Carregar produtos
  const carregarProdutos = async () => {
    try {
      const dados = await ProdutoService.GetProducts();
      const mapa = {};
      dados.forEach(p => (mapa[p.id] = p.nome));
      setProdutosMap(mapa);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  // Carregar fornecedores
  const carregarFornecedores = async () => {
    try {
      const response = await FornecedorService.GetFornecedores();
      const fornecedores = response.content ?? response;
      const map = {};
      fornecedores.forEach(f => (map[f.id] = f.nomeFantasia));
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
      const ordenado = [...data].sort(
        (a, b) => isoToNumber(b.dataEntrada) - isoToNumber(a.dataEntrada)
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
    carregarFornecedores();
    fetchEntradas();
  }, []);

  // Utilidades de data
  const isoDatePart = (isoString) => {
    if (!isoString) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) return isoString;

    const part = isoString.split("T")[0].split(" ")[0];
    return part.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";
  };

  const isoToNumber = (isoString) =>
    parseInt(isoDatePart(isoString).replace(/-/g, ""), 10) || 0;

  const formatFromISO = (isoString) => {
    const [y, m, d] = isoDatePart(isoString).split("-");
    return d && m && y ? `${d}/${m}/${y}` : "";
  };

  // Filtrar ao mudar datas
  useEffect(() => {
    if (!dataInicio && !dataFim) {
      setFiltradas(entradas);
      return;
    }

    const inicioNum = dataInicio ? parseInt(dataInicio.replace(/-/g, ""), 10) : null;
    const fimNum = dataFim ? parseInt(dataFim.replace(/-/g, ""), 10) : null;

    const lista = entradas.filter((e) => {
      const entradaNum = isoToNumber(e.dataEntrada);
      if (inicioNum && entradaNum < inicioNum) return false;
      if (fimNum && entradaNum > fimNum) return false;
      return true;
    });

    setFiltradas(lista);
  }, [dataInicio, dataFim, entradas]);

  // Abrir modal com dados formatados
  const abrirModal = (entrada) => {
    setCompraSelecionada({
      ...entrada,
      dataFormatada: formatFromISO(entrada.dataEntrada),
      fornecedorNome: fornecedoresMap[entrada.fornecedorId] ?? `Fornecedor #${entrada.fornecedorId}`
    });

    setModalOpen(true);
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-orange-100 text-gray-800 font-sans">
      <aside className="w-64 shrink-0"><Sidebar /></aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="h-28 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl">
          <h2 className="text-lg font-bold">Histórico de Compras</h2>
        </div>

        <div className="flex-1 flex p-6 items-center justify-center overflow-auto">
          <div className="w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">

            <h3 className="text-xl font-semibold">Compras Registradas</h3>

            <div className="flex space-x-6 items-end mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">De</span>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="block rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Até</span>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="block rounded-md border border-gray-300 p-2 text-sm"
                />
              </div>
            </div>

            {/* TABELA */}
            <div className="overflow-y-auto overflow-x-auto border border-gray-200 rounded-md max-h-[400px]">

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
                    {filtradas.map((entrada) => (
                      <tr
                        key={entrada.id}
                        className="hover:bg-orange-100 cursor-pointer transition"
                        onClick={() => abrirModal(entrada)}
                      >
                        <td className="px-4 py-2">{formatFromISO(entrada.dataEntrada)}</td>
                        <td className="px-4 py-2">
                          {fornecedoresMap[entrada.fornecedorId] ??
                            `Fornecedor #${entrada.fornecedorId}`}
                        </td>
                        <td className="px-4 py-2">{entrada.observacao || "—"}</td>
                      </tr>
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

      {/* MODAL DE DETALHES */}
      <CompraDetalhesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        compra={compraSelecionada}
        produtosMap={produtosMap}
      />
    </div>
  );
};

export default HistoricoCompras;
