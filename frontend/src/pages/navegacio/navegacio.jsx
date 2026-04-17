import React from "react";
import "./navegacio.css";

export default function Navegacio() {
  return (
    <div className="app-viewport">
      <div className="main-container">
        {/* HEADER IGUAL AL DE PERFIL */}
        <header className="header-simple">
          <button className="back-arrow">←</button>
          <h1 className="header-title">Tribuna A</h1>
        </header>

        <main className="layout-content">
          {/* SECCIÓN SUPERIOR: MAPA Y INFO BÁSICA */}
          <section className="hero-section">
            <div className="map-wrapper">
              <img src="/assets/mapa.png" alt="Mapa" className="map-img-large" />
            </div>
            <div className="hero-text">
              <h2 className="area-label">Àrea NORD</h2>
              <div className="hero-stats">
                <span>📏 350m</span>
                <span>🚶 4 min caminant</span>
              </div>
            </div>
          </section>

          {/* SECCIÓN DE BOTONES: ESTILO FRANJAS DE PERFIL */}
          <section className="options-list">
            <button className="list-item red-main">
              <span className="icon-up">▲</span> Iniciar navegació
              <span className="chevron">›</span>
            </button>

            <button className="list-item dark-row">
              Veure serveis propers
              <span className="chevron">›</span>
            </button>
          </section>
        </main>

        {/* NAVBAR INFERIOR IDÉNTICA */}
        <nav className="bottom-bar">
          <div className="bar-item">
            <span className="dot-icon pink">📍</span>
            <p>Mapa</p>
          </div>
          <div className="bar-item">
            <span className="dot-icon gold">🎫</span>
            <p>Seients</p>
          </div>
          <div className="bar-item active">
            <span className="dot-icon purple">👤</span>
            <p>Perfil</p>
          </div>
        </nav>
      </div>
    </div>
  );
}