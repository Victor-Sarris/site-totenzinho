import SidebarDocs from "./SidebarDocs";

// Casco compartilhado por todas as páginas de documentação: sidebar fixa +
// área de conteúdo centralizada, com o mesmo título/descrição opcionais.
const DocsLayout = ({ title, description, children }) => (
  <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
    <SidebarDocs />
    <main className="flex-1 min-w-0 md:ml-72 px-4 py-8 md:px-8 md:py-12 lg:px-12">
      <div className="max-w-3xl mx-auto">
        {(title || description) && (
          <div className="mb-10 border-b border-slate-800 pb-8">
            {title && (
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h1>
            )}
            {description && (
              <p className="text-base md:text-lg text-slate-400">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  </div>
);

export default DocsLayout;
