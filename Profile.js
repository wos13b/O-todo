// =========================================================
// PROFILE.JS
// =========================================================
// Todas as funções relacionadas ao perfil do usuário
// =========================================================


// =========================================================
// CONSTANTES DO PERFIL
// =========================================================

const NOME_BUCKET = "avatars";

const TAMANHO_MAXIMO_IMAGEM =
    5 * 1024 * 1024;


// =========================================================
// CARREGAR PERFIL
// =========================================================

async function carregarPerfil() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    if (!session) {

        console.log(
            "Perfil: nenhum usuário logado."
        );

        return;
    }


    const user =
        session.user;


    const metadata =
        user.user_metadata || {};


    // =====================================================
    // DADOS DO PERFIL
    // =====================================================

    const nome =
        metadata.nome ||
        "Usuário";


    const nickname =
        metadata.nickname ||
        "nickname";


    const dataNascimento =
        metadata.data_nascimento ||
        "---";


    // =====================================================
    // IMAGEM DO PERFIL
    // =====================================================

    const imagemPerfil =
        metadata.avatar_url ||
        "img/Logo.png";


    // =====================================================
    // CONSOLE
    // =====================================================

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
    // ELEMENTOS DO PERFIL
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


    // =====================================================
    // IMAGEM GRANDE
    // =====================================================

    if (perfilImagem) {

        perfilImagem.src =
            imagemPerfil;
    }


    // =====================================================
    // NOME
    // =====================================================

    if (perfilNome) {

        perfilNome.textContent =
            nome;
    }


    // =====================================================
    // NICKNAME
    // =====================================================

    if (perfilNickname) {

        perfilNickname.textContent =
            "@" + nickname;
    }


    // =====================================================
    // EMAIL
    // =====================================================

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


    // =====================================================
    // NOME
    // =====================================================

    if (infoNome) {

        infoNome.textContent =
            nome;
    }


    // =====================================================
    // NICKNAME
    // =====================================================

    if (infoNickname) {

        infoNickname.textContent =
            "@" + nickname;
    }


    // =====================================================
    // EMAIL
    // =====================================================

    if (infoEmail) {

        infoEmail.textContent =
            user.email || "---";
    }


    // =====================================================
    // ID
    // =====================================================

    if (infoId) {

        infoId.textContent =
            user.id;
    }


    // =====================================================
    // DATA DE NASCIMENTO
    // =====================================================

    if (infoNascimento) {

        infoNascimento.textContent =
            dataNascimento;
    }


    // =====================================================
    // LOG_PERF
    // =====================================================

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


    logPerf.innerHTML =
        "";


    const img =
        document.createElement(
            "img"
        );


    img.src =
        imagem;


    img.alt =
        "Perfil";


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


    if (!arquivo) {

        return;
    }


    // =====================================================
    // VALIDAR
    // =====================================================

    if (
        !validarImagem(
            arquivo
        )
    ) {

        input.value =
            "";

        return;
    }


    // =====================================================
    // PEGAR SESSÃO
    // =====================================================

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


    const user =
        session.user;


    console.log(
        "Enviando foto para:",
        user.id
    );


    // =====================================================
    // EXTENSÃO
    // =====================================================

    const extensao =
        obterExtensao(
            arquivo
        );


    // =====================================================
    // CAMINHO DA FOTO
    // =====================================================

    const caminho =
        `perfis/${user.id}.${Date.now()}.${extensao}`;


    // =====================================================
    // IMAGEM ATUAL
    // =====================================================

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
                        contentType:
                            arquivo.type,

                        cacheControl:
                            "3600"
                    }
                );


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


        // =================================================
        // CACHE BUSTER
        // =================================================

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


        if (updateError) {

            throw updateError;
        }


        // =================================================
        // ATUALIZAR IMAGEM GRANDE
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
        // CONSOLE
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


        console.log(
            "Foto de perfil atualizada."
        );

    }


    catch (error) {

        console.error(
            "Erro ao alterar foto:",
            error
        );


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


    input.value =
        "";
}


// =========================================================
// EDITAR PERFIL
// =========================================================

async function editarPerfil() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    if (!session) {

        alert(
            "Você precisa estar logado para editar o perfil."
        );

        return;
    }


    const user =
        session.user;


    const metadata =
        user.user_metadata || {};


    // =====================================================
    // VALORES ATUAIS
    // =====================================================

    const nomeAtual =
        metadata.nome || "";


    const nicknameAtual =
        metadata.nickname || "";


    const nascimentoAtual =
        metadata.data_nascimento || "";


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const infoNome =
        document.getElementById(
            "info-nome"
        );


    const infoNickname =
        document.getElementById(
            "info-nickname"
        );


    const infoNascimento =
        document.getElementById(
            "info-nascimento"
        );


    // =====================================================
    // VERIFICAR SE JÁ ESTÁ EDITANDO
    // =====================================================

    if (
        document.getElementById(
            "editar-nome"
        )
    ) {

        return;
    }


    // =====================================================
    // NOME
    // =====================================================

    if (infoNome) {

        infoNome.innerHTML = `

            <input
                type="text"
                id="editar-nome"
                value="${escapeHtml(nomeAtual)}"
                placeholder="Digite seu nome"
            >

        `;
    }


    // =====================================================
    // NICKNAME
    // =====================================================

    if (infoNickname) {

        infoNickname.innerHTML = `

            <input
                type="text"
                id="editar-nickname"
                value="${escapeHtml(nicknameAtual)}"
                placeholder="Digite seu nickname"
            >

        `;
    }


    // =====================================================
    // DATA DE NASCIMENTO
    // =====================================================

    if (infoNascimento) {

        infoNascimento.innerHTML = `

            <input
                type="date"
                id="editar-nascimento"
                value="${escapeHtml(nascimentoAtual)}"
            >

        `;
    }


    // =====================================================
    // EMAIL E ID CONTINUAM SOMENTE LEITURA
    // =====================================================

    // Nada é alterado aqui.
    // O e-mail e o ID permanecem protegidos.


    // =====================================================
    // ALTERAR BOTÃO EDITAR
    // =====================================================

    const botaoEditar =
        document.getElementById(
            "editar-perfil"
        );


    if (botaoEditar) {

        botaoEditar.textContent =
            "Salvar";


        botaoEditar.onclick =
            salvarPerfil;
    }


    // =====================================================
    // CRIAR BOTÃO CANCELAR
    // =====================================================

    let botaoCancelar =
        document.getElementById(
            "cancelar-edicao"
        );


    if (!botaoCancelar) {

        botaoCancelar =
            document.createElement(
                "button"
            );


        botaoCancelar.type =
            "button";


        botaoCancelar.id =
            "cancelar-edicao";


        botaoCancelar.textContent =
            "Cancelar";


        const titulo =
            document.querySelector(
                ".Perfil_info_titulo"
            );


        if (titulo) {

            titulo.appendChild(
                botaoCancelar
            );
        }
    }


    botaoCancelar.onclick =
        cancelarEdicaoPerfil;
}


// =========================================================
// ESCAPAR HTML
// =========================================================

function escapeHtml(
    texto
) {

    return String(texto)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


// =========================================================
// SALVAR PERFIL
// =========================================================

async function salvarPerfil() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    if (!session) {

        alert(
            "Você precisa estar logado."
        );

        return;
    }


    // =====================================================
    // CAMPOS
    // =====================================================

    const campoNome =
        document.getElementById(
            "editar-nome"
        );


    const campoNickname =
        document.getElementById(
            "editar-nickname"
        );


    const campoNascimento =
        document.getElementById(
            "editar-nascimento"
        );


    // =====================================================
    // VALORES
    // =====================================================

    const nome =
        campoNome?.value.trim();


    const nickname =
        campoNickname?.value.trim();


    const dataNascimento =
        campoNascimento?.value;


    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (!nome) {

        alert(
            "Digite seu nome."
        );

        return;
    }


    if (!nickname) {

        alert(
            "Digite seu nickname."
        );

        return;
    }


    // =====================================================
    // BOTÃO
    // =====================================================

    const botaoEditar =
        document.getElementById(
            "editar-perfil"
        );


    if (botaoEditar) {

        botaoEditar.disabled =
            true;

        botaoEditar.textContent =
            "Salvando...";
    }


    try {

        // =================================================
        // ATUALIZAR SUPABASE
        // =================================================

        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .updateUser({

                    data: {

                        nome:
                            nome,

                        nickname:
                            nickname,

                        data_nascimento:
                            dataNascimento

                    }

                });


        if (error) {

            throw error;
        }


        console.log(
            "Perfil atualizado:",
            data.user
        );


        // =================================================
        // ATUALIZAR PÁGINA
        // =================================================

        await carregarPerfil();


        // =================================================
        // ENCERRAR EDIÇÃO
        // =================================================

        removerModoEdicao();


        alert(
            "Perfil atualizado com sucesso!"
        );

    }


    catch (error) {

        console.error(
            "Erro ao salvar perfil:",
            error
        );


        alert(
            "Não foi possível salvar o perfil.\n\n" +
            error.message
        );


        if (botaoEditar) {

            botaoEditar.disabled =
                false;

            botaoEditar.textContent =
                "Salvar";
        }
    }
}


// =========================================================
// CANCELAR EDIÇÃO
// =========================================================

function cancelarEdicaoPerfil() {

    carregarPerfil();

    removerModoEdicao();
}


// =========================================================
// REMOVER MODO DE EDIÇÃO
// =========================================================

function removerModoEdicao() {

    const botaoEditar =
        document.getElementById(
            "editar-perfil"
        );


    const botaoCancelar =
        document.getElementById(
            "cancelar-edicao"
        );


    // =====================================================
    // REMOVER BOTÃO CANCELAR
    // =====================================================

    if (botaoCancelar) {

        botaoCancelar.remove();
    }


    // =====================================================
    // RESTAURAR BOTÃO EDITAR
    // =====================================================

    if (botaoEditar) {

        botaoEditar.disabled =
            false;

        botaoEditar.textContent =
            "Editar perfil";

        botaoEditar.onclick =
            editarPerfil;
    }
}


// =========================================================
// CONFIGURAR PERFIL
// =========================================================

function configurarPerfil() {

    // =====================================================
    // IMAGEM DO PERFIL
    // =====================================================

    const perfilImagemContainer =
        document.getElementById(
            "perfil-imagem-container"
        );


    if (perfilImagemContainer) {

        perfilImagemContainer.addEventListener(
            "click",
            abrirSeletorFoto
        );
    }


    // =====================================================
    // INPUT DA FOTO
    // =====================================================

    const inputFotoPerfil =
        document.getElementById(
            "input-foto-perfil"
        );


    if (inputFotoPerfil) {

        inputFotoPerfil.addEventListener(
            "change",
            enviarFotoPerfil
        );
    }


    // =====================================================
    // BOTÃO EDITAR
    // =====================================================

    const botaoEditar =
        document.getElementById(
            "editar-perfil"
        );


    if (botaoEditar) {

        botaoEditar.addEventListener(
            "click",
            editarPerfil
        );
    }
}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarPerfil();

        configurarPerfil();

    }
);