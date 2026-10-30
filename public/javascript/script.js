'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// =========================================================
// SUPABASE CONFIGURAÇÃO GLOBAL
// =========================================================
const SUPABASE_URL = "https://aqaaclqbeguloxqjfgtn.supabase.co";
const SUPABASE_KEY = "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ScriptManager() {
    useEffect(() => {
        // =========================================================
        // SELETORES PRINCIPAIS (Seguros no ciclo de vida do cliente)
        // =========================================================
        const menuToggle = document.querySelector(".menu-toggle");
        const submenu = document.querySelector(".submenu");
        const inputCampo = document.getElementById("search_camp");
        const languageSelector = document.getElementById("language-selector");
        const inputCampCode = document.querySelector(".Camp_code input");

        // =========================================================
        // ATUALIZAR MENU DE AUTENTICAÇÃO
        // =========================================================
        function atualizarMenuAuth(session) {
            const cadastro = document.querySelector("#nav-cadastro");
            const login = document.querySelector("#nav-login");
            const perfil = document.querySelector("#nav-perfil");

            if (session) {
                console.log("Usuário logado:", session.user);
                if (cadastro) cadastro.style.display = "none";
                if (login) login.style.display = "none";
                if (perfil) perfil.style.display = "";
            } else {
                console.log("Nenhum usuário logado.");
                if (cadastro) cadastro.style.display = "";
                if (login) login.style.display = "";
                if (perfil) perfil.style.display = "none";
            }
        }

        // =========================================================
        // VERIFICAR SESSÃO ATUAL
        // =========================================================
        async function verificarSessao() {
            try {
                const { data: { session }, error } = await supabaseClient.auth.getSession();
                if (error) {
                    console.error("Erro ao verificar sessão:", error);
                    return;
                }
                atualizarMenuAuth(session);
            } catch (erro) {
                console.error("Erro na verificação da sessão:", erro);
            }
        }

        // =========================================================
        // OBSERVAR ALTERAÇÕES DE AUTENTICAÇÃO
        // =========================================================
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log("Evento de autenticação:", event);
            atualizarMenuAuth(session);
        });

        // =========================================================
        // FUNÇÃO: EFEITO DE FUNDO MATRIX (EXPANDIDO COM CONTROLE)
        // =========================================================
        let matrixControl = {
            toggle: null,
            isAtivo: true
        };

        const canvas = document.getElementById("matrix-canvas");
        let timer = null;
        let resizeHandler = null;
        let visibilityHandler = null;

        if (canvas) {
            const ctx = canvas.getContext("2d", { alpha: true });
            
            if (ctx) {
                const scale = window.innerWidth < 768 ? 0.6 : 1;
                const fontSize = 14 * scale;

                const characters = Array.from(
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" +
                    "☉☽☿♀♂♃♄♅♆♇∞∑∫√" +
                    "←↑→↓↔±×÷≠≈≤≥" +
                    "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ" +
                    "अआइईउऊऋएऐओऔकखगghचछजझटठडढतथदधनपफबभमयरलवशषसह" +
                    "אבגדהוזחטיכלמנסעפצקרשת"
                );

                let columns = 0;
                let drops = [];

                function resizeCanvas() {
                    const width = window.innerWidth;
                    const height = window.innerHeight;

                    canvas.width = Math.floor(width * scale);
                    canvas.height = Math.floor(height * scale);

                    columns = Math.ceil(canvas.width / fontSize);
                    drops = Array.from({ length: columns }, () => 1);
                }

                function drawMatrix() {
                    ctx.fillStyle = "rgba(44, 44, 44, 0.1)";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.fillStyle = "#ccffcc";
                    ctx.font = `${fontSize}px monospace`;

                    for (let i = 0; i < columns; i++) {
                        const text = characters[Math.floor(Math.random() * characters.length)];

                        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                            drops[i] = 0;
                        }

                        drops[i]++;
                    }
                }

                function tick() {
                    if (document.hidden || !matrixControl.isAtivo) {
                        timer = null;
                        return;
                    }

                    drawMatrix();
                    timer = setTimeout(tick, 38);
                }

                function stop() {
                    if (timer !== null) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }

                function start() {
                    if (timer === null && !document.hidden && matrixControl.isAtivo) {
                        tick();
                    }
                }

                resizeHandler = () => {
                    resizeCanvas();
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                };

                resizeCanvas();
                window.addEventListener("resize", resizeHandler);

                visibilityHandler = () => {
                    if (document.hidden) {
                        stop();
                    } else {
                        start();
                    }
                };
                document.addEventListener("visibilitychange", visibilityHandler);

                matrixControl.toggle = function(forcarEstado) {
                    matrixControl.isAtivo = forcarEstado !== undefined ? forcarEstado : !matrixControl.isAtivo;
                    
                    const btn = document.getElementById("matrixToggleBtn");
                    if (btn) {
                        btn.textContent = matrixControl.isAtivo ? "Matrix: ON" : "Matrix: OFF";
                        btn.classList.toggle("ativo", matrixControl.isAtivo);
                        btn.classList.toggle("inativo", !matrixControl.isAtivo);
                    }

                    localStorage.setItem("matrixAtivo", matrixControl.isAtivo);

                    if (matrixControl.isAtivo) {
                        canvas.style.display = "block";
                        start();
                    } else {
                        stop();
                        canvas.style.display = "none";
                    }
                };

                const salvo = localStorage.getItem("matrixAtivo");
                const estadoInicial = salvo !== null ? salvo === "true" : true;
                matrixControl.toggle(estadoInicial);
            }
        }

        // =========================================================
        // FUNÇÃO: AÇÃO DE BUSCA
        // =========================================================
        function realizarBusca(input = inputCampo) {
            const valor = input?.value.trim();

            if (valor) {
                // Ajustado para rotas do Next.js (sem .html, ou adapte se usar ficheiros estáticos)
                window.location.href = `/${valor}`; 
            } else {
                alert("Campo vazio");
            }
        }

        // =========================================================
        // FUNÇÃO: ALTERNAR MENU
        // =========================================================
        function alternarMenu() {
            submenu?.classList.toggle("ativo");
        }

        // =========================================================
        // FUNÇÃO AUXILIAR: ABRIR E FECHAR CONTEÚDO COM ANIMAÇÃO
        // =========================================================
        function abrirConteudo(content) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.addEventListener("transitionend", () => {
                content.style.maxHeight = "none";
            }, { once: true });
        }

        function fecharConteudo(content) {
            content.style.maxHeight = content.scrollHeight + "px";
            requestAnimationFrame(() => {
                content.style.maxHeight = "0";
            });
        }

        // Armazenar referências para remover eventos no cleanup
        const detailsCleanups = [];

        function configurarAnimacoesDetails() {
            document.querySelectorAll(".custom-details").forEach(details => {
                const summaryBtn = details.querySelector(".summary-btn");
                const summaryIcon = details.querySelector(".summary_icon");
                const content = details.querySelector(".details-content");

                if (!summaryBtn || !content) return;

                content.style.maxHeight = "0";

                const clickHandler = () => {
                    const isOpen = details.classList.contains("open");

                    if (isOpen) {
                        fecharConteudo(content);
                        details.classList.remove("open");
                        summaryIcon?.classList.remove("ativo");
                    } else {
                        abrirConteudo(content);
                        details.classList.add("open");
                        summaryIcon?.classList.add("ativo");
                    }
                };

                summaryBtn.addEventListener("click", clickHandler);
                detailsCleanups.push({ summaryBtn, clickHandler });
            });
        }

        // =========================================================
        // FUNÇÃO: TROCAR IDIOMA DA PÁGINA (Caminho absoluto na public)
        // =========================================================
        function trocarIdioma(lang) {
            fetch(`/json/${lang}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Ficheiro de idioma não encontrado");
                    }
                    return response.json();
                })
                .then(data => {
                    document.querySelectorAll("[data-i18n]").forEach(el => {
                        const chave = el.getAttribute("data-i18n");
                        if (data[chave]) {
                            el.textContent = data[chave];
                        }
                    });
                    localStorage.setItem("lang", lang);
                })
                .catch(err => {
                    console.error("Erro ao carregar idioma:", err);
                });
        }

        // =========================================================
        // ADICIONAR EVENT LISTENERS
        // =========================================================
        const onMenuClick = alternarMenu;
        menuToggle?.addEventListener("click", onMenuClick);

        const onLanguageChange = () => {
            trocarIdioma(languageSelector.value);
        };
        languageSelector?.addEventListener("change", onLanguageChange);

        const onCampCodeKeydown = e => {
            if (e.key === "Enter") realizarBusca(inputCampCode);
        };
        inputCampCode?.addEventListener("keydown", onCampCodeKeydown);

        const onInputCampoKeydown = e => {
            if (e.key === "Enter") realizarBusca(inputCampo);
        };
        inputCampo?.addEventListener("keydown", onInputCampoKeydown);

        const bandeiraListeners = [];
        document.querySelectorAll(".Band_pas").forEach(bandeira => {
            const handler = () => {
                const lang = bandeira.getAttribute("data-lang");
                if (lang) {
                    trocarIdioma(lang);
                    console.log(`Idioma alterado para: ${lang}`);
                }
            };
            bandeira.addEventListener("click", handler);
            bandeiraListeners.push({ bandeira, handler });
        });

        // =========================================================
        // INICIALIZAÇÃO
        // =========================================================
        configurarAnimacoesDetails();
        verificarSessao();

        const idiomaSalvo = localStorage.getItem("lang") || "pt-br";
        if (languageSelector) {
            languageSelector.value = idiomaSalvo;
        }
        trocarIdioma(idiomaSalvo);

        // =========================================================
        // CLEANUP (Executado ao desmontar o componente)
        // =========================================================
        return () => {
            if (timer) clearTimeout(timer);
            if (resizeHandler) window.removeEventListener("resize", resizeHandler);
            if (visibilityHandler) document.removeEventListener("visibilitychange", visibilityHandler);
            
            authListener?.subscription?.unsubscribe();

            menuToggle?.removeEventListener("click", onMenuClick);
            languageSelector?.removeEventListener("change", onLanguageChange);
            inputCampCode?.removeEventListener("keydown", onCampCodeKeydown);
            inputCampo?.removeEventListener("keydown", onInputCampoKeydown);

            bandeiraListeners.forEach(({ bandeira, handler }) => {
                bandeira.removeEventListener("click", handler);
            });

            detailsCleanups.forEach(({ summaryBtn, clickHandler }) => {
                summaryBtn.removeEventListener("click", clickHandler);
            });
        };
    }, []);

    return null; // Componente focado na gestão de comportamentos globais e scripts
}