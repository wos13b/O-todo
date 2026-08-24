// =========================================================
// PROFILE.JS
// =========================================================
// Todas as funções relacionadas ao perfil do usuário
// =========================================================


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
// CARREGAR PERFIL
// =========================================================

async function carregarPerfil() {

    // -----------------------------------------------------
    // PEGAR SESSÃO
    // -----------------------------------------------------

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    // -----------------------------------------------------
    // SE NÃO ESTIVER LOGADO
    // -----------------------------------------------------

    if (!session) {

        console.log(
            "Perfil: nenhum usuário logado."
        );

        return;
    }


    // -----------------------------------------------------
    // USUÁRIO
    // -----------------------------------------------------

    const user =
        session.user;


    // -----------------------------------------------------
    // METADADOS
    // -----------------------------------------------------

    const metadata =
        user.user_metadata || {};


    // -----------------------------------------------------
    // DADOS DO PERFIL
    // -----------------------------------------------------

    const nome =
        metadata.nome ||
        "Usuário";

    const nickname =
        metadata.nickname ||
        "nickname";

    const dataNascimento =
        metadata.data_nascimento ||
        "---";


    // -----------------------------------------------------
    // IMAGEM DO PERFIL
    // -----------------------------------------------------

    const imagemPerfil =
        metadata.avatar_url ||
        "img/Logo.png";


    // -----------------------------------------------------
    // CONSOLE
    // -----------------------------------------------------

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


    // =====================================================
    // PERFIL GRANDE
    // =====================================================

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


    // -----------------------------------------------------
    // IMAGEM
    // -----------------------------------------------------

    if (perfilImagem) {

        perfilImagem.src =
            imagemPerfil;
    }


    // -----------------------------------------------------
    // NOME
    // -----------------------------------------------------

    if (perfilNome) {

        perfilNome.textContent =
            nome;
    }


    // -----------------------------------------------------
    // NICKNAME
    // -----------------------------------------------------

    if (perfilNickname) {

        perfilNickname.textContent =
            "@" + nickname;
    }


    // -----------------------------------------------------
    // EMAIL
    // -----------------------------------------------------

    if (perfilEmail) {

        perfilEmail.textContent =
            user.email || "---";
    }


    // =====================================================
    // INFORMAÇÕES DO PERFIL
    // =====================================================

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


    // -----------------------------------------------------
    // NOME
    // -----------------------------------------------------

    if (infoNome) {

        infoNome.textContent =
            nome;
    }


    // -----------------------------------------------------
    // NICKNAME
    // -----------------------------------------------------

    if (infoNickname) {

        infoNickname.textContent =
            "@" + nickname;
    }


    // -----------------------------------------------------
    // EMAIL
    // -----------------------------------------------------

    if (infoEmail) {

        infoEmail.textContent =
            user.email || "---";
    }


    // -----------------------------------------------------
    // ID
    // -----------------------------------------------------

    if (infoId) {

        infoId.textContent =
            user.id;
    }


    // -----------------------------------------------------
    // DATA DE NASCIMENTO
    // -----------------------------------------------------

    if (infoNascimento) {

        infoNascimento.textContent =
            dataNascimento;
    }


    // -----------------------------------------------------
    // LOG_PERF
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // LIMPAR
    // -----------------------------------------------------

    logPerf.innerHTML =
        "";


    // -----------------------------------------------------
    // CRIAR IMAGEM
    // -----------------------------------------------------

    const img =
        document.createElement(
            "img"
        );


    img.src =
        imagem;

    img.alt =
        "Perfil";


    // -----------------------------------------------------
    // ADICIONAR
    // -----------------------------------------------------

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

    const tiposPermitidos = [

        "image/jpeg",
        "image/png",
        "image/webp"

    ];


    // -----------------------------------------------------
    // TIPO
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // TAMANHO
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // NENHUM ARQUIVO
    // -----------------------------------------------------

    if (!arquivo) {

        return;
    }


    // -----------------------------------------------------
    // VALIDAR
    // -----------------------------------------------------

    if (
        !validarImagem(
            arquivo
        )
    ) {

        input.value =
            "";

        return;
    }


    // -----------------------------------------------------
    // PEGAR SESSÃO
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // USUÁRIO
    // -----------------------------------------------------

    const user =
        session.user;


    console.log(
        "Enviando foto para:",
        user.id
    );


    // -----------------------------------------------------
    // EXTENSÃO
    // -----------------------------------------------------

    const extensao =
        obterExtensao(
            arquivo
        );


    // -----------------------------------------------------
    // CAMINHO
    // -----------------------------------------------------

    const caminho =
        `perfis/${user.id}.${extensao}`;


    // -----------------------------------------------------
    // IMAGEM ATUAL
    // -----------------------------------------------------

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

        // =================================================
        // IMAGEM ANTIGA
        // =================================================

        const metadata =
            user.user_metadata || {};

        const imagemAntiga =
            metadata.avatar_url;


        // =================================================
        // UPLOAD
        // =================================================

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


        // -------------------------------------------------
        // ERRO
        // -------------------------------------------------

        if (uploadError) {

            throw uploadError;
        }


        // =================================================
        // URL PÚBLICA
        // =================================================

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


        // -------------------------------------------------
        // CACHE BUSTER
        // -------------------------------------------------

        const urlAtualizada =
            urlImagem +
            "?t=" +
            Date.now();


        // =================================================
        // SALVAR NO USER_METADATA
        // =================================================

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


        // -------------------------------------------------
        // ERRO
        // -------------------------------------------------

        if (updateError) {

            throw updateError;
        }


        // =================================================
        // ATUALIZAR IMAGEM
        // =================================================

        if (imagem) {

            imagem.src =
                urlAtualizada;

            imagem.style.opacity =
                "1";
        }


        // =================================================
        // ATUALIZAR LOG_PERF
        // =================================================

        atualizarLogPerfil(
            urlAtualizada
        );


        // =================================================
        // CACHE DA SESSÃO
        // =================================================

        if (
            updateData &&
            updateData.user
        ) {

            console.log(
                "Perfil atualizado:",
                updateData.user
            );
        }


        // =================================================
        // REMOVER IMAGEM ANTIGA
        // =================================================

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


        // =================================================
        // SUCESSO
        // =================================================

        console.log(
            "Foto de perfil atualizada."
        );

    }

    catch (error) {

        console.error(
            "Erro ao alterar foto:",
            error
        );


        // -------------------------------------------------
        // RESTAURAR
        // -------------------------------------------------

        if (imagem) {

            imagem.src =
                imagemAnterior;

            imagem.style.opacity =
                "1";
        }


        alert(
            "Não foi possível alterar a foto.\n\n" +
            error.message
        );
    }


    // -----------------------------------------------------
    // LIMPAR INPUT
    // -----------------------------------------------------

    input.value =
        "";
}


// =========================================================
// EVENTO: CLICAR NA IMAGEM
// =========================================================

function configurarPerfil() {

    const perfilImagemContainer =
        document.getElementById(
            "perfil-imagem-container"
        );


    perfilImagemContainer?.addEventListener(
        "click",
        abrirSeletorFoto
    );


    // =====================================================
    // EVENTO: ESCOLHER FOTO
    // =====================================================

    const inputFotoPerfil =
        document.getElementById(
            "input-foto-perfil"
        );


    inputFotoPerfil?.addEventListener(
        "change",
        enviarFotoPerfil
    );
}


// =========================================================
// INICIALIZAÇÃO DO PERFIL
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarPerfil();

        configurarPerfil();

    }
);