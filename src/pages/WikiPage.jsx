import React from "react";
import { Link } from "react-router-dom";
import { FileText, Box, Camera, Cpu, Settings, Wrench } from "lucide-react";
import Diagrama from ".././assets/img/Networkdiagraexample.png";
// ===================== Componente de desenvolvimento =====================
const OverlayDesenvolvimento = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-blue-500/20 rounded-full">
          <Wrench className="h-10 w-10 text-blue-400" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">Em Desenvolvimento</h2>
      <p className="text-slate-400 mb-8 leading-relaxed">
        A Wiki do projeto ainda está sendo construída. Volte em breve para
        conferir os guias de montagem, modelagem 3D e referências teóricas!
      </p>

      <Link
        to="/site-totenzinho"
        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
      >
        Voltar ao Início
      </Link>
    </div>
  </div>
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
              1. Introdução
            </h3>
            <p className="mb-4 leading-relaxed">
              [A motivação deste projeto surge da necessidade de tornar mais
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
              e validar, de forma científica, seu impacto no ambiente clínico.]
            </p>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">
              2. Componentes Utilizados
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
              3. Diagrama do Sistema
            </h3>
            <div className="w-full h-64 bg-slate-900 border border-slate-700 border-dashed rounded-lg flex items-center justify-center text-slate-500 mb-4">
              <img src={Diagrama} alt="" />
            </div>
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

// Componente do Card da Wiki
const WikiCard = ({ icon, title, description }) => (
  <button className="text-left p-6 rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all group">
    <div className="mb-4 p-2 bg-slate-900 inline-block rounded-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </button>
);

export default WikiPage;
