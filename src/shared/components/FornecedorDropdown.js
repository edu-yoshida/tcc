import React, { useEffect, useState } from "react";
import FornecedorService from "../../features/supplies/Service/FornecedorService";


const FornecedorDropdown = ({ value, onChange }) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  async function loadData() {
    try {
      // TENTA pegar do backend
      const data = await FornecedorService.GetFornecedores();
      setFornecedores(data);
    } catch (err) {
      console.warn("Backend OFF → usando fornecedores mockados.");

      // LISTA FAKE PARA TESTE
      setFornecedores([
        { id: 1, razaoSocial: "Fornecedor Teste LTDA" },
        { id: 2, razaoSocial: "Distribuidora Brasil" },
        { id: 3, razaoSocial: "Alimentos Bom Sabor" },
      ]);
    }
  }

  loadData();
}, []);


  const filtered = fornecedores.filter((f) =>
    f.razaoSocial.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={
          search ||
          (fornecedores.find((f) => f.id === value)?.razaoSocial ?? "")
        }
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar fornecedor..."
        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm text-sm"
        onFocus={() => setSearch("")}
      />

      {search !== "" && (
        <ul className="absolute z-20 bg-white border rounded-md w-full max-h-40 overflow-y-auto shadow-md">
          {filtered.length === 0 && (
            <li className="p-2 text-sm text-gray-500">Nenhum encontrado</li>
          )}

          {filtered.map((f) => (
            <li
              key={f.id}
              className="p-2 text-sm hover:bg-orange-100 cursor-pointer"
              onClick={() => {
                onChange(f.id);
                setSearch("");
              }}
            >
              {f.razaoSocial}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FornecedorDropdown;