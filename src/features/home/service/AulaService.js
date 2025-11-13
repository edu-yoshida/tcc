import api from "../../../shared/utils/api";

async function RegisterAula({nome, descricao, data, instrutor, materia, modulo, periodo, semestre, receitaIds}) {
    try {
        const response = await api.post("/v1/api/aulas", {nome, descricao, data, instrutor, materia, modulo, periodo, semestre, receitaIds});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default {
    RegisterAula
}