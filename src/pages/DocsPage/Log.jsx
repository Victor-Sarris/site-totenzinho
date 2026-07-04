import DocsLayout from "../../components/DocsLayout";
import CodeBlock from "../../components/CodeBlock";

const Log = () => {
  return (
    <DocsLayout
      title="01. Monitoramento de Arquivo .Log"
      description="Comandos essenciais para acompanhar o comportamento do totem em tempo real e depurar falhas registradas pelo sistema."
    >
        <section className="mb-12">
          <ul className="list-disc">
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Ver o histórico completo (Estático) Este comando exibe todo o
                conteúdo do arquivo de log de uma só vez. Útil para ler o que
                aconteceu desde o momento que o Labrador ligou.
              </p>
              <CodeBlock
                language="bash"
                code="cat /home/caninos/log_erro.txt"
              />
            </li>
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Monitorar em Tempo Real (Dinâmico) Este é o comando mais usado
                durante testes. Ele mostra as novas linhas assim que elas
                aparecem (como o status da conexão ou o reconhecimento facial
                acontecendo ao vivo).
              </p>
              <CodeBlock
                language="bash"
                code="tail -f /home/caninos/log_erro.txt"
              />
              <p className="text-slate-300 mb-4 leading-relaxed">
                (Para sair deste modo e voltar ao terminal, pressione Ctrl + C).
              </p>
            </li>
          </ul>
        </section>
        {/* Estrutura de Pastas esperada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Estrutura de Pastas esperada
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            O sistema assume que o projeto está localizado em:
          </p>
          <CodeBlock
            language="bash"
            code="/home/caninos/Desktop/Reconhecimento-Facial"
          />
        </section>
        <div className="bg-green-900/20 border border-green-800/50 p-6 rounded-xl mt-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            Tudo Pronto!
          </h3>
          <p className="text-slate-300">
            Se o status mostrar{" "}
            <span className="text-green-400 font-semibold">
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
