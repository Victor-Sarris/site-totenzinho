import React from "react";
import SidebarDocs from "../SidebarDocs";
import DocsPagination from "./DocsPagination";

/**
 * Layout compartilhado por todas as páginas de documentação:
 * sidebar fixa + área de conteúdo com largura e respiro consistentes + navegação anterior/próximo.
 */
const DocsLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-300">
      <SidebarDocs />
      <main className="w-full min-w-0 flex-1 px-4 pt-8 pb-24 sm:px-8 md:px-10 md:pt-12 lg:px-14">
        <div className="mx-auto max-w-3xl">
          {children}
          <DocsPagination />
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
