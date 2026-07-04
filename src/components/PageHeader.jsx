import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Cabeçalho padrão das páginas internas (Wiki, Modelos 3D, Organização, Circuito):
// link opcional de retorno, ícone + título e uma descrição curta.
const PageHeader = ({
  icon: Icon,
  iconColor = "text-blue-500",
  title,
  description,
  backTo,
  backLabel = "Voltar",
  descriptionMaxWidth = "max-w-2xl",
}) => (
  <header className="mb-12 border-b border-slate-800 pb-8">
    {backTo && (
      <Link
        to={backTo}
        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-6 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
    )}
    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
      {Icon && <Icon className={`${iconColor} h-8 w-8 md:h-10 md:w-10 shrink-0`} />}
      <span>{title}</span>
    </h1>
    {description && (
      <p className={`text-base md:text-lg text-slate-400 ${descriptionMaxWidth}`}>
        {description}
      </p>
    )}
  </header>
);

export default PageHeader;
