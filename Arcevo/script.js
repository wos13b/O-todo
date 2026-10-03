/* =====================================================
   ACERVO DIGITAL
===================================================== */


/* =====================================================
   ESTADO
===================================================== */

let categoriaAtual = "Todos";

let fonteAtual = 20;

let obraAtual = null;


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        carregarDestaques();

        carregarCatalogo();

        carregarAutores();

        carregarTema();

    }
);


/* =====================================================
   NAVEGAÇÃO
===================================================== */

function mostrarPagina(nome) {

    const paginas =
        document.querySelectorAll(".pagina");

    paginas.forEach(
        pagina => pagina.classList.add("hidden")
    );

    const pagina =
        document.getElementById(
            `pagina-${nome}`
        );

    if (pagina) {

        pagina.classList.remove("hidden");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   DESTAQUES
===================================================== */

function carregarDestaques() {

    const container =
        document.getElementById(
            "obras-destaque"
        );

    const destaques =
        obras.filter(
            obra => obra.destaque
        );

    container.innerHTML =
        destaques
            .map(criarCardObra)
            .join("");

}


/* =====================================================
   CATÁLOGO
===================================================== */

function carregarCatalogo(lista = obras) {

    const container =
        document.getElementById(
            "catalogo-obras"
        );

    if (lista.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                <h2>Nenhuma obra encontrada.</h2>
                <p>
                    Tente outro termo de pesquisa ou categoria.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        lista
            .map(criarCardObra)
            .join("");

}


/* =====================================================
   CARD DE OBRA
===================================================== */

function criarCardObra(obra) {

    const conteudoCapa = obra.capa 
        ? `<img src="${obra.capa}" alt="${obra.titulo}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">`
        : `
            <div class="cover-content">
                <div class="cover-title">
                    ${obra.titulo}
                </div>
                <div class="cover-author">
                    ${obra.autor}
                </div>
            </div>
        `;

    const estiloFundo = obra.capa 
        ? 'background: #000;' 
        : `
            background:
            linear-gradient(
                145deg,
                ${obra.cor1 || '#302050'},
                ${obra.cor2 || '#7552a6'}
            );
          `;

    return `

        <article
            class="book-card"
            onclick="abrirObra(${obra.id})"
        >

            <div
                class="book-cover"
                style="${estiloFundo}"
            >
                ${conteudoCapa}
            </div>

            <div class="book-info">

                <h3>
                    ${obra.titulo}
                </h3>

                <p>
                    ${obra.autor}
                </p>

                <span class="book-category">
                    ${obra.categoria}
                </span>

            </div>

        </article>

    `;

}


/* =====================================================
   ABRIR OBRA
===================================================== */

function abrirObra(id) {

    const obra =
        obras.find(
            item => item.id === id
        );

    if (!obra) return;

    obraAtual = obra;

    const container =
        document.getElementById(
            "detalhes-obra"
        );

    const favorito =
        verificarFavorito(obra.id);

    container.innerHTML = `

        <div class="work-header">

            <div
                class="work-cover"
                style="
                    background:
                    linear-gradient(
                        145deg,
                        ${obra.cor1 || '#302050'},
                        ${obra.cor2 || '#7552a6'}
                    );
                "
            >

                <div class="cover-content">

                    <div class="cover-title">
                        ${obra.titulo}
                    </div>

                    <div class="cover-author">
                        ${obra.autor}
                    </div>

                </div>

            </div>


            <div class="work-information">

                <span class="section-label">
                    ${obra.categoria}
                </span>

                <h1>
                    ${obra.titulo}
                </h1>

                <div class="work-author">
                    ${obra.autor}
                </div>

                <div class="work-meta">

                    <span>
                        ${obra.periodo || ''}
                    </span>

                    <span>
                        ${obra.ano || ''}
                    </span>

                </div>

                <p class="work-description">
                    ${obra.descricao || 'Obra literária integrada ao acervo digital.'}
                </p>

                <div class="work-actions">

                    <button
                        class="button-primary"
                        onclick="iniciarLeitura(${obra.id})"
                    >
                        📖 Ler obra
                    </button>

                    <button
                        class="button-secondary"
                        onclick="alternarFavorito(${obra.id})"
                        id="favorite-button"
                    >
                        ${favorito ? "★ Favoritado" : "☆ Favoritar"}
                    </button>

                </div>

            </div>

        </div>

    `;

    mostrarPagina("obra");

}


/* =====================================================
   LEITURA
===================================================== */

function iniciarLeitura(id) {

    const obra =
        obras.find(
            item => item.id === id
        );

    if (!obra) return;

    obraAtual = obra;

    document.getElementById(
        "reader-title"
    ).textContent =
        obra.titulo;

    const leitor =
        document.getElementById(
            "texto-leitura"
        );

    if (obra.texto && obra.texto.endsWith('.html')) {
        fetch(obra.texto)
            .then(response => response.text())
            .then(html => {
                leitor.innerHTML = html;
                leitor.style.fontSize = `${fonteAtual}px`;
                mostrarPagina("leitor");
            })
            .catch(error => {
                leitor.innerHTML = `<h1>${obra.titulo}</h1><p>Não foi possível carregar o texto da obra.</p>`;
                leitor.style.fontSize = `${fonteAtual}px`;
                mostrarPagina("leitor");
            });
    } else {
        leitor.innerHTML = obra.texto || `<p>Texto indisponível.</p>`;
        leitor.style.fontSize = `${fonteAtual}px`;
        mostrarPagina("leitor");
    }

}


/* =====================================================
   VOLTAR DA LEITURA
===================================================== */

function voltarDaLeitura() {

    if (obraAtual) {

        abrirObra(
            obraAtual.id
        );

    } else {

        mostrarPagina("catalogo");

    }

}


/* =====================================================
   TAMANHO DA FONTE
===================================================== */

function alterarFonte(valor) {

    fonteAtual += valor;

    if (fonteAtual < 14) {

        fonteAtual = 14;

    }

    if (fonteAtual > 32) {

        fonteAtual = 32;

    }

    const leitor =
        document.getElementById(
            "texto-leitura"
        );

    leitor.style.fontSize =
        `${fonteAtual}px`;

}


/* =====================================================
   MODO DE LEITURA
===================================================== */

function alternarModoLeitura() {

    document.body.classList.toggle(
        "reader-dark"
    );

}


/* =====================================================
   BUSCA
===================================================== */

function pesquisarObras() {

    const campo =
        document.getElementById(
            "campo-busca"
        );

    const termo =
        campo.value
            .toLowerCase()
            .trim();

    let resultado =
        obras.filter(
            obra => {

                const texto = (

                    obra.titulo +
                    " " +
                    obra.autor +
                    " " +
                    obra.categoria +
                    " " +
                    (obra.periodo || "") +
                    " " +
                    (obra.descricao || "")

                ).toLowerCase();

                return texto.includes(
                    termo
                );

            }
        );


    if (categoriaAtual !== "Todos") {

        resultado =
            resultado.filter(
                obra =>
                    obra.categoria ===
                    categoriaAtual
            );

    }


    carregarCatalogo(resultado);

}


/* =====================================================
   FILTRO DE CATEGORIA
===================================================== */

function filtrarCategoria(categoria) {

    categoriaAtual =
        categoria;

    const campo =
        document.getElementById(
            "campo-busca"
        );

    if (campo) {

        campo.value = "";

    }


    if (categoria !== "Todos") {

        mostrarPagina("catalogo");

    }


    document
        .querySelectorAll(".filter")
        .forEach(
            botao => {

                botao.classList.remove(
                    "active"
                );

                if (
                    botao.textContent.trim() ===
                    categoria
                ) {

                    botao.classList.add(
                        "active"
                    );

                }

            }
        );


    if (categoria === "Todos") {

        carregarCatalogo(obras);

        return;

    }


    const resultado =
        obras.filter(
            obra =>
                obra.categoria ===
                categoria
        );

    carregarCatalogo(
        resultado
    );

}


/* =====================================================
   AUTORES (Gerado dinamicamente a partir do arquivo Livros.js)
===================================================== */

function carregarAutores() {

    const container =
        document.getElementById(
            "lista-autores"
        );

    // Mapeia os autores únicos presentes na lista de obras
    const autoresUnicos = {};
    
    obras.forEach(obra => {
        if (!autoresUnicos[obra.autor]) {
            autoresUnicos[obra.autor] = {
                nome: obra.autor,
                periodo: obra.periodo || "Diversos",
                descricao: `Autor(a) presente no acervo com obras na categoria ${obra.categoria}.`
            };
        }
    });

    const listaAutores = Object.values(autoresUnicos);

    container.innerHTML =
        listaAutores
            .map(
                autor => `

                    <article class="author-card">

                        <div class="author-symbol">
                            ✦
                        </div>

                        <h3>
                            ${autor.nome}
                        </h3>

                        <p>
                            ${autor.periodo}
                        </p>

                        <p style="margin-top:10px;">
                            ${autor.descricao}
                        </p>

                    </article>

                `
            )
            .join("");

}


/* =====================================================
   FAVORITOS
===================================================== */

function obterFavoritos() {

    return JSON.parse(
        localStorage.getItem(
            "acervo_favoritos"
        ) || "[]"
    );

}


function verificarFavorito(id) {

    const favoritos =
        obterFavoritos();

    return favoritos.includes(id);

}


function alternarFavorito(id) {

    let favoritos =
        obterFavoritos();

    if (
        favoritos.includes(id)
    ) {

        favoritos =
            favoritos.filter(
                favorito =>
                    favorito !== id
            );

    } else {

        favoritos.push(id);

    }

    localStorage.setItem(
        "acervo_favoritos",
        JSON.stringify(
            favoritos
        )
    );


    const botao =
        document.getElementById(
            "favorite-button"
        );

    if (botao) {

        botao.textContent =
            favoritos.includes(id)
                ? "★ Favoritado"
                : "☆ Favoritar";

    }

}


/* =====================================================
   TEMA
===================================================== */

function alternarTema() {

    document.body.classList.toggle(
        "light-theme"
    );

    const claro =
        document.body.classList.contains(
            "light-theme"
        );

    localStorage.setItem(
        "acervo_tema",
        claro
            ? "claro"
            : "escuro"
    );

}


function carregarTema() {

    const tema =
        localStorage.getItem(
            "acervo_tema"
        );

    if (tema === "claro") {

        document.body.classList.add(
            "light-theme"
        );

    }

}