import DocsLayout from "../../components/DocsLayout";
import CodeBlock from "../../components/CodeBlock";

const LibraryPage = () => {
  return (
    <DocsLayout>
        {/* Título Principal */}
        <div className="mb-10 border-b border-slate-800 pb-8">
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
            Instalação de Bibliotecas (Se for fazer o teste no Windows)
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed bg-yellow-900/20 p-3 rounded border border-yellow-700/50">
            <span className="font-bold text-yellow-500">Atenção:</span> Baixe o
            Visual Studio Build Tools e instale
            <code className="text-yellow-400 mx-1">
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
    </DocsLayout>
  );
};

export default LibraryPage;
