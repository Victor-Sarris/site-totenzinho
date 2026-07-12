import React from "react";
import { FolderTree } from "lucide-react";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

const InfoCard = ({ title, children }) => (
  <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6 md:p-8">
    <h2 className="mb-4 text-xl font-bold text-white md:text-2xl">{title}</h2>
    {children}
  </div>
);

const Organization = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="lg">
        <PageHeader
          icon={FolderTree}
          backTo="/wiki"
          backLabel="Voltar para a Wiki"
          title="Organização de Arquivos"
          description={
            'Estrutura de diretórios do ambiente no SBC Labrador. Abaixo está o mapeamento da pasta pessoal do utilizador "caninos" com foco no projeto de Reconhecimento Facial.'
          }
        />

        {/* Bloco de Código Estilo Terminal */}
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#0d1117] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 font-mono text-xs text-slate-400">
              home-caninos.txt
            </span>
          </div>

          <div className="custom-scrollbar overflow-x-auto p-6">
            <pre className="whitespace-pre font-mono text-sm leading-relaxed">
              <code className="text-slate-300">
                {`/home/caninos/
├── `}
                <span className="font-bold text-blue-400">.config/</span>
                {`                        `}
                <span className="text-slate-500 italic">
                  # Configurações ocultas do utilizador
                </span>
                {`
│   └── `}
                <span className="font-bold text-blue-400">autostart/</span>
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
                <span className="font-bold text-blue-400">Desktop/</span>
                {`                        `}
                <span className="text-slate-500 italic">
                  # Área de trabalho gráfica do Labrador
                </span>
                {`
│   └── `}
                <span className="font-bold text-blue-400">
                  Reconhecimento-Facial/
                </span>
                {`
│       ├── `}
                <span className="font-bold text-blue-400">Script/</span>
                {`
│       │   ├── `}
                <span className="font-bold text-blue-400">dataset/</span>
                {`              `}
                <span className="text-slate-500 italic">
                  # Fotografias base para treino da IA (não incluída no
                  repositório)
                </span>
                {`
│       │   ├── `}
                <span className="font-bold text-blue-400">espcam/</span>
                {`               `}
                <span className="text-slate-500 italic">
                  # Utilitários/comunicação com a câmara ESP
                </span>
                {`
│       │   ├── `}
                <span className="font-bold text-blue-400">logs_imagens/</span>
                {`         `}
                <span className="text-slate-500 italic">
                  # Capturas de imagem no momento dos acessos
                </span>
                {`
│       │   ├── `}
                <span className="font-bold text-blue-400">venv/</span>
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
                {`
│       ├── `}
                <span className="text-slate-400">LICENSE</span>
                {`
│       ├── `}
                <span className="text-slate-400">README.md</span>
                {`
│       └── `}
                <span className="text-slate-400">requirements.txt</span>
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
                {`
├── `}
                <span className="text-slate-400">
                  .sudo_as_admin_successful
                </span>
                {`
├── `}
                <span className="text-slate-400">.Xauthority</span>
                {`
├── `}
                <span className="text-slate-400">.xsession-errors</span>
                {`
└── `}
                <span className="text-slate-400">.xsession-errors.old</span>
              </code>
            </pre>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-slate-300">
          O conteúdo dos Scripts de inicialização{" "}
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-emerald-400">
            (iniciar.sh)
          </span>{" "}
          está presente na Wiki do Repositório. Clique{" "}
          <a
            className="text-amber-300 underline hover:text-amber-200"
            href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial/wiki/05.-Cria%C3%A7%C3%A3o-de-AutoStart-File"
            target="_blank"
            rel="noreferrer"
          >
            aqui
          </a>{" "}
          para acessar.
        </p>

        <InfoCard title="Sobre o Ambiente do Labrador">
          <p className="mb-4 leading-relaxed text-slate-400">
            Este diretório representa a raiz do utilizador{" "}
            <strong className="text-slate-200">caninos</strong> no sistema
            operativo embarcado. O projeto de visão computacional fica
            centralizado em{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              Desktop/Reconhecimento-Facial
            </code>
            .
          </p>
          <p className="leading-relaxed text-slate-400">
            Os ficheiros{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-emerald-400">
              iniciar.sh
            </code>{" "}
            na raiz garantem que a aplicação e o ambiente virtual (
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              venv
            </code>
            ) sejam executados automaticamente assim que o microcomputador
            for ligado, registando possíveis falhas no{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-purple-400">
              log_erro.txt
            </code>
            .
          </p>
        </InfoCard>

        <InfoCard title="Sobre o Treino da IA (Pesos)">
          <p className="mb-4 leading-relaxed text-slate-400">
            Dentro da pasta{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              Script
            </code>
            , utilizamos o ficheiro{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-orange-300">
              encodings.pickle
            </code>
            . Ele guarda os "pesos" da rede neural em vez de reprocessar as
            imagens toda vez que o sistema é iniciado.
          </p>
          <p className="leading-relaxed text-slate-400">
            Quando o script{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-emerald-400">
              03_reconhecer.py
            </code>{" "}
            lê a pasta{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              dataset/
            </code>
            , a IA extrai pontos faciais de cada foto e converte isso numa
            matriz matemática guardada no ficheiro .pickle. Todos os acessos
            validados são salvos em{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-purple-400">
              totem_banco.db
            </code>{" "}
            e as capturas do momento armazenadas em{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              logs_imagens/
            </code>
            .
          </p>
        </InfoCard>
      </Container>
    </div>
  );
};

export default Organization;
