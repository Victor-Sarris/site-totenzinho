const OverlayDesenvolvimento = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-500/20 rounded-full">
            <Wrench className="h-10 w-10 text-blue-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Em Desenvolvimento
        </h2>
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
};

export default OverlayDesenvolvimento;
