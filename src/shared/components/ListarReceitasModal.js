import React from "react";

const ListarReceitasModal = ({ isOpen, onClose, receitaSelecionada }) => {
    if (!isOpen || !receitaSelecionada) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Detalhes da Receita
                </h2>

                {/* Informações básicas */}
                <div className="flex flex-col gap-3 mb-6 text-gray-700">
                    <div>
                        <span className="font-semibold">Nome:</span>{" "}
                        {receitaSelecionada.nome}
                    </div>

                    <div>
                        <span className="font-semibold">Descrição:</span>{" "}
                        {receitaSelecionada.descricao || "Sem descrição"}
                    </div>

                    <div>
                        <span className="font-semibold">Tipo:</span>{" "}
                        {receitaSelecionada.tipo || "-"}
                    </div>

                    <div>
                        <span className="font-semibold">Tempo de Preparo:</span>{" "}
                        {receitaSelecionada.tempoPreparo || "-"}
                    </div>

                    <div>
                        <span className="font-semibold">Rendimento:</span>{" "}
                        {receitaSelecionada.rendimento || "-"}
                    </div>

                    <div>
                        <span className="font-semibold">Professor Responsável:</span>{" "}
                        {receitaSelecionada.professorReceita || "-"}
                    </div>
                </div>

                {/* Produtos usados na receita */}
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    Produtos da Receita
                </h3>

                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                    Produto
                                </th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                                    Quantidade
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {(receitaSelecionada.produtos || []).length > 0 ? (
                                receitaSelecionada.produtos.map((p, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-gray-800">
                                            {p.produtoId}
                                        </td>
                                        <td className="px-4 py-2 text-gray-800">
                                            {p.quantidade}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        Nenhum produto associado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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

export default ListarReceitasModal;
