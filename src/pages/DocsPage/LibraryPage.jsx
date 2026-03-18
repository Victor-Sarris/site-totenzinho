import React, { useState } from "react";
import { Copy, Check, Terminal, Info, AlertTriangle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";

// ===================== Componente de Bloco de Código com Copy =====================
const CodeBlock = ({ language, code }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
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
          backgroundColor: "#0B1120", // Ajuste para fundo mais escuro
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 md:ml-72 p-8 lg:p-12 max-w-4xl pt-24">
        {/* Título Principal */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-6">
            É recomendado criar e ativar um ambiente de desenvolvimento:
          </h1>

          <div className="space-y-6">
            <div>
              <p className="text-slate-300 mb-2">Criar o Ambiente:</p>
              <CodeBlock language="bash" code="python -m venv venv" />
            </div>

            <div>
              <p className="text-slate-300 mb-2">Ativar o Ambiente no CMD:</p>
              <CodeBlock language="bash" code="venv\Scripts\activate" />
            </div>

            <div>
              <p className="text-slate-300 mb-2">
                Ativar o Ambiente no PowerShell:
              </p>
              <CodeBlock language="bash" code=".\venv\Scripts\Activate.ps1" />
            </div>
          </div>
        </div>

        {/* Lista de Bibliotecas */}
        <section id="libs" className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Para rodar o projeto é necessário usar as seguintes bibliotecas:
          </h2>
          <CodeBlock
            language="plaintext"
            code={`- mediapipe==0.10.21

- deepface

- tf-keras

- cv2

- os

- pickle`}
          />
        </section>

        {/* Instalação no PC */}
        <section id="install-pc" className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Instalação de Bibliotecas (Se for fazer o teste no seu PC)
          </h2>
          <div className="space-y-4">
            <CodeBlock
              language="bash"
              code="pip install opencv-python --extra-index-url https://www.piwheels.org/simple --prefer-binary"
            />
            <CodeBlock
              language="bash"
              code={`pip install "numpy<2" --extra-index-url https://www.piwheels.org/simple --prefer-binary`}
            />
            <CodeBlock
              language="bash"
              code="pip install dlib --extra-index-url https://www.piwheels.org/simple --prefer-binary"
            />
            <CodeBlock language="bash" code="pip install face_recognition" />
            <CodeBlock language="bash" code={`pip install "setuptools<81"`} />
            <CodeBlock language="bash" code="pip install requests" />
            <CodeBlock language="bash" code="pip install flask" />
          </div>
          <p>
            Agora você tem as bibliotecas necessárias para rodar o projeto no
            seu PC :)
          </p>
        </section>

        {/* Instalação no Labrador */}
        <section id="install-lab" className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Instalação de Bibliotecas no Labrador
          </h2>
          <ol className="list-decimal pl-5 space-y-2 mb-6 text-slate-300">
            <li>
              Primeiro, é importante criar e entrar no ambiente de
              desenvolvimento no Labrador.
            </li>
            <li>
              Em seguida, instale as bibliotecas dentro do Ambiente de
              Desenvolvimento do Labrador.
            </li>
          </ol>

          <p className="mb-6">
            Nota: Acesse a documentação para fazer o processo corretamente:{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Documentação
            </a>
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                1. Dependências do Sistema (Terminal Geral)
              </h3>
              <p className="text-slate-300 mb-4">
                Antes de tudo, é necessário instalar as bibliotecas matemáticas
                e gráficas que o OpenCV usa "por baixo do capô". Sem elas, o
                Python não consegue carregar a biblioteca.
              </p>
              <p className="text-slate-300 mb-2">
                Antes de realizar a instalação de bibliotecas no SO do labrador,
                certifique de checar as bibliotecas já existentes:
              </p>
              <CodeBlock language="bash" code="sudo apt update" />
            </div>

            <div>
              <p className="text-slate-300 mb-2">
                Agora você pode instalar normalmente as bibliotecas que precisa:
              </p>
              <CodeBlock
                language="bash"
                code="sudo apt install -y libopenblas-dev libatlas-base-dev libgtk-3-0 libavcodec-extra"
              />
              <CodeBlock language="bash" code="sudo apt install ffmpeg -y" />
              <CodeBlock language="bash" code="pip install requests" />
              <CodeBlock language="bash" code="sudo apt install cmake -y" />
              <CodeBlock language="bash" code="pip install flask" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                2. Preparação do Ambiente Python
              </h3>
              <p className="text-slate-300 mb-2">
                Certifique-se de estar com seu ambiente virtual ativado (se
                estiver usando um):
              </p>
              <CodeBlock language="bash" code="source venv/bin/activate" />

              <p className="text-slate-300 mb-2 mt-4">
                Caso o Numpy ou OpenCV já estejam instalados de forma errada
                (versões incompatíveis ou quebradas), remova-os para começar
                limpo:
              </p>
              <CodeBlock
                language="bash"
                code="pip uninstall opencv-python numpy -y"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                3. Instalação Otimizada (O "Pulo do Gato")
              </h3>
              <p className="text-slate-300 mb-2">
                O segredo para não demorar horas compilando é usar o repositório
                PiWheels e a flag --prefer-binary.
              </p>

              <p className="text-slate-300 mb-2 mt-4">
                Instalar o OpenCV (Versão Binary): Isso baixa o arquivo .whl já
                pronto para ARMv7.
              </p>
              <CodeBlock
                language="bash"
                code="pip install opencv-python --extra-index-url https://www.piwheels.org/simple --prefer-binary"
              />
              <p className="text-sm text-slate-400 mb-4">
                (Nota: Isso geralmente instala a versão 4.7.0.72 ou similar
                compatível)
              </p>

              <p className="text-slate-300 mb-2">
                Instalar o Numpy (Versão Compatível &lt; 2.0): O OpenCV 4.x não
                funciona com o Numpy 2.0+. Precisamos forçar uma versão anterior
                (série 1.x) que também seja binária.
              </p>
              <CodeBlock
                language="bash"
                code={`pip install "numpy<2" --extra-index-url https://www.piwheels.org/simple --prefer-binary`}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                4. Validação
              </h3>
              <p className="text-slate-300 mb-2">
                Para confirmar que tudo deu certo, rode o comando abaixo. Se
                aparecer a versão (ex: 4.7.0) e nenhum erro, o ambiente está
                pronto.
              </p>
              <CodeBlock
                language="bash"
                code={`python3 -c "import cv2; print(f'OpenCV Version: {cv2.__version__}')"`}
              />
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">
              Resumo dos Erros Comuns (Troubleshooting)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-300 mb-6">
              <li>
                <strong>Erro libGL.so, libopenblas.so ou libcblas.so:</strong>{" "}
                Significa que faltou rodar o passo 1 (dependências do sistema
                via apt).
              </li>
              <li>
                <strong>Demora de horas na instalação:</strong> Significa que
                você esqueceu as flags --extra-index-url ... ou --prefer-binary,
                e o Labrador está tentando compilar o código fonte.
              </li>
              <li>
                <strong>Erro numpy.core.multiarray failed to import:</strong>{" "}
                Significa que você instalou o Numpy 2.0. Remova-o e instale com
                "numpy&lt;2".
              </li>
            </ul>

            <p className="text-slate-300 mb-2">
              Instalar o Dlib (Versão Binária - Rápida)
            </p>
            <CodeBlock
              language="bash"
              code="pip install dlib --extra-index-url https://www.piwheels.org/simple --prefer-binary"
            />

            <p className="text-slate-300 mb-2 mt-4">
              Instalar a biblioteca de reconhecimento
            </p>
            <CodeBlock
              language="bash"
              code="python3 -m pip install face_recognition --extra-index-url https://www.piwheels.org/simple --prefer-binary"
            />

            <p className="text-slate-300 mb-2 mt-4">
              Caso dê errado o comando anterior, adicione no final:
            </p>
            <CodeBlock language="bash" code="--break-system-packages" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LibraryPage;
