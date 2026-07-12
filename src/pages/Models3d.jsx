import React from "react";
import { Box, ExternalLink } from "lucide-react";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";

const projetos3D = [
  {
    id: "totem",
    titulo: "Case TotemID",
    descricao:
      "Estrutura principal desenhada no Blender para acomodar o ESP32-CAM e os componentes de controle de acesso do totem.",
    embedUrl:
      "https://sketchfab.com/models/677ecfa4591f4de1a47767c8cefb16a5/embed?autospin=1&autostart=1&transparent=1&ui_theme=dark",
    linkOriginal: "https://skfb.ly/pH6nB",
  },
];

const Models3d = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="2xl">
        <PageHeader
          icon={Box}
          backTo="/wiki"
          backLabel="Voltar para a Wiki"
          title="Galeria de Modelagem 3D"
          description="Visualize interativamente os cases e estruturas impressas em 3D. Os modelos estão hospedados e renderizados via Sketchfab."
        />

        <div className="grid gap-10">
          {projetos3D.map((projeto) => (
            <div
              key={projeto.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 shadow-xl"
            >
              <div className="relative aspect-video w-full bg-slate-950">
                <iframe
                  title={`Modelo 3D - ${projeto.titulo}`}
                  className="h-full w-full border-0"
                  src={projeto.embedUrl}
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                ></iframe>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-3 text-2xl font-bold text-white">
                  {projeto.titulo}
                </h2>
                <p className="mb-6 flex-1 leading-relaxed text-slate-400">
                  {projeto.descricao}
                </p>

                <div className="mt-auto border-t border-slate-700 pt-4">
                  <a
                    href={projeto.linkOriginal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver no Sketchfab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Models3d;
