import React, { useState } from "react";
import { Book, Terminal, Cpu, ChevronRight, ChevronDown } from "lucide-react";

const SidebarDocs = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleIntroClick = () => {
    setIsIntroOpen(!isIntroOpen);
    rolarParaSecao("intro");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 mt-15 h-screen fixed left-0 top-0 bg-slate-950 border-r border-slate-800 pt-10 px-4 z-10 shadow-2xl">
      {/* Título do Menu */}
      <div className="mb-10 px-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-500" />
          Navegação
        </h3>
        <p className="text-xs text-slate-500 mt-2">Guia de Módulos</p>
      </div>

      <nav className="flex-1 space-y-2">
        <button
          onClick={handleIntroClick}
          className="w-full text-left flex items-center justify-between px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Book className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            <span className="font-medium text-sm">1. Introdução</span>
          </div>
          {isIntroOpen ? (
            <ChevronDown className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
          )}
        </button>

        <div
          className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
            isIntroOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <button
            onClick={() => rolarParaSecao("reconhecimento")}
            className="w-full text-left flex items-center gap-3 pl-10 pr-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <Terminal className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <span className="font-medium text-sm">IA (Python)</span>
          </button>

          <button
            onClick={() => rolarParaSecao("esp32")}
            className="w-full text-left flex items-center gap-3 pl-10 pr-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <Cpu className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium text-sm">Firmware (C++)</span>
          </button>
        </div>
      </nav>

      <div className="mt-auto pb-8 px-4 text-center">
        <p className="text-xs text-slate-600 font-medium">TotemID v1.0</p>
      </div>
    </aside>
  );
};

export default SidebarDocs;
