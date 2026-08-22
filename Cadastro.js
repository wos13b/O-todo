// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL = "https://aqaaclqbeguloxqjfgtn.supabase.co";
const SUPABASE_KEY = "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// =========================================================
// FORMULÁRIO
// =========================================================

const formulario = document.querySelector(".form-cadastro");

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmar-senha").value;


    // =====================================================
    // VERIFICAR SENHAS
    // =====================================================

    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem.");

        return;
    }


    // =====================================================
    // CRIAR USUÁRIO
    // =====================================================

    const { data, error } = await supabaseClient.auth.signUp({

        email: email,

        password: senha,

        options: {

            data: {
                nome: nome
            }

        }

    });


    // =====================================================
    // ERRO
    // =====================================================

    if (error) {

        console.error(error);

        alert("Erro ao criar usuário:\n\n" + error.message);

        return;
    }


    // =====================================================
    // SUCESSO
    // =====================================================

    console.log("Usuário criado:", data);

    alert(
        "Cadastro realizado com sucesso!\n\n" +
        "Verifique seu e-mail para confirmar a conta."
    );

    formulario.reset();

});