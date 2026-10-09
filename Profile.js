// =========================================================
// PROFILE.JS (Com suporte total a quebras de linha na Bio)
// =========================================================

const NOME_BUCKET = "avatars";
const TAMANHO_MAXIMO_IMAGEM = 5 * 1024 * 1024;


// =========================================================
// CARREGAR PERFIL
// =========================================================

async function carregarPerfil() {
    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        console.log("Perfil: nenhum usuário logado.");
        return;
    }

    const user = session.user;
    const metadata = user.user_metadata || {};

    const nome = metadata.nome || "Usuário";
    const nickname = metadata.nickname || "nickname";
    const dataNascimento = metadata.data_nascimento || "---";
    const bio = metadata.bio || "Escreva algo sobre ti";
    const imagemPerfil = metadata.avatar_url || "img/Logo.png";

    // Elementos visuais principais
    const perfilImagem = document.getElementById("perfil-imagem");
    const perfilNome = document.getElementById("perfil-nome");
    const perfilNickname = document.getElementById("perfil-nickname");
    const perfilEmail = document.getElementById("perfil-email");
    const perfilBio = document.getElementById("perfil-bio");

    if (perfilImagem) perfilImagem.src = imagemPerfil;
    if (perfilNome) perfilNome.textContent = nome;
    if (perfilNickname) perfilNickname.textContent = "@" + nickname;
    if (perfilEmail) perfilEmail.textContent = user.email || "---";
    
    if (perfilBio) {
        perfilBio.textContent = bio;
        perfilBio.style.whiteSpace = "pre-line"; 
    }

    // Informações detalhadas
    const infoNome = document.getElementById("info-nome");
    const infoNickname = document.getElementById("info-nickname");
    const infoEmail = document.getElementById("info-email");
    const infoId = document.getElementById("info-id");
    const infoNascimento = document.getElementById("info-nascimento");
    const infoBio = document.getElementById("info-bio");

    if (infoNome) infoNome.textContent = nome;
    if (infoNickname) infoNickname.textContent = "@" + nickname;
    if (infoEmail) infoEmail.textContent = user.email || "---";
    if (infoId) infoId.textContent = user.id;
    if (infoNascimento) infoNascimento.textContent = dataNascimento;
    
    if (infoBio) {
        infoBio.textContent = bio;
        infoBio.style.whiteSpace = "pre-line";
    }

    atualizarLogPerfil(imagemPerfil);
}


// =========================================================
// ATUALIZAR LOG_PERF
// =========================================================

function atualizarLogPerfil(imagem) {
    const logPerf = document.querySelector(".Log_perf");
    if (!logPerf) return;

    logPerf.innerHTML = "";
    const img = document.createElement("img");
    img.src = imagem;
    img.alt = "Perfil";
    logPerf.appendChild(img);
}


// =========================================================
// ABRIR SELETOR DE FOTO
// =========================================================

function abrirSeletorFoto() {
    const input = document.getElementById("input-foto-perfil");
    if (!input) {
        console.error("Input de foto não encontrado.");
        return;
    }
    input.click();
}


// =========================================================
// VALIDAR IMAGEM
// =========================================================

function validarImagem(arquivo) {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposPermitidos.includes(arquivo.type)) {
        alert("Formato inválido.\n\nEscolha uma imagem JPG, PNG ou WebP.");
        return false;
    }

    if (arquivo.size > TAMANHO_MAXIMO_IMAGEM) {
        alert("A imagem é muito grande.\n\nO tamanho máximo é de 5 MB.");
        return false;
    }

    return true;
}


// =========================================================
// OBTER EXTENSÃO
// =========================================================

function obterExtensao(arquivo) {
    const partes = arquivo.name.split(".");
    if (partes.length < 2) return "jpg";
    return partes.pop().toLowerCase();
}


// =========================================================
// ENVIAR FOTO DE PERFIL
// =========================================================

async function enviarFotoPerfil(event) {
    const input = event.target;
    const arquivo = input.files[0];
    if (!arquivo) return;

    if (!validarImagem(arquivo)) {
        input.value = "";
        return;
    }

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        alert("Você precisa estar logado para alterar sua foto.");
        input.value = "";
        return;
    }

    const user = session.user;
    const extensao = obterExtensao(arquivo);
    const caminho = `perfis/${user.id}.${Date.now()}.${extensao}`;
    const imagem = document.getElementById("perfil-imagem");
    const imagemAnterior = imagem?.src;

    if (imagem) imagem.style.opacity = "0.5";

    try {
        const metadata = user.user_metadata || {};
        const imagemAntiga = metadata.avatar_url;

        const { error: uploadError } = await supabaseClient.storage
            .from(NOME_BUCKET)
            .upload(caminho, arquivo, { contentType: arquivo.type, cacheControl: "3600" });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabaseClient.storage
            .from(NOME_BUCKET)
            .getPublicUrl(caminho);

        const urlImagem = publicData.publicUrl;
        const urlAtualizada = urlImagem + "?t=" + Date.now();

        const { error: updateError } = await supabaseClient.auth.updateUser({
            data: { avatar_url: urlImagem }
        });

        if (updateError) throw updateError;

        if (imagem) {
            imagem.src = urlAtualizada;
            imagem.style.opacity = "1";
        }

        atualizarLogPerfil(urlAtualizada);

        if (imagemAntiga && imagemAntiga.includes(`/storage/v1/object/public/${NOME_BUCKET}/`)) {
            try {
                const parteCaminho = imagemAntiga.split(`/storage/v1/object/public/${NOME_BUCKET}/`)[1];
                if (parteCaminho) {
                    await supabaseClient.storage.from(NOME_BUCKET).remove([parteCaminho]);
                }
            } catch (erroRemocao) {
                console.warn("Não foi possível remover a imagem antiga:", erroRemocao);
            }
        }

        console.log("Foto de perfil atualizada.");
    } catch (error) {
        console.error("Erro ao alterar foto:", error);
        if (imagem) {
            imagem.src = imagemAnterior;
            imagem.style.opacity = "1";
        }
        alert("Não foi possível alterar a foto.\n\n" + error.message);
    }

    input.value = "";
}


// =========================================================
// EDITAR PERFIL
// =========================================================

async function editarPerfil() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        alert("Você precisa estar logado para editar o perfil.");
        return;
    }

    const user = session.user;
    const metadata = user.user_metadata || {};

    const nomeAtual = metadata.nome || "";
    const nicknameAtual = metadata.nickname || "";
    const nascimentoAtual = metadata.data_nascimento || "";
    const bioAtual = metadata.bio || "";

    const infoNome = document.getElementById("info-nome");
    const infoNickname = document.getElementById("info-nickname");
    const infoNascimento = document.getElementById("info-nascimento");
    const infoBio = document.getElementById("info-bio");

    if (document.getElementById("editar-nome")) return;

    if (infoNome) {
        infoNome.innerHTML = `<input type="text" id="editar-nome" value="${escapeHtml(nomeAtual)}" placeholder="Digite seu nome">`;
    }

    if (infoNickname) {
        infoNickname.innerHTML = `<input type="text" id="editar-nickname" value="${escapeHtml(nicknameAtual)}" placeholder="Digite seu nickname">`;
    }

    if (infoNascimento) {
        infoNascimento.innerHTML = `<input type="date" id="editar-nascimento" value="${escapeHtml(nascimentoAtual)}">`;
    }

    if (infoBio) {
        infoBio.innerHTML = `<textarea id="editar-bio" rows="4" placeholder="Escreve algo sobre ti...">${escapeHtml(bioAtual)}</textarea>`;
    }

    const botaoEditar = document.getElementById("editar-perfil");
    if (botaoEditar) {
        botaoEditar.textContent = "Salvar";
        botaoEditar.onclick = salvarPerfil;
    }

    let botaoCancelar = document.getElementById("cancelar-edicao");
    if (!botaoCancelar) {
        botaoCancelar = document.createElement("button");
        botaoCancelar.type = "button";
        botaoCancelar.id = "cancelar-edicao";
        botaoCancelar.textContent = "Cancelar";

        const titulo = document.querySelector(".Perfil_info_titulo");
        if (titulo) {
            titulo.appendChild(botaoCancelar);
        }
    }

    botaoCancelar.onclick = cancelarEdicaoPerfil;
}


// =========================================================
// ESCAPAR HTML
// =========================================================

function escapeHtml(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================================================
// SALVAR PERFIL
// =========================================================

async function salvarPerfil() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        alert("Você precisa estar logado.");
        return;
    }

    const campoNome = document.getElementById("editar-nome");
    const campoNickname = document.getElementById("editar-nickname");
    const campoNascimento = document.getElementById("editar-nascimento");
    const campoBio = document.getElementById("editar-bio");

    const nome = campoNome?.value.trim();
    const nickname = campoNickname?.value.trim();
    const dataNascimento = campoNascimento?.value;
    const bio = campoBio?.value || ""; // Mantém as quebras de linha intactas

    if (!nome) {
        alert("Digite seu nome.");
        return;
    }

    if (!nickname) {
        alert("Digite seu nickname.");
        return;
    }

    const botaoEditar = document.getElementById("editar-perfil");
    if (botaoEditar) {
        botaoEditar.disabled = true;
        botaoEditar.textContent = "Salvando...";
    }

    try {
        const { data, error } = await supabaseClient.auth.updateUser({
            data: {
                nome: nome,
                nickname: nickname,
                data_nascimento: dataNascimento,
                bio: bio
            }
        });

        if (error) throw error;

        await carregarPerfil();
        removerModoEdicao();
        alert("Perfil atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar perfil:", error);
        alert("Não foi possível salvar o perfil.\n\n" + error.message);
        if (botaoEditar) {
            botaoEditar.disabled = false;
            botaoEditar.textContent = "Salvar";
        }
    }
}


// =========================================================
// CANCELAR EDIÇÃO
// =========================================================

async function cancelarEdicaoPerfil() {
    await carregarPerfil();
    removerModoEdicao();
}


// =========================================================
// REMOVER MODO DE EDIÇÃO
// =========================================================

function removerModoEdicao() {
    const botaoEditar = document.getElementById("editar-perfil");
    const botaoCancelar = document.getElementById("cancelar-edicao");

    if (botaoCancelar) botaoCancelar.remove();

    if (botaoEditar) {
        botaoEditar.disabled = false;
        botaoEditar.textContent = "Editar perfil";
        botaoEditar.onclick = editarPerfil;
    }
}


// =========================================================
// TERMINAR SESSÃO (LOGOUT)
// =========================================================

async function terminarSessao() {
    const confirmar = confirm("Tens a certeza de que pretendes terminar sessão?");
    if (!confirmar) return;

    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        alert("Erro ao terminar sessão: " + error.message);
        return;
    }

    window.location.href = "log.html";
}


// =========================================================
// CONFIGURAR PERFIL
// =========================================================

function configurarPerfil() {
    const perfilImagemContainer = document.getElementById("perfil-imagem-container");
    if (perfilImagemContainer) {
        perfilImagemContainer.addEventListener("click", abrirSeletorFoto);
    }

    const inputFotoPerfil = document.getElementById("input-foto-perfil");
    if (inputFotoPerfil) {
        inputFotoPerfil.addEventListener("change", enviarFotoPerfil);
    }

    const botaoEditar = document.getElementById("editar-perfil");
    if (botaoEditar) {
        botaoEditar.onclick = editarPerfil;
    }

    const botaoLogout = document.getElementById("btn-logout");
    if (botaoLogout) {
        botaoLogout.addEventListener("click", terminarSessao);
    }
}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    carregarPerfil();
    configurarPerfil();
});