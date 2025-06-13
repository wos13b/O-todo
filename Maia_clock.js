const DIAS_BAKTUN = 144000;
const DIAS_KATUN = 7200;
const DIAS_TUN = 360;
const DIAS_UINAL = 20;
const DIAS_KIN = 1;

const dataInicialMaia = new Date(-3113, 7, 11);

function atualizarData() {
  const baktun = parseInt(document.getElementById('baktun').value) || 0;
  const katun = parseInt(document.getElementById('katun').value) || 0;
  const tun = parseInt(document.getElementById('tun').value) || 0;
  const uinal = parseInt(document.getElementById('uinal').value) || 0;
  const kin = parseInt(document.getElementById('kin').value) || 0;

  const totalDias = baktun * DIAS_BAKTUN + katun * DIAS_KATUN + tun * DIAS_TUN + uinal * DIAS_UINAL + kin * DIAS_KIN;

  const resultadoData = new Date(dataInicialMaia.getTime() + totalDias * 24 * 60 * 60 * 1000);

  const dia = resultadoData.getUTCDate().toString().padStart(2, '0');
  const mes = (resultadoData.getUTCMonth() + 1).toString().padStart(2, '0');
  const ano = resultadoData.getUTCFullYear();

  document.getElementById('dataCalculada').value = `${dia}/${mes}/${ano}`;
}

['baktun', 'katun', 'tun', 'uinal', 'kin'].forEach(id => {
  document.getElementById(id).addEventListener('input', atualizarData);
});

atualizarData();
