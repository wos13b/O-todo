const perf_butt = document.querySelector(".Log_perf")
const nav_2 = document.querySelector(".nav_2")

function alternarMenu_perf() {
  nav_2?.classList.toggle("ativo");
}

perf_butt?.addEventListener("click", alternarMenu_perf)

document.addEventListener("DOMContentLoaded", () => {
    const meditationDiv = document.querySelector(".Meditation");

    const imagens = [
        "img/Meditação/Meditação_001.png",
        "img/Meditação/Meditação_002.png",
        "img/Meditação/Meditação_003.png",
        "img/Meditação/Meditação_004.png",
        "img/Meditação/Meditação_005.png",
        "img/Meditação/Meditação_006.png",
        "img/Meditação/Meditação_007.png",
        "img/Meditação/Meditação_008.png",
        "img/Meditação/Meditação_009.png",
        "img/Meditação/Meditação_010.png"
    ];

    let index = 0;

    const img = document.createElement("img");
    img.classList.add("slideshow");
    meditationDiv.appendChild(img);

    function trocarImagem() {
      img.classList.add("glitch");

      setTimeout(() => {
          img.classList.remove("glitch");
          img.src = imagens[index];
          index = (index + 1) % imagens.length;
      }, 150); // tempo da animação
    }



    trocarImagem();
    setInterval(trocarImagem, 3000); // troca a cada 3s
});
