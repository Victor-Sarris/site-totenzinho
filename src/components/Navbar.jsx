import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Github } from "lucide-react";
import { ScanFace } from "./ui/Icons";

const HOME_PATH = "/site-totenzinho";

const NAV_LINKS = [
  { label: "Início", path: HOME_PATH },
  { label: "Documentação", path: "/documentacao" },
  { label: "Wiki", path: "/wiki" },
  { label: "Resultados do TCC", path: "/resultados" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [comSombra, setComSombra] = useState(false);

  useEffect(() => {
    const aoRolar = () => setComSombra(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const fecharMenu = () => setMenuMobileAberto(false);

  const isActive = (path) =>
    path === HOME_PATH
      ? location.pathname === HOME_PATH || location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 z-60 w-full border-b font-sans backdrop-blur-md transition-colors duration-300 ${
        comSombra
          ? "border-slate-800 bg-slate-900/90 shadow-lg shadow-black/20"
          : "border-slate-800/60 bg-slate-900/70"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to={HOME_PATH}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <ScanFace className="h-7 w-7 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            Totem<span className="text-blue-500">ID</span>
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-lg px-3.5 py-2 transition-colors ${
                isActive(link.path)
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial"
            target="_blank"
            rel="noreferrer"
            className="ml-2 flex items-center gap-1.5 rounded-lg border border-slate-700 px-3.5 py-2 text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>

        {/* Botão Mobile */}
        <button
          onClick={() => setMenuMobileAberto((v) => !v)}
          aria-label={menuMobileAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuMobileAberto}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800/70 hover:text-white focus:outline-none md:hidden"
        >
          {menuMobileAberto ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={`overflow-hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-md transition-[max-height] duration-300 ease-in-out md:hidden ${
          menuMobileAberto ? "max-h-72" : "max-h-0 border-b-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pt-2 pb-6 font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={fecharMenu}
              className={`rounded-lg px-3 py-2.5 transition-colors ${
                isActive(link.path)
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial"
            target="_blank"
            rel="noreferrer"
            onClick={fecharMenu}
            className="mt-1 flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2.5 text-slate-300"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
