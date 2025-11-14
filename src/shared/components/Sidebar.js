import React from "react";
import {
  FaUser,
  FaBox,
  FaCogs,
  FaCheckCircle,
  FaConciergeBell,
  FaDollyFlatbed,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoGastroFlowMin from "../../assets/LogoGastroFlowMin.png";
import "./Sidebar.css";

const SidebarSection = ({ icon: Icon, title, links }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 px-5 py-3 text-gray-800 uppercase text-sm font-bold tracking-wide">
        {Icon && <Icon className="text-orange-500 text-lg" />}
        {title}
      </div>

      <div className="ml-10 space-y-1 mr-4">
        {links.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `block px-5 py-2.5 text-base rounded-md transition-all duration-200 
              ${
                isActive
                //Cor de quando a pagina esta selecionada (sidebar)
                  ? " text-white font-bold bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 animate-gradient"
                //Hover da sidebar
                  : "text-gray-550 hover:bg-orange-200 hover:bg-opacity-60"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      {isOpen && (
        <div className="w-72 bg-[#ffffff] text-black-800 flex flex-col h-screen fixed top-0 left-0 z-40 font-semibold shadow-xl border-r border-orange-200">
          {/* Logo */}
          <div className="flex justify-center items-center py-8 border-b border-orange-100">
            <NavLink to="/produtos">
              <img
                src={LogoGastroFlowMin}
                alt="Logo"
                className="w-48 cursor-pointer hover:opacity-90 transition-transform transform hover:scale-105"
              />
            </NavLink>
          </div>

          {/* Seções */}
          <div className="flex-1 overflow-y-auto px-1 mt-4 space-y-3">
            <SidebarSection
              icon={FaUser}
              title="Usuários"
              links={[
                { label: "Cadastro de Usuário", path: "/CadastroUsuario" },
                { label: "Verificação de Acessos", path: "/usuariosAcessver" },
              ]}
            />

            <SidebarSection
              icon={FaBox}
              title="Produto Estoque"
              links={[
                { label: "Cadastro de Produto", path: "/produtos" },
                { label: "Gerenciar Produtos", path: "/estoque" },
              ]}
            />

            <SidebarSection
              icon={FaConciergeBell}
              title="Receitas"
              links={[
                { label: "Cadastro de Receita", path: "/receitas" },
                { label: "Receitas por Aula", path: "/receitasClass" },
              ]}
            />

            <SidebarSection
              icon={FaDollyFlatbed}
              title="Gestão de Suprimentos"
              links={[
                { label: "Fornecedor", path: "/fornecedor" },
                { label: "Compra", path: "/compra" },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;