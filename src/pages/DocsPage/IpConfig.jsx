import React from "react";
import { Link } from "react-router-dom";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

// importacoes de imagens
import img1 from "../../assets/img/Docs/IpConfig/1.png";
import img2 from "../../assets/img/Docs/IpConfig/2.png";
import img4 from "../../assets/img/Docs/IpConfig/4.png";
import img5 from "../../assets/img/Docs/IpConfig/5.png";

const IpConfig = () => {
  return (
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          08. Configuração de IP Estático
        </h1>
        <p className="text-lg text-slate-400">
          Aprenda a fixar o endereço de IP da placa Labrador e da ESP-CAM na
          sua rede Wi-Fi. Ter um IP fixo (estático) garante que os
          componentes do projeto se encontrem automaticamente na rede, sem
          que você precise caçar o IP toda vez que reiniciá-los.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Configurando o IP do Labrador
        </h2>
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img1}
            alt="Configuração de Rede"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="mb-6 leading-relaxed text-slate-300">
            Abra as configurações de rede do sistema, selecione a sua rede
            Wi-Fi e clique no ícone de engrenagem para editar (a interface
            pode variar um pouco, mas o caminho é este). Em seguida, acesse a
            aba{" "}
            <span className="font-medium text-red-500">
              Configuração IPv4
            </span>
            .
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Ajustando as Rotas do IPv4
        </h2>
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img2}
            alt="Configuração de Rede"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="mb-6 leading-relaxed text-slate-300">
            Mude o método para "Manual" e preencha os campos com os dados da
            sua rede:
          </p>
          <ul className="mb-6 space-y-2 text-slate-300">
            <li>
              <strong>Endereço:</strong> O IP fixo que você escolheu para o
              Labrador.
            </li>
            <li>
              <strong>Máscara de rede:</strong> Geralmente usamos o prefixo{" "}
              <strong>24</strong> (que equivale a 255.255.255.0).
            </li>
            <li>
              <strong>Gateway:</strong> O IP do seu roteador (o mesmo que
              fornece o Wi-Fi. Ex: 192.168.18.1).
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Plano B: Via Terminal
        </h2>
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img4}
            alt="Configuração de Rede"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="mb-6 leading-relaxed text-slate-300">
            Se a interface gráfica der dor de cabeça, vamos resolver direto
            no terminal! Abra o terminal do Labrador e rode o comando abaixo.
          </p>
          <p className="mb-6 rounded border border-yellow-700/50 bg-yellow-900/20 p-3 leading-relaxed text-slate-300">
            <span className="font-bold text-yellow-500">Atenção:</span>{" "}
            Lembre-se de substituir as tags{" "}
            <code className="mx-1 text-yellow-400">&lt;NOME_DA_REDE&gt;</code>
            , <code className="mx-1 text-yellow-400">&lt;IP_PREFERIDO&gt;</code>{" "}
            e <code className="mx-1 text-yellow-400">&lt;IP_REDE&gt;</code>{" "}
            pelos dados reais da sua conexão.
          </p>
          <CodeBlock
            language="bash"
            code="sudo nmcli connection modify <NOME_DA_REDE> ipv4.method manual ipv4.addresses <IP_PREFERIDO>/24 ipv4.gateway <IP_REDE> ipv4.dns 8.8.8.8"
          />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Configurando o IP da ESP-CAM
        </h2>
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800/30 p-4">
          <img
            src={img5}
            alt="Configuração de Rede"
            className="mb-4 w-full rounded-lg border border-slate-700 shadow-md"
          />
          <p className="mb-4 leading-relaxed text-slate-300">
            Para a ESP-CAM, a configuração é feita direto no código C++.
            Basta adicionar as rotinas de IP estático no seu arquivo{" "}
            <code className="rounded bg-slate-900 px-1 py-0.5 text-slate-400">
              espcam.ino
            </code>
            .
          </p>
          <p className="leading-relaxed text-slate-300">
            Vá para a página de{" "}
            <Link
              to="/documentacao"
              className="text-blue-400 underline transition-colors hover:text-blue-300"
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
