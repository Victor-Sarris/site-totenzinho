import React from "react";
import { Link, useLocation } from "react-router-dom";

const ScanFace = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </svg>
);

const Navbar = () => {
  const location = useLocation();

  // Função para mudar a cor do link ativo
  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-400"
      : "text-slate-300 hover:text-white";
  };

  return (
    <header className="fixed w-full top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScanFace className="text-blue-500 h-8 w-8" />
          <Link
            to="/"
            className="font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            Totem<span className="text-blue-500">ID</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className={`transition-colors ${isActive("/")}`}>
            Início
          </Link>
          <Link
            to="/documentacao"
            className={`transition-colors ${isActive("/documentacao")}`}
          >
            Documentação
          </Link>
          <Link to="/wiki" className={`transition-colors ${isActive("/wiki")}`}>
            Wiki
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
