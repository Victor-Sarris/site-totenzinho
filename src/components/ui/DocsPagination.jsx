import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getDocsSiblings } from "../../data/docsNav";

/**
 * Navegação "Anterior / Próximo" no rodapé das páginas de documentação,
 * para guiar o leitor pelo fluxo sequencial do guia.
 */
const DocsPagination = () => {
  const { pathname } = useLocation();
  const { prev, next } = getDocsSiblings(pathname);

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-blue-500/50 hover:bg-slate-800/60"
        >
          <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Anterior
          </span>
          <span className="font-semibold text-slate-200 group-hover:text-white">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          to={next.path}
          className="group flex flex-col rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-right transition-colors hover:border-blue-500/50 hover:bg-slate-800/60 sm:items-end"
        >
          <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-500">
            Próximo
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-semibold text-slate-200 group-hover:text-white">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
};

export default DocsPagination;
