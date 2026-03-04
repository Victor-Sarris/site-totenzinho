import React from "react";
import { Cpu, ArrowLeft, Zap, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const Circuit = () => {
  // Lista de componentes do hardware
  const componentes = [
    {
      id: "esp32cam",
      nome: "Módulo ESP32-CAM",
      descricao:
        "O 'coração' do hardware. Captura o vídeo em tempo real e envia via Wi-Fi para o servidor Python processar a IA.",
      // Substitua por algo como "/img/esp32cam.jpg" depois
      imagem:
        "https://placehold.co/600x400/1e293b/94a3b8?text=Imagem+ESP32-CAM",
    },
    {
      id: "ftdi",
      nome: "Conversor USB-TTL (FTDI)",
      descricao:
        "Necessário apenas para gravar o firmware (código C++) no ESP32-CAM, já que ele não possui porta USB nativa.",
      imagem: "https://placehold.co/600x400/1e293b/94a3b8?text=Conversor+FTDI",
    },
    {
      id: "rele",
      nome: "Módulo Relé 5V (1 Canal)",
      descricao:
        "Atua como o interruptor eletrônico. Quando o rosto é reconhecido, o ESP32 aciona o relé para abrir a fechadura/trava.",
      imagem: "https://placehold.co/600x400/1e293b/94a3b8?text=Modulo+Rele",
    },
    {
      id: "fonte",
      nome: "Fonte de Alimentação 5V",
      descricao:
        "Fornece a energia necessária. O ESP32-CAM é sensível a quedas de tensão, então uma fonte de pelo menos 2A é recomendada.",
      imagem: "https://placehold.co/600x400/1e293b/94a3b8?text=Fonte+5V+2A",
    },
    {
      id: "jumpers",
      nome: "Jumpers Fêmea-Fêmea",
      descricao:
        "Fios para conectar os pinos do ESP32-CAM ao Relé e à fonte de alimentação sem necessidade de solda inicial.",
      imagem: "https://placehold.co/600x400/1e293b/94a3b8?text=Fios+Jumpers",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-8 lg:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-12 border-b border-slate-800 pb-8">
          <Link
            to="/wiki"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Wiki
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Cpu className="text-indigo-400 h-10 w-10" />
            Montagem do Circuito
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">
            Lista de materiais utilizados e esquema de montagem do hardware do
            TotemID. A arquitetura foi pensada para ser de baixo custo e fácil
            de reproduzir.
          </p>
        </header>

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
              {/* Substitua esta URL pela imagem do seu diagrama/foto do circuito */}
              <img
                src="https://placehold.co/800x600/0f172a/64748b?text=Foto+do+Prototipo\nou+Fritzing"
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
                  <span className="font-mono text-red-400 font-bold">5V</span>
                  <span>
                    O pino 5V do ESP32-CAM e o VCC do Relé vão para o positivo
                    da fonte.
                  </span>
                </li>
                <li className="flex gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="font-mono text-slate-500 font-bold">
                    GND
                  </span>
                  <span>
                    O pino GND do ESP32-CAM e o GND do Relé vão para o negativo
                    da fonte.
                  </span>
                </li>
                <li className="flex gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="font-mono text-indigo-400 font-bold">
                    I/O 4
                  </span>
                  <span>
                    Um pino digital (ex: GPIO 4 ou 12) vai para o pino "IN" do
                    Relé para enviar o sinal de abertura.
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
