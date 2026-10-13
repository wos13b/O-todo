/* =========================================================
   CALENDÁRIO 14 MESES & PAINEL DE INFORMAÇÕES UNIFICADO
   ========================================================= */

const TOTAL_MESES = 14;
const MESES_REGULARES = 13;
const SEMANAS_MES_REGULAR = 3;
const DIAS_POR_SEMANA_REGULAR = 9;
const DIAS_POR_MES = SEMANAS_MES_REGULAR * DIAS_POR_SEMANA_REGULAR;
const DIAS_REGULARES = MESES_REGULARES * DIAS_POR_MES;
const SEMANAS_MES_FINAL = 2;
const DIAS_POR_SEMANA_FINAL = 7;
const DIAS_MES_FINAL = SEMANAS_MES_FINAL * DIAS_POR_SEMANA_FINAL;

let anoAtual = 2026;
let mesAtual = 1;

const nomesMeses = [
    "Surya", "Soma", "Mangala", "Budha", "Guru", "Shukra", "Shani",
    "Rahu", "Ketu", "Akasha", "Prithvi", "Dhruva", "Nexus", "Sandhi"
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
const extraDays = document.getElementById("extraDays");
const centerMonth = document.getElementById("centerMonth");
const centerYear = document.getElementById("centerYear");
const weekdaysContainer = document.querySelector(".weekdays");

/* =========================================================
   FUNÇÕES AUXILIARES E MATEMÁTICAS
   ========================================================= */

const ehBissexto = (ano) => (ano % 400 === 0) || (ano % 4 === 0 && ano % 100 !== 0);
const quantidadeDiasNoAno = (ano) => ehBissexto(ano) ? 366 : 365;
const quantidadeDiasMes = (mes) => mes <= MESES_REGULARES ? DIAS_POR_MES : DIAS_MES_FINAL;
const quantidadeDiasPorSemana = (mes) => mes <= MESES_REGULARES ? DIAS_POR_SEMANA_REGULAR : DIAS_POR_SEMANA_FINAL;
const quantidadeSemanasMes = (mes) => mes <= MESES_REGULARES ? SEMANAS_MES_REGULAR : SEMANAS_MES_FINAL;

const obterSemanaDoMes = (mes, dia) => Math.floor((dia - 1) / quantidadeDiasPorSemana(mes)) + 1;
const obterDiaDaSemana = (mes, dia) => ((dia - 1) % quantidadeDiasPorSemana(mes)) + 1;

function reduzirNumero(numero) {
    while (numero >= 10) {
        numero = String(numero).split("").reduce((soma, digito) => soma + Number(digito), 0);
    }
    return numero;
}

function obterDataGregoriana(ano, mes, dia) {
    const numeroDoDia = mes <= MESES_REGULARES ? ((mes - 1) * DIAS_POR_MES) + dia : DIAS_REGULARES + dia;
    return new Date(ano, 0, numeroDoDia);
}

const formatarData = (data) => data.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
const ehHoje = (data) => {
    const hoje = new Date();
    return data.getFullYear() === hoje.getFullYear() && data.getMonth() === hoje.getMonth() && data.getDate() === hoje.getDate();
};

/* =========================================================
   CÁLCULO SOLAR E LUNAR
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

/* =========================================================
   CÁLCULO DE ESTAÇÕES (SÃO FÉLIX DO XINGU - PA)
   ========================================================= */

function calcularEstacaoLocal(data) {
    const mes = data.getMonth() + 1; // 1 a 12 (Janeiro a Dezembro)

    // Em São Félix do Xingu - PA:
    // Chuvoso (Inverno Amazônico): de Novembro (11) até Maio (5)
    // Seco (Verão Amazônico): de Junho (6) até Outubro (10)
    
    if (mes >= 11 || mes <= 5) {
        return {
            nome: "Período Chuvoso",
            icone: "🌧️",
            descricao: "Inverno Amazônico (Águas)"
        };
    } else {
        return {
            nome: "Período Seco",
            icone: "☀️",
            descricao: "Verão Amazônico (Estiagem)"
        };
    }
}

/* =========================================================
   CÁLCULO DE REGÊNCIA PLANETÁRIA (DIA DA SEMANA)
   ========================================================= */

/* =========================================================
   CÁLCULO DE REGÊNCIA PLANETÁRIA (SINCRONIZADA COM O SISTEMA)
   ========================================================= */

/* =========================================================
   CÁLCULO DE REGÊNCIA PLANETÁRIA (ORDEM CÓSMICA)
   ========================================================= */

function calcularRegenciaPlanetaria(mes, dia) {
    // Lista alinhada rigorosamente de acordo com a progressão do Cosmos
    const regenciasSistema = [
        { nome: "Surya (Sol)", icone: "☉", atributo: "A Identidade (Centro)" },
        { nome: "Budha (Mercúrio)", icone: "☿", atributo: "Comunicação e Mente" },
        { nome: "Shukra (Vênus)", icone: "♀", atributo: "Desejo e Harmonia" },
        { nome: "Soma (Lua / Terra)", icone: "☽", atributo: "Emoção e Manifestação" },
        { nome: "Mangala (Marte)", icone: "♂", atributo: "Ação e Conquista" },
        { nome: "Guru (Júpiter)", icone: "♃", atributo: "Expansão e Sabedoria" },
        { nome: "Shani (Saturno)", icone: "♄", atributo: "Disciplina e Estrutura" },
        { nome: "Urano", icone: "⛢", atributo: "Inovação e Despertar" },
        { nome: "Netuno", icone: "♆", atributo: "Imaginação e Transcendência" }
    ];

    // Garante que o Dia 1 de cada mês comece exatamente no Sol (índice 0)
    // e siga sequencialmente a ordem cósmica ao longo dos 9 dias do ciclo.
    const indiceRegente = (dia - 1) % regenciasSistema.length;

    return regenciasSistema[indiceRegente];
}

/* =========================================================
   CRIAR E POSICIONAR DIAS
   ========================================================= */

function criarDia(ano, mes, dia) {
    const elemento = document.createElement("div");
    elemento.classList.add("day");

    const semana = obterSemanaDoMes(mes, dia);
    elemento.classList.add(`semana-${semana}`);
    elemento.dataset.semana = semana;
    elemento.dataset.diaSemana = obterDiaDaSemana(mes, dia);

    elemento.innerHTML = `
        <div class="day-number">
            <span class="numero-original">${dia}</span>
            <span class="numero-reduzido">${reduzirNumero(dia)}</span>
        </div>
    `;

    const data = obterDataGregoriana(ano, mes, dia);
    if (ehHoje(data)) elemento.classList.add("today");

    elemento.addEventListener("click", () => selecionarDia(ano, mes, dia, data, elemento));
    return elemento;
}

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
    posicionarElementosCirculares(".day", 0.42);
    posicionarElementosCirculares(".weekdays div", 0.28);
}

/* =========================================================
   RENDERIZAÇÃO
   ========================================================= */

function atualizarDiasDaSemana() {
    if (!weekdaysContainer) return;
    weekdaysContainer.innerHTML = "";

    const qtdSemanas = quantidadeSemanasMes(mesAtual);
    const fragment = document.createDocumentFragment();

    for (let semana = 1; semana <= qtdSemanas; semana++) {
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
    const qtdDias = quantidadeDiasMes(mesAtual);
    const fragment = document.createDocumentFragment();

    for (let dia = 1; dia <= qtdDias; dia++) {
        fragment.appendChild(criarDia(anoAtual, mesAtual, dia));
    }
    daysContainer.appendChild(fragment);

    requestAnimationFrame(posicionarCalendarioCircular);
}

function renderizarDiasExtras() {
    if (!extraDays) return;
    extraDays.innerHTML = "";

    if (ehBissexto(anoAtual)) {
        const elemento = document.createElement("div");
        elemento.classList.add("dia-bissexto");
        elemento.textContent = "Dia Bissexto";
        extraDays.appendChild(elemento);
    }
}

function renderizarCalendario() {
    const calendarElement = document.querySelector(".calendar");
    if (calendarElement) {
        calendarElement.classList.toggle("mes-14", mesAtual === TOTAL_MESES);
    }

    const nomeMesAtual = nomesMeses[mesAtual - 1];
    monthName.textContent = nomeMesAtual;
    yearDisplay.textContent = anoAtual;
    if (yearNumerology) yearNumerology.textContent = reduzirNumero(anoAtual);
    if (centerMonth) centerMonth.textContent = nomeMesAtual;
    if (centerYear) centerYear.textContent = anoAtual;

    atualizarDiasDaSemana();
    renderizarDias();
    renderizarDiasExtras();
}

/* =========================================================
   SELEÇÃO DE DIAS
   ========================================================= */

function selecionarDia(ano, mes, dia, data, elemento) {
    document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
    elemento.classList.add("selected");

    const semana = obterSemanaDoMes(mes, dia);
    const diaSemana = obterDiaDaSemana(mes, dia);

    selectedDate.textContent = `${nomesMeses[mes - 1]} — Dia ${dia} → ${reduzirNumero(dia)}`;
    gregorianDate.textContent = `Data gregoriana: ${formatarData(data)}`;
    dayOfYear.textContent = `Semana ${semana} — Dia ${diaSemana} — Dia ${obterNumeroDoDia(mes, dia)} de ${quantidadeDiasNoAno(ano)}`;

    const dadosSol = calcularSignoSolar(data);
    const dadosLua = calcularFaseLua(data);
    const dadosLuaSigno = calcularSignoLunar(parseFloat(dadosLua.idadeLunar));
    const dadosEstacao = calcularEstacaoLocal(data);
    const dadosPlaneta = calcularRegenciaPlanetaria(mes, dia);

    // 1. Atualizar Painel Solar (Esquerdo)
    const sunIcon = document.getElementById("sunIcon");
    const sunSignName = document.getElementById("sunSignName");
    const sunDegree = document.getElementById("sunDegree");
    const sunElement = document.getElementById("sunElement");

    if (sunIcon) sunIcon.textContent = dadosSol.icone;
    if (sunSignName) sunSignName.textContent = dadosSol.nome;
    if (sunDegree) sunDegree.textContent = `Grau: ${dadosSol.grau}°`;
    if (sunElement) sunElement.textContent = `Elemento: ${dadosSol.elemento}`;

    // 2. Atualizar Painel Estação (Esquerdo)

    const seasonIcon = document.getElementById("seasonIcon");
    const seasonName = document.getElementById("seasonName");
    const seasonDesc = document.getElementById("seasonDesc");

    if (seasonIcon) seasonIcon.textContent = dadosEstacao.icone;
    if (seasonName) seasonName.textContent = dadosEstacao.nome;
    if (seasonDesc) seasonDesc.textContent = dadosEstacao.descricao;


    // 3. Atualizar Painel Lunar (Direito)
    const moonIcon = document.getElementById("moonIcon");
    const moonPhaseName = document.getElementById("moonPhaseName");
    const moonSign = document.getElementById("moonSign");
    const moonDegree = document.getElementById("moonDegree");
    const moonIllumination = document.getElementById("moonIllumination");
    const moonAge = document.getElementById("moonAge");

    if (moonIcon) moonIcon.textContent = dadosLua.icone;
    if (moonPhaseName) moonPhaseName.textContent = dadosLua.nomeFase;
    if (moonSign) moonSign.textContent = `Signo: ${dadosLuaSigno.icone} ${dadosLuaSigno.nome}`;
    if (moonDegree) moonDegree.textContent = `Grau: ${dadosLuaSigno.grau}°`;
    if (moonIllumination) moonIllumination.textContent = `Iluminação: ${dadosLua.iluminacao}%`;
    if (moonAge) moonAge.textContent = `Idade: ${dadosLua.idadeLunar} dias`;

    // 4. Atualizar Painel Regente (Direito)
    const planetIcon = document.getElementById("planetIcon");
    const planetName = document.getElementById("planetName");
    const planetAspect = document.getElementById("planetAspect");

    if (planetIcon) planetIcon.textContent = dadosPlaneta.icone;
    if (planetName) planetName.textContent = dadosPlaneta.nome;
    if (planetAspect) planetAspect.textContent = `Atributo: ${dadosPlaneta.atributo}`;

    // 5. Atualizar Painel Info (Inferior)
    const sunInfo = document.getElementById("sunInfo");
    const moonInfo = document.getElementById("moonInfo");

    if (sunInfo) {
        sunInfo.textContent = `☀️ Sol em ${dadosSol.icone} ${dadosSol.nome} (${dadosSol.grau}°) — Elemento: ${dadosSol.elemento}`;
    }

    if (moonInfo) {
        moonInfo.textContent = `${dadosLua.icone} Lua em ${dadosLuaSigno.icone} ${dadosLuaSigno.nome} (${dadosLuaSigno.grau}°) — ${dadosLua.nomeFase} (${dadosLua.iluminacao}%)`;
    }
}

const obterNumeroDoDia = (mes, dia) => mes <= MESES_REGULARES ? ((mes - 1) * DIAS_POR_MES) + dia : DIAS_REGULARES + dia;
const obterMesDoCalendario = (numDia) => numDia <= DIAS_REGULARES ? Math.floor((numDia - 1) / DIAS_POR_MES) + 1 : TOTAL_MESES;
const obterDiaDoMes = (numDia, mes) => mes <= MESES_REGULARES ? ((numDia - 1) % DIAS_POR_MES) + 1 : numDia - DIAS_REGULARES;

/* =========================================================
   ATUALIZAÇÃO EM TEMPO REAL (MEIA-NOITE / MUDANÇA DE DIA)
   ========================================================= */

function iniciarAtualizacaoTempoReal() {
    // Verifica a cada 1 minuto se o dia mudou no sistema operacional
    setInterval(() => {
        const agora = new Date();
        // Se a data atual for diferente da última selecionada/verificada, atualiza para hoje
        const diaAtualDOM = document.querySelector(".day.today");
        
        // Exemplo: se o dia de hoje mudou no sistema, podemos recalcular o "Ir para Hoje"
        // Ou simplesmente atualizar as classes "today" dinamicamente:
        document.querySelectorAll(".day").forEach(el => {
            // Aqui você pode reavaliar a função ehHoje para cada elemento se necessário
        });
    }, 60000); // Roda a cada 60 segundos
}

// Chame a função na inicialização
iniciarAtualizacaoTempoReal();

/* =========================================================
   NAVEGAÇÃO E EVENTOS
   ========================================================= */

function mudarMes(valor) {
    mesAtual += valor;
    if (mesAtual > TOTAL_MESES) { mesAtual = 1; anoAtual++; }
    if (mesAtual < 1) { mesAtual = TOTAL_MESES; anoAtual--; }
    renderizarCalendario();
}

function mudarAno(valor) {
    anoAtual += valor;
    renderizarCalendario();
}

function irParaHoje() {
    const hoje = new Date();
    anoAtual = hoje.getFullYear();
    const numeroDoDia = Math.floor((hoje - new Date(anoAtual, 0, 1)) / (1000 * 60 * 60 * 24)) + 1;

    if (ehBissexto(anoAtual) && numeroDoDia === 366) {
        mesAtual = TOTAL_MESES;
        renderizarCalendario();
        extraDays?.querySelector(".dia-bissexto")?.classList.add("selected");
        return;
    }

    mesAtual = obterMesDoCalendario(numeroDoDia);
    const dia = obterDiaDoMes(numeroDoDia, mesAtual);

    renderizarCalendario();

    const elementos = document.querySelectorAll(".day");
    if (elementos[dia - 1]) {
        selecionarDia(anoAtual, mesAtual, dia, obterDataGregoriana(anoAtual, mesAtual, dia), elementos[dia - 1]);
    }
}

/* Event Listeners */
window.addEventListener("resize", posicionarCalendarioCircular);
document.getElementById("prevMonth")?.addEventListener("click", () => mudarMes(-1));
document.getElementById("nextMonth")?.addEventListener("click", () => mudarMes(1));
document.getElementById("prevYear")?.addEventListener("click", () => mudarAno(-1));
document.getElementById("nextYear")?.addEventListener("click", () => mudarAno(1));
document.getElementById("todayButton")?.addEventListener("click", irParaHoje);

/* Inicialização */
renderizarCalendario();
irParaHoje();