import React, { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Bloco de código reutilizável com botão de copiar.
 * Centraliza o que antes estava duplicado em ~9 arquivos diferentes.
 */
const CodeBlock = ({
  language = "bash",
  code,
  fileName,
  iconColor = "text-blue-400",
  showLineNumbers = false,
  maxHeight,
}) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  return (
    <div className="not-prose group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg shadow-black/20">
      {fileName ? (
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-300">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
            <Code className={`h-4 w-4 shrink-0 ${iconColor}`} />
            <span className="truncate">{fileName}</span>
          </div>
          <CopyButton copiado={copiado} onClick={handleCopy} />
        </div>
      ) : (
        <CopyButton
          copiado={copiado}
          onClick={handleCopy}
          floating
        />
      )}

      <div
        className="overflow-auto custom-scrollbar"
        style={{ maxHeight: maxHeight ?? (fileName ? "500px" : undefined) }}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1.1rem",
            fontSize: "0.8125rem",
            background: "transparent",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const CopyButton = ({ copiado, onClick, floating }) => (
  <button
    onClick={onClick}
    className={`flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-700 hover:text-white ${
      floating
        ? "absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
        : ""
    }`}
  >
    {copiado ? (
      <>
        <Check className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-emerald-400">Copiado!</span>
      </>
    ) : (
      <>
        <Copy className="h-3.5 w-3.5" />
        <span>Copiar</span>
      </>
    )}
  </button>
);

export default CodeBlock;
