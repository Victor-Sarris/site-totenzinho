import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScanFace from "../components/icons/ScanFace";

const Index = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
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
    <div className="fixed inset-0 z-100 bg-slate-950 flex flex-col items-center justify-center font-sans">
      <div className="flex flex-col items-center">
        {/* Ícone com animação de pulso */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <ScanFace className="text-blue-500 h-24 w-24 relative z-10 animate-pulse" />
        </div>

        {/* Nome do Projeto */}
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Totem<span className="text-blue-500">ID</span>
        </h1>

        {/* Texto de estado estilo terminal */}
        <p className="text-slate-400 mb-8 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-blue-500 rounded-full animate-ping"></span>
          Buscando Documentação...
        </p>

        {/* Barra de progresso */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
