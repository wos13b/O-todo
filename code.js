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
        cor: "Violeta ou Branco",
        elemento: "Consciência",
        funcao: "Conexão espiritual",
        equilibrio: "Meditação profunda, oração, contemplação, silêncio.",
        quandoEquilibrado: "Sabedoria, consciência expandida, conexão com o divino.",
        quandoDesequilibrio: "Desconexão, apatia, materialismo excessivo.",
        mantra: "OM"
    },
    ajna: {
        nome: "Ajna (Terceiro Olho)",
        localizacao: "Entre as sobrancelhas",
        cor: "Índigo",
        elemento: "Luz",
        funcao: "Intuição e percepção",
        equilibrio: "Meditação silenciosa, visualização, exercícios de atenção plena.",
        quandoEquilibrado: "Intuição aguçada, clareza mental, visão interior.",
        quandoDesequilibrio: "Confusão, dificuldade de concentração, excesso de racionalidade.",
        mantra: "OM"
    },
    vishuddha: {
        nome: "Vishuddha (Laríngeo)",
        localizacao: "Garganta",
        cor: "Azul Claro",
        elemento: "Éter",
        funcao: "Comunicação e expressão",
        equilibrio: "Cantar, falar a verdade, escrever, beber bastante água.",
        quandoEquilibrado: "Expressão clara, autenticidade, boa comunicação.",
        quandoDesequilibrio: "Medo de se expressar, timidez, mentira, garganta irritada.",
        mantra: "HAM"
    },
    anahata: {
        nome: "Anahata (Cardíaco)",
        localizacao: "Centro do peito",
        cor: "Verde",
        elemento: "Ar",
        funcao: "Amor e equilíbrio emocional",
        equilibrio: "Praticar gratidão, compaixão, contato com a natureza.",
        quandoEquilibrado: "Amor incondicional, empatia, equilíbrio emocional.",
        quandoDesequilibrio: "Isolamento, ressentimento, frieza emocional.",
        mantra: "YAM"
    },
    manipura: {
        nome: "Manipura (Plexo Solar)",
        localizacao: "Região do estômago",
        cor: "Amarelo",
        elemento: "Fogo",
        funcao: "Poder pessoal e energia",
        equilibrio: "Exercícios físicos, respiração profunda, disciplina.",
        quandoEquilibrado: "Autoconfiança, energia, força de vontade.",
        quandoDesequilibrio: "Raiva, medo, baixa autoestima, falta de direção.",
        mantra: "RAM"
    },
    svadhisthana: {
        nome: "Svadhisthana (Sacral)",
        localizacao: "Abaixo do umbigo",
        cor: "Laranja",
        elemento: "Água",
        funcao: "Prazer e criatividade",
        equilibrio: "Dança, criatividade, contato com a água.",
        quandoEquilibrado: "Criatividade, prazer saudável, flexibilidade emocional.",
        quandoDesequilibrio: "Apego, vícios, bloqueio criativo.",
        mantra: "VAM"
    },
    muladhara: {
        nome: "Muladhara (Raiz)",
        localizacao: "Base da coluna",
        cor: "Vermelho",
        elemento: "Terra",
        funcao: "Segurança e sobrevivência",
        equilibrio: "Caminhadas, contato com a natureza, práticas de enraizamento.",
        quandoEquilibrado: "Segurança, presença, base sólida.",
        quandoDesequilibrio: "Medo, instabilidade, sensação de abandono.",
        mantra: "LAM"
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
    chakra_info_list[4].innerText = chakra.equilibrio;
    chakra_info_list[5].innerText = chakra.quandoEquilibrado;
    chakra_info_list[6].innerText = chakra.quandoDesequilibrio;
    chakra_info_list[7].innerText = chakra.mantra;

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
