export default function LoginPage() {
  return (
    <main>
      <canvas id="matrix-canvas"></canvas>

      <div className="header">
        
        <button className="menu-toggle">☰</button>

        <ul className="nav">
          <li><a href="/">Inicio</a></li>
          <li><a href="/program">Program</a></li>
          <li><a href="/fisica">Fisica</a></li>
        </ul>
        <ul className="nav_2">
          <li><a href="/cruz">Fonte Divina</a></li>
          <li><a href="/pl">Plano existencial</a></li>
          <li><a href="/idiom">Idiomas</a></li>
          <li><a href="/padrao">Padrões universais</a></li>
          <li id="nav-perfil"><a href="#">Perfil</a></li>
          <li id="nav-login"><a href="/log">Login</a></li>
          <li id="nav-cadastro"><a href="/cdstr">Cadastro</a></li>
        </ul>

        <div className="Log_perf"></div>
      </div>

      <main className="login-container">
        <h2>
          Login
        </h2>

        <p className="cadastro-descricao">
          Entre na sua conta.
        </p>

        <form
          className="form-login"
          id="form-login"
        >
          {/* E-MAIL */}
          <section className="grupo-login">
            <div className="campo-login">
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>
          </section>

          {/* SENHA */}
          <section className="grupo-login">
            <div className="campo-login">
              <input
                placeholder="Senha"
                type="password"
                id="senha"
                name="senha"
                autoComplete="current-password"
                required
              />
            </div>
          </section>

          {/* LEMBRAR */}
          <div className="lembrar-login">
            <label>
              <input
                type="checkbox"
                id="lembrar"
              />
              Lembrar de mim
            </label>
          </div>

          {/* BOTÃO */}
          <button type="submit">
            Entrar
          </button>
        </form>

        {/* LINKS */}
        <div className="links-login">
          <a href="/recuperar">
            Esqueci minha senha
          </a>

          <span>•</span>

          <a href="/cdstr">
            Criar uma conta
          </a>
        </div>
      </main>

      {/* Scripts específicos do login se necessário, como o Login.js */}
      <script src="/Login.js" defer></script>
    </main>
  );
}