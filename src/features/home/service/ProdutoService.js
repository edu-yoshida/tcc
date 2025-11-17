import api from "../../../shared/utils/api";

async function RegisterProduct({ nome, unidadeMedida, categoria, quantidadeEstoque }) {
    try {
        const response = await api.post("v1/api/produtos", { nome, unidadeMedida, categoria, quantidadeEstoque });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function UpdateProductStock({ id, quantidadeEstoque }) {
    if (!id) {
        // Adiciona uma trava no frontend para evitar o erro de 'undefined' na URL
        console.error("Erro: id é nulo ou indefinido.");
        throw new Error("ID do produto é obrigatório para atualização.");
    }
    try {
        const response = await api.patch(`/v1/api/produtos?id=${id}`, {
            quantidadeEstoque: quantidadeEstoque,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function GetProductsPages(pageSize = 5, pageNumber = 0) {
    try {
        const response = await api.get(
            `/v1/api/produtos/filters/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        return response.data || {};
    } catch (error) {
        throw error;
    }
}

async function GetProducts() {
    try {
        const response = await api.get("/v1/api/produtos/produtos");
        return response.data || {};
    } catch (error) {
        throw error;
    }
}

export default {
    RegisterProduct,
    UpdateProductStock,
    GetProducts,
    GetProductsPages
};