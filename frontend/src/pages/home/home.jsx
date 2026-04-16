import "./home.css";

export default function Home() {
  return (
    <div className="home-screen">
      
      {/* HEADER */}
      <header className="home-header">
        <h1>Montmeló Inside</h1>
        <p>Circuit en temps real</p>
      </header>

      {/* MAPA */}
      <div className="map-container">
        <iframe
          title="Circuit de Barcelona-Catalunya"
          className="map"
          src="https://www.google.com/maps?q=Circuit+de+Barcelona-Catalunya&output=embed"
          loading="lazy"
        />
      </div>

      {/* INFO CARD */}
      <div className="info-card">
        <h2>🏁 Circuit de Barcelona-Catalunya</h2>
        <p>
          Ubicació: Montmeló, Barcelona
        </p>

        <div className="stats">
          <div>
            <strong>4.657 km</strong>
            <span>Longitud</span>
          </div>
          <div>
            <strong>16</strong>
            <span>Corbes</span>
          </div>
          <div>
            <strong>1991</strong>
            <span>Obertura</span>
          </div>
        </div>
      </div>

      {/* BOTÓ ACCIÓ */}
      <button className="cta-button">
        🔍 Cercar dins el circuit
      </button>

    </div>
  );
}