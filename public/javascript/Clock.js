'use client';

import { useEffect } from 'react';

// =========================================================
// CONSTANTES E CONFIGURAÇÕES DO CALENDÁRIO CÓSMICO
// =========================================================
const TOTAL_DIAS_ANO = 729; // 3^6[cite: 1]
const TOTAL_SETORES = 9;     // 9 Setores / Meses estruturais[cite: 1]
const DIAS_POR_SETOR = 81;   // 3^4 dias por setor[cite: 1]
const DIAS_POR_SEMANA = 9;   // 3^2 dias por semana[cite: 1]
const SEMANAS_POR_SETOR = DIAS_POR_SETOR / DIAS_POR_SEMANA; // 9 semanas por setor[cite: 1]

const SEGUNDOS_NO_DIA_CUSTOM = (12 * 3600) + (1 * 60) + 27; // 12h 01min 27s
const DURACAO_DIA_MS = SEGUNDOS_NO_DIA_CUSTOM * 1000;
const SEGUNDOS_NO_ANO_CUSTOM = TOTAL_DIAS_ANO * SEGUNDOS_NO_DIA_CUSTOM;

const MARCO_ZERO_COSMICO = new Date(2026, 0, 1, 0, 0, 0).getTime();

const nomesSetores = [
    "Sūrya", "Budha", "Śukra", "Chandra", "Maṅgala", 
    "Bṛhaspati", "Śani", "Uranas", "Neptunas"
];

const regenciasDiariasDoRelogio = [
    { nome: "Sūrya (Sol)", icone: "☉", img: "/img/Silhueta/Symb/Cosmo/Sol.png", atributo: "Identidade" },
    { nome: "Budha (Mercúrio)", icone: "☿", img: "/img/Silhueta/Symb/Cosmo/Mercurio.png", atributo: "Comunicação" },
    { nome: "Śukra (Vênus)", icone: "♀", img: "/img/Silhueta/Symb/Cosmo/Venus.png", atributo: "Desejo" },
    { nome: "Chandra (Lua)", icone: "☽", img: "/img/Silhueta/Symb/Cosmo/Lua.png", atributo: "Emoção" },
    { nome: "Maṅgala (Marte)", icone: "♂", img: "/img/Silhueta/Symb/Cosmo/Marte.png", atributo: "Ação" },
    { nome: "Bṛhaspati (Júpiter)", icone: "♃", img: "/img/Silhueta/Symb/Cosmo/Jupiter.png", atributo: "Expansão" },
    { nome: "Śani (Saturno)", icone: "♄", img: "/img/Silhueta/Symb/Cosmo/Saturno.png", atributo: "Disciplina" },
    { nome: "Urano", icone: "⛢", img: "/img/Silhueta/Symb/Cosmo/Urano.png", atributo: "Inovação" },
    { nome: "Netuno", icone: "♆", img: "/img/Silhueta/Symb/Cosmo/Netuno.png", atributo: "Imaginação" }
];

const LISTA_SIGNOS = [
    { nome: "Capricórnio", icone: "♑", img: "/img/Silhueta/Signos/Capricornio.png", elemento: "Terra" },
    { nome: "Aquário", icone: "♒", img: "/img/Silhueta/Signos/Aquario.png", elemento: "Ar" },
    { nome: "Peixes", icone: "♓", img: "/img/Silhueta/Signos/Peixes.png", elemento: "Água" },
    { nome: "Áries", icone: "♈", img: "/img/Silhueta/Signos/Aries.png", elemento: "Fogo" },
    { nome: "Touro", icone: "♉", img: "/img/Silhueta/Signos/Touro.png", elemento: "Terra" },
    { nome: "Gêmeos", icone: "♊", img: "/img/Silhueta/Signos/Gemeos.png", elemento: "Ar" },
    { nome: "Câncer", icone: "♋", img: "/img/Silhueta/Signos/Cancer.png", elemento: "Água" },
    { nome: "Leão", icone: "♌", img: "/img/Silhueta/Signos/Leao.png", elemento: "Fogo" },
    { nome: "Virgem", icone: "♍", img: "/img/Silhueta/Signos/Virgem.png", elemento: "Terra" },
    { nome: "Libra", icone: "♎", img: "/img/Silhueta/Signos/Libra.png", elemento: "Ar" },
    { nome: "Escorpião", icone: "♏", img: "/img/Silhueta/Signos/Escorpiao.png", elemento: "Água" }, // Caminho corrigido com barra inicial
    { nome: "Sagitário", icone: "♐", img: "/img/Silhueta/Signos/Sagitario.png", elemento: "Fogo" }
];

export default function CalendarioCosmico() {
    useEffect(() => {
        let anoAtual = 2026;
        let setorAtual = 1;
        let diaSelecionadoInfo = null;
        let timelineSegmentsCache = [];
        let audioCtx = null;
        let ultimoIndicePlaneta = null;
        let ultimoSegundoVerificado = -1;
        let animationFrameId = null;

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
            
            timelineContainer: document.getElementById("timelineSegmentsContainer"),
            timelineProgressFill: document.getElementById("timelineProgressFill"),

            pNum1: document.getElementById("pNum1"),
            pNum2: document.getElementById("pNum2"),
            pNum3: document.getElementById("pNum3"),
            pDigit1: document.getElementById("pDigit1"),
            pDigit2: document.getElementById("pDigit2"),
            pDigit3: document.getElementById("pDigit3"),
            
            miniClockTime: document.getElementById("miniClockTime"),
            miniClockDate: document.getElementById("miniClockDate"),
            miniClockIcon: document.getElementById("miniClockIcon"),
            
            resetClockCounter: document.getElementById("resetClockCounter"),
            resetClockProgress: document.getElementById("resetClockProgress"),
            resetClockIcon: document.getElementById("resetClockIcon"),

            totalSecondsCounter: document.getElementById("totalSecondsCounter"),
            totalSecondsIcon: document.getElementById("totalSecondsIcon"),

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

        const obterSemanaDoSetor = (dia) => Math.floor((dia - 1) / DIAS_POR_SEMANA) + 1;
        const obterDiaDaSemana = (dia) => ((dia - 1) % DIAS_POR_SEMANA) + 1;

        function reduzirNumero(numero) {
            let num = numero;
            while (num >= 10) {
                let soma = 0;
                let temp = num;
                while (temp > 0) {
                    soma += temp % 10;
                    temp = Math.floor(temp / 10);
                }
                num = soma;
            }
            return num;
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

        function calcularSignoSolar(data) {
            const mes = data.getMonth() + 1;
            const dia = data.getDate();

            let nomeSigno = "Capricórnio";
            let grau = 0;

            if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) { nomeSigno = "Áries"; }
            else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) { nomeSigno = "Touro"; }
            else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) { nomeSigno = "Gêmeos"; }
            else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) { nomeSigno = "Câncer"; }
            else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) { nomeSigno = "Leão"; }
            else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) { nomeSigno = "Virgem"; }
            else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) { nomeSigno = "Libra"; }
            else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) { nomeSigno = "Escorpião"; }
            else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) { nomeSigno = "Sagitário"; }
            else if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) { nomeSigno = "Capricórnio"; }
            else if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) { nomeSigno = "Aquário"; }
            else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) { nomeSigno = "Peixes"; }

            const inicioSignoMap = {
                "Áries": new Date(data.getFullYear(), 2, 21),
                "Touro": new Date(data.getFullYear(), 3, 20),
                "Gêmeos": new Date(data.getFullYear(), 4, 21),
                "Câncer": new Date(data.getFullYear(), 5, 21),
                "Leão": new Date(data.getFullYear(), 6, 23),
                "Virgem": new Date(data.getFullYear(), 7, 23),
                "Libra": new Date(data.getFullYear(), 8, 23),
                "Escorpião": new Date(data.getFullYear(), 9, 23),
                "Sagitário": new Date(data.getFullYear(), 10, 22),
                "Capricórnio": mes === 1 ? new Date(data.getFullYear() - 1, 11, 22) : new Date(data.getFullYear(), 11, 22),
                "Aquário": new Date(data.getFullYear(), 0, 20),
                "Peixes": new Date(data.getFullYear(), 1, 19)
            };

            const dataInicio = inicioSignoMap[nomeSigno];
            if (dataInicio) {
                const diffDias = Math.floor((data - dataInicio) / 86400000);
                grau = Math.max(0, Math.min(29, diffDias));
            }

            const objetoSigno = LISTA_SIGNOS.find(s => s.nome === nomeSigno) || LISTA_SIGNOS[0];
            return { ...objetoSigno, grau };
        }

        function calcularSignoLunar(data) {
            const EPOCH = new Date(2000, 0, 1, 12, 0, 0).getTime(); 
            const diasDesdeEpoch = (data.getTime() - EPOCH) / 86400000;

            let L = 218.316 + 13.176396 * diasDesdeEpoch;
            L = L % 360;
            if (L < 0) L += 360;

            const M = (134.963 + 13.064993 * diasDesdeEpoch) % 360;
            const longitudeEclipticaLua = L + 6.289 * Math.sin(M * (Math.PI / 180));

            const grausNormalizados = (longitudeEclipticaLua + 360) % 360;
            const grausAjustados = (grausNormalizados - 270 + 360) % 360;
            
            const indiceSigno = Math.floor(grausAjustados / 30) % 12;
            const grau = Math.floor(grausAjustados % 30);

            const signoObj = LISTA_SIGNOS[indiceSigno] || LISTA_SIGNOS[0];
            return { ...signoObj, grau };
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

        function calcularEstacaoLocal(data) {
            const mes = data.getMonth() + 1;
            if (mes >= 11 || mes <= 5) return { nome: "Período Chuvoso", icone: "🌧️", descricao: "Inverno Amazônico (Águas)" };
            return { nome: "Período Seco", icone: "☀️", descricao: "Verão Amazônico (Estiagem)" };
        }

        function calcularRegenciaPlanetaria(setor, dia) {
            return regenciasDiariasDoRelogio[(dia - 1) % regenciasDiariasDoRelogio.length];
        }

        function obterTempoCosmicoAtual() {
            const milissegundosTotaisDecorridos = Date.now() - MARCO_ZERO_COSMICO;
            if (milissegundosTotaisDecorridos < 0) return { diaAbsoluto: 1, anoCosmico: 2026, setor: 1, diaDoSetor: 1, parte1: 0, parte2: 0, parte3: 0, segundosNoDiaAtual: 0 };

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

        function obterAudioContext() {
            if (!audioCtx) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) audioCtx = new AudioContextClass();
            }
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            return audioCtx;
        }

        const handleFirstClick = () => obterAudioContext();
        window.addEventListener('click', handleFirstClick, { once: true });

        function criarSegmentosTimelineCircular() {
            if (DOM.timelineContainer) {
                DOM.timelineContainer.innerHTML = "";
                timelineSegmentsCache = [];
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < 9; i++) {
                    const segment = document.createElement("div");
                    segment.className = "timeline-arc-segment";
                    const regente = regenciasDiariasDoRelogio[i];
                    segment.textContent = regente.icone;
                    segment.title = `Período ${i + 1}: ${regente.nome}`;
                    fragment.appendChild(segment);
                    timelineSegmentsCache.push(segment);
                }
                DOM.timelineContainer.appendChild(fragment);
            }
        }

        function atualizarMiniRelogioContinuo() {
            if (!DOM.miniClockTime || !DOM.miniClockDate) return;
            const tempo = obterTempoCosmicoAtual();
            const p1 = String(tempo.parte1).padStart(2, '0');
            const p2 = String(tempo.parte2).padStart(2, '0');
            const p3 = String(tempo.parte3).padStart(2, '0');
            
            DOM.miniClockTime.textContent = `${p1}:${p2}:${p3}`;
            DOM.miniClockDate.textContent = `Dia ${tempo.diaAbsoluto} (${nomesSetores[tempo.setor - 1]})`;

            const percentualDia = (tempo.segundosNoDiaAtual / SEGUNDOS_NO_DIA_CUSTOM) * 100;
            if (DOM.timelineProgressFill) DOM.timelineProgressFill.style.width = `${percentualDia}%`;

            const duracaoPeriodo = SEGUNDOS_NO_DIA_CUSTOM / 9;
            const indicePeriodo = Math.max(0, Math.min(8, Math.floor(tempo.segundosNoDiaAtual / duracaoPeriodo)));

            if (ultimoIndicePlaneta !== indicePeriodo) {
                ultimoIndicePlaneta = indicePeriodo;
                const regente = regenciasDiariasDoRelogio[indicePeriodo];
                if (DOM.miniClockIcon) DOM.miniClockIcon.textContent = regente.icone;
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

            const idxP1 = Math.min(8, Math.floor((tempo.parte1 / 100) * 9));
            const idxP2 = Math.min(8, Math.floor((tempo.parte2 / 100) * 9));
            const idxP3 = Math.min(8, Math.floor((tempo.parte3 / 100) * 9));

            if (DOM.pNum1) DOM.pNum1.textContent = p1;
            if (DOM.pNum2) DOM.pNum2.textContent = p2;
            if (DOM.pNum3) DOM.pNum3.textContent = p3;

            if (DOM.pDigit1) DOM.pDigit1.textContent = regenciasDiariasDoRelogio[idxP1].icone;
            if (DOM.pDigit2) DOM.pDigit2.textContent = regenciasDiariasDoRelogio[idxP2].icone;
            if (DOM.pDigit3) DOM.pDigit3.textContent = regenciasDiariasDoRelogio[idxP3].icone;

            const segundoAtual = Math.floor(tempo.segundosNoDiaAtual);
            if (segundoAtual !== ultimoSegundoVerificado) {
                ultimoSegundoVerificado = segundoAtual;
                atualizarRelogioDeResets();
                atualizarRelogioDeSegundosTotais();

                if (diaSelecionadoInfo && ehHoje(diaSelecionadoInfo.data)) {
                    atualizarPainelAstronomia(new Date());
                }
            }
        }

        function ehHoje(data) {
            const hoje = new Date();
            return data.getDate() === hoje.getDate() &&
                   data.getMonth() === hoje.getMonth() &&
                   data.getFullYear() === hoje.getFullYear();
        }

        function atualizarRelogioDeResets() {
            if (!DOM.resetClockCounter) return;
            const ms = Date.now() - MARCO_ZERO_COSMICO;
            if (ms < 0) return;
            const seg = ms / 1000;
            const resets = Math.floor(seg / SEGUNDOS_NO_ANO_CUSTOM);
            const dia = Math.floor((seg % SEGUNDOS_NO_ANO_CUSTOM) / SEGUNDOS_NO_DIA_CUSTOM) + 1;
            DOM.resetClockCounter.textContent = `RESET: ${resets} (Dia ${dia}/${TOTAL_DIAS_ANO})`;
            DOM.resetClockProgress.textContent = `${(((seg % SEGUNDOS_NO_ANO_CUSTOM) / SEGUNDOS_NO_ANO_CUSTOM) * 100).toFixed(2)}%`;
        }

        function atualizarRelogioDeSegundosTotais() {
            if (!DOM.totalSecondsCounter) return;
            const ms = Date.now() - MARCO_ZERO_COSMICO;
            if (ms < 0) {
                DOM.totalSecondsCounter.textContent = "0 s";
                return;
            }
            const segundosTotais = Math.floor(ms / 1000);
            DOM.totalSecondsCounter.textContent = `${segundosTotais.toLocaleString("pt-BR")} s`;
        }

        function loop() {
            atualizarMiniRelogioContinuo();
            animationFrameId = requestAnimationFrame(loop);
        }
        animationFrameId = requestAnimationFrame(loop);

        function posicionarElementosCirculares(seletor, raioFator) {
            const elementos = document.querySelectorAll(seletor);
            const total = elementos.length;
            if (!total || !DOM.daysContainer) return;

            const raio = Math.min(DOM.daysContainer.clientWidth, DOM.daysContainer.clientHeight) * raioFator;
            const isWeekday = seletor.includes("weekday");
            const anguloFatia = (Math.PI * 2) / total;

            elementos.forEach((elemento, indice) => {
                const angulo = isWeekday ? (indice / total) * Math.PI * 2 + (anguloFatia / 2) - Math.PI / 2 : (indice / total) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angulo) * raio;
                const y = Math.sin(angulo) * raio;
                elemento.style.transform = isWeekday ? `translate(-50%, -50%) translate(${x}px, ${y}px)` : `translate(${x}px, ${y}px)`;
            });
        }

        function posicionarCalendarioCircular() {
            posicionarElementosCirculares(".day", 0.46);
            posicionarElementosCirculares(".weekdays div", 0.35);
        }

        function renderizarAnelMeses() {
            const containerMeses = document.getElementById("calendarMonthsRing");
            if (!containerMeses) return;

            containerMeses.innerHTML = "";
            const anguloPorSetor = 40;
            const indiceSetor = setorAtual - 1;
            const rotacaoInicial = (indiceSetor * anguloPorSetor);

            const indicadorAtivo = document.createElement("div");
            indicadorAtivo.className = "month-active-indicator";
            indicadorAtivo.style.transform = `rotate(${rotacaoInicial}deg)`;
            
            containerMeses.appendChild(indicadorAtivo);
        }

        function atualizarPainelAstronomia(dataParaCalculo) {
            const info = diaSelecionadoInfo || {
                ano: anoAtual,
                setor: setorAtual,
                dia: 1,
                data: new Date()
            };

            const semana = obterSemanaDoSetor(info.dia);           
            const diaSemana = obterDiaDaSemana(info.dia);         
            const triadeDoSetor = Math.ceil(semana / 3);       
            const diaAbsoluto = ((info.setor - 1) * DIAS_POR_SETOR) + info.dia;

            if (DOM.selectedDate) DOM.selectedDate.textContent = `${nomesSetores[info.setor - 1]} — Dia ${info.dia} → ${reduzirNumero(info.dia)}`;
            if (DOM.gregorianDate) DOM.gregorianDate.textContent = `Gregoriana: ${formatarData(info.data)}`;
            
            if (DOM.dayOfYear) {
                DOM.dayOfYear.textContent = `Tríade ${triadeDoSetor} — Semana ${semana} (Dia ${diaSemana}/9) — Dia ${diaAbsoluto}/${TOTAL_DIAS_ANO}`;
            }

            const sol = calcularSignoSolar(dataParaCalculo);
            const lua = calcularFaseLua(dataParaCalculo);
            const luaSigno = calcularSignoLunar(dataParaCalculo);
            const estacao = calcularEstacaoLocal(dataParaCalculo);
            const planeta = calcularRegenciaPlanetaria(info.setor, info.dia);

            renderizarIconeOuImagem(DOM.sunIcon, sol);
            renderizarIconeOuImagem(DOM.planetIcon, planeta);

            if (DOM.planetName) DOM.planetName.textContent = planeta.nome;
            if (DOM.planetAspect) DOM.planetAspect.textContent = `Atributo: ${planeta.atributo}`;
            if (DOM.sunSignName) DOM.sunSignName.textContent = sol.nome;
            if (DOM.sunDegree) DOM.sunDegree.textContent = `Grau: ${sol.grau}°`;
            if (DOM.sunElement) DOM.sunElement.textContent = `Elemento: ${sol.elemento}`;
            if (DOM.seasonIcon) DOM.seasonIcon.textContent = estacao.icone;
            if (DOM.seasonName) DOM.seasonName.textContent = estacao.nome;
            if (DOM.seasonDesc) DOM.seasonDesc.textContent = estacao.descricao;
            if (DOM.moonIcon) DOM.moonIcon.textContent = lua.icone;
            if (DOM.moonPhaseName) DOM.moonPhaseName.textContent = lua.nomeFase;

            const imgLua = luaSigno.img ? `<img src="${luaSigno.img}" style="width:16px;vertical-align:middle;" alt="Lua" />` : luaSigno.icone;
            if (DOM.moonSign) DOM.moonSign.innerHTML = `Signo: ${imgLua} ${luaSigno.nome}`;
            if (DOM.moonDegree) DOM.moonDegree.textContent = `Grau: ${luaSigno.grau}°`;
            if (DOM.moonIllumination) DOM.moonIllumination.textContent = `Iluminação: ${lua.iluminacao}%`;
            if (DOM.moonAge) DOM.moonAge.textContent = `Idade: ${lua.idadeLunar} dias`;

            if (DOM.sunInfo) DOM.sunInfo.textContent = `☀️ ${sol.icone} ${sol.nome} (${sol.grau}°)`;
            if (DOM.moonInfo) DOM.moonInfo.textContent = `🌑 ${lua.icone} ${lua.nomeFase} (${lua.iluminacao}%)`;
        }

        function selecionarDia(ano, setor, dia, data, elemento) {
            document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));
            if (elemento) elemento.classList.add("selected");

            diaSelecionadoInfo = { ano, setor, dia, data };

            const dataCalculo = ehHoje(data) ? new Date() : data;
            atualizarPainelAstronomia(dataCalculo);
        }

        function atualizarDiasDaSemana() {
            if (!DOM.weekdaysContainer) return;
            DOM.weekdaysContainer.innerHTML = "";
            const fragment = document.createDocumentFragment();
            for (let s = 1; s <= SEMANAS_POR_SETOR; s++) {
                const el = document.createElement("div");
                el.className = "weekday";
                el.textContent = s;
                el.dataset.semana = s;
                fragment.appendChild(el);
            }
            DOM.weekdaysContainer.appendChild(fragment);
        }

        function renderizarDias() {
            if (!DOM.daysContainer) return;
            DOM.daysContainer.innerHTML = "";
            const fragment = document.createDocumentFragment();
            for (let dia = 1; dia <= DIAS_POR_SETOR; dia++) {
                const el = document.createElement("div");
                const semana = obterSemanaDoSetor(dia);
                el.className = `day semana-${semana}`;
                el.dataset.semana = semana;
                el.addEventListener("click", () => selecionarDia(anoAtual, setorAtual, dia, obterDataGregoriana(anoAtual, setorAtual, dia), el));
                fragment.appendChild(el);
            }
            DOM.daysContainer.appendChild(fragment);
            requestAnimationFrame(posicionarCalendarioCircular);
        }

        function renderizarCalendario() {
            const mesNome = nomesSetores[setorAtual - 1];
            if (DOM.monthName) DOM.monthName.textContent = mesNome;
            if (DOM.yearDisplay) DOM.yearDisplay.textContent = anoAtual;
            if (DOM.yearNumerology) DOM.yearNumerology.textContent = reduzirNumero(anoAtual);
            if (DOM.centerMonth) DOM.centerMonth.textContent = mesNome;
            if (DOM.centerYear) DOM.centerYear.textContent = anoAtual;

            atualizarDiasDaSemana();
            renderizarDias();
            renderizarAnelMeses();
        }

        function mudarSetor(v) {
            setorAtual += v;
            if (setorAtual > TOTAL_SETORES) { setorAtual = 1; anoAtual++; }
            if (setorAtual < 1) { setorAtual = TOTAL_SETORES; anoAtual--; }
            renderizarCalendario();
            verificarHojeOuLimpar();
        }

        function mudarAno(v) {
            anoAtual += v;
            renderizarCalendario();
            verificarHojeOuLimpar();
        }

        function verificarHojeOuLimpar() {
            const t = obterTempoCosmicoAtual();
            if (anoAtual === t.anoCosmico && setorAtual === t.setor) {
                const els = DOM.daysContainer?.children;
                if (els && els[t.diaDoSetor - 1]) {
                    selecionarDia(anoAtual, setorAtual, t.diaDoSetor, obterDataGregoriana(anoAtual, setorAtual, t.diaDoSetor), els[t.diaDoSetor - 1]);
                }
            } else {
                document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));
                diaSelecionadoInfo = null;
            }
        }

        function irParaHoje() {
            const t = obterTempoCosmicoAtual();
            anoAtual = t.anoCosmico;
            setorAtual = t.setor;
            renderizarCalendario();
            const els = DOM.daysContainer?.children;
            if (els && els[t.diaDoSetor - 1]) {
                els[t.diaDoSetor - 1].classList.add("today");
                selecionarDia(anoAtual, setorAtual, t.diaDoSetor, obterDataGregoriana(anoAtual, setorAtual, t.diaDoSetor), els[t.diaDoSetor - 1]);
            } else {
                selecionarDia(anoAtual, setorAtual, t.diaDoSetor, obterDataGregoriana(anoAtual, setorAtual, t.diaDoSetor), null);
            }
        }

        const handleResize = () => posicionarCalendarioCircular();
        window.addEventListener("resize", handleResize);

        const prevMonthBtn = document.getElementById("prevMonth");
        const nextMonthBtn = document.getElementById("nextMonth");
        const prevYearBtn = document.getElementById("prevYear");
        const nextYearBtn = document.getElementById("nextYear");
        const todayBtn = document.getElementById("todayButton");

        const onPrevMonth = () => mudarSetor(-1);
        const onNextMonth = () => mudarSetor(1);
        const onPrevYear = () => mudarAno(-1);
        const onNextYear = () => mudarAno(1);
        const onToday = () => irParaHoje();

        prevMonthBtn?.addEventListener("click", onPrevMonth);
        nextMonthBtn?.addEventListener("click", onNextMonth);
        prevYearBtn?.addEventListener("click", onPrevYear);
        nextYearBtn?.addEventListener("click", onNextYear);
        todayBtn?.addEventListener("click", onToday);

        criarSegmentosTimelineCircular();
        renderizarCalendario();
        irParaHoje();

        // Cleanup ao desmontar o componente
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener('click', handleFirstClick);
            prevMonthBtn?.removeEventListener("click", onPrevMonth);
            nextMonthBtn?.removeEventListener("click", onNextMonth);
            prevYearBtn?.removeEventListener("click", onPrevYear);
            nextYearBtn?.removeEventListener("click", onNextYear);
            todayBtn?.removeEventListener("click", onToday);
        };
    }, []);

    return (
        <div className="calendario-cosmico-container">
            {/* O JSX estrutural correspondente deve ser inserido aqui. 
              Certifique-se de que os IDs utilizados no script (como id="days", id="monthName", etc.) 
              estejam presentes nos elementos HTML/JSX abaixo. */}
        </div>
    );
}