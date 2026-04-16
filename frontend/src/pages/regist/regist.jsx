import { useState } from "react";
import "./regist.css";

export default function Regist() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("ERROR:", data.message);
    alert(data.message); // 👈 important
    return;
  }

  console.log("OK:", data);
  alert("Usuari creat!");
};

  return (
    <div className="lp-page">
      <div className="lp-card">

        <img src="/images/arrow-left.png" className="lp-back" alt="back" />

        <h1 className="lp-title">Crear compte</h1>
        <p className="lp-subtitle">
          Personalitza la teva experiència al circuit
        </p>

        {/* Nom */}
        <label className="lp-label">Nom complet</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">👤</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Introdueix el teu nom"
          />
        </div>

        {/* Email */}
        <label className="lp-label">Correu electrònic</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">✉</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="exemple@circuit.cat"
          />
        </div>

        {/* Password */}
        <label className="lp-label">Contrasenya</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔒</span>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
          />
        </div>

        {/* Confirm */}
        <label className="lp-label">Confirmar contrasenya</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔒</span>
          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
          />
        </div>

        {/* Terms */}
        <div className="lp-options">
          <label className="lp-remember">
            <input type="checkbox" />
            Accepto els termes i condicions i la política de privacitat del circuit.
          </label>
        </div>

        {/* Button */}
        <button className="lp-submit" onClick={handleSubmit}>
          Crear compte
        </button>

        <p className="lp-register">
          Ja tens compte? <a href="/login">Iniciar sessió</a>
        </p>

      </div>
    </div>
  );
}