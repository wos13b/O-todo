/* =========================================================
   CALENDÁRIO CÓSMICO DE 729 DIAS (PROGRESSÃO DE 3)
   Estrutura: 3 -> 9 -> 27 -> 81 -> 243 -> 729
   ========================================================= */

const TOTAL_DIAS_ANO = 729; // 3^6[cite: 1]
const TOTAL_SETORES = 9;     // 9 Setores (Meses estruturais de 81 dias)[cite: 1]
const DIAS_POR_SETOR = 81;   // 3^4 dias por setor[cite: 1]
const DIAS_POR_SEMANA = 9;   // 3^2 dias por semana[cite: 1]
const SEMANAS_POR_SETOR = DIAS_POR_SETOR / DIAS_POR_SEMANA; // 9 semanas por setor[cite: 1]

// Duração exata do dia customizado em segundos: 12h 01min 27s = 43287 segundos
const SEGUNDOS_NO_DIA_CUSTOM = (12 * 3600) + (1 * 60) + 27;
const DURACAO_DIA_MS = SEGUNDOS_NO_DIA_CUSTOM * 1000;
const SEGUNDOS_NO_ANO_CUSTOM = TOTAL_DIAS_ANO * SEGUNDOS_NO_DIA_CUSTOM; // 31,556,223 segundos

// Marco zero para a contagem contínua ininterrupta
const MARCO_ZERO_COSMICO = new Date(2026, 0, 1, 0, 0, 0).getTime();

let anoAtual = 2026;
let setorAtual = 1;

const nomesSetores = [
    "Sūrya", "Budha", "Śukra", "Chandra", "Maṅgala", 
    "Bṛhaspati", "Śani", "Uranas", "Neptunas"
];

const regenciasDiariasDoRelogio = [
    { nome: "Sūrya (Sol)", icone: "☉", img: "img/Silhueta/Symb/Cosmo/Sol.png", atributo: "Identidade" },
    { nome: "Budha (Mercúrio)", icone: "☿", img: "img/Silhueta/Symb/Cosmo/Mercurio.png", atributo: "Comunicação" },
    { nome: "Śukra (Vênus)", icone: "♀", img: "img/Silhueta/Symb/Cosmo/Venus.png", atributo: "Desejo" },
    { nome: "Chandra (Lua)", icone: "☽", img: "img/Silhueta/Symb/Cosmo/Lua.png", atributo: "Emoção" },
    { nome: "Maṅgala (Marte)", icone: "♂", img: "img/Silhueta/Symb/Cosmo/Marte.png", atributo: "Ação" },
    { nome: "Bṛhaspati (Júpiter)", icone: "♃", img: "img/Silhueta/Symb/Cosmo/Jupiter.png", atributo: "Expansão" },
    { nome: "Śani (Saturno)", icone: "♄", img: "img/Silhueta/Symb/Cosmo/Saturno.png", atributo: "Disciplina" },
    { nome: "Urano", icone: "⛢", img: "img/Silhueta/Symb/Cosmo/Urano.png", atributo: "Inovação" },
    { nome: "Netuno", icone: "♆", img: "img/Silhueta/Symb/Cosmo/Netuno.png", atributo: "Imaginação" }
];

// Lista de Signos unificada com imagens e ícones para reaproveitamento total
const LISTA_SIGNOS = [
    { nome: "Capricórnio", icone: "♑", img: "img/Silhueta/Signos/Capricornio.png", elemento: "Terra" },
    { nome: "Aquário", icone: "♒", img: "img/Silhueta/Signos/Aquario.png", elemento: "Ar" },
    { nome: "Peixes", icone: "♓", img: "img/Silhueta/Signos/Peixes.png", elemento: "Água" },
    { nome: "Áries", icone: "♈", img: "img/Silhueta/Signos/Aries.png", elemento: "Fogo" },
    { nome: "Touro", icone: "♉", img: "img/Silhueta/Signos/Touro.png", elemento: "Terra" },
    { nome: "Gêmeos", icone: "♊", img: "img/Silhueta/Signos/Gemeos.png", elemento: "Ar" },
    { nome: "Câncer", icone: "♋", img: "img/Silhueta/Signos/Cancer.png", elemento: "Água" },
    { nome: "Leão", icone: "♌", img: "img/Silhueta/Signos/Leao.png", elemento: "Fogo" },
    { nome: "Virgem", icone: "♍", img: "img/Silhueta/Signos/Virgem.png", elemento: "Terra" },
    { nome: "Libra", icone: "♎", img: "img/Silhueta/Signos/Libra.png", elemento: "Ar" },
    { nome: "Escorpião", icone: "♏", img: "img/Silhueta/Signos/Escorpiao.png", elemento: "Água" },
    { nome: "Sagitário", icone: "♐", img: "img/Silhueta/Signos/Sagitario.png", elemento: "Fogo" }
];

/* =========================================================
   ELEMENTOS DO DOM & CACHE
   ========================================================= */
const DOM = {
    daysContainer: document.getElementById("days"),
    monthName: document.getElementById("monthName"),
    yearDisplay: document.getElementById("yearDisplay"),
    yearNumerology: document.getElementById("yearNumerology"),
    selectedDate: document.getElementById("selectedDate"),
    gregorianDate: document.getElementById("gregorianDate"),
    dayOfYear: document.getElementById("dayOfYear"),
    centerMonth: document.getElementById("centerMonth"),
    centerYear: document.getElementById("centerYear"),
    weekdaysContainer: document.querySelector(".weekdays"),
    timelineContainer: document.getElementById("planetTimelineCircle"),
    miniClockTime: document.getElementById("miniClockTime"),
    miniClockDate: document.getElementById("miniClockDate"),
    miniClockIcon: document.getElementById("miniClockIcon"),
    sunIcon: document.getElementById("sunIcon"),
    sunSignName: document.getElementById("sunSignName"),
    sunDegree: document.getElementById("sunDegree"),
    sunElement: document.getElementById("sunElement"),
    seasonIcon: document.getElementById("seasonIcon"),
    seasonName: document.getElementById("seasonName"),
    seasonDesc: document.getElementById("seasonDesc"),
    moonIcon: document.getElementById("moonIcon"),
    moonPhaseName: document.getElementById("moonPhaseName"),
    moonSign: document.getElementById("moonSign"),
    moonDegree: document.getElementById("moonDegree"),
    moonIllumination: document.getElementById("moonIllumination"),
    moonAge: document.getElementById("moonAge"),
    planetIcon: document.getElementById("planetIcon"),
    planetName: document.getElementById("planetName"),
    planetAspect: document.getElementById("planetAspect"),
    sunInfo: document.getElementById("sunInfo"),
    moonInfo: document.getElementById("moonInfo")
};

let timelineSegmentsCache = [];

/* =========================================================
   FUNÇÕES AUXILIARES E MATEMÁTICAS (BASE 3)
   ========================================================= */

const quantidadeDiasSetor = () => DIAS_POR_SETOR;
const obterSemanaDoSetor = (dia) => Math.floor((dia - 1) / DIAS_POR_SEMANA) + 1;
const obterDiaDaSemana = (dia) => ((dia - 1) % DIAS_POR_SEMANA) + 1;

function reduzirNumero(numero) {
    while (numero >= 10) {
        let soma = 0;
        while (numero > 0) {
            soma += numero % 10;
            numero = Math.floor(numero / 10);
        }
        numero = soma;
    }
    return numero;
}

function obterDataGregoriana(ano, setor, dia) {
    const numeroDoDiaAbsoluto = ((setor - 1) * DIAS_POR_SETOR) + dia;
    const diaAnoGregoriano = Math.min(365, Math.max(1, Math.ceil((numeroDoDiaAbsoluto / TOTAL_DIAS_ANO) * 365)));
    return new Date(ano, 0, diaAnoGregoriano);
}

const formatadorData = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
const formatarData = (data) => formatadorData.format(data);

function renderizarIconeOuImagem(elementoDOM, dados, maxDim = "45px") {
    if (!elementoDOM) return;
    if (dados && dados.img) {
        elementoDOM.innerHTML = `<img src="${dados.img}" alt="${dados.nome || ''}" style="width: 100%; height: 100%; max-width: ${maxDim}; max-height: ${maxDim}; object-fit: contain; display: block; margin: 0 auto;">`;
    } else if (dados && dados.icone) {
        elementoDOM.textContent = dados.icone;
    }
}

/* =========================================================
   CÁLCULO SOLAR, LUNAR E CÓSMICO
   ========================================================= */

function calcularSignoSolar(data) {
    const ano = data.getFullYear();
    
    // Mapeamento de datas de início e fim baseadas na LISTA_SIGNOS unificada
    const faixasSignos = [
        { nome: "Capricórnio", inicio: new Date(ano, 11, 22), fim: new Date(ano, 0, 19) },
        { nome: "Aquário", inicio: new Date(ano, 0, 20), fim: new Date(ano, 1, 18) },
        { nome: "Peixes", inicio: new Date(ano, 1, 19), fim: new Date(ano, 2, 20) },
        { nome: "Áries", inicio: new Date(ano, 2, 21), fim: new Date(ano, 3, 19) },
        { nome: "Touro", inicio: new Date(ano, 3, 20), fim: new Date(ano, 4, 20) },
        { nome: "Gêmeos", inicio: new Date(ano, 4, 21), fim: new Date(ano, 5, 20) },
        { nome: "Câncer", inicio: new Date(ano, 5, 21), fim: new Date(ano, 6, 22) },
        { nome: "Leão", inicio: new Date(ano, 6, 23), fim: new Date(ano, 7, 22) },
        { nome: "Virgem", inicio: new Date(ano, 7, 23), fim: new Date(ano, 8, 22) },
        { nome: "Libra", inicio: new Date(ano, 8, 23), fim: new Date(ano, 9, 22) },
        { nome: "Escorpião", inicio: new Date(ano, 9, 23), fim: new Date(ano, 10, 21) },
        { nome: "Sagitário", inicio: new Date(ano, 10, 22), fim: new Date(ano, 11, 21) }
    ];

    let faixaAtual = faixasSignos.find(s => {
        if (s.nome === "Capricórnio") {
            return (data >= new Date(ano, 11, 22)) || (data <= new Date(ano, 0, 19));
        }
        return data >= s.inicio && data <= s.fim;
    }) || faixasSignos[0];

    let dataInicio = faixaAtual.inicio;
    if (faixaAtual.nome === "Capricórnio" && data < new Date(ano, 6, 1)) {
        dataInicio = new Date(ano - 1, 11, 22);
    }
    
    const diffDias = Math.floor((data - dataInicio) / 86400000);
    const grau = Math.max(0, Math.min(29, diffDias));

    const objetoSigno = LISTA_SIGNOS.find(s => s.nome === faixaAtual.nome) || LISTA_SIGNOS[0];

    return { ...objetoSigno, grau };
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

const LUA_NOVA_BASE = new Date(2024, 0, 11, 8, 57, 0).getTime();
const CICLO_SINODICO = 29.5305877057;

function calcularFaseLua(data) {
    let idadeLunar = ((data.getTime() - LUA_NOVA_BASE) / 86400000) % CICLO_SINODICO;
    if (idadeLunar < 0) idadeLunar += CICLO_SINODICO;
    
    const faseEncontrada = FASES_LUNARES.find(f => idadeLunar < f.limite) || FASES_LUNARES[0];
    const iluminacao = Math.round(((1 - Math.cos((idadeLunar / CICLO_SINODICO) * 2 * Math.PI)) / 2) * 100);

    return { nomeFase: faseEncontrada.nome, icone: faseEncontrada.icone, iluminacao, idadeLunar: idadeLunar.toFixed(1) };
}

function calcularSignoLunar(idadeLunar) {
    const cicloSideral = 27.321661;
    const progressoZodiaco = (idadeLunar % cicloSideral) / cicloSideral;
    const indiceSigno = Math.floor(progressoZodiaco * 12);
    const signoObj = LISTA_SIGNOS[indiceSigno % 12];
    const grau = Math.floor(((progressoZodiaco * 12) % 1) * 30);
    return { ...signoObj, grau };
}

function calcularEstacaoLocal(data) {
    const mes = data.getMonth() + 1;
    if (mes >= 11 || mes <= 5) {
        return { nome: "Período Chuvoso", icone: "🌧️", descricao: "Inverno Amazônico (Águas)" };
    }
    return { nome: "Período Seco", icone: "☀️", descricao: "Verão Amazônico (Estiagem)" };
}

function calcularRegenciaPlanetaria(setor, dia) {
    return regenciasDiariasDoRelogio[(dia - 1) % regenciasDiariasDoRelogio.length];
}

/* =========================================================
   CICLO CONTÍNUO DO TEMPO CÓSMICO
   ========================================================= */

function obterTempoCosmicoAtual() {
    const milissegundosTotaisDecorridos = Date.now() - MARCO_ZERO_COSMICO;

    if (milissegundosTotaisDecorridos < 0) {
        return { diaAbsoluto: 1, anoCosmico: 2026, setor: 1, diaDoSetor: 1, parte1: 0, parte2: 0, parte3: 0, segundosNoDiaAtual: 0 };
    }

    const milissegundosNoDiaAtual = milissegundosTotaisDecorridos % DURACAO_DIA_MS;
    const segundosNoDiaAtual = milissegundosNoDiaAtual / 1000;
    const diaAbsoluto = Math.floor(milissegundosTotaisDecorridos / DURACAO_DIA_MS) + 1;

    const totalTicksVirtuais = (milissegundosNoDiaAtual / DURACAO_DIA_MS) * 1000000;

    const parte3 = Math.floor(totalTicksVirtuais % 100);                  
    const parte2 = Math.floor((totalTicksVirtuais / 100) % 100);          
    const parte1 = Math.floor((totalTicksVirtuais / 10000) % 100);        

    const anoCosmico = 2026 + Math.floor((diaAbsoluto - 1) / TOTAL_DIAS_ANO);
    const diaNoAnoCosmico = ((diaAbsoluto - 1) % TOTAL_DIAS_ANO) + 1;
    
    const setor = Math.floor((diaNoAnoCosmico - 1) / DIAS_POR_SETOR) + 1;
    const diaDoSetor = ((diaNoAnoCosmico - 1) % DIAS_POR_SETOR) + 1;

    return { diaAbsoluto, anoCosmico, setor, diaDoSetor, parte1, parte2, parte3, segundosNoDiaAtual };
}

/* =========================================================
   AUDIO CONTEXT (SINGLETON REUTILIZADO)
   ========================================================= */
let audioCtx = null;
let ultimoIndicePlaneta = null;
let ultimoSomRepetido = null;

function obterAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

window.addEventListener('click', () => obterAudioContext(), { once: true });

function tocarSomMudancaPlaneta() {
    const ctx = obterAudioContext();
    const agora = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, agora);
    osc.frequency.exponentialRampToValueAtTime(1046.5, agora + 0.15);

    gainNode.gain.setValueAtTime(0, agora);
    gainNode.gain.linearRampToValueAtTime(0.15, agora + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(agora);
    osc.stop(agora + 0.8);
}

function tocarEscalaCrescenteDeSons() {
    const ctx = obterAudioContext();
    const notas = [220, 277.18, 329.63, 440, 554.37, 659.25, 880]; 
    
    notas.forEach((frequencia, index) => {
        const agora = ctx.currentTime + (index * 0.08);
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(frequencia, agora);

        gainNode.gain.setValueAtTime(0, agora);
        gainNode.gain.linearRampToValueAtTime(0.1, agora + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.3);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(agora);
        osc.stop(agora + 0.3);
    });
}

function verificarESonsRepetidos(p1, p2, p3) {
    const isRepetido = (p1 === p2) && (p2 === p3) && (p1[0] === p1[1]);

    if (isRepetido) {
        if (ultimoSomRepetido !== p1) {
            ultimoSomRepetido = p1;
            tocarEscalaCrescenteDeSons();
        }
    } else {
        ultimoSomRepetido = null;
    }
}

/* =========================================================
   INICIALIZAÇÃO DA TIMELINE CIRCULAR (9 SEGMENTOS)
   ========================================================= */
function criarSegmentosTimelineCircular() {
    if (!DOM.timelineContainer) return;
    
    DOM.timelineContainer.innerHTML = "";
    timelineSegmentsCache = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 9; i++) {
        const segment = document.createElement("div");
        segment.className = "timeline-arc-segment";
        segment.dataset.index = i;
        
        const regente = regenciasDiariasDoRelogio[i];
        segment.title = `${i + 1}º Período: ${regente.nome} (${regente.atributo})`;
        
        fragment.appendChild(segment);
        timelineSegmentsCache.push(segment);
    }
    DOM.timelineContainer.appendChild(fragment);
}

let ultimoTextoTempo = "";

function atualizarMiniRelogioContinuo() {
    if (!DOM.miniClockTime || !DOM.miniClockDate) return;

    const tempo = obterTempoCosmicoAtual();
    
    const p1 = String(tempo.parte1).padStart(2, '0');
    const p2 = String(tempo.parte2).padStart(2, '0');
    const p3 = String(tempo.parte3).padStart(2, '0');
    const novoTextoTempo = `${p1}:${p2}:${p3}`;
    
    if (ultimoTextoTempo !== novoTextoTempo) {
        DOM.miniClockTime.textContent = novoTextoTempo;
        DOM.miniClockDate.textContent = `Dia ${tempo.diaAbsoluto} (${nomesSetores[tempo.setor - 1]})`;
        ultimoTextoTempo = novoTextoTempo;
        verificarESonsRepetidos(p1, p2, p3);
    }

    const duracaoPeriodo = SEGUNDOS_NO_DIA_CUSTOM / 9;
    const indicePeriodo = Math.max(0, Math.min(8, Math.floor(tempo.segundosNoDiaAtual / duracaoPeriodo)));

    if (ultimoIndicePlaneta !== null && ultimoIndicePlaneta !== indicePeriodo) {
        tocarSomMudancaPlaneta();
    }
    
    if (ultimoIndicePlaneta !== indicePeriodo) {
        ultimoIndicePlaneta = indicePeriodo;

        const planetaRegente = regenciasDiariasDoRelogio[indicePeriodo];
        if (DOM.miniClockIcon) {
            DOM.miniClockIcon.textContent = planetaRegente.icone;
            DOM.miniClockIcon.title = `Período Regente: ${planetaRegente.nome} — ${planetaRegente.atributo}`;
        }

        timelineSegmentsCache.forEach((seg, idx) => {
            if (idx < indicePeriodo) {
                seg.className = "timeline-arc-segment passed";
            } else if (idx === indicePeriodo) {
                seg.className = "timeline-arc-segment active";
            } else {
                seg.className = "timeline-arc-segment";
            }
        });
    }
}

/* =========================================================
   ATUALIZAÇÃO EM TEMPO REAL
   ========================================================= */
let lastFrameTime = 0;
function iniciarRelogioFluido(timestamp) {
    if (timestamp - lastFrameTime > 33) {
        atualizarMiniRelogioContinuo();
        lastFrameTime = timestamp;
    }
    requestAnimationFrame(iniciarRelogioFluido);
}

requestAnimationFrame(iniciarRelogioFluido);

/* =========================================================
   POSICIONAMENTO CIRCULAR EXATO
   ========================================================= */

function posicionarElementosCirculares(seletor, raioFator) {
    const elementos = document.querySelectorAll(seletor);
    const total = elementos.length;
    if (!total || !DOM.daysContainer) return;

    const raio = Math.min(DOM.daysContainer.clientWidth, DOM.daysContainer.clientHeight) * raioFator;
    const isWeekday = seletor.includes("weekday");
    const anguloFatia = (Math.PI * 2) / total;

    elementos.forEach((elemento, indice) => {
        const angulo = isWeekday 
            ? (indice / total) * Math.PI * 2 + (anguloFatia / 2) - Math.PI / 2
            : (indice / total) * Math.PI * 2 - Math.PI / 2;

        const x = Math.cos(angulo) * raio;
        const y = Math.sin(angulo) * raio;
        
        elemento.style.transform = isWeekday 
            ? `translate(-50%, -50%) translate(${x}px, ${y}px)`
            : `translate(${x}px, ${y}px)`;
    });
}

function posicionarTimelineCircular() {
    const total = timelineSegmentsCache.length;
    if (!total || !DOM.daysContainer) return;

    const raio = (DOM.daysContainer.clientWidth / 2) + 18;
    const anguloFatia = (Math.PI * 2) / total;

    timelineSegmentsCache.forEach((elemento, indice) => {
        const angulo = (indice / total) * Math.PI * 2 + (anguloFatia / 2) - Math.PI / 2;
        const x = Math.cos(angulo) * raio;
        const y = Math.sin(angulo) * raio;
        const rotacaoGraus = (angulo * (180 / Math.PI)) + 90;

        elemento.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotacaoGraus}deg)`;
    });
}

function posicionarCalendarioCircular() {
    posicionarElementosCirculares(".day", 0.46);
    posicionarElementosCirculares(".weekdays div", 0.30);
    posicionarTimelineCircular();
}

function selecionarDia(ano, setor, dia, data, elemento) {
    document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));
    elemento.classList.add("selected");

    const semana = obterSemanaDoSetor(dia);
    const diaSemana = obterDiaDaSemana(dia);
    const diaAbsoluto = ((setor - 1) * DIAS_POR_SETOR) + dia;

    if (DOM.selectedDate) DOM.selectedDate.textContent = `${nomesSetores[setor - 1]} — Dia ${dia} → ${reduzirNumero(dia)}`;
    if (DOM.gregorianDate) DOM.gregorianDate.textContent = `Data gregoriana equivalente: ${formatarData(data)}`;
    if (DOM.dayOfYear) DOM.dayOfYear.textContent = `Tríade ${semana} — Semana ${diaSemana} — Dia ${diaAbsoluto} de ${TOTAL_DIAS_ANO}`;

    const dadosSol = calcularSignoSolar(data);
    const dadosLua = calcularFaseLua(data);
    const dadosLuaSigno = calcularSignoLunar(parseFloat(dadosLua.idadeLunar));
    const dadosEstacao = calcularEstacaoLocal(data);
    const dadosPlaneta = calcularRegenciaPlanetaria(setor, dia);

    // Renderização unificada via helper
    renderizarIconeOuImagem(DOM.sunIcon, dadosSol);
    renderizarIconeOuImagem(DOM.planetIcon, dadosPlaneta);

    if (DOM.planetName) DOM.planetName.textContent = dadosPlaneta.nome;
    if (DOM.planetAspect) DOM.planetAspect.textContent = `Atributo: ${dadosPlaneta.atributo}`;

    if (DOM.sunSignName) DOM.sunSignName.textContent = dadosSol.nome;
    if (DOM.sunDegree) DOM.sunDegree.textContent = `Grau: ${dadosSol.grau}°`;
    if (DOM.sunElement) DOM.sunElement.textContent = `Elemento: ${dadosSol.elemento}`;

    if (DOM.seasonIcon) DOM.seasonIcon.textContent = dadosEstacao.icone;
    if (DOM.seasonName) DOM.seasonName.textContent = dadosEstacao.nome;
    if (DOM.seasonDesc) DOM.seasonDesc.textContent = dadosEstacao.descricao;

    if (DOM.moonIcon) DOM.moonIcon.textContent = dadosLua.icone;
    if (DOM.moonPhaseName) DOM.moonPhaseName.textContent = dadosLua.nomeFase;

    // Renderiza a imagem do signo lunar inline se houver suporte, ou o ícone de texto
    const iconeLuaSignoHtml = dadosLuaSigno.img 
        ? `<img src="${dadosLuaSigno.img}" alt="${dadosLuaSigno.nome}" style="width: 18px; height: 18px; vertical-align: middle; object-fit: contain; display: inline-block;">` 
        : dadosLuaSigno.icone;

    if (DOM.moonSign) DOM.moonSign.innerHTML = `Signo: ${iconeLuaSignoHtml} ${dadosLuaSigno.nome}`;
    if (DOM.moonDegree) DOM.moonDegree.textContent = `Grau: ${dadosLuaSigno.grau}°`;
    if (DOM.moonIllumination) DOM.moonIllumination.textContent = `Iluminação: ${dadosLua.iluminacao}%`;
    if (DOM.moonAge) DOM.moonAge.textContent = `Idade: ${dadosLua.idadeLunar} dias`;

    if (DOM.sunInfo) DOM.sunInfo.textContent = `☀️ Signo Solar: ${dadosSol.icone} ${dadosSol.nome} (${dadosSol.grau}°)`;
    if (DOM.moonInfo) DOM.moonInfo.textContent = `🌑 Fase Lunar: ${dadosLua.icone} ${dadosLua.nomeFase} (${dadosLua.iluminacao}%)`;
}

/* =========================================================
   RENDERIZAÇÃO
   ========================================================= */

function atualizarDiasDaSemana() {
    if (!DOM.weekdaysContainer) return;
    DOM.weekdaysContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (let semana = 1; semana <= SEMANAS_POR_SETOR; semana++) {
        const el = document.createElement("div");
        el.className = "weekday";
        el.textContent = semana;
        el.dataset.semana = semana;
        fragment.appendChild(el);
    }
    DOM.weekdaysContainer.appendChild(fragment);
}

function criarDia(ano, setor, dia) {
    const elemento = document.createElement("div");
    const semana = obterSemanaDoSetor(dia);
    elemento.className = `day semana-${semana}`;
    elemento.dataset.semana = semana;
    elemento.dataset.diaSemana = obterDiaDaSemana(dia);

    const data = obterDataGregoriana(ano, setor, dia);
    elemento.addEventListener("click", () => selecionarDia(ano, setor, dia, data, elemento));
    return elemento;
}

function renderizarDias() {
    if (!DOM.daysContainer) return;
    DOM.daysContainer.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    for (let dia = 1; dia <= DIAS_POR_SETOR; dia++) {
        fragment.appendChild(criarDia(anoAtual, setorAtual, dia));
    }
    DOM.daysContainer.appendChild(fragment);

    requestAnimationFrame(posicionarCalendarioCircular);
}

function renderizarCalendario() {
    const nomeSetorAtual = nomesSetores[setorAtual - 1];
    if (DOM.monthName) DOM.monthName.textContent = nomeSetorAtual;
    if (DOM.yearDisplay) DOM.yearDisplay.textContent = anoAtual;
    if (DOM.yearNumerology) DOM.yearNumerology.textContent = reduzirNumero(anoAtual);
    if (DOM.centerMonth) DOM.centerMonth.textContent = nomeSetorAtual;
    if (DOM.centerYear) DOM.centerYear.textContent = anoAtual;

    atualizarDiasDaSemana();
    renderizarDias();
}

/* =========================================================
   NAVEGAÇÃO E EVENTOS
   ========================================================= */

function verificarESelecionarHojeOuLimpar() {
    const tempo = obterTempoCosmicoAtual();
    
    if (anoAtual === tempo.anoCosmico && setorAtual === tempo.setor) {
        const elementos = DOM.daysContainer?.children;
        if (elementos && elementos[tempo.diaDoSetor - 1]) {
            selecionarDia(anoAtual, setorAtual, tempo.diaDoSetor, obterDataGregoriana(anoAtual, setorAtual, tempo.diaDoSetor), elementos[tempo.diaDoSetor - 1]);
        }
    } else {
        document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));
    }
}

function mudarSetor(valor) {
    setorAtual += valor;
    if (setorAtual > TOTAL_SETORES) { setorAtual = 1; anoAtual++; }
    if (setorAtual < 1) { setorAtual = TOTAL_SETORES; anoAtual--; }
    renderizarCalendario();
    verificarESelecionarHojeOuLimpar();
}

function mudarAno(valor) {
    anoAtual += valor;
    renderizarCalendario();
    verificarESelecionarHojeOuLimpar();
}

function irParaHoje() {
    const tempo = obterTempoCosmicoAtual();
    anoAtual = tempo.anoCosmico;
    setorAtual = tempo.setor;

    renderizarCalendario();

    const elementos = DOM.daysContainer?.children;
    if (elementos && elementos[tempo.diaDoSetor - 1]) {
        elementos[tempo.diaDoSetor - 1].classList.add("today");
        selecionarDia(anoAtual, setorAtual, tempo.diaDoSetor, obterDataGregoriana(anoAtual, setorAtual, tempo.diaDoSetor), elementos[tempo.diaDoSetor - 1]);
    }
}

/* Event Listeners Otimizados */
window.addEventListener("resize", posicionarCalendarioCircular);
document.getElementById("prevMonth")?.addEventListener("click", () => mudarSetor(-1));
document.getElementById("nextMonth")?.addEventListener("click", () => mudarSetor(1));
document.getElementById("prevYear")?.addEventListener("click", () => mudarAno(-1));
document.getElementById("nextYear")?.addEventListener("click", () => mudarAno(1));
document.getElementById("todayButton")?.addEventListener("click", irParaHoje);

/* Inicialização */
criarSegmentosTimelineCircular();
renderizarCalendario();
requestAnimationFrame(() => irParaHoje());