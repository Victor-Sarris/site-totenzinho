import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

// Imports das imagens do tutorial de Acesso Remoto
import img2 from "../../assets/img/Docs/RemoteLabrador/2.png";
import img3 from "../../assets/img/Docs/RemoteLabrador/3.png";
import img4 from "../../assets/img/Docs/RemoteLabrador/4.png";
import img5 from "../../assets/img/Docs/RemoteLabrador/5.png";
import img6 from "../../assets/img/Docs/RemoteLabrador/6.png";
import img7 from "../../assets/img/Docs/RemoteLabrador/7.png";
import img8 from "../../assets/img/Docs/RemoteLabrador/8.png";
import img9 from "../../assets/img/Docs/RemoteLabrador/9.png";
import img10 from "../../assets/img/Docs/RemoteLabrador/10.png";
import img11 from "../../assets/img/Docs/RemoteLabrador/11.png";

const RemoteLabrador = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          04. Controle Remoto pelo PC
        </h1>
        <p className="text-lg text-slate-400">
          Passo a passo para acessar a interface gráfica do SBC Labrador a
          partir da sua máquina principal.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Preparando o ambiente na sua máquina
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Primeiramente, precisamos de um software para visualizar a tela do
          Labrador. Faça o download do cliente de acesso remoto.
        </p>
        <p className="mb-6 leading-relaxed text-slate-300">
          Clique{" "}
          <a
            className="font-bold text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noreferrer"
            href="https://youtu.be/9YCLG-LLUZI"
          >
            aqui
          </a>{" "}
          para acessar o vídeo complementar que eu mesmo fiz sobre a conexão
          com VNCServer com o Labrador!
        </p>
        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img2}
              alt="Pesquisando o software"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Procure pelo software de acesso remoto no navegador.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img3}
              alt="Página de Download"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Faça o download da versão adequada para o seu sistema
              operacional.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img4}
              alt="Instalação"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Siga o assistente de instalação padrão na sua máquina.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Configurando o Labrador para receber acesso
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Se for necessário instalar o servidor de acesso no Labrador (via
          terminal), execute o comando abaixo:
        </p>
        <CodeBlock language="bash" code="sudo apt-get install xrdp -y" />

        <div className="mt-8 space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img5}
              alt="Terminal do Labrador"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Verifique as configurações e garanta que o serviço está
              rodando.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Iniciando a conexão
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Abra o programa que acabamos de instalar no seu computador e
          insira o IP do Labrador (o mesmo que descobrimos no passo SSH).
        </p>

        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img6}
              alt="Inserindo IP"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Coloque o IP do Labrador e inicie a conexão.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img7}
              alt="Aviso de segurança"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Se aparecer um aviso de segurança/certificado, pode aceitar
              para prosseguir.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img8}
              alt="Tela de Login"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Na tela de login, insira as credenciais do seu Labrador
              (usuário e senha).
            </p>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Pronto! Acesso concedido
        </h2>
        <p className="mb-6 leading-relaxed text-slate-300">
          Se tudo deu certo, você agora verá a área de trabalho gráfica do
          Labrador espelhada no seu monitor.
        </p>

        <div className="space-y-8">
          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img9}
              alt="Desktop do Labrador"
              className="w-full rounded-lg border border-slate-700 shadow-md"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img10}
              alt="Uso remoto 1"
              className="w-full rounded-lg border border-slate-700 shadow-md"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4">
            <img
              src={img11}
              alt="Uso remoto 2"
              className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
            />
            <p className="text-center font-medium text-slate-300">
              Agora você pode controlar o Labrador como se estivesse com
              teclado e mouse conectados diretamente a ele.
            </p>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
};

export default RemoteLabrador;
