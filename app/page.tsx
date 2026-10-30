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
          <li><a href="Cruz.html" data-i18n="menu_fonte">Fonte Divina</a></li>
          <li><a href="Pl.html" data-i18n="menu_plano">Plano existencial</a></li>
          <li><a href="Idiom.html">Idiomas</a></li>
          <li><a href="Padrão.html" data-i18n="menu_padrões">Padrões universais</a></li>
          <li id="nav-perfil"><a href="Perf.html">Perfil</a></li>
          <li id="nav-login"><a href="log.html">Login</a></li>
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
          {/* O restante do texto dos 9 tronos, cosmos e família mantêm-se aqui */}
          
          <ul>
            <li>Criador: <strong>Wesley Oliveira Silva</strong></li>
          </ul>
          <div className="Camp_code">
            <input type="search" />
          </div>
        </div>
      </div>
      <script src="/script.js" defer></script>
      <script src="/clock.js" defer></script>
    </main>
  );
}