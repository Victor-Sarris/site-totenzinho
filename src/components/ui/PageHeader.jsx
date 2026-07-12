import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Cabeçalho padrão usado nas páginas internas (Wiki, Circuito, Modelos 3D, Organização...).
 * Unifica o que antes era repetido manualmente em cada página com espaçamentos diferentes.
 */
const PageHeader = ({ icon: Icon, iconColor = "text-blue-500", backTo, backLabel, title, description, children }) => {
  return (
    <header className="mb-10 border-b border-slate-800 pb-8 md:mb-12 md:pb-10">
      {backTo && (
        <Link
          to={backTo}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel || "Voltar"}
        </Link>
      )}
      <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
        {Icon && <Icon className={`h-8 w-8 shrink-0 md:h-10 md:w-10 ${iconColor}`} />}
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg">
          {description}
        </p>
      )}
      {children}
    </header>
  );
};

export default PageHeader;
