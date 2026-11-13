/* ==========================================================================
   ANO 4 — EVOLUÇÃO E ESPECIALIZAÇÃO (encontros 37 a 48)
   Cada item reúne as três partes de um encontro:
     tema ..... o mesmo formato de js/temas.js
     slides ... o mesmo formato de js/slides.js
     pratica .. o mesmo formato de js/praticas.js
   No final do arquivo, os itens são acrescentados às listas existentes.
   Campo extra usado aqui: tema.prints (pares de telas "antes e depois").

   Dados de mercado, empresas, taxas e versões foram conferidos em novembro
   de 2026 nas fontes citadas em cada tema. Eles mudam: quem apresenta deve
   conferir de novo antes do encontro.
   ========================================================================== */

const ANO_4 = [
  /* ===================== 37 — Migração de front-end, parte 1 ===================== */
  {
    tema: {
      titulo: "Migração de front-end legado, parte 1: diagnóstico e estratégia",
      cat: "front", nivel: "Intermediário", perfil: "Front-end sênior ou liderança técnica",
      resumo: "Primeiro de três encontros sobre levar um front-end antigo para uma plataforma nova, com novo design e novas funcionalidades. Começamos pelo que vem antes do código: entender o que existe, decidir a estratégia e definir como saberemos que deu certo.",
      teoria: [
        "Por que migrar, e quando não migrar",
        "Inventário do legado: telas, uso real e regras escondidas",
        "Estratégias: de uma vez, incremental ou lado a lado",
        "Convivência entre o antigo e o novo: rotas, sessão e navegação",
        "Plano de migração e métricas de sucesso"
      ],
      prints: [
        { titulo: "Lista de pedidos", antes: "img/migracao/legado-lista.png", depois: "img/migracao/novo-lista.png",
          nota: "Antes: 11 colunas com siglas, 5 ações por linha, largura fixa. Depois: 5 colunas, situação por extenso, indicadores, busca e filtros." },
        { titulo: "A mesma tela no celular", antes: "img/migracao/legado-celular.png", depois: "img/migracao/novo-celular.png",
          nota: "Antes: a página de 1240 px exige rolagem lateral. Depois: o layout se reorganiza e a tabela vira cartões." }
      ],
      pratica: {
        titulo: "Raio-x do nosso legado",
        passos: [
          "Listar as telas do sistema atual com frequência de uso (dados de acesso ou de analytics)",
          "Classificar cada tela por valor para o usuário e por risco de migração",
          "Escolher a primeira tela a migrar e registrar a linha de base de erros e de tempo de carregamento"
        ]
      },
      discussao: [
        "O que no nosso front-end atual mais atrasa as entregas?",
        "Que tela, se migrada primeiro, provaria o valor da migração para o negócio?"
      ],
      refs: ["StranglerFigApplication — Martin Fowler", "Working Effectively with Legacy Code — Michael Feathers"]
    },
    slides: {
      gancho: "Se pudéssemos reescrever o front-end do zero, em quanto tempo o usuário veria alguma diferença?",
      abertura: [
        "Reescrever tudo de uma vez é a aposta mais cara e mais arriscada",
        "A migração só se justifica pelo que entrega ao usuário e ao time",
        "Quem pula o diagnóstico descobre as regras escondidas em produção"
      ],
      teoria: [
        ["Bons motivos: tecnologia sem suporte, mudança cara, falhas de segurança, impossibilidade de uso no celular", "Maus motivos: moda, tédio do time, código feio que funciona e quase não muda", "Alternativa a considerar: modernizar por dentro, sem trocar de plataforma"],
        ["Liste telas, rotas, relatórios e integrações", "Use dados de acesso: muitas telas quase não são usadas e não precisam migrar", "Procure regras de negócio escondidas no front: validações, cálculos e permissões"],
        ["De uma vez: uma virada só, longo período sem entregar valor, risco alto", "Incremental (figueira estranguladora): tela a tela, valor contínuo, exige convivência", "Lado a lado: os dois sistemas completos por um tempo, custo dobrado de manutenção"],
        ["Um roteador ou proxy decide, por rota, quem atende: antigo ou novo", "Login único: a sessão precisa valer nos dois lados", "O usuário não deve perceber a fronteira: mesmo menu e mesmos endereços"],
        ["Ordem das telas: comece por valor alto e risco baixo", "Defina pronto: paridade de funções, testes, acessibilidade e desempenho", "Meça antes: erros, tempo de carregamento, chamados de suporte e tempo por tarefa"]
      ],
      preparo: "Peça antes ao time de infraestrutura os dados de acesso por tela dos últimos três meses."
    },
    pratica: {
      intro: "O inventário de uma plataforma fictícia (GestorPed 2.4, em exemplos/migracao/legado.html), a matriz de priorização e a configuração de convivência por rota.",
      blocos: [
        { nome: "Inventário e priorização", tabela: {
          colunas: ["Tela", "Acessos por mês", "Valor", "Risco", "Decisão"],
          linhas: [
            ["Consulta de pedidos", "18.400", "Alto", "Baixo", "1ª a migrar: muito usada e só leitura"],
            ["Inclusão de pedido", "6.900", "Alto", "Alto", "2ª: regras de preço e desconto no front"],
            ["Cadastro de clientes", "2.100", "Médio", "Médio", "3ª"],
            ["Relatório de comissões", "310", "Médio", "Alto", "Depois: cálculo complexo, poucos usuários"],
            ["Curva ABC", "12", "Baixo", "Médio", "Não migrar: substituir por exportação"],
            ["Reimpressão de pedido", "4", "Baixo", "Baixo", "Não migrar: confirmar com os usuários e desligar"]
          ]
        } },
        { nome: "Regras escondidas encontradas no front", tabela: {
          colunas: ["Onde", "Regra", "O que fazer"],
          linhas: [
            ["Inclusão de pedido", "Desconto máximo de 5% calculado em JavaScript", "Mover para a API antes de migrar a tela"],
            ["Inclusão de pedido", "Campo Transportadora obrigatório só para frete CIF", "Documentar e cobrir com teste"],
            ["Consulta de pedidos", "Vendedor só enxerga os próprios pedidos (filtro no front)", "Falha de segurança: corrigir na API já"],
            ["Todas", "Sessão expira em 20 minutos sem aviso", "Novo: aviso e renovação automática"]
          ]
        } },
        { nome: "nginx.conf — convivência por rota", codigo: `# O usuário acessa sempre o mesmo endereço.
# O proxy decide, por rota, se quem responde é o sistema novo ou o antigo.

upstream legado { server legado.interno:8080; }
upstream novo   { server novo.interno:3000; }

server {
  listen 443 ssl;
  server_name pedidos.empresa.com;

  # Telas já migradas
  location /pedidos        { proxy_pass http://novo; }
  location /assets-novo/   { proxy_pass http://novo; }

  # A API é a mesma para os dois
  location /api/           { proxy_pass http://api.interno:8000; }

  # Todo o resto continua no legado
  location /               { proxy_pass http://legado; }
}` },
        { nome: "Linha de base (medir antes de começar)", tabela: {
          colunas: ["Métrica", "Como medir", "Valor hoje"],
          linhas: [
            ["Tempo para a lista de pedidos aparecer", "Lighthouse e dados de usuários reais", "Preencher"],
            ["Erros de JavaScript por dia", "Ferramenta de monitoramento de erros", "Preencher"],
            ["Chamados de suporte sobre uso da tela", "Sistema de chamados", "Preencher"],
            ["Tempo para incluir um pedido", "Observação de três usuários", "Preencher"],
            ["Acessos pelo celular", "Dados de acesso", "Preencher"]
          ]
        } }
      ],
      observar: "Duas telas do inventário nem precisam migrar. E o filtro de vendedor feito só no front é uma falha que a migração revelou, não criou."
    }
  },

  /* ===================== 38 — Migração de front-end, parte 2 ===================== */
  {
    tema: {
      titulo: "Migração de front-end legado, parte 2: novo design e migração tela a tela",
      cat: "front", nivel: "Avançado", perfil: "Front-end e Design",
      resumo: "Segundo encontro da série. Com a estratégia definida, construímos a base da plataforma nova (design system e camada de dados) e migramos a primeira tela sem quebrar o que já funciona.",
      teoria: [
        "Do layout antigo ao design system: auditoria de interface e tokens",
        "Redesenhar o fluxo, não copiar a tela",
        "Camada de dados: um adaptador entre a API legada e o modelo novo",
        "Passo a passo de uma tela: caracterizar, construir, comparar e trocar",
        "Estado, rotas e autenticação durante a convivência"
      ],
      prints: [
        { titulo: "Inclusão de pedido", antes: "img/migracao/legado-form.png", depois: "img/migracao/novo-form.png",
          nota: "Antes: 14 campos com siglas, obrigatoriedade por asterisco e erro em janela de alerta. Depois: 4 campos, rótulos claros, erro junto ao campo e rascunho salvo sozinho." }
      ],
      pratica: {
        titulo: "Migrar uma tela de verdade",
        passos: [
          "Escrever testes de ponta a ponta que descrevem o comportamento da tela antiga",
          "Construir a tela nova com os componentes do design system e o adaptador de dados",
          "Rodar os mesmos testes contra a tela nova e trocar a rota no proxy"
        ]
      },
      discussao: [
        "Quantas variações de botão, tabela e formulário existem hoje no nosso sistema?",
        "Que campos das nossas telas ninguém preenche e poderiam sair?"
      ],
      refs: ["Refactoring UI — Adam Wathan e Steve Schoger", "Atomic Design — Brad Frost"]
    },
    slides: {
      gancho: "Se copiarmos cada tela antiga com tecnologia nova, o que o usuário ganha?",
      abertura: [
        "Migrar é a chance de corrigir o fluxo, não só de trocar a tecnologia",
        "Sem design system, a plataforma nova envelhece tão rápido quanto a antiga",
        "A primeira tela migrada define o padrão de todas as outras"
      ],
      teoria: [
        ["Faça capturas de todas as telas e conte as variações de cada componente", "Defina tokens: cores, espaçamentos, tipografia e raios", "Construa primeiro os componentes mais usados: botão, campo, tabela e selo de situação"],
        ["Parta da tarefa do usuário, não da tela existente", "Corte campos e colunas que ninguém usa: os dados de acesso mostram", "Troque siglas por palavras e erros genéricos por orientação"],
        ["A tela nova fala com um modelo limpo, não com o formato legado", "O adaptador traduz nomes, datas, códigos e valores em um único lugar", "Quando a API for modernizada, só o adaptador muda"],
        ["Caracterizar: testes que registram o que a tela antiga faz", "Construir e comparar: os mesmos testes, mais acessibilidade e desempenho", "Trocar: mudar a rota no proxy, com caminho de volta pronto"],
        ["Login único e renovação de sessão valem para os dois lados", "Links entre telas antigas e novas usam endereços estáveis", "Preferências do usuário não se perdem ao cruzar a fronteira"]
      ],
      preparo: "Deixe abertos lado a lado os arquivos exemplos/migracao/legado.html e novo.html para comparar o código das duas versões."
    },
    pratica: {
      intro: "A migração da consulta de pedidos da plataforma fictícia: os tokens do novo design, o adaptador que traduz o formato legado (executável) e o código da tela antes e depois.",
      blocos: [
        { nome: "Auditoria de interface do legado", tabela: {
          colunas: ["Componente", "Variações encontradas", "No design system novo"],
          linhas: [
            ["Botão", "9 estilos diferentes", "3: primário, secundário e de texto"],
            ["Tabela", "6 formatos de grade", "1 tabela, que vira cartões no celular"],
            ["Indicação de situação", "Letras (A, F, P, C, E) e cores variadas", "1 selo com texto por extenso"],
            ["Mensagem de erro", "Janela de alerta, texto vermelho, faixa amarela", "1 padrão: texto junto ao campo"],
            ["Campo de data", "Texto livre com máscara", "Seletor de data nativo"]
          ]
        } },
        { nome: "tokens.css", codigo: `:root {
  /* Cores */
  --fundo: #f5f6f8;
  --superficie: #ffffff;
  --tinta: #16191f;
  --tinta-suave: #5b6472;
  --acao: #2f5bd8;

  /* Situação do pedido: sempre cor + texto, nunca só cor */
  --ok: #17794a;       --ok-fundo: #e2f5ea;
  --alerta: #8a5a00;   --alerta-fundo: #fdf0d2;
  --erro: #b3261e;     --erro-fundo: #fbe7e5;

  /* Espaçamento e forma */
  --espaco-1: 0.25rem;
  --espaco-2: 0.5rem;
  --espaco-4: 1rem;
  --raio: 10px;
}` },
        { nome: "adaptador-de-pedidos.js", rodar: true, codigo: `// A API legada devolve siglas, datas em texto e valores formatados.
// O adaptador traduz tudo isso em um único lugar.

const SITUACOES = {
  A: "aberto",
  F: "faturado",
  P: "pendente",
  C: "cancelado",
  E: "enviado",
};

function paraData(texto) {                       // "13/11/2026" -> "2026-11-13"
  const [dia, mes, ano] = texto.split("/");
  return [ano, mes, dia].join("-");
}

function paraCentavos(texto) {                   // "1.249,90" -> 124990
  return Math.round(Number(texto.split(".").join("").replace(",", ".")) * 100);
}

function adaptarPedido(legado) {
  const situacao = SITUACOES[legado.SIT];
  if (!situacao) throw new Error("Situação desconhecida: " + legado.SIT);

  return {
    numero: Number(legado.NR_PED),
    cliente: { codigo: Number(legado.COD_CLI), nome: legado.RAZAO.trim() },
    emitidoEm: paraData(legado.DT_EMIS),
    situacao,
    totalEmCentavos: paraCentavos(legado.VL_TOTAL),
  };
}

const respostaDaApiLegada = {
  NR_PED: "0012841", DT_EMIS: "13/11/2026", COD_CLI: "000482",
  RAZAO: "COMERCIAL SANTOS & FILHOS LTDA  ", SIT: "A", VL_TOTAL: "1.249,90",
};

console.log(adaptarPedido(respostaDaApiLegada));
// {
//   numero: 12841,
//   cliente: { codigo: 482, nome: 'COMERCIAL SANTOS & FILHOS LTDA' },
//   emitidoEm: '2026-11-13',
//   situacao: 'aberto',
//   totalEmCentavos: 124990
// }` },
        { nome: "lista.js (antes) — trecho do legado", codigo: `// HTML montado por concatenação, sem escape, com índices mágicos
var h = "";
for (var i = 0; i < p.length; i++) {
  h += "<tr" + (i % 2 ? " class=par" : "") + ">";
  for (var j = 0; j < 9; j++) h += "<td>" + p[i][j] + "</td>";
  h += "<td><a href=#>Ver</a> | <a href=#>Alt</a> | <a href=#>Exc</a></td></tr>";
}
document.getElementById("grade").innerHTML = h;` },
        { nome: "lista.js (depois) — trecho do novo", codigo: `// Dados com nome, texto tratado como texto e um componente por conceito
const rotulos = { aberto: "Em aberto", faturado: "Faturado", pendente: "Aguardando pagamento" };

function selo(situacao) {
  const el = document.createElement("span");
  el.className = "selo selo--" + situacao;
  el.textContent = rotulos[situacao];
  return el;
}

function linhaDoPedido(pedido) {
  const linha = document.createElement("tr");
  linha.append(
    celula("#" + pedido.numero),
    celula(pedido.cliente.nome),
    celula(formatarData(pedido.emitidoEm)),
    celulaCom(selo(pedido.situacao)),
    celula(formatarMoeda(pedido.totalEmCentavos))
  );
  return linha;
}

tabela.append(...pedidos.map(adaptarPedido).map(linhaDoPedido));` },
        { nome: "Lista de conferência de uma tela migrada", tabela: {
          colunas: ["Item", "Como verificar"],
          linhas: [
            ["Paridade de funções", "Os testes escritos para a tela antiga passam na nova"],
            ["Regras de negócio", "Nenhuma regra ficou só no front: a API valida tudo"],
            ["Acessibilidade", "Uso só por teclado e auditoria automática sem erros"],
            ["Celular", "Tela utilizável em 390 px de largura, sem rolagem lateral"],
            ["Desempenho", "Igual ou melhor que a linha de base"],
            ["Caminho de volta", "Trocar a rota no proxy devolve a tela antiga em minutos"]
          ]
        } }
      ],
      observar: "A tela nova não conhece siglas nem formatos do legado: tudo passa pelo adaptador. Com textContent, o risco de XSS da versão antiga desaparece."
    }
  },

  /* ===================== 39 — Migração de front-end, parte 3 ===================== */
  {
    tema: {
      titulo: "Migração de front-end legado, parte 3: novas funcionalidades, lançamento e desligamento",
      cat: "front", nivel: "Avançado", perfil: "Front-end, QA e gestão",
      resumo: "Encerramento da série. Com as telas migradas, entregamos o que o legado não permitia, liberamos aos poucos para os usuários, medimos o resultado e desligamos o sistema antigo de vez.",
      teoria: [
        "Novas funcionalidades: o que o legado impedia",
        "Lançamento gradual: piloto, percentual de usuários e botão de voltar",
        "Medir o resultado contra a linha de base",
        "Comunicação, treinamento e canal de retorno",
        "Desligar o legado: redirecionar, remover e encerrar"
      ],
      prints: [
        { titulo: "O que a plataforma nova trouxe", antes: "img/migracao/legado-lista.png", depois: "img/migracao/novo-lista.png",
          nota: "Funcionalidades que não existiam: indicadores do mês, busca por texto, filtros rápidos por situação, exportação e uso no celular." },
        { titulo: "Uso em campo, pelo celular", antes: "img/migracao/legado-celular.png", depois: "img/migracao/novo-celular.png",
          nota: "Vendedores passam a consultar e criar pedidos no cliente, o que antes exigia voltar ao escritório." }
      ],
      pratica: {
        titulo: "Plano de lançamento da nossa migração",
        passos: [
          "Definir os grupos de liberação: time interno, clientes piloto e todos",
          "Combinar os critérios para avançar ou voltar em cada etapa",
          "Escrever a lista de desligamento do legado com responsáveis e datas"
        ]
      },
      discussao: [
        "Quem seriam os nossos usuários piloto e como ouviríamos o retorno deles?",
        "O que nos impediria de desligar o sistema antigo depois da migração?"
      ],
      refs: ["Accelerate — Nicole Forsgren, Jez Humble e Gene Kim", "Feature Toggles — Pete Hodgson (martinfowler.com)"]
    },
    slides: {
      gancho: "Quando uma migração termina: quando a tela nova entra no ar ou quando a antiga é apagada?",
      abertura: [
        "Usuário não pediu tecnologia nova: pediu resolver a tarefa melhor",
        "Lançar para todos de uma vez transforma qualquer erro em crise",
        "Legado que não é desligado vira dois sistemas para manter"
      ],
      teoria: [
        ["Comece pelas dores que o inventário revelou: busca, filtros, uso no celular", "Funcionalidade nova entra só na plataforma nova: é o incentivo para trocar", "Cada novidade tem uma métrica de adoção"],
        ["Etapas: time interno, usuários piloto, percentuais crescentes, todos", "O controle fica em uma chave de configuração, sem novo deploy", "Um botão de voltar para a versão antiga reduz a resistência e revela problemas"],
        ["Compare com a linha de base da parte 1", "Acompanhe erros, tempo de carregamento, tempo por tarefa e chamados", "Olhe também quem clicou em voltar para a versão antiga, e por quê"],
        ["Avise antes, com data e motivo", "Mostre o que mudou dentro do próprio sistema", "Tenha um canal de retorno visível e responda rápido nas primeiras semanas"],
        ["Redirecione os endereços antigos para os novos", "Remova o código, as rotas do proxy e a infraestrutura do legado", "Registre o que foi aprendido e encerre o projeto oficialmente"]
      ],
      preparo: "Traga a linha de base medida na parte 1 e a lista de telas já migradas."
    },
    pratica: {
      intro: "A liberação gradual por percentual de usuários (executável), o plano de lançamento em etapas e a lista de desligamento do legado.",
      blocos: [
        { nome: "liberacao-gradual.js", rodar: true, codigo: `// O mesmo usuário cai sempre no mesmo grupo, sem guardar nada no banco:
// o identificador vira um número de 0 a 99, comparado com o percentual liberado.

function grupoDoUsuario(usuarioId) {
  let soma = 0;
  for (const letra of String(usuarioId)) {
    soma = (soma * 31 + letra.charCodeAt(0)) % 100;
  }
  return soma;                                   // 0 a 99
}

function usaPlataformaNova(usuario, config) {
  if (usuario.preferiuVersaoAntiga) return false;        // botão "voltar"
  if (config.pilotos.includes(usuario.id)) return true;  // usuários piloto
  return grupoDoUsuario(usuario.id) < config.percentual;
}

const usuarios = Array.from({ length: 1000 }, (_, i) => ({ id: "usuario-" + i }));

for (const percentual of [0, 10, 50, 100]) {
  const config = { percentual, pilotos: ["usuario-7"] };
  const naNova = usuarios.filter((u) => usaPlataformaNova(u, config)).length;
  console.log("Liberado para " + percentual + "%:", naNova, "de 1000 usuários");
}

// Estabilidade: quem entrou com 10% continua dentro com 50%
const com10 = usuarios.filter((u) => usaPlataformaNova(u, { percentual: 10, pilotos: [] }));
const todosContinuam = com10.every((u) => usaPlataformaNova(u, { percentual: 50, pilotos: [] }));
console.log("Quem entrou com 10% continua com 50%:", todosContinuam);   // true` },
        { nome: "Plano de lançamento", tabela: {
          colunas: ["Etapa", "Quem", "Duração", "Avança se", "Volta se"],
          linhas: [
            ["1. Interno", "Time de desenvolvimento e suporte", "1 semana", "Nenhum erro grave aberto", "Qualquer perda de dados"],
            ["2. Piloto", "5 usuários que pediram para testar", "2 semanas", "Tarefas concluídas sem ajuda", "Usuários voltam para a versão antiga"],
            ["3. 10%", "Sorteio por usuário", "1 semana", "Erros e chamados dentro da linha de base", "Taxa de erro acima do dobro da linha de base"],
            ["4. 50%", "Sorteio por usuário", "1 semana", "Mesmos critérios", "Mesmos critérios"],
            ["5. 100%", "Todos, com botão de voltar", "4 semanas", "Menos de 2% usando o botão de voltar", "—"],
            ["6. Desligamento", "Botão de voltar removido", "—", "—", "—"]
          ]
        } },
        { nome: "Lista de desligamento do legado", tabela: {
          colunas: ["Item", "Responsável", "Feito"],
          linhas: [
            ["Nenhum acesso às telas antigas nos últimos 30 dias", "Infra", "☐"],
            ["Endereços antigos redirecionam para os novos", "Front-end", "☐"],
            ["Rotas do legado removidas do proxy", "Infra", "☐"],
            ["Relatórios e integrações que dependiam do legado conferidos", "Back-end", "☐"],
            ["Código do legado arquivado e removido do pipeline", "Front-end", "☐"],
            ["Servidores e licenças do legado encerrados", "Infra", "☐"],
            ["Documentação e treinamento atualizados", "QA e suporte", "☐"],
            ["Retrospectiva da migração registrada", "Gestão", "☐"]
          ]
        } }
      ],
      observar: "O percentual muda em configuração, sem deploy. Como o grupo é calculado a partir do identificador, ninguém fica alternando entre a versão antiga e a nova."
    }
  },

  /* ===================== 40 — Feature flags e testes A/B ===================== */
  {
    tema: {
      titulo: "Feature flags, testes A/B e entrega progressiva",
      cat: "infra", nivel: "Intermediário", perfil: "Back-end ou Front-end",
      resumo: "Separar publicar código de liberar funcionalidade. Aprofundamos a técnica usada no lançamento da migração: tipos de chave, experimentos com usuários e o cuidado para as chaves não virarem dívida.",
      teoria: [
        "Deploy não é lançamento: o que é uma feature flag",
        "Tipos de chave: lançamento, experimento, operação e permissão",
        "Testes A/B: hipótese, grupos, métrica e tamanho de amostra",
        "Ferramentas e o padrão OpenFeature",
        "Ciclo de vida: toda chave nasce com data para morrer"
      ],
      pratica: {
        titulo: "Uma chave de ponta a ponta",
        passos: [
          "Colocar uma funcionalidade nossa atrás de uma chave e publicar desligada",
          "Ligar para o time interno e depois para um percentual de usuários",
          "Remover a chave e o código antigo depois da liberação total"
        ]
      },
      discussao: [
        "Que funcionalidade recente teríamos lançado com menos risco usando uma chave?",
        "Quem pode ligar e desligar chaves em produção, e como isso fica registrado?"
      ],
      refs: ["Feature Toggles — Pete Hodgson (martinfowler.com)", "Trustworthy Online Controlled Experiments — Kohavi, Tang e Xu"]
    },
    slides: {
      gancho: "Por que publicar código em produção precisa ser o mesmo momento em que o usuário vê a novidade?",
      abertura: [
        "Branches longas existem porque o código não pode ir para produção incompleto",
        "Com chaves, o código vai todo dia e a liberação é uma decisão de negócio",
        "Desligar uma chave é mais rápido do que reverter um deploy"
      ],
      teoria: [
        ["A chave é um if controlado por configuração externa", "O código novo vai para produção desligado", "Ligar e desligar não exige novo deploy"],
        ["Lançamento: esconde o que está incompleto; vida curta", "Experimento: compara variações; dura o tempo do teste", "Operação e permissão: desligam recursos pesados ou liberam por plano; vida longa"],
        ["Hipótese escrita antes: 'a mudança X aumenta a métrica Y'", "Sorteio estável por usuário, com grupo de controle", "Amostra definida antes: parar cedo ao ver um resultado bom engana"],
        ["Código aberto: Unleash, GrowthBook, Flagsmith; comercial: LaunchDarkly", "OpenFeature: uma interface padrão, independente de fornecedor", "Para começar, um arquivo de configuração já resolve"],
        ["Chave esquecida é código morto com dois caminhos para testar", "Registre dono e data de remoção ao criar", "Inclua a remoção da chave na definição de pronto"]
      ],
      preparo: "Escolha uma funcionalidade pequena já pronta e deixe um serviço de chaves de código aberto rodando em container."
    },
    pratica: {
      intro: "Uma chave com OpenFeature, a análise de um teste A/B com dados fictícios (executável) e o inventário de chaves com data de remoção.",
      blocos: [
        { nome: "checkout.js — uso com OpenFeature", codigo: `const { OpenFeature } = require("@openfeature/server-sdk");

// O provedor (Unleash, GrowthBook, arquivo local...) é configurado uma vez,
// na inicialização. O resto do código não sabe qual é.
const chaves = OpenFeature.getClient();

async function finalizarCompra(usuario, carrinho) {
  const contexto = { targetingKey: usuario.id, plano: usuario.plano };

  // false é o valor padrão: se o serviço de chaves cair, vale o caminho antigo
  const novoCheckout = await chaves.getBooleanValue("novo-checkout", false, contexto);

  return novoCheckout
    ? checkoutEmUmaEtapa(usuario, carrinho)
    : checkoutEmTresEtapas(usuario, carrinho);
}` },
        { nome: "teste-ab.js", rodar: true, codigo: `// Hipótese: o checkout em uma etapa aumenta a taxa de conversão.
// Dados fictícios de duas semanas de experimento.

const grupos = {
  controle: { visitantes: 4980, compras: 398 },   // checkout em três etapas
  variante: { visitantes: 5020, compras: 472 },   // checkout em uma etapa
};

const taxa = (g) => g.compras / g.visitantes;
const pc = taxa(grupos.controle);
const pv = taxa(grupos.variante);

// Teste z para duas proporções
const total = grupos.controle.visitantes + grupos.variante.visitantes;
const p = (grupos.controle.compras + grupos.variante.compras) / total;
const erro = Math.sqrt(p * (1 - p) * (1 / grupos.controle.visitantes + 1 / grupos.variante.visitantes));
const z = (pv - pc) / erro;

console.log("Conversão do controle:", (pc * 100).toFixed(2) + "%");            // 7.99%
console.log("Conversão da variante:", (pv * 100).toFixed(2) + "%");            // 9.40%
console.log("Aumento relativo:", (((pv - pc) / pc) * 100).toFixed(1) + "%");   // 17.6%
console.log("z =", z.toFixed(2));                                              // 2.50
console.log(Math.abs(z) > 1.96
  ? "Diferença significativa com 95% de confiança"
  : "Diferença pode ser acaso: não conclua nada ainda");` },
        { nome: "Inventário de chaves", tabela: {
          colunas: ["Chave", "Tipo", "Dono", "Criada em", "Remover até", "Situação"],
          linhas: [
            ["novo-checkout", "Experimento", "Time de vendas", "02/03", "30/04", "Em teste com 50%"],
            ["plataforma-nova-pedidos", "Lançamento", "Front-end", "10/01", "15/05", "100%: remover o código antigo"],
            ["relatorio-pesado", "Operação", "Back-end", "05/11", "Permanente", "Ligada"],
            ["exportar-pdf", "Permissão", "Produto", "20/08", "Permanente", "Só plano avançado"],
            ["banner-natal", "Lançamento", "Marketing", "01/12", "10/01", "Vencida: remover"]
          ]
        } }
      ],
      observar: "O valor padrão da chave é sempre o caminho seguro. Um aumento só vira decisão quando a amostra planejada foi atingida e a diferença não é acaso."
    }
  },

  /* ===================== 41 — Playwright e testes de front-end ===================== */
  {
    tema: {
      titulo: "Playwright e o ecossistema de testes de front-end",
      cat: "qa", nivel: "Intermediário", perfil: "QA ou Front-end",
      resumo: "Um mapa das ferramentas de automação de testes de interface e um mergulho no Playwright: como funciona, o que traz de fábrica e quando outra ferramenta é a melhor escolha.",
      teoria: [
        "Mapa das ferramentas: unidade, componente, ponta a ponta, visual e acessibilidade",
        "Playwright por dentro: navegadores, contextos isolados e espera automática",
        "Ferramentas de fábrica: gerador de código, modo interativo e visualizador de rastros",
        "Recursos avançados: simulação de rede, sessão reaproveitada, comparação visual e emulação de celular",
        "Playwright, Cypress ou Selenium: critérios de escolha e as novidades com IA"
      ],
      pratica: {
        titulo: "Da gravação ao pipeline",
        passos: [
          "Gravar um fluxo do nosso produto com o gerador de código e limpar o resultado",
          "Simular uma resposta de erro da API e verificar a mensagem na tela",
          "Rodar nos três navegadores e abrir o rastro de um teste que falhou"
        ]
      },
      discussao: [
        "Que parte dos nossos testes manuais de regressão automatizaríamos primeiro?",
        "Nossos testes de interface dependem de dados e serviços que não controlamos?"
      ],
      refs: ["Documentação do Playwright e notas de versão (playwright.dev)", "Documentação da Testing Library e do Cypress"]
    },
    slides: {
      gancho: "Quanto tempo o time gasta por mês clicando nas mesmas telas antes de cada publicação?",
      abertura: [
        "Teste manual repetido é caro e deixa passar o que cansa",
        "As ferramentas atuais eliminaram boa parte da instabilidade histórica",
        "Escolher a ferramenta certa por nível evita uma suíte lenta e frágil"
      ],
      teoria: [
        ["Unidade e componente: Vitest ou Jest com Testing Library", "Ponta a ponta: Playwright, Cypress, Selenium e WebdriverIO", "Visual e acessibilidade: comparação de capturas e auditoria com axe"],
        ["Controla Chromium, Firefox e WebKit com a mesma API", "Cada teste roda em um contexto isolado, como um perfil novo de navegador", "As ações esperam sozinhas o elemento estar pronto: sem espera fixa"],
        ["codegen: grava os cliques e gera o teste", "Modo interativo (--ui): roda, pausa e inspeciona passo a passo", "Visualizador de rastros: a gravação completa de um teste que falhou no pipeline"],
        ["page.route: responde no lugar da API para testar erros e lentidão", "storageState: faz login uma vez e reaproveita em todos os testes", "toHaveScreenshot e perfis de aparelhos: visual e celular sem ferramenta extra"],
        ["Playwright: vários navegadores, paralelo de fábrica, várias linguagens", "Cypress: experiência interativa forte; Selenium: padrão W3C e maior legado", "Versões de 2026 trazem agentes de teste e servidor MCP: confira as notas de versão"]
      ],
      preparo: "Instale o Playwright e os navegadores antes (npx playwright install) e tenha um usuário de teste em homologação."
    },
    pratica: {
      intro: "Um projeto Playwright com sessão reaproveitada, simulação de erro da API, comparação visual e emulação de celular, mais um comparativo das ferramentas.",
      blocos: [
        { nome: "terminal", codigo: `npm init playwright@latest          # cria o projeto e baixa os navegadores

npx playwright codegen https://homologacao.exemplo.com   # grava cliques e gera o teste
npx playwright test                 # roda tudo, em paralelo, sem abrir janela
npx playwright test --ui            # modo interativo: rodar, pausar e inspecionar
npx playwright test --project=webkit pedidos.spec.js     # um arquivo, um navegador
npx playwright show-report          # relatório HTML da última execução
npx playwright show-trace test-results/pedidos/trace.zip # rastro de uma falha` },
        { nome: "playwright.config.js", codigo: `const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./testes",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["html"], ["list"]],
  use: {
    baseURL: process.env.URL_BASE,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    // Faz login uma vez e salva a sessão
    { name: "preparo", testMatch: "login.setup.js" },

    { name: "chromium", use: { ...devices["Desktop Chrome"], storageState: "sessao.json" }, dependencies: ["preparo"] },
    { name: "firefox",  use: { ...devices["Desktop Firefox"], storageState: "sessao.json" }, dependencies: ["preparo"] },
    { name: "webkit",   use: { ...devices["Desktop Safari"], storageState: "sessao.json" }, dependencies: ["preparo"] },
    { name: "celular",  use: { ...devices["Pixel 7"], storageState: "sessao.json" }, dependencies: ["preparo"] },
  ],
});` },
        { nome: "testes/login.setup.js", codigo: `const { test: preparo, expect } = require("@playwright/test");

preparo("faz login e guarda a sessão", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("E-mail").fill(process.env.USUARIO_TESTE);
  await page.getByLabel("Senha").fill(process.env.SENHA_TESTE);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByRole("heading", { name: "Pedidos" })).toBeVisible();

  await page.context().storageState({ path: "sessao.json" });
});` },
        { nome: "testes/pedidos.spec.js", codigo: `const { test, expect } = require("@playwright/test");

test("lista os pedidos devolvidos pela API", async ({ page }) => {
  // Responde no lugar da API: o teste não depende de dados do ambiente
  await page.route("**/api/pedidos*", (rota) =>
    rota.fulfill({
      json: { itens: [{ numero: 12841, cliente: "Comercial Santos", situacao: "aberto", total: 124990 }] },
    })
  );

  await page.goto("/pedidos");
  await expect(page.getByRole("row", { name: /12841/ })).toContainText("Em aberto");
});

test("mostra mensagem amigável quando a API falha", async ({ page }) => {
  await page.route("**/api/pedidos*", (rota) => rota.fulfill({ status: 500 }));

  await page.goto("/pedidos");
  await expect(page.getByRole("alert")).toContainText("Não foi possível carregar os pedidos");
  await expect(page.getByRole("button", { name: "Tentar de novo" })).toBeVisible();
});

test("a tela não mudou de aparência", async ({ page }) => {
  await page.goto("/pedidos");
  // A primeira execução grava a imagem de referência; as seguintes comparam
  await expect(page).toHaveScreenshot("lista-de-pedidos.png", { maxDiffPixelRatio: 0.01 });
});` },
        { nome: "Comparativo das ferramentas de ponta a ponta", tabela: {
          colunas: ["Critério", "Playwright", "Cypress", "Selenium / WebdriverIO"],
          linhas: [
            ["Navegadores", "Chromium, Firefox e WebKit", "Família Chromium, Firefox e WebKit experimental", "Todos os que seguem o padrão WebDriver"],
            ["Linguagens", "JavaScript/TypeScript, Python, Java e .NET", "JavaScript/TypeScript", "Praticamente todas"],
            ["Paralelismo", "De fábrica", "De fábrica por arquivo; distribuído no serviço pago", "Via Selenium Grid ou serviço externo"],
            ["Várias abas e domínios", "Sim", "Com limitações", "Sim"],
            ["Depuração", "Modo interativo e rastros", "Executor interativo com viagem no tempo", "Depende de ferramentas externas"],
            ["Ponto forte", "Velocidade, estabilidade e recursos de fábrica", "Experiência de quem escreve o teste", "Padrão aberto e enorme base instalada"],
            ["Atenção", "Mudanças frequentes entre versões", "Recursos avançados no plano pago", "Mais configuração e mais espera manual"]
          ]
        } },
        { nome: "Qual ferramenta para cada nível", tabela: {
          colunas: ["O que testar", "Ferramenta", "Quantidade"],
          linhas: [
            ["Funções e regras isoladas", "Vitest ou Jest", "Muitos"],
            ["Componente de interface isolado", "Testing Library", "Muitos"],
            ["Jornada crítica do usuário", "Playwright", "Poucos"],
            ["Mudança visual inesperada", "Capturas do Playwright ou serviço de comparação visual", "Telas principais"],
            ["Acessibilidade", "axe dentro dos testes", "Todas as telas novas"]
          ]
        } }
      ],
      observar: "Com page.route o teste controla a resposta da API, então dá para testar o erro 500 sem derrubar nada. O login acontece uma única vez para toda a suíte."
    }
  },

  /* ===================== 42 — Programação funcional ===================== */
  {
    tema: {
      titulo: "Programação funcional: o básico, com JavaScript",
      cat: "codigo", nivel: "Intermediário", perfil: "Qualquer dev",
      resumo: "Os fundamentos do paradigma funcional usando JavaScript como linguagem de base, porque o time já a conhece e ela permite comparar o estilo imperativo com o funcional lado a lado.",
      teoria: [
        "A ideia central: funções puras e dados imutáveis",
        "Funções como valores: map, filter e reduce",
        "Composição, currying e aplicação parcial",
        "Efeitos colaterais na borda e erro sem exceção",
        "Vantagens, desvantagens e outras linguagens do paradigma"
      ],
      pratica: {
        titulo: "Do laço à composição",
        passos: [
          "Escolher uma função nossa com laços, variáveis acumuladoras e condições aninhadas",
          "Reescrever com funções puras, map, filter e reduce, mantendo os testes verdes",
          "Comparar legibilidade e desempenho das duas versões e decidir qual fica"
        ]
      },
      discussao: [
        "Onde o estado compartilhado e mutável já nos causou um bug difícil de achar?",
        "Em que partes do nosso código o estilo funcional deixaria tudo mais difícil de ler?"
      ],
      refs: ["Professor Frisby's Mostly Adequate Guide to Functional Programming — Brian Lonsdorf", "Grokking Simplicity — Eric Normand"]
    },
    slides: {
      gancho: "Se uma função recebe os mesmos argumentos, ela devolve sempre o mesmo resultado?",
      abertura: [
        "Boa parte dos bugs difíceis vem de estado alterado em lugar inesperado",
        "React, fluxos de dados e processamento em paralelo usam ideias funcionais",
        "Não é tudo ou nada: dá para adotar aos poucos, na linguagem que já usamos"
      ],
      teoria: [
        ["Função pura: mesmo argumento, mesmo resultado, sem alterar nada fora dela", "Dado imutável: em vez de alterar, cria-se uma cópia com a mudança", "Código declarativo: descreve o que se quer, não o passo a passo"],
        ["Funções podem ser guardadas, passadas e devolvidas como qualquer valor", "map transforma, filter seleciona, reduce acumula", "Cada operação tem um nome: o leitor não precisa simular o laço"],
        ["Compor: a saída de uma função é a entrada da próxima", "Currying: uma função de vários argumentos vira uma cadeia de funções de um", "Aplicação parcial: fixar alguns argumentos para criar uma função especializada"],
        ["Banco, rede, relógio e tela são efeitos: ficam na borda do sistema", "O miolo puro é fácil de testar; a borda é fina", "Erro vira valor de retorno (resultado ou falha), não exceção escondida"],
        ["A favor: testes simples, menos bugs de estado, paralelismo seguro", "Contra: curva de aprendizado, cópias custam memória, encadeamento excessivo fica ilegível", "Outras linguagens: Elixir, Haskell, F#, Clojure e Scala; Kotlin e Swift trazem os recursos"]
      ],
      preparo: "Escolha uma função real do repositório que tenha testes e deixe as duas versões prontas para comparar."
    },
    pratica: {
      intro: "O mesmo relatório de vendas escrito de forma imperativa e funcional, mais imutabilidade, composição, currying e erro como valor. Todos os arquivos são executáveis.",
      blocos: [
        { nome: "relatorio.js — imperativo e funcional", rodar: true, codigo: `const pedidos = [
  { cliente: "Ana", total: 250, situacao: "pago" },
  { cliente: "Bruno", total: 90, situacao: "cancelado" },
  { cliente: "Ana", total: 410, situacao: "pago" },
  { cliente: "Carla", total: 130, situacao: "pago" },
];

// Imperativo: como fazer, passo a passo, com variáveis que mudam
function totalPorClienteImperativo(lista) {
  const resultado = {};
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].situacao === "pago") {
      if (!resultado[lista[i].cliente]) resultado[lista[i].cliente] = 0;
      resultado[lista[i].cliente] += lista[i].total;
    }
  }
  return resultado;
}

// Funcional: o que se quer, com funções pequenas e nomeadas
const estaPago = (pedido) => pedido.situacao === "pago";
const somarPorCliente = (acumulado, pedido) => ({
  ...acumulado,
  [pedido.cliente]: (acumulado[pedido.cliente] || 0) + pedido.total,
});

const totalPorCliente = (lista) => lista.filter(estaPago).reduce(somarPorCliente, {});

console.log(totalPorClienteImperativo(pedidos)); // { Ana: 660, Carla: 130 }
console.log(totalPorCliente(pedidos));           // { Ana: 660, Carla: 130 }` },
        { nome: "imutabilidade.js", rodar: true, codigo: `const pedido = { numero: 1, itens: ["teclado"], situacao: "aberto" };

// Impura: altera o objeto que recebeu. Quem mais usava esse pedido é surpreendido.
function faturarAlterando(p) {
  p.situacao = "faturado";
  return p;
}

// Pura: devolve um objeto novo e deixa o original intacto
const faturar = (p) => ({ ...p, situacao: "faturado" });
const adicionarItem = (p, item) => ({ ...p, itens: [...p.itens, item] });

const faturado = faturar(adicionarItem(pedido, "mouse"));

console.log(pedido);    // { numero: 1, itens: [ 'teclado' ], situacao: 'aberto' }
console.log(faturado);  // { numero: 1, itens: [ 'teclado', 'mouse' ], situacao: 'faturado' }

// Object.freeze avisa cedo quando alguém tenta alterar (em modo estrito, lança erro)
const congelado = Object.freeze({ ...pedido });
congelado.situacao = "cancelado";
console.log(congelado.situacao);   // aberto` },
        { nome: "composicao.js", rodar: true, codigo: `// pipe: aplica as funções em sequência, da esquerda para a direita
const pipe = (...funcoes) => (valor) => funcoes.reduce((atual, fn) => fn(atual), valor);

// Currying: cada função recebe um argumento e devolve outra função
const aplicarDesconto = (percentual) => (valor) => valor * (1 - percentual / 100);
const somarFrete = (frete) => (valor) => valor + frete;
const arredondar = (valor) => Math.round(valor * 100) / 100;

// Aplicação parcial: funções especializadas criadas a partir das genéricas
const descontoDeClienteOuro = aplicarDesconto(10);
const freteParaOInterior = somarFrete(25);

// Composição: funções pequenas viram uma regra de negócio legível
const precoFinal = pipe(descontoDeClienteOuro, freteParaOInterior, arredondar);

console.log(precoFinal(200));                    // 205
console.log([100, 350, 999.9].map(precoFinal));  // [ 115, 340, 924.91 ]` },
        { nome: "erro-como-valor.js", rodar: true, codigo: `// Em vez de lançar exceção, a função devolve um resultado que diz se deu certo.
const sucesso = (valor) => ({ ok: true, valor });
const falha = (erro) => ({ ok: false, erro });

// Encadeia passos: se um falhar, os próximos são pulados
const entao = (fn) => (resultado) => (resultado.ok ? fn(resultado.valor) : resultado);
const pipe = (...funcoes) => (valor) => funcoes.reduce((atual, fn) => fn(atual), valor);

const validarQuantidade = (pedido) =>
  pedido.quantidade > 0 ? sucesso(pedido) : falha("Quantidade deve ser maior que zero");

const validarEstoque = (pedido) =>
  pedido.quantidade <= 10 ? sucesso(pedido) : falha("Estoque insuficiente");

const calcularTotal = (pedido) => sucesso({ ...pedido, total: pedido.quantidade * pedido.preco });

const processar = pipe(validarQuantidade, entao(validarEstoque), entao(calcularTotal));

console.log(processar({ quantidade: 2, preco: 50 }));   // { ok: true, valor: { quantidade: 2, preco: 50, total: 100 } }
console.log(processar({ quantidade: 0, preco: 50 }));   // { ok: false, erro: 'Quantidade deve ser maior que zero' }
console.log(processar({ quantidade: 99, preco: 50 }));  // { ok: false, erro: 'Estoque insuficiente' }` },
        { nome: "Vantagens e desvantagens", tabela: {
          colunas: ["Aspecto", "A favor", "Contra"],
          linhas: [
            ["Testes", "Função pura dispensa preparação e dublês", "Os efeitos da borda ainda precisam de teste de integração"],
            ["Leitura", "Operações têm nome; menos variáveis para acompanhar", "Cadeias longas e funções sem nome ficam enigmáticas"],
            ["Bugs", "Sem estado compartilhado mutável, some uma classe inteira de erros", "Erros de tipo em composições são difíceis de rastrear sem tipagem"],
            ["Desempenho", "Sem estado mutável, paralelizar é seguro", "Cópias e passagens repetidas por listas grandes custam mais"],
            ["Time", "Conceitos se aplicam em qualquer linguagem moderna", "Vocabulário novo assusta: currying, mônada, functor"]
          ]
        } }
      ],
      observar: "As duas versões do relatório dão o mesmo resultado. A funcional não tem variável que muda e cada pedaço pode ser testado sozinho."
    }
  },

  /* ===================== 43 — Sistemas operacionais ===================== */
  {
    tema: {
      titulo: "Desenvolver em Windows, Linux e macOS, e para Android e iOS",
      cat: "infra", nivel: "Básico", perfil: "Qualquer dev, com apoio de Infra e Mobile",
      resumo: "Cada sistema operacional traz ferramentas, linguagens favorecidas e dores próprias. Comparamos os três de mesa e os dois de celular, e vemos como um time com máquinas diferentes evita o 'na minha máquina funciona'.",
      teoria: [
        "Windows: vantagens, desvantagens e o papel do WSL",
        "Linux: o mais próximo da produção",
        "macOS: Unix com aplicativos comerciais e a porta única para o iOS",
        "Android e iOS: linguagens, ferramentas e dificuldades de cada um",
        "Time com sistemas diferentes: como padronizar o ambiente"
      ],
      pratica: {
        titulo: "O projeto roda em qualquer máquina?",
        passos: [
          "Levantar quais sistemas o time usa e os problemas de ambiente mais recentes",
          "Clonar e rodar o nosso projeto do zero em cada sistema, anotando cada tropeço",
          "Adicionar ao repositório os arquivos de padronização que resolveriam esses tropeços"
        ]
      },
      discussao: [
        "Quanto tempo perdemos por mês com diferenças de ambiente entre as máquinas?",
        "Faz sentido padronizar o sistema do time ou padronizar o ambiente em containers?"
      ],
      refs: ["Stack Overflow Developer Survey 2025 (seção de tecnologia)", "Documentação do WSL (Microsoft), do Android Studio e do Xcode"]
    },
    slides: {
      gancho: "Se você trocasse de computador com a pessoa ao lado, em quanto tempo conseguiria rodar o projeto?",
      abertura: [
        "Na pesquisa do Stack Overflow de 2025, entre profissionais: Windows 49,5%, macOS 32,9% e Ubuntu 27,7% (respostas não exclusivas)",
        "A produção quase sempre roda Linux, seja qual for a máquina de quem desenvolve",
        "No Brasil, o Android tem perto de 79% do acesso móvel e o iOS, perto de 21% (StatCounter, setembro de 2026)"
      ],
      teoria: [
        ["A favor: .NET e Visual Studio, jogos, padrão em empresas, WSL 2 traz um Linux de verdade", "Contra: muita ferramenta nasce para Linux e macOS e chega depois; caminhos e fim de linha diferentes", "Dificuldade típica: lentidão ao acessar arquivos do Windows a partir do WSL; não compila para iOS"],
        ["A favor: mesmo sistema da produção, containers nativos, gerenciadores de pacotes, leve e gratuito", "Contra: suporte irregular a alguns equipamentos e a programas comerciais de design e escritório", "Dificuldade típica: variedade de distribuições; não compila para iOS"],
        ["A favor: base Unix com aplicativos comerciais; único que compila para iOS e macOS; bom desempenho por watt", "Contra: custo do equipamento e pouca possibilidade de expansão", "Dificuldade típica: containers rodam em máquina virtual; imagens feitas para x86 em processador ARM"],
        ["Android: Kotlin e Java, Android Studio em qualquer sistema; desafio é a variedade de aparelhos e versões", "iOS: Swift, Xcode só no macOS; poucos aparelhos, mas assinatura e certificados dão trabalho", "Publicação: revisão mais rígida na Apple; regras de teste e de nível de API no Google"],
        ["Fim de linha e formatação: .gitattributes e .editorconfig", "Versões de linguagem fixadas no repositório", "Ambiente em container (Dev Containers): o mesmo para todos, em qualquer sistema"]
      ],
      preparo: "Reúna três máquinas, uma de cada sistema, e um projeto do time para clonar do zero ao vivo."
    },
    pratica: {
      intro: "Um comparativo dos sistemas para desenvolvimento e os arquivos que fazem o mesmo repositório funcionar igual em Windows, Linux e macOS.",
      blocos: [
        { nome: "Sistemas de mesa para desenvolvimento", tabela: {
          colunas: ["", "Windows", "Linux", "macOS"],
          linhas: [
            ["Pontos fortes", ".NET, Visual Studio, jogos, WSL 2", "Igual à produção, containers nativos, gratuito", "Unix com aplicativos comerciais, Xcode"],
            ["Pontos fracos", "Ferramentas pensadas primeiro para Unix", "Programas comerciais e alguns equipamentos", "Custo e pouca expansão"],
            ["Linguagens em destaque", "C#, C++, e todas as demais via WSL", "Todas as de servidor; C, Go, Rust, Python", "Swift e Objective-C, e todas as de servidor"],
            ["Containers", "Via WSL 2", "Nativos", "Em máquina virtual"],
            ["Compila para Android", "Sim", "Sim", "Sim"],
            ["Compila para iOS", "Não", "Não", "Sim (único)"],
            ["Dificuldade comum", "Fim de linha CRLF, caminhos com barra invertida, disco lento entre Windows e WSL", "Escolha e manutenção da distribuição", "Imagens x86 em processador ARM"]
          ]
        } },
        { nome: "Sistemas móveis", tabela: {
          colunas: ["", "Android", "iOS"],
          linhas: [
            ["Linguagens nativas", "Kotlin (recomendada) e Java", "Swift (recomendada) e Objective-C"],
            ["Interface nativa", "Jetpack Compose", "SwiftUI"],
            ["Ambiente", "Android Studio, em Windows, Linux ou macOS", "Xcode, somente em macOS"],
            ["Aparelhos", "Centenas de fabricantes, telas e versões", "Poucos modelos, atualização rápida de versão"],
            ["Distribuição", "Google Play, outras lojas e instalação direta", "App Store; alternativas só em algumas regiões"],
            ["Maior dificuldade", "Testar na variedade de aparelhos e versões", "Certificados, perfis e revisão da loja"],
            ["Participação no Brasil", "Perto de 79%", "Perto de 21%"]
          ]
        } },
        { nome: ".gitattributes", codigo: `# Normaliza o fim de linha no repositório, seja qual for o sistema de quem faz o commit
* text=auto eol=lf

# Scripts de shell precisam de LF mesmo no Windows
*.sh text eol=lf

# Scripts do Windows precisam de CRLF
*.bat text eol=crlf
*.ps1 text eol=crlf

# Binários: o Git não deve tentar converter
*.png binary
*.jpg binary
*.pdf binary` },
        { nome: ".editorconfig", codigo: `# Lido pela maioria dos editores: a mesma formatação para todo o time
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab` },
        { nome: ".devcontainer/devcontainer.json", codigo: `{
  "name": "Projeto do time",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "forwardPorts": [3000],
  "postCreateCommand": "npm ci",
  "customizations": {
    "vscode": {
      "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
    }
  }
}` },
        { nome: "Problemas clássicos entre sistemas", tabela: {
          colunas: ["Sintoma", "Causa", "Solução"],
          linhas: [
            ["Script .sh falha no container com 'bad interpreter'", "Arquivo salvo com fim de linha CRLF", ".gitattributes com eol=lf"],
            ["Importação funciona no Windows e no macOS e falha no servidor", "Nome de arquivo com maiúsculas diferentes: o Linux diferencia", "Regra de lint para caminhos e pipeline em Linux"],
            ["Script do package.json falha no Windows", "Comando de shell Unix (rm, cp, variável de ambiente)", "Pacotes multiplataforma (rimraf, cross-env) ou scripts em Node"],
            ["Instalação e testes muito lentos no WSL", "Projeto guardado no disco do Windows", "Guardar o projeto dentro do sistema de arquivos do Linux"],
            ["Imagem de container falha no Mac com processador ARM", "Imagem publicada só para x86", "Imagem multiplataforma ou emulação declarada"],
            ["Cada pessoa com uma versão da linguagem", "Versão não fixada", "Arquivo de versão no repositório e gerenciador de versões"]
          ]
        } }
      ],
      observar: "Nenhum sistema é o melhor para tudo: a escolha depende do que se desenvolve. O que o time controla é o repositório, e três arquivos pequenos eliminam os problemas mais comuns."
    }
  },

  /* ===================== 44 — Programação mobile ===================== */
  {
    tema: {
      titulo: "Programação para mobile: linguagens, frameworks, IDEs e a escolha entre nativo e multiplataforma",
      cat: "front", nivel: "Intermediário", perfil: "Mobile",
      resumo: "Um panorama do desenvolvimento para celular: o que existe em cada plataforma, como funcionam as opções multiplataforma, quais empresas usam cada uma e com quais critérios escolher.",
      teoria: [
        "Nativo Android: Kotlin, Jetpack Compose e Android Studio",
        "Nativo iOS: Swift, SwiftUI e Xcode",
        "Multiplataforma: Flutter, React Native, Kotlin Multiplatform e as opções baseadas em web",
        "Quem usa o quê: casos públicos de empresas",
        "Desempenho e critérios de escolha: quando usar e quando não usar cada abordagem"
      ],
      pratica: {
        titulo: "A mesma tela em duas abordagens",
        passos: [
          "Implementar uma tela simples do nosso app de forma nativa e em um framework multiplataforma",
          "Comparar tempo de desenvolvimento, tamanho do aplicativo e tempo de abertura",
          "Preencher a matriz de decisão com os critérios do nosso produto e do nosso time"
        ]
      },
      discussao: [
        "Quais critérios pesam mais para nós: prazo, desempenho, tamanho do time ou acesso a recursos do aparelho?",
        "Se começássemos o app hoje, escolheríamos a mesma tecnologia? Por quê?"
      ],
      refs: ["Vitrines oficiais: flutter.dev/showcase, reactnative.dev/showcase e kotlinlang.org/case-studies", "Sunsetting React Native — Airbnb Engineering (2018) e React Native's New Architecture — Shopify Engineering"]
    },
    slides: {
      gancho: "Vale mais um aplicativo excelente em uma plataforma ou um bom nas duas?",
      abertura: [
        "A escolha da tecnologia define custo, contratação e velocidade por anos",
        "As opções multiplataforma amadureceram muito desde 2018",
        "No Brasil, ignorar o Android é ignorar perto de quatro em cada cinco aparelhos"
      ],
      teoria: [
        ["Kotlin é a linguagem recomendada pelo Google; Java segue em bases antigas", "Jetpack Compose: interface declarativa, em código Kotlin", "Android Studio roda em Windows, Linux e macOS, com emulador incluído"],
        ["Swift é a linguagem atual; Objective-C aparece em código legado", "SwiftUI: interface declarativa; UIKit continua em uso", "Xcode só existe no macOS e traz simulador, assinatura e envio à loja"],
        ["Flutter (Dart): desenha a própria interface; um código para as duas plataformas", "React Native (JavaScript/TypeScript): usa componentes nativos; Expo simplifica o ambiente", "Kotlin Multiplatform compartilha a lógica e mantém a interface nativa; Capacitor e Ionic empacotam web"],
        ["Flutter: Google Pay, Nubank, BMW e Alibaba", "React Native: Meta, Microsoft (Office, Teams, Outlook), Shopify, Discord e Coinbase", "Kotlin Multiplatform: Netflix, McDonald's, Duolingo e Google Workspace; o Airbnb voltou ao nativo em 2018"],
        ["Para a maioria dos apps de formulários e listas, o usuário não percebe diferença", "Nativo ganha em gráficos pesados, recursos recém-lançados do sistema e integração profunda", "Pesam na decisão: tamanho e perfil do time, prazo, código já existente e o quanto as duas plataformas devem ser idênticas"]
      ],
      preparo: "Deixe os ambientes instalados antes do encontro: os downloads do Android Studio, do Xcode e dos SDKs são grandes."
    },
    pratica: {
      intro: "A mesma tela de contador escrita em quatro tecnologias, um resumo dos casos públicos de empresas e a matriz de decisão.",
      blocos: [
        { nome: "Contador.kt — Android nativo (Jetpack Compose)", codigo: `@Composable
fun Contador() {
    var cliques by remember { mutableStateOf(0) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("Você clicou $cliques vezes")
        Button(onClick = { cliques++ }) {
            Text("Clicar")
        }
    }
}` },
        { nome: "Contador.swift — iOS nativo (SwiftUI)", codigo: `struct Contador: View {
    @State private var cliques = 0

    var body: some View {
        VStack {
            Text("Você clicou \\(cliques) vezes")
            Button("Clicar") {
                cliques += 1
            }
        }
    }
}` },
        { nome: "contador.dart — Flutter", codigo: `class Contador extends StatefulWidget {
  const Contador({super.key});

  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int cliques = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Você clicou $cliques vezes'),
        ElevatedButton(
          onPressed: () => setState(() => cliques++),
          child: const Text('Clicar'),
        ),
      ],
    );
  }
}` },
        { nome: "Contador.tsx — React Native", codigo: `import { useState } from "react";
import { Button, Text, View } from "react-native";

export function Contador() {
  const [cliques, setCliques] = useState(0);

  return (
    <View>
      <Text>Você clicou {cliques} vezes</Text>
      <Button title="Clicar" onPress={() => setCliques(cliques + 1)} />
    </View>
  );
}` },
        { nome: "Linguagens, frameworks e IDEs", tabela: {
          colunas: ["Abordagem", "Linguagem", "Interface", "IDE mais usada", "Compartilha entre plataformas"],
          linhas: [
            ["Android nativo", "Kotlin", "Jetpack Compose", "Android Studio", "Nada"],
            ["iOS nativo", "Swift", "SwiftUI", "Xcode", "Nada"],
            ["Flutter", "Dart", "Widgets do próprio Flutter", "Android Studio ou VS Code", "Interface e lógica"],
            ["React Native", "TypeScript", "Componentes nativos via React", "VS Code", "Interface e lógica"],
            ["Kotlin Multiplatform", "Kotlin", "Nativa, ou Compose Multiplatform", "Android Studio ou IntelliJ", "Lógica; a interface é opcional"],
            [".NET MAUI", "C#", "Componentes nativos", "Visual Studio", "Interface e lógica"],
            ["Capacitor / Ionic", "TypeScript", "Web dentro de um contêiner nativo", "VS Code", "Tudo, inclusive com o site"]
          ]
        } },
        { nome: "Casos públicos de empresas (conferidos em novembro de 2026)", tabela: {
          colunas: ["Empresa", "Abordagem", "O que foi divulgado", "Fonte"],
          linhas: [
            ["Nubank", "Flutter", "Aplicativo com mais de 100 milhões de clientes", "Vitrine do Flutter"],
            ["Google Pay", "Flutter", "Dois códigos separados (cerca de 1,7 milhão de linhas) unificados em um", "Vitrine do Flutter"],
            ["Shopify", "React Native", "Todos os aplicativos novos em React Native; na migração para a Nova Arquitetura, abertura 10% mais rápida no Android e 3% no iOS", "Vitrine do React Native e blog de engenharia da Shopify"],
            ["Microsoft", "React Native", "Usado em Office, Teams e Outlook, inclusive em Windows e macOS", "Vitrine do React Native"],
            ["McDonald's", "Kotlin Multiplatform", "Começou pelo pagamento e expandiu para o app; relatou menos falhas e melhor desempenho", "Casos do Kotlin"],
            ["Duolingo", "Kotlin Multiplatform", "Entregas semanais para mais de 40 milhões de usuários diários", "KotlinConf 2025"],
            ["Airbnb", "Voltou ao nativo", "Encerrou o uso de React Native em 2018 por motivos técnicos e de organização do time", "Blog de engenharia do Airbnb"]
          ]
        } },
        { nome: "Matriz de decisão", tabela: {
          colunas: ["Se o cenário é...", "Tende a favorecer", "Por quê"],
          linhas: [
            ["Time pequeno, duas plataformas, prazo curto", "Flutter ou React Native", "Um código e uma equipe"],
            ["Time já forte em React e TypeScript", "React Native", "Aproveita conhecimento e bibliotecas"],
            ["Interface idêntica e muito personalizada nas duas plataformas", "Flutter", "Desenha a própria interface"],
            ["Apps nativos já existentes, muita regra duplicada", "Kotlin Multiplatform", "Compartilha a lógica sem reescrever as telas"],
            ["Jogo, realidade aumentada, vídeo ou gráficos pesados", "Nativo ou motor de jogos", "Acesso direto ao aparelho e desempenho máximo"],
            ["Uso intenso de recursos recém-lançados do sistema", "Nativo", "Disponíveis primeiro nas ferramentas da plataforma"],
            ["Aplicativo simples que já existe como site", "Capacitor ou aplicativo web progressivo", "Reaproveita o que está pronto"]
          ]
        } }
      ],
      observar: "As quatro versões do contador são quase iguais: todas descrevem a tela a partir do estado. A diferença real está no ecossistema, no time e no que precisa ser compartilhado."
    }
  },

  /* ===================== 45 — Lojas de aplicativos ===================== */
  {
    tema: {
      titulo: "App Store e Google Play: contas, publicação, gestão e curiosidades",
      cat: "front", nivel: "Básico", perfil: "Mobile ou gestão",
      resumo: "Publicar um aplicativo envolve contas, certificados, fichas de loja, revisão e regras que mudam todo ano. Percorremos o caminho completo nas duas lojas, com os custos e as armadilhas de cada uma.",
      teoria: [
        "Contas de desenvolvedor: custos, tipos e verificações",
        "App Store Connect: do registro ao lançamento em fases",
        "Google Play Console: faixas de teste, pacote e liberação por percentual",
        "Ficha da loja, políticas e os motivos mais comuns de rejeição",
        "Taxas, mudanças recentes e curiosidades das duas lojas"
      ],
      pratica: {
        titulo: "Roteiro de publicação do nosso app",
        passos: [
          "Conferir quem tem acesso às nossas contas das lojas e com qual papel",
          "Preencher a lista de publicação para a próxima versão, nas duas lojas",
          "Revisar a ficha atual do app: capturas de tela, descrição e declarações de privacidade"
        ]
      },
      discussao: [
        "Se a pessoa que publica hoje sair de férias, mais alguém consegue lançar uma versão?",
        "Quanto tempo de revisão das lojas consideramos no nosso planejamento de entregas?"
      ],
      refs: ["App Store Review Guidelines e ajuda do App Store Connect (developer.apple.com)", "Central de Ajuda do Play Console e políticas do Google Play (support.google.com/googleplay/android-developer)"]
    },
    slides: {
      gancho: "O aplicativo está pronto. Quantos dias faltam para o usuário conseguir instalar?",
      abertura: [
        "A loja é parte do produto: ficha ruim derruba instalação",
        "Rejeição na revisão atrasa lançamento com data marcada",
        "As regras e as taxas mudaram bastante em 2025 e 2026"
      ],
      teoria: [
        ["Apple Developer Program: US$ 99 por ano; conta de empresa exige número D-U-N-S", "Google Play Console: US$ 25, pagos uma única vez, com verificação de identidade", "Conta pessoal nova no Google: teste fechado com 12 testadores por 14 dias seguidos antes de publicar"],
        ["Identificador do app, certificados e perfis de provisionamento", "TestFlight: testes internos e externos antes da revisão", "Envio para revisão e lançamento em fases, com liberação gradual"],
        ["Faixas: teste interno, fechado, aberto e produção", "Formato App Bundle (AAB), com assinatura gerenciada pelo Google Play", "Liberação por percentual e relatório automático de pré-lançamento"],
        ["Capturas de tela, descrição, classificação etária e política de privacidade", "Declarações obrigatórias: rótulos de privacidade (Apple) e segurança dos dados (Google)", "Rejeições comuns: falhas ao abrir, login sem conta de teste, permissão sem justificativa, compra fora das regras"],
        ["Apple: 30% padrão e 15% no programa para pequenas empresas, com variações por região", "Google: em 2026 separou taxa de serviço e taxa de cobrança, por região; chegada ao resto do mundo prevista até setembro de 2027", "A App Store abriu em julho de 2008 com cerca de 500 aplicativos; o Android Market é de outubro de 2008 e virou Google Play em 2012"]
      ],
      preparo: "Confira nas páginas oficiais os valores e as regras vigentes na semana do encontro: eles mudam com frequência."
    },
    pratica: {
      intro: "Um comparativo das duas lojas, o passo a passo de publicação em cada uma e a lista de conferência antes do envio. Valores conferidos em novembro de 2026.",
      blocos: [
        { nome: "As duas lojas lado a lado", tabela: {
          colunas: ["", "App Store (Apple)", "Google Play"],
          linhas: [
            ["Custo da conta", "US$ 99 por ano", "US$ 25, uma única vez"],
            ["Conta de empresa", "Exige número D-U-N-S", "Exige número D-U-N-S"],
            ["Exigência para conta pessoal nova", "Nenhuma equivalente", "Teste fechado com 12 testadores por 14 dias seguidos"],
            ["Painel", "App Store Connect", "Play Console"],
            ["Formato enviado", "Arquivo gerado e enviado pelo Xcode", "Android App Bundle (AAB)"],
            ["Assinatura", "Certificados e perfis de provisionamento", "Chave de envio; assinatura final gerenciada pelo Google"],
            ["Testes antes do lançamento", "TestFlight (interno e externo)", "Faixas de teste interno, fechado e aberto"],
            ["Liberação gradual", "Lançamento em fases ao longo de 7 dias", "Percentual definido por quem publica"],
            ["Declaração de privacidade", "Rótulos de privacidade", "Formulário de segurança dos dados"],
            ["Comissão sobre vendas digitais", "30% padrão; 15% no programa para pequenas empresas", "Modelo novo desde junho de 2026, por região: taxa de serviço mais taxa de cobrança"]
          ]
        } },
        { nome: "Passo a passo: primeira publicação", tabela: {
          colunas: ["Etapa", "App Store", "Google Play"],
          linhas: [
            ["1. Conta", "Inscrever-se no Apple Developer Program", "Criar a conta no Play Console e verificar a identidade"],
            ["2. Registro do app", "Criar o identificador e o app no App Store Connect", "Criar o app no Play Console"],
            ["3. Assinatura", "Gerar certificado de distribuição e perfil", "Ativar a assinatura gerenciada e gerar a chave de envio"],
            ["4. Ficha", "Nome, descrição, capturas por tamanho de tela, classificação", "Nome, descrição, capturas, ícone, classificação"],
            ["5. Privacidade", "Preencher os rótulos de privacidade e o link da política", "Preencher segurança dos dados e o link da política"],
            ["6. Teste", "Enviar o build ao TestFlight e convidar testadores", "Enviar o AAB para teste interno ou fechado"],
            ["7. Revisão", "Enviar para revisão, com conta de teste e observações", "Enviar para produção; a revisão ocorre na publicação"],
            ["8. Lançamento", "Manual, automático ou em fases", "Liberação por percentual até 100%"]
          ]
        } },
        { nome: "Lista de conferência antes de enviar", tabela: {
          colunas: ["Item", "Por que importa"],
          linhas: [
            ["O app abre e funciona sem conexão ou mostra aviso claro", "Falha na abertura é motivo comum de rejeição"],
            ["Conta de teste e instruções informadas à revisão", "O revisor precisa conseguir entrar"],
            ["Cada permissão pedida tem texto explicando o motivo", "Permissão sem justificativa reprova"],
            ["Compras de conteúdo digital seguem as regras de pagamento da loja", "As regras variam por região e mudaram em 2025 e 2026"],
            ["Há como o usuário excluir a própria conta", "Exigência das duas lojas para apps com cadastro"],
            ["Número da versão e do build foram incrementados", "As lojas recusam builds repetidos"],
            ["O app mira um nível de API e um SDK recentes", "As duas lojas exigem versões recentes das ferramentas"],
            ["Capturas de tela mostram o app real e atual", "Imagem enganosa reprova e derruba a avaliação"],
            ["Notas da versão escritas para o usuário, não para o dev", "É o que aparece na tela de atualização"]
          ]
        } },
        { nome: "Gestão e curiosidades", tabela: {
          colunas: ["Tema", "App Store", "Google Play"],
          linhas: [
            ["Origem", "Abriu em julho de 2008, com cerca de 500 aplicativos", "Nasceu como Android Market em outubro de 2008; virou Google Play em 2012"],
            ["Papéis de acesso", "Titular da conta, administrador, gerente de app, desenvolvedor, marketing e outros", "Permissões por pessoa, por app e por tipo de ação"],
            ["Renovação", "A conta vence todo ano: se não renovar, o app sai da loja", "Sem renovação, mas contas inativas podem ser encerradas"],
            ["Reversão de versão", "Não há reversão: envia-se uma versão nova", "É possível pausar a liberação; corrigir exige versão nova"],
            ["Fora da loja", "Distribuição alternativa só em algumas regiões", "Outras lojas e instalação direta são permitidas"],
            ["Automação", "API do App Store Connect", "API do Google Play para desenvolvedores"]
          ]
        } }
      ],
      observar: "No Google, a conta é barata e a exigência é de tempo: três semanas para uma conta pessoal nova. Na Apple, o custo é anual e o trabalho está nos certificados e na revisão."
    }
  },

  /* ===================== 46 — Deploy automático e fastlane ===================== */
  {
    tema: {
      titulo: "Deploy automático: CI/CD para front e back, e publicação mobile com fastlane",
      cat: "infra", nivel: "Avançado", perfil: "Infra, com apoio de Mobile",
      resumo: "Do merge à produção sem passos manuais. Montamos o deploy automático do front-end e do back-end e automatizamos a publicação dos aplicativos com fastlane, rodando a mesma receita na máquina local e no pipeline.",
      teoria: [
        "Deploy do front-end: artefato estático, distribuição e ambientes de prévia",
        "Deploy do back-end: imagem, migrações de banco, verificação de saúde e reversão",
        "Ambientes, segredos e aprovações",
        "fastlane: o que é, Fastfile, lanes e as ações principais",
        "A mesma lane na máquina local e no pipeline: assinatura e chaves de acesso"
      ],
      pratica: {
        titulo: "Um clique até a loja",
        passos: [
          "Automatizar o deploy do nosso front e do nosso back em homologação a cada merge",
          "Criar uma lane do fastlane que gera o build e envia para a faixa de teste, rodando na máquina local",
          "Executar a mesma lane no pipeline, com os segredos guardados nas variáveis protegidas"
        ]
      },
      discussao: [
        "Quais passos manuais ainda existem entre o nosso merge e a produção?",
        "Quem consegue publicar o app hoje, e de qual máquina?"
      ],
      refs: ["Documentação do fastlane (docs.fastlane.tools)", "Continuous Delivery — Jez Humble e David Farley"]
    },
    slides: {
      gancho: "Se o deploy depende de uma pessoa e de uma máquina específicas, o que acontece quando ela não está?",
      abertura: [
        "Deploy manual é lento, varia de pessoa para pessoa e não deixa registro",
        "Publicar aplicativo na mão envolve dezenas de cliques e certificados na máquina de alguém",
        "Automatizar transforma o lançamento em rotina"
      ],
      teoria: [
        ["O build gera arquivos estáticos com nome versionado", "Os arquivos vão para um servidor de arquivos com distribuição de conteúdo; depois, limpa-se o cache", "Cada merge request pode ganhar um ambiente de prévia com endereço próprio"],
        ["O pipeline gera uma imagem identificada pelo commit", "Migrações de banco compatíveis com a versão anterior rodam antes da troca", "A verificação de saúde decide se a versão nova fica; reverter é apontar para a imagem anterior"],
        ["Homologação automática; produção com aprovação", "Segredos em variáveis protegidas, nunca no repositório", "O mesmo artefato passa por todos os ambientes"],
        ["Ferramenta de código aberto, em Ruby, para automatizar build e publicação de apps", "Fastfile: o arquivo de receitas; lane: uma receita com nome", "Ações: build_app, upload_to_testflight, upload_to_play_store, match e run_tests"],
        ["Na máquina: bundle exec fastlane ios beta; no pipeline: o mesmo comando", "match guarda certificados e perfis cifrados em um repositório privado", "Acesso às lojas por chave de API, sem senha pessoal; build de iOS exige executor macOS"]
      ],
      preparo: "Crie antes a chave de API do App Store Connect e a conta de serviço do Google Play: as aprovações podem levar tempo."
    },
    pratica: {
      intro: "O pipeline de deploy do front e do back em GitLab CI e a configuração do fastlane para iOS e Android, com os comandos para rodar na máquina local e os jobs para rodar no pipeline.",
      blocos: [
        { nome: ".gitlab-ci.yml — front-end e back-end", codigo: `stages: [testar, empacotar, homologacao, producao]

# ---------------- FRONT-END ----------------
front:build:
  stage: empacotar
  image: node:22
  script:
    - cd front && npm ci && npm run build
  artifacts:
    paths: [front/dist/]

.front:publicar:
  image:
    name: amazon/aws-cli:latest
    entrypoint: [""]
  script:
    - aws s3 sync front/dist/ "s3://$BUCKET" --delete
    - aws cloudfront create-invalidation --distribution-id "$CDN_ID" --paths "/*"

front:homologacao:
  extends: .front:publicar
  stage: homologacao
  environment: homologacao
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

front:producao:
  extends: .front:publicar
  stage: producao
  environment: producao
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: manual

# ---------------- BACK-END ----------------
back:imagem:
  stage: empacotar
  image: docker:27
  services: [docker:27-dind]
  script:
    - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
    - docker build -t "$CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA" back/
    - docker push "$CI_REGISTRY_IMAGE/api:$CI_COMMIT_SHORT_SHA"

.back:publicar:
  image: alpine:3.20
  before_script:
    - apk add --no-cache openssh-client curl
  script:
    - ssh "$SERVIDOR" "cd /srv/api && VERSAO=$CI_COMMIT_SHORT_SHA docker compose run --rm api npm run migrar"
    - ssh "$SERVIDOR" "cd /srv/api && VERSAO=$CI_COMMIT_SHORT_SHA docker compose up -d api"
    - curl --fail --retry 10 --retry-delay 3 --retry-connrefused "$URL_API/saude"

back:homologacao:
  extends: .back:publicar
  stage: homologacao
  environment: homologacao
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

back:producao:
  extends: .back:publicar
  stage: producao
  environment: producao
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: manual` },
        { nome: "Gemfile", codigo: `source "https://rubygems.org"

# Versão fixada: a mesma na máquina de todos e no pipeline
gem "fastlane"` },
        { nome: "fastlane/Fastfile", codigo: `# Rodar localmente:   bundle exec fastlane ios beta
#                      bundle exec fastlane android beta
# No pipeline é exatamente o mesmo comando.

platform :ios do
  desc "Gera o build e envia para o TestFlight"
  lane :beta do
    setup_ci if is_ci                      # prepara o chaveiro temporário no pipeline

    app_store_connect_api_key(             # acesso por chave de API, sem senha pessoal
      key_id: ENV["ASC_KEY_ID"],
      issuer_id: ENV["ASC_ISSUER_ID"],
      key_filepath: ENV["ASC_KEY_PATH"]
    )

    match(type: "appstore", readonly: is_ci)   # baixa certificados e perfis do repositório cifrado

    increment_build_number(
      build_number: latest_testflight_build_number + 1
    )

    build_app(scheme: "MeuApp")            # gera o arquivo .ipa
    upload_to_testflight(skip_waiting_for_build_processing: true)
  end

  desc "Roda os testes"
  lane :testes do
    run_tests(scheme: "MeuApp")
  end
end

platform :android do
  desc "Gera o pacote e envia para a faixa de teste interno"
  lane :beta do
    gradle(task: "clean bundleRelease", project_dir: "android/")

    upload_to_play_store(
      track: "internal",
      json_key: ENV["PLAY_JSON_KEY_PATH"],   # conta de serviço do Google Play
      aab: "android/app/build/outputs/bundle/release/app-release.aab"
    )
  end

  desc "Promove a versão de teste interno para produção, liberando para 10%"
  lane :producao do
    upload_to_play_store(
      track: "internal",
      track_promote_to: "production",
      rollout: "0.1",
      json_key: ENV["PLAY_JSON_KEY_PATH"]
    )
  end
end` },
        { nome: "terminal — execução local", codigo: `# Uma vez por máquina
gem install bundler
bundle install                       # instala o fastlane na versão do Gemfile

# Uma vez por projeto
bundle exec fastlane init            # cria a pasta fastlane/ e o Fastfile
bundle exec fastlane match init      # configura o repositório cifrado de certificados
bundle exec fastlane match appstore  # gera e guarda certificado e perfil

# No dia a dia
export ASC_KEY_ID=...  ASC_ISSUER_ID=...  ASC_KEY_PATH=./chave.p8
export MATCH_PASSWORD=...            # senha do repositório de certificados
export PLAY_JSON_KEY_PATH=./conta-de-servico.json

bundle exec fastlane ios testes
bundle exec fastlane ios beta        # build + envio ao TestFlight
bundle exec fastlane android beta    # build + envio ao teste interno do Google Play
bundle exec fastlane lanes           # lista as receitas disponíveis` },
        { nome: ".gitlab-ci.yml — aplicativos", codigo: `android:beta:
  stage: homologacao
  image: reactnativecommunity/react-native-android:latest   # ou outra imagem com Android SDK e Ruby
  script:
    - bundle install
    - bundle exec fastlane android beta
  rules:
    - if: $CI_COMMIT_TAG                # publica quando uma tag de versão é criada

ios:beta:
  stage: homologacao
  tags: [macos]                         # precisa de um executor macOS com Xcode
  script:
    - bundle install
    - bundle exec fastlane ios beta
  rules:
    - if: $CI_COMMIT_TAG

# Variáveis protegidas no GitLab (Settings > CI/CD > Variables):
#   ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH (tipo arquivo), MATCH_PASSWORD,
#   PLAY_JSON_KEY_PATH (tipo arquivo)` },
        { nome: "O que cada ferramenta do fastlane faz", tabela: {
          colunas: ["Ação", "Nome antigo", "Função"],
          linhas: [
            ["build_app", "gym", "Gera o build do iOS"],
            ["upload_to_testflight", "pilot", "Envia o build ao TestFlight e gerencia testadores"],
            ["upload_to_app_store", "deliver", "Envia build, textos e capturas para a App Store"],
            ["sync_code_signing", "match", "Sincroniza certificados e perfis entre máquinas e pipeline"],
            ["run_tests", "scan", "Roda os testes do iOS"],
            ["gradle", "—", "Executa tarefas do Gradle no Android"],
            ["upload_to_play_store", "supply", "Envia o pacote e a ficha para o Google Play"],
            ["capture_screenshots", "snapshot / screengrab", "Gera as capturas de tela da loja automaticamente"]
          ]
        } }
      ],
      observar: "O pipeline não tem lógica própria de publicação: ele só chama a lane. Assim, o que funciona na máquina funciona no pipeline, e qualquer pessoa do time consegue publicar."
    }
  },

  /* ===================== 47 — TypeScript ===================== */
  {
    tema: {
      titulo: "TypeScript: tipos como ferramenta de design",
      cat: "codigo", nivel: "Intermediário", perfil: "Front-end ou Back-end",
      resumo: "Tipos servem para mais do que evitar erro de digitação: eles documentam o domínio e tornam estados inválidos impossíveis de escrever. Vemos como modelar com tipos e onde eles não protegem.",
      teoria: [
        "Por que tipar: erro mais cedo, documentação viva e refatoração segura",
        "Do básico às uniões: literais, estreitamento e tipos opcionais",
        "Tornar estados impossíveis irrepresentáveis",
        "Genéricos e tipos utilitários",
        "A fronteira: dados externos, any, unknown e validação em tempo de execução"
      ],
      pratica: {
        titulo: "Modelar um estado nosso com tipos",
        passos: [
          "Achar no nosso código um objeto com vários booleanos ou campos opcionais que dependem uns dos outros",
          "Remodelar como união discriminada e deixar o compilador apontar os lugares a corrigir",
          "Adicionar validação em tempo de execução na entrada de dados da API"
        ]
      },
      discussao: [
        "Onde usamos any hoje e o que ele está escondendo?",
        "Que erro recente de produção o compilador teria pego?"
      ],
      refs: ["Effective TypeScript — Dan Vanderkam", "Manual oficial do TypeScript (typescriptlang.org)"]
    },
    slides: {
      gancho: "Uma tela pode estar carregando e com erro ao mesmo tempo? No nosso código, pode?",
      abertura: [
        "Erro pego pelo compilador custa segundos; em produção, custa horas",
        "Tipos são a documentação que não fica desatualizada",
        "Com bons tipos, renomear e mover código deixa de dar medo"
      ],
      teoria: [
        ["O compilador verifica o que o teste esqueceu de cobrir", "O editor completa, navega e renomeia com segurança", "O tipo de uma função diz o que ela espera e o que devolve"],
        ["Tipos literais: 'aberto' | 'pago' em vez de texto qualquer", "Estreitamento: dentro de um if, o tipo fica mais específico", "Opcional explícito obriga a tratar a ausência"],
        ["Vários booleanos permitem combinações sem sentido", "União discriminada: cada estado carrega só os dados que fazem sentido nele", "Com verificação exaustiva, esquecer um estado vira erro de compilação"],
        ["Genéricos: uma função ou tipo que vale para vários tipos, sem perder a informação", "Utilitários: Partial, Pick, Omit e Record derivam tipos a partir de outros", "Derivar em vez de duplicar mantém os tipos em sincronia"],
        ["Os tipos somem na execução: a resposta de uma API pode ser qualquer coisa", "unknown obriga a verificar; any desliga a verificação", "Valide na entrada com um esquema e confie nos tipos do lado de dentro"]
      ],
      preparo: "Ative o modo estrito em um projeto de exemplo e escolha um objeto real do time com vários booleanos de estado."
    },
    pratica: {
      intro: "O estado de uma tela modelado com booleanos e depois com união discriminada, tipos derivados com utilitários e a validação de dados externos.",
      blocos: [
        { nome: "estado.ts (antes)", codigo: `// Quatro campos independentes permitem 16 combinações. Só 4 fazem sentido.
interface EstadoDaTela {
  carregando: boolean;
  erro?: string;
  pedidos?: Pedido[];
  vazio: boolean;
}

// Nada impede este estado absurdo:
const estado: EstadoDaTela = {
  carregando: true,
  erro: "Falha de rede",
  pedidos: [],
  vazio: false,
};

function titulo(estado: EstadoDaTela) {
  if (estado.carregando) return "Carregando...";
  if (estado.erro) return estado.erro;
  return estado.pedidos!.length + " pedidos";   // "!" = confie em mim. Um dia, quebra.
}` },
        { nome: "estado.ts (depois)", codigo: `// Cada estado carrega apenas os dados que existem nele.
type EstadoDaTela =
  | { situacao: "carregando" }
  | { situacao: "erro"; mensagem: string }
  | { situacao: "vazio" }
  | { situacao: "pronto"; pedidos: Pedido[] };

function titulo(estado: EstadoDaTela): string {
  switch (estado.situacao) {
    case "carregando":
      return "Carregando...";
    case "erro":
      return estado.mensagem;                    // mensagem só existe aqui
    case "vazio":
      return "Nenhum pedido encontrado";
    case "pronto":
      return estado.pedidos.length + " pedidos"; // pedidos só existe aqui, sem "!"
    default: {
      // Se alguém criar um estado novo e esquecer de tratá-lo, isto não compila.
      const esquecido: never = estado;
      return esquecido;
    }
  }
}

// const invalido: EstadoDaTela = { situacao: "carregando", mensagem: "x" };
//   Erro de compilação: 'mensagem' não existe em { situacao: "carregando" }` },
        { nome: "utilitarios.ts", codigo: `interface Pedido {
  id: number;
  clienteId: number;
  situacao: "aberto" | "pago" | "cancelado";
  total: number;
  criadoEm: Date;
}

// Derivar em vez de duplicar: se Pedido mudar, estes acompanham.
type NovoPedido = Omit<Pedido, "id" | "criadoEm">;             // o que o cliente envia
type AlteracaoDePedido = Partial<Pick<Pedido, "situacao">>;    // o que pode ser alterado
type RotulosDeSituacao = Record<Pedido["situacao"], string>;   // um rótulo por situação

const rotulos: RotulosDeSituacao = {
  aberto: "Em aberto",
  pago: "Pago",
  cancelado: "Cancelado",
  // Esquecer uma situação, ou inventar uma, é erro de compilação.
};

// Genérico: a mesma estrutura de página serve para qualquer item
interface Pagina<T> {
  itens: T[];
  proximaPagina: number | null;
}

async function buscarPagina<T>(caminho: string): Promise<Pagina<T>> {
  const resposta = await fetch(caminho);
  return resposta.json();
}

const pagina = await buscarPagina<Pedido>("/api/pedidos");
pagina.itens[0].total;        // o editor sabe que é number` },
        { nome: "fronteira.ts", codigo: `import { z } from "zod";

// O esquema valida em tempo de execução E gera o tipo: uma única fonte da verdade.
const PedidoDaApi = z.object({
  id: z.number().int(),
  situacao: z.enum(["aberto", "pago", "cancelado"]),
  total: z.number().nonnegative(),
});

type PedidoDaApi = z.infer<typeof PedidoDaApi>;

async function buscarPedido(id: number): Promise<PedidoDaApi> {
  const resposta = await fetch("/api/pedidos/" + id);
  const dados: unknown = await resposta.json();   // unknown: ainda não sabemos o que veio

  // Se a API mudar o formato, o erro aparece aqui, com mensagem clara,
  // e não três telas depois como "undefined is not a function".
  return PedidoDaApi.parse(dados);
}` }
      ],
      observar: "Na versão com união, o estado absurdo simplesmente não compila. Os tipos protegem o lado de dentro; na fronteira, quem protege é a validação."
    }
  },

  /* ===================== 48 — LGPD ===================== */
  {
    tema: {
      titulo: "LGPD e privacidade para quem desenvolve",
      cat: "seguranca", nivel: "Básico", perfil: "Back-end ou QA, com apoio do encarregado de dados",
      resumo: "Fechamento do quarto ano. A lei de proteção de dados vira requisito técnico em cada tela, tabela e log. Vemos os conceitos essenciais e o que muda no dia a dia de quem escreve código. Conteúdo técnico: decisões jurídicas ficam com o encarregado e o jurídico.",
      teoria: [
        "Conceitos: dado pessoal, dado sensível, titular, controlador, operador e bases legais",
        "Direitos do titular e o que eles exigem do sistema",
        "Privacidade desde a concepção: minimizar, proteger e definir prazo de guarda",
        "No dia a dia: logs, ambientes de teste, métricas de uso e serviços de terceiros",
        "Incidentes: o que fazer e a quem comunicar"
      ],
      pratica: {
        titulo: "Mapa dos dados pessoais do nosso sistema",
        passos: [
          "Listar as tabelas e os campos com dados pessoais, com finalidade e prazo de guarda",
          "Procurar dados pessoais em logs e em ambientes de teste",
          "Escolher as três correções mais urgentes e registrar no backlog"
        ]
      },
      discussao: [
        "Retrospectiva do ano 4: o que mudou no nosso jeito de migrar, testar e publicar?",
        "Se um titular pedir hoje a exclusão dos próprios dados, conseguimos atender? Em quanto tempo?"
      ],
      refs: ["Lei nº 13.709/2018 (LGPD) e guias orientativos da ANPD (gov.br/anpd)", "OWASP Top 10 Privacy Risks"]
    },
    slides: {
      gancho: "Sabemos dizer, agora, em quais tabelas e logs está o CPF dos nossos usuários?",
      abertura: [
        "Dado pessoal é responsabilidade de quem coleta, do cadastro ao backup",
        "A maior parte das exigências da lei se resolve em decisões de projeto",
        "Privacidade bem cuidada é também um argumento de confiança do produto"
      ],
      teoria: [
        ["Dado pessoal identifica alguém; dado sensível (saúde, biometria, religião e outros) exige cuidado maior", "Controlador decide o tratamento; operador trata em nome dele", "Todo tratamento precisa de uma base legal: consentimento é só uma delas"],
        ["Acesso e portabilidade: exportar os dados de uma pessoa", "Correção e exclusão: alterar e apagar em todos os lugares, respeitando obrigações de guarda", "Revogar consentimento: precisa ser tão fácil quanto dar"],
        ["Coletar só o necessário para a finalidade declarada", "Cifrar em trânsito e em repouso; pseudonimizar quando possível", "Definir prazo de guarda e rotina de descarte"],
        ["Logs sem dados pessoais, ou com máscara", "Ambientes de teste com dados fictícios ou anonimizados, nunca cópia da produção", "Inventário de terceiros: cada SDK e serviço que recebe dados"],
        ["Plano de resposta pronto antes do incidente", "Incidente com risco relevante é comunicado à ANPD e aos titulares; o regulamento da ANPD fixa prazo curto, em dias úteis", "Registrar o que aconteceu, o impacto e as medidas tomadas"]
      ],
      preparo: "Convide o encarregado de dados da empresa para o encontro e confira com ele os prazos vigentes do regulamento de incidentes."
    },
    pratica: {
      intro: "Um inventário de dados pessoais preenchido (fictício), uma função de máscara para logs (executável) e um roteiro de anonimização da base de testes.",
      blocos: [
        { nome: "Inventário de dados pessoais", tabela: {
          colunas: ["Tabela.campo", "Dado", "Finalidade", "Base legal", "Guarda", "Quem acessa"],
          linhas: [
            ["clientes.nome, email", "Identificação e contato", "Cadastro e comunicação do pedido", "Execução de contrato", "Enquanto a conta existir", "Vendas e suporte"],
            ["clientes.cpf", "Documento", "Emissão de nota fiscal", "Obrigação legal", "5 anos após a última nota", "Financeiro"],
            ["clientes.data_nascimento", "Data de nascimento", "Nenhuma identificada", "—", "—", "Remover a coleta"],
            ["pedidos.endereco_entrega", "Endereço", "Entrega", "Execução de contrato", "5 anos (fiscal)", "Logística"],
            ["acessos.ip", "Endereço de rede", "Segurança e registro de acesso", "Obrigação legal", "6 meses", "Infra"],
            ["marketing.preferencias", "Interesses", "Envio de ofertas", "Consentimento", "Até a revogação", "Marketing"]
          ]
        } },
        { nome: "mascarar-logs.js", rodar: true, codigo: `// Campos que nunca devem aparecer inteiros em log
const mascaras = {
  email: (valor) => valor.replace(/^(.).*(@.*)$/, "$1***$2"),
  cpf: (valor) => "***.***.***-" + String(valor).slice(-2),
  telefone: (valor) => "(**) *****-" + String(valor).slice(-4),
  senha: () => "[removido]",
  cartao: () => "[removido]",
};

function mascarar(dados) {
  if (Array.isArray(dados)) return dados.map(mascarar);
  if (dados === null || typeof dados !== "object") return dados;

  return Object.fromEntries(
    Object.entries(dados).map(([chave, valor]) => [
      chave,
      mascaras[chave] ? mascaras[chave](valor) : mascarar(valor),
    ])
  );
}

const registrar = (mensagem, dados) =>
  console.log(JSON.stringify({ mensagem, ...mascarar(dados) }));

registrar("Pedido criado", {
  pedidoId: 12841,
  cliente: { nome: "Ana Souza", email: "ana.souza@exemplo.com", cpf: "529.982.247-25" },
  telefone: "14999990000",
  senha: "segredo123",
});
// {"mensagem":"Pedido criado","pedidoId":12841,"cliente":{"nome":"Ana Souza",
//  "email":"a***@exemplo.com","cpf":"***.***.***-25"},"telefone":"(**) *****-0000","senha":"[removido]"}` },
        { nome: "anonimizar-base-de-teste.sql", codigo: `-- Roda na CÓPIA destinada a testes, nunca na produção.
-- Mantém o formato e as relações; remove a ligação com pessoas reais.

UPDATE clientes SET
  nome            = 'Cliente ' || id,
  email           = 'cliente' || id || '@teste.invalid',
  cpf             = lpad(id::text, 11, '0'),
  telefone        = '1400000' || lpad((id % 10000)::text, 4, '0'),
  data_nascimento = NULL;

UPDATE pedidos SET
  endereco_entrega = 'Rua de Teste, ' || id,
  observacoes      = NULL;              -- texto livre costuma esconder dados pessoais

TRUNCATE acessos;                       -- registros de acesso não são necessários em teste

-- Conferência: nenhum e-mail real pode ter sobrado
SELECT count(*) FROM clientes WHERE email NOT LIKE '%@teste.invalid';` },
        { nome: "Direitos do titular e o que o sistema precisa ter", tabela: {
          colunas: ["Direito", "Funcionalidade necessária"],
          linhas: [
            ["Confirmação e acesso", "Exportar todos os dados de uma pessoa em formato legível"],
            ["Correção", "Tela ou canal para atualizar dados cadastrais"],
            ["Exclusão", "Rotina que apaga ou anonimiza em todas as tabelas, respeitando a guarda obrigatória"],
            ["Portabilidade", "Exportação em formato estruturado"],
            ["Revogação do consentimento", "Opção visível para desligar o que depende de consentimento"],
            ["Informação sobre compartilhamento", "Lista atualizada de terceiros que recebem dados"]
          ]
        } }
      ],
      observar: "O inventário revelou um dado coletado sem finalidade: a correção é parar de coletar. Nos logs, a máscara mantém o que ajuda a investigar e remove o que identifica."
    }
  }
];

/* -------- Acrescenta o ano 4 às listas usadas pelo site -------- */
CONFIG.anos.push({
  titulo: "Evolução e especialização",
  descricao: "Migração de front-end legado, mobile de ponta a ponta, ferramentas do dia a dia e novos paradigmas."
});

ANO_4.forEach((item) => {
  TEMAS.push(item.tema);
  APRESENTACOES.push(item.slides);
  PRATICAS.push(item.pratica);
});
