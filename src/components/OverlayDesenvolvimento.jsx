import React from "react";
import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";

const OverlayDesenvolvimento = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-blue-500/20 p-4">
            <Wrench className="h-10 w-10 text-blue-400" />
          </div>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-white">
          Em Desenvolvimento
        </h2>
        <p className="mb-8 leading-relaxed text-slate-400">
          Esta seção do projeto ainda está sendo construída. Volte em breve
          para conferir os novos guias e referências!
        </p>

        <Link
          to="/site-totenzinho"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default OverlayDesenvolvimento;
