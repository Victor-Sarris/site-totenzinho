import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

// Imports das imagens do tutorial SSH
import img2 from "../../assets/img/Docs/ConnectionSsh/2.png";
import img3 from "../../assets/img/Docs/ConnectionSsh/3.png";
import img4 from "../../assets/img/Docs/ConnectionSsh/4.png";
import img5 from "../../assets/img/Docs/ConnectionSsh/5.png";
import img6 from "../../assets/img/Docs/ConnectionSsh/6.png";
import img7 from "../../assets/img/Docs/ConnectionSsh/7.png";
import img8 from "../../assets/img/Docs/ConnectionSsh/8.png";
import img9 from "../../assets/img/Docs/ConnectionSsh/9.png";

const ConnectionSsh = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          03. Como conectar ao Labrador via SSH
        </h1>
        <p className="text-lg text-slate-400">
          Aprenda a acessar o SBC Labrador remotamente através do seu
          computador usando o Putty.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Primeiro passo, instalar o Putty:
        </h2>
        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img2}
              alt="Pesquisando por Putty"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Procure por Download Putty no seu navegador
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img3}
              alt="Página de Download do Putty"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Faça o download da versão correspondente com seu SO.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Descobrindo o IP do Labrador
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Depois de fazer o download e instalação do Putty, vamos iniciar o
          Labrador e descobrir seu IP local para conectá-lo localmente via
          SSH com sua máquina:
        </p>
        <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img4}
            alt="Comando ip addr show"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="text-center font-medium text-slate-300">
            No labrador, abra o CMD e digite o comando{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              ip addr show
            </code>
            . O IP do Labrador será exibido.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Testando a conexão
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Ficou em dúvida se é o IP correto? Não tem problema, podemos
          testar! Abra o CMD na sua máquina e use o seguinte comando:
        </p>
        <CodeBlock language="bash" code="ping <ip_labrador>" />

        <div className="mt-8 rounded-xl border border-green-900/50 bg-slate-800/30 p-4">
          <h3 className="mb-3 text-lg font-bold text-emerald-400">
            Caso dê tudo certo:
          </h3>
          <img
            src={img5}
            alt="Ping bem sucedido"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="text-center text-sm text-slate-400">
            Caso tenha uma saída parecida, está tudo certo!
          </p>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Acessando o Labrador
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Com a etapa anterior bem sucedida, abra o Putty na sua máquina:
        </p>

        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img6}
              alt="Abrindo o Putty"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <h3 className="mb-4 text-xl font-bold text-white">
              Configure o Putty corretamente:
            </h3>
            <img
              src={img7}
              alt="Configurando o Putty"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Coloque o ip do seu Labrador e o seu tipo de conexão (SSH). Em
              seguida, aperte em Open.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <h3 className="mb-4 text-xl font-bold text-white">
              Entre no Labrador normalmente:
            </h3>
            <img
              src={img8}
              alt="Login no Putty"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <img
              src={img9}
              alt="Acesso liberado"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Coloque sua senha e login do Labrador. Agora você pode mexer
              livremente.
            </p>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
};

export default ConnectionSsh;
