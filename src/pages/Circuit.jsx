import { Cpu, Zap, Wrench } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Esp32ov2640 from "../assets/img/circuit/Ov2640.png";
import Receptorov2640 from "../assets/img/circuit/Receptor.png";
import Sbc from "../assets/img/circuit/Labrador.png";
import Painel from "../assets/img/circuit/Painel7P.png";
import Case from "../assets/img/circuit/Case.png";
import ModuleVL53L0X from "../assets/img/circuit/Modulovl53l0x.png";
import Totem_Prototipo from "../assets/img/circuit/Totem-Prototipo.jpeg";

const Circuit = () => {
  const componentes = [
    {
      id: "Módulo VL530X",
      nome: "Módulo de Distância VL530X",
      descricao:
        "Sensor de distância a laser VL53L0X utilizado para detectar a proximidade do usuário no TotemID. Realiza medições precisas em tempo real via comunicação I2C, permitindo ativar automaticamente o reconhecimento facial quando alguém se aproxima do sistema.",
      imagem: ModuleVL53L0X,
    },
    {
      id: "Esp32cam ov2640",
      nome: "Módulo ESP32-CAM",
      descricao:
        "O 'olho' do TotemID. Responsável por capturar as imagens do usuário em tempo real usando o sensor OV2640 e enviá-las via Wi-Fi para o servidor Python, onde a IA realiza o reconhecimento. Também pode acionar o relé de acesso.",
      imagem: Esp32ov2640,
    },
    {
      id: "Receptor ov2640",
      nome: "Módulo ESP32-CAM",
      descricao:
        "Placa auxiliar essencial para o ESP32-CAM. Facilita a gravação do firmware via USB e garante uma alimentação de energia estável (5V) durante a operação contínua do hardware, evitando reinícios inesperados.",
      imagem: Receptorov2640,
    },
    {
      id: "SBC",
      nome: "SBC - Labrador",
      descricao:
        "O 'cérebro' local do totem. Este Single Board Computer (computador de placa única) processa a interface do sistema, gerencia o painel de exibição e coordena a interação do usuário com o sistema de validação.",
      imagem: Sbc,
    },
    {
      id: "Painel",
      nome: "Painel IPS 7P",
      descricao:
        "A interface visual de comunicação. Uma tela IPS de 7 polegadas onde o usuário interage com o TotemID, visualizando instruções, o retorno da câmera e alertas de acesso liberado ou negado com alta nitidez.",
      imagem: Painel,
    },
    {
      id: "CASE3D",
      nome: "CASE 3D",
      descricao:
        "A estrutura física protetora. Uma carcaça modelada e impressa em 3D, projetada sob medida para acomodar a eletrônica, organizar a fiação e fixar o painel, garantindo um acabamento profissional ao totem.",
      imagem: Case,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <PageHeader
          icon={Cpu}
          iconColor="text-indigo-400"
          title="Montagem do Circuito"
          description="Lista de materiais utilizados e esquema de montagem do hardware do TotemID. A arquitetura foi pensada para ser de baixo custo e fácil de reproduzir."
          descriptionMaxWidth="max-w-3xl"
          backTo="/wiki"
          backLabel="Voltar para a Wiki"
        />

        {/* Seção 1: Lista de Componentes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Wrench className="text-slate-400 h-6 w-6" />
            Componentes Necessários
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentes.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors group"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.nome}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 2: Protótipo Final / Esquemático */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="text-yellow-400 h-6 w-6" />
            Protótipo Final & Esquemático
          </h2>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center shadow-xl">
            {/* Imagem do diagrama/protótipo */}
            <div className="w-full lg:w-1/2 aspect-4/3 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden relative">
              <img
                src={Totem_Prototipo}
                alt="Diagrama do Circuito"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Explicação da montagem */}
            <div className="w-full lg:w-1/2 space-y-4">
              <h3 className="text-xl font-bold text-white">
                Esquema de Ligações
              </h3>
              <p className="text-slate-400 leading-relaxed">
                A montagem do circuito é relativamente simples, focando na
                alimentação e na comunicação do ESP32-CAM com o módulo de
                acesso.
              </p>

              <ul className="space-y-3 mt-4">
                <li className="flex gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="font-mono text-red-400 font-bold">
                    Modulo VL53L0X
                  </span>
                  <span>
                    O módulo de distância a laser é conectado nos pinos do
                    labrador. O VCC, SDATA e SCLK são conectados nos pinos 1, 3,
                    e 5 (Respectivamente). Enquanto o GND do sensor é conectado
                    no pino 9.
                  </span>
                </li>
                <li className="flex gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="font-mono text-slate-500 font-bold">
                    ESPCAM
                  </span>
                  <span>
                    A ESPCAM não precisa ser conectada diretamente no Labrador.
                    Basta que o código certo esteja carregado no seu ambiente e
                    conectado via usb em uma fonte de energia 5V.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Circuit;
