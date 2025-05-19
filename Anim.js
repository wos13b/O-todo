const perf_butt = document.querySelector(".Log_perf")
const nav_2 = document.querySelector(".nav_2")

function alternarMenu_perf() {
  nav_2?.classList.toggle("ativo");
}

perf_butt?.addEventListener("click", alternarMenu_perf)