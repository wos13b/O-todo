// ===== Seletores principais =====
const menuToggle = document.querySelector(".menu-toggle");
const submenu = document.querySelector(".submenu");
const inputCampo = document.getElementById("search_camp");
const butt_clk = document.querySelector(".butt_clk");
const languageSelector = document.getElementById("language-selector");

// ===== Função: Ação de busca =====
function realizarBusca() {
  const valor = inputCampo?.value.trim();
  if (valor) {
    window.location.href = `${valor}.html`;
  } else {
    alert("Campo vazio");
  }
}

// ===== Função: Alternar menu lateral =====
function alternarMenu() {
  submenu?.classList.toggle("ativo");
}

// ===== Função auxiliar: Abre o conteúdo com animação =====
function abrirConteudo(content) {
  content.style.maxHeight = content.scrollHeight + "px";
  content.addEventListener(
    "transitionend",
    () => {
      content.style.maxHeight = "none";
    },
    { once: true }
  );
}

// ===== Função auxiliar: Fecha o conteúdo com animação =====
function fecharConteudo(content) {
  content.style.maxHeight = content.scrollHeight + "px";
  requestAnimationFrame(() => {
    content.style.maxHeight = "0";
  });
}

// ===== Função: Controlar animação dos <details> personalizados =====
function configurarAnimacoesDetails() {
  document.querySelectorAll(".custom-details").forEach(details => {
    const summaryBtn = details.querySelector(".summary-btn");
    const summaryIcon = details.querySelector(".summary_icon");
    const content = details.querySelector(".details-content");

    if (!summaryBtn || !content) return;

    content.style.maxHeight = "0";

    summaryBtn.addEventListener("click", () => {
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
    });
  });
}

// ===== Função: Trocar idioma da página =====
function trocarIdioma(lang) {
  fetch(`json/${lang}.json`)
    .then(response => {
      if (!response.ok) throw new Error("Arquivo de idioma não encontrado");
      return response.json();
    })
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const chave = el.getAttribute("data-i18n");
        if (data[chave]) el.textContent = data[chave];
      });
      localStorage.setItem("lang", lang);
    })
    .catch(err => {
      console.error("Erro ao carregar idioma:", err);
    });
}

// ===== Eventos =====
butt_clk?.addEventListener("click", realizarBusca);
menuToggle?.addEventListener("click", alternarMenu);
languageSelector?.addEventListener("change", () => trocarIdioma(languageSelector.value));

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
  configurarAnimacoesDetails();

  const idiomaSalvo = localStorage.getItem("lang") || "pt-br";
  if (languageSelector) languageSelector.value = idiomaSalvo;
  trocarIdioma(idiomaSalvo);
});
