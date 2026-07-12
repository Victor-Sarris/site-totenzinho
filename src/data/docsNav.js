// Estrutura única de navegação da Documentação.
// Usada pela SidebarDocs (menu lateral) e pelas páginas individuais (navegação Anterior/Próximo).
export const docsNav = [
  {
    group: "Guia de Configuração",
    items: [
      { title: "01. Criação de Ambiente Virtual (Venv)", path: "/documentacao/venv" },
      { title: "02. Instalação de Bibliotecas", path: "/documentacao/library-install" },
      { title: "03. Conectar ao Labrador via Putty (SSH)", path: "/documentacao/connection-ssh" },
      { title: "04. Controle Remoto pelo PC", path: "/documentacao/remote-labrador" },
      { title: "05. Criação de AutoStart File", path: "/documentacao/auto-start-file" },
    ],
  },
  {
    group: "Configurações Adicionais",
    items: [
      { title: "06. Monitoramento de Arquivo .log", path: "/documentacao/log-monitoring" },
      { title: "07. Rotas do Sistema", path: "/documentacao/routes" },
      { title: "08. Configuração de IP Estático", path: "/documentacao/ip-config" },
    ],
  },
];

// Lista achatada, na ordem de leitura — usada para calcular Anterior/Próximo.
export const docsFlatList = [
  { title: "Documentação do Código", path: "/documentacao" },
  ...docsNav.flatMap((g) => g.items),
];

export function getDocsSiblings(currentPath) {
  const index = docsFlatList.findIndex((item) => item.path === currentPath);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docsFlatList[index - 1] : null,
    next: index < docsFlatList.length - 1 ? docsFlatList[index + 1] : null,
  };
}
