import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import ReceitaService from "../service/ReceitaService";
import { useStatusModalStore } from "../../../shared/store/modal-store";

const ListarReceitasModal = ({ isOpen, onClose, receitaSelecionada, onUpdated }) => {
  const [modoEdicao, setModoEdicao] = useState(false);

  const { showLoading, showSuccess, showError } = useStatusModalStore();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    tempoPreparo: "",
    rendimento: "",
    professorReceita: "",
    produtos: [],
  });

  useEffect(() => {
    if (receitaSelecionada) {
      setFormData({
        nome: receitaSelecionada.nome || "",
        descricao: receitaSelecionada.descricao || "",
        tipo: receitaSelecionada.tipo || "",
        tempoPreparo: receitaSelecionada.tempoPreparo || "",
        rendimento: receitaSelecionada.rendimento || "",
        professorReceita: receitaSelecionada.professorReceita || "",
        produtos:
          receitaSelecionada.produtos?.map((p) => ({
            produtoId: p.produtoId,
            nomeProduto: p.nomeProduto,
            quantidade: p.quantidade,
          })) || [],
      });
    }
  }, [receitaSelecionada]);

  if (!isOpen || !receitaSelecionada) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProdutoChange = (index, field, value) => {
    const updated = [...formData.produtos];
    updated[index][field] = value;
    setFormData({ ...formData, produtos: updated });
  };

  const handleSubmit = async () => {
    try {
      showLoading("Atualizando receita...");

      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        tempoPreparo: Number(formData.tempoPreparo),
        rendimento: Number(formData.rendimento),
        tipo: formData.tipo,
        professorReceita: formData.professorReceita,
        produtos: formData.produtos.map((p) => ({
          produtoId: p.produtoId,
          quantidade: Number(p.quantidade),
        })),
      };

      await ReceitaService.UpdateRecipe(receitaSelecionada.id, payload);

      showSuccess("Receita atualizada com sucesso!");

      if (onUpdated) onUpdated();

      setModoEdicao(false);
      onClose();

    } catch (error) {
      console.error(error);
      showError("Erro ao atualizar receita.");
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
          Detalhes da Receita
        </h2>

        <div className="flex flex-col gap-4 text-gray-700 mb-6">
          <div>
            <span className="font-semibold">Nome:</span>
            {modoEdicao ? (
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full"
              />
            ) : (
              <span className="ml-1">{formData.nome}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Descrição:</span>
            {modoEdicao ? (
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded w-full"
              />
            ) : (
              <span className="ml-1">{formData.descricao || "Sem descrição"}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Tipo:</span>
            {modoEdicao ? (
              <input
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded"
              />
            ) : (
              <span className="ml-1">{formData.tipo || "-"}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Tempo de Preparo:</span>
            {modoEdicao ? (
              <input
                name="tempoPreparo"
                value={formData.tempoPreparo}
                onChange={handleChange}
                type="number"
                className="border ml-2 px-2 py-1 rounded"
              />
            ) : (
              <span className="ml-1">{formData.tempoPreparo}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Rendimento:</span>
            {modoEdicao ? (
              <input
                name="rendimento"
                value={formData.rendimento}
                onChange={handleChange}
                type="number"
                className="border ml-2 px-2 py-1 rounded"
              />
            ) : (
              <span className="ml-1">{formData.rendimento}</span>
            )}
          </div>

          <div>
            <span className="font-semibold">Professor Responsável:</span>
            {modoEdicao ? (
              <input
                name="professorReceita"
                value={formData.professorReceita}
                onChange={handleChange}
                className="border ml-2 px-2 py-1 rounded"
              />
            ) : (
              <span className="ml-1">{formData.professorReceita}</span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          Produtos da Receita
        </h3>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Produto</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Quantidade</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {formData.produtos.length > 0 ? (
                formData.produtos.map((p, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-800">{p.nomeProduto}</td>

                    <td className="px-4 py-2 text-gray-800">
                      {modoEdicao ? (
                        <input
                          type="number"
                          value={p.quantidade}
                          onChange={(e) =>
                            handleProdutoChange(index, "quantidade", e.target.value)
                          }
                          className="border px-2 py-1 rounded w-24"
                        />
                      ) : (
                        p.quantidade
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                    Nenhum produto associado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6 gap-3">
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

export default ListarReceitasModal;
