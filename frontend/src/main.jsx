import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Login from "./pages/login/login.jsx";
import Regist from "./pages/regist/regist.jsx";
import Destinacio from "./pages/destinacio/destinacio.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Home from "./pages/home/home.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/destinacio" element={<Destinacio />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);