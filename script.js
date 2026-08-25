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
//
// Esta parte é importante.
//
// Quando o usuário:
// - faz login
// - faz logout
// - recupera uma sessão
// - muda o estado da autenticação
//
// o menu será atualizado automaticamente.
//

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
// FUNÇÃO AUXILIAR:
// ABRE O CONTEÚDO COM ANIMAÇÃO
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
// FUNÇÃO AUXILIAR:
// FECHA O CONTEÚDO COM ANIMAÇÃO
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
// FUNÇÃO:
// CONTROLAR ANIMAÇÃO DOS <details>
// PERSONALIZADOS
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


            // =================================================
            // VERIFICAR ELEMENTOS
            // =================================================

            if (
                !summaryBtn ||
                !content
            ) {

                return;

            }


            // =================================================
            // CONTEÚDO COMEÇA FECHADO
            // =================================================

            content.style.maxHeight =
                "0";


            // =================================================
            // CLIQUE
            // =================================================

            summaryBtn.addEventListener(

                "click",

                () => {

                    const isOpen =
                        details.classList.contains(
                            "open"
                        );


                    // =========================================
                    // FECHAR
                    // =========================================

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


                    // =========================================
                    // ABRIR
                    // =========================================

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
// FUNÇÃO:
// TROCAR IDIOMA DA PÁGINA
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
// EVENTO DE TECLA:
// .Camp_code INPUT
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
// EVENTO DE TECLA:
// INPUT ORIGINAL search_camp
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
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

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