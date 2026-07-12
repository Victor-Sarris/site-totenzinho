import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Box,
  Camera,
  Cpu,
  Book,
  FileSpreadsheet,
  Layers,
  GraduationCap,
} from "lucide-react";
import { FcSportsMode, FcElectronics, FcWorkflow } from "react-icons/fc";
import Container from "../components/ui/Container";
import Diagrama from "../assets/img/Wiki/Diagrama.png";
import Fluxograma from "../assets/img/Wiki/Fluxograma.png";
import Arquitetura from "../assets/img/Wiki/Arquitetura.png";

const DiagramTabs = () => {
  const [abaAtiva, setAbaAtiva] = useState("arquitetura");

  const tabs = [
    { id: "diagrama", label: "Diagrama", img: Diagrama, alt: "Diagrama do Sistema" },
    { id: "fluxograma", label: "Fluxograma", img: Fluxograma, alt: "Fluxograma do Sistema" },
    { id: "arquitetura", label: "Arquitetura", img: Arquitetura, alt: "Arquitetura do Sistema" },
  ];

  const ativa = tabs.find((t) => t.id === abaAtiva);

  return (
    <div className="not-prose mb-6 w-full">
      <div className="mb-4 flex flex-wrap gap-2 border-b border-slate-700 pb-4 md:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAbaAtiva(tab.id)}
            className={`flex-1 cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-semibold transition-all duration-200 hover:border-blue-600 md:flex-none md:text-base ${
              abaAtiva === tab.id
                ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex min-h-[200px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-700 bg-slate-900 p-2 md:min-h-[300px] md:p-4">
        <div key={ativa.id} className="animate-fade-in flex w-full flex-col items-center">
          <img
            src={ativa.img}
            alt={ativa.alt}
            className="h-auto max-w-full rounded object-contain"
          />
        </div>
      </div>
    </div>
  );
};

const WikiCard = ({ icon, title, description }) => (
  <div className="group h-full w-full rounded-xl border border-slate-700 bg-slate-800 p-6 text-left transition-all hover:border-blue-500 hover:bg-slate-800/80">
    <div className="mb-4 inline-block rounded-lg bg-slate-900 p-2 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

const WikiPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="xl">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Wiki do Projeto
          </h1>
          <p className="max-w-2xl text-base text-slate-400 md:text-lg">
            Guias de montagem, configuração de ambiente, modelagem do case e
            referências teóricas para a construção do Totem de
            Reconhecimento Facial.
          </p>
        </header>

        <h2 className="mb-8 text-center text-xl font-bold md:text-2xl">
          Recursos do projeto (fornecidos pelo autor)
        </h2>
        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/cir" className="block">
            <WikiCard
              icon={<Cpu className="h-6 w-6 text-indigo-400" />}
              title="Montagem do Circuito"
              description="Esquema elétrico, pinagem do ESP-CAM e integração com o sistema de controle de acesso."
            />
          </Link>
          <Link to="/models" className="block">
            <WikiCard
              icon={<Box className="h-6 w-6 text-emerald-400" />}
              title="Modelagem e Impressão 3D"
              description="Arquivos do Blender (.blend) e parâmetros de fatiador (STL) para a impressão do case."
            />
          </Link>
          <Link to="/org" className="block">
            <WikiCard
              icon={<Camera className="h-6 w-6 text-blue-400" />}
              title="Organização de Arquivos"
              description="Como os arquivos foram organizados e os pesos da rede neural foram ajustados."
            />
          </Link>
          <Link to="/resultados" className="block">
            <WikiCard
              icon={<GraduationCap className="h-6 w-6 text-amber-400" />}
              title="Resultados do TCC"
              description="Métricas de desempenho, comparação com o processo manual e fotos da defesa do artigo científico."
            />
          </Link>
        </div>

        <h2 className="mb-8 text-center text-xl font-bold md:text-2xl">
          Recursos do SBC Labrador (fornecidos oficialmente)
        </h2>
        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://canisinc.com.br/lojas/caninosloucos/conteudo/midias/folder-labrador32-v22.pdf"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <WikiCard
              icon={<Book className="h-6 w-6 text-purple-400" />}
              title="Folder de Especificação"
              description="Alguns dados e detalhes sobre o SBC Labrador e sua pinagem para projetos complexos."
            />
          </a>
          <a
            href="https://caninosloucos.octoserver.com.br/lojas/caninosloucos/conteudo/midias/labrador32-datasheet.pdf"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <WikiCard
              icon={<FileSpreadsheet className="h-6 w-6 text-purple-400" />}
              title="Datasheet — Caninos Loucos"
              description="Documento sobre as métricas e questões de hardware referentes ao SBC Labrador."
            />
          </a>
          <a
            href="https://caninosloucos.octoserver.com.br/lojas/caninosloucos/conteudo/midias/labrador-base-mv21-sch.pdf"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <WikiCard
              icon={<Layers className="h-6 w-6 text-purple-400" />}
              title="Schematics — Caninos Loucos"
              description="Documento que apresenta detalhadamente o circuito elétrico do SBC Labrador."
            />
          </a>
        </div>

        <article className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-8 w-8 shrink-0 rounded-lg bg-blue-600 p-1.5 text-white" />
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Artigo em Destaque: Arquitetura Geral
            </h2>
          </div>

          <div className="max-w-none text-slate-300">
            <h3 className="mb-3 mt-6 flex items-center gap-3 text-xl font-semibold text-white">
              <FcSportsMode className="h-8 w-8 shrink-0" />
              <span>1. Introdução</span>
            </h3>
            <p className="mb-4 leading-relaxed">
              A motivação deste projeto surge da necessidade de tornar mais
              eficiente e seguro o processo de controle de acesso em
              clínicas de saúde. Atualmente, o credenciamento de pacientes
              é, em muitos casos, realizado de forma manual, o que o torna
              suscetível a falhas humanas, filas e retrabalho, além de gerar
              estresse para pacientes e colaboradores.
            </p>
            <p className="mb-4 leading-relaxed">
              Com o avanço da visão computacional e do reconhecimento
              facial — especialmente por meio de técnicas modernas baseadas
              em embeddings — tornou-se viável implementar sistemas capazes
              de realizar verificações rápidas e precisas. Diante desse
              cenário, o projeto propõe o desenvolvimento e a avaliação de
              um sistema automatizado de check-in baseado em reconhecimento
              facial, com o objetivo de reduzir o tempo de atendimento,
              aumentar a eficiência operacional e validar, de forma
              científica, seu impacto no ambiente clínico.
            </p>

            <h3 className="mb-3 mt-8 flex items-center gap-3 text-xl font-semibold text-white">
              <FcElectronics className="h-8 w-8 shrink-0" />
              <span>2. Componentes Utilizados</span>
            </h3>
            <ul className="mb-4 list-disc space-y-2 pl-5">
              <li>
                SBC — Labrador (Unidade principal de processamento){" "}
                <a
                  className="text-blue-400 underline hover:text-blue-300"
                  href="https://canisinc.com.br/labrador-32-bits"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>
                ESP32-CAM OV2640 (Câmera para reconhecimento){" "}
                <a
                  className="text-blue-400 underline hover:text-blue-300"
                  href="https://shopee.com.br/M%C3%B3dulo-ESP32-CAM-Wifi-Bluetooth-C%C3%A2mera-OV2640-M%C3%B3dulo-ESP32-CAM-MB-i.992479881.23295612783"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>
                Painel IPS 7" (Interface de interação do usuário){" "}
                <a
                  className="text-blue-400 underline hover:text-blue-300"
                  href="https://shopee.com.br/Tela-Sens%C3%ADvel-Ao-Toque-7-Polegadas-IPS-Para-Raspberry-Pi-4-1024X600-Monitor-LCD-Capacitivo-Port%C3%A1til-3-B--i.860393632.18369999813"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>Case Totem (Modelo 3D)</li>
            </ul>

            <h3 className="mb-3 mt-8 flex items-center gap-3 text-xl font-semibold text-white">
              <FcWorkflow className="h-8 w-8 shrink-0" />
              <span>3. Diagrama de Sistemas</span>
            </h3>

            <DiagramTabs />

            <p className="mb-4 leading-relaxed">
              A arquitetura de hardware do projeto é dividida em estágios de
              captura e processamento. O nó de captura na borda da rede
              utiliza um microcontrolador da família ESP32 (módulo
              ESP32-CAM), escolhido devido à sua conectividade sem fio
              nativa, baixo consumo energético e capacidade de integração
              com periféricos. O microcontrolador é dedicado à captura do
              fluxo contínuo de vídeo e à execução física dos comandos de
              bloqueio ou liberação de acesso. Os dados capturados na borda
              são transmitidos a um microcomputador local (placa Labrador),
              que atua como a unidade de processamento intermediária. Este
              microcomputador é responsável por orquestrar a comunicação de
              forma segura, recebendo o fluxo de imagem do microcontrolador
              e repassando-o ao servidor central para validação.
            </p>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default WikiPage;
