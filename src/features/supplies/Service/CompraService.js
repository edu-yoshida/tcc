import api from "../../../shared/utils/api";

async function cadastrarEntrada({ dataEntrada, observacao, fornecedorId, produtos }) {
  try {
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

async function getAllEntradas() {
  try {
    const response = await api.get("/v1/api/entradas/todas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar entradas:", error);
    throw error;
  }
}

async function getEntradaById(id) {
  try {
    const response = await api.get(`/v1/api/entradas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar entrada ${id}:`, error);
    throw error;
  }
}

async function getEntradasByProdutoId(produtoId) {
  try {
    const response = await api.get(`/v1/api/entradas/produto/${produtoId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar entradas por produto ${produtoId}:`, error);
    throw error;
  }
}

export default {
  cadastrarEntrada,
  getAllEntradas,
  getEntradaById,
  getEntradasByProdutoId
};
