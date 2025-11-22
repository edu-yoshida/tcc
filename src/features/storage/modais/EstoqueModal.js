import React, { useEffect, useState } from "react";
import ProdutoService from "../../home/service/ProdutoService";
import { FiX } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useStatusModalStore } from "../../../shared/store/modal-store";

const EstoqueModal = ({ isOpen, onClose, produtoSelecionado, onUpdated }) => {
  const [modoEdicao, setModoEdicao] = useState(false);

  const { showLoading, showSuccess, showError } = useStatusModalStore();

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    unidadeMedida: "",
    quantidadeEstoque: "",
  });

  useEffect(() => {
    if (produtoSelecionado) {
      setFormData({
        nome: produtoSelecionado.nome || "",
        categoria: produtoSelecionado.categoria || "",
        unidadeMedida: produtoSelecionado.unidadeMedida || "",
        quantidadeEstoque: produtoSelecionado.quantidadeEstoque ?? "",
      });
    }
  }, [produtoSelecionado]);

  if (!isOpen || !produtoSelecionado) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      showLoading("Atualizando produto...");

      const atualizado = {
        id: produtoSelecionado.id,
        ...formData,
      };

      const response = await ProdutoService.UpdateProduct(atualizado);

      showSuccess("Produto atualizado com sucesso!");

      if (onUpdated) onUpdated(response?.data ?? atualizado);

      setModoEdicao(false);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      showError("Erro ao atualizar produto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={30} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Detalhes do Produto
        </h2>

        <div className="flex items-center gap-6 mb-6">
          <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden border">
            {produtoSelecionado.imagem ? (
              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">Sem imagem</span>
            )}
          </div>

          <div className="flex flex-col gap-3 text-gray-700 flex-1">

            {/* Nome */}
            <div>
              <span className="font-semibold">Nome:</span>
              {modoEdicao ? (
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-1">{formData.nome}</span>
              )}
            </div>

            {/* Categoria – DROPDOWN */}
            <div>
              <span className="font-semibold">Categoria:</span>
              {modoEdicao ? (
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                >
                  <option value="">Selecione a categoria</option>
                  <option value="estocaveis">Estocáveis</option>
                  <option value="hortifruti">Hortifrúti</option>
                  <option value="acougues">Açougues</option>
                  <option value="laticinios">Laticínios</option>
                </select>
              ) : (
                <span className="ml-1">{formData.categoria || "Não informada"}</span>
              )}
            </div>

            {/* Unidade de Medida – DROPDOWN */}
            <div>
              <span className="font-semibold">Unidade de Medida:</span>
              {modoEdicao ? (
                <select
                  name="unidadeMedida"
                  value={formData.unidadeMedida}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                >
                  <option value="">Selecione a medida</option>
                  <option value="g">Gramas</option>
                  <option value="ml">Mililitros (ml)</option>
                  <option value="unidades">Unidades (un)</option>
                </select>
              ) : (
                <span className="ml-1">{formData.unidadeMedida || "-"}</span>
              )}
            </div>

          </div>
        </div>

        {/* Tabela inferior */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Produto ID
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  Qtd. Estoque
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2">{produtoSelecionado.id}</td>

                <td className="px-4 py-2">
                  {modoEdicao ? (
                    <input
                      name="quantidadeEstoque"
                      type="number"
                      value={formData.quantidadeEstoque}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-24"
                    />
                  ) : (
                    formData.quantidadeEstoque
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Botões */}
        <div className="flex justify-end mt-6">
          {modoEdicao ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition font-medium"
            >
              Salvar
            </button>
          ) : (
            <button
              onClick={() => setModoEdicao(true)}
              className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
              Editar
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default EstoqueModal;
