import React from "react";
import { FaBars, FaArrowLeft, FaUser, FaBox, FaCogs, FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";

const SidebarSection = ({ icon: Icon, title, links }) => {
  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-2 text-gray-800 uppercase text-xs font-bold">
        {Icon && <Icon className="text-gray-800" />}
        {title}
      </div>

      <div className="ml-10">
        {links.map((item, index) => (
          <Link
            to={item.path}
            key={index}
<<<<<<< HEAD
            className="block px-4 py-2 text-sm text-gray-800 hover:text-orange-600 hover:bg-orange-50 rounded-md mr-10 transition-colors duration-200"
=======
            className="block px-4 py-2 text-sm text-black hover:bg-orange-100 hover:bg-opacity-60 rounded-md mr-10"
>>>>>>> 6eb088947653b550ca1766e94abddac9850fa83a
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const location = useLocation();

  return (
    <>
      {/* Botão Hamburguer (quando sidebar fechada) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
<<<<<<< HEAD
          className="fixed top-4 left-4 z-50 p-3 bg-orange-500 text-white rounded-md hover:bg-orange-500 shadow-lg"
=======
          className="fixed top-4 left-4 z-50 p-3 bg-[#000000] text-black-800 rounded-md hover:bg-gray-700"
>>>>>>> 6eb088947653b550ca1766e94abddac9850fa83a
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar */}
      {isOpen && (
<<<<<<< HEAD
        <div className="w-64 bg-white text-black flex flex-col h-screen fixed top-0 left-0 z-40 border-r border-gray-200 shadow-md transition-all duration-300">
=======
        <div className="w-64 bg-[#ffffff] text-black-800 flex flex-col h-screen fixed top-0 left-0 z-40">
>>>>>>> 6eb088947653b550ca1766e94abddac9850fa83a
          {/* Botão de seta no topo */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-orange-800"
            >
              <FaArrowLeft size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center">
            <Link to="/produtos">
              <img
                src={LogoGastroFlow}
                alt="Logo"
                className="w-45 bg-white"
              />
            </Link>
          </div>

          {/* Seções */}
          <SidebarSection
            icon={FaUser}
            title="Usuários"
            links={[
              { label: "Cadastro de Usuário", path: "/usuarios" },
              { label: "Verificação de Acessos", path: "/usuarios/acessver" },
            ]}
            activePath={location.pathname}
          />
          <SidebarSection
            icon={FaBox}
            title="Produto Estoque"
            links={[
              { label: "Cadastro de Produto", path: "/produtos" },
              { label: "Inserir Produto", path: "/produtos/add" },
              { label: "Retirar Produto", path: "/produtos/remove" },
              { label: "Verificar Estoque", path: "/produtos/storage" },
            ]}
            activePath={location.pathname}
          />
          <SidebarSection
            icon={FaBox}
            title="Receitas"
            links={[
              { label: "Cadastro de Receita", path: "/receitas" },
              { label: "Receitas por Aula", path: "/receitas/class" },
            ]}
            activePath={location.pathname}
          />
          <SidebarSection
            icon={FaBox}
            title="Gestão de Suprimentos"
            links={[
              { label: "Fornecedor", path: "/fornecedor" },
              { label: "Compra", path: "/compra" },
            ]}
            activePath={location.pathname}
          />

          {/* Links fixos no final */}
          <div className="mt-auto border-t border-gray-200">
            <Link
              to="/configuracoes"
              className={`flex items-center gap-2 px-4 py-3 transition ${location.pathname === "/configuracoes"
                ? "bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-600"
                : "hover:bg-orange-50"
                }`}
            >
              <FaCogs />
              <span>Configurações</span>
            </Link>
            <Link
              to="/relatorios"
              className={`flex items-center gap-2 px-4 py-3 transition ${location.pathname === "/relatorios"
                ? "bg-orange-100 text-orange-600 font-semibold border-l-4 border-orange-600"
                : "hover:bg-orange-50"
                }`}
            >
              <FaCheckCircle />
              <span>Relatórios</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;