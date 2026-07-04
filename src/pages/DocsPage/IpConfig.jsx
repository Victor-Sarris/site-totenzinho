import DocsLayout from "../../components/DocsLayout";
import CodeBlock from "../../components/CodeBlock";
import { Link } from "react-router-dom";

// importacoes de imagens
import img1 from "../../assets/img/Docs/IpConfig/1.png";
import img2 from "../../assets/img/Docs/IpConfig/2.png";
import img4 from "../../assets/img/Docs/IpConfig/4.png";
import img5 from "../../assets/img/Docs/IpConfig/5.png";

const IpConfig = () => {
  return (
    <DocsLayout
      title="03. Configuração de IP Estático"
      description="Aprenda a fixar o endereço de IP da placa Labrador e da ESP-CAM na sua rede Wi-Fi. Ter um IP fixo (estático) garante que os componentes do projeto se encontrem automaticamente na rede, sem que você precise caçar o IP toda vez que reiniciá-los."
    >
        <section className="bm-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurando o IP do Labrador
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img1}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Abra as configurações de rede do sistema, selecione a sua rede
              Wi-Fi e clique no ícone de engrenagem para editar (a interface
              pode variar um pouco, mas o caminho é este). Em seguida, acesse a
              aba{" "}
              <span className="text-red-500 font-medium">
                Configuração IPv4
              </span>
              .
            </p>
          </div>
        </section>

        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ajustando as Rotas do IPv4
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img2}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Mude o método para "Manual" e preencha os campos com os dados da
              sua rede:
              <br />
              <br />• <strong>Endereço:</strong> O IP fixo que você escolheu
              para o Labrador.
              <br />• <strong>Máscara de rede:</strong> Geralmente usamos o
              prefixo <strong>24</strong> (que equivale a 255.255.255.0).
              <br />• <strong>Gateway:</strong> O IP do seu roteador (o mesmo
              que fornece o Wi-Fi. Ex: 192.168.18.1).
            </p>
          </div>
        </section>

        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Plano B: Via Terminal
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img4}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-6 leading-relaxed">
              Se a interface gráfica der dor de cabeça, vamos resolver direto no
              terminal! Abra o terminal do Labrador e rode o comando abaixo.
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed bg-yellow-900/20 p-3 rounded border border-yellow-700/50">
              <span className="font-bold text-yellow-500">Atenção:</span>{" "}
              Lembre-se de substituir as tags
              <code className="text-yellow-400 mx-1">&lt;NOME_DA_REDE&gt;</code>
              ,
              <code className="text-yellow-400 mx-1">&lt;IP_PREFERIDO&gt;</code>{" "}
              e<code className="text-yellow-400 mx-1">&lt;IP_REDE&gt;</code>
              pelos dados reais da sua conexão.
            </p>
            <CodeBlock
              language="bash"
              code="sudo nmcli connection modify <NOME_DA_REDE> ipv4.method manual ipv4.addresses <IP_PREFERIDO>/24 ipv4.gateway <IP_REDE> ipv4.dns 8.8.8.8"
            />
          </div>
        </section>

        <section className="bm-16 mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Configurando o IP da ESP-CAM
          </h2>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 mt-6">
            <img
              src={img5}
              alt="Configuração de Rede"
              className="w-full rounded-lg shadow-md mb-4 border border-slate-700"
            />
            <p className="text-slate-300 mb-4 leading-relaxed">
              Para a ESP-CAM, a configuração é feita direto no código C++. Basta
              adicionar as rotinas de IP estático no seu arquivo{" "}
              <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-400">
                espcam.ino
              </code>
              .
            </p>
            <p className="text-slate-300 mb-2 leading-relaxed">
              Vá para a página de{" "}
              <Link
                to="/documentacao"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                documentação
              </Link>{" "}
              para copiar o script completo!
            </p>
          </div>
        </section>
    </DocsLayout>
  );
};

export default IpConfig;
