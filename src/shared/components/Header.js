import React, { useState } from "react";
import useAuthStore from "../store/auth-store";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const { user, clearAuthData } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuthData();
    window.location.href = "/";
  };

  return (
    <>
      {/* Botão fixo no canto superior direito */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full transition backdrop-blur-sm"
          >
            <img
              src={
                user?.picture ||
                "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.nome || "User")
              }
              alt="perfil"
              className="w-8 h-8 rounded-full object-cover bg-white"
            />

            <span className="hidden sm:inline font-semibold text-white">
              {user ? user.nome : "Carregando..."}
            </span>

            <FiChevronDown className="text-white" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold">{user?.nome}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>

              <button className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100">
                <FiUser /> Perfil
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100 text-red-600"
              >
                <FiLogOut /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
