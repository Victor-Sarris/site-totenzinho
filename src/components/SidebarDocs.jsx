import { useState } from "react";
import {
  Book,
  Terminal,
  Cpu,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Módulos principais, na ordem em que aparecem no menu.
const NAV_ITEMS = [
  { to: "/documentacao/venv", label: "01. Ambiente Virtual (Venv)" },
  { to: "/documentacao/library-install", label: "02. Instalação de Bibliotecas" },
  { to: "/documentacao/connection-ssh", label: "03. Conectar via SSH (Putty)" },
  { to: "/documentacao/remote-labrador", label: "04. Controle Remoto pelo PC" },
  { to: "/documentacao/auto-start-file", label: "05. Criação de AutoStart File" },
];

const CONFIG_ITEMS = [
  { to: "/documentacao/log-monitoring", label: "01. Monitoramento de Log" },
  { to: "/documentacao/routes", label: "02. Rotas do Sistema" },
  { to: "/documentacao/ip-config", label: "03. Configuração de IP Estático" },
];

const NavLink = ({ to, label, onClick, isActive }) => (
  <Link to={to} onClick={onClick}>
    <button
      className={`w-full text-left flex items-center justify-between pl-3 pr-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border text-sm font-semibold ${
        isActive
          ? "bg-blue-600/10 text-blue-400 border-blue-600/40"
          : "text-slate-300 border-transparent hover:text-white hover:bg-slate-800/50 hover:border-slate-700"
      }`}
    >
      {label}
    </button>
  </Link>
);

const SidebarDocs = () => {
  const location = useLocation();
  const [introAberta, setIntroAberta] = useState(true);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const isActive = (path) => location.pathname === path;
  const fecharMenuMobile = () => setMenuMobileAberto(false);

  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
      fecharMenuMobile();
    }
  };

  const ConteudoSidebar = (
    <>
      <div className="mb-8 shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-500" />
          Navegação
        </h3>
        <p className="text-xs text-slate-500 mt-2">
          Guia de Módulos e Configuração
        </p>
      </div>

      <nav className="flex-1 space-y-2 pb-24">
        {/* Introdução / Visão geral do código */}
        <div className="flex flex-col">
          <div
            className={`flex items-center justify-between rounded-xl border transition-all duration-200 ${
              isActive("/documentacao")
                ? "bg-blue-600/10 border-blue-600/40"
                : "border-transparent hover:bg-slate-800/50 hover:border-slate-700"
            }`}
          >
            <Link
              to="/documentacao"
              onClick={fecharMenuMobile}
              className={`flex-1 pl-3 py-3 text-sm font-semibold ${
                isActive("/documentacao") ? "text-blue-400" : "text-blue-400/90"
              }`}
            >
              Introdução
            </Link>
            <button
              onClick={() => setIntroAberta((prev) => !prev)}
              aria-label={introAberta ? "Recolher seção" : "Expandir seção"}
              className="p-3 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              {introAberta ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
          <div
            className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              introAberta ? "max-h-40 opacity-100 py-1" : "max-h-0 opacity-0"
            }`}
          >
            <button
              onClick={() => rolarParaSecao("reconhecimento")}
              className="w-full text-left flex items-center gap-3 pl-8 pr-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-200 text-xs cursor-pointer group"
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">IA (Python)</span>
            </button>
            <button
              onClick={() => rolarParaSecao("esp32")}
              className="w-full text-left flex items-center gap-3 pl-8 pr-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-200 text-xs cursor-pointer group"
            >
              <Cpu className="h-3.5 w-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Firmware (C++)</span>
            </button>
          </div>
        </div>

        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            {...item}
            onClick={fecharMenuMobile}
            isActive={isActive(item.to)}
          />
        ))}

        <p className="pt-4 pb-1 pl-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          Configurações adicionais
        </p>
        {CONFIG_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            {...item}
            onClick={fecharMenuMobile}
            isActive={isActive(item.to)}
          />
        ))}
      </nav>

      <div className="mt-auto pb-8 text-center">
        <p className="text-xs text-slate-600 font-medium">TotemID v1.0</p>
      </div>
    </>
  );

  return (
    <>
      {/* ===================== MOBILE LAYER ===================== */}
      <button
        onClick={() => setMenuMobileAberto(!menuMobileAberto)}
        aria-label={menuMobileAberto ? "Fechar menu" : "Abrir menu de navegação"}
        className="md:hidden fixed bottom-6 right-6 z-60 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none"
      >
        {menuMobileAberto ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {menuMobileAberto && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={fecharMenuMobile}
        />
      )}

      <aside
        className={`md:hidden flex flex-col w-72 h-screen bg-slate-950 border-r border-slate-800 pt-10 px-4 z-50 overflow-y-auto custom-scrollbar fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
          menuMobileAberto ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {ConteudoSidebar}
      </aside>

      {/* ===================== DESKTOP LAYER ===================== */}
      <aside className="hidden md:flex flex-col w-72 h-screen bg-slate-950 border-r border-slate-800 pt-10 px-4 z-10 overflow-y-auto custom-scrollbar sticky top-0 shrink-0">
        {ConteudoSidebar}
      </aside>
    </>
  );
};

export default SidebarDocs;
