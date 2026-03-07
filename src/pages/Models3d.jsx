import React from "react";
import { Box, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Models3d = () => {
  // Substitua os links em 'embedUrl' pelos links gerados no botão "Embed" do Sketchfab
  const projetos3D = [
    {
      id: "totem",
      titulo: "Case TotemID",
      descricao:
        "Estrutura principal desenhada no Blender para acomodar o ESP32-CAM e os componentes de controle de acesso do totem.",
      // Copie apenas o 'src' do iframe fornecido pelo Sketchfab:
      embedUrl:
        "https://sketchfab.com/models/7d38826c3a254b13beb0388611358954/embed?autospin=1&autostart=1&preload=1&ui_hint=2&ui_theme=dark",
      linkOriginal: "https://skfb.ly/pH6nB",
    },
    // {
    //   id: "ac-controler",
    //   titulo: "Case AC-CONTROLER",
    //   descricao:
    //     "Invólucro modelado para o controlador inteligente de ar condicionado, focado em ventilação para os sensores térmicos.",
    //   embedUrl:
    //     "https://sketchfab.com/models/98b19d5503564b94b8c1cf35df45c84b/embed?autospin=1&autostart=1&ui_hint=0",
    //   linkOriginal: "https://skfb.ly/pH6nR",
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <Link
            to="/wiki"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Wiki
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Box className="text-blue-500 h-10 w-10" />
            Galeria de Modelagem 3D
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Visualize interativamente os cases e estruturas impressas em 3D. Os
            modelos estão hospedados e renderizados via Sketchfab.
          </p>
        </header>

        <div className="grid gap-10">
          {projetos3D.map((projeto) => (
            <div
              key={projeto.id}
              className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-xl"
            >
              {/* Contêiner do Iframe do Sketchfab */}
              <div className="w-full aspect-video bg-slate-950 relative">
                <iframe
                  title={`Modelo 3D - ${projeto.titulo}`}
                  className="w-full h-full border-0"
                  src={projeto.embedUrl}
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                ></iframe>
              </div>

              {/* Informações do Modelo */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {projeto.titulo}
                </h2>
                <p className="text-slate-400 mb-6 flex-1 leading-relaxed">
                  {projeto.descricao}
                </p>

                <div className="pt-4 border-t border-slate-700 mt-auto">
                  <a
                    href={projeto.linkOriginal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver no Sketchfab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models3d;
