// =========================================================
// SELETORES PRINCIPAIS
// =========================================================

const menuToggle =
    document.querySelector(".menu-toggle");

const submenu =
    document.querySelector(".submenu");

const inputCampo =
    document.getElementById("search_camp");

const languageSelector =
    document.getElementById("language-selector");

const inputCampCode =
    document.querySelector(".Camp_code input");


// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL =
    "https://aqaaclqbeguloxqjfgtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =========================================================
// ATUALIZAR MENU DE AUTENTICAÇÃO
// =========================================================

function atualizarMenuAuth(session) {

    // =======================================================
    // ELEMENTOS DO MENU
    // =======================================================

    const cadastro =
        document.querySelector("#nav-cadastro");

    const login =
        document.querySelector("#nav-login");

    const perfil =
        document.querySelector("#nav-perfil");


    // =======================================================
    // USUÁRIO LOGADO
    // =======================================================

    if (session) {

        console.log(
            "Usuário logado:",
            session.user
        );


        // ---------------------------------------------------
        // OCULTAR CADASTRO
        // ---------------------------------------------------

        if (cadastro) {

            cadastro.style.display =
                "none";
        }


        // ---------------------------------------------------
        // OCULTAR LOGIN
        // ---------------------------------------------------

        if (login) {

            login.style.display =
                "none";
        }


        // ---------------------------------------------------
        // MOSTRAR PERFIL
        // ---------------------------------------------------

        if (perfil) {

            perfil.style.display =
                "";
        }

    }


    // =======================================================
    // USUÁRIO NÃO LOGADO
    // =======================================================

    else {

        console.log(
            "Nenhum usuário logado."
        );


        // ---------------------------------------------------
        // MOSTRAR CADASTRO
        // ---------------------------------------------------

        if (cadastro) {

            cadastro.style.display =
                "";
        }


        // ---------------------------------------------------
        // MOSTRAR LOGIN
        // ---------------------------------------------------

        if (login) {

            login.style.display =
                "";
        }


        // ---------------------------------------------------
        // OCULTAR PERFIL
        // ---------------------------------------------------

        if (perfil) {

            perfil.style.display =
                "none";
        }

    }

}


// =========================================================
// VERIFICAR SESSÃO ATUAL
// =========================================================

async function verificarSessao() {

    try {

        const {
            data: { session },
            error
        } =
            await supabaseClient.auth.getSession();


        // ---------------------------------------------------
        // VERIFICAR ERRO
        // ---------------------------------------------------

        if (error) {

            console.error(
                "Erro ao verificar sessão:",
                error
            );

            return;
        }


        // ---------------------------------------------------
        // ATUALIZAR MENU
        // ---------------------------------------------------

        atualizarMenuAuth(session);

    }

    catch (erro) {

        console.error(
            "Erro na verificação da sessão:",
            erro
        );

    }

}


// =========================================================
// OBSERVAR ALTERAÇÕES DE AUTENTICAÇÃO
// =========================================================

supabaseClient.auth.onAuthStateChange(

    (event, session) => {

        console.log(
            "Evento de autenticação:",
            event
        );


        atualizarMenuAuth(session);

    }

);


// =========================================================
// FUNÇÃO: EFEITO DE FUNDO MATRIX (EXPANDIDO)
// =========================================================

function iniciarFundoMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", {
    alpha: true
  });

  if (!ctx) return;

  // Renderiza em resolução reduzida no telemóvel/celular.
  const scale = window.innerWidth < 768 ? 0.6 : 1;
  const fontSize = 14 * scale;

  const characters = Array.from(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
    "☉☽☿♀♂♃♄♅♆♇∞∑∫√" +
    "←↑→↓↔±×÷≠≈≤≥" +
    "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ" +
    "अआइईउऊऋएऐओऔकखगघचछजझटठडढतथदधनपफबभमयरलवशषसह" +
    "אבגדהוזחטיכלמנסעפצקרשת"
  );

  let columns = 0;
  let drops = [];
  let timer = null;

  function resizeCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);

    columns = Math.ceil(canvas.width / fontSize);
    drops = Array.from(
      { length: columns },
      () => 1
    );
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(44, 44, 44, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ccffcc";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
      const text = characters[
        Math.floor(Math.random() * characters.length)
      ];

      ctx.fillText(
        text,
        i * fontSize,
        drops[i] * fontSize
      );

      if (
        drops[i] * fontSize > canvas.height &&
        Math.random() > 0.975
      ) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  function tick() {
    if (document.hidden) {
      timer = null;
      return;
    }

    drawMatrix();

    // Cerca de 12 atualizações por segundo.
    timer = setTimeout(tick, 38);
  }

  function stop() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function start() {
    if (timer === null && !document.hidden) {
      tick();
    }
  }

  function handleResize() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();

  window.addEventListener("resize", handleResize);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  start();
}


// =========================================================
// FUNÇÃO: AÇÃO DE BUSCA
// =========================================================

function realizarBusca(
    input = inputCampo
) {

    const valor =
        input?.value.trim();


    if (valor) {

        window.location.href =
            `${valor}.html`;

    }

    else {

        alert(
            "Campo vazio"
        );

    }

}


// =========================================================
// FUNÇÃO: ALTERNAR MENU
// =========================================================

function alternarMenu() {

    submenu?.classList.toggle(
        "ativo"
    );

}


// =========================================================
// FUNÇÃO AUXILIAR: ABRIR CONTEÚDO COM ANIMAÇÃO
// =========================================================

function abrirConteudo(
    content
) {

    content.style.maxHeight =
        content.scrollHeight + "px";


    content.addEventListener(

        "transitionend",

        () => {

            content.style.maxHeight =
                "none";

        },

        { once: true }

    );

}


// =========================================================
// FUNÇÃO AUXILIAR: FECHAR CONTEÚDO COM ANIMAÇÃO
// =========================================================

function fecharConteudo(
    content
) {

    content.style.maxHeight =
        content.scrollHeight + "px";


    requestAnimationFrame(() => {

        content.style.maxHeight =
            "0";

    });

}


// =========================================================
// FUNÇÃO: CONTROLAR ANIMAÇÃO DOS <details>
// =========================================================

function configurarAnimacoesDetails() {

    document
        .querySelectorAll(
            ".custom-details"
        )
        .forEach(details => {

            const summaryBtn =
                details.querySelector(
                    ".summary-btn"
                );

            const summaryIcon =
                details.querySelector(
                    ".summary_icon"
                );

            const content =
                details.querySelector(
                    ".details-content"
                );


            if (
                !summaryBtn ||
                !content
            ) {

                return;

            }


            content.style.maxHeight =
                "0";


            summaryBtn.addEventListener(

                "click",

                () => {

                    const isOpen =
                        details.classList.contains(
                            "open"
                        );


                    if (isOpen) {

                        fecharConteudo(
                            content
                        );


                        details.classList.remove(
                            "open"
                        );


                        summaryIcon?.classList.remove(
                            "ativo"
                        );

                    }

                    else {

                        abrirConteudo(
                            content
                        );


                        details.classList.add(
                            "open"
                        );


                        summaryIcon?.classList.add(
                            "ativo"
                        );

                    }

                }

            );

        });

}


// =========================================================
// FUNÇÃO: TROCAR IDIOMA DA PÁGINA
// =========================================================

function trocarIdioma(
    lang
) {

    fetch(
        `json/${lang}.json`
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Arquivo de idioma não encontrado"
                );

            }


            return response.json();

        })

        .then(data => {

            document
                .querySelectorAll(
                    "[data-i18n]"
                )
                .forEach(el => {

                    const chave =
                        el.getAttribute(
                            "data-i18n"
                        );


                    if (data[chave]) {

                        el.textContent =
                            data[chave];

                    }

                });


            localStorage.setItem(
                "lang",
                lang
            );

        })

        .catch(err => {

            console.error(
                "Erro ao carregar idioma:",
                err
            );

        });

}


// =========================================================
// EVENTO: MENU
// =========================================================

menuToggle?.addEventListener(

    "click",

    alternarMenu

);


// =========================================================
// EVENTO: IDIOMA
// =========================================================

languageSelector?.addEventListener(

    "change",

    () => {

        trocarIdioma(
            languageSelector.value
        );

    }

);


// =========================================================
// EVENTO DE TECLA: .Camp_code INPUT
// =========================================================

inputCampCode?.addEventListener(

    "keydown",

    e => {

        if (e.key === "Enter") {

            realizarBusca(
                inputCampCode
            );

        }

    }

);


// =========================================================
// EVENTO DE TECLA: INPUT ORIGINAL search_camp
// =========================================================

inputCampo?.addEventListener(

    "keydown",

    e => {

        if (e.key === "Enter") {

            realizarBusca(
                inputCampo
            );

        }

    }

);

// =========================================================
// EVENTO: CLIQUE NAS BANDEIRAS DE IDIOMA
// =========================================================

document.querySelectorAll(".Band_pas").forEach(bandeira => {
    bandeira.addEventListener("click", () => {
        const lang = bandeira.getAttribute("data-lang");
        
        if (lang) {
            trocarIdioma(lang);
            console.log(`Idioma alterado para: ${lang}`);
        }
    });
});


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        // ===============================================
        // INICIALIZAR EFEITO MATRIX NO FUNDO
        // ===============================================

        iniciarFundoMatrix();


        // ===============================================
        // ANIMAÇÕES
        // ===============================================

        configurarAnimacoesDetails();


        // ===============================================
        // VERIFICAR LOGIN
        // ===============================================

        verificarSessao();


        // ===============================================
        // IDIOMA
        // ===============================================

        const idiomaSalvo =
            localStorage.getItem(
                "lang"
            ) || "pt-br";


        if (languageSelector) {

            languageSelector.value =
                idiomaSalvo;

        }


        trocarIdioma(
            idiomaSalvo
        );

    }

);