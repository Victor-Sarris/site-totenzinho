import { Link } from "react-router-dom";
import { Camera, Cpu, Box, Book, FileText } from "lucide-react";
import { TbHandFingerDown } from "react-icons/tb";
import {
  FaInstagramSquare,
  FaGithubSquare,
  FaLinkedin,
} from "react-icons/fa";
import ScanFace from "../components/icons/ScanFace";

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

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 px-5 py-3 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
  >
    {icon}
    <span className="font-semibold">{label}</span>
  </a>
);

const Contributor = ({ avatar, role, name, href }) => (
  <div className="flex flex-col items-center">
    <img
      src={avatar}
      alt={name}
      className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-blue-800 object-cover"
    />
    <span className="font-bold text-slate-300 text-lg mt-4">{role}</span>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-slate-400 hover:text-white hover:scale-105 transition-all flex items-center gap-2 mt-2"
    >
      <FaGithubSquare className="w-6 h-6" />
      {name}
    </a>
  </div>
);

const TotemLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          Projeto Acadêmico - TCC
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Reconhecimento Facial <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
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
          <p className="mt-10 text-slate-400">
            Link do repositório geral:{" "}
            <a
              href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial"
              rel="noreferrer"
              target="_blank"
              className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
            >
              face-recognition
            </a>
          </p>
        </div>
      </section>

      {/* Autor e Apoio */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6 text-center">
          <img
            src="https://avatars.githubusercontent.com/u/178488451?v=4"
            alt="Victor Sarrís"
            className="h-40 w-40 md:h-56 md:w-56 rounded-full border-4 border-blue-800 object-cover"
          />
          <h2 className="font-bold text-2xl md:text-3xl text-blue-400">
            Desenvolvedor: <span className="text-blue-200">Victor Sarrís</span>
          </h2>
          <p className="flex items-center justify-center gap-2 font-semibold text-slate-300">
            Fique à vontade para conhecer minhas redes sociais
            <TbHandFingerDown className="h-5 w-5 text-blue-400 animate-bounce" />
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <SocialLink
              href="https://www.instagram.com/victorsax7_/"
              icon={<FaInstagramSquare className="w-6 h-6" />}
              label="Instagram"
            />
            <SocialLink
              href="https://github.com/Victor-Sarris"
              icon={<FaGithubSquare className="w-6 h-6" />}
              label="GitHub"
            />
            <SocialLink
              href="https://www.linkedin.com/in/victorsarris/"
              icon={<FaLinkedin className="w-6 h-6" />}
              label="Linkedin"
            />
          </div>

          <div className="mt-10 pt-10 border-t border-slate-800 w-full flex flex-col items-center">
            <h3 className="font-bold text-xl text-blue-400 mb-8">Apoio de:</h3>
            <div className="flex flex-col md:flex-row gap-10 md:gap-20">
              <Contributor
                avatar="https://avatars.githubusercontent.com/u/9063835?v=4"
                role="Orientador"
                name="Professor Ronaldo"
                href="https://github.com/profRonaldoIFPI"
              />
              <Contributor
                avatar="https://avatars.githubusercontent.com/u/141072429?v=4"
                role="Parceiro de TCC"
                name="Cleber Henrique Lacerda Duarte"
                href="https://github.com/cleberhdev"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-900 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
        <p>
          Desenvolvido por <strong>Victor Sarrís | 🔱🪽</strong>
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

export default TotemLandingPage;
