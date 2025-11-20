import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import RecipeModal from "./RecipeModal";
import AulaService from "../service/AulaService";
import { useStatusModalStore } from "../../../shared/store/modal-store";

const AulaModal = ({ isOpen, onClose, aulaSelecionada, onUpdated }) => {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);

  const { showLoading, showSuccess, showError } = useStatusModalStore();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    instrutor: "",
    data: "",
    materia: "",
    semestre: "",
    modulo: "",
    periodo: "",
  });

  const [receitas, setReceitas] = useState([]);

  // ⬇️ Carregar dados quando abrir
  useEffect(() => {
    if (aulaSelecionada) {
      setFormData({
        nome: aulaSelecionada.nome || "",
        descricao: aulaSelecionada.descricao || "",
        instrutor: aulaSelecionada.instrutor || "",
        data: aulaSelecionada.data ? aulaSelecionada.data.split("T")[0] : "",
        materia: aulaSelecionada.materia || "",
        semestre: aulaSelecionada.semestre ?? 1,
        modulo: aulaSelecionada.modulo ?? 1,
        periodo: aulaSelecionada.periodo || "Noturno",
      });

      setReceitas(
        aulaSelecionada.receitas?.map((r) => ({
          id: r.receitaId ?? r.id,
          nome: r.nomeReceita,
          quantidade: r.quantidade,
        })) || []
      );
    }
  }, [aulaSelecionada]);

  if (!isOpen || !aulaSelecionada) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⬇️ Salvar atualizações
  const handleSubmit = async () => {
    try {
      showLoading("Atualizando aula...");

      await AulaService.UpdateAula(aulaSelecionada.id, {
        id: aulaSelecionada.id,
        nome: formData.nome,
        descricao: formData.descricao,
        instrutor: formData.instrutor,
        materia: formData.materia,

        data: formData.data ? `${formData.data}T00:00:00` : aulaSelecionada.data,
        semestre: Number(formData.semestre),
        modulo: Number(formData.modulo),
        periodo: formData.periodo,

        userId: aulaSelecionada.userId,

        receitas: receitas.map((r) => ({
          receitaId: r.id,
          nomeReceita: r.nome,
          quantidade: r.quantidade,
        })),
      });

      showSuccess("Aula atualizada com sucesso!");
      if (onUpdated) onUpdated();

      setModoEdicao(false);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar aula:", error);
      showError("Erro ao atualizar aula.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={30} />
          </button>

          <h2 className="text-2xl font-bold mb-6 border-b pb-3">Detalhes da Aula</h2>

          

          {/* Informações Gerais */}
          <div className="flex flex-col gap-4 text-gray-700 mb-6">

            {/* Nome */}
            <div>
              <span className="font-semibold">Nome:</span>
              {modoEdicao ? (
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded w-64"
                />
              ) : <span className="ml-1">{formData.nome}</span>}
            </div>

            {/* Descrição */}
            <div>
              <span className="font-semibold">Descrição:</span>
              {modoEdicao ? (
                <input
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded w-full"
                />
              ) : <span className="ml-1">{formData.descricao}</span>}
            </div>

            {/* Instrutor */}
            <div>
              <span className="font-semibold">Instrutor:</span>
              {modoEdicao ? (
                <input
                  name="instrutor"
                  value={formData.instrutor}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded w-64"
                />
              ) : <span className="ml-1">{formData.instrutor}</span>}
            </div>

            {/* Data */}
            <div>
              <span className="font-semibold">Data:</span>
              {modoEdicao ? (
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded"
                />
              ) : (
                <span className="ml-1">
                  {aulaSelecionada.data
                    ? new Date(aulaSelecionada.data).toLocaleDateString("pt-BR")
                    : "-"}
                </span>
              )}
            </div>

            {/* Matéria */}
            <div>
              <span className="font-semibold">Matéria:</span>
              {modoEdicao ? (
                <input
                  name="materia"
                  value={formData.materia}
                  onChange={handleChange}
                  className="border ml-2 px-2 py-1 rounded w-64"
                />
              ) : <span className="ml-1">{formData.materia}</span>}
            </div>

            {/* Semestre / Módulo / Período */}
            <div className="grid grid-cols-2 gap-4">

              {/* Semestre */}
              <div>
                <span className="font-semibold">Semestre:</span>
                {modoEdicao ? (
                  <select
                    name="semestre"
                    value={formData.semestre}
                    onChange={handleChange}
                    className="border ml-2 px-2 py-1 rounded w-32"
                  >
                    <option value="1">1º</option>
                    <option value="2">2º</option>
                  </select>
                ) : <span className="ml-1">{formData.semestre}</span>}
              </div>

              {/* Módulo */}
              <div>
                <span className="font-semibold">Módulo:</span>
                {modoEdicao ? (
                  <select
                    name="modulo"
                    value={formData.modulo}
                    onChange={handleChange}
                    className="border ml-2 px-2 py-1 rounded w-32"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                ) : <span className="ml-1">{formData.modulo}</span>}
              </div>

              {/* Período */}
              <div>
                <span className="font-semibold">Período:</span>
                {modoEdicao ? (
                  <select
                    name="periodo"
                    value={formData.periodo}
                    onChange={handleChange}
                    className="border ml-2 px-2 py-1 rounded w-32"
                  >
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                  </select>
                ) : <span className="ml-1">{formData.periodo}</span>}
              </div>

            </div>
          </div>

          {/* Tabela de Receitas */}
          <div className="overflow-x-auto border rounded-lg mb-4">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Receita
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">
                    Quantidade
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {receitas.length > 0 ? (
                  receitas.map((r) => (
                    <tr key={r.id}>
                      <td className="px-4 py-2">{r.nome}</td>
                      <td className="px-4 py-2">{r.quantidade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      Nenhuma receita vinculada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6">

            {modoEdicao && (
              <button
                onClick={() => setIsRecipeModalOpen(true)}
                className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Editar Receitas
              </button>
            )}

            {modoEdicao ? (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Salvar Alterações
              </button>
            ) : (
              <button
                onClick={() => setModoEdicao(true)}
                className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Editar Aula
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Modal de Receitas */}
      <RecipeModal
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onAddReceitas={(lista) => setReceitas(lista)}
      />
    </>
  );
};

export default AulaModal;
