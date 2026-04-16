import "./App.css";
import { Link } from "react-router-dom";

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

          <Link to="/como-llegar" className="btn primary">
            <img
              src="/images/iconLogin.png"
              alt="icon"
              className="btn-icon"
            />
            Com arribar-hi
          </Link>

          <Link to="/login" className="btn secondary">
            Iniciar sessió
          </Link>

        </div>
      </main>

    </div>
  );
}