import React from "react";

const ListarFornModal = ({ isOpen, onClose, fornecedorSelecionado }) => {
    if (!isOpen || !fornecedorSelecionado) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Detalhes do Fornecedor
                </h2>

                {/* Informações */}
                <div className="flex flex-col gap-3 mb-6 text-gray-700">

                    <div>
                        <span className="font-semibold">Razão Social:</span>{" "}
                        {fornecedorSelecionado.razaoSocial}
                    </div>

                    <div>
                        <span className="font-semibold">Nome Fantasia:</span>{" "}
                        {fornecedorSelecionado.nomeFantasia || "-"}
                    </div>

                    <div>
                        <span className="font-semibold">Telefone:</span>{" "}
                        {fornecedorSelecionado.telefone}
                    </div>

                    <div>
                        <span className="font-semibold">Email:</span>{" "}
                        {fornecedorSelecionado.email || "-"}
                    </div>

                    <div>
                        <span className="font-semibold">Endereço:</span>{" "}
                        {fornecedorSelecionado.endereco}
                    </div>

                </div>

                {/* Rodapé */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition font-medium"
                    >
                        Fechar
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ListarFornModal;
