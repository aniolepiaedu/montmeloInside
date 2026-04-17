import { useState } from "react";
import "./nav.css";


export default function Nav() {
  return (
    <nav className="bottom-nav">
      <button className="nav-item">
        <img src="images/mapa.png" alt="Mapa" />
      </button>

      <button className="nav-item active">
        <img src="images/servicio-a-domicilio.png" alt="Serveis" />
      </button>

      <button className="nav-item">
        <img src="images/cuenta.png" alt="Perfil" />
      </button>
    </nav>
  );
}