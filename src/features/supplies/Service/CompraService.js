import api from "../../../shared/utils/api";

async function cadastrarEntrada({ dataEntrada, observacao, fornecedorId, produtos }) {
  try {
    // 'produtos' deve ser uma lista de objetos no formato:
    // [{ produtoId: 1, quantidade: 10 }, { produtoId: 2, quantidade: 5 }]
    const response = await api.post("/v1/api/entradas", {
      dataEntrada,
      observacao,
      fornecedorId,
      produtos,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar entrada:", error);
    throw error;
  }
}

export default { cadastrarEntrada };