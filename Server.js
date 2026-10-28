const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o EJS como motor de visualização (Template Engine)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, imagens, scripts do cliente)
app.use(express.static(path.join(__dirname, 'public')));

// Função de cálculo cósmico adaptada para rodar no Servidor (Node.js)
const TOTAL_DIAS_ANO = 729;
const TOTAL_SETORES = 9;
const DIAS_POR_SETOR = 81;
const MARCO_ZERO_COSMICO = new Date(2026, 0, 1, 0, 0, 0).getTime();

const nomesSetores = [
    "Sūrya", "Budha", "Śukra", "Chandra", "Maṅgala", 
    "Bṛhaspati", "Śani", "Uranas", "Neptunas"
];

function obterTempoCosmicoAtual() {
    const milissegundosTotaisDecorridos = Date.now() - MARCO_ZERO_COSMICO;
    if (milissegundosTotaisDecorridos < 0) return { anoCosmico: 2026, setor: 1, diaDoSetor: 1 };

    const DURACAO_DIA_MS = ((12 * 3600) + (1 * 60) + 27) * 1000;
    const diaAbsoluto = Math.floor(milissegundosTotaisDecorridos / DURACAO_DIA_MS) + 1;
    const anoCosmico = 2026 + Math.floor((diaAbsoluto - 1) / TOTAL_DIAS_ANO);
    const diaNoAnoCosmico = ((diaAbsoluto - 1) % TOTAL_DIAS_ANO) + 1;
    const setor = Math.floor((diaNoAnoCosmico - 1) / DIAS_POR_SETOR) + 1;
    const diaDoSetor = ((diaNoAnoCosmico - 1) % DIAS_POR_SETOR) + 1;

    return { anoCosmico, setor, diaDoSetor };
}

// Rota Principal com SSR
app.get('/', (req, res) => {
    const tempo = obterTempoCosmicoAtual();
    const mesNome = nomesSetores[tempo.setor - 1];

    // Dados injetados pelo servidor no HTML inicial
    const dadosSSR = {
        ano: tempo.anoCosmico,
        setorNome: mesNome,
        diaDoSetor: tempo.diaDoSetor,
        totalDiasSetor: DIAS_POR_SETOR
    };

    res.render('index', { dadosSSR });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});