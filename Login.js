// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL =
    "https://aqaaclqbeguloxqjfgtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =========================================================
// FORMULÁRIO DE LOGIN
// =========================================================

const formulario =
    document.querySelector("#form-login");


// =========================================================
// VERIFICAR SE O FORMULÁRIO EXISTE
// =========================================================

if (formulario) {

    formulario.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // =================================================
            // DADOS DO FORMULÁRIO
            // =================================================

            const email =
                document
                    .querySelector("#email")
                    .value
                    .trim();


            const senha =
                document
                    .querySelector("#senha")
                    .value;


            // =================================================
            // LOGIN
            // =================================================

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: senha

                });


            // =================================================
            // TRATAMENTO DE ERRO
            // =================================================

            if (error) {

                console.error(
                    "Erro ao fazer login:",
                    error
                );


                // ---------------------------------------------
                // LIMITE DE TENTATIVAS
                // ---------------------------------------------

                if (
                    error.message.includes("rate limit") ||
                    error.message.includes("rate_limit")
                ) {

                    alert(
                        "O limite de tentativas foi atingido.\n\n" +
                        "Aguarde um pouco antes de tentar novamente."
                    );

                    return;
                }


                // ---------------------------------------------
                // E-MAIL NÃO CONFIRMADO
                // ---------------------------------------------

                if (
                    error.message.includes(
                        "Email not confirmed"
                    )
                ) {

                    alert(
                        "Seu e-mail ainda não foi confirmado.\n\n" +
                        "Verifique sua caixa de entrada " +
                        "e clique no link de confirmação."
                    );

                    return;
                }


                // ---------------------------------------------
                // OUTROS ERROS
                // ---------------------------------------------

                alert(
                    "Erro ao fazer login:\n\n" +
                    error.message
                );

                return;
            }


            // =================================================
            // LOGIN REALIZADO
            // =================================================

            console.log(
                "Login realizado:",
                data.user
            );


            console.log(
                "Sessão criada:",
                data.session
            );


            // =================================================
            // NÃO É MAIS NECESSÁRIO ESCONDER O MENU AQUI
            // =================================================
            //
            // O script.js já possui:
            //
            // supabaseClient.auth.onAuthStateChange(...)
            //
            // Portanto, quando o login acontecer,
            // o menu será atualizado automaticamente.
            //
            // =================================================


            // =================================================
            // REDIRECIONAR
            // =================================================

            window.location.href =
                "index.html";

        }
    );

}