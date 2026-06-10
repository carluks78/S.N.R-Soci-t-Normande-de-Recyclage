import { useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Clock, CheckCircle, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: "", telephone: "", email: "", ville: "", service: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    color: "#f3f4f6",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="pt-32 pb-12 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d1a10 0%, #080808 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(34,197,94,0.1) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 hover:text-[#22c55e] transition-colors"
            style={{ color: "#6b7280", fontSize: "0.875rem" }}
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#22c55e",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Contact & Devis
            </span>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "0.75rem",
                background: "linear-gradient(135deg, #fff 0%, #d1d5db 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Obtenez votre devis gratuit
            </h1>
            <p style={{ color: "#9ca3af", fontSize: "1rem", lineHeight: 1.7, maxWidth: "560px" }}>
              Remplissez le formulaire ou appelez-nous directement. Nous vous répondons sous 2 heures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(34,197,94,0.15)", border: "2px solid rgba(34,197,94,0.4)" }}
                  >
                    <CheckCircle size={32} className="text-[#22c55e]" />
                  </div>
                  <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.3rem" }}>
                    Demande envoyée !
                  </h2>
                  <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Merci pour votre demande. Nous vous contacterons sous 2 heures aux horaires d'ouverture.
                  </p>
                  <a
                    href="tel:0232386009"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    <Phone size={16} /> Appeler maintenant
                  </a>
                </div>
              ) : (
                <>
                  <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.5rem", fontSize: "1.15rem" }}>
                    Formulaire de devis
                  </h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                          Nom *
                        </label>
                        <input
                          name="nom"
                          required
                          value={form.nom}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                          Téléphone *
                        </label>
                        <input
                          name="telephone"
                          required
                          type="tel"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="06 00 00 00 00"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                          Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jean@exemple.fr"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                          Ville
                        </label>
                        <input
                          name="ville"
                          value={form.ville}
                          onChange={handleChange}
                          placeholder="Évreux, Rouen..."
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        Service souhaité
                      </label>
                      <select name="service" value={form.service} onChange={handleChange} style={inputStyle}>
                        <option value="" style={{ background: "#111" }}>Choisir un service</option>
                        {/* AJOUT IMPORTANT */}
  <option value="epaves" style={{ background: "#111" }}>
    Enlèvement d'épaves
  </option>
                        <option value="rachat" style={{ background: "#111" }}>Rachat de métaux</option>
                        <option value="collecte" style={{ background: "#111" }}>Collecte de ferraille</option>
                        <option value="demolition" style={{ background: "#111" }}>Démolition</option>
                        <option value="benne" style={{ background: "#111" }}>Location de benne</option>
                        <option value="debarras" style={{ background: "#111" }}>Débarras industriel</option>
                        <option value="enlevement" style={{ background: "#111" }}>Enlèvement ferraille</option>
                        <option value="autre" style={{ background: "#111" }}>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem" }}>
                        Description de votre besoin *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Décrivez votre ferraille, les quantités estimées, votre situation..."
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 py-4 rounded-xl transition-all hover:scale-105 mt-2"
                      style={{
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1rem",
                        boxShadow: "0 0 25px rgba(34,197,94,0.35)",
                      }}
                    >
                      <Send size={18} />
                      Envoyer ma demande
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Phone */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <h3 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.5rem" }}>Appel direct</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                Plus rapide qu'un formulaire. Réponse immédiate durant nos horaires.
              </p>
              <a
                href="tel:0232386009"
                className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  boxShadow: "0 0 25px rgba(34,197,94,0.4)",
                }}
              >
                <Phone size={22} />
                <div>
                  <div>02 32 38 60 09</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 400, opacity: 0.85 }}>Lun–Ven 8h–17h | Sam 8h–12h</div>
                </div>
              </a>
            </div>

            {/* Address */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>
                Nos coordonnées
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <div style={{ color: "#f3f4f6", fontSize: "0.875rem" }}>Chemin des Vignes</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>27120 Chaignes, Eure (27)</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <div style={{ color: "#f3f4f6", fontSize: "0.875rem" }}>Lundi – Vendredi : 8h00 – 17h00</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>Samedi : 8h00 – 12h00</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Guarantees */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>
                Nos engagements
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Réponse sous 2h en semaine",
                  "Devis 100% gratuit et sans engagement",
                  "Intervention dans les 24-48h",
                  "Prix aligné sur le cours du marché",
                  "Intervention dans tout le 27 et Normandie",
                ].map((g) => (
                  <li key={g} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-[#22c55e] shrink-0" />
                    <span style={{ color: "#d1d5db", fontSize: "0.85rem" }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
