import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-md overflow-hidden my-4 bg-gray-800">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded bg-gray-700 text-gray-300 hover:text-white transition-colors"
        title="Copiar link"
      >
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.5rem 1rem 1rem 1rem",
          fontSize: "0.875rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const LabradorRoutes = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 w-full max-w-3xl md:ml-72 p-4 md:p-8 lg:p-12 mx-auto overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Rotas do Labrador
          </h1>
          <p className="text-slate-400">
            Abaixo estão listados os endpoints e links de acesso aos serviços
            rodando no servidor do Labrador.
          </p>
        </div>

        {/* Rota de Video Feed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-400 text-sm py-1 px-3 rounded-full font-mono border border-blue-500/30">
              GET
            </span>
            Video Feed
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Acesse esta rota diretamente no navegador para visualizar o
            streaming de vídeo da câmera em tempo real. Ideal para monitorar o
            que o totem está enxergando.
          </p>
          <CodeBlock
            language="http"
            code="http://192.168.18.149:5000/video_feed"
          />
        </section>

        {/* Rota de Relatório */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-400 text-sm py-1 px-3 rounded-full font-mono border border-blue-500/30">
              GET
            </span>
            Relatório da API
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Esta rota retorna os dados de registros e logs gerados pelo sistema
            de reconhecimento facial. Geralmente devolve um objeto JSON que pode
            ser consumido por aplicações externas.
          </p>
          <CodeBlock
            language="http"
            code="http://192.168.18.149:5000/api/relatorio"
          />
        </section>

        {/* Rota de Cadastro */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="bg-green-500/20 text-green-400 text-sm py-1 px-3 rounded-full font-mono border border-green-500/30">
              POST
            </span>
            Cadastro Direto
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Endpoint responsável por receber dados e registrar novas faces ou
            usuários diretamente no banco de dados do sistema.
          </p>
          <CodeBlock
            language="http"
            code="http://192.168.18.149:5000/api/cadastrar_direto"
          />
        </section>

        {/* Dica Extra */}
        <div className="bg-yellow-900/20 border border-yellow-800/50 p-6 rounded-xl mt-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">
            Nota sobre o IP
          </h3>
          <p className="text-slate-300">
            Lembre-se de que o IP{" "}
            <code className="bg-slate-800 px-1 py-0.5 rounded text-yellow-300">
              192.168.18.149
            </code>{" "}
            pode mudar dependendo da rede em que o Labrador estiver conectado, a
            menos que esteja configurado como IP estático.
          </p>
        </div>
      </main>
    </div>
  );
};

export default LabradorRoutes;
