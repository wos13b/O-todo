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
// FORMULÁRIO
// =========================================================

const formulario = document.querySelector(".form-cadastro");



// =========================================================
// ENVIO DO FORMULÁRIO
// =========================================================

formulario.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();



        // =================================================
        // DADOS DO USUÁRIO
        // =================================================

        const nome = document
            .querySelector("#nome")
            .value
            .trim();


        const nickname = document
            .querySelector("#nickname")
            .value
            .trim();


        const email = document
            .querySelector("#email")
            .value
            .trim();


        const dataNascimento = document
            .querySelector("#data-nascimento")
            .value;


        const senha = document
            .querySelector("#senha")
            .value;


        const confirmarSenha = document
            .querySelector("#confirmar-senha")
            .value;



        // =================================================
        // VALIDAÇÕES
        // =================================================

        if (senha !== confirmarSenha) {

            alert(
                "As senhas não coincidem."
            );

            return;
        }



        if (senha.length < 8) {

            alert(
                "A senha deve possuir pelo menos 8 caracteres."
            );

            return;
        }



        if (nickname.length < 3) {

            alert(
                "O nickname deve possuir pelo menos 3 caracteres."
            );

            return;
        }



        // =================================================
        // CRIAR USUÁRIO
        // =================================================

        const { data, error } =
            await supabaseClient.auth.signUp({

                email: email,

                password: senha,

                options: {

                    // -------------------------------------
                    // REDIRECIONAMENTO APÓS CONFIRMAÇÃO
                    // -------------------------------------

                    emailRedirectTo:
                        "http://localhost:3000/login.html",


                    // -------------------------------------
                    // DADOS ADICIONAIS DO USUÁRIO
                    // -------------------------------------

                    data: {

                        nome: nome,

                        nickname: nickname,

                        data_nascimento: dataNascimento

                    }

                }

            });



        // =================================================
        // TRATAMENTO DE ERRO
        // =================================================

        if (error) {

            console.error(
                "Erro ao criar usuário:",
                error
            );


            alert(
                "Erro ao criar usuário:\n\n" +
                error.message
            );

            return;
        }



        // =================================================
        // CADASTRO REALIZADO
        // =================================================

        console.log(
            "Usuário criado:",
            data.user
        );



        alert(
            "Cadastro realizado com sucesso!\n\n" +
            "Verifique seu e-mail para confirmar a conta."
        );



        // =================================================
        // LIMPAR FORMULÁRIO
        // =================================================

        formulario.reset();

    }
);