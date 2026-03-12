import { Book, Code, Terminal, Cpu, ChevronRight } from "lucide-react";

const SidebarDocs = () => {
  const rolarParaSecao = (id) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 mt-15 h-screen fixed left-0 top-0 bg-slate-950 border-r border-slate-800 pt-10 px-4 z-10 shadow-2xl">
      {/* Título do Menu */}
      <div className="mb-10 px-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Book className="h-5 w-5 text-blue-500" />
          Navegação
        </h3>
        <p className="text-xs text-slate-500 mt-2">Guia de Módulos</p>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 space-y-2">
        <button
          onClick={() => rolarParaSecao("intro")}
          className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
        >
          <Book className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          <span className="font-medium text-sm">1. Introdução</span>
          <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
        </button>

        <button
          onClick={() => rolarParaSecao("reconhecimento")}
          className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
        >
          <Terminal className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          <span className="font-medium text-sm">2. IA (Python)</span>
          <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
        </button>

        <button
          onClick={() => rolarParaSecao("esp32")}
          className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group border border-transparent hover:border-slate-700 cursor-pointer"
        >
          <Cpu className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          <span className="font-medium text-sm">3. Firmware (C++)</span>
          <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
        </button>
      </nav>

      {/* Rodapé da Sidebar */}
      <div className="mt-auto pb-8 px-4 text-center">
        <p className="text-xs text-slate-600 font-medium">TotemID v1.0</p>
      </div>
    </aside>
  );
};

export default SidebarDocs;
