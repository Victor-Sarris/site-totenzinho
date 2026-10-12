import React, { useState } from "react";
import { Presentation, ExternalLink, FileText } from "lucide-react";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

// Lista de apresentações do Canva incorporadas nesta página.
const apresentacoes = [
  {
    id: "tcc-apresentacao",
    titulo: "Apresentação de TCC — Victor Sarrís",
    descricao:
      "Slides utilizados na defesa do artigo científico do TotemID perante a banca examinadora do IFPI Campus Floriano.",
    autor: "Victor Sarrís",
    embedUrl:
      "https://www.canva.com/design/DAHOPQda9BA/X18QcZVHQAkA9mV74DOL0Q/view?embed",
    linkOriginal:
      "https://www.canva.com/design/DAHOPQda9BA/X18QcZVHQAkA9mV74DOL0Q/view",
  },
  {
    id: "vncserver",
    titulo: "VNCserver — Documentação",
    descricao:
      "Guia visual sobre a configuração e utilização do VNC Server para acesso remoto ao ambiente gráfico do SBC Labrador.",
    autor: "Victor Sarrís",
    embedUrl:
      "https://www.canva.com/design/DAG8FrUv_xs/rx0boun9DmQYUznszJue0g/view?embed",
    linkOriginal:
      "https://www.canva.com/design/DAG8FrUv_xs/rx0boun9DmQYUznszJue0g/view",
  },
  {
    id: "labrador-putty",
    titulo: "Documentação — Labrador & PuTTY",
    descricao:
      "Passo a passo ilustrado para conexão serial ao SBC Labrador utilizando o PuTTY, cobrindo desde a instalação até o primeiro login.",
    autor: "Victor Sarrís",
    embedUrl:
      "https://www.canva.com/design/DAG7-wxT8KA/IVep47_kZT76mv_aYd06gA/view?embed",
    linkOriginal:
      "https://www.canva.com/design/DAG7-wxT8KA/IVep47_kZT76mv_aYd06gA/view",
  },
  {
    id: "metricas-labrador-3d",
    titulo: "Métricas Labrador 32 Bits — Modelo 3D",
    descricao:
      "Apresentação com as métricas e especificações do SBC Labrador de 32 bits, acompanhada de um modelo 3D interativo da placa.",
    autor: "Victor Sarrís",
    embedUrl:
      "https://www.canva.com/design/DAG-9p8F-bw/fxdH0YunhoFWEu46AAiPVw/view?embed",
    linkOriginal:
      "https://www.canva.com/design/DAG-9p8F-bw/fxdH0YunhoFWEu46AAiPVw/view",
  },
];

const Canvas = () => {
  const [ativa, setAtiva] = useState(apresentacoes[0].id);

  const apresentacaoAtual =
    apresentacoes.find((a) => a.id === ativa) || apresentacoes[0];

  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="xl">
        <PageHeader
          icon={Presentation}
          backTo="/wiki"
          backLabel="Voltar para a Wiki"
          title="Apresentações & Slides"
          description="Apresentações interativas hospedadas no Canva, com materiais de apoio sobre o TCC, configuração do SBC Labrador, acesso remoto via VNC/PuTTY e especificações de hardware."
        />

        {/* Abas de seleção */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-700 pb-4 md:gap-3">
          {apresentacoes.map((item) => (
            <button
              key={item.id}
              onClick={() => setAtiva(item.id)}
              className={`flex-1 cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-semibold transition-all duration-200 hover:border-blue-600 md:flex-none md:text-base ${
                ativa === item.id
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {item.titulo}
            </button>
          ))}
        </div>

        {/* Card principal */}
        <div
          key={apresentacaoAtual.id}
          className="animate-fade-in flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 shadow-xl"
        >
          <div className="relative w-full overflow-hidden bg-slate-950 pt-[56.25%]">
            <iframe
              key={apresentacaoAtual.id}
              title={`Slides - ${apresentacaoAtual.titulo}`}
              loading="lazy"
              className="absolute top-0 left-0 h-full w-full border-0"
              src={apresentacaoAtual.embedUrl}
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 shrink-0 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                {apresentacaoAtual.titulo}
              </h2>
            </div>

            <p className="mb-6 flex-1 leading-relaxed text-slate-400">
              {apresentacaoAtual.descricao}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 pt-4">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Autor:{" "}
                <span className="font-semibold text-slate-300">
                  {apresentacaoAtual.autor}
                </span>
              </span>

              <a
                href={apresentacaoAtual.linkOriginal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                <ExternalLink className="h-4 w-4" />
                Abrir no Canva
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Canvas;
