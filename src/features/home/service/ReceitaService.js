import api from "../../../shared/utils/api";

async function RegisterRecipe({nome, descricao, produtoIds, tempoPreparo, rendimento, tipo, professorReceita,}) {
    try {
        const response = await api.post("/v1/api/receitas", {nome, descricao, produtoIds, tempoPreparo, rendimento, tipo, professorReceita});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    RegisterRecipe
}