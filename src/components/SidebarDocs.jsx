import React, { useState } from "react";
import { Book, Terminal, Cpu, ChevronRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarDocs = () => {
  // Estado para controlar múltiplos tópicos abertos/fechados
  const [abertos, setAbertos] = useState({
    introducao: true,
    ssh: false,
    remoto: false,
    venv: false,
    autostart: false,
  });

  const toggleMenu = (menu) => {
    setAbertos((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-72 mt-15 h-screen fixed left-0 top-0 bg-slate-950 border-r border-slate-800 pt-10 px-4 z-10 shadow-2xl overflow-y-auto custom-scrollbar">
      {/* Título do Menu */}
      <div className="mb-8 px-4 flex-shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-500" />
          Navegação
        </h3>
        <p className="text-xs text-slate-500 mt-2">
          Guia de Módulos e Configuração
        </p>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 space-y-2 pb-24">
        {/* 01. Introdução */}
        <div className="flex flex-col">
          <button
            onClick={() => toggleMenu("introducao")}
            className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm text-blue-400">
                Introdução
              </span>
            </div>
            {abertos.introducao ? (
              <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            )}
          </button>

          <div
            className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${abertos.introducao ? "max-h-125 opacity-100 py-1" : "max-h-0 opacity-0"}`}
          >
            {/* Tópicos de IA e Firmware */}
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

        {/* 02. SSH */}
        <div className="flex flex-col">
          <Link to="/documentacao/library-install">
            <button className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-semibold text-sm text-blue-400">
                  01. Instalacao de Bibliotecas
                </span>
              </div>
            </button>
          </Link>
          <Link to="/documentacao/connection-ssh">
            <button className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-semibold text-sm text-blue-400">
                  02. Como conectar ao Labrador via Putty
                </span>
              </div>
            </button>
          </Link>
        </div>

        {/* 03. Controle Remoto */}
        <div className="flex flex-col">
          <Link to="/documentacao/remote-labrador">
            <button className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-semibold text-sm text-blue-400 ">
                  03. Como controlar o Labrador remotamente pelo seu PC pessoal
                </span>
              </div>
            </button>
          </Link>
        </div>

        {/* 04. Venv */}
        <div className="flex flex-col">
          <Link to="/documentacao/venv">
            <button className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-semibold text-sm text-blue-400 ">
                  04. Criação de Ambiente Virtual (Venv) no Labrador
                </span>
              </div>
            </button>
          </Link>
        </div>

        {/* 05. AutoStart */}
        <div className="flex flex-col">
          <Link to="/documentacao/auto-start-file">
            <button className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="font-semibold text-sm text-blue-400">
                  05. Criação de AutoStart File (Inicializacão de Sistema
                  automático)
                </span>
              </div>
            </button>
          </Link>
        </div>
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="mt-auto pb-8 px-4 text-center">
        <p className="text-xs text-slate-600 font-medium">TotemID v1.0</p>
      </div>
    </aside>
  );
};

export default SidebarDocs;
