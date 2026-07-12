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
import { Link, useLocation } from "react-router-dom";
import { docsNav } from "../data/docsNav";

const SidebarDocs = () => {
  const location = useLocation();
  const [introducaoAberta, setIntroducaoAberta] = useState(true);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const fecharMenuMobile = () => setMenuMobileAberto(false);

  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    fecharMenuMobile();
  };

  const linkClasses = (path) =>
    `w-full text-left flex items-center justify-between pl-2.5 pr-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 border ${
      location.pathname === path
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "text-slate-300 border-transparent hover:text-white hover:bg-slate-800/60 hover:border-slate-700"
    }`;

  const ConteudoSidebar = (
    <>
      <div className="mb-8 shrink-0">
        <h3 className="flex items-center gap-2 text-xl font-bold text-white">
          <Book className="h-5 w-5 text-blue-500" />
          Navegação
        </h3>
        <p className="mt-2 text-xs text-slate-500">
          Guia de Módulos e Configuração
        </p>
      </div>

      <nav className="flex-1 space-y-6 pb-24">
        {/* Introdução (Documentação do código) */}
        <div>
          <p className="mb-1.5 px-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Documentação do Código
          </p>
          <Link to="/documentacao" onClick={fecharMenuMobile}>
            <button
              onClick={() => setIntroducaoAberta((v) => !v)}
              className={linkClasses("/documentacao")}
            >
              <span>Introdução</span>
              {introducaoAberta ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500" />
              )}
            </button>
          </Link>
          <div
            className={`space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              introducaoAberta ? "mt-1 max-h-40 py-1 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <button
              onClick={() => rolarParaSecao("reconhecimento")}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 pr-4 pl-8 text-left text-xs font-medium text-slate-400 transition-colors duration-150 hover:bg-slate-800/40 hover:text-white"
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400 transition-transform group-hover:scale-110" />
              IA (Python)
            </button>
            <button
              onClick={() => rolarParaSecao("esp32")}
              className="group flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 pr-4 pl-8 text-left text-xs font-medium text-slate-400 transition-colors duration-150 hover:bg-slate-800/40 hover:text-white"
            >
              <Cpu className="h-3.5 w-3.5 text-indigo-400 transition-transform group-hover:scale-110" />
              Firmware (C++)
            </button>
          </div>
        </div>

        {/* Grupos data-driven */}
        {docsNav.map((grupo) => (
          <div key={grupo.group}>
            <p className="mb-1.5 px-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {grupo.group}
            </p>
            <div className="space-y-1">
              {grupo.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={fecharMenuMobile}
                >
                  <button className={linkClasses(item.path)}>
                    <span className="truncate">{item.title}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pb-8 text-center">
        <p className="text-xs font-medium text-slate-600">TotemID v1.0</p>
      </div>
    </>
  );

  return (
    <>
      {/* Botão Flutuante Mobile */}
      <button
        onClick={() => setMenuMobileAberto((v) => !v)}
        aria-label={menuMobileAberto ? "Fechar navegação" : "Abrir navegação"}
        className="fixed right-6 bottom-6 z-60 flex items-center justify-center rounded-full bg-blue-600 p-4 text-white shadow-2xl transition-all duration-300 hover:bg-blue-500 focus:outline-none md:hidden"
      >
        {menuMobileAberto ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay Mobile */}
      {menuMobileAberto && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={fecharMenuMobile}
        />
      )}

      {/* Sidebar Mobile */}
      <aside
        className={`custom-scrollbar fixed top-0 left-0 z-50 flex h-screen w-72 flex-col overflow-y-auto border-r border-slate-800 bg-slate-950 px-4 pt-10 transition-transform duration-300 ease-in-out md:hidden ${
          menuMobileAberto ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {ConteudoSidebar}
      </aside>

      {/* Sidebar Desktop */}
      <aside className="custom-scrollbar sticky top-16 z-10 hidden h-[calc(100vh-4rem)] w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-800 bg-slate-950 px-4 pt-8 md:flex">
        {ConteudoSidebar}
      </aside>
    </>
  );
};

export default SidebarDocs;
