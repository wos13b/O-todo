document.querySelectorAll('.audio-player-container').forEach(container => {
    var audio = container.querySelector('.meuAudio');
    var btn = container.querySelector('.btnAudio');
    var icone = container.querySelector('.iconePlay');
    var texto = container.querySelector('.textoAudio');

    // Salva o texto original que estava no HTML
    var nomeOriginal = texto.textContent;

    // Controla o play/pause ao clicar no botão
    btn.addEventListener('click', function() {
        // Opcional: Pausa os outros áudios se houver algum tocando
        document.querySelectorAll('.meuAudio').forEach(outroAudio => {
            if (outroAudio !== audio) {
                outroAudio.pause();
                // Opcional: se quiser resetar os outros botões também ao trocar de áudio, 
                // você precisaria ajustar a lógica deles aqui.
            }
        });

        if (audio.paused) {
            audio.play();
            icone.textContent = "⏸";
            texto.textContent = "Pausar"; // Texto ao tocar
            btn.classList.add("playing");
        } else {
            audio.pause();
            icone.textContent = "▶";
            texto.textContent = nomeOriginal; // Retorna ao nome original ao pausar
            btn.classList.remove("playing");
        }
    });

    // Atualiza o preenchimento do botão conforme o áudio avança
    audio.addEventListener("timeupdate", function() {
        if (audio.duration) {
            var progress = audio.currentTime / audio.duration;
            btn.style.setProperty('--progress', progress);
        }
    });

    // Reseta o botão quando o áudio terminar
    audio.addEventListener("ended", function() {
        icone.textContent = "▶";
        texto.textContent = nomeOriginal; // Retorna ao nome original ao terminar
        btn.classList.remove("playing");
        btn.style.setProperty('--progress', 0);
    });
});