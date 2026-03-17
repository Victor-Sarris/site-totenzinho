import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";

// Imports das imagens do tutorial SSH
import img2 from "../../assets/img/Docs/ConnectionSsh/2.png";
import img3 from "../../assets/img/Docs/ConnectionSsh/3.png";
import img4 from "../../assets/img/Docs/ConnectionSsh/4.png";
import img5 from "../../assets/img/Docs/ConnectionSsh/5.png";
import img6 from "../../assets/img/Docs/ConnectionSsh/6.png";
import img7 from "../../assets/img/Docs/ConnectionSsh/7.png";
import img8 from "../../assets/img/Docs/ConnectionSsh/8.png";
import img9 from "../../assets/img/Docs/ConnectionSsh/9.png";

// ===================== Componente de Bloco de Código com Copy =====================
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

const ConnectionSsh = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 md:ml-72 p-8 lg:p-12 max-w-4xl pt-24">
        {/* Título Principal */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            02. Como conectar ao Labrador via SSH
          </h1>
          <p className="text-lg text-slate-400">
            Aprenda a acessar o SBC Labrador remotamente através do seu
            computador usando o Putty.
          </p>
        </div>

        {/* Passo 1: Download do Putty */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Primeiro passo, instalar o Putty:
          </h2>
          <div className="space-y-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img2}
                alt="Pesquisando por Putty"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Procure por Download Putty no seu navegador
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img3}
                alt="Página de Download do Putty"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Faça o download da versão correspondente com seu SO.
              </p>
            </div>
          </div>
        </section>

        {/* Passo 2: IP do Labrador */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Descobrindo o IP do Labrador
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Depois de fazer o download e instalação do Putty, vamos iniciar o
            Labrador e descobrir seu IP local para conectá-lo localmente via SSH
            com sua máquina:
          </p>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
            <img
              src={img4}
              alt="Comando ip addr show"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 text-center font-medium">
              No labrador, abra o CMD e digite o comando{" "}
              <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
                ip addr show
              </code>
              . O IP do Labrador será exibido.
            </p>
          </div>
        </section>

        {/* Passo 3: Teste de Ping */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Testando a conexão
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Ficou em dúvida se é o IP correto? Não tem problema, podemos testar!
            Abra o CMD na sua máquina e use o seguinte comando:
          </p>
          <CodeBlock language="bash" code="ping <ip_labrador>" />

          <div className="bg-slate-800/30 p-4 rounded-xl border border-green-900/50 mt-8">
            <h3 className="text-lg font-bold text-green-400 mb-3">
              Caso dê tudo certo:
            </h3>
            <img
              src={img5}
              alt="Ping bem sucedido"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-sm text-slate-400 text-center">
              Caso tenha uma saída parecida, está tudo certo!
            </p>
          </div>
        </section>

        {/* Passo 4: Conexão via Putty */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Acessando o Labrador
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Com a etapa anterior bem sucedida, abra o Putty na sua máquina:
          </p>

          <div className="space-y-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img6}
                alt="Abrindo o Putty"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">
                Configure o Putty corretamente:
              </h3>
              <img
                src={img7}
                alt="Configurando o Putty"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Coloque o ip do seu Labrador e o seu tipo de conexão (SSH). Em
                seguida, aperte em Open.
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">
                Entre no Labrador normalmente:
              </h3>
              <img
                src={img8}
                alt="Login no Putty"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <img
                src={img9}
                alt="Acesso liberado"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Coloque sua senha e login do Labrador. Agora você pode mexer
                livremente.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConnectionSsh;
