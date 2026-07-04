import DocsLayout from "../../components/DocsLayout";
import CodeBlock from "../../components/CodeBlock";

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
    <DocsLayout
      title="04. Como controlar o Labrador remotamente"
      description="Passo a passo para acessar a interface gráfica do SBC Labrador a partir da sua máquina principal."
    >
        {/* Passo 1: Download e Instalação do Cliente */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Preparando o ambiente na sua máquina
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Primeiramente, precisamos de um software para visualizar a tela do
            Labrador. Faça o download do cliente de acesso remoto.
          </p>
          <p>
            Clique{" "}
            <a
              className="text-red-500 font-bold"
              target="blank"
              rel="external"
              href="https://youtu.be/9YCLG-LLUZI"
            >
              aqui
            </a>{" "}
            para acessar o vídeo complementar que eu mesmo fiz sobre a conexão
            com VNCServer com o Labrador!
          </p>
          <div className="space-y-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img2}
                alt="Pesquisando o software"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Procure pelo software de acesso remoto no navegador.
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img3}
                alt="Página de Download"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Faça o download da versão adequada para o seu sistema
                operacional.
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img4}
                alt="Instalação"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Siga o assistente de instalação padrão na sua máquina.
              </p>
            </div>
          </div>
        </section>

        {/* Passo 2: Configuração no Labrador */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurando o Labrador para receber acesso
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Se for necessário instalar o servidor de acesso no Labrador (via
            terminal), execute o comando abaixo:
          </p>
          {/* Edite o comando abaixo caso a wiki use um comando específico de VNC ou XRDP */}
          <CodeBlock language="bash" code="sudo apt-get install xrdp -y" />

          <div className="space-y-8 mt-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img5}
                alt="Terminal do Labrador"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Verifique as configurações e garanta que o serviço está rodando.
              </p>
            </div>
          </div>
        </section>

        {/* Passo 3: Realizando a Conexão */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Iniciando a conexão
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Abra o programa que acabamos de instalar no seu computador e insira
            o IP do Labrador (o mesmo que descobrimos no passo SSH).
          </p>

          <div className="space-y-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img6}
                alt="Inserindo IP"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Coloque o IP do Labrador e inicie a conexão.
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img7}
                alt="Aviso de segurança"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Se aparecer um aviso de segurança/certificado, pode aceitar para
                prosseguir.
              </p>
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img8}
                alt="Tela de Login"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
                Na tela de login, insira as credenciais do seu Labrador (usuário
                e senha).
              </p>
            </div>
          </div>
        </section>

        {/* Passo 4: Conclusão */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pronto! Acesso concedido
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Se tudo deu certo, você agora verá a área de trabalho gráfica do
            Labrador espelhada no seu monitor.
          </p>

          <div className="space-y-8">
            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img9}
                alt="Desktop do Labrador"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img10}
                alt="Uso remoto 1"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
            </div>

            <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
              <img
                src={img11}
                alt="Uso remoto 2"
                className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
              />
              <p className="text-slate-300 text-center font-medium">
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
