// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL =
    "https://aqaaclqbeguloxqjfgtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



// =========================================================
// VERIFICAR USUÁRIO
// =========================================================

async function atualizarMenuUsuario() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();



    // =====================================================
    // ELEMENTOS DO MENU
    // =====================================================

    const cadastro =
        document.querySelector("#nav-cadastro");

    const login =
        document.querySelector("#nav-login");

    const perfil =
        document.querySelector("#nav-perfil");



    // =====================================================
    // USUÁRIO LOGADO
    // =====================================================

    if (user) {

        if (cadastro) {
            cadastro.style.display = "none";
        }

        if (login) {
            login.style.display = "none";
        }

        if (perfil) {
            perfil.style.display = "";
        }

        return;
    }



    // =====================================================
    // USUÁRIO NÃO LOGADO
    // =====================================================

    if (cadastro) {
        cadastro.style.display = "";
    }

    if (login) {
        login.style.display = "";
    }

    if (perfil) {
        perfil.style.display = "";
    }

}



// =========================================================
// EXECUTAR
// =========================================================

atualizarMenuUsuario();