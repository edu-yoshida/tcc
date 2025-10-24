import api from "../../../shared/utils/api";

async function RegisterProduct({ nome, unidadeMedida, categoria }) {
    try {
        const response = await api.post("/produtos", { nome, unidadeMedida, categoria });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function UpdateProductStock({ productId, quantidadeEstoque }) {
    try {
        // O endpoint deve ser: PATCH /produtos/{id}
        const response = await api.patch(`/produtos/${productId}`, {
            // Envia APENAS o campo que será modificado
            quantidadeEstoque: quantidadeEstoque,
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar estoque do produto ${productId}:`, error);
        // Em um sistema real, você pode querer lançar o erro com mais detalhes aqui
        throw error; 
    }
}

async function GetProducts() {
    try {
        const response = await api.get("/produtos/produtos");
        return response.data || [];
    } catch (error) {
        throw error;
    }
}

export default { 
    RegisterProduct, 
    UpdateProductStock,
    GetProducts 
};