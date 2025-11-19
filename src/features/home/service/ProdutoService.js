import api from "../../../shared/utils/api";

// Criar produto
async function RegisterProduct({ nome, unidadeMedida, categoria, quantidadeEstoque }) {
    try {
        const response = await api.post("/v1/api/produtos", {
            nome,
            unidadeMedida,
            categoria,
            quantidadeEstoque
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Atualizar estoque
async function UpdateProductStock({ id, quantidadeEstoque }) {
    if (!id) {
        console.error("Erro: id é nulo ou indefinido.");
        throw new Error("ID do produto é obrigatório para atualização.");
    }

    try {
        const response = await api.patch(`/v1/api/produtos?id=${id}`, {
            quantidadeEstoque
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


async function GetProductById(id) {
    try {
        const response = await api.get(`/v1/api/produtos?id=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Paginação
async function GetProductsPages(pageSize = 5, pageNumber = 0, nome, categoria) {
    try {
        const response = await api.get(
            `/v1/api/produtos/filters/all?pageSize=${pageSize}&pageNumber=${pageNumber}&nome=${nome}&categoria=${categoria}`
        );
        return response.data || {};
    } catch (error) {
        throw error;
    }
}

// Listar todos os produtos — ROTA CERTA
async function GetProducts() {
    try {
        const response = await api.get("/v1/api/produtos/produtos");
        return response.data || [];
    } catch (error) {
        throw error;
    }
}

export default {
    RegisterProduct,
    UpdateProductStock,
    GetProductById,
    GetProducts,
    GetProductsPages
};
