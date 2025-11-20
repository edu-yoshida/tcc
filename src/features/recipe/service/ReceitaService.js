import api from "../../../shared/utils/api";

async function RegisterRecipe({
  nome,
  descricao,
  produtos,
  tempoPreparo,
  rendimento,
  tipo,
  professorReceita,
}) {
  try {
    const response = await api.post("/v1/api/receitas", {
      nome,
      descricao,
      produtos,
      tempoPreparo,
      rendimento,
      tipo,
      professorReceita,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function GetRecipes() {
  try {
    const response = await api.get("/v1/api/receitas/listar");
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

async function UpdateRecipe(id, data) {
  try {
    const response = await api.patch(`/v1/api/receitas/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function DeleteRecipe(id) {
  try {
    const response = await api.delete(`/v1/api/receitas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  RegisterRecipe,
  GetRecipes,
  UpdateRecipe,
};
