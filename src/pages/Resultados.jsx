import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Clock,
  Zap,
  Target,
  Percent,
  Users,
  Thermometer,
  CheckCircle2,
  ImageOff,
  X,
  ExternalLink,
  Github,
  Quote,
} from "lucide-react";
import Container from "../components/ui/Container";

const GALLERY_BASE = `${import.meta.env.BASE_URL}img/resultados/`;

const galeria = [
  {
    id: "encerramento",
    src: `${GALLERY_BASE}apresentacao-encerramento.jpg`,
    alt: "Slide de encerramento da apresentação do TCC",
    legenda: "Encerramento da apresentação do artigo científico",
  },
  {
    id: "banca-1",
    src: `${GALLERY_BASE}banca-defesa-1.jpg`,
    alt: "Victor Sarrís com o orientador e a banca examinadora após a defesa",
    legenda: "Com o orientador Prof. Ronaldo Borges e a banca examinadora",
  },
  {
    id: "banca-2",
    src: `${GALLERY_BASE}banca-defesa-2.jpg`,
    alt: "Banca examinadora em frente ao slide de título do TCC",
    legenda: "Defesa perante a banca — IFPI Campus Floriano, 09/07/2026",
  },
];

const metricas = [
  {
    icon: Zap,
    color: "text-cyan-400",
    valor: "≈ 1,3s",
    label: "Tempo de inferência do totem",
    sub: "1253–1352 ms por validação, medidos em laboratório",
  },
  {
    icon: Clock,
    color: "text-amber-400",
    valor: "7min 51s",
    label: "Pico de espera no processo manual",
    sub: "maior tempo cronometrado em clínica real",
  },
  {
    icon: Target,
    color: "text-blue-400",
    valor: "≤ 0,3",
    label: "Limiar de distância euclidiana",
    sub: "critério técnico que decide liberar o acesso",
  },
  {
    icon: Percent,
    color: "text-emerald-400",
    valor: "56,4%–75,2%",
    label: "Confiança nos acessos liberados",
    sub: "faixa observada nas autenticações bem-sucedidas",
  },
  {
    icon: Users,
    color: "text-indigo-400",
    valor: "14",
    label: "Atendimentos cronometrados",
    sub: "em 3 clínicas de Floriano-PI, para a linha de base",
  },
  {
    icon: Thermometer,
    color: "text-rose-400",
    valor: "50,6–75,9°C",
    label: "Temperatura do hardware sob carga",
    sub: "sem falhas de superaquecimento (throttling)",
  },
];

const comparativo = [
  {
    clinica: "Clínica Oftalmológica",
    n: 4,
    faixa: "5min 15s – 7min 51s",
    media: "≈ 6min 15s",
  },
  {
    clinica: "Clínica Odontológica",
    n: 5,
    faixa: "3min 45s – 6min 11s",
    media: "≈ 4min 57s",
  },
  {
    clinica: "Clínica Multidisciplinar",
    n: 5,
    faixa: "3min 29s – 5min 28s",
    media: "≈ 4min 40s",
  },
];

const hipoteses = [
  {
    tag: "H1",
    titulo: "Redução do tempo de credenciamento",
    texto:
      "Enquanto o processo manual (em clínica real, sujeito a filas e imprevistos) chegou a picos de 7min 51s, o totem concluiu a inferência e validação em cerca de 1,3s em ambiente de laboratório controlado. A diferença de ordens de grandeza (minutos versus segundos) evidencia o potencial da solução, ainda que a comparação direta entre os dois cenários não substitua um teste de campo controlado — recomendado como trabalho futuro.",
  },
  {
    tag: "H2",
    titulo: "Precisão dos embeddings mitiga falhas humanas",
    texto:
      "O maior gargalo relatado pelos atendentes foi justamente o paciente esquecer ou demorar para entregar documentos físicos. Ao usar o próprio rosto como credencial — intransferível e imune a esquecimentos — o sistema contorna esse problema, mantendo margens de confiança consistentes (56,4% a 75,2%) nos acessos liberados.",
  },
  {
    tag: "H3",
    titulo: "Credenciamento sem contato",
    texto:
      "O sensor de distância VL53L0X aciona a câmera automaticamente quando o paciente se aproxima a 80cm, dispensando touchscreens, papéis ou cartões — validando a proposta de um fluxo clínico mais higiênico.",
  },
];

const GalleryImage = ({ foto, onOpen }) => {
  const [falhou, setFalhou] = useState(false);

  if (falhou) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-800/50 text-slate-600">
        <ImageOff className="h-8 w-8" />
        <span className="text-xs">Foto em breve</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <img
        src={foto.src}
        alt={foto.alt}
        onError={() => setFalhou(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="absolute bottom-2 left-2 right-2 translate-y-2 text-left text-xs font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        {foto.legenda}
      </span>
    </button>
  );
};

const Lightbox = ({ foto, onClose }) => {
  useEffect(() => {
    const aoTeclar = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>
      <figure
        className="flex max-h-full max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={foto.src}
          alt={foto.alt}
          className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-4 text-center text-sm text-slate-300">
          {foto.legenda}
        </figcaption>
      </figure>
    </div>
  );
};

const MetricCard = ({ icon, color, valor, label, sub }) => {
  const Icon = icon;
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
      <Icon className={`mb-3 h-6 w-6 ${color}`} />
      <div className="text-2xl font-extrabold text-white md:text-3xl">
        {valor}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-300">{label}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
};

const ComparativoCard = ({ clinica, n, faixa, media }) => (
  <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
      {clinica}{" "}
      <span className="text-slate-600">
        · {n} atendimento{n > 1 ? "s" : ""}
      </span>
    </h3>

    <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3">
      <div>
        <div className="text-xs text-slate-500">Manual (linha de base)</div>
        <div className="text-lg font-bold text-slate-200">{media}</div>
        <div className="text-xs text-slate-600">variação: {faixa}</div>
      </div>
      <span className="h-2 w-2 shrink-0 rounded-full bg-slate-500" />
    </div>

    <div className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
      <div>
        <div className="text-xs text-cyan-300/80">Totem (laboratório)</div>
        <div className="text-lg font-bold text-cyan-300">≈ 1,3s</div>
      </div>
      <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
    </div>
  </div>
);

const HipoteseCard = ({ tag, titulo, texto }) => (
  <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
    <div className="mb-3 flex items-center gap-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
        {tag} confirmada
      </span>
    </div>
    <h3 className="mb-2 text-lg font-bold text-white">{titulo}</h3>
    <p className="text-sm leading-relaxed text-slate-400">{texto}</p>
  </div>
);

const Resultados = () => {
  const [fotoAberta, setFotoAberta] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 py-8 font-sans text-slate-300 md:py-12">
      <Container size="xl">
        {/* Header */}
        <header className="mb-12 border-b border-slate-800 pb-8 md:mb-16 md:pb-10">
          <Link
            to="/site-totenzinho"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            ← Voltar para o início
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-300">
            <GraduationCap className="h-4 w-4" />
            Artigo Científico · TCC · IFPI Campus Floriano
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Resultados do TCC
          </h1>
          <p className="mt-3 max-w-3xl text-lg font-medium text-slate-200">
            Totem de Reconhecimento Facial em Computação de Borda: construção de
            um artefato tecnológico sob a ótica da Design Science Research
          </p>
          <p className="mt-4 max-w-3xl text-sm text-slate-500">
            Victor Sarrís Silva Santos · Orientador: Prof. Me. Ronaldo Pires
            Borges · Tecnologia em Análise e Desenvolvimento de Sistemas ·
            Aprovado em 09/07/2026
          </p>
        </header>

        {/* Resumo */}
        <section className="mb-16">
          <div className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/50 p-6 md:p-8">
            <Quote className="h-8 w-8 shrink-0 text-amber-400/70" />
            <p className="leading-relaxed text-slate-300">
              O credenciamento manual de pacientes em clínicas gera filas,
              atrasos e falhas operacionais. Este trabalho desenvolveu e avaliou
              um totem de reconhecimento facial baseado em{" "}
              <strong className="text-slate-100">Computação de Borda</strong>{" "}
              (Edge Computing), capaz de validar a identidade do paciente de
              forma local, offline e sem contato — integrando um SBC Labrador,
              um módulo ESP32-CAM e um sensor de distância VL53L0X. Seguindo a
              metodologia{" "}
              <strong className="text-slate-100">
                Design Science Research (DSR)
              </strong>
              , a pesquisa cruzou dados reais de três clínicas de Floriano-PI
              com o desempenho do protótipo em ambiente de laboratório
              controlado.
            </p>
          </div>
        </section>

        {/* Métricas */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Números da avaliação
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metricas.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>
        </section>

        {/* Comparativo */}
        <section className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">
            Manual vs. Totem: o antes e o depois
          </h2>
          <p className="mb-8 max-w-3xl text-sm text-slate-500">
            Tempos cronometrados em campo (processo manual) contra o tempo de
            inferência do protótipo, medido separadamente em laboratório.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {comparativo.map((c) => (
              <ComparativoCard key={c.clinica} {...c} />
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-600">
            Os dois cenários foram medidos em contextos distintos — um em campo,
            sujeito às adversidades reais da recepção, e outro em laboratório,
            sob condições controladas. A diferença de ordens de grandeza é lida
            como evidência de viabilidade técnica, não como comprovação
            estatística direta da redução do tempo médio em ambiente real.
          </p>
        </section>

        {/* Hipóteses */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Hipóteses da pesquisa
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {hipoteses.map((h) => (
              <HipoteseCard key={h.tag} {...h} />
            ))}
          </div>
        </section>

        {/* Galeria */}
        <section className="mb-16">
          <h2 className="mb-2 text-2xl font-bold text-white">
            Bastidores da apresentação
          </h2>
          <p className="mb-8 max-w-3xl text-sm text-slate-500">
            Registros da defesa do artigo científico perante a banca examinadora
            do IFPI — Campus Floriano.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((foto) => (
              <GalleryImage
                key={foto.id}
                foto={foto}
                onOpen={() => setFotoAberta(foto)}
              />
            ))}
          </div>
        </section>

        {/* Limitações e trabalhos futuros */}
        <section className="mb-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-white">Limitações</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
              <li>• Janela de desenvolvimento delimitada a seis meses.</li>
              <li>
                • Linha de base restrita a três clínicas, devido à recusa de
                outras instituições em autorizar a cronometragem.
              </li>
              <li>
                • Artefato validado em laboratório controlado, e não em campo
                real com pacientes.
              </li>
              <li>
                • Sem testes segmentados por iluminação, tom de pele, gênero ou
                faixa etária.
              </li>
              <li>
                • Avaliação restrita ao fluxo de Identificação (1:N) sobre a
                base já cadastrada.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-white">
              Trabalhos futuros
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
              <li>
                • Algoritmos de prova de vida (liveness) contra fraudes com
                fotos impressas ou em telas.
              </li>
              <li>
                • Indexação por vizinho mais próximo aproximado (FAISS, Annoy,
                HNSW) para escalar além de um único turno.
              </li>
              <li>
                • API RESTful bidirecional para integração com Sistemas de
                Informação Hospitalar.
              </li>
              <li>
                • Testes de campo controlados no ambiente clínico real, para
                confirmar de forma conclusiva o ganho de desempenho.
              </li>
            </ul>
          </div>
        </section>

        {/* Links */}
        <section className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/40 p-8 text-center">
          <h2 className="text-xl font-bold text-white">Quer se aprofundar?</h2>
          <p className="max-w-xl text-sm text-slate-400">
            O código-fonte completo e a documentação técnica do projeto estão
            disponíveis publicamente.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/Victor-Sarris/Totem-Reconhecimento-Facial"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 font-medium text-slate-200 transition-colors hover:bg-slate-700"
            >
              <Github className="h-4 w-4" />
              Repositório no GitHub
            </a>
            <a
              href="https://bia.ifpi.edu.br/jspui/bitstream/123456789/5776/8/2026_tcc_vsssantos.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-900/30 transition-colors hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              Ver Tcc
            </a>
          </div>
        </section>
      </Container>

      {fotoAberta && (
        <Lightbox foto={fotoAberta} onClose={() => setFotoAberta(null)} />
      )}
    </div>
  );
};

export default Resultados;
