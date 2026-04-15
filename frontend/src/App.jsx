import "./App.css";

export default function Login() {
  return (
    <div className="login-page">

      {/* Logo centrado */}
      <header className="login-header">
        <img
          src="/images/logo.png"
          alt="Montmeló Inside"
          className="logo"
        />
      </header>

      {/* Contenido */}
      <main className="login-content">

        <h2 className="subtitle">
          Navegació intel·ligent dins del circuit
        </h2>

        <div className="buttons">

          <button className="btn primary">
            <img
              src="/images/iconLogin.png"
              alt="icon"
              className="btn-icon"
            />
            Com arribar-hi
          </button>

          <button className="btn secondary">
            Iniciar sessió
          </button>

        </div>
      </main>

    </div>
  );
}