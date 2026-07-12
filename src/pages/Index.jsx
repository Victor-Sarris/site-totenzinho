import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace } from "../components/ui/Icons";

const Index = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 50);

    const timer = setTimeout(() => {
      navigate("/site-totenzinho");
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="bg-grid fixed inset-0 z-100 flex flex-col items-center justify-center bg-slate-950 font-sans">
      <div className="flex flex-col items-center px-4">
        {/* Ícone com animação de pulso */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500 opacity-20 blur-xl"></div>
          <ScanFace className="relative z-10 h-20 w-20 animate-pulse text-blue-500 md:h-24 md:w-24" />
        </div>

        {/* Nome do Projeto */}
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Totem<span className="text-blue-500">ID</span>
        </h1>

        {/* Texto de estado estilo terminal */}
        <p className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 md:text-sm">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-blue-500"></span>
          Buscando Documentação...
        </p>

        {/* Barra de progresso */}
        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-slate-800 md:w-64">
          <div
            className="h-full bg-blue-500 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="mt-3 font-mono text-xs text-slate-600">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Index;
