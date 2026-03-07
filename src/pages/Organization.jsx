import React from "react";
import { FolderTree, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Organization = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 lg:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-10 border-b border-slate-800 pb-8">
          <Link
            to="/wiki"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Wiki
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <FolderTree className="text-blue-500 h-10 w-10" />
            Organização de Arquivos
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            Estrutura de diretórios do ambiente no SBC Labrador. Abaixo está o
            mapeamento da pasta pessoal do utilizador "caninos" com foco no
            projeto de Reconhecimento Facial.
          </p>
        </header>

        {/* Bloco de Código Estilo Terminal/GitHub */}
        <div className="bg-[#0d1117] border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Barra superior estilo janela do mac/navegador */}
          <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-xs font-mono text-slate-400">
              home-caninos.txt
            </span>
          </div>

          {/* Conteúdo da Árvore */}
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed whitespace-pre">
              <code className="text-slate-300">
                {`/home/caninos/
├── `}
                <span className="text-blue-400 font-bold">.config/</span>
                {`                        `}
                <span className="text-slate-500 italic">
                  # Configurações ocultas do utilizador
                </span>
                {`
│   └── `}
                <span className="text-blue-400 font-bold">autostart/</span>
                {`                  `}
                <span className="text-slate-500 italic">
                  # Programas iniciados com o ambiente gráfico
                </span>
                {`
│       └── `}
                <span className="text-slate-400">reconhecimento.desktop</span>
                {`  `}
                <span className="text-slate-500 italic">
                  # Atalho para autostart do Reconhecimento Facial
                </span>
                {`
├── `}
                <span className="text-blue-400 font-bold">Desktop/</span>
                {`                        `}
                <span className="text-slate-500 italic">
                  # Área de trabalho gráfica do Labrador
                </span>
                {`
│   └── `}
                <span className="text-blue-400 font-bold">
                  Reconhecimento-Facial/
                </span>
                {`          `}
                <span className="text-slate-500 italic"></span>
                {`
│       ├── `}
                <span className="text-blue-400 font-bold">Script/</span>
                {`                   `}
                <span className="text-slate-500 italic"></span>
                {`
│       │   ├── `}
                <span className="text-blue-400 font-bold">dataset/</span>
                {`              `}
                <span className="text-slate-500 italic">
                  # Fotografias base para treino da IA (Não inclusa no
                  Repositório)
                </span>
                {`
│       │   ├── `}
                <span className="text-blue-400 font-bold">espcam/</span>
                {`               `}
                <span className="text-slate-500 italic">
                  # Utilitários/comunicação com a câmara ESP
                </span>
                {`
│       │   ├── `}
                <span className="text-blue-400 font-bold">logs_imagens/</span>
                {`         `}
                <span className="text-slate-500 italic">
                  # Capturas de imagem no momento dos acessos
                </span>
                {`
│       │   ├── `}
                <span className="text-blue-400 font-bold">venv/</span>
                {`                 `}
                <span className="text-slate-500 italic">
                  # Ambiente virtual Python isolado
                </span>
                {`
│       │   ├── `}
                <span className="text-emerald-400">03_reconhecer.py</span>
                {`      `}
                <span className="text-slate-500 italic">
                  # Script principal de visão computacional (OpenCV/dlib)
                </span>
                {`
│       │   ├── `}
                <span className="text-orange-300">encodings.pickle</span>
                {`      `}
                <span className="text-slate-500 italic">
                  # Ficheiro com os pesos da rede neural treinada
                </span>
                {`
│       │   └── `}
                <span className="text-purple-400">totem_banco.db</span>
                {`        `}
                <span className="text-slate-500 italic">
                  # Base de dados SQLite (utilizadores e logs)
                </span>
                {`
│       ├── `}
                <span className="text-slate-400">.gitignore</span>
                {`              `}
                <span className="text-slate-500 italic"></span>
                {`
│       ├── `}
                <span className="text-slate-400">LICENSE</span>
                {`                 `}
                <span className="text-slate-500 italic"></span>
                {`
│       ├── `}
                <span className="text-slate-400">README.md</span>
                {`               `}
                <span className="text-slate-500 italic"></span>
                {`
│       └── `}
                <span className="text-slate-400">requirements.txt</span>
                {`        `}
                <span className="text-slate-500 italic"></span>
                {`
├── `}
                <span className="text-emerald-400">iniciar.sh</span>
                {`                        `}
                <span className="text-slate-500 italic">
                  # Script Bash para arranque automático ao iniciar
                </span>
                {`
├── `}
                <span className="text-emerald-400">.iniciar.sh</span>
                {`                       `}
                <span className="text-slate-500 italic">
                  # Cópia oculta/ficheiro temporário do script
                </span>
                {`
├── `}
                <span className="text-purple-400">log_erro.txt</span>
                {`                      `}
                <span className="text-slate-500 italic">
                  # Ficheiro de registo contendo erros da aplicação
                </span>
                {`
├── `}
                <span className="text-slate-400">.~lock..iniciar.sh#</span>
                {`               `}
                <span className="text-slate-500 italic"></span>
                {`
├── `}
                <span className="text-slate-400">
                  .sudo_as_admin_successful
                </span>
                {`         `}
                <span className="text-slate-500 italic"></span>
                {`
├── `}
                <span className="text-slate-400">.Xauthority</span>
                {`                       `}
                <span className="text-slate-500 italic"></span>
                {`
├── `}
                <span className="text-slate-400">.xsession-errors</span>
                {`                  `}
                <span className="text-slate-500 italic"></span>
                {`
└── `}
                <span className="text-slate-400">.xsession-errors.old</span>
                {`              `}
                <span className="text-slate-500 italic"></span>
              </code>
            </pre>
          </div>
        </div>
        <p className="mt-6">
          O conteúdo dos Scripts de inicialização{" "}
          <span className="text-emerald-400">(iniciar.sh)</span> estão presentes
          na Wiki do Repositório. Clique{" "}
          <a
            className="text-amber-300"
            href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial/wiki/05.-Cria%C3%A7%C3%A3o-de-AutoStart-File"
            target="blank"
            rel="external"
          >
            aqui
          </a>{" "}
          para acessar
        </p>
        {/* Informações Adicionais */}
        <div className="mt-6 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Sobre o Ambiente do Labrador
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Este diretório representa a raiz do utilizador{" "}
            <strong>caninos</strong> no sistema operativo embarcado. O projeto
            de visão computacional fica centralizado em{" "}
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              Desktop/Reconhecimento-Facial
            </code>
            .
          </p>
          <p className="text-slate-400 leading-relaxed">
            Os ficheiros{" "}
            <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded text-sm">
              iniciar.sh
            </code>{" "}
            na raiz garantem que a aplicação e o ambiente virtual (
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              venv
            </code>
            ) sejam executados automaticamente assim que o microcomputador for
            ligado, registando possíveis falhas no{" "}
            <code className="bg-slate-900 text-purple-400 px-1.5 py-0.5 rounded text-sm">
              log_erro.txt
            </code>
            .
          </p>
        </div>

        {/* Explicação Adicional sobre o Treinamento */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Sobre o Treino da IA (Pesos)
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Dentro da pasta{" "}
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              Script
            </code>
            , utilizamos o ficheiro{" "}
            <code className="bg-slate-900 text-orange-300 px-1.5 py-0.5 rounded text-sm">
              encodings.pickle
            </code>
            . Ele guarda os "pesos" da rede neural em vez de reprocessar as
            imagens toda vez que o sistema é iniciado.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Quando o script{" "}
            <code className="bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded text-sm">
              03_reconhecer.py
            </code>{" "}
            lê a pasta{" "}
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              dataset/
            </code>
            , a IA extrai pontos faciais de cada foto e converte isso numa
            matriz matemática guardada no ficheiro <code>.pickle</code>. Todos
            os acessos validados são salvos em{" "}
            <code className="bg-slate-900 text-purple-400 px-1.5 py-0.5 rounded text-sm">
              totem_banco.db
            </code>{" "}
            e as capturas do momento armazenadas em{" "}
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              logs_imagens/
            </code>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Organization;
