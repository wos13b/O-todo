const perf_butt = document.querySelector(".Log_perf")
const log_menu = document.querySelector(".Log_menu")

function alternarMenu_perf() {
  log_menu?.classList.toggle("ativo");
}

perf_butt?.addEventListener("click", alternarMenu_perf)