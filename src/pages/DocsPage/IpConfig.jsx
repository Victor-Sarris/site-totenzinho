import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";
import { Link } from "react-router-dom";

// importacoes de imagens
import img1 from "../../assets/img/Docs/IpConfig/1.png";
import img2 from "../../assets/img/Docs/IpConfig/2.png";
import img4 from "../../assets/img/Docs/IpConfig/4.png";
import img5 from "../../assets/img/Docs/IpConfig/5.png";

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

const IpConfig = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 md:ml-72 p-8 lg:p-12 max-w-4xl pt-24">
        <div className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            06. Configuração de Ip estático
          </h1>
          <p className="text-lg text-slate-400">
            Aprenda a configurar o ip do labrador e da EspCAM para terem o mesmo
            ip em uma rede wifi comercial. Isso facilita na conexão automatica
            dos componentes
          </p>
        </div>

        <section className="bm-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurando Ip do Labrador
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img1}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Abra as configurações de rede do dispositivo, selecione uma rede
              de sua preferência e clique na engrenagem "editar" no canto
              inferior esquerdo (o seu caso pode estar levemente diferente, mas
              o fluxo é o mesmo). Depois disso, vá para{" "}
              <span className="text-red-500">"Configuração IPv4"</span>
            </p>
          </div>
        </section>

        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurações de IPv4
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img2}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Aperte em "editar" e adicione as configurações de sua preferência.
              No primeiro bloco, coloque o ip que você quer que o Labrador
              assuma. No segundo coloque a porta do ip, geralmente o linux
              aceita a porta 24 com aliase da porta 255.255.255.0 . Por fim,
              coloque o ip da sua rede (ou seja, do seu wifi. No meu caso era:
              192.168.18.1)
            </p>
          </div>
        </section>
        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">Rota de Fuga!</h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img4}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Caso as alternativas acima deem errado, vamos apelar para os
              Scrips de terminal!
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Basta abrir o{" "}
              <span className="text-green-500">cmd do labrador</span> e colocar
              o script a baixo{" "}
              <span className="font-bold">
                (lembre de modificar o comando para o nome da rede e o ip
                correspondentes a sua rede)
              </span>
            </p>
            <CodeBlock
              language="bash"
              code="sudo nmcli connection modify <NOME_DA_REDE> ipv4.method manual ipv4.addresses <IP_PREFERIDO>/24 ipv4.gateway <IP_REDE> ipv4.dns 8.8.8.8"
            />
          </div>
        </section>
        {/* Configurando Ip da EspCAM */}
        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurando Ip da EspCAM
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img5}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Basta copiar e colar essa parte do algoritmo no espcam.ino que a
              configuração de ip seja feita!
            </p>
            <p className="text-slate-300 mb-6 mt-6 leading-relaxed">
              Vá para a página de{" "}
              <Link to="/documentacao" className="text-blue-400 underline">
                documentação
              </Link>{" "}
              para copiar o script inteiro!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IpConfig;
