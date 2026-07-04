import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ScanFace from "./icons/ScanFace";

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/documentacao", label: "Documentação" },
  { to: "/wiki", label: "Wiki" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const isActive = (path) => location.pathname === path;
  const fecharMenu = () => setMenuMobileAberto(false);

  return (
    <header className="fixed w-full top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={fecharMenu}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          <ScanFace className="text-blue-500 h-8 w-8" />
          Totem<span className="text-blue-500">ID</span>
        </Link>

        {/* ===================== DESKTOP LAYER ===================== */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive(link.to)
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ===================== MOBILE LAYER ===================== */}
        <button
          onClick={() => setMenuMobileAberto(!menuMobileAberto)}
          aria-label={menuMobileAberto ? "Fechar menu" : "Abrir menu"}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2 cursor-pointer"
        >
          {menuMobileAberto ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Menu Dropdown Mobile */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl origin-top transition-all duration-200 ${
          menuMobileAberto
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-4 pt-2 pb-6 gap-1 font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={fecharMenu}
              className={`px-3 py-2.5 rounded-lg transition-colors ${
                isActive(link.to)
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
