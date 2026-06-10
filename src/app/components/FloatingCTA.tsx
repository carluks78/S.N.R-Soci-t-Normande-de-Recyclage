import { useState, useEffect } from "react";
import { Phone, FileText, X } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem("snr-popup-dismissed")) {
        setShowPopup(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const dismissPopup = () => {
    setShowPopup(false);
    localStorage.setItem("snr-popup-dismissed", "1");
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
          >
            {/* Devis button */}
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105"
              style={{
                background: "rgba(18,18,20,0.95)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#22c55e",
                backdropFilter: "blur(16px)",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <FileText size={16} />
              Devis gratuit
            </Link>

            {/* Phone button */}
            <a
              href="tel:0232386009"
              className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all hover:scale-110 relative"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 0 30px rgba(34,197,94,0.5)",
              }}
            >
              <Phone size={22} color="#fff" />
              <span
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-pulse"
                style={{ background: "#4ade80", border: "2px solid #080808" }}
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit-intent popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={dismissPopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, #111114, #1a1a1e)",
                border: "1px solid rgba(34,197,94,0.3)",
                boxShadow: "0 0 60px rgba(34,197,94,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={dismissPopup}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <X size={20} />
              </button>
              <div
                className="text-4xl mb-4"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #4ade80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ♻
              </div>
              <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                Obtenez votre estimation gratuite
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Ferraille, métaux, matériel… nous intervenons dans les 24h dans l'Eure et toute la Normandie.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:0232386009"
                  onClick={dismissPopup}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    boxShadow: "0 0 20px rgba(34,197,94,0.4)",
                  }}
                >
                  <Phone size={18} />
                  02 32 38 60 09
                </a>
                <Link
                  to="/contact"
                  onClick={dismissPopup}
                  className="py-3 rounded-xl transition-colors hover:bg-white/5"
                  style={{
                    border: "1px solid rgba(34,197,94,0.25)",
                    color: "#22c55e",
                    fontSize: "0.9rem",
                  }}
                >
                  Formulaire de devis
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
