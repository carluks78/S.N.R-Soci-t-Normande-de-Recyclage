import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import logoSNR from "../../imports/logo_snr.jpeg";

const navLinks = [
  { label: "Accueil", to: "/" },
  {
    label: "Services",
    children: [
      { label: "Enlèvement d'épaves", to: "/enlevement-epaves" },
      { label: "Rachat de métaux", to: "/services/rachat-metaux" },
      { label: "Collecte de ferraille", to: "/services/collecte-ferraille" },
      { label: "Démolition", to: "/services/demolition" },
      { label: "Location de benne", to: "/services/location-benne" },
      { label: "Débarras industriel", to: "/services/debarras-industriel" },
      { label: "Enlèvement ferraille", to: "/services/enlevement-ferraille" },
    ],
  },

  // NOUVEAU MENU PRINCIPAL
  { label: "Épaviste 27", to: "/enlevement-epaves" },

  { label: "Zones", to: "/#zones" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8,8,8,0.92)"
          : "rgba(8,8,8,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(34,197,94,0.15)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#22c55e] shrink-0">
            <img src={logoSNR} alt="SNR Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "0.05em" }}>
              S<span style={{ color: "#22c55e" }}>.</span>N<span style={{ color: "#22c55e" }}>.</span>R
            </div>
            <div style={{ fontSize: "0.6rem", color: "#9ca3af", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Société Normande de Recyclage
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 transition-colors"
                  style={{ color: "#d1d5db", fontSize: "0.9rem" }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {link.label}
                  <ChevronDown size={14} />
                </button>
                <div
                  className="absolute top-full left-0 pt-2 transition-all duration-200"
                  style={{
                    opacity: servicesOpen ? 1 : 0,
                    pointerEvents: servicesOpen ? "auto" : "none",
                    transform: servicesOpen ? "translateY(0)" : "translateY(-8px)",
                  }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(18,18,20,0.95)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      backdropFilter: "blur(20px)",
                      minWidth: "220px",
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2.5 transition-colors hover:bg-[#22c55e]/10"
                        style={{ color: "#d1d5db", fontSize: "0.85rem" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                className="transition-colors hover:text-[#22c55e]"
                style={{ color: "#d1d5db", fontSize: "0.9rem" }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0232386009"
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              fontSize: "0.9rem",
              fontWeight: 600,
              boxShadow: "0 0 20px rgba(34,197,94,0.3)",
            }}
          >
            <Phone size={16} />
            02 32 38 60 09
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg"
          style={{ color: "#fff" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ background: "rgba(8,8,8,0.98)", borderTop: "1px solid rgba(34,197,94,0.1)" }}
        >
          <Link to="/" className="py-3 border-b border-white/5 hover:text-[#22c55e] transition-colors" style={{ color: "#d1d5db" }}>Accueil</Link>
          <div className="py-2 border-b border-white/5">
            <div style={{ color: "#9ca3af", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Services</div>
            {navLinks[1].children?.map((child) => (
              <Link key={child.to} to={child.to} className="block py-2 pl-3 hover:text-[#22c55e] transition-colors" style={{ color: "#d1d5db", fontSize: "0.9rem" }}>
                {child.label}
              </Link>
            ))}
          </div>
          <Link to="/#zones" className="py-3 border-b border-white/5 hover:text-[#22c55e] transition-colors" style={{ color: "#d1d5db" }}>Zones</Link>
          <Link to="/contact" className="py-3 border-b border-white/5 hover:text-[#22c55e] transition-colors" style={{ color: "#d1d5db" }}>Contact</Link>
          <a
            href="tel:0232386009"
            className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl"
            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontWeight: 600 }}
          >
            <Phone size={18} />
            02 32 38 60 09
          </a>
        </div>
      )}
    </header>
  );
}
