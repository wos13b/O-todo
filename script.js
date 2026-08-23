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
// CONSTANTES DO PERFIL
// =========================================================

const NOME_BUCKET =
  "avatars";

const TAMANHO_MAXIMO_IMAGEM =
  5 * 1024 * 1024;



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

      cadastro.style.display =
        "none";

    }


    // -----------------------------------------------
    // Ocultar Login
    // -----------------------------------------------

    if (login) {

      login.style.display =
        "none";

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

      cadastro.style.display =
        "";

    }


    // -----------------------------------------------
    // Mostrar Login
    // -----------------------------------------------

    if (login) {

      login.style.display =
        "";

    }

  }

}



// =========================================================
// CARREGAR PERFIL
// =========================================================

async function carregarPerfil() {

  // =======================================================
  // PEGAR SESSÃO
  // =======================================================

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();


  // =======================================================
  // SE NÃO ESTIVER LOGADO
  // =======================================================

  if (!session) {

    console.log(
      "Perfil: nenhum usuário logado."
    );

    return;

  }



  // =======================================================
  // USUÁRIO
  // =======================================================

  const user =
    session.user;



  // =======================================================
  // METADADOS
  // =======================================================

  const metadata =
    user.user_metadata || {};



  // =======================================================
  // DADOS DO PERFIL
  // =======================================================

  const nome =
    metadata.nome ||
    "Usuário";


  const nickname =
    metadata.nickname ||
    "nickname";


  const dataNascimento =
    metadata.data_nascimento ||
    "---";



  // =======================================================
  // IMAGEM DO PERFIL
  // =======================================================

  const imagemPerfil =
    metadata.avatar_url ||
    "img/Logo.png";



  // =======================================================
  // CONSOLE
  // =======================================================

  console.log(
    "Nome:",
    nome
  );

  console.log(
    "Nickname:",
    nickname
  );

  console.log(
    "Data de nascimento:",
    dataNascimento
  );

  console.log(
    "Email:",
    user.email
  );

  console.log(
    "ID:",
    user.id
  );

  console.log(
    "Imagem:",
    imagemPerfil
  );



  // =======================================================
  // PERFIL GRANDE
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
      imagemPerfil;

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
      user.email || "---";

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


  const infoNascimento =
    document.getElementById(
      "info-nascimento"
    );



  // =======================================================
  // NOME
  // =======================================================

  if (infoNome) {

    infoNome.textContent =
      nome;

  }



  // =======================================================
  // NICKNAME
  // =======================================================

  if (infoNickname) {

    infoNickname.textContent =
      "@" + nickname;

  }



  // =======================================================
  // EMAIL
  // =======================================================

  if (infoEmail) {

    infoEmail.textContent =
      user.email || "---";

  }



  // =======================================================
  // ID
  // =======================================================

  if (infoId) {

    infoId.textContent =
      user.id;

  }



  // =======================================================
  // DATA DE NASCIMENTO
  // =======================================================

  if (infoNascimento) {

    infoNascimento.textContent =
      dataNascimento;

  }



  // =======================================================
  // LOG_PERF
  // =======================================================

  atualizarLogPerfil(
    imagemPerfil
  );

}



// =========================================================
// ATUALIZAR LOG_PERF
// =========================================================

function atualizarLogPerfil(
  imagem
) {

  const logPerf =
    document.querySelector(
      ".Log_perf"
    );


  if (!logPerf) {

    return;

  }


  // -----------------------------------------------
  // Limpar
  // -----------------------------------------------

  logPerf.innerHTML =
    "";


  // -----------------------------------------------
  // Criar imagem
  // -----------------------------------------------

  const img =
    document.createElement(
      "img"
    );


  img.src =
    imagem;


  img.alt =
    "Perfil";


  // -----------------------------------------------
  // Adicionar
  // -----------------------------------------------

  logPerf.appendChild(
    img
  );

}



// =========================================================
// ABRIR SELETOR DE FOTO
// =========================================================

function abrirSeletorFoto() {

  const input =
    document.getElementById(
      "input-foto-perfil"
    );


  if (!input) {

    console.error(
      "Input de foto não encontrado."
    );

    return;

  }


  input.click();

}



// =========================================================
// VALIDAR IMAGEM
// =========================================================

function validarImagem(
  arquivo
) {

  // =======================================================
  // VERIFICAR TIPO
  // =======================================================

  const tiposPermitidos = [

    "image/jpeg",

    "image/png",

    "image/webp"

  ];


  if (
    !tiposPermitidos.includes(
      arquivo.type
    )
  ) {

    alert(
      "Formato inválido.\n\n" +
      "Escolha uma imagem JPG, PNG ou WebP."
    );

    return false;

  }



  // =======================================================
  // VERIFICAR TAMANHO
  // =======================================================

  if (
    arquivo.size >
    TAMANHO_MAXIMO_IMAGEM
  ) {

    alert(
      "A imagem é muito grande.\n\n" +
      "O tamanho máximo é de 5 MB."
    );

    return false;

  }


  return true;

}



// =========================================================
// OBTER EXTENSÃO
// =========================================================

function obterExtensao(
  arquivo
) {

  const partes =
    arquivo.name.split(".");


  if (
    partes.length < 2
  ) {

    return "jpg";

  }


  return partes
    .pop()
    .toLowerCase();

}



// =========================================================
// ENVIAR FOTO DE PERFIL
// =========================================================

async function enviarFotoPerfil(
  event
) {

  const input =
    event.target;


  const arquivo =
    input.files[0];


  // =======================================================
  // NENHUM ARQUIVO
  // =======================================================

  if (!arquivo) {

    return;

  }



  // =======================================================
  // VALIDAR
  // =======================================================

  if (
    !validarImagem(
      arquivo
    )
  ) {

    input.value =
      "";

    return;

  }



  // =======================================================
  // PEGAR SESSÃO
  // =======================================================

  const {
    data: { session }
  } = await supabaseClient.auth.getSession();


  if (!session) {

    alert(
      "Você precisa estar logado para alterar sua foto."
    );

    input.value =
      "";

    return;

  }



  // =======================================================
  // USUÁRIO
  // =======================================================

  const user =
    session.user;


  console.log(
    "Enviando foto para:",
    user.id
  );



  // =======================================================
  // EXTENSÃO
  // =======================================================

  const extensao =
    obterExtensao(
      arquivo
    );



  // =======================================================
  // CAMINHO DO ARQUIVO
  // =======================================================

  const caminho =
    `perfis/${user.id}.${extensao}`;



  // =======================================================
  // MOSTRAR CARREGAMENTO
  // =======================================================

  const imagem =
    document.getElementById(
      "perfil-imagem"
    );


  const imagemAnterior =
    imagem?.src;


  if (imagem) {

    imagem.style.opacity =
      "0.5";

  }



  try {

    // =====================================================
    // VERIFICAR IMAGEM ANTIGA
    // =====================================================

    const metadata =
      user.user_metadata || {};


    const imagemAntiga =
      metadata.avatar_url;



    // =====================================================
    // ENVIAR PARA STORAGE
    // =====================================================

    const {
      error: uploadError
    } =
      await supabaseClient
        .storage
        .from(
          NOME_BUCKET
        )
        .upload(

          caminho,

          arquivo,

          {

            upsert: true,

            contentType:
              arquivo.type,

            cacheControl:
              "3600"

          }

        );



    // =====================================================
    // ERRO NO UPLOAD
    // =====================================================

    if (uploadError) {

      throw uploadError;

    }



    // =====================================================
    // PEGAR URL PÚBLICA
    // =====================================================

    const {
      data: publicData
    } =
      supabaseClient
        .storage
        .from(
          NOME_BUCKET
        )
        .getPublicUrl(
          caminho
        );


    const urlImagem =
      publicData.publicUrl;



    // =====================================================
    // ADICIONAR CACHE-BUSTER
    //
    // Evita que o navegador continue mostrando
    // uma versão antiga da imagem.
    // =====================================================

    const urlAtualizada =
      urlImagem +
      "?t=" +
      Date.now();



    // =====================================================
    // SALVAR URL NO USER_METADATA
    // =====================================================

    const {
      data: updateData,

      error: updateError

    } =
      await supabaseClient
        .auth
        .updateUser({

          data: {

            avatar_url:
              urlImagem

          }

        });



    // =====================================================
    // ERRO AO SALVAR
    // =====================================================

    if (updateError) {

      throw updateError;

    }



    // =====================================================
    // ATUALIZAR IMAGEM GRANDE
    // =====================================================

    if (imagem) {

      imagem.src =
        urlAtualizada;

      imagem.style.opacity =
        "1";

    }



    // =====================================================
    // ATUALIZAR LOG_PERF
    // =====================================================

    atualizarLogPerfil(
      urlAtualizada
    );



    // =====================================================
    // ATUALIZAR CACHE DA SESSÃO
    // =====================================================

    if (
      updateData &&
      updateData.user
    ) {

      console.log(
        "Perfil atualizado:",
        updateData.user
      );

    }



    // =====================================================
    // REMOVER IMAGEM ANTIGA
    //
    // Somente se ela estiver dentro do nosso bucket.
    // =====================================================

    if (
      imagemAntiga &&
      imagemAntiga.includes(
        `/storage/v1/object/public/${NOME_BUCKET}/`
      )
    ) {

      try {

        const parteCaminho =
          imagemAntiga.split(
            `/storage/v1/object/public/${NOME_BUCKET}/`
          )[1];


        if (parteCaminho) {

          await supabaseClient
            .storage
            .from(
              NOME_BUCKET
            )
            .remove([
              parteCaminho
            ]);

        }

      }

      catch (erroRemocao) {

        console.warn(
          "Não foi possível remover a imagem antiga:",
          erroRemocao
        );

      }

    }



    // =====================================================
    // SUCESSO
    // =====================================================

    console.log(
      "Foto de perfil atualizada."
    );


  }

  catch (error) {

    console.error(
      "Erro ao alterar foto:",
      error
    );


    // =====================================================
    // RESTAURAR IMAGEM ANTERIOR
    // =====================================================

    if (imagem) {

      imagem.src =
        imagemAnterior;

      imagem.style.opacity =
        "1";

    }


    // =====================================================
    // MENSAGEM
    // =====================================================

    alert(
      "Não foi possível alterar a foto.\n\n" +
      error.message
    );

  }



  // =======================================================
  // LIMPAR INPUT
  // =======================================================

  input.value =
    "";

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
// EVENTO:
// CLICAR NA IMAGEM DO PERFIL
// =========================================================

const perfilImagemContainer =
  document.getElementById(
    "perfil-imagem-container"
  );


perfilImagemContainer?.addEventListener(

  "click",

  abrirSeletorFoto

);



// =========================================================
// EVENTO:
// ESCOLHER FOTO
// =========================================================

const inputFotoPerfil =
  document.getElementById(
    "input-foto-perfil"
  );


inputFotoPerfil?.addEventListener(

  "change",

  enviarFotoPerfil

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
    // CARREGAR PERFIL
    // ===============================================

    carregarPerfil();


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