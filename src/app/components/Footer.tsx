import { Link } from "react-router";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import logoSNR from "../../imports/logo_snr.jpeg";
import { Facebook, Music2 } from "lucide-react";

const cities = [
  "Évreux", "Vernon", "Louviers", "Gisors", "Val-de-Reuil",
  "Les Andelys", "Gaillon", "Pacy-sur-Eure", "Rouen",
  "Caen", "Le Havre", "Alençon", "Saint-Lô",
];

const services = [
  { label: "Enlèvement d'épaves", to: "/enlevement-epaves" },
  { label: "Rachat de métaux", to: "/services/rachat-metaux" },
  { label: "Collecte de ferraille", to: "/services/collecte-ferraille" },
  { label: "Démolition", to: "/services/demolition" },
  { label: "Location de benne", to: "/services/location-benne" },
  { label: "Débarras industriel", to: "/services/debarras-industriel" },
  { label: "Enlèvement ferraille", to: "/services/enlevement-ferraille" },
];

export function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
<div>
  <div className="flex items-center gap-3 mb-4">
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22c55e]">
      <img src={logoSNR} alt="SNR" className="w-full h-full object-cover" />
    </div>

    <div>
      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
        S<span style={{ color: "#22c55e" }}>.</span>N<span style={{ color: "#22c55e" }}>.</span>R
      </div>
      <div style={{ fontSize: "0.6rem", color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Société Normande de Recyclage
      </div>
    </div>
  </div>

  <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1rem" }}>
    Ferrailleur professionnel dans l'Eure (27) et toute la Normandie. Rachat, collecte et valorisation de métaux ferreux et non ferreux.
  </p>

  {/* Social links */}
  <div className="flex items-center gap-3 mt-4">
    <a
      href="https://www.facebook.com/share/1BAwF7gd6i/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-colors"
      style={{ color: "#1877F2", border: "1px solid rgba(24,119,242,0.3)" }}
    >
      <Facebook size={16} />
      Facebook
    </a>

    <a
      href="https://www.tiktok.com/@la.snr.27"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
      style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
    >
      <Music2 size={16} />
      TikTok
    </a>
  </div>
</div>
        {/* Contact */}
        <div>
          <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
              <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                Chemin des Vignes<br />27120 Chaignes, Eure
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#22c55e] shrink-0" />
              <a href="tel:0232386009" className="hover:text-[#22c55e] transition-colors" style={{ color: "#d1d5db", fontSize: "0.85rem" }}>
                02 32 38 60 09
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#22c55e] shrink-0" />
              <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>snr27@orange.fr</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
              <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                <div>Lun–Ven: 9h–12h et de 13h30 à 17h30</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>Nos Services</h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="flex items-center gap-2 hover:text-[#22c55e] transition-colors group"
                  style={{ color: "#6b7280", fontSize: "0.85rem" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Zones */}
        <div>
          <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1rem", fontSize: "1rem" }}>Zones d'Intervention</h3>
          <div className="flex flex-wrap gap-1.5">
            {cities.map((city) => (
              <span
                key={city}
                className="px-2 py-1 rounded"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                }}
              >
                {city}
              </span>
            ))}
            <span
              className="px-2 py-1 rounded"
              style={{
                background: "rgba(34,197,94,0.15)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
                fontSize: "0.75rem",
              }}
            >
              + 100 km
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ color: "#4b5563", fontSize: "0.78rem" }}>
            © 2026 La Société Normande de Recyclage — Tous droits réservés
          </p>
          <div className="flex items-center gap-5">
            <Link to="/mentions-legales" className="hover:text-[#22c55e] transition-colors" style={{ color: "#4b5563", fontSize: "0.78rem" }}>
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="hover:text-[#22c55e] transition-colors" style={{ color: "#4b5563", fontSize: "0.78rem" }}>
              Confidentialité
            </Link>
            <span style={{ color: "#4b5563", fontSize: "0.78rem" }}>SIRET: en cours</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
