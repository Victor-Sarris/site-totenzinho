import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

const LibraryPage = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          02. Instalação de Bibliotecas
        </h1>
        <p className="text-lg text-slate-400">
          Configure o ambiente Python e instale as dependências necessárias
          para rodar o sistema de reconhecimento facial, tanto no seu PC
          quanto no Labrador.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-white">
          É recomendado criar e ativar um ambiente de desenvolvimento
        </h2>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-slate-300">Criar o Ambiente:</p>
            <CodeBlock language="bash" code="python -m venv venv" />
          </div>

          <div>
            <p className="mb-2 text-slate-300">Ativar o Ambiente no CMD:</p>
            <CodeBlock language="bash" code="venv\Scripts\activate" />
          </div>

          <div>
            <p className="mb-2 text-slate-300">
              Ativar o Ambiente no PowerShell:
            </p>
            <CodeBlock language="bash" code=".\venv\Scripts\Activate.ps1" />
          </div>
        </div>
      </section>

      <section id="libs" className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-white">
          Para rodar o projeto é necessário usar as seguintes bibliotecas
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

      <section id="install-pc" className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-white">
          Instalação de Bibliotecas (Se for fazer o teste no Windows)
        </h2>
        <p className="mb-6 rounded border border-yellow-700/50 bg-yellow-900/20 p-3 leading-relaxed text-slate-300">
          <span className="font-bold text-yellow-500">Atenção:</span> Baixe
          o Visual Studio Build Tools e instale{" "}
          <code className="mx-1 text-yellow-400">
            Desenvolvimento para Desktop com C++
          </code>
        </p>
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
        <p className="mt-4 text-slate-300">
          Agora você tem as bibliotecas necessárias para rodar o projeto no
          seu PC :)
        </p>
      </section>

      <section id="install-lab" className="mb-4">
        <h2 className="mb-4 text-xl font-bold text-white">
          Instalação de Bibliotecas no Labrador
        </h2>
        <ol className="mb-6 list-decimal space-y-2 pl-5 text-slate-300">
          <li>
            Primeiro, é importante criar e entrar no ambiente de
            desenvolvimento no Labrador.
          </li>
          <li>
            Em seguida, instale as bibliotecas dentro do Ambiente de
            Desenvolvimento do Labrador.
          </li>
        </ol>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-lg font-medium text-white">
              1. Dependências do Sistema (Terminal Geral)
            </h3>
            <p className="mb-4 text-slate-300">
              Antes de tudo, é necessário instalar as bibliotecas
              matemáticas e gráficas que o OpenCV usa "por baixo do capô".
              Sem elas, o Python não consegue carregar a biblioteca.
            </p>
            <p className="mb-2 text-slate-300">
              Antes de realizar a instalação de bibliotecas no SO do
              labrador, certifique de checar as bibliotecas já existentes:
            </p>
            <CodeBlock language="bash" code="sudo apt update" />
          </div>

          <div>
            <p className="mb-2 text-slate-300">
              Agora você pode instalar normalmente as bibliotecas que
              precisa:
            </p>
            <div className="space-y-3">
              <CodeBlock
                language="bash"
                code="sudo apt install -y libopenblas-dev libatlas-base-dev libgtk-3-0 libavcodec-extra"
              />
              <CodeBlock language="bash" code="sudo apt install ffmpeg -y" />
              <CodeBlock language="bash" code="pip install requests" />
              <CodeBlock language="bash" code="sudo apt install cmake -y" />
              <CodeBlock language="bash" code="pip install flask" />
              <CodeBlock
                language="bash"
                code="sudo apt-get install i2c-tools python3-smbus"
              />
              <CodeBlock
                language="bash"
                code="pip install opencv-python --extra-index-url https://www.piwheels.org/simple --prefer-binary"
              />
              <CodeBlock
                language="bash"
                code="pip3 install adafruit-circuitpython-vl53l0x"
              />
              <CodeBlock language="bash" code="sudo apt-get update" />
              <CodeBlock
                language="bash"
                code="sudo apt-get install libgtk2.0-dev libgtk-3-dev libcanberra-gtk-module -y"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-white">
              2. Preparação do Ambiente Python
            </h3>
            <p className="mb-2 text-slate-300">
              Certifique-se de estar com seu ambiente virtual ativado (se
              estiver usando um):
            </p>
            <CodeBlock language="bash" code="source venv/bin/activate" />

            <p className="mt-4 mb-2 text-slate-300">
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
            <h3 className="mb-2 text-lg font-medium text-white">
              3. Instalação Otimizada (O "Pulo do Gato")
            </h3>
            <p className="mb-2 text-slate-300">
              O segredo para não demorar horas compilando é usar o
              repositório PiWheels e a flag --prefer-binary.
            </p>

            <p className="mt-4 mb-2 text-slate-300">
              Instalar o OpenCV (Versão Binary): isso baixa o arquivo .whl
              já pronto para ARMv7.
            </p>
            <CodeBlock
              language="bash"
              code="pip install opencv-python --extra-index-url https://www.piwheels.org/simple --prefer-binary"
            />
            <p className="mb-4 text-sm text-slate-500">
              (Nota: isso geralmente instala a versão 4.7.0.72 ou similar
              compatível)
            </p>

            <p className="mb-2 text-slate-300">
              Instalar o Numpy (Versão Compatível &lt; 2.0): o OpenCV 4.x
              não funciona com o Numpy 2.0+. Precisamos forçar uma versão
              anterior (série 1.x) que também seja binária.
            </p>
            <CodeBlock
              language="bash"
              code={`pip install "numpy<2" --extra-index-url https://www.piwheels.org/simple --prefer-binary`}
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium text-white">
              4. Validação
            </h3>
            <p className="mb-2 text-slate-300">
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

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-medium text-white">
            Resumo dos Erros Comuns (Troubleshooting)
          </h3>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-300">
            <li>
              <strong>Erro libGL.so, libopenblas.so ou libcblas.so:</strong>{" "}
              significa que faltou rodar o passo 1 (dependências do sistema
              via apt).
            </li>
            <li>
              <strong>Demora de horas na instalação:</strong> significa que
              você esqueceu as flags --extra-index-url ... ou
              --prefer-binary, e o Labrador está tentando compilar o código
              fonte.
            </li>
            <li>
              <strong>Erro numpy.core.multiarray failed to import:</strong>{" "}
              significa que você instalou o Numpy 2.0. Remova-o e instale
              com "numpy&lt;2".
            </li>
          </ul>

          <p className="mb-2 text-slate-300">
            Instalar o Dlib (Versão Binária - Rápida)
          </p>
          <CodeBlock
            language="bash"
            code="pip install dlib --extra-index-url https://www.piwheels.org/simple --prefer-binary"
          />

          <p className="mt-4 mb-2 text-slate-300">
            Instalar a biblioteca de reconhecimento
          </p>
          <CodeBlock
            language="bash"
            code="python3 -m pip install face_recognition --extra-index-url https://www.piwheels.org/simple --prefer-binary"
          />

          <p className="mt-4 mb-2 text-slate-300">
            Caso dê errado o comando anterior, adicione no final:
          </p>
          <CodeBlock language="bash" code="--break-system-packages" />
        </div>
      </section>
    </DocsLayout>
  );
};

export default LibraryPage;
