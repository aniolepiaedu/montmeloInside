import "./regist.css";

export default function Regist() {
  return (
    <div className="lp-page">
      <div className="lp-card">

        {/* Back */}
        <img src="/images/arrow-left.png" className="lp-back" alt="back" />

        {/* Header */}
        <h1 className="lp-title">Crear compte</h1>
        <p className="lp-subtitle">
          Personalitza la teva experiència al circuit
        </p>

        {/* Nom */}
        <label className="lp-label">Nom complet</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">👤</span>
          <input type="text" placeholder="Introdueix el teu nom" />
        </div>

        {/* Email */}
        <label className="lp-label">Correu electrònic</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">✉</span>
          <input type="email" placeholder="exemple@circuit.cat" />
        </div>

        {/* Password */}
        <label className="lp-label">Contrasenya</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔒</span>
          <input type="password" placeholder="••••••••" />
          <button type="button" className="lp-eye">👁</button>
        </div>

        {/* Confirm password */}
        <label className="lp-label">Confirmar contrasenya</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔒</span>
          <input type="password" placeholder="••••••••" />
          <button type="button" className="lp-eye">👁</button>
        </div>

        {/* Terms */}
        <div className="lp-options">
          <label className="lp-remember">
            <input type="checkbox" />
            Accepto els termes i condicions i la política de privacitat del circuit.
          </label>
        </div>

        {/* Button */}
        <button className="lp-submit">
          Crear compte
        </button>

        {/* Login link */}
        <p className="lp-register">
          Ja tens compte? <a href="/login">Iniciar sessió</a>
        </p>

      </div>
    </div>
  );
}