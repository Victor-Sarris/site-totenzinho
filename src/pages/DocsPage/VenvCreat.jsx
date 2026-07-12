import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

// Imports das imagens do tutorial de Venv
import img1 from "../../assets/img/Docs/VenvCreat/1.png";
import img2 from "../../assets/img/Docs/VenvCreat/2.png";

const VenvCreat = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          01. Criação de Ambiente Virtual (Venv)
        </h1>
        <p className="text-lg text-slate-400">
          Aprenda a isolar as dependências do projeto de reconhecimento
          facial criando um ambiente virtual Python dentro do Labrador.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Por que usar um Venv?
        </h2>
        <p className="leading-relaxed text-slate-300">
          O ambiente virtual (venv) cria um diretório isolado para o seu
          projeto. Isso significa que as bibliotecas que você instalar (como
          o OpenCV, MediaPipe, etc.) não vão conflitar com outras bibliotecas
          do sistema operacional do SBC Labrador.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Criando o Ambiente Virtual
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Abra o terminal do seu Labrador (seja diretamente nele ou via SSH)
          e navegue até a pasta onde o seu projeto ficará salvo. Em seguida,
          digite o comando abaixo para criar o ambiente:
        </p>

        <CodeBlock language="bash" code="python3 -m venv venv" />

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img1}
            alt="Criando o Venv no Terminal"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="text-center font-medium text-slate-300">
            Isso vai gerar uma pasta chamada "venv" dentro do seu diretório
            atual com os binários do Python isolados.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Ativando o Ambiente Virtual
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Sempre que for rodar o código do totem ou instalar uma nova
          biblioteca com o `pip`, você precisa ativar o ambiente virtual
          primeiro. Use o comando:
        </p>

        <CodeBlock language="bash" code="source venv/bin/activate" />

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img2}
            alt="Venv ativado com sucesso"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="text-center font-medium text-slate-300">
            Repare que agora o nome do ambiente{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-sm text-blue-400">
              (venv)
            </code>{" "}
            aparece antes do seu usuário no terminal. Isso indica que ele
            está ativo!
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="rounded-xl border border-blue-800/50 bg-blue-900/20 p-6">
          <h3 className="mb-3 text-xl font-bold text-blue-400">
            Dica de Ouro
          </h3>
          <p className="mb-4 text-slate-300">
            Quando terminar de programar e quiser voltar para o Python global
            do sistema, basta digitar:
          </p>
          <CodeBlock language="bash" code="deactivate" />
        </div>
      </section>
    </DocsLayout>
  );
};

export default VenvCreat;
