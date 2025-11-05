import React from "react";
import { FaUser, FaBox, FaCogs, FaCheckCircle} from "react-icons/fa";
import { Link } from "react-router-dom";
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
            className="block px-4 py-2 text-sm text-gray-550 hover:bg-orange-200 hover:bg-opacity-60 rounded-md mr-10"
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
      {/* Sidebar */}
      {isOpen && (
        <div className="w-64 bg-[#ffffff] text-black-800 flex flex-col h-screen fixed top-0 left-0 z-40">
          {/* Logo */}
          <div className="flex justify-center items-center py-6">
            <Link to="/produtos">
              <img
                src={LogoGastroFlow}
                alt="Logo"
                className="w-50 cursor-pointer hover:opacity-80 transition bg-white rounded-lg border-5"
              />
            </Link>
          </div>

          {/* Seções */}
          <SidebarSection
            icon={FaUser}
            title="Usuários"
            links={[
              { label: "Cadastro de Usuário", path: "/CadastroUsuario" },
              { label: "Verificação de Acessos", path: "/usuarios/acessver" },
            ]}
          />
          <SidebarSection
            icon={FaBox}
            title="Produto Estoque"
            links={[
              { label: "Cadastro de Produto", path: "/produtos" },
              { label: "Gerenciar Produtos", path: "/produtos/add" },
            ]}
          />
          <SidebarSection
            icon={FaBox}
            title="Receitas"
            links={[
              { label: "Cadastro de Receita", path: "/receitas" },
              { label: "Receitas por Aula", path: "/receitas/class" },
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
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300"
            >
              <FaCogs />
              <span>Configurações</span>
            </Link>
            <Link
              to="/relatorios"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-300"
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