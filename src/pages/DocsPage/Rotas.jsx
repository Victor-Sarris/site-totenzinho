import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

const MethodBadge = ({ method }) => {
  const styles =
    method === "POST"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-blue-500/20 text-blue-400 border-blue-500/30";
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-sm ${styles}`}
    >
      {method}
    </span>
  );
};

const LabradorRoutes = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          07. Rotas do Sistema
        </h1>
        <p className="text-lg text-slate-400">
          Abaixo estão listados os endpoints e links de acesso aos serviços
          rodando no servidor do Labrador.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
          <MethodBadge method="GET" />
          Video Feed
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Acesse esta rota diretamente no navegador para visualizar o
          streaming de vídeo da câmera em tempo real. Ideal para monitorar o
          que o totem está enxergando.
        </p>
        <CodeBlock
          language="http"
          code="http://192.168.18.149:5000/video_feed"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
          <MethodBadge method="GET" />
          Relatório da API
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Esta rota retorna os dados de registros e logs gerados pelo
          sistema de reconhecimento facial. Geralmente devolve um objeto
          JSON que pode ser consumido por aplicações externas.
        </p>
        <CodeBlock
          language="http"
          code="http://192.168.18.149:5000/api/relatorio"
        />
      </section>

      <section className="mb-4">
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
          <MethodBadge method="POST" />
          Cadastro Direto
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Endpoint responsável por receber dados e registrar novas faces ou
          usuários diretamente no banco de dados do sistema.
        </p>
        <CodeBlock
          language="http"
          code="http://192.168.18.149:5000/api/cadastrar_direto"
        />
      </section>

      <div className="mt-6 rounded-xl border border-yellow-800/50 bg-yellow-900/20 p-6">
        <h3 className="mb-2 text-lg font-bold text-yellow-400">
          Nota sobre o IP
        </h3>
        <p className="text-slate-300">
          Lembre-se de que o IP{" "}
          <code className="rounded bg-slate-800 px-1 py-0.5 text-yellow-300">
            192.168.18.149
          </code>{" "}
          pode mudar dependendo da rede em que o Labrador estiver conectado,
          a menos que esteja configurado como IP estático.
        </p>
      </div>
    </DocsLayout>
  );
};

export default LabradorRoutes;
