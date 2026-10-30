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

// Função auxiliar com estilização avançada para os detalhes do personagem
function renderDetails(data) {
    let html = '';
    
    // Ignora as chaves padrão já exibidas no topo
    const ignoreKeys = ['nome', 'avatar', 'funcao'];

    for (const [key, value] of Object.entries(data)) {
        if (ignoreKeys.includes(key)) continue;

        const formattedKey = key.replace(/_/g, ' ').toUpperCase();

        html += `
            <div style="background: rgba(15, 15, 15, 0.7); border: 1px solid rgba(138, 43, 226, 0.25); border-radius: 12px; padding: 20px; margin-bottom: 20px; backdrop-filter: blur(6px); box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                <h3 style="color: #bc13fe; font-size: 1.1rem; letter-spacing: 1px; margin-bottom: 12px; border-bottom: 1px solid rgba(138, 43, 226, 0.2); padding-bottom: 8px; text-transform: uppercase;">
                    ${formattedKey}
                </h3>
        `;

        if (value !== null && typeof value === 'object') {
            if (Array.isArray(value)) {
                // Se for um array de elementos (ex: títulos, frases, habilidades)
                html += `<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">`;
                value.forEach(item => {
                    if (typeof item === 'object') {
                        // Se for um objeto dentro do array (ex: máscaras ou habilidades com sub-propriedades)
                        html += `<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px; width: 100%; margin-top: 6px;">`;
                        for (const [subKey, subVal] of Object.entries(item)) {
                            const formattedSubKey = subKey.replace(/_/g, ' ').toUpperCase();
                            html += `<p style="margin-bottom: 4px; font-size: 0.9rem;"><strong style="color: #00ffcc;">${formattedSubKey}:</strong> <span style="color: #ddd;">${subVal}</span></p>`;
                        }
                        html += `</div>`;
                    } else {
                        // Tag ou item simples em lista (ex: géneros narrativos, títulos)
                        html += `<span style="background: rgba(138, 43, 226, 0.15); color: #d870ff; border: 1px solid rgba(138, 43, 226, 0.3); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">${item}</span>`;
                    }
                });
                html += `</div>`;
            } else {
                // Se for um objeto aninhado (ex: origem, aparencia, metafisica)
                html += `<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">`;
                for (const [subKey, subVal] of Object.entries(value)) {
                    const formattedSubKey = subKey.replace(/_/g, ' ').toUpperCase();
                    if (typeof subVal === 'object' && subVal !== null) {
                        // Caso especial para sub-listas dentro de objetos (ex: máscaras dentro de aparencia)
                        html += `<div style="margin-top: 8px;"><strong style="color: #00ffcc; font-size: 0.95rem;">${formattedSubKey}:</strong>`;
                        if (Array.isArray(subVal)) {
                            html += `<ul style="margin-left: 20px; margin-top: 5px;">`;
                            subVal.forEach(subItem => {
                                html += `<li style="margin-bottom: 5px; color: #ccc;">`;
                                if (typeof subItem === 'object') {
                                    for (const [k, v] of Object.entries(subItem)) {
                                        html += `<strong>${k}:</strong> ${v} `;
                                    }
                                } else {
                                    html += subItem;
                                }
                                html += `</li>`;
                            });
                            html += `</ul>`;
                        }
                        html += `</div>`;
                    } else {
                        html += `<p style="font-size: 0.95rem; line-height: 1.5;"><strong style="color: #00ffcc; text-transform: uppercase;">${formattedSubKey}:</strong> <span style="color: #d0d0d0;">${subVal}</span></p>`;
                    }
                }
                html += `</div>`;
            }
        } else {
            // Valor de texto simples
            html += `<p style="color: #d0d0d0; font-size: 0.95rem; line-height: 1.6;">${value}</p>`;
        }

        html += `</div>`;
    }

    return html;
}