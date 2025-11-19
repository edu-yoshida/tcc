import React, { useState } from "react";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import StockModal from "./modais/CompraProdModal";
import FornecedorModal from "./modais/FornecedorModal";
import api from "../../shared/utils/api";


import { useStatusModalStore } from "../../shared/store/modal-store";


const CadastroCompra = () => {
  const [formState, setFormState] = useState({
    dataEntrada: "",
    fornecedorId: "",
    fornecedorNome: "",
    observacao: "",
    produtos: [],
  });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isFornecedorModalOpen, setIsFornecedorModalOpen] = useState(false);

  const { showLoading, showSuccess, showError } = useStatusModalStore();

  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);

  const openFornecedorModal = () => setIsFornecedorModalOpen(true);
  const closeFornecedorModal = () => setIsFornecedorModalOpen(false);

  const handleAddProducts = (produtosSelecionados) => {
    setFormState((prev) => ({
      ...prev,
      produtos: [...prev.produtos, ...produtosSelecionados],
    }));
    closeProductModal();
  };

  const handleSelectFornecedor = (fornecedor) => {
    setFormState((prev) => ({
      ...prev,
      fornecedorId: fornecedor.id,
      fornecedorNome: fornecedor.razaoSocial,
    }));
    closeFornecedorModal();
  };

  const handleRemoveProduct = (indexToRemove) => {
    setFormState((prev) => ({
      ...prev,
      produtos: prev.produtos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.fornecedorId) {
      showError("Selecione um fornecedor .");
      return;
    }else if (formState.produtos.length === 0) {
      showError("Adicione pelo menos um produto.");
      return;
    }else if (!formState.dataEntrada) {
      showError("Selecione a data");
      return;
    }

    const entradaDTO = {
      dataEntrada: formState.dataEntrada,
      observacao: formState.observacao || "Compra registrada via sistema",
      fornecedorId: Number(formState.fornecedorId),
      produtos: formState.produtos.map((p) => ({
        produtoId: Number(p.id),
        quantidade: Number(p.quantidadeEstoque),
        preco: Number(p.valor),
      })),
    };

    try {
      showLoading("Registrando compra...");

      await api.post("/v1/api/entradas", entradaDTO);

      showSuccess("Compra registrada com sucesso!");

      setFormState({
        dataEntrada: "",
        fornecedorId: "",
        fornecedorNome: "",
        observacao: "",
        produtos: [],
      });
    } catch (error) {
      console.error("Erro ao cadastrar entrada:", error);
      showError("Erro ao registrar a compra.");
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#ffffff] text-gray-800 font-sans">
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-orange-100 ml-64">
        <div className="h-28 shrink-0 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 flex flex-col items-center justify-center text-white rounded-b-3xl overflow-hidden">
          <h2 className="text-2xl font-bold">Cadastrar Compra</h2>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center p-4 md:p-6 relative">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 px-6">
            <div className="w-full md:w-[520px] bg-white rounded-2xl p-8 shadow-lg flex flex-col">
              <h3 className="text-xl font-semibold mb-6">Cadastro de Compra</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Data da Entrada</label>
                  <input
                    type="date"
                    name="dataEntrada"
                    value={formState.dataEntrada}
                    onChange={handleChange}
                    className="block w-full rounded-lg border p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Observação</label>
                  <textarea
                    name="observacao"
                    value={formState.observacao}
                    onChange={handleChange}
                    className="block w-full rounded-lg border p-2 text-sm resize-none"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={openFornecedorModal}
                    className="py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 w-full shadow-md"
                  >
                    Selecionar Fornecedor
                  </button>

                  {formState.fornecedorNome && (
                    <p className="mt-2 p-2 bg-gray-100 rounded-md border text-sm">
                      <strong>Selecionado:</strong> {formState.fornecedorNome}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    type="button"
                    onClick={openProductModal}
                    className="py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700 flex items-center justify-center shadow-md"
                  >
                    <FaPlusCircle className="mr-2" /> Adicionar Produtos
                  </button>

                  {formState.produtos.length > 0 && (
                    <ul
                      className="
                        divide-y border rounded-md p-3 bg-gray-50
                        max-h-44 overflow-y-auto
                        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
                      "
                    >
                      {formState.produtos.map((item, index) => (
                        <li key={index} className="flex justify-between items-center py-3">
                          <span className="flex-1 text-[15px] font-medium">{item.nomeProduto}</span>

                          <span className="text-[14px] text-gray-600 mr-6 whitespace-nowrap">
                            Qtd: <strong>{item.quantidadeEstoque}</strong> | Preço:{" "}
                            <strong>R$ {Number(item.valor).toFixed(2)}</strong>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <FaTrashAlt size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col space-y-3 pt-2">
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-lg text-white bg-orange-500 hover:bg-orange-600 shadow-md"
                  >
                    Registrar Entrada
                  </button>
                </div>
              </form>
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center rounded-2xl p-6">
              <img
                src={LogoGastroFlow}
                alt="Logo"
                className="w-full max-w-[480px] h-[21rem] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <StockModal
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        onAddIngredients={handleAddProducts}
      />

      <FornecedorModal
        isOpen={isFornecedorModalOpen}
        onClose={closeFornecedorModal}
        onSelect={handleSelectFornecedor}
      />

      
    </div>
  );
};

export default CadastroCompra;
