import DocsLayout from "../../components/DocsLayout";
import CodeBlock from "../../components/CodeBlock";

// Imports das imagens do tutorial de Venv
import img1 from "../../assets/img/Docs/VenvCreat/1.png";
import img2 from "../../assets/img/Docs/VenvCreat/2.png";

const VenvCreat = () => {
  return (
    <DocsLayout
      title="01. Criação de Ambiente Virtual (Venv)"
      description="Aprenda a isolar as dependências do projeto de reconhecimento facial criando um ambiente virtual Python dentro do Labrador."
    >
        {/* Passo 1: O que é e por que usar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Por que usar um Venv?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            O ambiente virtual (venv) cria um diretório isolado para o seu
            projeto. Isso significa que as bibliotecas que você instalar (como o
            OpenCV, MediaPipe, etc.) não vão conflitar com outras bibliotecas do
            sistema operacional do SBC Labrador.
          </p>
        </section>

        {/* Passo 2: Instalação e Criação */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Criando o Ambiente Virtual
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Abra o terminal do seu Labrador (seja diretamente nele ou via SSH) e
            navegue até a pasta onde o seu projeto ficará salvo. Em seguida,
            digite o comando abaixo para criar o ambiente:
          </p>

          <CodeBlock language="bash" code="python3 -m venv venv" />

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img1}
              alt="Criando o Venv no Terminal"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 text-center font-medium">
              Isso vai gerar uma pasta chamada "venv" dentro do seu diretório
              atual com os binários do Python isolados.
            </p>
          </div>
        </section>

        {/* Passo 3: Ativação */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ativando o Ambiente Virtual
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Sempre que for rodar o código do totem ou instalar uma nova
            biblioteca com o `pip`, você precisa ativar o ambiente virtual
            primeiro. Use o comando:
          </p>

          <CodeBlock language="bash" code="source venv/bin/activate" />

          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img2}
              alt="Venv ativado com sucesso"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 text-center font-medium">
              Repare que agora o nome do ambiente{" "}
              <code className="bg-slate-900 text-blue-400 px-1.5 py-0.5 rounded text-sm">
                (venv)
              </code>{" "}
              aparece antes do seu usuário no terminal. Isso indica que ele está
              ativo!
            </p>
          </div>
        </section>

        {/* Dica Extra: Desativar */}
        <section className="mb-12">
          <div className="bg-blue-900/20 border border-blue-800/50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              Dica de Ouro
            </h3>
            <p className="text-slate-300 mb-4">
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
