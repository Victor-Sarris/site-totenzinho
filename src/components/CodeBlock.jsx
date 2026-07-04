import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CopyButton = ({ copiado, onClick, floating }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 ${
      floating ? "absolute top-3 right-3 z-10" : ""
    }`}
  >
    {copiado ? (
      <>
        <Check className="h-3.5 w-3.5 text-green-400" />
        <span className="text-green-400 font-medium">Copiado!</span>
      </>
    ) : (
      <>
        <Copy className="h-3.5 w-3.5" />
        <span className="font-medium">Copiar</span>
      </>
    )}
  </button>
);

// Bloco de código reutilizado em toda a documentação. Passe `fileName` para
// exibir o cabeçalho de arquivo (usado nos módulos principais); sem ele, o
// botão de copiar flutua no canto superior direito.
const CodeBlock = ({ language = "bash", code, fileName, iconColor = "text-blue-400" }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="relative rounded-xl border border-slate-800 bg-slate-950 shadow-lg overflow-hidden mb-6">
      {fileName ? (
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-[#2d2d2d] text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Code className={`h-4 w-4 ${iconColor}`} />
            {fileName}
          </div>
          <CopyButton copiado={copiado} onClick={handleCopy} />
        </div>
      ) : (
        <CopyButton copiado={copiado} onClick={handleCopy} floating />
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={Boolean(fileName)}
        customStyle={{
          margin: 0,
          padding: fileName ? "1rem" : "1.25rem",
          maxHeight: fileName ? "500px" : undefined,
          fontSize: "0.875rem",
          backgroundColor: "#0B1120",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
