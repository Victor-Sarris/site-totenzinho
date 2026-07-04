import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Box,
  Camera,
  Cpu,
  Layers,
  FileSpreadsheet,
  Book,
} from "lucide-react";
import { FcSportsMode, FcElectronics, FcWorkflow } from "react-icons/fc";
import PageHeader from "../components/PageHeader";
import Diagrama from ".././assets/img/Wiki/Diagrama.png";
import Fluxograma from ".././assets/img/Wiki/Fluxograma.png";
import Arquitetura from ".././assets/img/Wiki/Arquitetura.png";

// ===================== Componente de desenvolvimento =====================

const DiagramTabs = () => {
  const [abaAtiva, setAbaAtiva] = useState("arquitetura");

  return (
    <div className="w-full mb-6">
      {/* Botões de abas corrigidos: flex-wrap para celular e sintaxe do Tailwind arrumada */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 border-b border-slate-700 pb-4">
        <button
          onClick={() => setAbaAtiva("diagrama")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex-1 md:flex-none justify-center text-center text-sm md:text-base border hover:border-blue-600 ${
            abaAtiva === "diagrama"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 border-blue-600"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border-slate-700"
          }`}
        >
          Diagrama
        </button>
        <button
          onClick={() => setAbaAtiva("fluxograma")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex-1 md:flex-none justify-center text-center text-sm md:text-base border hover:border-blue-600 ${
            abaAtiva === "fluxograma"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 border-blue-600"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border-slate-700"
          }`}
        >
          Fluxograma
        </button>
        <button
          onClick={() => setAbaAtiva("arquitetura")}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer flex-1 md:flex-none justify-center text-center text-sm md:text-base border hover:border-blue-600 ${
            abaAtiva === "arquitetura"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 border-blue-600"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border-slate-700"
          }`}
        >
          Arquitetura
        </button>
      </div>

      {/* Área de exibição da imagem corrigida: max-w-full garante que a imagem não vaze a tela */}
      <div className="w-full min-h-[200px] md:min-h-[300px] bg-slate-900 border border-slate-700 border-dashed rounded-xl flex items-center justify-center p-2 md:p-4 overflow-hidden">
        {abaAtiva === "diagrama" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Diagrama}
              alt="Diagrama do Sistema"
              className="max-w-full h-auto rounded object-contain"
            />
          </div>
        )}

        {abaAtiva === "fluxograma" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Fluxograma}
              alt="Fluxograma do Sistema"
              className="max-w-full h-auto rounded object-contain"
            />
          </div>
        )}

        {abaAtiva === "arquitetura" && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <img
              src={Arquitetura}
              alt="Arquitetura do Sistema"
              className="max-w-full h-auto rounded object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente do Card da Wiki
const WikiCard = ({ icon, title, description }) => (
  <button className="text-left p-6 w-full rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all group cursor-pointer">
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
    <div className="min-h-screen bg-slate-900 text-slate-300 p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          icon={Book}
          title="Wiki do Projeto"
          description="Guias de montagem, configuração de ambiente, modelagem do case e referências teóricas para a construção do Totem de Reconhecimento Facial."
        />

        <h3 className="text-center font-bold text-xl md:text-2xl mb-8">
          Recursos do projeto (Fornecidos pelo Autor).
        </h3>
        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
          <Link to="/org" className="block cursor-pointer">
            <WikiCard
              icon={<Camera className="text-blue-400 h-6 w-6" />}
              title="Organização de arquivos"
              description="Como ficheiros foram organizados e os pesos da rede neural foram ajustados."
            />
          </Link>
        </div>

        <h3 className="text-center font-bold text-xl md:text-2xl mb-8">
          Recursos do SBC LABRADOR (Fornecidos oficialmente).
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            to="https://canisinc.com.br/lojas/caninosloucos/conteudo/midias/folder-labrador32-v22.pdf"
            rel="external"
            target="_blank"
            className="block cursor-pointer"
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
            target="_blank"
            className="block cursor-pointer"
          >
            <WikiCard
              icon={<FileSpreadsheet className="text-purple-400 h-6 w-6" />}
              title="DATASHEET - Caninos Loucos"
              description="Documento sobre as métricas e questões de Hardware referentes ao SBC Labrador"
            />
          </Link>
          <Link
            to="https://caninosloucos.octoserver.com.br/lojas/caninosloucos/conteudo/midias/labrador-base-mv21-sch.pdf"
            rel="external"
            target="_blank"
            className="block cursor-pointer"
          >
            <WikiCard
              icon={<Layers className="text-purple-400 h-6 w-6" />}
              title="Schematics - Caninos Loucos"
              description="Documento que apresenta detalhadamente o circuito Elétrico do SBC Labrador"
            />
          </Link>
        </div>

        {/* Área de Leitura de Artigo: padding ajustado para mobile */}
        <article className="bg-slate-800/50 rounded-2xl p-5 md:p-8 border border-slate-700 break-words">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-white h-8 w-8 p-1.5 bg-blue-600 rounded-lg shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Artigo em Destaque: Arquitetura Geral
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300">
            <h3 className="text-xl font-semibold text-white mt-6 mb-3 flex items-center gap-3">
              <FcSportsMode className="h-8 w-8 shrink-0" />
              <span>1. Introdução</span>
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

            <h3 className="text-xl font-semibold text-white mt-8 mb-3 flex items-center gap-3">
              <FcElectronics className="h-8 w-8 shrink-0" />
              <span>2. Componentes Utilizados</span>
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                SBC - Labrador (Unidade principal de processamento){" "}
                <a
                  className="text-blue-400 hover:text-blue-300 underline"
                  href="https://canisinc.com.br/labrador-32-bits"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>
                ESPCAM ov2640 (Cam para reconhecimento){" "}
                <a
                  className="text-blue-400 hover:text-blue-300 underline"
                  href="https://shopee.com.br/M%C3%B3dulo-ESP32-CAM-Wifi-Bluetooth-C%C3%A2mera-OV2640-M%C3%B3dulo-ESP32-CAM-MB-i.992479881.23295612783?extraParams=%7B%22display_model_id%22%3A219568906002%2C%22model_selection_logic%22%3A3%7D&sp_atk=abe8daea-adc3-4d24-85c8-48029ca27503&xptdk=abe8daea-adc3-4d24-85c8-48029ca27503"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>
                Painel IPS 7P (Interface interação usuário){" "}
                <a
                  className="text-blue-400 hover:text-blue-300 underline"
                  href="https://shopee.com.br/Tela-Sens%C3%ADvel-Ao-Toque-7-Polegadas-IPS-Para-Raspberry-Pi-4-1024X600-Monitor-LCD-Capacitivo-Port%C3%A1til-3-B--i.860393632.18369999813
              "
                  target="_blank"
                  rel="noreferrer"
                >
                  Link
                </a>
              </li>
              <li>Case Totem (Modelo 3D)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3 flex items-center gap-3">
              <FcWorkflow className="h-8 w-8 shrink-0" />
              <span>3. Diagrama de Sistemas</span>
            </h3>

            <DiagramTabs />

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
