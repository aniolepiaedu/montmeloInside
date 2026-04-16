import "./perfil.css";

const menuItems = [
  "La meva grada",
  "Entrades i esdeveniments",
  "Preferències de notificacions",
  "Historial de navegació",
  "Ajuda i suport",
  "Termes i condicions",
];

export default function Perfil() {
  return (
    <div className="mobile-screen profile-screen">
      <header className="top-bar">
        <button className="back-button">←</button>
        <h1>Perfil</h1>
      </header>

      <main className="profile-content">
        <div className="avatar-wrapper">
          <div className="avatar">👤</div>
        </div>

        <h2 className="profile-name">Pedro Abascal</h2>
        <p className="profile-email">pedro@gmail.com</p>

        <button className="edit-profile-btn">Editar perfil</button>

        <div className="profile-menu">
          {menuItems.map((item) => (
            <button key={item} className="profile-menu-item">
              <span>{item}</span>
              <span>›</span>
            </button>
          ))}
        </div>

        <button className="logout-btn">TANCAR SESSIÓ</button>
      </main>

      <nav className="bottom-nav">
        <button className="nav-item">
          <span>📍</span>
          <small>Mapa</small>
        </button>
        <button className="nav-item">
          <span>🎫</span>
          <small>Seients</small>
        </button>
        <button className="nav-item active">
          <span>👤</span>
          <small>Perfil</small>
        </button>
      </nav>
    </div>
  );
}