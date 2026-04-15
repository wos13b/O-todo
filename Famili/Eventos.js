document.addEventListener("DOMContentLoaded", () => {

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    const calendario = document.getElementById("calendario");

    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    // 🔹 Banco de eventos (pode evoluir pra localStorage depois)
    const eventos = {
    
    "01-05": {
        imagem: "../img/Adriano.png"
    },
    "02-28": {
        imagem: "../img/Monica.png"
    },
    "03-27": {
        imagem: "../img/Helena.jpeg"
    },
    "12-13": {
        imagem: "../img/Eu_001.png"
    }
};

    for (let mes = 0; mes < 12; mes++) {

        const mesDiv = document.createElement("div");
        mesDiv.classList.add("mes");

        // Título do mês
        const titulo = document.createElement("div");
        titulo.classList.add("titulo-mes");
        titulo.textContent = `${nomesMeses[mes]} de ${ano}`;
        mesDiv.appendChild(titulo);

        // Grid
        const grid = document.createElement("div");
        grid.classList.add("grid");

        // 🔹 Cabeçalho (dias da semana)
        diasSemana.forEach(dia => {
            const el = document.createElement("div");
            el.classList.add("dia-semana");

            const label = document.createElement("div");
            label.textContent = dia;

            el.appendChild(label);
            grid.appendChild(el);
        });

        const primeiroDia = new Date(ano, mes, 1).getDay();
        const totalDias = new Date(ano, mes + 1, 0).getDate();

        // Espaços vazios
        for (let i = 0; i < primeiroDia; i++) {
            const vazio = document.createElement("div");
            vazio.classList.add("vazio");
            grid.appendChild(vazio);
        }

        // 🔹 Dias do mês
        for (let dia = 1; dia <= totalDias; dia++) {

            const el = document.createElement("div");

            // Número do dia
            const numero = document.createElement("div");
            numero.classList.add("numero-dia");
            numero.textContent = dia;

            // Conteúdo (imagem etc)
            const conteudo = document.createElement("div");
            conteudo.classList.add("conteudo-dia");

            el.appendChild(numero);
            el.appendChild(conteudo);

            // Destacar hoje
            if (mes === mesAtual && dia === diaAtual) {
                el.classList.add("hoje");
            }

            // 🔑 Identificador da data
            const dataKey = `${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

            // 🔹 Se já existir evento, renderiza imagem
            if (eventos[dataKey]) {
                const img = document.createElement("img");
                img.src = eventos[dataKey].imagem;
                conteudo.appendChild(img);
            }

            // 🔹 Clique para adicionar imagem
            el.addEventListener("click", () => {

                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";

                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();

                    reader.onload = () => {

                        const img = document.createElement("img");
                        img.src = reader.result;

                        // limpa conteúdo anterior
                        conteudo.innerHTML = "";
                        conteudo.appendChild(img);

                        // salva no "banco"
                        eventos[dataKey] = {
                            imagem: reader.result
                        };
                    };

                    reader.readAsDataURL(file);
                };

                input.click();
            });

            grid.appendChild(el);
        }

        mesDiv.appendChild(grid);
        calendario.appendChild(mesDiv);
    }

});