/* ==========================================================================
   Tech Talks — modo de apresentação (slides)
   Monta os slides de um tema a partir de TEMAS (js/temas.js) e de
   APRESENTACOES (js/slides.js) e os exibe em tela cheia.
   Atalhos: → ou espaço avança · ← volta · Home/End · F tela cheia · Esc fecha
   ========================================================================== */

(function () {
  "use strict";

  const { temas, escaparHtml, formatarMes, doisDigitos, textoApresentador, htmlBloco, htmlPrint, exemploDoTema } = window.TechTalks;
  const deck = document.querySelector("#deck");
  const SECOES = CONFIG.roteiro.map((parte) => parte.etapa); // Abertura, Teoria, Prática, Discussão

  let slides = [];
  let atual = 0;
  let temaAtual = null;
  let inicio = 0;
  let relogio = null;

  /* --------------------------- montagem dos slides ---------------------- */

  function lista(itens, ordenada) {
    const marca = ordenada ? "ol" : "ul";
    return `<${marca} class="slide__lista${ordenada ? " slide__lista--passos" : ""}">${itens
      .map((item) => `<li>${escaparHtml(item)}</li>`)
      .join("")}</${marca}>`;
  }

  function slide(secao, rotulo, html, classe) {
    return { secao, rotulo, html, classe: classe || "" };
  }

  function slidesDeAbertura(tema, extra) {
    const resultado = [
      slide(0, "", `
        <p class="slide__sobre">Encontro ${doisDigitos(tema.numero)} · ${formatarMes(tema.data, "long")} · ${escaparHtml(tema.categoria.nome)}</p>
        <h2 class="slide__capa">${escaparHtml(tema.titulo)}</h2>
        <p class="slide__apoio">${escaparHtml(textoApresentador(tema))}</p>`, "slide--capa"),
      slide(0, "Agenda", `
        <h2>Nossa próxima hora</h2>
        <ol class="slide__agenda">${CONFIG.roteiro
          .map((parte) => `<li><span>${parte.minutos} min</span><strong>${escaparHtml(parte.etapa)}</strong><em>${escaparHtml(parte.descricao)}</em></li>`)
          .join("")}</ol>`)
    ];
    if (extra.gancho) {
      resultado.push(slide(0, "Para começar", `<p class="slide__pergunta">${escaparHtml(extra.gancho)}</p>`, "slide--pergunta"));
    }
    resultado.push(slide(0, "Por que este tema", `
      <h2>Por que isso importa para nós</h2>
      ${extra.abertura ? lista(extra.abertura) : `<p class="slide__apoio">${escaparHtml(tema.resumo)}</p>`}`));
    return resultado;
  }

  function slidesDeTeoria(tema, extra) {
    const resultado = [];
    tema.teoria.forEach((topico, i) => {
      const detalhes = extra.teoria && extra.teoria[i];
      resultado.push(slide(1, `Teoria ${i + 1} de ${tema.teoria.length}`, `
        <h2>${escaparHtml(topico)}</h2>
        ${detalhes ? lista(detalhes) : ""}`));
    });
    (tema.prints || []).forEach((print) => {
      resultado.push(slide(1, "Antes e depois", htmlPrint(print), "slide--print"));
    });
    if (tema.codigo) {
      resultado.push(slide(1, "Exemplo · antes", `
        <h2 class="slide__titulo-menor">Antes</h2>
        <pre class="slide__codigo slide__codigo--antes"><code>${escaparHtml(tema.codigo.antes)}</code></pre>`));
      resultado.push(slide(1, "Exemplo · depois", `
        <h2 class="slide__titulo-menor">Depois</h2>
        <pre class="slide__codigo slide__codigo--depois"><code>${escaparHtml(tema.codigo.depois)}</code></pre>`));
    }
    return resultado;
  }

  function slidesDePratica(tema, extra) {
    const exemplo = exemploDoTema(tema);
    const resultado = [];

    // 1. Exemplo pronto, para demonstrar ao vivo
    if (exemplo) {
      resultado.push(slide(2, "Exemplo guiado", `
        <h2>${escaparHtml(tema.pratica.titulo)}</h2>
        <p class="slide__apoio">${escaparHtml(exemplo.intro)}</p>
        <p class="slide__nota"><strong>O que observar:</strong> ${escaparHtml(exemplo.observar)}</p>`));
      exemplo.blocos.forEach((bloco, i) => {
        resultado.push(slide(2, `Exemplo ${i + 1} de ${exemplo.blocos.length}`, htmlBloco(bloco), "slide--bloco"));
      });
    }

    // 2. A mesma prática, agora no ambiente do time
    resultado.push(slide(2, "Agora no nosso ambiente", `
      <h2>${exemplo ? "Nossa vez: no nosso ambiente" : escaparHtml(tema.pratica.titulo)}</h2>
      ${lista(tema.pratica.passos, true)}
      ${extra.preparo ? `<p class="slide__nota"><strong>Para quem apresenta:</strong> ${escaparHtml(extra.preparo)}</p>` : ""}`));
    return resultado;
  }

  function slidesDeDiscussao(tema) {
    const proximo = temas[tema.indice + 1];
    return [
      slide(3, "Perguntas para o time", `
        <h2>Para discutir</h2>
        ${lista(tema.discussao)}`),
      slide(3, "Encerramento", `
        <h2>O que levamos daqui</h2>
        <ul class="slide__lista">
          <li>Uma ação concreta para aplicar a partir de amanhã: qual?</li>
          <li>Quem fica responsável por acompanhar?</li>
        </ul>
        <div class="slide__colunas">
          <div><h3>Para se aprofundar</h3>${lista(tema.refs)}</div>
          <div><h3>Próximo encontro</h3><p>${
            proximo
              ? escaparHtml(proximo.titulo) + " · " + formatarMes(proximo.data, "long")
              : "Este foi o último encontro do ciclo. Hora de escolher os próximos temas."
          }</p></div>
        </div>`)
    ];
  }

  function montarSlides(tema) {
    const extra = (typeof APRESENTACOES !== "undefined" && APRESENTACOES[tema.indice]) || {};
    return [].concat(
      slidesDeAbertura(tema, extra),
      slidesDeTeoria(tema, extra),
      slidesDePratica(tema, extra),
      slidesDeDiscussao(tema)
    );
  }

  /* ------------------------------ exibição ------------------------------ */

  function tempoDecorrido() {
    const segundos = Math.floor((Date.now() - inicio) / 1000);
    return doisDigitos(Math.floor(segundos / 60)) + ":" + doisDigitos(segundos % 60);
  }

  function mostrar(indice) {
    atual = Math.max(0, Math.min(indice, slides.length - 1));
    const s = slides[atual];

    deck.querySelector("#deck-slide").className = "deck__slide " + s.classe;
    deck.querySelector("#deck-slide").innerHTML =
      (s.rotulo ? `<p class="slide__rotulo">${escaparHtml(s.rotulo)}</p>` : "") + s.html;
    deck.querySelector("#deck-slide").scrollTop = 0;

    deck.querySelectorAll("[data-secao]").forEach((el) => {
      el.setAttribute("aria-current", Number(el.dataset.secao) === s.secao ? "step" : "false");
    });
    deck.querySelector("#deck-contador").textContent = atual + 1 + " / " + slides.length;
    deck.querySelector("#deck-progresso").style.width = ((atual + 1) / slides.length) * 100 + "%";
    deck.querySelector("[data-deck='voltar']").disabled = atual === 0;
    deck.querySelector("[data-deck='avancar']").disabled = atual === slides.length - 1;
  }

  function abrir(indice) {
    const tema = temas[indice];
    if (!tema) return;
    temaAtual = tema;
    slides = montarSlides(tema);

    const modalDetalhes = document.querySelector("#modal");
    if (modalDetalhes.open) modalDetalhes.close();

    deck.style.setProperty("--h", tema.categoria.matiz);
    deck.innerHTML = `
      <div class="deck__progresso"><span id="deck-progresso"></span></div>
      <article class="deck__slide" id="deck-slide" aria-live="polite" tabindex="-1" autofocus></article>
      <footer class="deck__barra">
        <nav class="deck__secoes" aria-label="Seções da apresentação">
          ${SECOES.map(
            (nome, i) =>
              `<button type="button" data-secao="${i}">${escaparHtml(nome)} <small>${CONFIG.roteiro[i].minutos}′</small></button>`
          ).join("")}
        </nav>
        <div class="deck__controles">
          <span class="deck__relogio" id="deck-relogio" title="Tempo decorrido">00:00</span>
          <span id="deck-contador"></span>
          <button type="button" data-deck="voltar" aria-label="Slide anterior">←</button>
          <button type="button" data-deck="avancar" aria-label="Próximo slide">→</button>
          <button type="button" data-deck="tela-cheia" aria-label="Tela cheia" title="Tela cheia (F)">⛶</button>
          <button type="button" data-deck="fechar" aria-label="Fechar apresentação" title="Fechar (Esc)">×</button>
        </div>
      </footer>`;

    if (!deck.open) deck.showModal();
    inicio = Date.now();
    clearInterval(relogio);
    relogio = setInterval(() => {
      const el = deck.querySelector("#deck-relogio");
      if (el) el.textContent = tempoDecorrido();
    }, 1000);

    mostrar(0);
    history.replaceState(null, "", "#apresentacao-" + tema.numero);
  }

  function fechar() {
    if (document.fullscreenElement) document.exitFullscreen();
    deck.close();
  }

  function alternarTelaCheia() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (deck.requestFullscreen) {
      deck.requestFullscreen().catch(() => {});
    }
  }

  function irParaSecao(secao) {
    const destino = slides.findIndex((s) => s.secao === secao);
    if (destino >= 0) mostrar(destino);
  }

  /* -------------------------------- eventos ----------------------------- */

  document.addEventListener("click", (evento) => {
    const botaoAbrir = evento.target.closest("[data-apresentar]");
    if (botaoAbrir) {
      abrir(Number(botaoAbrir.dataset.apresentar));
      return;
    }
    if (!deck.open) return;

    const botaoSecao = evento.target.closest("[data-secao]");
    if (botaoSecao) {
      irParaSecao(Number(botaoSecao.dataset.secao));
      return;
    }
    const controle = evento.target.closest("[data-deck]");
    if (!controle) return;
    const acoes = {
      voltar: () => mostrar(atual - 1),
      avancar: () => mostrar(atual + 1),
      "tela-cheia": alternarTelaCheia,
      fechar
    };
    acoes[controle.dataset.deck]();
  });

  deck.addEventListener("keydown", (evento) => {
    const teclas = {
      ArrowRight: () => mostrar(atual + 1),
      PageDown: () => mostrar(atual + 1),
      " ": () => mostrar(atual + 1),
      ArrowLeft: () => mostrar(atual - 1),
      PageUp: () => mostrar(atual - 1),
      Home: () => mostrar(0),
      End: () => mostrar(slides.length - 1),
      f: alternarTelaCheia,
      F: alternarTelaCheia
    };
    const acao = teclas[evento.key];
    if (!acao) return;
    evento.preventDefault();
    acao();
  });

  deck.addEventListener("close", () => {
    clearInterval(relogio);
    if (location.hash.startsWith("#apresentacao-")) {
      history.replaceState(null, "", temaAtual ? "#tema-" + temaAtual.numero : location.pathname);
    }
  });

  function abrirDaUrl() {
    const achado = location.hash.match(/^#apresentacao-(\d+)$/);
    if (achado) abrir(Number(achado[1]) - 1);
  }

  window.addEventListener("hashchange", abrirDaUrl);
  abrirDaUrl();
})();
