import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

const Log = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          06. Monitoramento de Arquivo .log
        </h1>
        <p className="text-lg text-slate-400">
          Comandos essenciais para acompanhar o funcionamento do sistema e
          depurar problemas através dos logs gerados no Labrador.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Monitoramento de Arquivo .log
        </h2>
        <div className="space-y-8">
          <div>
            <p className="mb-4 leading-relaxed text-slate-300">
              <strong className="text-white">
                Ver o histórico completo (Estático):
              </strong>{" "}
              este comando exibe todo o conteúdo do arquivo de log de uma só
              vez. Útil para ler o que aconteceu desde o momento que o
              Labrador ligou.
            </p>
            <CodeBlock language="bash" code="cat /home/caninos/log_erro.txt" />
          </div>
          <div>
            <p className="mb-4 leading-relaxed text-slate-300">
              <strong className="text-white">
                Monitorar em Tempo Real (Dinâmico):
              </strong>{" "}
              este é o comando mais usado durante testes. Ele mostra as
              novas linhas assim que elas aparecem (como o status da conexão
              ou o reconhecimento facial acontecendo ao vivo).
            </p>
            <CodeBlock
              language="bash"
              code="tail -f /home/caninos/log_erro.txt"
            />
            <p className="mt-4 leading-relaxed text-slate-300">
              (Para sair deste modo e voltar ao terminal, pressione Ctrl +
              C).
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Estrutura de Pastas esperada
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          O sistema assume que o projeto está localizado em:
        </p>
        <CodeBlock
          language="bash"
          code="/home/caninos/Desktop/Reconhecimento-Facial"
        />
      </section>

      <div className="mt-6 rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-6">
        <h3 className="mb-2 text-lg font-bold text-emerald-400">
          Tudo Pronto!
        </h3>
        <p className="text-slate-300">
          Se o status mostrar{" "}
          <span className="font-semibold text-emerald-400">
            active (running)
          </span>
          , parabéns! Seu totem agora iniciará o script de reconhecimento
          facial sozinho toda vez que for energizado.
        </p>
      </div>
    </DocsLayout>
  );
};

export default Log;
