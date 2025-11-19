import React, { useState } from "react";
import ProdutoService from "../home/service/ProdutoService";
import { FiX } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

const EstoqueModal = ({ isOpen, onClose, produtoSelecionado }) => {
  // Hooks DEVEM vir primeiro
  const [modoEdicao, setModoEdicao] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    unidadeMedida: "",
    quantidadeEstoque: "",
  });

  // Atualiza o formulário quando o modal abre
  React.useEffect(() => {
    if (produtoSelecionado) {
      setFormData({
        nome: produtoSelecionado.nome || "",
        categoria: produtoSelecionado.categoria || "",
        unidadeMedida: produtoSelecionado.unidadeMedida || "",
        quantidadeEstoque: produtoSelecionado.quantidadeEstoque ?? "",
      });
    }
  }, [produtoSelecionado]);

  // Só depois vem o retorno condicional
  if (!isOpen || !produtoSelecionado) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const salvarEdicao = () => {
    setModoEdicao(false);
  };

  const handleSubmit = async () => {
    try {
      await ProdutoService.UpdateProduct({
        id: produtoSelecionado.id,
        nome: formData.nome,
        categoria: formData.categoria,
        unidadeMedida: formData.unidadeMedida,
        quantidadeEstoque: formData.quantidadeEstoque
      });

      alert("Produto atualizado com sucesso!");

      setFormData({
        nome: "",
        unidadeMedida: "",
        categoria: "",
        quantidadeEstoque: 0
      });

      setModoEdicao(false);
      onClose(); // fecha o modal

    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto.");
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

        {/* Parte superior */}
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
                <span className="ml-1">{produtoSelecionado.nome}</span>
              )}
            </div>

            <div>
              <span className="font-semibold">Categoria:</span>
              {modoEdicao ? (
                <input
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-1">
                  {produtoSelecionado.categoria || "Não informada"}
                </span>
              )}
            </div>

            <div>
              <span className="font-semibold">Unidade de medida:</span>
              {modoEdicao ? (
                <input
                  name="unidadeMedida"
                  value={formData.unidadeMedida}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-1">
                  {produtoSelecionado.unidadeMedida || "-"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tabela */}
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
                <td className="px-4 py-2 text-gray-800">
                  {produtoSelecionado.id || "-"}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {modoEdicao ? (
                    <input
                      name="quantidadeEstoque"
                      type="number"
                      value={formData.quantidadeEstoque}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-24"
                    />
                  ) : (
                    produtoSelecionado.quantidadeEstoque ?? "0"
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
