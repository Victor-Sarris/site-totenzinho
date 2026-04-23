import React, { useState } from "react";
import {
  Book,
  Terminal,
  Cpu,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const SidebarDocs = () => {
  const [abertos, setAbertos] = useState({
    introducao: true,
    ssh: false,
    remoto: false,
    venv: false,
    autostart: false,
  });

  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const toggleMenu = (menu) => {
    setAbertos((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const fecharMenuMobile = () => setMenuMobileAberto(false);

  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
      fecharMenuMobile();
    }
  };

  // 1. Guardamos todo o visual do menu numa variável para não repetir código
  const ConteudoSidebar = (
    <>
      <div className="mb-8 shrink-0 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-500" />
            Navegação
          </h3>
          <p className="text-xs text-slate-500 mt-2">
            Guia de Módulos e Configuração
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 pb-24">
        {/* 01. Introdução */}
        <div className="flex flex-col">
          <Link to="/documentacao">
            <button
              onClick={() => toggleMenu("introducao")}
              className="w-full text-left flex items-center justify-between py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-blue-400 pl-2">
                  Introdução
                </span>
              </div>
              {abertos.introducao ? (
                <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors mr-2" />
              )}
            </button>
          </Link>
          <div
            className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${abertos.introducao ? "max-h-125 opacity-100 py-1" : "max-h-0 opacity-0"}`}
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

        {/* 01. Venv Create */}
        <div className="flex flex-col">
          <Link to="/documentacao/venv" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                01. Criação de Ambiente Virtual (Venv)
              </span>
            </button>
          </Link>
        </div>

        {/* 02. SSH */}
        <div className="flex flex-col">
          <Link to="/documentacao/library-install" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                02. Instalacao de Bibliotecas
              </span>
            </button>
          </Link>
          <Link to="/documentacao/connection-ssh" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                03. Como conectar ao Labrador via Putty
              </span>
            </button>
          </Link>
        </div>

        {/* 04. Controle Remoto */}
        <div className="flex flex-col">
          <Link to="/documentacao/remote-labrador" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                04. Como controlar remotamente pelo PC
              </span>
            </button>
          </Link>
        </div>

        {/* 05. AutoStart */}
        <div className="flex flex-col">
          <Link to="/documentacao/auto-start-file" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                05. Criação de AutoStart File
              </span>
            </button>
          </Link>
        </div>
        <p className="mb-3 mt-3 font-bold">Configuracoes adicionais</p>
        {/* 01. Monitoramento de Arquivo .Log */}
        <div className="flex flex-col">
          <Link to="/documentacao/log-monitoring" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                01. Monitoramento de Arquivo .Log
              </span>
            </button>
          </Link>
        </div>
        {/* 02. Rotas do Sistema */}
        <div className="flex flex-col">
          <Link to="/documentacao/routes" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                02. Rotas do Sistema
              </span>
            </button>
          </Link>
        </div>
        {/* 03. Configuração de ip estático */}
        <div className="flex flex-col">
          <Link to="/documentacao/ip-config" onClick={fecharMenuMobile}>
            <button className="w-full text-left flex items-center justify-between pl-2 pr-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <span className="font-semibold text-sm text-blue-400">
                03. Configuração de ip estático
              </span>
            </button>
          </Link>
        </div>
      </nav>

      <div className="mt-auto pb-8 text-center">
        <p className="text-xs text-slate-600 font-medium">TotemID v1.0</p>
      </div>
    </>
  );

  return (
    <>
      {/* ===================== MOBILE LAYER ===================== */}
      {/* Botão Flutuante (FAB) */}
      <button
        onClick={() => setMenuMobileAberto(!menuMobileAberto)}
        className="md:hidden fixed bottom-6 right-6 z-60 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none"
      >
        {menuMobileAberto ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay escuro */}
      {menuMobileAberto && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={fecharMenuMobile}
        />
      )}

      {/* Sidebar Mobile (Deslizante) */}
      <aside
        className={`md:hidden flex flex-col w-72 h-screen bg-slate-950 border-r border-slate-800 pt-10 px-4 z-50 overflow-y-auto custom-scrollbar fixed top-0 left-0 transition-transform duration-300 ease-in-out ${menuMobileAberto ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        {ConteudoSidebar}
      </aside>

      {/* ===================== DESKTOP LAYER ===================== */}
      {/* Sidebar Desktop (Intocável, estática, sem animações que quebram o layout) */}
      <aside className="hidden md:flex flex-col w-72 h-screen bg-slate-950 border-r border-slate-800 pt-10 px-4 z-10 overflow-y-auto custom-scrollbar sticky top-0 shrink-0">
        {ConteudoSidebar}
      </aside>
    </>
  );
};

export default SidebarDocs;
