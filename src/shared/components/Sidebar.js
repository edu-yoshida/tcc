import React from "react";
import { FaUser, FaBox, FaCogs, FaCheckCircle, FaBars, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoGastroFlow from "../../assets/LogoGastroFlow.png";

const SidebarSection = ({ icon: Icon, title, links }) => {
  return (
    <div>
      <div className="flex items-center gap-2 px-4 py-2 text-gray-300 uppercase text-xs font-bold">
        {Icon && <Icon className="text-gray-400" />}
        {title}
      </div>

      <div className="ml-10">
        {links.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="block px-4 py-2 text-sm text-white hover:bg-orange-100 hover:bg-opacity-60 rounded-md mr-10"
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

  return (
    <>
      {/* Botão Hamburguer (quando sidebar fechada) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Sidebar */}
      {isOpen && (
        <div className="w-64 bg-gray-800 text-white flex flex-col h-screen fixed top-0 left-0 z-40">
          {/* Botão de seta no topo */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <FaArrowLeft size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center py-6">
            <Link to="/produtos">
              <img
                src={LogoGastroFlow}
                alt="Logo"
                className="w-32 cursor-pointer hover:opacity-80 transition bg-white rounded-lg border-5"
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
          />
          <SidebarSection
            icon={FaBox}
            title="Receitas"
            links={[
              { label: "Cadastro de Receita", path: "/receitas" },
              { label: "Receitas por Aula", path: "/receitas/class" },
              { label: "Cadastro de ingrediente", path: "/receitas/ingrediente" },
            ]}
          />
          <SidebarSection
            icon={FaBox}
            title="Gestão de Suprimentos"
            links={[
              { label: "Fornecedor", path: "/fornecedor" },
              { label: "Compra", path: "/compra" },
            ]}
          />

          {/* Links fixos no final */}
          <div className="mt-auto">
            <Link
              to="/configuracoes"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
            >
              <FaCogs />
              <span>Configurações</span>
            </Link>
            <Link
              to="/relatorios"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
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
