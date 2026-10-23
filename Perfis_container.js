document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("userProfilesContainer");
    if (!container) return;

    try {
        const { data: users, error } = await supabaseClient
            .from('profiles') 
            .select('*');

        if (error) throw error;

        container.innerHTML = "";

        if (!users || users.length === 0) {
            container.innerHTML = "<p style='color:#777;'>Nenhum perfil encontrado.</p>";
            return;
        }

        users.forEach(user => {
            const userId = user.id || user.user_id;
            const userName = user.nome || user.name || "Membro";
            const userAvatar = user.avatar_url || user.foto || "ico/Logo.png";

            const card = document.createElement("a");
            card.href = `Perf.html?id=${userId}`;
            card.className = "user-circle-card";

            card.innerHTML = `
                <div class="user-avatar">
                    <img src="${userAvatar}" alt="${userName}" onerror="this.src='ico/Logo.png'">
                </div>
                <span class="user-name">${userName}</span>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Erro ao carregar os perfis:", err);
        container.innerHTML = "<p style='color:#ff5555;'>Erro ao carregar os perfis do banco de dados.</p>";
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const fictionalContainer = document.getElementById("fictionalProfilesContainer");
    if (!fictionalContainer) return;

    try {
        const arquivosPersonagens = [
            'Nv_13/Personas/Prs_001.json',
            'Nv_13/Personas/Prs_002.json'
        ];

        fictionalContainer.innerHTML = "";

        if (arquivosPersonagens.length === 0) {
            fictionalContainer.innerHTML = "<p style='color:#777;'>Nenhum personagem encontrado.</p>";
            return;
        }

        for (const caminho of arquivosPersonagens) {
            const response = await fetch(caminho);
            if (!response.ok) continue;
            const charData = await response.json();

            const baseDir = caminho.substring(0, caminho.lastIndexOf('/') + 1);
            const avatarSrc = charData.avatar ? baseDir + charData.avatar : 'ico/Logo.png';

            const card = document.createElement("a");
            // Passa o caminho do arquivo JSON como parâmetro na URL
            card.href = `PerfFicticio.html?file=${encodeURIComponent(caminho)}`;
            card.className = "user-circle-card";

            const funcaoBadge = charData.funcao 
                ? `<span class="char-role-badge">${charData.funcao}</span>` 
                : '';

            card.innerHTML = `
                <div class="user-avatar">
                    <img src="${avatarSrc}" alt="${charData.nome}" onerror="this.src='ico/Logo.png'">
                </div>
                <span class="user-name">${charData.nome}</span>
                ${funcaoBadge}
            `;

            fictionalContainer.appendChild(card);
        }

    } catch (err) {
        console.error("Erro ao carregar os personagens fictícios:", err);
        fictionalContainer.innerHTML = "<p style='color:#ff5555;'>Erro ao carregar os arquivos de personagens.</p>";
    }
});