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
// VERIFICAR SESSÃO DO USUÁRIO
// =========================================================

async function verificarSessao() {

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();


  // =======================================================
  // ELEMENTOS DO MENU
  // =======================================================

  const cadastro =
    document.querySelector("#nav-cadastro");

  const login =
    document.querySelector("#nav-login");


  // =======================================================
  // USUÁRIO LOGADO
  // =======================================================

  if (session) {

    console.log(
      "Usuário logado:",
      session.user
    );


    // -----------------------------------------------
    // Ocultar Cadastro
    // -----------------------------------------------

    if (cadastro) {

      cadastro.style.display = "none";

    }


    // -----------------------------------------------
    // Ocultar Login
    // -----------------------------------------------

    if (login) {

      login.style.display = "none";

    }

  }


  // =======================================================
  // USUÁRIO NÃO LOGADO
  // =======================================================

  else {

    console.log(
      "Nenhum usuário logado."
    );


    // -----------------------------------------------
    // Mostrar Cadastro
    // -----------------------------------------------

    if (cadastro) {

      cadastro.style.display = "";

    }


    // -----------------------------------------------
    // Mostrar Login
    // -----------------------------------------------

    if (login) {

      login.style.display = "";

    }

  }

}



// =========================================================
// CARREGAR PERFIL DO USUÁRIO
// =========================================================

async function carregarPerfil() {

  // =======================================================
  // PEGAR SESSÃO
  // =======================================================

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();


  // =======================================================
  // USUÁRIO NÃO LOGADO
  // =======================================================

  if (!session) {

    console.log(
      "Perfil: nenhum usuário logado."
    );

    return;

  }


  // =======================================================
  // OBJETO DO USUÁRIO
  // =======================================================

  const user =
    session.user;


  console.log(
    "Dados do perfil:",
    user
  );


  // =======================================================
  // METADADOS
  // =======================================================

  const metadata =
    user.user_metadata || {};


  // =======================================================
  // NOME
  // =======================================================

  const nome =
    metadata.nome ||
    metadata.name ||
    "Usuário";


  // =======================================================
  // NICKNAME
  // =======================================================

  const nickname =
    metadata.nickname ||
    metadata.user_name ||
    metadata.username ||
    "nickname";


  // =======================================================
  // IMAGEM
  // =======================================================

  const imagem =
    metadata.avatar_url ||
    metadata.picture ||
    "img/Logo.png";



  // =======================================================
  // ELEMENTOS DA ÁREA GRANDE DO PERFIL
  // =======================================================

  const perfilImagem =
    document.getElementById(
      "perfil-imagem"
    );

  const perfilNome =
    document.getElementById(
      "perfil-nome"
    );

  const perfilNickname =
    document.getElementById(
      "perfil-nickname"
    );

  const perfilEmail =
    document.getElementById(
      "perfil-email"
    );



  // =======================================================
  // IMAGEM GRANDE
  // =======================================================

  if (perfilImagem) {

    perfilImagem.src =
      imagem;

  }



  // =======================================================
  // NOME
  // =======================================================

  if (perfilNome) {

    perfilNome.textContent =
      nome;

  }



  // =======================================================
  // NICKNAME
  // =======================================================

  if (perfilNickname) {

    perfilNickname.textContent =
      "@" + nickname;

  }



  // =======================================================
  // EMAIL
  // =======================================================

  if (perfilEmail) {

    perfilEmail.textContent =
      user.email || "";

  }



  // =======================================================
  // INFORMAÇÕES DO PERFIL
  // =======================================================

  const infoNome =
    document.getElementById(
      "info-nome"
    );

  const infoNickname =
    document.getElementById(
      "info-nickname"
    );

  const infoEmail =
    document.getElementById(
      "info-email"
    );

  const infoId =
    document.getElementById(
      "info-id"
    );



  // =======================================================
  // INFORMAÇÃO: NOME
  // =======================================================

  if (infoNome) {

    infoNome.textContent =
      nome;

  }



  // =======================================================
  // INFORMAÇÃO: NICKNAME
  // =======================================================

  if (infoNickname) {

    infoNickname.textContent =
      "@" + nickname;

  }



  // =======================================================
  // INFORMAÇÃO: EMAIL
  // =======================================================

  if (infoEmail) {

    infoEmail.textContent =
      user.email || "---";

  }



  // =======================================================
  // INFORMAÇÃO: ID
  // =======================================================

  if (infoId) {

    infoId.textContent =
      user.id;

  }



  // =======================================================
  // LOG_PERF
  // =======================================================

  const logPerf =
    document.querySelector(
      ".Log_perf"
    );


  if (logPerf) {

    // Limpa o conteúdo atual

    logPerf.innerHTML = "";


    // Cria imagem

    const img =
      document.createElement(
        "img"
      );


    img.src =
      imagem;


    img.alt =
      "Perfil";


    // Coloca a imagem dentro do Log_perf

    logPerf.appendChild(
      img
    );

  }

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


          // =============================================
          // FECHAR
          // =============================================

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


          // =============================================
          // ABRIR
          // =============================================

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


    // ===================================================
    // ANIMAÇÕES
    // ===================================================

    configurarAnimacoesDetails();


    // ===================================================
    // VERIFICAR LOGIN
    // ===================================================

    verificarSessao();


    // ===================================================
    // CARREGAR PERFIL
    // ===================================================

    carregarPerfil();


    // ===================================================
    // IDIOMA
    // ===================================================

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