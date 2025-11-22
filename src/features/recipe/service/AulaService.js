import api from "../../../shared/utils/api";

// Cadastrar aula
async function RegisterAula({
  nome,
  descricao,
  data,
  instrutor,
  materia,
  modulo,
  periodo,
  semestre,
  receitas
}) {
  try {
    const response = await api.post("/v1/api/aulas", {
      nome,
      descricao,
      data,
      instrutor,
      materia,
      modulo,
      periodo,
      semestre,
      receitas
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

// Listar aulas
async function GetAula() {
  try {
    const response = await api.get("/v1/api/aulas");
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

// 🔥 Atualizar aula (COM O FORMATO EXATO DO SWAGGER)
async function UpdateAula(id, data) {
  try {
    const response = await api.patch(`/v1/api/aulas/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default {
  RegisterAula,
  GetAula,
  UpdateAula
};
