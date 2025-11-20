import React, { useState, useEffect } from "react";
import FornecedorService from "../service/FornecedorService";
import { FaTimes } from "react-icons/fa";
import { useStatusModalStore } from "../../../shared/store/modal-store";

const ListarFornModal = ({ isOpen, onClose, fornecedorSelecionado, onUpdated }) => {
  const [modoEdicao, setModoEdicao] = useState(false);

  const { showLoading, showSuccess, showError } = useStatusModalStore();

  const [formData, setFormData] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  // Carregar dados ao abrir o modal
  useEffect(() => {
    if (fornecedorSelecionado) {
      setFormData({
        razaoSocial: fornecedorSelecionado.razaoSocial || "",
        nomeFantasia: fornecedorSelecionado.nomeFantasia || "",
        telefone: fornecedorSelecionado.telefone || "",
        email: fornecedorSelecionado.email || "",
        endereco: fornecedorSelecionado.endereco || "",
      });
    }
  }, [fornecedorSelecionado]);

  if (!isOpen || !fornecedorSelecionado) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const salvarEdicao = async () => {
    try {
      showLoading("Atualizando fornecedor...");

      const atualizado = {
        id: fornecedorSelecionado.id,
        ...formData,
      };

      const response = await FornecedorService.UpdateFornecedor(atualizado);

      showSuccess("Fornecedor atualizado com sucesso!");

      if (onUpdated) onUpdated(response?.data ?? atualizado);

      setModoEdicao(false);
      onClose();

    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      showError("Erro ao atualizar fornecedor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={30} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Detalhes do Fornecedor
        </h2>

        {/* Formulário */}
        <div className="flex flex-col gap-4">

          <div>
            <span className="font-semibold">Razão Social:</span>
            {modoEdicao ? (
              <input
                name="razaoSocial"
                value={formData.razaoSocial}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full max-w-lg"
              />
            ) : (
              <span className="ml-1">{formData.razaoSocial}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Nome Fantasia:</span>
            {modoEdicao ? (
              <input
                name="nomeFantasia"
                value={formData.nomeFantasia}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full max-w-lg"
              />
            ) : (
              <span className="ml-1">{formData.nomeFantasia || "-"}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Telefone:</span>
            {modoEdicao ? (
              <input
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full max-w-lg"
              />
            ) : (
              <span className="ml-1">{formData.telefone}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Email:</span>
            {modoEdicao ? (
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full max-w-lg"
              />
            ) : (
              <span className="ml-1">{formData.email || "-"}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Endereço:</span>
            {modoEdicao ? (
              <input
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full max-w-lg"
              />
            ) : (
              <span className="ml-1">{formData.endereco}</span>
            )}
          </div>

        </div>

        {/* Botões */}
        <div className="flex justify-end mt-6 gap-3">
          {modoEdicao ? (
            <button
              onClick={salvarEdicao}
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

export default ListarFornModal;
