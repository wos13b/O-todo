const DIAS_BAKTUN = 144000;
const DIAS_KATUN = 7200;
const DIAS_TUN = 360;
const DIAS_UINAL = 20;
const DIAS_KIN = 1;

// Base: 11 de agosto de -3113 (GMT correlation = 584283 dias)
const CORRELACAO_GMT = 584283; // Dias julianos até a data zero maia
const MS_POR_DIA = 86400000;

function atualizarData() {
  const baktun = parseInt(document.getElementById('baktun').value) || 0;
  const katun = parseInt(document.getElementById('katun').value) || 0;
  const tun = parseInt(document.getElementById('tun').value) || 0;
  const uinal = parseInt(document.getElementById('uinal').value) || 0;
  const kin = parseInt(document.getElementById('kin').value) || 0;

  const totalDiasLongCount = baktun * DIAS_BAKTUN + katun * DIAS_KATUN + tun * DIAS_TUN + uinal * DIAS_UINAL + kin * DIAS_KIN;
  const totalDiasDesdeDataGregorianaZero = CORRELACAO_GMT + totalDiasLongCount;

  const dataCalculada = new Date(totalDiasDesdeDataGregorianaZero * MS_POR_DIA);

  const dia = dataCalculada.getUTCDate().toString().padStart(2, '0');
  const mes = (dataCalculada.getUTCMonth() + 1).toString().padStart(2, '0');
  const ano = dataCalculada.getUTCFullYear();

  document.getElementById('dataCalculada').value = `${dia}/${mes}/${ano}`;
}

['baktun', 'katun', 'tun', 'uinal', 'kin'].forEach(id => {
  document.getElementById(id).addEventListener('input', atualizarData);
});

atualizarData();
