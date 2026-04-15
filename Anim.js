document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // 🔹 MENU PERFIL
    // ===============================
    const perf_butt = document.querySelector(".Log_perf");
    const nav_2 = document.querySelector(".nav_2");

    function alternarMenu_perf() {
        nav_2?.classList.toggle("ativo");
    }

    perf_butt?.addEventListener("click", alternarMenu_perf);


    // ===============================
    // 🔹 RODA EXISTENCIAL
    // ===============================
    const roda = document.querySelector(".Roda_existencial");

    if (roda) {

        const imagensSetores = [
            "img/Cerebro.png",
            "img/Coração.png",
            "img/Genero.png"
        ];

        // 🔥 imagens que vão alternar
        const imagensGenero = [
            "img/Feminino.png",
            "img/Masculino.png"
        ];

        const totalSetores = imagensSetores.length;
        const angulo = 360 / totalSetores;

        const conteudos = [];

        for (let i = 0; i < totalSetores; i++) {

            const setor = document.createElement("div");
            setor.classList.add("setor");

            const rotacaoInicial = i * angulo;

            setor.style.position = "absolute";
            setor.style.width = "50%";
            setor.style.height = "100%";
            setor.style.left = "50%";
            setor.style.top = "0";

            setor.style.transformOrigin = "left center";
            setor.style.transform = `rotate(${rotacaoInicial}deg)`;
            setor.style.pointerEvents = "none";


            // 🔵 BOLINHA
            const bola = document.createElement("div");

            bola.style.position = "absolute";
            bola.style.left = "60%";
            bola.style.top = "50%";

            bola.style.width = "90px";
            bola.style.height = "90px";

            bola.style.transform = "translate(-50%, -50%)";
            bola.style.borderRadius = "50%";
            bola.style.overflow = "hidden";
            bola.style.background = "#fff";


            // 🔹 CONTAINER INTERNO
            const conteudo = document.createElement("div");

            conteudo.style.width = "100%";
            conteudo.style.height = "100%";
            conteudo.style.display = "flex";
            conteudo.style.alignItems = "center";
            conteudo.style.justifyContent = "center";
            conteudo.style.willChange = "transform";
            conteudo.style.backfaceVisibility = "hidden";


            // 🔹 IMAGEM
            const img = document.createElement("img");

            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";
            img.style.objectPosition = "center";
            img.style.transform = "scale(0.8)";
            img.style.transition = "opacity 0.3s ease";


            // ===============================
            // 🔥 IMAGEM NORMAL OU ANIMADA
            // ===============================
            if (imagensSetores[i].includes("Genero")) {

                let indexGenero = 0;
                img.src = imagensGenero[indexGenero];

                setInterval(() => {

                    img.style.opacity = 0;

                    setTimeout(() => {
                        indexGenero = (indexGenero + 1) % imagensGenero.length;
                        img.src = imagensGenero[indexGenero];
                        img.style.opacity = 1;
                    }, 200);

                }, 4000);

            } else {
                img.src = imagensSetores[i];
            }


            // montagem
            conteudo.appendChild(img);
            bola.appendChild(conteudo);
            setor.appendChild(bola);
            roda.appendChild(setor);

            conteudos.push(conteudo);
        }


        // ===============================
        // 🔹 ANIMAÇÃO DA RODA
        // ===============================
        let rotacao = 0;

        function animarRoda() {
            rotacao += 0.2;

            roda.style.transform = `rotate(${rotacao}deg)`;

            // 🔥 mantém imagens retas (CORRIGIDO)
            conteudos.forEach((c, i) => {
                const rotacaoInicial = i * angulo;
                c.style.transform = `rotate(${-(rotacao + rotacaoInicial)}deg)`;
            });

            requestAnimationFrame(animarRoda);
        }

        animarRoda();
    }


    // ===============================
    // 🔹 SLIDESHOW
    // ===============================
    const meditationDiv = document.querySelector(".Meditation");

    if (meditationDiv) {

        const totalImagens = 20;

        const imagens = Array.from({ length: totalImagens }, (_, i) => {
            const numero = String(i + 1).padStart(3, "0");
            return `img/Meditação/Meditação_${numero}.png`;
        });

        let index = 0;

        const img = document.createElement("img");
        img.classList.add("slideshow");
        img.style.opacity = 0;
        img.style.transition = "opacity 0.5s ease";

        meditationDiv.appendChild(img);

        function trocarImagem() {
            img.style.opacity = 0;

            const novoSrc = imagens[index];
            const preload = new Image();
            preload.src = novoSrc;

            preload.onload = () => {
                img.src = novoSrc;
                img.style.opacity = 1;
            };

            index = (index + 1) % imagens.length;
        }

        trocarImagem();

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                trocarImagem();
            }
        });
    }

});