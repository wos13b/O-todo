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

        // Dias da semana
        diasSemana.forEach(dia => {
            const el = document.createElement("div");
            el.textContent = dia;
            el.style.fontWeight = "bold";
            el.style.background = "#000";
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

        // Dias
        for (let dia = 1; dia <= totalDias; dia++) {
            const el = document.createElement("div");
            el.textContent = dia;

            // Destacar hoje
            if (mes === mesAtual && dia === diaAtual) {
                el.classList.add("hoje");
            }

            grid.appendChild(el);
        }

        mesDiv.appendChild(grid);
        calendario.appendChild(mesDiv);
    }

});