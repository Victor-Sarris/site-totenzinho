import React from "react";
import { Cpu, Zap, Wrench } from "lucide-react";
import Container from "../components/ui/Container";
import PageHeader from "../components/ui/PageHeader";
import Esp32ov2640 from "../assets/img/circuit/Ov2640.png";
import Receptorov2640 from "../assets/img/circuit/Receptor.png";
import Sbc from "../assets/img/circuit/Labrador.png";
import Painel from "../assets/img/circuit/Painel7P.png";
import Case from "../assets/img/circuit/Case.png";
import ModuleVL53L0X from "../assets/img/circuit/Modulovl53l0x.png";
import Totem_Prototipo from "../assets/img/circuit/Totem-Prototipo.jpeg";

const componentes = [
  {
    id: "modulo-vl53l0x",
    nome: "Módulo de Distância VL53L0X",
    descricao:
      "Sensor de distância a laser VL53L0X utilizado para detectar a proximidade do usuário no TotemID. Realiza medições precisas em tempo real via comunicação I2C, permitindo ativar automaticamente o reconhecimento facial quando alguém se aproxima do sistema.",
    imagem: ModuleVL53L0X,
  },
  {
    id: "esp32cam",
    nome: "Módulo ESP32-CAM",
    descricao:
      "O 'olho' do TotemID. Responsável por capturar as imagens do usuário em tempo real usando o sensor OV2640 e enviá-las via Wi-Fi para o servidor Python, onde a IA realiza o reconhecimento. Também pode acionar o relé de acesso.",
    imagem: Esp32ov2640,
  },
  {
    id: "receptor-esp32cam",
    nome: "Placa Receptora ESP32-CAM",
    descricao:
      "Placa auxiliar essencial para o ESP32-CAM. Facilita a gravação do firmware via USB e garante uma alimentação de energia estável (5V) durante a operação contínua do hardware, evitando reinícios inesperados.",
    imagem: Receptorov2640,
  },
  {
    id: "sbc",
    nome: "SBC — Labrador",
    descricao:
      "O 'cérebro' local do totem. Este Single Board Computer (computador de placa única) processa a interface do sistema, gerencia o painel de exibição e coordena a interação do usuário com o sistema de validação.",
    imagem: Sbc,
  },
  {
    id: "painel",
    nome: "Painel IPS 7\"",
    descricao:
      "A interface visual de comunicação. Uma tela IPS de 7 polegadas onde o usuário interage com o TotemID, visualizando instruções, o retorno da câmera e alertas de acesso liberado ou negado com alta nitidez.",
    imagem: Painel,
  },
  {
    id: "case-3d",
    nome: "Case 3D",
    descricao:
      "A estrutura física protetora. Uma carcaça modelada e impressa em 3D, projetada sob medida para acomodar a eletrônica, organizar a fiação e fixar o painel, garantindo um acabamento profissional ao totem.",
    imagem: Case,
  },
];

const Circuit = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="xl">
        <PageHeader
          icon={Cpu}
          iconColor="text-indigo-400"
          backTo="/wiki"
          backLabel="Voltar para a Wiki"
          title="Montagem do Circuito"
          description="Lista de materiais utilizados e esquema de montagem do hardware do TotemID. A arquitetura foi pensada para ser de baixo custo e fácil de reproduzir."
        />

        <section className="mb-16">
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-white">
            <Wrench className="h-6 w-6 text-slate-400" />
            Componentes Necessários
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {componentes.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 transition-colors hover:border-indigo-500/50"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {item.nome}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-white">
            <Zap className="h-6 w-6 text-yellow-400" />
            Protótipo Final &amp; Esquemático
          </h2>

          <div className="flex flex-col items-center gap-8 rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl lg:flex-row lg:p-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 lg:w-1/2">
              <img
                src={Totem_Prototipo}
                alt="Protótipo do Totem"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full space-y-4 lg:w-1/2">
              <h3 className="text-xl font-bold text-white">
                Esquema de Ligações
              </h3>
              <p className="leading-relaxed text-slate-400">
                A montagem do circuito é relativamente simples, focando na
                alimentação e na comunicação do ESP32-CAM com o módulo de
                acesso.
              </p>

              <ul className="mt-4 space-y-3">
                <li className="flex flex-col gap-1 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3 text-slate-300 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-mono font-bold text-red-400">
                    Módulo VL53L0X
                  </span>
                  <span>
                    O módulo de distância a laser é conectado nos pinos do
                    Labrador. O VCC, SDATA e SCLK são conectados nos pinos 1,
                    3 e 5 (respectivamente). Já o GND do sensor é conectado
                    no pino 9.
                  </span>
                </li>
                <li className="flex flex-col gap-1 rounded-lg border border-slate-700/50 bg-slate-900/50 p-3 text-slate-300 sm:flex-row sm:gap-3">
                  <span className="shrink-0 font-mono font-bold text-slate-400">
                    ESP32-CAM
                  </span>
                  <span>
                    A ESP32-CAM não precisa ser conectada diretamente no
                    Labrador. Basta que o código certo esteja carregado no
                    seu ambiente e conectado via USB em uma fonte de energia
                    5V.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Circuit;
