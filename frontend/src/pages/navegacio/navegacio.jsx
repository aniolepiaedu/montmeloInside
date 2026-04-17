import "./navegacio.css";

export default function Navegacio() {
  return (
    <div className="app-bg">

      <div className="mobile-screen">

        {/* HEADER */}
        <header className="top-bar">
          <button className="back">←</button>
          <span>Tribuna A</span>
        </header>

        {/* MAPA */}
        <div className="map-card">
          <img src="/assets/mapa.png" alt="mapa" />
        </div>

        {/* INFO */}
        <div className="content">
          <h1>Tribuna A</h1>
          <p className="sub">Area NORD</p>

          <div className="meta">
            <span>📍 350m</span>
            <span>🚶 4 min caminant</span>
          </div>
        </div>

        {/* BOTONES */}
        <div className="actions">
          <button className="primary">▲ Iniciar navegació</button>
          <button className="secondary">Veure serveis propers</button>
        </div>

        {/* NAVBAR */}
        <nav className="bottom-nav">
          <div className="active">Mapa</div>
          <div>Serveis</div>
          <div>Perfil</div>
        </nav>

      </div>

    </div>
  );
}