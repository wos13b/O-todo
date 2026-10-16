/* =========================================================
   CALENDÁRIO CÓSMICO DE 729 DIAS (PROGRESSÃO DE 3)
   Estrutura: 3 -> 9 -> 27 -> 81 -> 243 -> 729
   ========================================================= */

const TOTAL_DIAS_ANO = 729; // 3^6
const TOTAL_SETORES = 9;     // 9 Setores (Meses estruturais de 81 dias)
const DIAS_POR_SETOR = 81;   // 3^4 dias por setor
const DIAS_POR_SEMANA = 9;   // 3^2 dias por semana
const SEMANAS_POR_SETOR = DIAS_POR_SETOR / DIAS_POR_SEMANA; // 9 semanas por setor

// Duração exata do dia customizado em segundos: 12h 01min 27s = 43287 segundos
const SEGUNDOS_NO_DIA_CUSTOM = (12 * 3600) + (1 * 60) + 27;
const SEGUNDOS_NO_ANO_CUSTOM = TOTAL_DIAS_ANO * SEGUNDOS_NO_DIA_CUSTOM; // 31,556,223 segundos

// Marco zero para a contagem contínua ininterrupta
const MARCO_ZERO_COSMICO = new Date(2026, 0, 1, 0, 0, 0).getTime();

let anoAtual = 2026;
let setorAtual = 1;

const nomesSetores = [
    "Sūrya", 
    "Budha", 
    "Śukra", 
    "Chandra", 
    "Maṅgala", 
    "Bṛhaspati", 
    "Śani", 
    "Uranas", 
    "Neptunas"
];

const regenciasDiariasDoRelogio = [
    { nome: "Sūrya (Sol)", icone: "☉", atributo: "A Identidade (Centro)" },
    { nome: "Budha (Mercúrio)", icone: "☿", atributo: "Comunicação e Mente" },
    { nome: "Śukra (Vênus)", icone: "♀", atributo: "Desejo e Harmonia" },
    { nome: "Chandra (Lua)", icone: "☽", atributo: "Emoção e Manifestação" },
    { nome: "Maṅgala (Marte)", icone: "♂", atributo: "Ação e Conquista" },
    { nome: "Bṛhaspati (Júpiter)", icone: "♃", atributo: "Expansão e Sabedoria" },
    { nome: "Śani (Saturno)", icone: "♄", atributo: "Disciplina e Estrutura" },
    { nome: "Urano", icone: "⛢", atributo: "Inovação e Despertar" },
    { nome: "Netuno", icone: "♆", atributo: "Imaginação e Transcendência" }
];

/* =========================================================
   ELEMENTOS DO DOM
   ========================================================= */
const daysContainer = document.getElementById("days");
const monthName = document.getElementById("monthName");
const yearDisplay = document.getElementById("yearDisplay");
const yearNumerology = document.getElementById("yearNumerology");
const selectedDate = document.getElementById("selectedDate");
const gregorianDate = document.getElementById("gregorianDate");
const dayOfYear = document.getElementById("dayOfYear");
const centerMonth = document.getElementById("centerMonth");
const centerYear = document.getElementById("centerYear");
const weekdaysContainer = document.querySelector(".weekdays");

/* =========================================================
   FUNÇÕES AUXILIARES E MATEMÁTICAS (BASE 3)
   ========================================================= */

const quantidadeDiasSetor = () => DIAS_POR_SETOR;
const obterSemanaDoSetor = (dia) => Math.floor((dia - 1) / DIAS_POR_SEMANA) + 1;
const obterDiaDaSemana = (dia) => ((dia - 1) % DIAS_POR_SEMANA) + 1;

function reduzirNumero(numero) {
    while (numero >= 10) {
        numero = String(numero).split("").reduce((soma, digito) => soma + Number(digito), 0);
    }
    return numero;
}

// Mapeia o dia absoluto do calendário cósmico de volta para uma data civil aproximada para exibição
function obterDataGregoriana(ano, setor, dia) {
    const numeroDoDiaAbsoluto = ((setor - 1) * DIAS_POR_SETOR) + dia;
    const diaAnoGregoriano = Math.min(365, Math.max(1, Math.ceil((numeroDoDiaAbsoluto / TOTAL_DIAS_ANO) * 365)));
    return new Date(ano, 0, diaAnoGregoriano);
}

const formatarData = (data) => data.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });

/* =========================================================
   CÁLCULO SOLAR, LUNAR E CÓSMICO
   ========================================================= */

function calcularSignoSolar(data) {
    const ano = data.getFullYear();
    const signos = [
        { nome: "Capricórnio", icone: "♑", elemento: "Terra", inicio: new Date(ano, 11, 22), fim: new Date(ano, 0, 19) },
        { nome: "Aquário", icone: "♒", elemento: "Ar", inicio: new Date(ano, 0, 20), fim: new Date(ano, 1, 18) },
        { nome: "Peixes", icone: "♓", elemento: "Água", inicio: new Date(ano, 1, 19), fim: new Date(ano, 2, 20) },
        { nome: "Áries", icone: "♈", elemento: "Fogo", inicio: new Date(ano, 2, 21), fim: new Date(ano, 3, 19) },
        { nome: "Touro", icone: "♉", elemento: "Terra", inicio: new Date(ano, 3, 20), fim: new Date(ano, 4, 20) },
        { nome: "Gêmeos", icone: "♊", elemento: "Ar", inicio: new Date(ano, 4, 21), fim: new Date(ano, 5, 20) },
        { nome: "Câncer", icone: "♋", elemento: "Água", inicio: new Date(ano, 5, 21), fim: new Date(ano, 6, 22) },
        { nome: "Leão", icone: "♌", elemento: "Fogo", inicio: new Date(ano, 6, 23), fim: new Date(ano, 7, 22) },
        { nome: "Virgem", icone: "♍", elemento: "Terra", inicio: new Date(ano, 7, 23), fim: new Date(ano, 8, 22) },
        { nome: "Libra", icone: "♎", elemento: "Ar", inicio: new Date(ano, 8, 23), fim: new Date(ano, 9, 22) },
        { nome: "Escorpião", icone: "♏", elemento: "Água", inicio: new Date(ano, 9, 23), fim: new Date(ano, 10, 21) },
        { nome: "Sagitário", icone: "♐", elemento: "Fogo", inicio: new Date(ano, 10, 22), fim: new Date(ano, 11, 21) }
    ];

    let signoAtual = signos.find(s => {
        if (s.nome === "Capricórnio") {
            return (data >= new Date(ano, 11, 22)) || (data <= new Date(ano, 0, 19));
        }
        return data >= s.inicio && data <= s.fim;
    }) || signos[0];

    let dataInicio = signoAtual.inicio;
    if (signoAtual.nome === "Capricórnio" && data < new Date(ano, 6, 1)) {
        dataInicio = new Date(ano - 1, 11, 22);
    }
    
    const diffDias = Math.floor((data - dataInicio) / (1000 * 60 * 60 * 24));
    const grau = Math.max(0, Math.min(29, diffDias));

    return { ...signoAtual, grau };
}

const FASES_LUNARES = [
    { limite: 1.84566, nome: "Lua Nova", icone: "🌑" },
    { limite: 5.53699, nome: "Lua Crescente Côncava", icone: "🌒" },
    { limite: 9.22831, nome: "Quarto Crescente", icone: "🌓" },
    { limite: 12.91964, nome: "Crescente Gibosa", icone: "🌔" },
    { limite: 16.61096, nome: "Lua Cheia", icone: "🌕" },
    { limite: 20.30228, nome: "Minguante Gibosa", icone: "🌖" },
    { limite: 23.99361, nome: "Quarto Minguante", icone: "🌗" },
    { limite: 27.68493, nome: "Lua Minguante Côncava", icone: "🌘" },
    { limite: Infinity, nome: "Lua Nova", icone: "🌑" }
];

const LISTA_SIGNOS = [
    { nome: "Áries", icone: "♈" }, { nome: "Touro", icone: "♉" }, { nome: "Gêmeos", icone: "♊" },
    { nome: "Câncer", icone: "♋" }, { nome: "Leão", icone: "♌" }, { nome: "Virgem", icone: "♍" },
    { nome: "Libra", icone: "♎" }, { nome: "Escorpião", icone: "♏" }, { nome: "Sagitário", icone: "♐" },
    { nome: "Capricórnio", icone: "♑" }, { nome: "Aquário", icone: "♒" }, { nome: "Peixes", icone: "♓" }
];

function calcularFaseLua(data) {
    const luaNovaBase = new Date(2024, 0, 11, 8, 57, 0);
    const cicloSinodico = 29.5305877057;
    
    let idadeLunar = ((data - luaNovaBase) / (1000 * 60 * 60 * 24)) % cicloSinodico;
    if (idadeLunar < 0) idadeLunar += cicloSinodico;
    
    const faseEncontrada = FASES_LUNARES.find(f => idadeLunar < f.limite) || FASES_LUNARES[0];
    const iluminacao = Math.round(((1 - Math.cos((idadeLunar / cicloSinodico) * 2 * Math.PI)) / 2) * 100);

    return { nomeFase: faseEncontrada.nome, icone: faseEncontrada.icone, iluminacao, idadeLunar: idadeLunar.toFixed(1) };
}

function calcularSignoLunar(idadeLunar) {
    const cicloSideral = 27.321661;
    const progressoZodiaco = (idadeLunar % cicloSideral) / cicloSideral;
    const indiceSigno = Math.floor(progressoZodiaco * 12);
    const signoObj = LISTA_SIGNOS[indiceSigno % 12];
    const grau = Math.floor(((progressoZodiaco * 12) % 1) * 30);
    return { nome: signoObj.nome, icone: signoObj.icone, grau };
}

function calcularEstacaoLocal(data) {
    const mes = data.getMonth() + 1;
    if (mes >= 11 || mes <= 5) {
        return { nome: "Período Chuvoso", icone: "🌧️", descricao: "Inverno Amazônico (Águas)" };
    } else {
        return { nome: "Período Seco", icone: "☀️", descricao: "Verão Amazônico (Estiagem)" };
    }
}

function calcularRegenciaPlanetaria(setor, dia) {
    const indiceRegente = (dia - 1) % regenciasDiariasDoRelogio.length;
    return regenciasDiariasDoRelogio[indiceRegente];
}

/* =========================================================
   CRIAR E POSICIONAR DIAS
   ========================================================= */

function criarDia(ano, setor, dia) {
    const elemento = document.createElement("div");
    elemento.classList.add("day");

    const semana = obterSemanaDoSetor(dia);
    elemento.classList.add(`semana-${semana}`);
    elemento.dataset.semana = semana;
    elemento.dataset.diaSemana = obterDiaDaSemana(dia);

    const data = obterDataGregoriana(ano, setor, dia);
    elemento.addEventListener("click", () => selecionarDia(ano, setor, dia, data, elemento));
    return elemento;
}

/* =========================================================
   CICLO CONTÍNUO DO TEMPO CÓSMICO E MINI RELÓGIO (BASE 100)
   ========================================================= */

function obterTempoCosmicoAtual() {
    const agora = new Date().getTime();
    const segundosTotaisDecorridos = Math.floor((agora - MARCO_ZERO_COSMICO) / 1000);

    if (segundosTotaisDecorridos < 0) {
        return { diaAbsoluto: 1, anoCosmico: 2026, setor: 1, diaDoSetor: 1, parte1: 0, parte2: 0, parte3: 0, segundosNoDiaAtual: 0 };
    }

    const diaAbsoluto = Math.floor(segundosTotaisDecorridos / SEGUNDOS_NO_DIA_CUSTOM) + 1;
    const segundosNoDiaAtual = segundosTotaisDecorridos % SEGUNDOS_NO_DIA_CUSTOM;

    // Conversão limpa para contagem em Base 100 (00:00:00 até 99:99:99)
    const progressoDoDia = segundosNoDiaAtual / SEGUNDOS_NO_DIA_CUSTOM;
    const totalTicksVirtuais = progressoDoDia * 1000000; 

    const parte3 = Math.floor(totalTicksVirtuais % 100);                  // 0 a 99
    const parte2 = Math.floor((totalTicksVirtuais / 100) % 100);          // 0 a 99
    const parte1 = Math.floor((totalTicksVirtuais / 10000) % 100);        // 0 a 99

    const anoCosmico = 2026 + Math.floor((diaAbsoluto - 1) / TOTAL_DIAS_ANO);
    const diaNoAnoCosmico = ((diaAbsoluto - 1) % TOTAL_DIAS_ANO) + 1;
    
    const setor = Math.floor((diaNoAnoCosmico - 1) / DIAS_POR_SETOR) + 1;
    const diaDoSetor = ((diaNoAnoCosmico - 1) % DIAS_POR_SETOR) + 1;

    return {
        diaAbsoluto,
        anoCosmico,
        setor,
        diaDoSetor,
        parte1,
        parte2,
        parte3,
        segundosNoDiaAtual
    };
}

/* =========================================================
   SINTETIZADOR DE EFEITO SONORO (WEB AUDIO API)
   ========================================================= */
let audioCtx = null;
let ultimoIndicePlaneta = null;

function tocarSomMudancaPlaneta() {
    // Inicializa o contexto de áudio no primeiro clique/interação do usuário (exigência dos navegadores)
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const agora = audioCtx.currentTime;
    
    // Cria osciladores para um som harmônico e cósmico (tipo sino/cristal)
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine'; // Onda suave
    osc.frequency.setValueAtTime(528, agora); // Frequência base (frequência de solfejo / tom harmônico)
    osc.frequency.exponentialRampToValueAtTime(1046.5, agora + 0.15); // Sobe para um tom agudo agradável

    // Controle de volume (Fade in / Fade out rápido para não estalar)
    gainNode.gain.setValueAtTime(0, agora);
    gainNode.gain.linearRampToValueAtTime(0.15, agora + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(agora);
    osc.stop(agora + 0.8);
}

function atualizarMiniRelogioContinuo() {
    const timeElement = document.getElementById("miniClockTime");
    const dateElement = document.getElementById("miniClockDate");
    const iconElement = document.getElementById("miniClockIcon");
    
    if (!timeElement || !dateElement) return;

    const tempo = obterTempoCosmicoAtual();
    
    const p1 = String(tempo.parte1).padStart(2, '0');
    const p2 = String(tempo.parte2).padStart(2, '0');
    const p3 = String(tempo.parte3).padStart(2, '0');
    
    timeElement.textContent = `${p1}:${p2}:${p3}`;
    dateElement.textContent = `Dia ${tempo.diaAbsoluto} (${nomesSetores[tempo.setor - 1]})`;

    // Divisão do dia customizado em 9 períodos planetários proporcionais
    const duracaoPeriodo = SEGUNDOS_NO_DIA_CUSTOM / 9;
    let indicePeriodo = Math.floor(tempo.segundosNoDiaAtual / duracaoPeriodo);
    indicePeriodo = Math.max(0, Math.min(8, indicePeriodo));

    // --- DETECÇÃO DE MUDANÇA DE PLANETA ---
    if (ultimoIndicePlaneta !== null && ultimoIndicePlaneta !== indicePeriodo) {
        tocarSomMudancaPlaneta(); // Dispara o som sintetizado!
    }
    ultimoIndicePlaneta = indicePeriodo;
    // -------------------------------------

    const planetaRegente = regenciasDiariasDoRelogio[indicePeriodo];
    if (iconElement) {
        iconElement.textContent = planetaRegente.icone;
        iconElement.title = `Período Regente: ${planetaRegente.nome} — ${planetaRegente.atributo}`;
    }
}

// Atualiza o relógio a cada segundo
setInterval(atualizarMiniRelogioContinuo, 1000);
atualizarMiniRelogioContinuo();

/* =========================================================
   POSICIONAMENTO CIRCULAR EXATO
   ========================================================= */

function posicionarElementosCirculares(seletor, raioFator) {
    const elementos = document.querySelectorAll(seletor);
    const total = elementos.length;
    if (!total) return;

    const raio = Math.min(daysContainer.clientWidth, daysContainer.clientHeight) * raioFator;

    elementos.forEach((elemento, indice) => {
        const isWeekday = seletor.includes("weekday");
        
        if (isWeekday) {
            const anguloFatia = (Math.PI * 2) / total;
            const angulo = (indice / total) * Math.PI * 2 + (anguloFatia / 2) - Math.PI / 2;
            const x = Math.cos(angulo) * raio;
            const y = Math.sin(angulo) * raio;
            elemento.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
        } else {
            const angulo = (indice / total) * Math.PI * 2 - Math.PI / 2;
            const x = Math.cos(angulo) * raio;
            const y = Math.sin(angulo) * raio;
            elemento.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

function posicionarCalendarioCircular() {
    posicionarElementosCirculares(".day", 0.46);
    posicionarElementosCirculares(".weekdays div", 0.30);
}

function selecionarDia(ano, setor, dia, data, elemento) {
    document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
    elemento.classList.add("selected");

    const semana = obterSemanaDoSetor(dia);
    const diaSemana = obterDiaDaSemana(dia);
    const diaAbsoluto = ((setor - 1) * DIAS_POR_SETOR) + dia;

    selectedDate.textContent = `${nomesSetores[setor - 1]} — Dia ${dia} → ${reduzirNumero(dia)}`;
    gregorianDate.textContent = `Data gregoriana equivalente: ${formatarData(data)}`;
    dayOfYear.textContent = `Tríade ${semana} — Semana ${diaSemana} — Dia ${diaAbsoluto} de ${TOTAL_DIAS_ANO}`;

    const dadosSol = calcularSignoSolar(data);
    const dadosLua = calcularFaseLua(data);
    const dadosLuaSigno = calcularSignoLunar(parseFloat(dadosLua.idadeLunar));
    const dadosEstacao = calcularEstacaoLocal(data);
    const dadosPlaneta = calcularRegenciaPlanetaria(setor, dia);

    document.getElementById("sunIcon").textContent = dadosSol.icone;
    document.getElementById("sunSignName").textContent = dadosSol.nome;
    document.getElementById("sunDegree").textContent = `Grau: ${dadosSol.grau}°`;
    document.getElementById("sunElement").textContent = `Elemento: ${dadosSol.elemento}`;

    document.getElementById("seasonIcon").textContent = dadosEstacao.icone;
    document.getElementById("seasonName").textContent = dadosEstacao.nome;
    document.getElementById("seasonDesc").textContent = dadosEstacao.descricao;

    document.getElementById("moonIcon").textContent = dadosLua.icone;
    document.getElementById("moonPhaseName").textContent = dadosLua.nomeFase;
    document.getElementById("moonSign").textContent = `Signo: ${dadosLuaSigno.icone} ${dadosLuaSigno.nome}`;
    document.getElementById("moonDegree").textContent = `Grau: ${dadosLuaSigno.grau}°`;
    document.getElementById("moonIllumination").textContent = `Iluminação: ${dadosLua.iluminacao}%`;
    document.getElementById("moonAge").textContent = `Idade: ${dadosLua.idadeLunar} dias`;

    document.getElementById("planetIcon").textContent = dadosPlaneta.icone;
    document.getElementById("planetName").textContent = dadosPlaneta.nome;
    document.getElementById("planetAspect").textContent = `Atributo: ${dadosPlaneta.atributo}`;

    const sunInfo = document.getElementById("sunInfo");
    const moonInfo = document.getElementById("moonInfo");
    if (sunInfo) sunInfo.textContent = `☀️ Signo Solar: ${dadosSol.icone} ${dadosSol.nome} (${dadosSol.grau}°)`;
    if (moonInfo) moonInfo.textContent = `🌑 Fase Lunar: ${dadosLua.icone} ${dadosLua.nomeFase} (${dadosLua.iluminacao}%)`;
}

/* =========================================================
   RENDERIZAÇÃO
   ========================================================= */

function atualizarDiasDaSemana() {
    if (!weekdaysContainer) return;
    weekdaysContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (let semana = 1; semana <= SEMANAS_POR_SETOR; semana++) {
        const el = document.createElement("div");
        el.classList.add("weekday");
        el.textContent = semana;
        el.dataset.semana = semana;
        fragment.appendChild(el);
    }
    weekdaysContainer.appendChild(fragment);
}

function renderizarDias() {
    daysContainer.innerHTML = "";
    const qtdDias = quantidadeDiasSetor();
    const fragment = document.createDocumentFragment();

    for (let dia = 1; dia <= qtdDias; dia++) {
        fragment.appendChild(criarDia(anoAtual, setorAtual, dia));
    }
    daysContainer.appendChild(fragment);

    requestAnimationFrame(posicionarCalendarioCircular);
}

function renderizarCalendario() {
    const nomeSetorAtual = nomesSetores[setorAtual - 1];
    monthName.textContent = nomeSetorAtual;
    yearDisplay.textContent = anoAtual;
    if (yearNumerology) yearNumerology.textContent = reduzirNumero(anoAtual);
    if (centerMonth) centerMonth.textContent = nomeSetorAtual;
    if (centerYear) centerYear.textContent = anoAtual;

    atualizarDiasDaSemana();
    renderizarDias();
}

const obterSetorDoCalendario = (numDia) => Math.min(TOTAL_SETORES, Math.floor((numDia - 1) / DIAS_POR_SETOR) + 1);
const obterDiaDoSetor = (numDia) => ((numDia - 1) % DIAS_POR_SETOR) + 1;

/* =========================================================
   NAVEGAÇÃO E EVENTOS (AJUSTADO PARA NÃO PRENDER NO DIA 1)
   ========================================================= */

function mudarSetor(valor) {
    setorAtual += valor;
    if (setorAtual > TOTAL_SETORES) { setorAtual = 1; anoAtual++; }
    if (setorAtual < 1) { setorAtual = TOTAL_SETORES; anoAtual--; }
    renderizarCalendario();
    
    // Apenas removemos a seleção anterior ao trocar de mês para não mostrar dados dessincronizados,
    // mas sem forçar o dia 1. O usuário pode clicar no dia que desejar.
    document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
}

function mudarAno(valor) {
    anoAtual += valor;
    renderizarCalendario();
    
    // Remove a seleção ao trocar de ano
    document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
}

function irParaHoje() {
    const tempo = obterTempoCosmicoAtual();

    anoAtual = tempo.anoCosmico;
    setorAtual = tempo.setor;
    const dia = tempo.diaDoSetor;

    renderizarCalendario();

    const elementos = document.querySelectorAll(".day");
    if (elementos[dia - 1]) {
        elementos[dia - 1].classList.add("today");
        selecionarDia(anoAtual, setorAtual, dia, obterDataGregoriana(anoAtual, setorAtual, dia), elementos[dia - 1]);
    }
}

/* Event Listeners */
window.addEventListener("resize", posicionarCalendarioCircular);
document.getElementById("prevMonth")?.addEventListener("click", () => mudarSetor(-1));
document.getElementById("nextMonth")?.addEventListener("click", () => mudarSetor(1));
document.getElementById("prevYear")?.addEventListener("click", () => mudarAno(-1));
document.getElementById("nextYear")?.addEventListener("click", () => mudarAno(1));
document.getElementById("todayButton")?.addEventListener("click", irParaHoje);

/* Inicialização */
renderizarCalendario();
requestAnimationFrame(() => {
    irParaHoje();
});