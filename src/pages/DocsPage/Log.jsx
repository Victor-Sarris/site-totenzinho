import { Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import SidebarDocs from "../../components/SidebarDocs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, code }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg mb-6 group relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 z-10 opacity-0 group-hover:opacity-100"
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
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          backgroundColor: "#0B1120",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Log = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />
      <main className="flex-1 w-full max-w-3x1 md:ml-72 p-4 md:p-8 lg:p-12 max-w-3xl mx-auto overflow-x-hidden">
        {/* Monitoramento de Arquivo .Log */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Monitoramento de Arquivo .Log
          </h2>
          <ul className="list-disc">
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Ver o histórico completo (Estático) Este comando exibe todo o
                conteúdo do arquivo de log de uma só vez. Útil para ler o que
                aconteceu desde o momento que o Labrador ligou.
              </p>
              <CodeBlock
                language="bash"
                code="cat /home/caninos/log_erro.txt"
              />
            </li>
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Monitorar em Tempo Real (Dinâmico) Este é o comando mais usado
                durante testes. Ele mostra as novas linhas assim que elas
                aparecem (como o status da conexão ou o reconhecimento facial
                acontecendo ao vivo).
              </p>
              <CodeBlock
                language="bash"
                code="tail -f /home/caninos/log_erro.txt"
              />
              <p className="text-slate-300 mb-4 leading-relaxed">
                (Para sair deste modo e voltar ao terminal, pressione Ctrl + C).
              </p>
            </li>
          </ul>
        </section>
        {/* Estrutura de Pastas esperada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Estrutura de Pastas esperada
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            O sistema assume que o projeto está localizado em:
          </p>
          <CodeBlock
            language="bash"
            code="/home/caninos/Desktop/Reconhecimento-Facial"
          />
        </section>
        <div className="bg-green-900/20 border border-green-800/50 p-6 rounded-xl mt-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            Tudo Pronto!
          </h3>
          <p className="text-slate-300">
            Se o status mostrar{" "}
            <span className="text-green-400 font-semibold">
              active (running)
            </span>
            , parabéns! Seu totem agora iniciará o script de reconhecimento
            facial sozinho toda vez que for energizado.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Log;
