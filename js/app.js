/* ==========================================================================
   Tech Talks — lógica da página
   Organização:
     1. Preparação dos dados (datas, ano, próximo encontro)
     2. Estado dos filtros
     3. Funções de renderização (cada uma desenha uma parte da tela)
     4. Modal de detalhes
     5. Eventos e inicialização
   ========================================================================== */

(function () {
  "use strict";

  const MESES_POR_ANO = 12;

  /* ----------------------------- utilidades ----------------------------- */

  const $ = (seletor) => document.querySelector(seletor);

  function escaparHtml(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function semAcentos(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function doisDigitos(numero) {
    return String(numero).padStart(2, "0");
  }

  /* ------------------------- 1. preparação dos dados -------------------- */

  function dataDoEncontro(indice) {
    const [ano, mes] = CONFIG.inicio.split("-").map(Number);
    return new Date(ano, mes - 1 + indice, 1);
  }

  function formatarMes(data, estilo) {
    return data
      .toLocaleDateString("pt-BR", { month: estilo, year: "numeric" })
      .replace(".", "")
      .replace(" de ", " ");
  }

  const temas = TEMAS.map((tema, indice) => ({
    ...tema,
    indice,
    numero: indice + 1,
    ano: Math.floor(indice / MESES_POR_ANO) + 1,
    data: dataDoEncontro(indice),
    categoria: CATEGORIAS[tema.cat],
    textoBusca: semAcentos(
      [tema.titulo, tema.resumo, CATEGORIAS[tema.cat].nome, tema.teoria.join(" "), tema.apresentador || ""].join(" ")
    )
  }));

  function encontrarProximo() {
    const hoje = new Date();
    const inicioDoMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    return temas.find((tema) => tema.data >= inicioDoMes) || null;
  }

  const proximoTema = encontrarProximo();

  /* --------------------------- 2. estado dos filtros -------------------- */

  const filtros = { ano: 0, categoria: "", busca: "" };

  function temasFiltrados() {
    const termo = semAcentos(filtros.busca.trim());
    return temas.filter(
      (tema) =>
        (filtros.ano === 0 || tema.ano === filtros.ano) &&
        (filtros.categoria === "" || tema.cat === filtros.categoria) &&
        (termo === "" || tema.textoBusca.includes(termo))
    );
  }

  /* ------------------------------ 3. renderização ----------------------- */

  function renderizarCabecalho() {
    $("#marca-nome").textContent = CONFIG.nome;
    $("#subtitulo").textContent = CONFIG.subtitulo;
    document.title = CONFIG.nome + " — " + temas.length + " temas em " + CONFIG.anos.length + " anos";

    $("#rotulo-programa").textContent =
      "Programa de " + CONFIG.anos.length + " anos · " + temas.length + " encontros · 1 hora por mês";

    const totalCategorias = new Set(temas.map((tema) => tema.cat)).size;
    const numeros = [
      [temas.length, "temas"],
      [totalCategorias, "áreas de conhecimento"],
      [temas.length + "h", "de aprendizado em grupo"]
    ];
    $("#numeros").innerHTML = numeros
      .map(([valor, legenda]) => `<li><strong>${valor}</strong><span>${legenda}</span></li>`)
      .join("");
  }

  function renderizarProximo() {
    const caixa = $("#proximo");
    if (!proximoTema) {
      caixa.innerHTML = `
        <p class="rotulo">Ciclo concluído</p>
        <h2>Os ${temas.length} encontros já aconteceram.</h2>
        <p>Hora de votar nos temas do próximo ciclo.</p>`;
      return;
    }
    caixa.innerHTML = `
      <p class="rotulo">Próximo encontro · ${formatarMes(proximoTema.data, "long")}</p>
      <h2>${escaparHtml(proximoTema.titulo)}</h2>
      <p>${escaparHtml(proximoTema.categoria.nome)} · ${escaparHtml(textoApresentador(proximoTema))}</p>
      <button type="button" data-abrir="${proximoTema.indice}">Ver roteiro do encontro</button>
      <button type="button" class="proximo__secundario" data-apresentar="${proximoTema.indice}">▶ Apresentar</button>`;
  }

  function renderizarRoteiro() {
    $("#barra-roteiro").innerHTML = CONFIG.roteiro
      .map((parte) => `<span style="flex:${parte.minutos}"></span>`)
      .join("");
    $("#lista-roteiro").innerHTML = CONFIG.roteiro
      .map(
        (parte) => `
        <li>
          <span class="min">${parte.minutos} min</span>
          <strong>${escaparHtml(parte.etapa)}</strong>
          <p>${escaparHtml(parte.descricao)}</p>
        </li>`
      )
      .join("");
  }

  function renderizarFiltros() {
    const abas = [{ valor: 0, texto: "Todos" }].concat(
      CONFIG.anos.map((_, i) => ({ valor: i + 1, texto: "Ano " + (i + 1) }))
    );
    $("#abas-ano").innerHTML = abas
      .map(
        (aba) =>
          `<button type="button" data-ano="${aba.valor}" aria-pressed="${filtros.ano === aba.valor}">${aba.texto}</button>`
      )
      .join("");

    $("#chips-cat").innerHTML = Object.entries(CATEGORIAS)
      .map(
        ([chave, categoria]) =>
          `<button type="button" data-cat="${chave}" style="--h:${categoria.matiz}" aria-pressed="${
            filtros.categoria === chave
          }">${escaparHtml(categoria.nome)}</button>`
      )
      .join("");
  }

  function textoApresentador(tema) {
    return tema.apresentador ? "Com " + tema.apresentador : "Apresentador(a) a definir";
  }

  function htmlCartao(tema) {
    const ehProximo = proximoTema && tema.indice === proximoTema.indice;
    return `
      <button type="button" class="cartao${ehProximo ? " cartao--proximo" : ""}"
              style="--h:${tema.categoria.matiz}" data-abrir="${tema.indice}">
        <span class="cartao__topo">
          <span class="cartao__num">${doisDigitos(tema.numero)}</span>
          <span class="cartao__mes">${formatarMes(tema.data, "short")}</span>
        </span>
        <h4>${escaparHtml(tema.titulo)}</h4>
        <p>${escaparHtml(tema.resumo)}</p>
        <span class="cartao__pe">
          <span class="etiqueta">${escaparHtml(tema.categoria.nome)}</span>
          <span class="etiqueta etiqueta--neutra">${escaparHtml(tema.nivel)}</span>
          ${ehProximo ? '<span class="etiqueta etiqueta--proximo">Próximo</span>' : ""}
        </span>
      </button>`;
  }

  function renderizarLista() {
    const visiveis = temasFiltrados();
    $("#contagem").textContent =
      visiveis.length === temas.length
        ? "Mostrando os " + temas.length + " temas"
        : visiveis.length + " de " + temas.length + " temas";

    if (visiveis.length === 0) {
      $("#lista").innerHTML = '<p class="vazio">Nenhum tema encontrado. Tente outra busca ou limpe os filtros.</p>';
      return;
    }

    $("#lista").innerHTML = CONFIG.anos
      .map((infoAno, i) => {
        const doAno = visiveis.filter((tema) => tema.ano === i + 1);
        if (doAno.length === 0) return "";
        return `
          <section class="ano">
            <header class="ano__cabeca">
              <span class="rotulo">Ano ${i + 1}</span>
              <h3>${escaparHtml(infoAno.titulo)}</h3>
              <p>${escaparHtml(infoAno.descricao)}</p>
            </header>
            <div class="grade">${doAno.map(htmlCartao).join("")}</div>
          </section>`;
      })
      .join("");
  }

  /* --------------------------------- 4. modal --------------------------- */

  const modal = $("#modal");

  function htmlCodigo(codigo) {
    if (!codigo) return "";
    return `
      <section>
        <h3>Antes e depois</h3>
        <div class="codigo">
          <figure class="antes"><figcaption>Antes</figcaption><pre><code>${escaparHtml(codigo.antes)}</code></pre></figure>
          <figure class="depois"><figcaption>Depois</figcaption><pre><code>${escaparHtml(codigo.depois)}</code></pre></figure>
        </div>
      </section>`;
  }

  function htmlBloco(bloco) {
    if (bloco.tabela) {
      return `
        <figure class="bloco">
          <figcaption><span>${escaparHtml(bloco.nome)}</span></figcaption>
          <div class="bloco__rolagem">
            <table>
              <thead><tr>${bloco.tabela.colunas.map((c) => `<th scope="col">${escaparHtml(c)}</th>`).join("")}</tr></thead>
              <tbody>${bloco.tabela.linhas
                .map((linha) => `<tr>${linha.map((celula) => `<td>${escaparHtml(celula)}</td>`).join("")}</tr>`)
                .join("")}</tbody>
            </table>
          </div>
        </figure>`;
    }
    return `
      <figure class="bloco">
        <figcaption>
          <span>${escaparHtml(bloco.nome)}${bloco.rodar ? ' <em title="Script completo: salve e execute com node">executável</em>' : ""}</span>
          <button type="button" data-copiar>Copiar</button>
        </figcaption>
        <pre><code>${escaparHtml(bloco.codigo)}</code></pre>
      </figure>`;
  }

  function exemploDoTema(tema) {
    return (typeof PRATICAS !== "undefined" && PRATICAS[tema.indice]) || null;
  }

  function htmlExemplo(tema) {
    const exemplo = exemploDoTema(tema);
    if (!exemplo) return "";
    return `
      <section class="exemplo">
        <h3>Exemplo pronto da prática</h3>
        <p>${escaparHtml(exemplo.intro)}</p>
        ${exemplo.blocos.map(htmlBloco).join("")}
        <p class="exemplo__observar"><strong>O que observar:</strong> ${escaparHtml(exemplo.observar)}</p>
      </section>`;
  }

  async function copiarBloco(botao) {
    const codigo = botao.closest("figure").querySelector("pre").textContent;
    try {
      await navigator.clipboard.writeText(codigo);
      botao.textContent = "Copiado";
    } catch (erro) {
      botao.textContent = "Selecione e copie";
    }
    setTimeout(() => { botao.textContent = "Copiar"; }, 1800);
  }

  function htmlPrint(print) {
    const figura = (rotulo, src) => `
      <figure class="print__lado">
        <figcaption>${rotulo}</figcaption>
        <a href="${escaparHtml(src)}" target="_blank" rel="noopener" title="Abrir a imagem em tamanho real">
          <img src="${escaparHtml(src)}" alt="${escaparHtml(print.titulo)}: tela ${rotulo.toLowerCase()}">
        </a>
      </figure>`;
    return `
      <div class="print">
        <p class="print__titulo">${escaparHtml(print.titulo)}</p>
        <div class="print__par">${figura("Antes", print.antes)}${figura("Depois", print.depois)}</div>
        <p class="print__nota">${escaparHtml(print.nota)}</p>
      </div>`;
  }

  function htmlPrints(tema) {
    if (!tema.prints) return "";
    return `
      <section>
        <h3>Da plataforma antiga para a nova</h3>
        ${tema.prints.map(htmlPrint).join("")}
        <p class="print__aviso">Telas de uma plataforma fictícia, criada para este programa. O código das duas versões está em <code>exemplos/migracao/</code>.</p>
      </section>`;
  }

  function htmlLista(itens, classe) {
    const marca = classe === "passos" ? "ol" : "ul";
    return `<${marca} class="${classe}">${itens.map((item) => `<li>${escaparHtml(item)}</li>`).join("")}</${marca}>`;
  }

  function abrirTema(indice) {
    const tema = temas[indice];
    if (!tema) return;

    const material = tema.material
      ? `<section><h3>Material</h3><a class="link-material" href="${escaparHtml(tema.material)}" target="_blank" rel="noopener">Abrir slides ou gravação</a></section>`
      : "";

    modal.style.setProperty("--h", tema.categoria.matiz);
    $("#modal-conteudo").innerHTML = `
      <div class="modal__cabeca">
        <p class="rotulo">Encontro ${doisDigitos(tema.numero)} · ${formatarMes(tema.data, "long")} · Ano ${tema.ano}</p>
        <button type="button" class="modal__fechar" data-fechar aria-label="Fechar">×</button>
      </div>
      <h2 id="modal-titulo">${escaparHtml(tema.titulo)}</h2>
      <div class="modal__etiquetas">
        <span class="etiqueta">${escaparHtml(tema.categoria.nome)}</span>
        <span class="etiqueta etiqueta--neutra">${escaparHtml(tema.nivel)}</span>
        <span class="etiqueta etiqueta--neutra">${escaparHtml(textoApresentador(tema))}</span>
        <span class="etiqueta etiqueta--neutra">Perfil sugerido: ${escaparHtml(tema.perfil)}</span>
      </div>
      <p class="modal__resumo">${escaparHtml(tema.resumo)}</p>
      <button type="button" class="botao-apresentar" data-apresentar="${indice}">▶ Abrir apresentação</button>

      <div class="duas-colunas">
        <section>
          <h3>Teoria · ${CONFIG.roteiro[1].minutos} min</h3>
          ${htmlLista(tema.teoria, "lista")}
        </section>
        <section>
          <h3>Prática no nosso ambiente · ${CONFIG.roteiro[2].minutos} min</h3>
          <p class="pratica__titulo">${escaparHtml(tema.pratica.titulo)}</p>
          ${htmlLista(tema.pratica.passos, "passos")}
        </section>
      </div>

      ${htmlPrints(tema)}
      ${htmlCodigo(tema.codigo)}
      ${htmlExemplo(tema)}

      <div class="duas-colunas">
        <section>
          <h3>Para discutir · ${CONFIG.roteiro[3].minutos} min</h3>
          ${htmlLista(tema.discussao, "lista")}
        </section>
        <section>
          <h3>Para se aprofundar</h3>
          ${htmlLista(tema.refs, "lista")}
        </section>
      </div>
      ${material}

      <div class="modal__navegacao">
        <button type="button" data-abrir="${indice - 1}" ${indice === 0 ? "disabled" : ""}>← Anterior</button>
        <button type="button" data-abrir="${indice + 1}" ${indice === temas.length - 1 ? "disabled" : ""}>Próximo →</button>
      </div>`;

    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
    history.replaceState(null, "", "#tema-" + tema.numero);
  }

  function fecharModal() {
    modal.close();
  }

  function abrirTemaDaUrl() {
    const achado = location.hash.match(/^#tema-(\d+)$/);
    if (achado) abrirTema(Number(achado[1]) - 1);
  }

  /* ------------------------ 5. eventos e inicialização ------------------ */

  function alternarTema() {
    const raiz = document.documentElement;
    const escuroAtivo =
      raiz.dataset.theme === "dark" ||
      (!raiz.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    raiz.dataset.theme = escuroAtivo ? "light" : "dark";
    try {
      localStorage.setItem("tema-visual", raiz.dataset.theme);
    } catch (erro) {
      /* armazenamento indisponível: a preferência vale só para esta visita */
    }
  }

  function registrarEventos() {
    document.addEventListener("click", (evento) => {
      const alvo = evento.target.closest("[data-abrir], [data-fechar], [data-ano], [data-cat], [data-copiar]");
      if (!alvo) return;

      if (alvo.dataset.copiar !== undefined) {
        copiarBloco(alvo);
        return;
      }

      if (alvo.dataset.abrir !== undefined) {
        abrirTema(Number(alvo.dataset.abrir));
      } else if (alvo.dataset.fechar !== undefined) {
        fecharModal();
      } else if (alvo.dataset.ano !== undefined) {
        filtros.ano = Number(alvo.dataset.ano);
        renderizarFiltros();
        renderizarLista();
      } else if (alvo.dataset.cat !== undefined) {
        filtros.categoria = filtros.categoria === alvo.dataset.cat ? "" : alvo.dataset.cat;
        renderizarFiltros();
        renderizarLista();
      }
    });

    $("#busca").addEventListener("input", (evento) => {
      filtros.busca = evento.target.value;
      renderizarLista();
    });

    // Clique fora do conteúdo fecha o modal.
    modal.addEventListener("click", (evento) => {
      if (evento.target === modal) fecharModal();
    });
    modal.addEventListener("close", () => {
      if (location.hash.startsWith("#tema-")) {
        history.replaceState(null, "", location.pathname + location.search);
      }
    });

    $("#botao-tema").addEventListener("click", alternarTema);
    window.addEventListener("hashchange", abrirTemaDaUrl);
  }

  function iniciar() {
    renderizarCabecalho();
    renderizarProximo();
    renderizarRoteiro();
    renderizarFiltros();
    renderizarLista();
    registrarEventos();
    abrirTemaDaUrl();
  }

  // Compartilhado com js/apresentacao.js
  window.TechTalks = { temas, escaparHtml, formatarMes, doisDigitos, textoApresentador, htmlBloco, htmlPrint, exemploDoTema };

  iniciar();
})();
