// Elementos do DOM
const Title_chakras = document.getElementById("Title_chakras");
const chakra_info_list = document.getElementById("chakra_info_list").getElementsByTagName("span");
const somChakraBtn = document.getElementById("btnSom");

// Chakra atualmente selecionado
let chakraSelecionado = null;

// Controle do áudio
let audioAtual = null;

// Dados dos chakras
const chakras = {
    sahasrara: {
        nome: "Sahasrara (Coronário)",
        localizacao: "Topo da cabeça",
        cor: "Violeta",
        elemento: "Consciência",
        funcao: "Conexão espiritual",
        equilibrio: "Meditação profunda, oração, filosofia e visualização de luz violeta."
    },
    ajna: {
        nome: "Ajna (Terceiro Olho)",
        localizacao: "Entre as sobrancelhas",
        cor: "Índigo",
        elemento: "Intuição",
        funcao: "Percepção e sabedoria interior",
        equilibrio: "Meditação silenciosa, observação dos pensamentos, visualização índigo."
    },
    vishuddha: {
        nome: "Vishuddha (Laríngeo)",
        localizacao: "Garganta",
        cor: "Azul",
        elemento: "Éter",
        funcao: "Comunicação e expressão",
        equilibrio: "Cantar, entoar mantras, falar a verdade e beber bastante água."
    },
    anahata: {
        nome: "Anahata (Cardíaco)",
        localizacao: "Peito",
        cor: "Verde",
        elemento: "Ar",
        funcao: "Amor e equilíbrio emocional",
        equilibrio: "Praticar gratidão, contato com a natureza, meditação no coração."
    },
    manipura: {
        nome: "Manipura (Plexo Solar)",
        localizacao: "Estômago",
        cor: "Amarelo",
        elemento: "Fogo",
        funcao: "Poder pessoal e energia",
        equilibrio: "Respiração profunda, disciplina, metas claras, visualização do fogo interno."
    },
    svadhisthana: {
        nome: "Svadhisthana (Sacral)",
        localizacao: "Abdômen inferior",
        cor: "Laranja",
        elemento: "Água",
        funcao: "Prazer e criatividade",
        equilibrio: "Dança, criatividade, contato com a água e visualização laranja."
    },
    muladhara: {
        nome: "Muladhara (Raiz)",
        localizacao: "Base da coluna",
        cor: "Vermelho",
        elemento: "Terra",
        funcao: "Segurança e sobrevivência",
        equilibrio: "Exercícios físicos, contato com a terra, alimentação natural e meditação vermelha."
    }
};

// Atualiza as informações do chakra selecionado
function Alter_info(chakraId) {
    const chakra = chakras[chakraId];
    Title_chakras.innerText = chakra.nome;
    chakra_info_list[0].innerText = chakra.localizacao;
    chakra_info_list[1].innerText = chakra.cor;
    chakra_info_list[2].innerText = chakra.elemento;
    chakra_info_list[3].innerText = chakra.funcao;
    chakra_info_list[4].innerText = chakra.equilibrio; // <- equilíbrio adicionado

    chakraSelecionado = chakraId;
}

// Adiciona eventos aos elementos dos chakras
Object.keys(chakras).forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener("click", () => Alter_info(id));
});

// Reproduz o som do chakra selecionado
somChakraBtn.addEventListener("click", () => {
    if (!chakraSelecionado) {
        alert("Selecione um chakra antes de reproduzir o som.");
        return;
    }

    // Pausa o som anterior, se houver
    if (audioAtual) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }

    // Toca o novo som
    audioAtual = new Audio(`som/${chakraSelecionado}.mp3`);
    audioAtual.play();
});
