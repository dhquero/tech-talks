/* ==========================================================================
   DADOS DO PROGRAMA
   Este é o único arquivo que o time precisa editar no dia a dia:
   - CONFIG.inicio ......... mês do primeiro encontro (AAAA-MM)
   - TEMAS[n].apresentador . nome de quem vai apresentar
   - TEMAS[n].material ..... link dos slides/gravação depois do encontro
   A ordem do array TEMAS define o mês de cada tema.
   ========================================================================== */

const CONFIG = {
  nome: "Tech Talks",
  subtitulo: "Um tema por mês, uma pessoa do time no palco, uma hora de teoria e prática.",
  inicio: "2027-01",
  roteiro: [
    { etapa: "Abertura", minutos: 5, descricao: "Contexto: por que esse tema importa para o nosso time" },
    { etapa: "Teoria", minutos: 25, descricao: "Conceitos essenciais, com exemplos reais" },
    { etapa: "Prática", minutos: 20, descricao: "Demonstração ao vivo ou exercício em grupo" },
    { etapa: "Discussão", minutos: 10, descricao: "Perguntas e o que vamos aplicar a partir de amanhã" }
  ],
  anos: [
    { titulo: "Fundamentos", descricao: "A base comum: código legível, testes, containers, fluxo de trabalho e segurança." },
    { titulo: "Arquitetura e escala", descricao: "Como organizar sistemas e times para crescer sem perder velocidade." },
    { titulo: "Maturidade e futuro", descricao: "Sistemas distribuídos, agentes de IA, resiliência e evolução do time." }
  ]
};

const CATEGORIAS = {
  codigo:      { nome: "Código Limpo",        matiz: 150 },
  arquitetura: { nome: "Arquitetura",         matiz: 265 },
  qa:          { nome: "Qualidade (QA)",      matiz: 20 },
  infra:       { nome: "Infra & DevOps",      matiz: 205 },
  ia:          { nome: "Inteligência Artificial", matiz: 320 },
  times:       { nome: "Times & Processos",   matiz: 45 },
  front:       { nome: "Front-end & Mobile",  matiz: 180 },
  back:        { nome: "Back-end & Dados",    matiz: 235 },
  seguranca:   { nome: "Segurança",           matiz: 0 }
};

const TEMAS = [
  /* ============================ ANO 1 — FUNDAMENTOS ============================ */
  {
    titulo: "Código Limpo: nomes, funções e a regra do escoteiro",
    cat: "codigo", nivel: "Básico", perfil: "Qualquer dev",
    resumo: "Código é lido muito mais vezes do que é escrito. Neste encontro alinhamos o que o time entende por código legível e como chegar lá sem reescrever tudo.",
    teoria: [
      "Nomes que revelam intenção: variáveis, funções e classes",
      "Funções pequenas, com um único nível de abstração e poucos argumentos",
      "Comentários: quando explicam o porquê e quando escondem código ruim",
      "Regra do escoteiro: deixar o arquivo melhor do que você encontrou"
    ],
    pratica: {
      titulo: "Refatoração ao vivo de uma função real",
      passos: [
        "Escolher uma função do nosso repositório com mais de 40 linhas",
        "Renomear, extrair funções e remover números mágicos, um passo por commit",
        "Comparar o antes e o depois e votar: o que vira padrão do time?"
      ]
    },
    codigo: {
      antes: `function calc(p, t) {
  let v = 0;
  for (let i = 0; i < p.length; i++) {
    if (p[i].s === 1 && p[i].q > 0) {
      v += p[i].pr * p[i].q;
    }
  }
  if (t === 2) v = v - v * 0.1;
  return v;
}`,
      depois: `const DESCONTO_CLIENTE_PREMIUM = 0.1;

function calcularTotalDoPedido(itens, cliente) {
  const subtotal = itens
    .filter(estaDisponivel)
    .reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return cliente.ehPremium
    ? aplicarDesconto(subtotal, DESCONTO_CLIENTE_PREMIUM)
    : subtotal;
}

const estaDisponivel = (item) => item.ativo && item.quantidade > 0;
const aplicarDesconto = (valor, taxa) => valor * (1 - taxa);`
    },
    discussao: [
      "Quais convenções de nomes queremos registrar no nosso guia de estilo?",
      "Onde a pressa de entrega mais prejudica a legibilidade hoje?"
    ],
    refs: ["Clean Code — Robert C. Martin", "The Pragmatic Programmer — Andrew Hunt e David Thomas"]
  },
  {
    titulo: "Testes automatizados: pirâmide de testes e TDD na prática",
    cat: "qa", nivel: "Básico", perfil: "QA ou Back-end",
    resumo: "O que testar, em que nível e quanto custa cada tipo de teste. E um primeiro contato com o ciclo vermelho, verde, refatorar.",
    teoria: [
      "Pirâmide de testes: unitário, integração e ponta a ponta",
      "Anatomia de um bom teste: Arrange, Act, Assert",
      "Dublês de teste: stub, mock e fake, e quando cada um atrapalha",
      "TDD como ferramenta de design, não só de verificação"
    ],
    pratica: {
      titulo: "Kata em duplas com TDD",
      passos: [
        "Resolver o kata FizzBuzz ou Calculadora de Strings escrevendo o teste primeiro",
        "Trocar o piloto a cada ciclo vermelho, verde, refatorar",
        "Rodar a cobertura e discutir o que o número diz (e o que não diz)"
      ]
    },
    discussao: [
      "Como está a nossa pirâmide hoje? Parece mais um sorvete?",
      "Qual módulo mais se beneficiaria de testes unitários agora?"
    ],
    refs: ["Test-Driven Development: By Example — Kent Beck", "The Practical Test Pyramid — Ham Vocke (martinfowler.com)"]
  },
  {
    titulo: "Git além do básico: branches, commits e code review",
    cat: "times", nivel: "Básico", perfil: "Qualquer dev",
    resumo: "O histórico do repositório é documentação. Revisamos fluxos de branch, mensagens de commit e como fazer revisões de código que ensinam em vez de travar.",
    teoria: [
      "Trunk-based, GitFlow e GitHub Flow: prós, contras e o que combina com o nosso ciclo",
      "Commits atômicos e o padrão Conventional Commits",
      "Rebase, merge e squash: o que cada um faz com o histórico",
      "Code review: tamanho ideal de merge request, tom dos comentários e checklists"
    ],
    pratica: {
      titulo: "Resgate de um histórico bagunçado",
      passos: [
        "Em um repositório de treino, reorganizar commits com rebase interativo",
        "Resolver um conflito de merge ao vivo e encontrar um bug com git bisect",
        "Revisar em grupo um merge request real e reescrever comentários pouco úteis"
      ]
    },
    discussao: [
      "Nosso tempo médio de revisão é aceitável? O que o deixa lento?",
      "Vale adotar um template de merge request?"
    ],
    refs: ["Pro Git — Scott Chacon e Ben Straub", "Especificação Conventional Commits"]
  },
  {
    titulo: "IA no dia a dia do dev: assistentes de código e bons prompts",
    cat: "ia", nivel: "Básico", perfil: "Qualquer pessoa do time",
    resumo: "Assistentes de código já fazem parte do trabalho. Como pedir bem, como revisar o que volta e onde eles ainda erram com convicção.",
    teoria: [
      "Como um modelo de linguagem gera código e por que ele alucina",
      "Prompts eficazes: contexto, exemplos, restrições e formato de saída",
      "Fluxos de uso: autocompletar, conversa e agentes que executam tarefas",
      "Riscos: dados sensíveis, licenças e revisão humana obrigatória"
    ],
    pratica: {
      titulo: "A mesma tarefa, três prompts",
      passos: [
        "Pedir a mesma funcionalidade com um prompt vago, um detalhado e um com exemplos",
        "Comparar os resultados e rodar os testes em cada um",
        "Montar a primeira versão da biblioteca de prompts do time"
      ]
    },
    discussao: [
      "Que tipo de tarefa delegamos com segurança e qual não delegamos?",
      "Que informações nunca devem ir para um assistente externo?"
    ],
    refs: ["AI Engineering — Chip Huyen", "Documentação oficial do assistente adotado pelo time"]
  },
  {
    titulo: "Princípios SOLID com exemplos do nosso código",
    cat: "codigo", nivel: "Intermediário", perfil: "Back-end ou Mobile",
    resumo: "Cinco princípios que explicam por que algumas classes são fáceis de mudar e outras quebram tudo ao redor. Sem decoreba: um exemplo concreto para cada letra.",
    teoria: [
      "Responsabilidade única e o conceito de motivo para mudar",
      "Aberto/fechado: estender comportamento sem editar o que já funciona",
      "Substituição de Liskov e segregação de interfaces",
      "Inversão de dependência: depender de abstrações, não de detalhes"
    ],
    pratica: {
      titulo: "Caça às violações",
      passos: [
        "Em grupos, identificar qual princípio cada trecho de código viola",
        "Refatorar uma classe que faz validação, persistência e envio de e-mail",
        "Mostrar como a versão refatorada fica mais fácil de testar"
      ]
    },
    codigo: {
      antes: `class RelatorioDeVendas {
  gerar(vendas) {
    const db = new MySqlConnection("prod");      // detalhe fixo
    const dados = db.query("SELECT ...");
    const html = "<h1>Vendas</h1>" + dados.map(/* ... */);
    new SmtpClient().send("diretoria@empresa.com", html);
  }
}`,
      depois: `class RelatorioDeVendas {
  constructor(repositorio, formatador, notificador) {
    this.repositorio = repositorio;   // abstrações injetadas
    this.formatador = formatador;
    this.notificador = notificador;
  }

  async gerar(periodo) {
    const vendas = await this.repositorio.buscarPorPeriodo(periodo);
    const documento = this.formatador.formatar(vendas);
    await this.notificador.enviar(documento);
  }
}

// Trocar MySQL por API, HTML por PDF ou e-mail por Slack
// não exige mexer em RelatorioDeVendas.`
    },
    discussao: [
      "Quando aplicar SOLID vira excesso de engenharia?",
      "Qual classe do nosso sistema tem mais motivos para mudar?"
    ],
    refs: ["Clean Architecture (parte III) — Robert C. Martin", "Agile Software Development: Principles, Patterns, and Practices — Robert C. Martin"]
  },
  {
    titulo: "Docker e containers do zero",
    cat: "infra", nivel: "Básico", perfil: "Back-end ou Infra",
    resumo: "Acabar com o 'na minha máquina funciona'. O que é um container, como escrever um bom Dockerfile e como subir o ambiente inteiro com um comando.",
    teoria: [
      "Container não é máquina virtual: namespaces, cgroups e imagens em camadas",
      "Dockerfile bem escrito: cache de camadas, multi-stage build e imagens pequenas",
      "Volumes, redes e variáveis de ambiente",
      "Docker Compose para o ambiente local de desenvolvimento"
    ],
    pratica: {
      titulo: "Containerizar uma aplicação nossa",
      passos: [
        "Escrever o Dockerfile de um serviço do time e medir o tamanho da imagem",
        "Reduzir a imagem com multi-stage build",
        "Subir aplicação e banco de dados com um único docker compose up"
      ]
    },
    discussao: [
      "Quanto tempo uma pessoa nova leva para rodar nosso projeto hoje?",
      "O que ainda impede que desenvolvimento e produção sejam parecidos?"
    ],
    refs: ["Docker Deep Dive — Nigel Poulton", "Documentação oficial do Docker"]
  },
  {
    titulo: "Times ágeis: Scrum, Kanban e métricas de fluxo",
    cat: "times", nivel: "Básico", perfil: "Gestão ou liderança técnica",
    resumo: "Agilidade é entregar valor com previsibilidade, não seguir cerimônias. Comparamos Scrum e Kanban e aprendemos a ler as métricas que mostram onde o trabalho trava.",
    teoria: [
      "Scrum e Kanban: o que cada um prescreve e o que deixa em aberto",
      "Limite de trabalho em progresso (WIP) e por que começar menos termina mais",
      "Lead time, cycle time, throughput e diagrama de fluxo cumulativo",
      "Previsão com dados históricos em vez de estimativa por intuição"
    ],
    pratica: {
      titulo: "Raio-x do nosso quadro",
      passos: [
        "Exportar os cartões dos últimos três meses e calcular o cycle time",
        "Identificar a coluna onde os cartões mais envelhecem",
        "Definir um experimento de limite de WIP para o próximo mês"
      ]
    },
    discussao: [
      "Nossas cerimônias ajudam o fluxo ou só ocupam agenda?",
      "Que métrica acompanharíamos toda semana?"
    ],
    refs: ["Kanban — David J. Anderson", "Actionable Agile Metrics for Predictability — Daniel Vacanti"]
  },
  {
    titulo: "APIs REST bem projetadas",
    cat: "back", nivel: "Intermediário", perfil: "Back-end",
    resumo: "Uma API é um contrato com quem consome: front-end, mobile e parceiros. Vemos como desenhar recursos, erros e versões para que ninguém precise adivinhar.",
    teoria: [
      "Modelagem por recursos, verbos HTTP e códigos de status corretos",
      "Paginação, filtros, ordenação e idempotência",
      "Padrão de erros (Problem Details) e versionamento sem quebrar clientes",
      "OpenAPI como fonte da verdade do contrato"
    ],
    pratica: {
      titulo: "Revisão de design de uma API",
      passos: [
        "Front, mobile e back revisam juntos três endpoints existentes",
        "Reescrever o contrato em OpenAPI antes de tocar no código",
        "Gerar um servidor de mock para o front trabalhar em paralelo"
      ]
    },
    discussao: [
      "Que inconsistência da nossa API mais atrapalha front e mobile?",
      "Devemos adotar design-first para novos endpoints?"
    ],
    refs: ["RESTful Web APIs — Leonard Richardson e Mike Amundsen", "Especificação OpenAPI e RFC 9457 (Problem Details)"]
  },
  {
    titulo: "Performance web e Core Web Vitals",
    cat: "front", nivel: "Intermediário", perfil: "Front-end",
    resumo: "Cada segundo de carregamento custa usuários. Aprendemos a medir o que o usuário sente e a atacar os gargalos mais comuns.",
    teoria: [
      "Core Web Vitals: LCP, INP e CLS, e o que cada um mede",
      "Caminho crítico de renderização: o que bloqueia a primeira pintura",
      "Imagens, fontes, code splitting e carregamento sob demanda",
      "Dados de laboratório versus dados de usuários reais"
    ],
    pratica: {
      titulo: "Auditoria de uma tela nossa",
      passos: [
        "Rodar o Lighthouse e o painel de Performance em uma página do produto",
        "Aplicar duas melhorias de alto impacto e medir de novo",
        "Definir um orçamento de performance para o pipeline"
      ]
    },
    discussao: [
      "Qual tela é mais lenta para o usuário e por quê?",
      "Como evitar que a performance regrida a cada entrega?"
    ],
    refs: ["web.dev — guias de Core Web Vitals", "High Performance Browser Networking — Ilya Grigorik"]
  },
  {
    titulo: "Segurança para devs: OWASP Top 10",
    cat: "seguranca", nivel: "Básico", perfil: "Back-end ou QA",
    resumo: "As falhas mais exploradas em aplicações web continuam sendo as mesmas. Entendemos como cada uma acontece atacando uma aplicação de propósito vulnerável.",
    teoria: [
      "Quebra de controle de acesso e falhas de autenticação",
      "Injeção (SQL, comandos) e XSS: a raiz comum é confiar na entrada",
      "Configuração insegura, componentes desatualizados e exposição de dados",
      "Defesa em profundidade: validação, menor privilégio e registros de auditoria"
    ],
    pratica: {
      titulo: "Dia de atacante",
      passos: [
        "Explorar SQL injection e XSS em uma aplicação de treino como o OWASP Juice Shop",
        "Corrigir cada falha e repetir o ataque para confirmar",
        "Montar um checklist de segurança para o code review"
      ]
    },
    discussao: [
      "Qual item do Top 10 mais nos preocupa no nosso produto?",
      "Quem é responsável por segurança no nosso fluxo?"
    ],
    refs: ["OWASP Top 10", "OWASP Cheat Sheet Series"]
  },
  {
    titulo: "Refatoração e code smells: melhorando código legado com segurança",
    cat: "codigo", nivel: "Intermediário", perfil: "Dev sênior",
    resumo: "Refatorar é mudar a estrutura sem mudar o comportamento, em passos pequenos e reversíveis. Aprendemos a reconhecer os maus cheiros e a mexer em código sem testes sem medo.",
    teoria: [
      "Catálogo de code smells: função longa, classe deus, inveja de funcionalidade, obsessão por primitivos",
      "Refatorações clássicas: extrair função, mover método, substituir condicional por polimorfismo",
      "Testes de caracterização: fotografar o comportamento antes de mexer",
      "Refatoração contínua versus projeto de reescrita"
    ],
    pratica: {
      titulo: "Kata Gilded Rose",
      passos: [
        "Cobrir o código legado com testes de caracterização",
        "Refatorar em passos pequenos, com os testes sempre verdes",
        "Adicionar a nova regra de negócio e ver como ficou simples"
      ]
    },
    codigo: {
      antes: `function calcularFrete(pedido) {
  if (pedido.tipo === "expresso") {
    return pedido.peso * 4.5 + 20;
  } else if (pedido.tipo === "economico") {
    return pedido.peso * 1.2;
  } else if (pedido.tipo === "retirada") {
    return 0;
  }
  // cada novo tipo = mais um else if aqui e em outros 5 lugares
}`,
      depois: `const estrategiasDeFrete = {
  expresso:  (pedido) => pedido.peso * 4.5 + 20,
  economico: (pedido) => pedido.peso * 1.2,
  retirada:  () => 0,
};

function calcularFrete(pedido) {
  const estrategia = estrategiasDeFrete[pedido.tipo];
  if (!estrategia) {
    throw new Error("Tipo de frete desconhecido: " + pedido.tipo);
  }
  return estrategia(pedido);
}`
    },
    discussao: [
      "Qual parte do sistema todo mundo tem medo de mexer?",
      "Como reservar tempo para refatoração sem parar as entregas?"
    ],
    refs: ["Refactoring — Martin Fowler", "Working Effectively with Legacy Code — Michael Feathers"]
  },
  {
    titulo: "Dívida técnica: como medir, negociar e pagar",
    cat: "times", nivel: "Intermediário", perfil: "Liderança técnica ou gestão",
    resumo: "Fechamento do primeiro ano. Dívida técnica é uma decisão de negócio e precisa ser tratada como tal: visível, priorizada e com plano de pagamento.",
    teoria: [
      "A metáfora da dívida: juros, principal e o quadrante de Fowler",
      "Como tornar a dívida visível: inventário, hotspots e custo de atraso",
      "Estratégias de pagamento: percentual fixo por ciclo, dias dedicados, junto com a funcionalidade",
      "Como apresentar dívida técnica para quem não é técnico"
    ],
    pratica: {
      titulo: "Inventário da nossa dívida",
      passos: [
        "Cada setor lista suas três maiores dívidas com impacto e esforço",
        "Posicionar tudo em uma matriz de impacto por esforço",
        "Escolher os itens que entram no planejamento do próximo ano"
      ]
    },
    discussao: [
      "Retrospectiva do ano 1: o que os encontros mudaram na prática?",
      "Que temas devemos aprofundar no ano 2?"
    ],
    refs: ["Managing Technical Debt — Kruchten, Nord e Ozkaya", "Technical Debt Quadrant — Martin Fowler"]
  },

  /* ======================= ANO 2 — ARQUITETURA E ESCALA ======================= */
  {
    titulo: "Arquitetura Limpa: a regra da dependência",
    cat: "arquitetura", nivel: "Intermediário", perfil: "Back-end ou arquiteto(a)",
    resumo: "Regras de negócio não deveriam saber qual é o banco de dados, o framework ou a tela. Entendemos as camadas da Arquitetura Limpa e a única regra que sustenta todas elas.",
    teoria: [
      "Entidades, casos de uso, adaptadores e frameworks: o papel de cada camada",
      "A regra da dependência: o código de dentro nunca conhece o de fora",
      "Portas e adaptadores: interfaces definidas pelo domínio, implementadas pela infraestrutura",
      "Custos e limites: quando essa arquitetura é demais para o problema"
    ],
    pratica: {
      titulo: "Um caso de uso, de ponta a ponta",
      passos: [
        "Implementar o caso de uso Cadastrar Cliente sem nenhum framework",
        "Testá-lo com um repositório em memória, sem banco de dados",
        "Trocar o adaptador de persistência sem alterar uma linha do caso de uso"
      ]
    },
    codigo: {
      antes: `// Controller conhece banco, regra de negócio e e-mail
app.post("/clientes", async (req, res) => {
  const existe = await knex("clientes").where({ email: req.body.email });
  if (existe.length) return res.status(409).send("E-mail já usado");
  if (req.body.idade < 18) return res.status(422).send("Menor de idade");
  const [id] = await knex("clientes").insert(req.body);
  await sendgrid.send({ to: req.body.email, template: "boas-vindas" });
  res.status(201).json({ id });
});`,
      depois: `// Camada de aplicação: não sabe o que é HTTP, SQL ou SendGrid
class CadastrarCliente {
  constructor(clientes, notificador) {       // portas (interfaces)
    this.clientes = clientes;
    this.notificador = notificador;
  }

  async executar(dados) {
    const cliente = Cliente.criar(dados);     // regra vive na entidade
    if (await this.clientes.existeComEmail(cliente.email)) {
      throw new EmailJaCadastrado(cliente.email);
    }
    await this.clientes.salvar(cliente);
    await this.notificador.boasVindas(cliente);
    return cliente.id;
  }
}

// No teste: new CadastrarCliente(new ClientesEmMemoria(), new NotificadorFalso())
// Em produção: new CadastrarCliente(new ClientesPostgres(db), new NotificadorEmail())`
    },
    discussao: [
      "Onde nossas regras de negócio estão hoje: no controller, no banco ou no front?",
      "Qual módulo novo poderia nascer com essa estrutura?"
    ],
    refs: ["Clean Architecture — Robert C. Martin", "Get Your Hands Dirty on Clean Architecture — Tom Hombergs"]
  },
  {
    titulo: "CI/CD: da integração contínua à entrega contínua",
    cat: "infra", nivel: "Intermediário", perfil: "Infra ou Back-end",
    resumo: "Um pipeline confiável transforma o deploy em um não-evento. Vemos as etapas essenciais, como mantê-lo rápido e como publicar sem derrubar ninguém.",
    teoria: [
      "Integração, entrega e implantação contínuas: as diferenças",
      "Etapas de um pipeline: build, testes, análise estática, empacotamento e deploy",
      "Estratégias de publicação: rolling, blue-green, canário e feature flags",
      "Pipeline rápido: cache, paralelismo e falhar cedo"
    ],
    pratica: {
      titulo: "Construir um pipeline do zero",
      passos: [
        "Criar um pipeline com lint, testes e build para um projeto de exemplo",
        "Adicionar cache de dependências e medir o ganho de tempo",
        "Publicar em um ambiente de homologação com aprovação manual"
      ]
    },
    discussao: [
      "Quanto tempo leva hoje do merge até produção?",
      "O que nos impede de publicar todos os dias?"
    ],
    refs: ["Continuous Delivery — Jez Humble e David Farley", "Documentação do GitLab CI/CD ou do GitHub Actions"]
  },
  {
    titulo: "Testes de API e testes de contrato",
    cat: "qa", nivel: "Intermediário", perfil: "QA",
    resumo: "Entre o teste unitário e o ponta a ponta existe a camada de melhor custo-benefício. Automatizamos testes de API e garantimos que back, front e mobile não quebrem uns aos outros.",
    teoria: [
      "O que validar em uma API: status, esquema, regras de negócio e casos de erro",
      "Testes de contrato orientados ao consumidor",
      "Massa de dados de teste: fábricas, fixtures e isolamento",
      "Executando a suíte de API no pipeline"
    ],
    pratica: {
      titulo: "Automatizar uma coleção de API",
      passos: [
        "Escrever testes para um endpoint cobrindo o caminho feliz e três erros",
        "Validar a resposta contra o esquema OpenAPI",
        "Quebrar o contrato de propósito e ver o teste falhar antes do front perceber"
      ]
    },
    discussao: [
      "Quantos bugs recentes eram quebra de contrato entre setores?",
      "Quem escreve o teste de API: QA, dev ou ambos?"
    ],
    refs: ["Consumer-Driven Contracts — Ian Robinson (martinfowler.com)", "Documentação do Pact"]
  },
  {
    titulo: "Domain-Driven Design: linguagem ubíqua e contextos delimitados",
    cat: "arquitetura", nivel: "Avançado", perfil: "Back-end ou arquiteto(a)",
    resumo: "O maior risco de um software é modelar o problema errado. DDD aproxima o código da linguagem do negócio e mostra onde traçar as fronteiras do sistema.",
    teoria: [
      "Linguagem ubíqua: o mesmo vocabulário no negócio e no código",
      "Design estratégico: subdomínios, contextos delimitados e mapa de contextos",
      "Design tático: entidades, objetos de valor, agregados e eventos de domínio",
      "Onde DDD compensa e onde um CRUD simples resolve"
    ],
    pratica: {
      titulo: "Event Storming relâmpago",
      passos: [
        "Mapear com post-its os eventos de um fluxo real do nosso produto",
        "Agrupar eventos e identificar os contextos delimitados",
        "Comparar o mapa com a organização atual do código e dos times"
      ]
    },
    discussao: [
      "Que termo do negócio tem significados diferentes em partes do sistema?",
      "Nossas fronteiras de módulo seguem o negócio ou a tecnologia?"
    ],
    refs: ["Domain-Driven Design — Eric Evans", "Learning Domain-Driven Design — Vlad Khononov"]
  },
  {
    titulo: "Arquitetura mobile: estado, offline e multiplataforma",
    cat: "front", nivel: "Intermediário", perfil: "Mobile",
    resumo: "Aplicativos vivem em redes instáveis e aparelhos limitados. Vemos como organizar estado e camadas, como funcionar sem conexão e como escolher entre nativo e multiplataforma.",
    teoria: [
      "Camadas de um app: interface, domínio e dados; MVVM e fluxo unidirecional",
      "Offline-first: cache local, fila de sincronização e resolução de conflitos",
      "Nativo, Flutter, React Native e Kotlin Multiplatform: critérios de escolha",
      "Ciclo de publicação nas lojas e atualização gradual"
    ],
    pratica: {
      titulo: "Tela que funciona no modo avião",
      passos: [
        "Pegar uma tela de listagem e adicionar cache local",
        "Enfileirar uma ação feita offline e sincronizar ao reconectar",
        "Simular rede lenta e avaliar a experiência"
      ]
    },
    discussao: [
      "O que acontece com o nosso app quando a rede cai no meio de uma ação?",
      "Quanto de lógica poderíamos compartilhar entre as plataformas?"
    ],
    refs: ["Guia de arquitetura de apps — Android Developers", "Documentação de arquitetura do Flutter e do React Native"]
  },
  {
    titulo: "Bancos de dados: modelagem, índices e consultas eficientes",
    cat: "back", nivel: "Intermediário", perfil: "Back-end ou DBA",
    resumo: "A maioria dos problemas de performance mora no banco. Aprendemos a ler um plano de execução, a criar o índice certo e a reconhecer o problema N+1.",
    teoria: [
      "Normalização e quando desnormalizar de propósito",
      "Como índices funcionam (árvore B) e por que nem todo índice ajuda",
      "Plano de execução: ler um EXPLAIN sem medo",
      "Transações, níveis de isolamento e o problema N+1 dos ORMs"
    ],
    pratica: {
      titulo: "Clínica de consultas lentas",
      passos: [
        "Trazer três consultas lentas reais do nosso sistema",
        "Analisar o plano de execução de cada uma",
        "Aplicar índice ou reescrita e medir antes e depois"
      ]
    },
    discussao: [
      "Monitoramos consultas lentas em produção?",
      "Onde o ORM está escondendo consultas demais?"
    ],
    refs: ["Designing Data-Intensive Applications — Martin Kleppmann", "Use The Index, Luke — Markus Winand"]
  },
  {
    titulo: "Observabilidade: logs, métricas e rastreamento",
    cat: "infra", nivel: "Intermediário", perfil: "Infra ou Back-end",
    resumo: "Monitorar diz que algo quebrou; observar permite descobrir por quê. Os três pilares, como instrumentar uma aplicação e como criar alertas que valem a pena acordar.",
    teoria: [
      "Logs estruturados, métricas e rastreamento distribuído",
      "OpenTelemetry como padrão de instrumentação",
      "SLI, SLO e orçamento de erro",
      "Alertas acionáveis e como evitar a fadiga de alertas"
    ],
    pratica: {
      titulo: "Seguir uma requisição de ponta a ponta",
      passos: [
        "Instrumentar um serviço com OpenTelemetry",
        "Visualizar o caminho de uma requisição lenta e achar o gargalo",
        "Definir um SLO e o alerta correspondente"
      ]
    },
    discussao: [
      "No último incidente, quanto tempo levamos para achar a causa?",
      "Quais alertas atuais ninguém mais lê?"
    ],
    refs: ["Observability Engineering — Majors, Fong-Jones e Miranda", "Documentação do OpenTelemetry"]
  },
  {
    titulo: "LLMs por dentro: tokens, embeddings e RAG",
    cat: "ia", nivel: "Intermediário", perfil: "Back-end ou entusiasta de IA",
    resumo: "Para construir produtos com IA é preciso entender a máquina. Vemos como um modelo de linguagem funciona e montamos uma busca que responde com base nos nossos próprios documentos.",
    teoria: [
      "Tokens, janela de contexto e temperatura",
      "Embeddings e busca por similaridade em bancos vetoriais",
      "RAG: recuperar contexto relevante antes de gerar a resposta",
      "Ajuste fino, RAG ou só um bom prompt: como decidir"
    ],
    pratica: {
      titulo: "Pergunte à nossa documentação",
      passos: [
        "Dividir a documentação interna em trechos e gerar embeddings",
        "Montar a busca semântica e conectar a um modelo de linguagem",
        "Testar perguntas reais e analisar acertos e erros"
      ]
    },
    discussao: [
      "Que funcionalidade do nosso produto ganharia com isso?",
      "Como medimos se as respostas são boas o suficiente?"
    ],
    refs: ["AI Engineering — Chip Huyen", "Hands-On Large Language Models — Jay Alammar e Maarten Grootendorst"]
  },
  {
    titulo: "Team Topologies e a Lei de Conway",
    cat: "times", nivel: "Intermediário", perfil: "Gestão ou liderança técnica",
    resumo: "A arquitetura do sistema tende a copiar a estrutura de comunicação da empresa. Olhamos para a nossa divisão em front, back, mobile e QA com essa lente.",
    teoria: [
      "Lei de Conway e a manobra inversa de Conway",
      "Os quatro tipos de time: alinhado a fluxo, plataforma, habilitador e subsistema complicado",
      "Os três modos de interação: colaboração, serviço e facilitação",
      "Carga cognitiva como critério para dimensionar times"
    ],
    pratica: {
      titulo: "Mapa de dependências do time",
      passos: [
        "Desenhar o caminho de uma funcionalidade recente por todos os setores",
        "Marcar cada espera e cada passagem de bastão",
        "Propor um experimento para reduzir a maior fila"
      ]
    },
    discussao: [
      "A divisão por especialidade ajuda ou atrasa nossas entregas?",
      "Onde um time multidisciplinar faria mais diferença?"
    ],
    refs: ["Team Topologies — Matthew Skelton e Manuel Pais", "How Do Committees Invent? — Melvin Conway"]
  },
  {
    titulo: "Monólito modular ou microsserviços?",
    cat: "arquitetura", nivel: "Avançado", perfil: "Arquiteto(a) ou dev sênior",
    resumo: "Microsserviços resolvem problemas de organização e cobram um preço alto em operação. Aprendemos a decidir com critérios e a modularizar antes de distribuir.",
    teoria: [
      "O que se ganha e o que se paga em cada estilo",
      "Monólito modular: fronteiras fortes dentro de um único deploy",
      "As falácias da computação distribuída e a consistência eventual",
      "Migração gradual com o padrão figueira estranguladora"
    ],
    pratica: {
      titulo: "Decisão de arquitetura em grupo",
      passos: [
        "Receber um cenário de produto com requisitos e restrições",
        "Cada grupo defende um estilo e lista os riscos",
        "Registrar a decisão final com as alternativas descartadas"
      ]
    },
    discussao: [
      "Nossos módulos conseguiriam ser extraídos hoje? O que os prende?",
      "Que problema real um serviço separado resolveria?"
    ],
    refs: ["Building Microservices — Sam Newman", "MonolithFirst — Martin Fowler"]
  },
  {
    titulo: "Testes ponta a ponta e automação de interface",
    cat: "qa", nivel: "Intermediário", perfil: "QA ou Front-end",
    resumo: "Testes de interface são os mais caros e os que mais dão falso alarme. Vemos como escrever poucos, estáveis e focados nos fluxos que não podem quebrar.",
    teoria: [
      "O que merece um teste ponta a ponta: jornadas críticas do usuário",
      "Seletores resilientes e o padrão Page Object",
      "Testes instáveis: causas comuns e como eliminá-los",
      "Regressão visual e execução paralela no pipeline"
    ],
    pratica: {
      titulo: "Automatizar o fluxo mais crítico",
      passos: [
        "Escrever o teste do fluxo de login até a ação principal do produto",
        "Refatorar para Page Objects",
        "Rodar no pipeline com vídeo e captura de tela em caso de falha"
      ]
    },
    discussao: [
      "Quanto do nosso teste de regressão ainda é manual?",
      "Confiamos na suíte a ponto de publicar sem teste manual?"
    ],
    refs: ["Documentação do Playwright ou do Cypress", "Software Engineering at Google (capítulos de testes) — Winters, Manshreck e Wright"]
  },
  {
    titulo: "Design Systems e acessibilidade",
    cat: "front", nivel: "Intermediário", perfil: "Front-end ou Design",
    resumo: "Fechamento do segundo ano. Um design system dá consistência e velocidade; a acessibilidade garante que o produto funcione para todo mundo.",
    teoria: [
      "Tokens de design, componentes e documentação viva",
      "Como manter web e mobile visualmente alinhados",
      "WCAG na prática: contraste, teclado, foco e leitores de tela",
      "HTML semântico e ARIA: quando usar e quando não usar"
    ],
    pratica: {
      titulo: "Auditoria de acessibilidade",
      passos: [
        "Navegar por uma tela do produto usando só o teclado",
        "Testar com leitor de tela e com ferramenta automática",
        "Corrigir os três problemas mais graves ao vivo"
      ]
    },
    discussao: [
      "Retrospectiva do ano 2: o que mudou na nossa arquitetura e no nosso fluxo?",
      "Acessibilidade deveria entrar na nossa definição de pronto?"
    ],
    refs: ["Atomic Design — Brad Frost", "WCAG 2.2 — W3C"]
  },

  /* ======================== ANO 3 — MATURIDADE E FUTURO ======================== */
  {
    titulo: "Arquitetura orientada a eventos e mensageria",
    cat: "arquitetura", nivel: "Avançado", perfil: "Back-end ou arquiteto(a)",
    resumo: "Quando sistemas conversam por eventos, ganham desacoplamento e novos tipos de problema. Filas, tópicos, garantias de entrega e como não perder mensagens.",
    teoria: [
      "Comandos, eventos e a diferença entre fila e tópico",
      "Garantias de entrega e por que consumidores precisam ser idempotentes",
      "Padrões: outbox transacional, saga e fila de mensagens mortas",
      "Consistência eventual explicada para o negócio"
    ],
    pratica: {
      titulo: "Pedido, pagamento e estoque por eventos",
      passos: [
        "Subir um broker local e publicar o evento Pedido Criado",
        "Criar dois consumidores independentes",
        "Derrubar um consumidor, entregar mensagem duplicada e ver a idempotência funcionar"
      ]
    },
    discussao: [
      "Que integração nossa hoje é síncrona e não precisaria ser?",
      "Como depuramos um fluxo que atravessa várias filas?"
    ],
    refs: ["Enterprise Integration Patterns — Gregor Hohpe e Bobby Woolf", "Designing Event-Driven Systems — Ben Stopford"]
  },
  {
    titulo: "Agentes de IA e automação do fluxo de desenvolvimento",
    cat: "ia", nivel: "Avançado", perfil: "Dev com experiência em IA",
    resumo: "Agentes planejam, usam ferramentas e executam tarefas de vários passos. Vemos como funcionam, onde ajudam de verdade e quais limites precisamos impor.",
    teoria: [
      "Do chat ao agente: ciclo de planejar, agir e observar",
      "Uso de ferramentas e protocolos de integração como o MCP",
      "Padrões: encadeamento, roteamento, orquestrador e avaliador",
      "Controles: permissões mínimas, aprovação humana e registro de ações"
    ],
    pratica: {
      titulo: "Um agente para o nosso repositório",
      passos: [
        "Criar um agente que lê uma issue e propõe um merge request",
        "Dar acesso a duas ferramentas: busca no código e execução de testes",
        "Avaliar o resultado e definir o que exige aprovação humana"
      ]
    },
    discussao: [
      "Que tarefa repetitiva do time um agente poderia assumir?",
      "Que ações um agente nunca pode fazer sem aprovação?"
    ],
    refs: ["Building Effective Agents — Anthropic", "Documentação do Model Context Protocol"]
  },
  {
    titulo: "Infraestrutura como código e fundamentos de nuvem",
    cat: "infra", nivel: "Intermediário", perfil: "Infra",
    resumo: "Infraestrutura criada por cliques não tem histórico, revisão nem reprodução. Passamos a tratar servidores, redes e bancos como código versionado.",
    teoria: [
      "Declarativo versus imperativo; estado e detecção de desvio",
      "Módulos reutilizáveis e ambientes idênticos",
      "Fundamentos de nuvem: rede, computação, armazenamento e identidade",
      "Custos: como a conta cresce e como acompanhá-la"
    ],
    pratica: {
      titulo: "Um ambiente inteiro em um comando",
      passos: [
        "Descrever em Terraform um ambiente com rede, aplicação e banco",
        "Revisar o plano de mudanças em merge request antes de aplicar",
        "Destruir e recriar o ambiente para provar que é reproduzível"
      ]
    },
    discussao: [
      "Conseguiríamos recriar a produção do zero? Em quanto tempo?",
      "Quem pode alterar a infraestrutura hoje e como isso é revisado?"
    ],
    refs: ["Terraform: Up & Running — Yevgeniy Brikman", "Infrastructure as Code — Kief Morris"]
  },
  {
    titulo: "Testes de performance e carga",
    cat: "qa", nivel: "Avançado", perfil: "QA ou Back-end",
    resumo: "Descobrir o limite do sistema antes que os usuários descubram. Tipos de teste, como montar cenários realistas e como ler os resultados.",
    teoria: [
      "Carga, estresse, pico e resistência: o que cada teste responde",
      "Métricas que importam: percentis de latência, vazão e taxa de erro",
      "Cenários realistas: perfil de uso, tempo de espera e massa de dados",
      "Como encontrar o gargalo: aplicação, banco, rede ou dependência externa"
    ],
    pratica: {
      titulo: "Até onde o sistema aguenta?",
      passos: [
        "Escrever um roteiro de carga para o endpoint mais usado",
        "Aumentar os usuários virtuais até a latência degradar",
        "Cruzar com a observabilidade para apontar o gargalo"
      ]
    },
    discussao: [
      "Sabemos quantos usuários simultâneos suportamos?",
      "Teste de carga deveria rodar antes de toda grande entrega?"
    ],
    refs: ["Documentação do Grafana k6", "Systems Performance — Brendan Gregg"]
  },
  {
    titulo: "DevSecOps: segurança dentro do pipeline",
    cat: "seguranca", nivel: "Avançado", perfil: "Infra ou Segurança",
    resumo: "Segurança no fim do ciclo chega tarde e custa caro. Levamos as verificações para dentro do pipeline e cuidamos de segredos e dependências.",
    teoria: [
      "Segurança desde o início do ciclo: modelagem de ameaças leve",
      "Análise estática, dinâmica e de dependências",
      "Gestão de segredos: cofres, rotação e o que nunca vai para o repositório",
      "Cadeia de suprimentos: inventário de componentes e imagens assinadas"
    ],
    pratica: {
      titulo: "Blindar o pipeline",
      passos: [
        "Adicionar varredura de dependências e de segredos ao pipeline",
        "Fazer o commit de uma chave falsa e ver o pipeline bloquear",
        "Fazer a modelagem de ameaças de uma funcionalidade nova em 15 minutos"
      ]
    },
    discussao: [
      "Quantas dependências desatualizadas temos em produção?",
      "Como equilibrar bloqueios de segurança e velocidade de entrega?"
    ],
    refs: ["OWASP DevSecOps Guideline", "Framework SLSA para cadeia de suprimentos"]
  },
  {
    titulo: "Padrões de projeto que valem a pena",
    cat: "codigo", nivel: "Intermediário", perfil: "Dev sênior",
    resumo: "Dos 23 padrões clássicos, poucos aparecem toda semana. Focamos nos mais úteis, em como reconhecê-los nos frameworks que usamos e em quando evitá-los.",
    teoria: [
      "Strategy, Factory, Adapter, Observer e Decorator em linguagens modernas",
      "Padrões que já vêm embutidos nos frameworks do nosso dia a dia",
      "Composição em vez de herança",
      "Antipadrões: o padrão aplicado sem um problema para resolver"
    ],
    pratica: {
      titulo: "Do problema ao padrão",
      passos: [
        "Cada grupo recebe um problema de design tirado do nosso código",
        "Resolver primeiro do jeito mais simples e só depois com um padrão",
        "Comparar as duas versões e decidir qual manter"
      ]
    },
    discussao: [
      "Que padrão usamos sem saber o nome?",
      "Onde um padrão deixou nosso código mais difícil de entender?"
    ],
    refs: ["Design Patterns — Gamma, Helm, Johnson e Vlissides", "Head First Design Patterns — Freeman e Robson"]
  },
  {
    titulo: "Métricas DORA e produtividade de engenharia",
    cat: "times", nivel: "Intermediário", perfil: "Gestão ou liderança técnica",
    resumo: "Como saber se o time está melhorando sem cair em métricas de vaidade. As quatro métricas DORA, o framework SPACE e o cuidado de não transformar medida em meta.",
    teoria: [
      "Frequência de deploy, tempo de entrega, taxa de falha e tempo de recuperação",
      "Framework SPACE: produtividade tem mais de uma dimensão",
      "Lei de Goodhart: quando a métrica vira meta, deixa de ser boa métrica",
      "Experiência de quem desenvolve como indicador antecedente"
    ],
    pratica: {
      titulo: "Nosso primeiro painel DORA",
      passos: [
        "Extrair do repositório e do pipeline os dados dos últimos seis meses",
        "Calcular as quatro métricas e comparar com as faixas de referência",
        "Escolher uma métrica para melhorar e a ação correspondente"
      ]
    },
    discussao: [
      "Que métrica atual incentiva o comportamento errado?",
      "O que mais atrapalha o nosso dia a dia e não aparece em nenhum número?"
    ],
    refs: ["Accelerate — Nicole Forsgren, Jez Humble e Gene Kim", "The SPACE of Developer Productivity — Forsgren e colaboradores"]
  },
  {
    titulo: "Cache, filas e escalabilidade",
    cat: "back", nivel: "Avançado", perfil: "Back-end",
    resumo: "Escalar é remover gargalos na ordem certa. Estratégias de cache, processamento assíncrono e os fundamentos para crescer horizontalmente.",
    teoria: [
      "Escala vertical e horizontal; serviços sem estado",
      "Estratégias de cache e o problema da invalidação",
      "Processamento assíncrono, controle de pressão e limite de requisições",
      "Réplicas de leitura, particionamento e o teorema CAP sem mistério"
    ],
    pratica: {
      titulo: "Desenho de sistema em grupo",
      passos: [
        "Projetar no quadro um sistema para dez vezes a nossa carga atual",
        "Adicionar cache a um endpoint lento e medir o resultado",
        "Simular a queda do cache e observar o efeito manada"
      ]
    },
    discussao: [
      "Qual é o primeiro componente que quebraria com dez vezes mais usuários?",
      "Onde temos cache hoje e sabemos quando ele expira?"
    ],
    refs: ["Designing Data-Intensive Applications — Martin Kleppmann", "System Design Interview — Alex Xu"]
  },
  {
    titulo: "Qualidade na era da IA: testes gerados e avaliação de modelos",
    cat: "ia", nivel: "Avançado", perfil: "QA",
    resumo: "A IA muda o trabalho de QA em duas frentes: ajuda a testar software tradicional e cria um novo desafio, que é testar sistemas cujas respostas variam.",
    teoria: [
      "IA como apoio ao QA: geração de casos, massa de dados e testes exploratórios",
      "Revisão de código assistida: o que funciona e onde falha",
      "Avaliação de funcionalidades com IA: conjuntos de referência e critérios de nota",
      "Riscos: confiança excessiva e testes que só confirmam o código"
    ],
    pratica: {
      titulo: "Humano versus IA: quem acha mais bugs?",
      passos: [
        "Gerar casos de teste com IA para uma história de usuário real",
        "Comparar com os casos escritos pelo QA: o que cada lado esqueceu",
        "Montar uma avaliação simples para uma funcionalidade de IA do produto"
      ]
    },
    discussao: [
      "Como o papel de QA muda nos próximos anos?",
      "Como garantimos a qualidade do código gerado por IA?"
    ],
    refs: ["Software Testing with Generative AI — Mark Winteringham", "AI Engineering (capítulos de avaliação) — Chip Huyen"]
  },
  {
    titulo: "Resiliência: falhar bem e engenharia do caos",
    cat: "infra", nivel: "Avançado", perfil: "Infra ou Back-end",
    resumo: "Em sistemas distribuídos a falha é certa; o que escolhemos é como ela se manifesta. Padrões de estabilidade e como testar a resiliência de propósito.",
    teoria: [
      "Tempo limite, novas tentativas com recuo e disjuntor (circuit breaker)",
      "Isolamento de recursos e degradação graciosa",
      "Engenharia do caos: hipótese, experimento e raio de impacto",
      "Resposta a incidentes e análise pós-incidente sem culpados"
    ],
    pratica: {
      titulo: "Dia de jogo",
      passos: [
        "Em homologação, derrubar uma dependência e observar o sistema",
        "Implementar tempo limite e disjuntor e repetir o experimento",
        "Escrever a análise pós-incidente do exercício"
      ]
    },
    discussao: [
      "Que dependência externa, se cair, derruba tudo?",
      "Nossas análises de incidente geram mudanças reais?"
    ],
    refs: ["Release It! — Michael Nygard", "Site Reliability Engineering — Google"]
  },
  {
    titulo: "Documentando arquitetura: ADRs e modelo C4",
    cat: "arquitetura", nivel: "Intermediário", perfil: "Arquiteto(a) ou dev sênior",
    resumo: "Decisões de arquitetura se perdem quando só existem na memória de quem decidiu. Registros leves de decisão e diagramas que qualquer pessoa nova entende.",
    teoria: [
      "ADR: contexto, decisão e consequências em uma página",
      "Modelo C4: contexto, contêineres, componentes e código",
      "Diagramas como código e documentação que vive junto do repositório",
      "O que documentar e o que deixar o código dizer"
    ],
    pratica: {
      titulo: "Arquitetura no papel",
      passos: [
        "Desenhar os dois primeiros níveis do C4 para o nosso produto",
        "Escrever o ADR de uma decisão tomada nos últimos meses",
        "Versionar tudo no repositório e definir quando um ADR é obrigatório"
      ]
    },
    discussao: [
      "Que decisão antiga ninguém mais sabe explicar?",
      "Quanto tempo uma pessoa nova leva para entender o sistema?"
    ],
    refs: ["Documenting Architecture Decisions — Michael Nygard", "The C4 Model — Simon Brown"]
  },
  {
    titulo: "Carreira técnica, feedback e cultura de aprendizado",
    cat: "times", nivel: "Básico", perfil: "Gestão e todo o time",
    resumo: "Encerramento do terceiro ano. Falamos de crescimento profissional, de como dar e receber feedback e do que o time aprendeu ao longo de 36 encontros.",
    teoria: [
      "Trilhas de carreira: especialista técnico e gestão",
      "Feedback útil: específico, oportuno e focado em comportamento",
      "Mentoria, programação em par e comunidades de prática",
      "Segurança psicológica como base de times que aprendem"
    ],
    pratica: {
      titulo: "Retrospectiva dos três anos",
      passos: [
        "Linha do tempo: o que cada encontro mudou no nosso trabalho",
        "Cada pessoa escreve um plano de desenvolvimento com um objetivo para o próximo ano",
        "Votação dos temas que faltaram e que entram no ano 4"
      ]
    },
    discussao: [
      "Quais três encontros mais impactaram o time?",
      "Como manter o hábito de aprender junto daqui para frente?"
    ],
    refs: ["The Staff Engineer's Path — Tanya Reilly", "Radical Candor — Kim Scott"]
  }
];

/* Campos opcionais por tema (adicione quando souber):
   apresentador: "Nome da pessoa"
   material: "https://link-dos-slides-ou-gravacao"
   Exemplo:  TEMAS[0].apresentador = "Maria";                                  */
