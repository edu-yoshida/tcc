import React from "react";

const CompraDetalhesModal = ({ isOpen, onClose, compra, produtosMap }) => {
  if (!isOpen || !compra) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
          Detalhes da Compra
        </h2>

        {/* Informações gerais */}
        <div className="mb-4 text-gray-700 space-y-1">
          <p><span className="font-semibold">Data:</span> {compra.dataFormatada}</p>
          <p><span className="font-semibold">Fornecedor:</span> {compra.fornecedorNome}</p>
          <p><span className="font-semibold">Observação:</span> {compra.observacao || "—"}</p>
        </div>

        {/* Tabela de produtos */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Produto</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Qtd.</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Preço</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {compra.produtos?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">
                    {produtosMap[item.produtoId] ?? `Produto #${item.produtoId}`}
                  </td>
                  <td className="px-4 py-2">{item.quantidade}</td>
                  <td className="px-4 py-2">R$ {item.preco.toFixed(2)}</td>
                  <td className="px-4 py-2 font-semibold">
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botão fechar */}
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

export default CompraDetalhesModal;
