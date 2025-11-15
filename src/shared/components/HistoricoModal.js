import React from "react";

const HistoricoModal = ({ isOpen, onClose, dataInicio, dataFim, setDataInicio, setDataFim }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Filtrar por datas</h3>

        <div className="flex space-x-4 items-center">
          <label className="font-medium">de</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 text-sm"
          />

          <label className="font-medium">até</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="block w-full rounded-md border border-gray-300 focus:border-orange-500 p-2 text-sm"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-md text-sm font-medium bg-gray-300 hover:bg-gray-400"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricoModal;
