/* ==========================================================================
   CONTEÚDO DOS SLIDES
   Um item por tema, na mesma ordem de TEMAS (js/temas.js).
     gancho ... pergunta ou provocação que abre o encontro
     abertura . por que o tema importa para o time (3 pontos)
     teoria ... 4 listas, uma para cada tópico de teoria do tema (mesma ordem)
     preparo .. o que quem apresenta precisa deixar pronto para a prática
   Os slides de prática, discussão e encerramento são montados a partir
   dos dados que já estão em js/temas.js.
   ========================================================================== */

const APRESENTACOES = [
  /* 01 — Código Limpo */
  {
    gancho: "Quanto tempo você gastou esta semana tentando entender um código antes de conseguir alterá-lo?",
    abertura: [
      "Passamos muito mais tempo lendo código do que escrevendo",
      "Código difícil de ler atrasa toda entrega futura, não só a de hoje",
      "Legibilidade é um acordo de time, não um gosto pessoal"
    ],
    teoria: [
      ["O nome deve responder: o que é, por que existe e como é usado", "Evite abreviações e nomes genéricos como data, info, aux e temp", "Se o nome precisa de um comentário para ser entendido, troque o nome"],
      ["Uma função faz uma coisa só e cabe na tela", "Não misture regra de negócio com detalhes de banco ou de formatação", "Mais de três argumentos é sinal de que falta um objeto"],
      ["Bom comentário explica o porquê de uma decisão", "Comentário que repete o código envelhece e passa a mentir", "Código comentado se apaga: o histórico do Git guarda"],
      ["Pequenas melhorias a cada alteração, sem pedir um projeto de refatoração", "Renomear, extrair e remover duplicação cabem em qualquer tarefa", "Melhoria estrutural vai em commit separado da mudança de comportamento"]
    ],
    preparo: "Escolha com antecedência uma função real do repositório e garanta que ela tenha testes ou seja simples de verificar."
  },
  /* 02 — Testes e TDD */
  {
    gancho: "Você publicaria agora, sem testar na mão, confiando só nos testes automatizados?",
    abertura: [
      "Teste automatizado é o que permite mudar o código sem medo",
      "Quanto mais tarde um defeito aparece, mais caro ele custa",
      "Qualidade é responsabilidade do time inteiro, não só do QA"
    ],
    teoria: [
      ["Base larga de testes unitários: rápidos, baratos e precisos", "Integração no meio: valida a conversa entre as partes", "Poucos testes ponta a ponta: lentos, caros e frágeis"],
      ["Arrange: prepara o cenário", "Act: executa uma única ação", "Assert: verifica um comportamento, com nome que descreve a regra"],
      ["Stub devolve respostas prontas; mock verifica chamadas; fake é uma versão simplificada", "Use dublês nas fronteiras: rede, banco, relógio", "Mock em excesso testa a implementação e quebra a cada refatoração"],
      ["Vermelho: escreva um teste que falha", "Verde: faça passar com o código mais simples", "Refatorar: melhore o design com a segurança dos testes"]
    ],
    preparo: "Prepare um repositório de kata com o framework de testes já configurado para todos clonarem."
  },
  /* 03 — Git */
  {
    gancho: "Se um bug aparecer em produção hoje, o histórico do repositório ajuda ou atrapalha a investigação?",
    abertura: [
      "O histórico é a memória do projeto",
      "Fluxo de branch mal escolhido gera conflito e espera",
      "A revisão de código é onde o time mais ensina e aprende"
    ],
    teoria: [
      ["Trunk-based: branches curtas, integração diária", "GitFlow: releases planejadas, mais cerimônia", "GitHub Flow: uma branch por mudança, merge depois da revisão"],
      ["Um commit, uma intenção", "Prefixos padronizados: feat, fix, refactor, docs, test", "Mensagem padronizada permite gerar changelog e versão automaticamente"],
      ["Merge preserva o histórico como aconteceu", "Rebase reescreve para uma linha reta: nunca em branch compartilhada", "Squash junta os commits da branch em um só"],
      ["Mudanças pequenas são revisadas melhor e mais rápido", "Comente o código, não a pessoa; pergunte antes de afirmar", "Automatize estilo e lint para a revisão humana focar em design e regra"]
    ],
    preparo: "Monte um repositório de treino com commits bagunçados, um conflito pronto e um bug escondido para o git bisect."
  },
  /* 04 — IA no dia a dia */
  {
    gancho: "O assistente de código é um estagiário muito rápido ou um sênior distraído?",
    abertura: [
      "Assistentes de código já fazem parte da rotina de desenvolvimento",
      "O resultado depende muito de como se pede",
      "Quem assina o código continua sendo a pessoa, não a ferramenta"
    ],
    teoria: [
      ["O modelo prevê o próximo trecho de texto mais provável", "Ele não consulta a verdade: completa padrões que aprendeu", "Por isso inventa funções e bibliotecas com total confiança"],
      ["Dê contexto: linguagem, versão, arquitetura e convenções do projeto", "Mostre um exemplo do resultado esperado", "Diga as restrições e o formato da resposta"],
      ["Autocompletar: sugestões enquanto você digita", "Conversa: explicar, revisar e gerar trechos", "Agente: executa tarefas de vários passos no repositório"],
      ["Nunca cole credenciais ou dados de clientes", "Verifique licenças e a política da empresa", "Todo código gerado passa por revisão e testes como qualquer outro"]
    ],
    preparo: "Defina uma tarefa pequena e real, com testes prontos, e deixe os três prompts rascunhados."
  },
  /* 05 — SOLID */
  {
    gancho: "Por que mudar uma regra simples às vezes quebra três telas que não tinham nada a ver?",
    abertura: [
      "Acoplamento é o que torna a mudança cara",
      "SOLID é um vocabulário comum para discutir design",
      "Os princípios são guias para decidir, não leis para decorar"
    ],
    teoria: [
      ["Uma classe deve ter um único motivo para mudar", "Motivo para mudar é quem pede a mudança: financeiro, operações, interface", "Sinais de alerta: nomes como Manager, Util e Helper"],
      ["Novos comportamentos entram como código novo", "Um if por tipo espalhado pelo sistema indica violação", "Polimorfismo e composição são as ferramentas"],
      ["Liskov: a subclasse deve funcionar onde a classe base funciona", "Método herdado que lança 'não suportado' é o sintoma clássico", "Interfaces pequenas e específicas em vez de uma interface gigante"],
      ["A regra de negócio define a interface de que precisa", "A infraestrutura implementa essa interface", "Injetar dependências torna o teste trivial"]
    ],
    preparo: "Selecione quatro ou cinco trechos curtos do nosso código, cada um com uma violação clara."
  },
  /* 06 — Docker */
  {
    gancho: "Quanto tempo uma pessoa nova leva para rodar o nosso projeto na própria máquina?",
    abertura: [
      "Ambientes diferentes produzem bugs que só aparecem em produção",
      "Container empacota a aplicação junto com tudo de que ela depende",
      "É a base para pipeline, nuvem e orquestração"
    ],
    teoria: [
      ["A máquina virtual simula hardware; o container isola processos no mesmo kernel", "Namespaces isolam o que o processo enxerga; cgroups limitam recursos", "A imagem é feita de camadas somente leitura e reaproveitáveis"],
      ["A ordem das instruções define o aproveitamento do cache", "Multi-stage: compila em uma imagem e executa em outra, mínima", "Rode sem usuário root e use .dockerignore"],
      ["Volumes guardam dados além da vida do container", "Containers na mesma rede se encontram pelo nome", "Configuração entra por variável de ambiente, nunca fixa na imagem"],
      ["Um arquivo descreve aplicação, banco e demais serviços", "Um comando sobe tudo", "O mesmo arquivo serve de documentação do ambiente"]
    ],
    preparo: "Garanta o Docker instalado nas máquinas e baixe as imagens base antes, para não depender da rede."
  },
  /* 07 — Times ágeis */
  {
    gancho: "Estamos ocupados ou estamos entregando?",
    abertura: [
      "Ser ágil é reduzir o tempo entre a ideia e o valor entregue",
      "Cerimônia sem propósito vira teatro",
      "Sem medir o fluxo, toda melhoria é palpite"
    ],
    teoria: [
      ["Scrum: ciclos fixos, papéis e eventos definidos", "Kanban: parte do processo atual, visualiza e limita o trabalho", "Os dois podem ser combinados"],
      ["Muito trabalho em paralelo aumenta a espera de tudo", "Limitar o WIP expõe os gargalos", "Parar de começar e começar a terminar"],
      ["Lead time: do pedido até a entrega", "Cycle time: do início do trabalho até a entrega", "Throughput: itens entregues por período; o fluxo cumulativo mostra acúmulos"],
      ["O histórico de throughput responde 'quando fica pronto?'", "Resposta em faixas com probabilidade, não em data única", "Itens de tamanho parecido valem mais do que estimativa detalhada"]
    ],
    preparo: "Exporte antes os cartões dos últimos três meses para uma planilha, com as datas de início e de conclusão."
  },
  /* 08 — APIs REST */
  {
    gancho: "Quantas vezes front e mobile precisaram perguntar ao back como um endpoint funciona?",
    abertura: [
      "A API é o contrato entre os setores do time",
      "Inconsistência na API vira bug e retrabalho em todos os clientes",
      "Uma API bem desenhada dispensa explicação"
    ],
    teoria: [
      ["URLs são substantivos no plural: /pedidos/42/itens", "Os verbos HTTP dizem a ação: GET, POST, PUT, PATCH, DELETE", "O código de status diz a verdade: 201, 204, 400, 404, 409, 422"],
      ["Toda lista é paginada e a resposta informa como continuar", "Filtros e ordenação por parâmetros de consulta", "Chave de idempotência evita operação duplicada em nova tentativa"],
      ["Um formato único de erro: tipo, título, detalhe e campo", "Adicionar campo não quebra cliente; remover ou renomear quebra", "Versão nova só quando houver quebra de contrato"],
      ["O contrato é escrito antes do código", "Dele saem documentação, mock e validação", "A revisão do contrato envolve quem consome"]
    ],
    preparo: "Escolha três endpoints com inconsistências conhecidas e deixe um editor de OpenAPI aberto."
  },
  /* 09 — Performance web */
  {
    gancho: "Quanto tempo você espera uma página carregar antes de desistir?",
    abertura: [
      "Lentidão custa usuários e conversão",
      "Performance é uma funcionalidade do produto",
      "Sem medição contínua, a página piora um pouco a cada entrega"
    ],
    teoria: [
      ["LCP: quando o maior conteúdo visível aparece", "INP: quanto a página demora para responder a uma interação", "CLS: quanto o layout pula durante o carregamento"],
      ["HTML, CSS e JavaScript bloqueiam a renderização", "CSS crítico primeiro; scripts com defer ou async", "Menos requisições no caminho da primeira pintura"],
      ["Imagens no tamanho certo, em formato moderno e com lazy loading", "Fontes com font-display e pré-carregamento", "Dividir o JavaScript por rota e carregar sob demanda"],
      ["Laboratório: ambiente controlado, bom para depurar", "Campo: usuários reais, em aparelhos e redes reais", "Decida com dados de campo e investigue no laboratório"]
    ],
    preparo: "Escolha uma tela do produto e guarde o relatório do Lighthouse de antes para comparar."
  },
  /* 10 — OWASP Top 10 */
  {
    gancho: "Se alguém mal-intencionado olhasse o nosso sistema hoje, por onde entraria?",
    abertura: [
      "A maioria dos ataques explora falhas conhecidas e evitáveis",
      "Um incidente custa dinheiro, confiança e, às vezes, multa",
      "Segurança se constrói no código, não se adiciona no final"
    ],
    teoria: [
      ["Controle de acesso: usuário acessa o dado de outro trocando um ID", "Verifique a permissão no servidor em toda requisição", "Senhas com hash forte, sessão com expiração e segundo fator"],
      ["Injeção: a entrada do usuário é interpretada como comando", "Consultas parametrizadas, nunca concatenação de texto", "XSS: escape toda saída e adote política de segurança de conteúdo"],
      ["Padrões inseguros: senha de fábrica, modo debug, mensagens de erro detalhadas", "Dependências desatualizadas trazem vulnerabilidades públicas", "Dados sensíveis criptografados em trânsito e em repouso"],
      ["Várias camadas: se uma falhar, outra segura", "Menor privilégio para usuários, serviços e bancos", "Registros de auditoria para detectar e investigar"]
    ],
    preparo: "Suba uma aplicação vulnerável de treino em ambiente local e isolado. Nunca pratique em sistemas reais."
  },
  /* 11 — Refatoração */
  {
    gancho: "Qual arquivo do nosso sistema ninguém quer abrir?",
    abertura: [
      "Código legado é o código que paga as contas",
      "Reescrever do zero quase sempre demora mais do que o previsto",
      "Refatorar é uma técnica com passos seguros, não uma aventura"
    ],
    teoria: [
      ["Função longa e classe que faz tudo", "Inveja de funcionalidade: o método usa mais os dados de outra classe", "Obsessão por primitivos: texto e número no lugar de conceitos do negócio"],
      ["Extrair função e extrair variável", "Mover o comportamento para perto do dado", "Substituir condicional por polimorfismo ou por tabela de estratégias"],
      ["O teste registra o que o código faz hoje, certo ou errado", "É a rede de proteção antes de qualquer mudança", "Depois da refatoração, vira teste de verdade"],
      ["Refatoração contínua acontece dentro das tarefas normais", "Reescrita grande congela a entrega e reproduz bugs antigos", "Troque por partes, com o sistema sempre funcionando"]
    ],
    preparo: "Baixe o kata Gilded Rose na linguagem do time e deixe os testes rodando."
  },
  /* 12 — Dívida técnica */
  {
    gancho: "Quanto da nossa capacidade vai para pagar juros de decisões antigas?",
    abertura: [
      "Toda equipe tem dívida técnica; o problema é a dívida invisível",
      "Juros aparecem como lentidão, bugs e retrabalho",
      "Tratar dívida é decisão de negócio e precisa de linguagem de negócio"
    ],
    teoria: [
      ["Principal: o custo de consertar", "Juros: o custo extra em cada mudança enquanto não se conserta", "Quadrante: a dívida pode ser prudente ou imprudente, deliberada ou acidental"],
      ["Mantenha um inventário único e priorizado", "Hotspots: arquivos que mudam muito e são complexos", "Estime o custo de atraso de cada item"],
      ["Reservar um percentual fixo de cada ciclo", "Pagar junto com a funcionalidade que toca a área", "Dias dedicados para os itens grandes"],
      ["Fale de risco, prazo e custo, não de elegância de código", "Mostre o impacto em entregas que o negócio conhece", "Proponha um plano com retorno esperado"]
    ],
    preparo: "Peça a cada setor que traga, por escrito, suas três maiores dívidas técnicas."
  },
  /* 13 — Arquitetura Limpa */
  {
    gancho: "Se trocássemos o banco de dados ou o framework amanhã, quanto do sistema teríamos que reescrever?",
    abertura: [
      "Frameworks e bancos mudam mais rápido do que as regras do negócio",
      "Regra misturada com infraestrutura é difícil de testar e de evoluir",
      "Uma boa arquitetura adia decisões e mantém opções abertas"
    ],
    teoria: [
      ["Entidades: regras do negócio que valem em qualquer aplicação", "Casos de uso: o que o sistema faz, passo a passo", "Adaptadores e frameworks: web, banco, mensageria e interface"],
      ["As dependências do código apontam sempre para dentro", "O domínio não importa nada de framework ou de banco", "Os dados atravessam as fronteiras em estruturas simples"],
      ["Porta: a interface que o caso de uso precisa", "Adaptador: a implementação concreta dessa interface", "A montagem acontece na borda, na inicialização da aplicação"],
      ["Mais arquivos, mais indireção e mais mapeamento", "Compensa quando a regra é rica e o sistema tem vida longa", "Um CRUD simples não precisa de todas as camadas"]
    ],
    preparo: "Deixe um projeto mínimo pronto, com a estrutura de pastas e um repositório em memória."
  },
  /* 14 — CI/CD */
  {
    gancho: "Dia de deploy é um dia normal ou um dia tenso?",
    abertura: [
      "Publicar com frequência reduz o risco de cada publicação",
      "Processo manual é lento e sujeito a erro",
      "O pipeline é o caminho único e confiável até a produção"
    ],
    teoria: [
      ["Integração contínua: todos integram na principal várias vezes ao dia", "Entrega contínua: toda versão está pronta para publicar", "Implantação contínua: toda versão aprovada vai sozinha para produção"],
      ["Compilação e testes rápidos primeiro", "Análise estática, segurança e empacotamento", "O mesmo artefato é promovido entre os ambientes"],
      ["Rolling: troca as instâncias aos poucos", "Blue-green: dois ambientes e uma virada", "Canário e feature flags: liberar para poucos e observar"],
      ["Cache de dependências e de camadas", "Etapas em paralelo", "Falhar cedo: o teste mais rápido roda primeiro"]
    ],
    preparo: "Tenha um projeto de exemplo com testes e acesso para criar pipelines."
  },
  /* 15 — Testes de API e contrato */
  {
    gancho: "Quantos bugs do último trimestre nasceram de uma mudança na API que alguém não ficou sabendo?",
    abertura: [
      "O teste de API é rápido e cobre a regra de negócio de verdade",
      "A quebra de contrato só aparece quando os setores integram",
      "Detectar no pipeline custa minutos; em produção, custa dias"
    ],
    teoria: [
      ["Status e cabeçalhos corretos", "Esquema: campos, tipos e obrigatoriedade", "Regras de negócio e respostas de erro"],
      ["Quem consome declara o que espera da API", "Quem fornece verifica que atende a todos os consumidores", "A quebra aparece antes do merge"],
      ["Cada teste cria os dados de que precisa", "Fábricas geram dados válidos com poucas linhas", "Nenhum teste depende da ordem ou do resultado de outro"],
      ["Roda a cada merge request", "Ambiente efêmero ou serviços simulados", "Relatório claro de qual contrato quebrou"]
    ],
    preparo: "Escolha um endpoint estável e deixe a ferramenta de testes configurada no repositório."
  },
  /* 16 — DDD */
  {
    gancho: "Quando o negócio diz 'cliente', todas as partes do sistema entendem a mesma coisa?",
    abertura: [
      "O maior risco de um software é resolver o problema errado",
      "Traduzir entre a língua do negócio e a do código gera erro",
      "Fronteiras bem traçadas no domínio viram módulos independentes"
    ],
    teoria: [
      ["O mesmo termo na conversa, na documentação e no código", "A linguagem é construída junto com quem entende do negócio", "Mudou o entendimento, muda o nome no código"],
      ["Subdomínios: principal, de suporte e genérico", "Contexto delimitado: a fronteira onde um modelo é válido", "O mapa de contextos mostra como eles se relacionam"],
      ["Entidade tem identidade; objeto de valor é definido pelos atributos", "O agregado protege as regras de consistência", "Evento de domínio: algo relevante que já aconteceu"],
      ["Compensa em domínio complexo, com regras que mudam", "Cadastro simples não precisa de design tático", "O design estratégico ajuda em qualquer tamanho de sistema"]
    ],
    preparo: "Reserve uma parede ou quadro digital e post-its, e convide alguém do negócio para a sessão."
  },
  /* 17 — Arquitetura mobile */
  {
    gancho: "O que acontece com o nosso app quando o usuário entra no elevador?",
    abertura: [
      "O celular vive em rede instável, com bateria e memória limitadas",
      "Usuário não perdoa app que trava ou perde dados",
      "A escolha de tecnologia define custo e velocidade por anos"
    ],
    teoria: [
      ["Interface, domínio e dados separados", "MVVM: a tela observa um estado", "Fluxo unidirecional: evento sobe, estado desce"],
      ["O banco local é a fonte da verdade da tela", "Ações feitas offline entram em uma fila de sincronização", "A regra para resolver conflitos é decidida antes"],
      ["Nativo: melhor acesso à plataforma, dois códigos", "Flutter e React Native: um código, interface compartilhada", "Kotlin Multiplatform: compartilha a lógica e mantém a interface nativa"],
      ["A revisão das lojas leva tempo: planeje", "Liberação gradual por percentual de usuários", "Feature flags e versão mínima obrigatória"]
    ],
    preparo: "Prepare um app de exemplo com uma tela de listagem e um simulador de rede lenta."
  },
  /* 18 — Bancos de dados */
  {
    gancho: "Qual foi a última consulta que derrubou ou travou o sistema?",
    abertura: [
      "O banco costuma ser o primeiro gargalo",
      "O ORM facilita o trabalho e esconde o custo",
      "Com o diagnóstico certo, a solução costuma ser simples"
    ],
    teoria: [
      ["Normalizar evita duplicação e inconsistência", "Desnormalizar acelera a leitura e custa na escrita", "A decisão vem do padrão de uso real"],
      ["O índice é uma estrutura ordenada que evita ler a tabela inteira", "A ordem das colunas importa em índice composto", "Cada índice torna a escrita mais lenta"],
      ["O plano mostra como o banco pretende executar a consulta", "Varredura completa em tabela grande é o alerta", "Compare as linhas estimadas com as linhas reais"],
      ["Transação: tudo ou nada", "O nível de isolamento define o que uma transação enxerga da outra", "N+1: uma consulta para a lista e mais uma para cada item"]
    ],
    preparo: "Colete três consultas lentas reais e uma cópia de dados em volume realista no ambiente de teste."
  },
  /* 19 — Observabilidade */
  {
    gancho: "No último incidente, quanto tempo passou entre o alerta e a descoberta da causa?",
    abertura: [
      "Sistema distribuído falha de formas que ninguém previu",
      "Sem bons sinais, a investigação vira adivinhação",
      "O tempo de recuperação depende do tempo de diagnóstico"
    ],
    teoria: [
      ["Logs: eventos detalhados, em formato estruturado", "Métricas: números agregados ao longo do tempo", "Rastreamento: o caminho de uma requisição entre os serviços"],
      ["Um padrão aberto e independente de fornecedor", "Instrumentação automática e manual", "O identificador de rastreamento é propagado entre serviços"],
      ["SLI: a medida do que o usuário sente", "SLO: a meta para essa medida", "Orçamento de erro: quanto podemos falhar antes de frear as mudanças"],
      ["Alerte sobre o sintoma do usuário, não sobre toda causa possível", "Todo alerta tem dono e instrução do que fazer", "Alerta ignorado se corrige ou se apaga"]
    ],
    preparo: "Suba um ambiente local com uma ferramenta de rastreamento e um serviço com um atraso proposital."
  },
  /* 20 — LLMs por dentro */
  {
    gancho: "Como um programa que só prevê a próxima palavra consegue escrever código?",
    abertura: [
      "IA generativa virou componente de produto",
      "Entender o funcionamento evita expectativa errada",
      "Dados próprios são o que diferencia uma aplicação de IA"
    ],
    teoria: [
      ["Token é um pedaço de palavra: a unidade de custo e de limite", "Janela de contexto: tudo o que o modelo enxerga de uma vez", "Temperatura: mais baixa, mais previsível; mais alta, mais variada"],
      ["Embedding transforma texto em um vetor que representa o significado", "Textos parecidos ficam próximos nesse espaço", "O banco vetorial busca por proximidade"],
      ["Recuperar os trechos relevantes dos nossos documentos", "Montar o prompt com esses trechos", "Gerar a resposta citando a fonte"],
      ["Comece pelo prompt: é o mais barato e rápido", "RAG quando falta conhecimento atual ou interno", "Ajuste fino quando o problema é comportamento ou formato"]
    ],
    preparo: "Separe um conjunto pequeno de documentos internos sem dados sensíveis e uma chave de API de teste."
  },
  /* 21 — Team Topologies */
  {
    gancho: "Por quantas mãos uma funcionalidade passa até chegar ao usuário?",
    abertura: [
      "A estrutura do time molda a arquitetura do sistema",
      "Cada passagem de bastão adiciona espera",
      "Organizar times é uma decisão de design"
    ],
    teoria: [
      ["Os sistemas copiam a comunicação de quem os constrói", "Times separados por camada produzem um sistema em camadas", "Manobra inversa: organize o time para a arquitetura que você quer"],
      ["Alinhado a fluxo: entrega valor de ponta a ponta", "Plataforma: oferece serviços internos que aceleram os outros", "Habilitador e subsistema complicado: apoiam com especialidade"],
      ["Colaboração: dois times juntos por tempo limitado", "Serviço: um consome o que o outro oferece", "Facilitação: um ajuda o outro a aprender"],
      ["Um time só cuida bem do que cabe na cabeça", "Domínios demais geram troca de contexto e erro", "A plataforma existe para reduzir carga, não para criar burocracia"]
    ],
    preparo: "Escolha uma funcionalidade entregue recentemente e levante as datas de cada etapa."
  },
  /* 22 — Monólito modular ou microsserviços */
  {
    gancho: "Microsserviços resolvem um problema que nós temos?",
    abertura: [
      "Moda tecnológica custa caro quando o contexto é outro",
      "Distribuir um sistema multiplica a complexidade de operação",
      "A decisão é reversível se as fronteiras estiverem bem feitas"
    ],
    teoria: [
      ["Microsserviços dão deploy e escala independentes por time", "Cobram rede, monitoramento e consistência entre serviços", "O monólito é simples de operar e difícil de dividir depois, se mal organizado"],
      ["Módulos com interface pública e dados próprios", "Um único deploy, sem chamadas de rede internas", "É o primeiro passo natural antes de extrair um serviço"],
      ["A rede falha, tem latência e não é segura", "Não existe transação única entre serviços", "É preciso aceitar e desenhar para a consistência eventual"],
      ["O novo cresce em volta do antigo", "O tráfego é desviado funcionalidade por funcionalidade", "O sistema antigo é desligado quando fica vazio"]
    ],
    preparo: "Escreva um cenário fictício de uma página com requisitos, tamanho do time e restrições."
  },
  /* 23 — Testes ponta a ponta */
  {
    gancho: "Quando um teste automatizado falha, a primeira reação é investigar ou rodar de novo?",
    abertura: [
      "Teste instável destrói a confiança na suíte inteira",
      "O teste de interface é o mais caro de escrever e manter",
      "Poucos testes certos protegem os fluxos que geram receita"
    ],
    teoria: [
      ["Fluxos que, se quebrarem, param o negócio", "Um caminho feliz por jornada; as variações ficam nos níveis de baixo", "Se dá para testar por API, não teste pela tela"],
      ["Seletor por papel, texto visível ou atributo de teste", "Nunca por classe de CSS ou posição na página", "Page Object: a tela vira uma classe e o teste lê como uma história"],
      ["Espera fixa é a causa número um", "Dados compartilhados entre testes", "Dependência de serviços externos e da ordem de execução"],
      ["Comparação de capturas de tela para pegar mudança de layout", "Execução em paralelo para o retorno chegar rápido", "Vídeo e rastro da execução em caso de falha"]
    ],
    preparo: "Deixe a ferramenta instalada e um usuário de teste criado no ambiente de homologação."
  },
  /* 24 — Design Systems e acessibilidade */
  {
    gancho: "Você conseguiria usar o nosso produto sem mouse e sem enxergar a tela?",
    abertura: [
      "Inconsistência visual custa tempo de design e de desenvolvimento",
      "Muitas pessoas dependem de recursos de acessibilidade",
      "Acessibilidade bem feita melhora o uso para todo mundo"
    ],
    teoria: [
      ["Tokens: cor, espaçamento e tipografia como variáveis", "Componentes com estados e variações documentados", "A documentação mostra o componente funcionando"],
      ["Os mesmos tokens alimentam todas as plataformas", "Respeitar as convenções de cada sistema", "Um processo claro de contribuição e de versão"],
      ["Contraste suficiente entre texto e fundo", "Tudo o que se faz com o mouse se faz com o teclado, com foco visível", "Imagens com texto alternativo e formulários com rótulos"],
      ["O elemento certo já traz o comportamento certo", "ARIA só quando o HTML não resolve", "ARIA usado errado é pior do que nenhum"]
    ],
    preparo: "Escolha uma tela, ative um leitor de tela e instale uma extensão de auditoria de acessibilidade."
  },
  /* 25 — Eventos e mensageria */
  {
    gancho: "Se o serviço de e-mail cair, o cliente consegue finalizar o pedido?",
    abertura: [
      "Chamada síncrona acopla a disponibilidade dos sistemas",
      "Eventos permitem evoluir cada parte de forma independente",
      "O preço é a complexidade de depurar e de garantir a entrega"
    ],
    teoria: [
      ["Comando pede uma ação; evento informa um fato", "Fila: cada mensagem vai para um consumidor", "Tópico: cada mensagem vai para todos os interessados"],
      ["No máximo uma vez, pelo menos uma vez, exatamente uma vez", "Na prática, espere mensagens duplicadas", "O consumidor idempotente processa duas vezes sem efeito duplo"],
      ["Outbox: grava o evento na mesma transação do dado", "Saga: coordena passos entre serviços, com compensação", "Fila de mensagens mortas: guarda o que falhou para análise"],
      ["O dado fica correto, mas não no mesmo instante", "Mostre estados intermediários ao usuário", "Combine com o negócio quanto de atraso é aceitável"]
    ],
    preparo: "Suba um broker local em container e deixe o esqueleto do produtor e dos consumidores pronto."
  },
  /* 26 — Agentes de IA */
  {
    gancho: "Que tarefa repetitiva você entregaria hoje a um agente, e qual não entregaria de jeito nenhum?",
    abertura: [
      "Os modelos passaram de responder perguntas a executar tarefas",
      "Os ganhos são grandes em trabalho repetitivo e bem definido",
      "Autonomia sem controle é um risco operacional"
    ],
    teoria: [
      ["O modelo decide o próximo passo, executa e observa o resultado", "Repete até concluir ou até atingir um limite", "A qualidade depende do contexto e das ferramentas disponíveis"],
      ["Ferramenta: uma função que o modelo pode chamar", "Um protocolo padrão conecta o modelo a sistemas internos", "Descrição clara da ferramenta vale tanto quanto um bom prompt"],
      ["Encadeamento: passos fixos em sequência", "Roteamento: escolher o caminho conforme a entrada", "Orquestrador com trabalhadores e avaliador que revisa"],
      ["Só as permissões necessárias", "Aprovação humana para ações irreversíveis", "Registro completo do que o agente fez e por quê"]
    ],
    preparo: "Use um repositório de teste, com issues de exemplo e credenciais de escopo limitado."
  },
  /* 27 — Infraestrutura como código */
  {
    gancho: "Se o ambiente de produção sumisse hoje, conseguiríamos recriá-lo?",
    abertura: [
      "Configuração manual não tem histórico nem revisão",
      "Ambientes diferentes escondem bugs",
      "Infraestrutura versionada é auditável e reproduzível"
    ],
    teoria: [
      ["Declarativo descreve o estado desejado; imperativo descreve os passos", "O arquivo de estado registra o que existe", "Desvio: quando alguém altera por fora do código"],
      ["Um módulo encapsula um padrão aprovado", "O mesmo código gera homologação e produção, com parâmetros", "Versão nos módulos, como em qualquer biblioteca"],
      ["Rede: redes privadas, sub-redes e regras de acesso", "Computação: máquinas, containers e funções", "Identidade e permissões são a base de tudo"],
      ["Recurso ligado sem uso é o maior desperdício", "Etiquetas para saber quem gasta o quê", "Alertas de orçamento desde o primeiro dia"]
    ],
    preparo: "Tenha uma conta de testes com limite de gasto e a ferramenta de IaC instalada."
  },
  /* 28 — Testes de performance e carga */
  {
    gancho: "Quantos usuários ao mesmo tempo o nosso sistema aguenta? Como sabemos?",
    abertura: [
      "O pico de uso não avisa antes de chegar",
      "Sem teste, o limite é descoberto pelos clientes",
      "Capacidade conhecida permite planejar"
    ],
    teoria: [
      ["Carga: o volume esperado", "Estresse: até quebrar; pico: um salto repentino", "Resistência: carga normal por muitas horas"],
      ["A média esconde os piores casos: olhe os percentis 95 e 99", "Vazão: requisições por segundo", "Taxa de erro sob carga"],
      ["Proporção real entre as operações", "Pausas entre ações, como um usuário de verdade", "Volume de dados parecido com o de produção"],
      ["Cruzar o teste com métricas de aplicação e de banco", "Mudar uma variável por vez", "O gargalo sempre se muda para o próximo ponto"]
    ],
    preparo: "Combine o horário com quem cuida do ambiente e nunca rode contra produção sem autorização."
  },
  /* 29 — DevSecOps */
  {
    gancho: "Existe alguma senha ou chave no histórico do nosso repositório?",
    abertura: [
      "Segurança no fim do ciclo vira gargalo",
      "Dependências de terceiros são a maior parte do nosso código",
      "Automatizar permite verificar a cada mudança"
    ],
    teoria: [
      ["Quatro perguntas: o que construímos, o que pode dar errado, o que faremos, deu certo?", "Quinze minutos por funcionalidade relevante", "Os riscos encontrados viram itens do backlog"],
      ["Estática: analisa o código-fonte", "Dinâmica: ataca a aplicação em execução", "Dependências: compara as versões com bases de vulnerabilidades"],
      ["Os segredos ficam em um cofre, injetados em tempo de execução", "Rotação periódica e imediata em caso de vazamento", "Varredura de segredos antes do commit e no pipeline"],
      ["Um inventário de todos os componentes do software", "Imagens e artefatos assinados", "Versões fixadas e fontes confiáveis"]
    ],
    preparo: "Prepare um repositório de teste e uma chave falsa para o exercício de bloqueio."
  },
  /* 30 — Padrões de projeto */
  {
    gancho: "Qual padrão de projeto você usa toda semana sem saber o nome?",
    abertura: [
      "Padrões são um vocabulário para discutir design mais rápido",
      "Os frameworks que usamos são feitos deles",
      "Padrão fora de contexto só adiciona complexidade"
    ],
    teoria: [
      ["Strategy troca o algoritmo; Factory centraliza a criação", "Adapter traduz interfaces; Observer avisa os interessados", "Decorator adiciona comportamento sem alterar a classe"],
      ["Injeção de dependência, middlewares e interceptadores", "Componentes reativos são Observer", "Reconhecer o padrão ajuda a ler a documentação"],
      ["A herança acopla forte e para sempre", "Compor objetos pequenos dá mais flexibilidade", "Herde só quando a relação for realmente 'é um'"],
      ["Singleton como variável global disfarçada", "Abstração criada para um futuro que não chega", "Primeiro o problema, depois o padrão"]
    ],
    preparo: "Separe três problemas de design reais do nosso código, um para cada grupo."
  },
  /* 31 — Métricas DORA */
  {
    gancho: "Como sabemos se estamos melhores do que há um ano?",
    abertura: [
      "Sem medida, melhoria é só opinião",
      "A métrica errada distorce o comportamento",
      "Velocidade e estabilidade andam juntas"
    ],
    teoria: [
      ["Frequência de deploy e tempo de entrega medem velocidade", "Taxa de falha e tempo de recuperação medem estabilidade", "Sempre as quatro juntas, nunca uma isolada"],
      ["Satisfação, desempenho, atividade, colaboração e eficiência", "Nenhuma métrica sozinha representa produtividade", "Combine números com percepção"],
      ["Linhas de código e quantidade de commits são fáceis de inflar", "Meça o time e o sistema, não a pessoa", "Use métricas para aprender, não para punir"],
      ["Tempo de espera, interrupções e qualidade das ferramentas", "Pesquisas curtas e frequentes", "O atrito de hoje é o atraso de amanhã"]
    ],
    preparo: "Extraia antes os dados de deploys e incidentes dos últimos seis meses."
  },
  /* 32 — Cache, filas e escalabilidade */
  {
    gancho: "Se o número de usuários multiplicar por dez amanhã, o que quebra primeiro?",
    abertura: [
      "O crescimento expõe gargalos escondidos",
      "Escalar custa dinheiro e complexidade",
      "A ordem das otimizações importa mais do que a quantidade"
    ],
    teoria: [
      ["Vertical: uma máquina maior, simples e com teto", "Horizontal: mais máquinas", "Serviço sem estado pode ser replicado livremente"],
      ["Cache-aside: procura no cache e, se não achar, busca e guarda", "Tempo de vida e invalidação por evento", "Dado desatualizado é o preço: defina quanto é aceitável"],
      ["Tarefas demoradas saem da requisição e vão para a fila", "Contrapressão: o sistema avisa quando não aguenta mais", "Limite de requisições protege de abuso e de picos"],
      ["Réplicas de leitura aliviam o banco principal", "Particionar divide os dados entre servidores", "Com a rede partida, escolhe-se entre consistência e disponibilidade"]
    ],
    preparo: "Prepare um endpoint propositalmente lento e um cache local em container."
  },
  /* 33 — Qualidade na era da IA */
  {
    gancho: "Se a IA escreve o código e também os testes, quem garante que está certo?",
    abertura: [
      "A IA acelera a produção de código e também a de defeitos",
      "O papel de QA vai da execução para a estratégia",
      "Funcionalidade com IA não tem resposta única correta"
    ],
    teoria: [
      ["Gerar casos de teste a partir de requisitos", "Criar massa de dados variada", "Sugerir cenários de borda que ninguém pensou"],
      ["Boa para achar erros comuns e inconsistências", "Fraca em regra de negócio e em contexto do sistema", "É um complemento, não substitui a revisão humana"],
      ["Um conjunto de perguntas com respostas de referência", "Critérios de nota claros, aplicados por pessoas ou por outro modelo", "Reexecutar a avaliação a cada mudança de prompt ou de modelo"],
      ["Teste gerado a partir do código confirma o bug em vez de encontrá-lo", "Cobertura alta com verificações fracas", "Gere testes a partir do requisito, não da implementação"]
    ],
    preparo: "Escolha uma história de usuário real e peça ao QA que escreva os casos antes do encontro, sem IA."
  },
  /* 34 — Resiliência */
  {
    gancho: "Qual dependência externa, se cair agora, derruba o nosso sistema inteiro?",
    abertura: [
      "Em sistema distribuído, algo está sempre falhando",
      "A falha em cascata transforma um problema pequeno em indisponibilidade total",
      "Resiliência se projeta e se testa"
    ],
    teoria: [
      ["Toda chamada remota tem tempo limite", "Nova tentativa com recuo crescente e variação aleatória", "Disjuntor: para de chamar quem está falhando e testa a volta"],
      ["Recursos separados por dependência: uma lenta não consome tudo", "Resposta parcial é melhor do que erro total", "Defina o que é essencial e o que pode ser desligado"],
      ["Hipótese: 'se X falhar, o sistema continua fazendo Y'", "Experimento pequeno, com botão de parar", "Comece em homologação e amplie aos poucos"],
      ["Papéis claros durante o incidente", "Análise focada no sistema, não em quem errou", "Ações com dono e com prazo"]
    ],
    preparo: "Combine o experimento com o time de infraestrutura e use apenas o ambiente de homologação."
  },
  /* 35 — ADRs e C4 */
  {
    gancho: "Por que esse sistema foi feito assim? Quem ainda sabe responder?",
    abertura: [
      "O conhecimento sai da empresa junto com as pessoas",
      "Decisão sem registro é rediscutida várias vezes",
      "Documentação pesada ninguém lê: o formato precisa ser leve"
    ],
    teoria: [
      ["Contexto: a situação e as forças em jogo", "Decisão: o que escolhemos e as alternativas descartadas", "Consequências: o que ganhamos e o que passamos a aceitar"],
      ["Contexto: o sistema e quem o usa", "Contêineres: aplicações e bancos que compõem o sistema", "Componentes e código só quando necessário"],
      ["Diagrama em texto, versionado e revisado em merge request", "Fica ao lado do código que descreve", "É atualizado na mesma mudança"],
      ["Documente decisões, fronteiras e como rodar o sistema", "Não documente o que o código já diz", "Documento sem dono fica desatualizado"]
    ],
    preparo: "Escolha uma decisão recente para virar ADR e deixe aberta uma ferramenta de diagramas como código."
  },
  /* 36 — Carreira e cultura de aprendizado */
  {
    gancho: "O que você sabe hoje que não sabia há três anos?",
    abertura: [
      "Tecnologia muda: aprender é parte do trabalho",
      "As pessoas ficam onde crescem",
      "Um time que aprende junto entrega melhor"
    ],
    teoria: [
      ["Crescer não exige virar gestor", "A trilha técnica amplia impacto e influência", "Mudar de trilha é possível e reversível"],
      ["Situação, comportamento e impacto", "Perto do fato, em conversa reservada", "Pedir feedback é tão importante quanto dar"],
      ["A mentoria acelera quem ensina e quem aprende", "Programar em par espalha conhecimento", "Comunidades de prática cruzam os setores"],
      ["Poder errar, perguntar e discordar sem medo", "A liderança dá o exemplo ao admitir erros", "Sem segurança, os problemas ficam escondidos"]
    ],
    preparo: "Monte a linha do tempo dos 36 encontros e um formulário simples para a votação dos próximos temas."
  }
];
