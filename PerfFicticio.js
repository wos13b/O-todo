document.addEventListener("DOMContentLoaded", async () => {
    const detailsContainer = document.getElementById("characterDetails");
    if (!detailsContainer) return;

    // Obtém o parâmetro "file" da URL (?file=Nv_13/Personas/Prs_001.json)
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get("file");

    if (!filePath) {
        detailsContainer.innerHTML = "<p style='color:#ff5555; text-align:center;'>Nenhum personagem foi especificado.</p>";
        return;
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("Não foi possível carregar o arquivo do personagem.");

        const charData = await response.json();

        // Ajusta o caminho da imagem de avatar
        const baseDir = filePath.substring(0, filePath.lastIndexOf('/') + 1);
        const avatarSrc = charData.avatar ? baseDir + charData.avatar : 'ico/Logo.png';

        // Atualiza o título da página
        document.title = `${charData.nome || 'Personagem'} - O todo`;

        // Constrói o HTML com as informações do JSON
        detailsContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <img src="${avatarSrc}" alt="${charData.nome}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 2px solid #555;" onerror="this.src='ico/Logo.png'">
                <h1 class="section-title" style="margin-top: 1rem;">${charData.nome || 'Sem Nome'}</h1>
                ${charData.funcao ? `<p class="section-subtitle" style="color: #00ffcc;">${charData.funcao}</p>` : ''}
            </div>

            <div class="character-info-body" style="color: #ddd; line-height: 1.6; max-width: 800px; margin: 0 auto; background: rgba(0,0,0,0.4); padding: 20px; border-radius: 8px;">
                ${renderDetails(charData)}
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <a href="Perfis.html" style="color: #00ffcc; text-decoration: none; border: 1px solid #00ffcc; padding: 8px 16px; border-radius: 4px;">← Voltar para Perfis</a>
            </div>
        `;

    } catch (err) {
        console.error("Erro ao carregar os dados do personagem:", err);
        detailsContainer.innerHTML = `<p style="color:#ff5555; text-align:center;">Erro ao carregar as informações do personagem.</p>`;
    }
});

// Função auxiliar para renderizar os campos do JSON dinamicamente
function renderDetails(data) {
    let html = '';
    
    // Ignora as chaves padrão já exibidas no topo
    const ignoreKeys = ['nome', 'avatar', 'funcao'];

    for (const [key, value] of Object.entries(data)) {
        if (ignoreKeys.includes(key)) continue;

        // Formata a chave (ex: "historia_origem" -> "HISTORIA ORIGEM")
        const formattedKey = key.replace(/_/g, ' ').toUpperCase();

        if (value !== null && typeof value === 'object') {
            html += `
                <div style="margin-top: 15px; margin-bottom: 15px;">
                    <strong style="color: #00ffcc; display: block; margin-bottom: 5px;">${formattedKey}:</strong>
                    <pre style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; color: #e0e0e0; white-space: pre-wrap; word-break: break-word; font-family: monospace;">${JSON.stringify(value, null, 2)}</pre>
                </div>`;
        } else {
            html += `<p style="margin-bottom: 12px;"><strong style="color: #00ffcc;">${formattedKey}:</strong> ${value}</p>`;
        }
    }

    return html;
}