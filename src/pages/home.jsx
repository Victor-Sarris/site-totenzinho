import React from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  Cpu,
  Box,
  Book,
  FileText,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { FaInstagramSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Container from "../components/ui/Container";
import ElectricAvatar from "../components/ui/ElectricAvatar";

const FeatureCard = ({ icon, title, description }) => (
  <div className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition-colors hover:border-blue-500/50">
    <div className="mb-4 inline-block rounded-lg bg-slate-900 p-3 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-semibold text-slate-100">{title}</h3>
    <p className="leading-relaxed text-slate-400">{description}</p>
  </div>
);

const TechBadge = ({ name }) => (
  <span className="cursor-default rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-blue-500/40 hover:bg-slate-700">
    {name}
  </span>
);

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-extrabold text-white md:text-3xl">
      {value}
    </div>
    <div className="mt-1 text-xs uppercase tracking-wide text-slate-500 md:text-sm">
      {label}
    </div>
  </div>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:text-white"
  >
    {icon}
    {label}
  </a>
);

const SupportCard = ({ image, name, role, href }) => (
  <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-800/40 p-6 text-center">
    <img
      src={image}
      alt={name}
      className="mb-4 h-28 w-28 rounded-full border-4 border-blue-800/70 object-cover md:h-32 md:w-32"
    />
    <span className="text-xs font-semibold uppercase tracking-wide text-blue-400">
      {role}
    </span>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-2 flex items-center gap-2 font-medium text-slate-300 transition-colors hover:text-white"
    >
      <FaGithubSquare className="h-5 w-5" />
      {name}
    </a>
  </div>
);

const TotemLandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-50 selection:bg-blue-500 selection:text-white">
      {/* Hero Section */}
      <section className="bg-grid relative overflow-hidden px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"
          aria-hidden="true"
        />
        <Container className="relative flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
            Projeto Acadêmico · TCC
          </div>
          <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Reconhecimento Facial
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-3xl text-transparent md:text-5xl lg:text-6xl">
              Inteligente e Autônomo
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Um totem de controle de acesso de baixo custo combinando visão
            computacional avançada, IoT e modelagem 3D personalizada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/documentacao"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-700"
            >
              <Book className="h-5 w-5" />
              Ler Documentação
            </Link>
            <Link
              to="/wiki"
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-medium transition-all hover:bg-slate-700"
            >
              <FileText className="h-5 w-5" />
              Acessar Wiki
            </Link>
            <Link
              to="/resultados"
              className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-6 py-3 font-medium text-amber-300 transition-all hover:bg-amber-500/20"
            >
              <GraduationCap className="h-5 w-5" />
              Resultados do TCC
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-slate-800 pt-10 sm:gap-16">
            <StatItem value="3" label="Módulos Integrados" />
            <StatItem value="SBC LABRADOR" label="Edge Device" />
            <StatItem value="100%" label="Código Aberto" />
          </div>
        </Container>
      </section>

      {/* Features / Sobre Section */}
      <section
        id="sobre"
        className="border-y border-slate-800/80 bg-slate-800/30 py-20"
      >
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Como Funciona</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              O sistema integra hardware embarcado e algoritmos de inteligência
              artificial para realizar a detecção e validação de faces em tempo
              real, garantindo segurança e agilidade.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
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
        </Container>
      </section>

      {/* Tech Stack Section */}
      <section id="tecnologias" className="py-20">
        <Container className="text-center">
          <h2 className="mb-10 text-3xl font-bold">Stack Tecnológico</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TechBadge name="React" />
            <TechBadge name="Tailwind CSS" />
            <TechBadge name="Python" />
            <TechBadge name="MediaPipe" />
            <TechBadge name="C / C++" />
            <TechBadge name="Blender" />
          </div>
          <p className="mt-8 text-slate-400">
            Repositório completo do projeto:{" "}
            <a
              href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-400 transition-colors hover:text-blue-300"
            >
              face-recognition
              <ArrowRight className="h-4 w-4" />
            </a>
          </p>
        </Container>
      </section>

      {/* Equipe / Créditos */}
      <section className="border-t border-slate-800/80 bg-slate-800/20 py-20">
        <Container className="flex flex-col items-center">
          <div className="electric-border relative flex w-full max-w-xl flex-col items-center rounded-3xl border border-slate-800/70 bg-slate-900/40 px-6 py-12 md:px-12">
            <ElectricAvatar
              src="https://avatars.githubusercontent.com/u/178488451?v=4"
              alt="Victor Sarrís"
              imgClassName="h-40 w-40 rounded-full border-4 border-blue-700 object-cover md:h-48 md:w-48"
            />
            <h2 className="mt-6 text-center text-2xl font-bold text-blue-400 md:text-3xl">
              Desenvolvedor: <span className="text-blue-200">Victor Sarrís</span>
            </h2>
            <p className="mt-3 text-center text-sm text-slate-400 md:text-base">
              Fique à vontade para conhecer minhas redes sociais
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <SocialLink
                href="https://www.instagram.com/victorsax7_/"
                icon={<FaInstagramSquare className="h-5 w-5" />}
                label="Instagram"
              />
              <SocialLink
                href="https://github.com/Victor-Sarris"
                icon={<FaGithubSquare className="h-5 w-5" />}
                label="GitHub"
              />
              <SocialLink
                href="https://www.linkedin.com/in/victorsarris/"
                icon={<FaLinkedin className="h-5 w-5" />}
                label="LinkedIn"
              />
            </div>
          </div>

          <div className="mt-16 w-full max-w-3xl border-t border-slate-800 pt-10 text-center">
            <h3 className="mb-8 text-xl font-bold text-blue-400">Apoio de</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <SupportCard
                image="https://avatars.githubusercontent.com/u/9063835?v=4"
                name="Professor Ronaldo"
                role="Orientador"
                href="https://github.com/profRonaldoIFPI"
              />
              <SupportCard
                image="https://avatars.githubusercontent.com/u/141072429?v=4"
                name="Cleber Henrique Lacerda Duarte"
                role="Parceiro de TCC"
                href="https://github.com/cleberhdev"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-10 text-center text-sm text-slate-500">
        <Container className="flex flex-col items-center gap-2">
          <p>
            Desenvolvido por{" "}
            <strong className="text-slate-300">Victor Sarrís</strong> | 🔱🪽
          </p>
          <p>
            Estudante de Análise e Desenvolvimento de Sistemas (TADS) no IFPI ·
            Residente EmbarcaTech
          </p>
          <p className="mt-4">&copy; 2026 Todos os direitos reservados.</p>
        </Container>
      </footer>
    </div>
  );
};

export default TotemLandingPage;
