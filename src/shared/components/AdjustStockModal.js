import React, { useState, useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import ProdutoService from "../../features/home/service/ProdutoService";

const AdjustStockModal = ({ isOpen, onClose, products, onUpdateStockBatch }) => {
  // Estado para rastrear as mudanças no estoque (apenas produtos modificados)
  const [stockChanges, setStockChanges] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setStockChanges({}); // Limpa as alterações ao fechar
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Função para lidar com a mudança no input de estoque
  const handleStockChange = (productId, value) => {
    const parsedValue = parseInt(value, 10);
    
    // Armazena a mudança apenas se for um número válido (ou campo vazio para apagar)
    if (!isNaN(parsedValue) && parsedValue >= 0) {
        setStockChanges(prev => ({ 
            ...prev, 
            [productId]: parsedValue 
        }));
    } else if (value === "") {
        // Se o usuário apagar o campo, mantemos no estado temporariamente,
        // mas a validação final será feita no submit
        setStockChanges(prev => ({ 
            ...prev, 
            [productId]: value 
        }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updates = [];
    
    // Prepara a lista de produtos a serem atualizados
    for (const productId in stockChanges) {
        const newStockValue = stockChanges[productId];
        
        if (newStockValue === "" || isNaN(parseInt(newStockValue, 10))) {
            // Ignora produtos com campos vazios ou inválidos no submit
            continue; 
        }

        updates.push({
            productId: parseInt(productId, 10), // Garante que o ID seja um número
            quantidadeEstoque: newStockValue,
        });
    }

    if (updates.length > 0) {
      onUpdateStockBatch(updates); // Chama a função que fará a chamada PATCH para o lote
    }
    
    onClose(); // Fecha o modal
  };
  
  // Mapeia os produtos completos com seus respectivos estados de alteração
  const productsWithStock = products.map(p => ({
      ...p,
      // Usa o valor modificado se existir, senão usa o valor original do produto
      currentEditValue: stockChanges[p.id] !== undefined ? stockChanges[p.id] : (p.quantidadeEstoque !== undefined ? p.quantidadeEstoque : 0)
  }));

  return (
    // Overlay (sombreado)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl h-5/6 flex flex-col relative">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h3 className="text-2xl font-bold text-gray-800">Ajuste de Estoque em Lote</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes size={24} />
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            {/* Tabela de Produtos */}
            <div className="overflow-y-auto flex-1 mb-4 border border-gray-200 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                                Produto (Categoria)
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                                Estoque Atual
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                                Novo Estoque
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {productsWithStock.length > 0 ? (
                            productsWithStock.map((produto) => (
                                <tr key={produto.id}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {produto.nome} 
                                        <span className="text-gray-500 text-xs ml-2">({produto.categoria})</span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {produto.quantidadeEstoque !== undefined ? produto.quantidadeEstoque : 0} {produto.unidadeMedida}
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                                        <input
                                            type="number"
                                            value={produto.currentEditValue}
                                            onChange={(e) => handleStockChange(produto.id, e.target.value)}
                                            className="w-full rounded-md border border-orange-300 focus:border-orange-500 p-1 text-sm text-center"
                                            min="0"
                                            placeholder="Nova Qtde"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                             <tr>
                                <td colSpan="3" className="px-4 py-4 text-center text-sm text-gray-500">
                                    Nenhum produto encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-4 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={Object.keys(stockChanges).length === 0} // Desabilita se não houver mudanças
                    className={`py-2 px-4 rounded-md text-sm font-medium text-white transition flex items-center ${
                        Object.keys(stockChanges).length === 0 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                >
                    <FaSave className="mr-2" /> Salvar Alterações ({Object.keys(stockChanges).length})
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustStockModal;