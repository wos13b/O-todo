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

// Função auxiliar melhorada para formatar objetos e arrays de forma limpa
function renderDetails(data) {
    let html = '';
    
    // Ignora as chaves padrão já exibidas no topo
    const ignoreKeys = ['nome', 'avatar', 'funcao'];

    for (const [key, value] of Object.entries(data)) {
        if (ignoreKeys.includes(key)) continue;

        const formattedKey = key.replace(/_/g, ' ').toUpperCase();

        if (value !== null && typeof value === 'object') {
            html += `<div style="margin-top: 20px; margin-bottom: 15px;">`;
            html += `<strong style="color: #00ffcc; display: block; margin-bottom: 8px; font-size: 1.1rem; border-bottom: 1px solid rgba(0,255,204,0.2); padding-bottom: 4px;">${formattedKey}:</strong>`;
            
            if (Array.isArray(value)) {
                // Se for um array (ex: titulos, frases, mascaras)
                html += `<ul style="margin-left: 20px; list-style-type: disc;">`;
                value.forEach(item => {
                    if (typeof item === 'object') {
                        // Objeto dentro de array (ex: máscaras com nome e função)
                        html += `<li style="margin-bottom: 8px;">`;
                        for (const [subKey, subVal] of Object.entries(item)) {
                            html.forEach ? html += `<strong style="color: #d870ff;">${subKey}:</strong> ${subVal} ` : '';
                        }
                        html += `</li>`;
                    } else {
                        html += `<li style="margin-bottom: 5px;">${item}</li>`;
                    }
                });
                html += `</ul>`;
            } else {
                // Se for um objeto aninhado (ex: origem, aparencia, metafisica)
                html += `<div style="padding-left: 10px; border-left: 2px solid rgba(255,255,255,0.1); margin-top: 5px;">`;
                html += renderDetails(value); // Chamada recursiva para sub-objetos
                html += `</div>`;
            }
            
            html += `</div>`;
        } else {
            // Valor de texto ou número simples
            html += `<p style="margin-bottom: 10px;"><strong style="color: #00ffcc;">${formattedKey}:</strong> ${value}</p>`;
        }
    }

    return html;
}