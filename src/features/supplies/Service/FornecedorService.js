import api from "../../../shared/utils/api";

async function RegisterFornecedor({ razaoSocial, nomeFantasia, telefone, email, endereco }) {
    try {
        const response = await api.post("/v1/api/suppliers", {
            razaoSocial,
            nomeFantasia,
            telefone,
            email,
            endereco,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function GetFornecedores(pageNumber = 0, pageSize = 10) {
    try {
        const response = await api.get("/v1/api/suppliers", {
            params: { pageNumber, pageSize },
        });
        return response.data.content  || [];
    } catch (error) {
        throw error;
    }
}

async function GetFornecedorById(id) {
    try {
        const response = await api.get(`/v1/api/suppliers/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function UpdateFornecedor({ id, razaoSocial, nomeFantasia, telefone, email, endereco }) {
    if (!id) throw new Error("ID do fornecedor é obrigatório para atualização.");

    try {
        const response = await api.put(`/v1/api/suppliers/${id}`, {
            razaoSocial,
            nomeFantasia,
            telefone,
            email,
            endereco,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function DeleteFornecedor(id) {
    if (!id) throw new Error("ID do fornecedor é obrigatório para exclusão.");

    try {
        await api.delete(`/v1/api/suppliers/${id}`);
    } catch (error) {
        throw error;
    }
}

export default {
    RegisterFornecedor,
    GetFornecedores,
    GetFornecedorById,
    UpdateFornecedor,
    DeleteFornecedor,
};