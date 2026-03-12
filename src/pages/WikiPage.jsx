import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Box,
  Camera,
  Cpu,
  Settings,
  Wrench,
  Layers,
  FileSpreadsheet,
  Book,
} from "lucide-react";
import { FcSportsMode, FcElectronics, FcWorkflow } from "react-icons/fc";
import Diagrama from ".././assets/img/Wiki/Diagrama.png";
import Fluxograma from ".././assets/img/Wiki/Fluxograma.png";
import Arquitetura from ".././assets/img/Wiki/Arquitetura.png";

// ===================== Componente de desenvolvimento =====================

const DiagramTabs = ({ diagramaImg }) => {
  const [abaAtiva, setAbaAtiva] = useState("arquitetura");

  return (
    <div className="w-full mb-6">
      {/* Botões de abas */}
      <div className="flex space-x-2 mb-4 border-b border-slate-700 pb-4">
        <button
          onClick={() => setAbaAtiva("diagrama")}
          className="`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex gap-3 p-9 hover:border-blue-600 ${
            abaAtiva === 'diagrama'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              `}"
        >
          Arquitetura
        </button>
        <button
          onClick={() => setAbaAtiva("fluxograma")}
          className="`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex gap-3 p-9 hover:border-blue-600 ${
            abaAtiva === 'fluxograma'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`"
        >
          Fluxograma
        </button>
        <button
          onClick={() => setAbaAtiva("arquitetura")}
          className="`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex gap-3 p-9 hover:border-blue-600 ${
            abaAtiva === 'arquitetura'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`"
        >
          Arquitetura
        </button>
      </div>
      {/* Área de exibição da imagem */}
      <div className="w-full min-h-75 bg-slate-900 border border-slate-700 border-dashed rounded-xl flex items-center justify-center p-4">
        {abaAtiva === "diagrama" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Diagrama}
              alt="Diagrama do Sistema"
              className="max-h-full h-auto rounded"
            />
            <p className="text-slate-500 mt-4 text-sm font-medium">
              Visão geral da arquitetura de hardware e software.
            </p>
          </div>
        )}

        {abaAtiva === "fluxograma" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Fluxograma}
              alt="Fluxograma do Sistema"
              className="max-w-full h-auto rounded"
            />
            <div className="text-slate-500 text-center py-12">
              <Layers className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Insira a imagem do seu Fluxograma aqui.</p>
            </div>
          </div>
        )}

        {abaAtiva === "arquitetura" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Arquitetura}
              alt="Arquitetura do Sistema"
              className="max-h-full h-auto rounded"
            />
            <p className="text-slate-500 mt-4 text-sm font-medium">
              Visão geral da arquitetura de hardware e software.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente do Card da Wiki
const WikiCard = ({ icon, title, description }) => (
  <button className="text-left p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all group cursor-pointer">
    <div className="mb-4 p-2 bg-slate-900 inline-block rounded-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </button>
);

// ===================== Fim do Componente de desenvolvimento =====================

const WikiPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 lg:p-12 font-sans">
      {/* <OverlayDesenvolvimento /> */}
      <div className="max-w-6xl mx-auto">
        {/* Header da Wiki */}
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Wiki do Projeto
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Guias de montagem, configuração de ambiente, modelagem do case e
            referências teóricas para a construção do Totem de Reconhecimento
            Facial.
          </p>
        </header>
        <h3 className="text-center font-bold text-2xl mb-12">
          Recursos do projeto (Fornecidos pelo Autor).
        </h3>
        {/* Grid de Artigos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card de Hardware */}
          <Link to="/cir" className="block cursor-pointer">
            <WikiCard
              icon={<Cpu className="text-indigo-400 h-6 w-6" />}
              title="Montagem do Circuito"
              description="Esquema elétrico, pinagem do ESP-CAM e integração com o sistema de controle de acesso."
            />
          </Link>

          {/* Card de Modelagem 3D */}
          <Link to="/models" className="block cursor-pointer">
            <WikiCard
              icon={<Box className="text-emerald-400 h-6 w-6" />}
              title="Modelagem e Impressão 3D"
              description="Arquivos do Blender (.blend) e parâmetros fatiador (STL) para a impressão do case."
            />
          </Link>

          {/* Card de IA */}
          <Link to="/org">
            <WikiCard
              icon={<Camera className="text-blue-400 h-6 w-6" />}
              title="Organização de arquivos"
              description="Como ficheiros foram organizados e os pesos da rede neural foram ajustados."
            />
          </Link>
        </div>
        <h3 className="text-center font-bold text-2xl">
          Recursos do SBC LABRADOR (Fornecidos oficialmente pela org Caninos
          Loucos).
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-12">
          <Link
            to="https://canisinc.com.br/lojas/caninosloucos/conteudo/midias/folder-labrador32-v22.pdf"
            rel="external"
            target="blank"
          >
            <WikiCard
              icon={<Book className="text-purple-400 h-6 w-6" />}
              title="Folder de especificação"
              description="Alguns dados e detalhes sobre o SBC Labrador e sua pinagem para projetos complexos"
            />
          </Link>
          <Link
            to="https://caninosloucos.octoserver.com.br/lojas/caninosloucos/conteudo/midias/labrador32-datasheet.pdf"
            rel="external"
            target="blank"
          >
            <WikiCard
              icon={<FileSpreadsheet className="text-purple-400 h-6 w-6" />}
              title="DATASHEAT - Caninos Loucos"
              description="Documento sobre as métricas e questões de Hardware referentes ao SBC Labrador"
            />
          </Link>
          <Link
            to="https://caninosloucos.octoserver.com.br/lojas/caninosloucos/conteudo/midias/labrador-base-mv21-sch.pdf"
            rel="external"
            target="blank"
          >
            <WikiCard
              icon={<Layers className="text-purple-400 h-6 w-6" />}
              title="Schematics - Caninos Loucos"
              description="Documento que apresenta detalhadamente o circuito Elétrico do SBC Labrador"
            />
          </Link>
        </div>

        {/* Área de Leitura de Artigo (Placeholder para o texto do TCC) */}
        <article className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-white h-8 w-8 p-1.5 bg-blue-600 rounded-lg" />
            <h2 className="text-3xl font-bold text-white">
              Artigo em Destaque: Arquitetura Geral
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300">
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">
              <p className="flex gap-3">
                <FcSportsMode className="h-8.5 w-8.5" />
                1. Introdução
              </p>
            </h3>
            <p className="mb-4 leading-relaxed">
              A motivação deste projeto surge da necessidade de tornar mais
              eficiente e seguro o processo de controle de acesso em clínicas de
              saúde. Atualmente, o credenciamento de pacientes é, em muitos
              casos, realizado de forma manual, o que o torna suscetível a
              falhas humanas, filas e retrabalho, além de gerar estresse para
              pacientes e colaboradores.
              <br />
              <br />
              Com o avanço da visão computacional e do reconhecimento facial —
              especialmente por meio de técnicas modernas baseadas em embeddings
              — tornou-se viável implementar sistemas capazes de realizar
              verificações rápidas e precisas. Diante desse cenário, o projeto
              propõe o desenvolvimento e a avaliação de um sistema automatizado
              de check-in baseado em reconhecimento facial, com o objetivo de
              reduzir o tempo de atendimento, aumentar a eficiência operacional
              e validar, de forma científica, seu impacto no ambiente clínico.
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              <p className="flex gap-3">
                <FcElectronics className="h-8.5 w-8.5" />
                2. Compentes Utilizados
              </p>
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                SBC - Labrador (Unidade principal de processamento){" "}
                <a
                  className="to-blue-300"
                  href="https://canisinc.com.br/labrador-32-bits"
                >
                  Link
                </a>
              </li>
              <li>ESPCAM ov2640 (Cam para reconhecimento)</li>
              <li>Painel IPS 7P (Interface interação usuário)</li>
              <li>Case Totem (Modelo 3D)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              <p className="flex gap-3">
                <FcWorkflow className="h-8.5 w-8.5" />
                3. Diagrama de Sistemas
              </p>
            </h3>
            <DiagramTabs diagramaImg={Diagrama} />
            <p className="mb-4 leading-relaxed">
              A arquitetura de hardware do projeto é dividida em estágios de
              captura e processamento. O nó de captura na borda da rede utiliza
              um microcontrolador da família ESP32 (módulo ESP32-CAM), escolhido
              devido à sua conectividade sem fio nativa, baixo consumo
              energético e capacidade de integração com periféricos. O
              microcontrolador é dedicado à captura do fluxo contínuo de vídeo e
              à execução física dos comandos de bloqueio ou liberação de acesso.
              Os dados capturados na borda são transmitidos a um microcomputador
              local (placa Labrador), que atua como a unidade de processamento
              intermediária. Este microcomputador é responsável por orquestrar a
              comunicação de forma segura, recebendo o fluxo de imagem do
              microcontrolador e repassando-o ao servidor central para
              validação,
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default WikiPage;
