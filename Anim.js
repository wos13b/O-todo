// Menu
const perf_butt = document.querySelector(".Log_perf");
const nav_2 = document.querySelector(".nav_2");

function alternarMenu_perf() {
  nav_2?.classList.toggle("ativo");
}

perf_butt?.addEventListener("click", alternarMenu_perf);

// Slideshow com glitch + troca por espaço
document.addEventListener("DOMContentLoaded", () => {
    const meditationDiv = document.querySelector(".Meditation");

    // ---------------------------
    // Opção B: gerar nomes automaticamente
    // ---------------------------
    const totalImagens = 20; 
    const imagens = [];

    for (let i = 1; i <= totalImagens; i++) {
        const numero = String(i).padStart(3, "0"); 
        imagens.push(`img/Meditação/Meditação_${numero}.png`);
    }

    let index = 0;

    // Cria a imagem exibida
    const img = document.createElement("img");
    img.classList.add("slideshow");
    meditationDiv.appendChild(img);

    // Função para trocar com glitch
    function trocarImagem() {
        img.classList.add("glitch");

        setTimeout(() => {
            img.classList.remove("glitch");
            img.src = imagens[index];
            index = (index + 1) % imagens.length;
        }, 40);
    }

    // Carrega a primeira imagem
    trocarImagem();

    // Troca quando apertar espaço
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            trocarImagem();
        }
    });
});
