import React from "react";
import DocsLayout from "../../components/ui/DocsLayout";
import CodeBlock from "../../components/ui/CodeBlock";

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
    <DocsLayout>
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h1 className="mb-4 text-3xl font-bold text-white">
          05. Criação de AutoStart File
        </h1>
        <p className="text-lg text-slate-400">
          Configure o Labrador para iniciar o sistema de reconhecimento
          facial automaticamente assim que for ligado.
        </p>
      </div>

      <section className="mb-12">
        <p className="leading-relaxed text-slate-300">
          Para que o sistema de reconhecimento facial inicie automaticamente
          na tela HDMI assim que o Labrador ligar, foi necessário configurar
          três componentes:{" "}
          <span className="font-bold">
            um script de shell, uma tarefa no crontab (root) para permissões
            de vídeo e uma entrada de desktop.
          </span>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Passo 1: Criação do Script de inicialização
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Este script prepara o ambiente, define a tela de exibição e
          executa o Python.
        </p>
        <p className="mb-4 leading-relaxed text-slate-300">
          <strong>Local: /home/caninos/iniciar.sh</strong>
        </p>
        <CodeBlock language="bash" code={iniciarshCode} fileName="iniciar.sh" />
        <p className="mt-4">
          <span className="font-bold text-red-500">Nota:</span> Permissão
          necessária. É preciso tornar o script executável:{" "}
          <span className="text-emerald-400">
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

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          2. Correção de Permissões de Vídeo (Crontab)
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Como o sistema roda o Xorg/LightDM como root, o usuário comum não
          tem permissão para ler o arquivo de autoridade original. Usamos o
          crontab do root para criar uma cópia acessível desse arquivo a
          cada reinicialização.
        </p>
        <p className="mb-2">Comandos:</p>
        <CodeBlock language="bash" code="crontab -e" />
        <p className="mb-4 mt-4 leading-relaxed text-slate-300">
          No final do arquivo, coloque:
        </p>
        <CodeBlock
          language="bash"
          code="@reboot sleep 20 && sudo cp /var/run/lightdm/root/:0 /home/caninos/.Xauthority && sudo chown caninos:caninos /home/caninos/.Xauthority && /home/caninos/Desktop/Reconhecimento-Facial/Script/iniciar.sh > /home/caninos/log_erro.txt 2>&1"
        />
        <p className="mt-4 mb-2">O que isso faz:</p>
        <ul className="ml-5 list-disc space-y-1 text-slate-300">
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

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold text-white">
          3. Atalho de Inicialização (.desktop)
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Diz ao ambiente gráfico para rodar o script iniciar.sh após o
          login
        </p>
        <p className="mb-4 leading-relaxed text-emerald-400">
          Arquivo: /home/caninos/.config/autostart/reconhecimento.desktop
        </p>
        <CodeBlock
          language="ini"
          code={reconhecimento_desktop}
          fileName="reconhecimento.desktop"
        />
        <p className="mb-4 mt-4 leading-relaxed text-slate-300">
          Para editar o arquivo .desktop:
        </p>
        <CodeBlock
          language="bash"
          code="nano /home/caninos/.config/autostart/reconhecimento.desktop"
        />
        <p className="mb-4 mt-4 leading-relaxed text-slate-300">
          Procure a linha que começa com Exec=. Ela deve apontar para onde
          está o seu script de inicialização (o iniciar.sh). Exemplo:
        </p>
        <CodeBlock
          language="bash"
          code="Exec=/home/caninos/Script/iniciar.sh"
        />
        <p className="mt-4 leading-relaxed text-slate-300">
          Para salvar, aperte Ctrl + O, Enter, e Ctrl + X para sair.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          4. Configuração de Login Automático (Auto-Login)
        </h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Para que o Totem funcione de forma autônoma (sem teclado/mouse), o
          sistema operacional deve entrar na conta do usuário
          automaticamente ao ligar, ignorando a tela de senha. Isso é
          crucial porque o script de autostart (configurado na etapa
          anterior) só é disparado após o login bem-sucedido.
        </p>
        <p className="mb-6 leading-relaxed text-slate-300">
          Utilizamos o gerenciador de display LightDM, padrão no
          Labrador/LXQt.
        </p>

        <ol className="list-decimal space-y-8 pl-5 text-slate-300">
          <li>
            <p className="mb-4 leading-relaxed">
              Arquivo de Configuração. Edite o arquivo de configuração do
              LightDM com permissões de superusuário:
            </p>
            <CodeBlock
              language="bash"
              code="sudo nano /etc/lightdm/lightdm.conf"
            />
          </li>
          <li>
            <p className="mb-4 leading-relaxed">
              Parâmetros de Autologin. Localize a seção [Seat:*]. Por
              padrão, as linhas de autologin estarão comentadas (com # na
              frente). Você deve remover o comentário e definir o usuário do
              sistema (no nosso caso, caninos).
            </p>
            <p className="mb-2 text-sm font-semibold text-slate-500">
              Antes (Desativado):
            </p>
            <CodeBlock language="ini" code={lightdm_after} />

            <p className="mt-4 mb-2 text-sm font-semibold text-slate-500">
              Depois (Ativado):
            </p>
            <CodeBlock language="ini" code={lightdm_before} />
            <p className="mt-4 leading-relaxed">
              Nota: Certifique-se de remover o símbolo # do início das
              linhas para que o comando seja interpretado pelo sistema.
            </p>
          </li>
          <li>
            <p className="mb-4 leading-relaxed">
              Validação. Após salvar o arquivo, reinicie o sistema para
              testar:
            </p>
            <CodeBlock language="bash" code="sudo reboot" />
            <p className="mt-4 leading-relaxed">
              Comportamento Esperado: O sistema deve iniciar, mostrar
              brevemente o logo do Labrador e pular diretamente para a Área
              de Trabalho (ou abrir o Totem em tela cheia), sem nunca
              solicitar senha.
            </p>
          </li>
        </ol>
      </section>
    </DocsLayout>
  );
};

export default AutoStartFile;
