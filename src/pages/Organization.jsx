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
            Estrutura de diretórios do TotemID. O projeto é dividido de forma
            modular, separando a Inteligência Artificial, o código do
            microcontrolador e a interface web.
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
              estrutura-totem.txt
            </span>
          </div>

          {/* Conteúdo da Árvore */}
          <div className="p-6 overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed">
              <code className="text-slate-300">
                {`TotemID/
├── `}
                <span className="text-blue-400 font-bold">totem-backend/</span>
                {`           `}
                <span className="text-slate-500 italic">
                  # Inteligência Artificial e API Flask
                </span>
                {`
│   ├── `}
                <span className="text-blue-400">dataset/</span>
                {`             `}
                <span className="text-slate-500 italic">
                  # Fotos originais para treinamento da rede neural
                </span>
                {`
│   │   ├── victor/          `}
                <span className="text-slate-500 italic">
                  # Ex: Pasta com 5 a 10 fotos do rosto do Victor
                </span>
                {`
│   │   └── ...
│   ├── `}
                <span className="text-blue-400">logs_imagens/</span>
                {`        `}
                <span className="text-slate-500 italic">
                  # Fotos capturadas no momento dos acessos
                </span>
                {`
│   ├── `}
                <span className="text-orange-300">encodings.pickle</span>
                {`     `}
                <span className="text-slate-500 italic">
                  # Pesos e vetores faciais (Modelo treinado)
                </span>
                {`
│   ├── `}
                <span className="text-emerald-400">recognition.py</span>
                {`       `}
                <span className="text-slate-500 italic">
                  # Script principal de visão computacional (OpenCV/dlib)
                </span>
                {`
│   └── `}
                <span className="text-purple-400">totem_banco.db</span>
                {`       `}
                <span className="text-slate-500 italic">
                  # Banco de dados SQLite (Usuários e logs de acesso)
                </span>
                {`
│
├── `}
                <span className="text-blue-400 font-bold">totem-firmware/</span>
                {`          `}
                <span className="text-slate-500 italic">
                  # Código do Microcontrolador (C/C++)
                </span>
                {`
│   └── `}
                <span className="text-emerald-400">main.cpp</span>
                {`             `}
                <span className="text-slate-500 italic">
                  # Servidor de streaming de vídeo (ESP32-CAM)
                </span>
                {`
│
└── `}
                <span className="text-blue-400 font-bold">totem-frontend/</span>
                {`          `}
                <span className="text-slate-500 italic">
                  # Interface Web (React + Tailwind)
                </span>
                {`
    ├── `}
                <span className="text-blue-400">public/</span>
                {`
    │   └── `}
                <span className="text-blue-400">modelos/</span>
                {`         `}
                <span className="text-slate-500 italic">
                  # Arquivos 3D da case para o visualizador (.glb)
                </span>
                {`
    ├── `}
                <span className="text-blue-400">src/</span>
                {`
    │   ├── `}
                <span className="text-blue-400">assets/</span>
                {`          `}
                <span className="text-slate-500 italic">
                  # Imagens e ícones estáticos
                </span>
                {`
    │   ├── `}
                <span className="text-blue-400">components/</span>
                {`      `}
                <span className="text-slate-500 italic">
                  # Componentes reutilizáveis (ex: Navbar.jsx)
                </span>
                {`
    │   ├── `}
                <span className="text-blue-400">pages/</span>
                {`           `}
                <span className="text-slate-500 italic">
                  # Páginas principais do site
                </span>
                {`
    │   │   ├── WikiPage.jsx
    │   │   ├── DocsPage.jsx
    │   │   ├── Models3d.jsx
    │   │   └── OrganizacaoArquivos.jsx
    │   ├── `}
                <span className="text-emerald-400">App.jsx</span>
                {`          `}
                <span className="text-slate-500 italic">
                  # Configuração das rotas (React Router)
                </span>
                {`
    │   └── `}
                <span className="text-emerald-400">main.jsx</span>
                {`         `}
                <span className="text-slate-500 italic">
                  # Ponto de entrada do React
                </span>
                {`
    ├── `}
                <span className="text-yellow-200">package.json</span>
                {`         `}
                <span className="text-slate-500 italic">
                  # Dependências do frontend e scripts
                </span>
                {`
    └── `}
                <span className="text-yellow-200">tailwind.config.js</span>
                {`   `}
                <span className="text-slate-500 italic">
                  # Configuração de estilos do Tailwind CSS
                </span>
                `
              </code>
            </pre>
          </div>
        </div>

        {/* Explicação Adicional sobre o Treinamento */}
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Sobre o Treinamento da IA (Pesos)
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Em vez de reprocessar as imagens toda a vez que o sistema é
            iniciado, utilizamos o ficheiro{" "}
            <code className="bg-slate-900 text-orange-300 px-1.5 py-0.5 rounded text-sm">
              encodings.pickle
            </code>
            . Ele guarda os "pesos" da rede neural.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Quando o script Python lê a pasta{" "}
            <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
              dataset/
            </code>
            , a IA extrai 128 pontos faciais de cada foto e converte isso numa
            matriz matemática. Esta matriz é serializada e guardada no ficheiro
            `.pickle`, garantindo que o reconhecimento facial funcione de forma
            ultra-rápida (em tempo real) ao comparar o rosto da câmara com os
            pesos armazenados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Organization;
