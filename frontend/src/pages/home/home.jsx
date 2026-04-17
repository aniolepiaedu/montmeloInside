import { useState, useEffect, useRef } from "react";
import {
  MapContainer, TileLayer, Marker, Popup,
  Circle, Polyline, useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./home.css";
import Navbar from "../components/nav/nav.jsx";

const PUNTS = [
  {
    id: 1, lat: 41.5700, lng: 2.2609,
    label: "Circuit de Barcelona-Catalunya",
    sublabel: "5 min des de la teva ubicació",
    categoria: "Circuit", tipus: "main",
  },
];

const MAP_CENTER = [41.5700, 2.2609];

const TIPUS_COLOR = { main: "#e63946", secondary: "#1d6fc4", info: "#e07b1a" };
const TIPUS_LABEL = { main: "Principal", secondary: "Secundari", info: "Interès" };

// ── Custom map icons ───────────────────────────────────────────────────────
const makeIconPunt = (tipus, actiu = false) => L.divIcon({
  className: "",
  html: `<div class="mc-leaflet-pin mc-leaflet-pin--${tipus} ${actiu ? "mc-leaflet-pin--actiu" : ""}">
    <div class="mc-leaflet-pin-inner"></div>
    ${tipus === "main" ? '<div class="mc-leaflet-pin-tail"></div>' : ""}
  </div>`,
  iconSize: tipus === "main" ? [28, 36] : [18, 18],
  iconAnchor: tipus === "main" ? [14, 36] : [9, 9],
  popupAnchor: [0, tipus === "main" ? -38 : -12],
});

const iconUser = L.divIcon({
  className: "",
  html: `<div class="mc-leaflet-user"><div class="mc-leaflet-user-pulse"></div><div class="mc-leaflet-user-dot"></div></div>`,
  iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -14],
});

// ── Helpers ────────────────────────────────────────────────────────────────
function decodePolyline(encoded) {
  let index = 0, lat = 0, lng = 0;
  const coords = [];
  while (index < encoded.length) {
    let shift = 0, result = 0, b;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : result >> 1;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : result >> 1;
    coords.push([lat / 1e5, lng / 1e5]);
  }
  return coords;
}

const distKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371, r = d => d * Math.PI / 180;
  const a = Math.sin(r(lat2-lat1)/2)**2 + Math.cos(r(lat1))*Math.cos(r(lat2))*Math.sin(r(lon2-lon1)/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const formatMin = (seg) => {
  const m = Math.round(seg / 60);
  return m < 60 ? `${m} min` : `${Math.floor(m/60)}h ${m%60}min`;
};

// ── Leaflet helpers ────────────────────────────────────────────────────────
function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo(target.center, target.zoom, { duration: 1.1 }); }, [target]);
  return null;
}

function FitRuta({ puntos }) {
  const map = useMap();
  useEffect(() => {
    if (puntos?.length > 1) map.fitBounds(L.latLngBounds(puntos), { padding: [60, 60], duration: 1 });
  }, [puntos]);
  return null;
}

// ══════════════════════════════════════════════════════════════════════════
export default function MapaCircuit() {
  const [geoStatus, setGeoStatus]     = useState("idle");
  const [userPos, setUserPos]         = useState(null);
  const [puntSel, setPuntSel]         = useState(PUNTS[0]);
  const [flyTarget, setFlyTarget]     = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cerca, setCerca]             = useState("");
  const [rutaPuntos, setRutaPuntos]   = useState(null);
  const [rutaInfo, setRutaInfo]       = useState(null);
  const [rutaCargant, setRutaCargant] = useState(false);
  const [modoRuta, setModoRuta]       = useState("driving");
  const [fitRuta, setFitRuta]         = useState(null);
  const [mobileSheet, setMobileSheet] = useState(false);

  // ── Geo ──────────────────────────────────────────────────────────────────
  const demanarUbicacio = () => {
    if (!navigator.geolocation) { setGeoStatus("unavailable"); return; }
    setGeoStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserPos([pos.coords.latitude, pos.coords.longitude]); setGeoStatus("granted"); },
      () => setGeoStatus("denied"),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };
  useEffect(() => { demanarUbicacio(); }, []);

  // ── Ruta OSRM ────────────────────────────────────────────────────────────
  const calcularRuta = async (desde, hasta, perfil = "driving") => {
    if (!desde || !hasta) return;
    setRutaCargant(true); setRutaPuntos(null); setRutaInfo(null);
    try {
      const url = `https://router.project-osrm.org/route/v1/${perfil}/${desde[1]},${desde[0]};${hasta[1]},${hasta[0]}?overview=full&geometries=polyline`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.code !== "Ok") throw new Error();
      const route = data.routes[0];
      const pts = decodePolyline(route.geometry);
      setRutaPuntos(pts);
      setRutaInfo({ distancia: (route.distance/1000).toFixed(2), temps: formatMin(route.duration) });
      setFitRuta(pts);
    } catch { setRutaInfo({ error: true }); }
    finally { setRutaCargant(false); }
  };

  const limpiarRuta = () => { setRutaPuntos(null); setRutaInfo(null); setFitRuta(null); };

  useEffect(() => {
    if (puntSel && userPos && rutaPuntos) {
      calcularRuta(userPos, [puntSel.lat, puntSel.lng], modoRuta);
    }
  }, [modoRuta]);

  const selPunt = (punt) => {
    setPuntSel(punt);
    limpiarRuta();
    setFlyTarget({ center: [punt.lat, punt.lng], zoom: 15 });
    setMobileSheet(false);
  };

  const filtrats = PUNTS.filter(p =>
    p.label.toLowerCase().includes(cerca.toLowerCase()) ||
    p.categoria.toLowerCase().includes(cerca.toLowerCase())
  );

  // ─── GEO LOADING ──────────────────────────────────────────────────────────
  if (geoStatus === "idle" || geoStatus === "requesting") {
    return (
      <div className="mc-page mc-geo-page">
        <div className="mc-geo-rings">
          <div className="mc-geo-ring mc-geo-ring-1" />
          <div className="mc-geo-ring mc-geo-ring-2" />
          <div className="mc-geo-ring mc-geo-ring-3" />
          <div className="mc-geo-center-dot">📍</div>
        </div>
        <h2 className="mc-geo-loading-title">Obtenint ubicació…</h2>
        <p className="mc-geo-loading-sub">El navegador pot demanar permís a la barra superior</p>
      </div>
    );
  }

  if (geoStatus === "denied" || geoStatus === "unavailable") {
    return (
      <div className="mc-page mc-geo-page">
        <div className="mc-geo-denied-icon">🚫</div>
        <h2 className="mc-geo-loading-title">Ubicació no disponible</h2>
        <p className="mc-geo-loading-sub">
          {geoStatus === "unavailable"
            ? "El teu dispositiu no suporta geolocalització."
            : "Has denegat el permís. Activa-la des de la configuració del navegador."}
        </p>
        <div className="mc-geo-btns">
          {geoStatus === "denied" && (
            <button className="mc-geo-btn-primary" onClick={demanarUbicacio}>Tornar a intentar</button>
          )}
          <button className="mc-geo-btn-ghost" onClick={() => setGeoStatus("granted")}>
            Continuar sense ubicació
          </button>
        </div>
      </div>
    );
  }

  // ─── MAIN LAYOUT ─────────────────────────────────────────────────────────
  const mapCenter = userPos || MAP_CENTER;

  return (
    <div className="mc-page">

      {/* ══ TOPBAR ══ */}
      <header className="mc-topbar">
        <div className="mc-topbar-left">
          <div className="mc-brand">
            <div className="mc-brand-icon">⬡</div>
            <div className="mc-brand-text">
              <span className="mc-brand-name">Circuit</span>
              <span className="mc-brand-sub">Mapa del Circuit</span>
            </div>
          </div>
        </div>

        <div className="mc-topbar-center">
          <div className="mc-searchbox">
            <svg className="mc-searchbox-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Cerca destinacions…"
              value={cerca}
              onChange={e => setCerca(e.target.value)}
            />
            {cerca && <button className="mc-searchbox-clear" onClick={() => setCerca("")}>✕</button>}
          </div>
        </div>
      </header>

      <div className="mc-body">

        {/* ══ SIDEBAR ══ */}
      

        {/* ══ MAPA ══ */}
        <main className="mc-map-wrap">
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="mc-leaflet-map"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {flyTarget && !fitRuta && <FlyTo target={flyTarget} />}
            {fitRuta   && <FitRuta puntos={fitRuta} />}

            {/* Pin usuari */}
            {userPos && (
              <Marker position={userPos} icon={iconUser}>
                <Popup className="mc-popup">
                  <div className="mc-popup-inner">
                    <strong>La teva posició</strong>
                    <span>{userPos[0].toFixed(5)}, {userPos[1].toFixed(5)}</span>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Pins POI */}
            {filtrats.map(punt => (
              <Marker
                key={punt.id}
                position={[punt.lat, punt.lng]}
                icon={makeIconPunt(punt.tipus, puntSel?.id === punt.id)}
                eventHandlers={{ click: () => selPunt(punt) }}
              >
                <Popup className="mc-popup">
                  <div className="mc-popup-inner">
                    <strong>{punt.label}</strong>
                    <span>{punt.categoria}</span>
                    {userPos && (
                      <span>📍 {distKm(userPos[0], userPos[1], punt.lat, punt.lng).toFixed(2)} km</span>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Zoom controls */}
          <div className="mc-zoom">
            <button className="mc-zoom-btn" onClick={() => {}}>+</button>
            <div className="mc-zoom-sep" />
            <button className="mc-zoom-btn" onClick={() => {}}>−</button>
          </div>

          {/* Ruta info flotant */}
          {(rutaCargant || rutaInfo) && (
            <div className={`mc-ruta-info ${rutaCargant ? "mc-ruta-info--loading" : ""} ${rutaInfo?.error ? "mc-ruta-info--error" : ""}`}>
              {rutaCargant && <><div className="mc-spinner"/><span>Calculant ruta…</span></>}
              {!rutaCargant && rutaInfo && !rutaInfo.error && (<>
                <div className="mc-ruta-stat">
                  <span className="mc-ruta-emoji">{modoRuta === "driving" ? "🚗" : "🚶"}</span>
                  <span className="mc-ruta-val">{rutaInfo.temps}</span>
                </div>
                <div className="mc-ruta-sep"/>
                <div className="mc-ruta-stat">
                  <span className="mc-ruta-emoji">📏</span>
                  <span className="mc-ruta-val">{rutaInfo.distancia} km</span>
                </div>
                <button className="mc-ruta-close" onClick={limpiarRuta}>✕</button>
              </>)}
              {!rutaCargant && rutaInfo?.error && (
                <><span>⚠️ No s'ha pogut calcular la ruta</span><button className="mc-ruta-close" onClick={limpiarRuta}>✕</button></>
              )}
            </div>
          )}

         
        </main>
        {puntSel && (
  <div className="mc-card-arribar">
    <div className="mc-card-content">
      <div className="mc-card-title">
        {puntSel.nom}
      </div>

      <h2>Circuit de Barcelona-Catalunya en Montmelo</h2>

      <div className="mc-card-time">
        <span className="mc-dot"></span>
        Temps d’arribada: 5 min
      </div>

      <button
        className="mc-btn-arribar"
        onClick={() =>
          calcularRuta(userPos, [puntSel.lat, puntSel.lng], modoRuta)
        }
      >
        Com arribar
      </button>
    </div>
    <Navbar/>
  </div>
  
)}


      </div>
    </div>
  );
}