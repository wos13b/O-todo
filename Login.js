// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL = "https://aqaaclqbeguloxqjfgtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



// =========================================================
// FORMULÁRIO
// =========================================================

const formulario = document.querySelector("#form-login");



formulario.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();



        // =================================================
        // DADOS
        // =================================================

        const email = document
            .querySelector("#email")
            .value
            .trim();


        const senha = document
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
        // ERRO
        // =================================================

        if (error) {

            console.error(
                "Erro ao realizar login:",
                error
            );


            alert(
                "Não foi possível entrar.\n\n" +
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

        // =========================================================
        // ATUALIZAR MENU
        // =========================================================

        const cadastro = document.querySelector("#nav-cadastro");
        const login = document.querySelector("#nav-login");

        if (cadastro) {
            cadastro.style.display = "none";
        }

        if (login) {
            login.style.display = "none";
        }

        // =================================================
        // REDIRECIONAR
        // =================================================

        window.location.href = "index.html";

    }
);