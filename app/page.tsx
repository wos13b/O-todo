export default function Page() {
  // Caso precise de dados dinâmicos equivalentes ao antigo dadosSSR
  const dadosSSR = {
    setorNome: "Uno",
    ano: "2026"
  };

  return (
    <main>
      <canvas id="matrix-canvas"></canvas>
      <div className="header">
        <button className="menu-toggle">☰</button>
        <ul className="kalk">
          <li><a href="Idiom.html">Idioma</a></li>
          <li><a href="Perfis.html">Perfis</a></li>
          <li><button id="matrixToggleBtn" className="matrix-toggle-btn">Matrix: ON</button></li>
        </ul>
        <ul className="nav">
          <li><a href="/" data-i18n="menu_inicio">Inicio</a></li>
          <li><a href="Elemental.html" data-i18n="menu_Fisica">Fisica/Quimica</a></li>
        </ul>
        <ul className="nav_2">
          <li><a href="/acervo" data-i18n="menu_fonte">Fonte Divina</a></li>
          <li><a href="Pl.html" data-i18n="menu_plano">Plano existencial</a></li>
          <li><a href="Idiom.html">Idiomas</a></li>
          <li><a href="Padrão.html" data-i18n="menu_padrões">Padrões universais</a></li>
          <li id="nav-perfil"><a href="Perf.html">Perfil</a></li>
          <li id="nav-login"><a href="/log">Login</a></li>
          <li id="nav-cadastro"><a href="Cdstr.html">Cadastro</a></li>
        </ul>
        <div className="Log_perf"></div>
      </div>

      <div className="Main">
        <div className="Conteudo">
          <div className="cosmic-dashboard">
            <div className="dashboard-clocks-row">
              <div className="mini-clock planet-clock-integrated" style={{ justifyContent: 'space-between', padding: '6px 16px' }}>
                <span id="miniClockTime" style={{ display: 'none' }}>00:00:00</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="planet-mini-display">
                    <span id="pNum1" className="planet-number">00</span>
                    <span id="pDigit1" className="planet-digit" title="Regente da Parte 1">☉</span>
                  </div>
                  <span className="planet-colon-mini">:</span>
                  <div className="planet-mini-display">
                    <span id="pNum2" className="planet-number">00</span>
                    <span id="pDigit2" className="planet-digit" title="Regente da Parte 2">☿</span>
                  </div>
                  <span className="planet-colon-mini">:</span>
                  <div className="planet-mini-display">
                    <span id="pNum3" className="planet-number">00</span>
                    <span id="pDigit3" className="planet-digit" title="Regente da Parte 3">♀</span>
                  </div>
                </div>
                <span id="miniClockDate" style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '10px', fontSize: '0.72rem', color: '#a0a5b5', whiteSpace: 'nowrap' }}>--/--/----</span>
              </div>

              <div className="mini-clock reset-clock">
                <span id="resetClockIcon" title="Contador de Resets Cósmicos">♾️</span>
                <span id="resetClockCounter">RESET: 0 (Dia 1/729)</span>
                <span id="resetClockProgress">0.00%</span>
              </div>

              <div className="mini-clock total-seconds-clock">
                <span id="totalSecondsIcon" title="Total de Segundos Decorridos">⏱️</span>
                <span id="totalSecondsCounter">0 s</span>
              </div>
            </div>

            <div className="dashboard-grid-main">
              <div className="Painel_Esquerdo">
                <aside className="sun-panel">
                  <div id="sunIcon" className="sun-icon">☀️</div>
                  <div id="sunSignName" className="moon-phase-name">Calculando...</div>
                  <span id="sunDegree" className="panel-text">Grau: --°</span>
                  <span id="sunElement" className="panel-text">Elemento: --</span>
                </aside>
                <aside className="season-panel">
                  <div id="seasonIcon" className="season-icon">🌿</div>
                  <div id="seasonName" className="moon-phase-name">Calculando...</div>
                  <span id="seasonDesc" className="panel-text">Regime local</span>
                </aside>
              </div>

              <div className="calendar-center-wrapper">
                <div className="Header_clock">
                  <button id="prevYear" className="nav-button">«</button>
                  <button id="prevMonth" className="nav-button">‹</button>
                  <div className="titulo">
                    <h1 id="monthName">{dadosSSR.setorNome}</h1>
                    <span id="yearDisplay">{dadosSSR.ano}</span>
                  </div>
                  <button id="nextMonth" className="nav-button">›</button>
                  <button id="nextYear" className="nav-button">»</button>
                </div>

                <div className="planet-timeline-bar" id="planetTimelineCircle">
                  <div className="timeline-progress-fill" id="timelineProgressFill"></div>
                  <div className="timeline-segments-container" id="timelineSegmentsContainer"></div>
                </div>

                <section className="calendar">
                  <div className="calendar-months-ring" id="calendarMonthsRing"></div>
                  <div className="calendar-center">
                    <div id="centerMonth">Uno</div>
                    <div id="centerYear">2026</div>
                    <span id="yearNumerology"></span>
                  </div>
                  <div className="weekdays">
                    <div>T. BRAN</div>
                    <div>T. VERD</div>
                    <div>T. PRET</div>
                  </div>
                  <div id="days" className="days"></div>
                </section>
              </div>

              <div className="Painel_Direito">
                <aside className="moon-panel">
                  <div id="moonIcon" className="moon-icon">🌑</div>
                  <div id="moonPhaseName" className="moon-phase-name">Calculando...</div>
                  <span id="moonSign" className="panel-text">Signo: --</span>
                  <span id="moonDegree" className="panel-text">Grau: --°</span>
                  <span id="moonIllumination" className="panel-text">Iluminação: --%</span>
                  <span id="moonAge" className="panel-text">Idade: -- dias</span>
                </aside>
                <aside className="planet-panel">
                  <div id="planetIcon" className="sun-icon">🪐</div>
                  <div id="planetName" className="moon-phase-name">Calculando...</div>
                  <span id="planetAspect" className="panel-text">Influência: --</span>
                </aside>
              </div>
            </div>

            <section className="info">
              <h2 id="selectedDate">Selecione um dia</h2>
              <table className="mini-info-table">
                <tbody>
                  <tr>
                    <td><strong>Gregoriana:</strong></td>
                    <td id="gregorianDate">—</td>
                  </tr>
                  <tr>
                    <td><strong>Posição:</strong></td>
                    <td id="dayOfYear">—</td>
                  </tr>
                  <tr>
                    <td><strong>Astronomia:</strong></td>
                    <td>
                      <span id="sunInfo">☀️ Signo Solar: --</span><br />
                      <span id="moonInfo">🌑 Fase Lunar: --</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button id="todayButton" className="today-button">Hoje</button>
            </section>
          </div>

          <h1 data-i18n="title">Os 9 tronos</h1>
          <p>
            Os <strong>9 Tronos</strong> são um sistema criado para servir como um 
            <strong>mapa interno do indivíduo</strong>. Seu objetivo é auxiliar na compreensão 
            de diferentes dimensões da existência: <em>quem sou, de onde vim, onde estou, 
            o que estou vivendo e para onde estou indo</em>.
          </p>

          <p>
            Cada Trono representa uma determinada <strong>etapa, estado ou princípio da 
            experiência humana</strong>. Eles não devem ser entendidos necessariamente como 
            lugares físicos ou como uma sequência linear de desenvolvimento, mas como 
            diferentes pontos de observação pelos quais uma pessoa pode compreender a si 
            mesma e sua relação com o mundo.
          </p>

          <p>
            O sistema utiliza como base o princípio da <strong>fractalização</strong>: 
            um mesmo conjunto de princípios pode se repetir em diferentes escalas. 
            Assim como um ciclo pode conter outros ciclos menores, cada Trono pode ser 
            observado tanto como uma experiência individual quanto como parte de um 
            processo maior.
          </p>

          <p>
            Por esse motivo, os 9 Tronos possuem simultaneamente uma dimensão 
            <strong>espacial</strong> e uma dimensão <strong>temporal</strong>. 
            A dimensão espacial representa <em>onde o indivíduo se encontra</em> dentro 
            do mapa; a dimensão temporal representa <em>em que momento do processo ele está</em>.
          </p>

          <p>
            Dessa forma, o sistema não procura apenas responder 
            <strong>"quem sou eu?"</strong>. Ele procura construir uma visão mais ampla:
          </p>

          <ul>
            <li><strong>Origem:</strong> de onde vim?</li>
            <li><strong>Identidade:</strong> quem sou?</li>
            <li><strong>Posição:</strong> onde estou?</li>
            <li><strong>Experiência:</strong> o que estou vivendo?</li>
            <li><strong>Direção:</strong> para onde estou indo?</li>
          </ul>

          <p>
            Os 9 Tronos foram organizados em uma sequência cromática que vai do 
            <strong>Preto ao Branco</strong>. Essa sequência representa uma passagem 
            simbólica entre diferentes formas de relação com a existência, começando 
            pela necessidade de <strong>possuir e preservar</strong>, passando pela 
            <strong>ação, experiência, expressão, neutralidade, conhecimento, intuição 
            e transcendência</strong>, até chegar à <strong>passividade e entrega</strong>.
          </p>

          <p>
            É importante compreender que isso não significa que um Trono seja 
            simplesmente "melhor" ou "pior" que outro. Cada um expressa uma 
            <strong>função existencial diferente</strong>. O sistema busca compreender 
            quando determinada função aparece, por que ela existe e como ela se 
            relaciona com as demais.
          </p>

          <h3>Os 9 Tronos</h3>

          <ul>
            <li>
              <strong data-i18n="trono_preto_titulo">Trono Preto — Possessividade:</strong>
              representa a necessidade de possuir, preservar, proteger e estabelecer 
              limites sobre aquilo que se considera seu.
            </li>
          <li>
            <strong>Trono Vermelho — Luta e Conquista:</strong>
            representa a ação diante do conflito, a defesa, a competição, a conquista 
            e a capacidade de lutar por aquilo que se considera necessário ou justo.
          </li>

          <li>
            <strong>Trono Laranja — Prazer e Experiência:</strong>
            representa a experimentação da existência através dos sentidos, desejos, 
            prazeres, descobertas e experiências vividas.
          </li>

          <li>
            <strong>Trono Amarelo — Expressão e Propósito:</strong>
            representa a transformação da experiência interna em expressão, criação, 
            comunicação e realização de um propósito.
          </li>

          <li>
            <strong>Trono Verde — Indiferença:</strong>
            representa o afastamento da necessidade de interferir, permitindo 
            observar, repousar, aceitar e permanecer diante das coisas sem 
            necessariamente agir sobre elas.
          </li>

          <li>
            <strong>Trono Azul — Conhecimento e Sabedoria:</strong>
            representa a busca por compreender, organizar e interpretar aquilo 
            que foi vivido, transformando experiência em conhecimento.
          </li>

          <li>
            <strong>Trono Índigo — Intuição:</strong>
            representa formas de percepção que ultrapassam a análise consciente, 
            relacionando padrões, pressentimentos, símbolos e compreensões internas.
          </li>

          <li>
            <strong>Trono Violeta — Transcendência:</strong>
            representa a ultrapassagem dos limites da identidade individual e a 
            busca por uma compreensão mais ampla da existência.
          </li>

          <li>
            <strong>Trono Branco — Passividade:</strong>
            representa a entrega, a receptividade, a ausência de necessidade de 
            controlar e a capacidade de simplesmente existir sem impor uma direção.
          </li>

          </ul>

          <p>
            Assim, os 9 Tronos podem ser compreendidos como <strong>nove modos fundamentais 
            de relação com a existência</strong>. O indivíduo não precisa permanecer 
            permanentemente em apenas um deles. Ao contrário, diferentes situações podem 
            ativar diferentes Tronos, e a compreensão do sistema surge justamente da 
            observação dessas mudanças.
          </p>


          <p>
            O potencial não é aquilo que já somos, mas aquilo que <em>podemos nos tornar</em>.
            Ele existe antes da forma, como uma possibilidade ainda não escolhida entre
            inúmeras outras. Uma semente não é uma floresta, mas carrega em si as condições
            necessárias para que uma floresta possa surgir. Da mesma maneira, uma pequena
            ação, uma ideia ou uma escolha pode conter consequências muito maiores do que
            aquilo que é percebido em seu início.
          </p>

          <p>
            Entretanto, potencial por si só não é manifestação. Para que algo latente se
            torne realidade, é necessário que encontre direção, energia, matéria e tempo.
            O potencial precisa ser conduzido para uma forma. É através desse processo
            que o possível se torna real, o invisível se torna visível e aquilo que
            permanecia adormecido passa a existir como experiência.
          </p>

          <p>
            Por isso, aproveitar o potencial não significa tentar realizar todas as
            possibilidades ao mesmo tempo. Significa reconhecer quais possibilidades
            podem ser cultivadas e escolher uma direção capaz de transformá-las em
            realidade.
          </p>

          <p>
            Quanto maior a capacidade de um sistema de transformar aquilo que possui em
            novas formas, maior é a quantidade de futuros que pode produzir. Uma coisa
            aparentemente simples pode, quando inserida nas condições certas, tornar-se
            origem de algo extraordinariamente complexo.
          </p>

          <p>
            Assim, o infinito não precisa estar naquilo que já existe, mas naquilo que
            <strong>pode surgir a partir do que existe</strong>. Cada existência é,
            simultaneamente, resultado de possibilidades anteriores e origem de novas
            possibilidades.
          </p>

          <p>
            O potencial é, portanto, a dimensão do ser que ainda não se revelou. É o
            espaço entre aquilo que é e aquilo que pode vir a ser.
          </p>
          
          <ul>
            <li>Criador: <strong>Wesley Oliveira Silva</strong></li>
          </ul>
          <div className="Camp_code">
            <input type="search" />
          </div>
        </div>
      </div>
      <script src="/Anim.js" defer></script>
      <script src="/Profile.js" defer></script>
      <script src="/script.js" defer></script>
      <script src="/Clock.js" defer></script>
    </main>
  );
}