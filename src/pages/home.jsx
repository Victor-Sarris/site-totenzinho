import React from "react";
import { Link } from "react-router-dom";
import { Camera, Cpu, Box, Github, Book, FileText } from "lucide-react";

const TotemLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="fixed w-full top-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScanFace className="text-blue-500 h-8 w-8" />
            <Link
              to="/"
              className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
            >
              Totem<span className="text-blue-500">ID</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <a href="#sobre" className="hover:text-white transition-colors">
              Sobre
            </a>
            <Link
              to="/documentacao"
              className="hover:text-white transition-colors"
            >
              Documentação
            </Link>
            <Link to="/wiki" className="hover:text-white transition-colors">
              Wiki
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Projeto Acadêmico - TCC
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Reconhecimento Facial <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Inteligente e Autônomo
          </span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10">
          Um totem de controle de acesso de baixo custo combinando visão
          computacional avançada, IoT e modelagem 3D personalizada.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/documentacao"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
            <Book className="h-5 w-5" />
            Ler Documentação
          </Link>
          <Link
            to="/wiki"
            className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 font-medium flex items-center gap-2 transition-all"
          >
            <FileText className="h-5 w-5" />
            Acessar Wiki
          </Link>
        </div>
      </section>

      {/* Features / Sobre Section */}
      <section id="sobre" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              O sistema integra hardware embarcado e algoritmos de inteligência
              artificial para realizar a detecção e validação de faces em tempo
              real, garantindo segurança e agilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Camera className="h-8 w-8 text-blue-400" />}
              title="Visão Computacional"
              description="Utilização de bibliotecas como MediaPipe e dlib aliadas a Redes Neurais Convolucionais (CNNs) para detecção facial precisa."
            />
            <FeatureCard
              icon={<Cpu className="h-8 w-8 text-cyan-400" />}
              title="IoT & Hardware"
              description="Processamento na borda e captura de imagem gerenciados por microcontroladores robustos e de baixo custo, como ESP32 e ESP-CAM."
            />
            <FeatureCard
              icon={<Box className="h-8 w-8 text-indigo-400" />}
              title="Design Personalizado"
              description="Case do totem inteiramente modelada em 3D (Blender) e impressa para acomodar os componentes eletrônicos perfeitamente."
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tecnologias" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Stack Tecnológico</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <TechBadge name="React" />
            <TechBadge name="Tailwind CSS" />
            <TechBadge name="Python" />
            <TechBadge name="MediaPipe" />
            <TechBadge name="C / C++" />
            <TechBadge name="Blender" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-900 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
        <p>
          Desenvolvido por <strong>Victor Sarrís</strong>
        </p>
        <p>
          Estudante de Análise e Desenvolvimento de Sistemas (TADS) no IFPI |
          Residente EmbarcaTech
        </p>
        <p className="mt-4">&copy; 2026 Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

// Componentes Auxiliares
const ScanFace = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </svg>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500/50 transition-colors group">
    <div className="mb-4 p-3 rounded-lg bg-slate-900 inline-block group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-slate-100">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const TechBadge = ({ name }) => (
  <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors cursor-default">
    {name}
  </span>
);

export default TotemLandingPage;
