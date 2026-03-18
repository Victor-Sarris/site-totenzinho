import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";

// ===================== Componente de Bloco de Código =====================
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

const AutoStartFile = () => {
  const serviceCode = `[Unit]
Description=Servico de AutoStart para o Totem de Reconhecimento Facial
After=network.target

[Service]
User=caninos
WorkingDirectory=/home/caninos/Totem-Reconhecimento-Facial
# O ExecStart deve apontar para o Python do seu Venv e depois para o arquivo principal do projeto
ExecStart=/home/caninos/Totem-Reconhecimento-Facial/venv/bin/python main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 md:ml-72 p-8 lg:p-12 max-w-4xl pt-24">
        {/* Título Principal */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            05. Criação de AutoStart File
          </h1>
          <p className="text-lg text-slate-400">
            Configure o Labrador para iniciar o sistema de reconhecimento facial
            automaticamente assim que for ligado.
          </p>
        </div>

        {/* Introdução */}
        <section className="mb-12">
          <p className="text-slate-300 leading-relaxed">
            Para que o nosso totem funcione de forma autônoma, precisamos criar
            um serviço no sistema operacional (usando o{" "}
            <code className="bg-slate-800 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              systemd
            </code>
            ). Isso garantirá que o script Python rode em segundo plano logo
            após o boot, utilizando as bibliotecas isoladas do nosso Ambiente
            Virtual (Venv).
          </p>
        </section>

        {/* Passo 1: Criar o arquivo de serviço */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Passo 1: Criar o arquivo do serviço
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            No terminal do Labrador (via SSH ou acesso direto), vamos criar um
            novo arquivo `.service` dentro do diretório do systemd usando o
            editor de texto <strong>nano</strong>:
          </p>
          <CodeBlock
            language="bash"
            code="sudo nano /etc/systemd/system/totem-facial.service"
          />
        </section>

        {/* Passo 2: Configurar o arquivo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Passo 2: Configurar os parâmetros do serviço
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Dentro do editor nano, cole o código abaixo. Lembre-se de verificar
            se os caminhos (<em>WorkingDirectory</em> e <em>ExecStart</em>)
            correspondem exatamente ao local onde você clonou o repositório e
            criou o seu Venv.
          </p>
          <CodeBlock language="ini" code={serviceCode} />
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 mt-4">
            <p className="text-sm text-slate-400">
              <strong>Dica do Nano:</strong> Para salvar o arquivo após colar,
              aperte{" "}
              <kbd className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">
                Ctrl + O
              </kbd>
              , depois{" "}
              <kbd className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">
                Enter
              </kbd>{" "}
              para confirmar, e{" "}
              <kbd className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">
                Ctrl + X
              </kbd>{" "}
              para sair do editor.
            </p>
          </div>
        </section>

        {/* Passo 3: Ativar e Iniciar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Passo 3: Ativar e Iniciar o Serviço
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Agora precisamos avisar ao sistema que criamos um novo serviço,
            habilitá-lo para rodar na inicialização e, por fim, iniciá-lo.
            Execute os comandos abaixo, um por vez:
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-2">
                1. Recarrega os daemons do systemd para reconhecer o novo
                arquivo:
              </p>
              <CodeBlock language="bash" code="sudo systemctl daemon-reload" />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                2. Habilita o serviço para rodar no boot:
              </p>
              <CodeBlock
                language="bash"
                code="sudo systemctl enable totem-facial.service"
              />
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">
                3. Inicia o serviço imediatamente (sem precisar reiniciar o
                Labrador agora):
              </p>
              <CodeBlock
                language="bash"
                code="sudo systemctl start totem-facial.service"
              />
            </div>
          </div>
        </section>

        {/* Passo 4: Verificando status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Passo 4: Verificando o Status
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Para garantir que tudo deu certo e verificar se o programa está
            rodando sem erros de execução, use o comando de status:
          </p>
          <CodeBlock
            language="bash"
            code="sudo systemctl status totem-facial.service"
          />
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
        </section>
      </main>
    </div>
  );
};

export default AutoStartFile;
