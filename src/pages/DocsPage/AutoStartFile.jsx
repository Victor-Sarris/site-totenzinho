import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import SidebarDocs from "../../components/SidebarDocs";

// ===================== Componente de Bloco de Código =====================
const CodeBlock = ({ language, code }) => {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg mb-6 group relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 z-10 opacity-0 group-hover:opacity-100"
      >
        {copiado ? (
          <>
            <Check className="h-3.5 w-3.5 text-green-400" />
            <span className="text-green-400 font-medium">Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span className="font-medium">Copiar</span>
          </>
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          backgroundColor: "#0B1120",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const AutoStartFile = () => {
  const iniciarshCode = `[Unit]

#!/bin/bash

# Redireciona a saída para um arquivo de log para depuração
exec > /home/caninos/log_erro.txt 2>&1

echo "--- INICIO DO BOOT: $(date) ---"

# 1. Aguarda o carregamento da interface gráfica e do script do Crontab
sleep 25

# 2. Define a tela HDMI como alvo
export DISPLAY=:0

# 3. Define o arquivo de autoridade X11 (Copiado pelo Crontab)
export XAUTHORITY=/home/caninos/.Xauthority

# 4. Libera permissões gráficas adicionais
xhost +

# 5. Navega até a pasta do projeto e executa
echo "[INFO] Iniciando o Python..."
cd /home/caninos/Desktop/Reconhecimento-Facial-main/Script
source venv/bin/activate

# O parâmetro -u força o log em tempo real (unbuffered)
python3 -u 03_reconhecer.py
`;

  const reconhecimento_desktop = `

[Desktop Entry]
Type=Application
Name=Reconhecimento Facial
Comment=Inicia o sistema de acesso automaticamente
Exec=/home/caninos/iniciar.sh
Terminal=true
Hidden=false
X-GNOME-Autostart-enabled=true
`;

  const lightdm_after = `

Ini, TOML
[Seat:*]
...
#autologin-user=
#autologin-user-timeout=0
...

`;
  const lightdm_before = `

Ini, TOML
[Seat:*]
...
autologin-user=caninos
autologin-user-timeout=0
...

`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex font-sans">
      <SidebarDocs />

      <main className="flex-1 w-full max-w-3x1 md:ml-72 p-4 md:p-8 lg:p-12 max-w-3xl mx-auto overflow-x-hidden">
        {/* Título Principal */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            05. Criação de AutoStart File
          </h1>
          <p className="text-lg text-slate-400">
            Configure o Labrador para iniciar o sistema de reconhecimento facial
            automaticamente assim que for ligado.
          </p>
        </div>

        {/* Introdução */}
        <section className="mb-12">
          <p className="text-slate-300 leading-relaxed">
            Para que o sistema de reconhecimento facial inicie automaticamente
            na tela HDMI assim que o Labrador ligar, foi necessário configurar
            três componentes:{" "}
            <span className="font-bold">
              um script de shell, uma tarefa no crontab (root) para permissões
              de vídeo e uma entrada de desktop.
            </span>
          </p>
        </section>

        {/* Passo 1: Criação do Script de inicialização */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Passo 1: Criação do Script de inicialização
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Este script prepara o ambiente, define a tela de exibição e executa
            o Python.
          </p>
          <p className="text-slate-300 mb-4 leading-relaxed">
            <strong>Local: /home/caninos/iniciar.sh</strong>
          </p>
          <CodeBlock language="bash" code={iniciarshCode} />
          <p>
            <span className="font-bold text-red-500">Nota:</span> Permissão
            necessária. É preciso tornar o script exevcutável:{" "}
            <span className="text-green-500">
              chmod +x /home/caninos/iniciar.sh
            </span>
          </p>
          <p className="mt-2.5">Para fazer a edição do iniciar.sh:</p>
          <CodeBlock language="bash" code="nano /home/caninos/iniciar.sh" />
          <p className="mt-2.5">
            Procure a linha que tem cd e atualize para a nova pasta correta.
          </p>
          <p className="mt-2.5">
            Para salvar, aperte Ctrl + O, Enter, e Ctrl + X para sair.
          </p>
        </section>

        {/* 2. Correção de Permissões de Vídeo (Crontab) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Correção de Permissões de Vídeo (Crontab)
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Como o sistema roda o Xorg/LightDM como root, o usuário comum não
            tem permissão para ler o arquivo de autoridade original. Usamos o
            crontab do root para criar uma cópia acessível desse arquivo a cada
            reinicialização.
          </p>
          <p>Comandos:</p>
          <CodeBlock language="bash" code="sudo contrab -e" />
          <p className="text-slate-300 mb-4 leading-relaxed">
            No final do arquivo, coloque:
          </p>
          <CodeBlock
            language="bash"
            code="@reboot sleep 20 && cp /var/run/lightdm/root/:0 /home/caninos/.Xauthority && chown caninos:caninos /home/caninos/.Xauthority"
          />
          <p>O que isso faz:</p>
          <ul className="list-disc ml-7 mt-2.5">
            <li>Espera 20 segundos após o boot</li>
            <li>
              Copia a "chave" da tela (:0) da pasta restrita do sistema para a
              pasta do usuário.
            </li>
            <li>
              Muda o dono do arquivo para o usuário caninos, permitindo que o
              script o leia.
            </li>
          </ul>
        </section>

        {/* 3. Atalho de Inicialização (.desktop) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Atalho de Inicialização (.desktop)
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Diz ao ambiente gráfico para rodar o script iniciar.sh após o login
          </p>
          <p className="text-green-500 mb-4 leading-relaxed">
            Arquivo: /home/caninos/.config/autostart/reconhecimento.desktop
          </p>
          <CodeBlock language="bash" code={reconhecimento_desktop} />
          <p className="text-slate-300 mb-4 leading-relaxed">
            Para editar o arquivo .desktop:
          </p>
          <CodeBlock
            language="bash"
            code="nano /home/caninos/.config/autostart/reconhecimento.desktop"
          />
          <p className="text-slate-300 mb-4 leading-relaxed">
            Procure a linha que começa com Exec=. Ela deve apontar para onde
            está o seu script de inicialização (o iniciar.sh). Exemplo:
          </p>
          <CodeBlock
            language="bash"
            code="Exec=/home/caninos/Script/iniciar.sh"
          />
          <p className="text-slate-300 mb-4 leading-relaxed">
            Para salvar, aperte Ctrl + O, Enter, e Ctrl + X para sair.
          </p>
        </section>

        {/* 4. Configuração de Login Automático (Auto-Login) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Configuração de Login Automático (Auto-Login)
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Para que o Totem funcione de forma autônoma (sem teclado/mouse), o
            sistema operacional deve entrar na conta do usuário automaticamente
            ao ligar, ignorando a tela de senha. Isso é crucial porque o script
            de autostart (configurado na etapa anterior) só é disparado após o
            login bem-sucedido.
          </p>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Utilizamos o gerenciador de display LightDM, padrão no
            Labrador/LXQt.
          </p>
          <ul className="list-decimal">
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Arquivo de Configuração Edite o arquivo de configuração do
                LightDM com permissões de superusuário:
              </p>
              <CodeBlock
                language="bash"
                code="sudo nano /etc/lightdm/lightdm.conf"
              />
            </li>
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Parâmetros de Autologin Localize a seção [Seat:*]. Por padrão,
                as linhas de autologin estarão comentadas (com # na frente).
                Você deve remover o comentário e definir o usuário do sistema
                (no nosso caso, caninos).
              </p>
              <p>Antes (Desativado):</p>
              <CodeBlock language="bash" code={lightdm_after} />

              <p>Depois (Ativado):</p>
              <CodeBlock language="bash" code={lightdm_before} />
              <p className="text-slate-300 mb-4 leading-relaxed">
                Nota: Certifique-se de remover o símbolo # do início das linhas
                para que o comando seja interpretado pelo sistema.
              </p>
            </li>
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Validação Após salvar o arquivo, reinicie o sistema para testar:
              </p>
              c
              <p className="text-slate-300 mb-4 leading-relaxed">
                Comportamento Esperado: O sistema deve iniciar, mostrar
                brevemente o logo do Labrador e pular diretamente para a Área de
                Trabalho (ou abrir o Totem em tela cheia), sem nunca solicitar
                senha.
              </p>
            </li>
          </ul>
        </section>

        {/* Monitoramento de Arquivo .Log */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Monitoramento de Arquivo .Log
          </h2>
          <ul className="list-disc">
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Ver o histórico completo (Estático) Este comando exibe todo o
                conteúdo do arquivo de log de uma só vez. Útil para ler o que
                aconteceu desde o momento que o Labrador ligou.
              </p>
              <CodeBlock
                language="bash"
                code="cat /home/caninos/log_erro.txt"
              />
            </li>
            <li>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Monitorar em Tempo Real (Dinâmico) Este é o comando mais usado
                durante testes. Ele mostra as novas linhas assim que elas
                aparecem (como o status da conexão ou o reconhecimento facial
                acontecendo ao vivo).
              </p>
              <CodeBlock
                language="bash"
                code="tail -f /home/caninos/log_erro.txt"
              />
              <p className="text-slate-300 mb-4 leading-relaxed">
                (Para sair deste modo e voltar ao terminal, pressione Ctrl + C).
              </p>
            </li>
          </ul>
        </section>

        {/* Estrutura de Pastas esperada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Estrutura de Pastas esperada
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            O sistema assume que o projeto está localizado em:
          </p>
          <CodeBlock
            language="bash"
            code="/home/caninos/Desktop/Reconhecimento-Facial"
          />
        </section>

        <div className="bg-green-900/20 border border-green-800/50 p-6 rounded-xl mt-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            Tudo Pronto!
          </h3>
          <p className="text-slate-300">
            Se o status mostrar{" "}
            <span className="text-green-400 font-semibold">
              active (running)
            </span>
            , parabéns! Seu totem agora iniciará o script de reconhecimento
            facial sozinho toda vez que for energizado.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AutoStartFile;
