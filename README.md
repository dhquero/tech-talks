# Tech Talks

Site do programa mensal de apresentações técnicas do time: **48 temas em 4 anos**, um encontro de 1 hora por mês, sempre com teoria e prática.

Feito com HTML, CSS e JavaScript puros. Não tem build, dependências nem servidor: basta abrir o `index.html`.

## Estrutura

```
index.html      página única
css/style.css   estilos (tema claro e escuro)
js/temas.js         DADOS: configuração, categorias e os 36 temas
js/slides.js        DADOS: conteúdo dos slides de cada tema
js/praticas.js      DADOS: exemplo pronto da prática de cada tema
js/ano4.js          DADOS: os 12 encontros do ano 4 (tema, slides e prática juntos)
exemplos/migracao/  plataforma fictícia em duas versões: legado.html e novo.html
img/migracao/       prints "antes e depois" usados nos encontros de migração
js/app.js           lógica: filtros, busca, cartões e janela de detalhes
js/apresentacao.js  lógica: modo de apresentação (slides)
```

## Como editar

Tudo o que muda no dia a dia fica em `js/temas.js`:

| O que | Onde |
|---|---|
| Mês do primeiro encontro | `CONFIG.inicio` (formato `AAAA-MM`) |
| Nome e subtítulo do programa | `CONFIG.nome` e `CONFIG.subtitulo` |
| Divisão dos 60 minutos | `CONFIG.roteiro` |
| Quem apresenta | adicione `apresentador: "Nome"` no tema |
| Slides ou gravação | adicione `material: "https://..."` no tema |
| Ordem dos temas | a posição no array `TEMAS` define o mês |

As datas são calculadas a partir de `CONFIG.inicio`, e o site destaca sozinho o próximo encontro.

Cada tema tem um endereço próprio para compartilhar, por exemplo `.../#tema-13`.

## Apresentações

Cada tema tem uma apresentação pronta, dividida em **Abertura, Teoria, Prática e Discussão**. Abra um tema e clique em **Abrir apresentação**, ou use o endereço direto `.../#apresentacao-13`.

| Tecla | Ação |
|---|---|
| `→` ou espaço | próximo slide |
| `←` | slide anterior |
| `Home` / `End` | primeiro / último slide |
| `F` | tela cheia |
| `Esc` | fechar |

A barra inferior mostra as quatro seções (clique para pular até uma delas), o tempo decorrido e o número do slide.

Para ajustar o conteúdo dos slides, edite `js/slides.js`: cada item tem a pergunta de abertura (`gancho`), os pontos de abertura, os detalhes de cada tópico de teoria e o que o apresentador deve preparar. Os slides de prática e discussão vêm de `js/temas.js`.

## Práticas

A prática de cada tema tem duas partes:

1. **Exemplo pronto** (`js/praticas.js`): código, configuração, comandos ou modelo preenchido para demonstrar ao vivo. Blocos marcados como *executável* são scripts completos: copie, salve e rode com `node arquivo.js` (Node 18 ou mais recente). Os demais são arquivos de configuração, comandos ou trechos que dependem de ferramentas externas (Docker, Terraform, k6, Playwright, banco de dados).
2. **No nosso ambiente** (`js/temas.js`, campo `pratica.passos`): a sugestão de repetir o exercício no código e nas ferramentas do time.

Os dados dos exemplos (cartões, métricas, pessoas, sistemas) são fictícios. Antes do encontro, quem apresenta deve rodar o exemplo no próprio ambiente.

## Prints da migração

Os encontros 37 a 39 mostram telas de uma plataforma fictícia antes e depois da migração. As duas versões são páginas reais que você pode abrir e inspecionar:

- `exemplos/migracao/legado.html` (use `#lista` ou `#form` no fim do endereço)
- `exemplos/migracao/novo.html`

Para trocar pelos prints do sistema de vocês, substitua os arquivos em `img/migracao/` mantendo os nomes, ou altere os caminhos no campo `prints` de `js/ano4.js`.

## Dados que envelhecem

Os encontros 43 a 46 citam números de mercado, empresas, taxas das lojas e versões de ferramentas, conferidos em novembro de 2026. Antes de apresentar, confira de novo nas fontes indicadas em cada tema.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos:

   ```bash
   git init
   git add .
   git commit -m "feat: site do programa Tech Talks"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/tech-talks.git
   git push -u origin main
   ```

2. No repositório, abra **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**, selecione `main` e a pasta `/ (root)`, e salve.
4. Em um ou dois minutos o site estará em `https://SEU-USUARIO.github.io/tech-talks/`.

## Os temas

**Ano 1 — Fundamentos:** Código Limpo · Testes e TDD · Git e code review · IA no dia a dia · SOLID · Docker · Scrum, Kanban e métricas · APIs REST · Performance web · OWASP Top 10 · Refatoração · Dívida técnica

**Ano 2 — Arquitetura e escala:** Arquitetura Limpa · CI/CD · Testes de API e contrato · DDD · Arquitetura mobile · Bancos de dados · Observabilidade · LLMs e RAG · Team Topologies · Monólito modular ou microsserviços · Testes ponta a ponta · Design Systems e acessibilidade

**Ano 3 — Maturidade e futuro:** Eventos e mensageria · Agentes de IA · Infraestrutura como código · Testes de carga · DevSecOps · Padrões de projeto · Métricas DORA · Cache e escalabilidade · Qualidade na era da IA · Resiliência · ADRs e C4 · Carreira e cultura de aprendizado

**Ano 4 — Evolução e especialização:** Migração de front-end legado (3 partes) · Feature flags e testes A/B · Playwright e testes de front-end · Programação funcional · Windows, Linux, macOS, Android e iOS · Programação para mobile · App Store e Google Play · Deploy automático e fastlane · TypeScript · LGPD e privacidade
