// Menu
const perf_butt = document.querySelector(".Log_perf");
const nav_2 = document.querySelector(".nav_2");

function alternarMenu_perf() {
  nav_2?.classList.toggle("ativo");
}

perf_butt?.addEventListener("click", alternarMenu_perf);

// Slideshow com fade + troca por espaço
document.addEventListener("DOMContentLoaded", () => {
    const meditationDiv = document.querySelector(".Meditation");

    // Geração automática dos nomes
    const totalImagens = 20;
    const imagens = Array.from({ length: totalImagens }, (_, i) => {
        const numero = String(i + 1).padStart(3, "0");
        return `img/Meditação/Meditação_${numero}.png`;
    });

    let index = 0;

    // Cria a imagem exibida
    const img = document.createElement("img");
    img.classList.add("slideshow");
    meditationDiv.appendChild(img);

    // Troca com fade
    function trocarImagem() {
        img.style.opacity = 0; // fade out

        setTimeout(() => {
            img.src = imagens[index];
            img.style.opacity = 1; // fade in
            index = (index + 1) % imagens.length;
        }, 200); // tempo do fade-out antes de trocar
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
