import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Phone, FileText, MapPin, CheckCircle, ArrowLeft } from "lucide-react";

const CITY_DATA: Record<string, { dept: string; region: string; distance: string }> = {
  evreux: { dept: "Eure (27)", region: "Normandie", distance: "30 km" },
  vernon: { dept: "Eure (27)", region: "Normandie", distance: "45 km" },
  louviers: { dept: "Eure (27)", region: "Normandie", distance: "25 km" },
  gisors: { dept: "Eure (27)", region: "Normandie", distance: "40 km" },
  "val-de-reuil": { dept: "Eure (27)", region: "Normandie", distance: "20 km" },
  "les-andelys": { dept: "Eure (27)", region: "Normandie", distance: "35 km" },
  gaillon: { dept: "Eure (27)", region: "Normandie", distance: "20 km" },
  "pacy-sur-eure": { dept: "Eure (27)", region: "Normandie", distance: "28 km" },
  "saint-andre-de-l-eure": { dept: "Eure (27)", region: "Normandie", distance: "15 km" },
  rouen: { dept: "Seine-Maritime (76)", region: "Normandie", distance: "65 km" },
  dieppe: { dept: "Seine-Maritime (76)", region: "Normandie", distance: "95 km" },
  "le-havre": { dept: "Seine-Maritime (76)", region: "Normandie", distance: "90 km" },
  yvetot: { dept: "Seine-Maritime (76)", region: "Normandie", distance: "80 km" },
  caen: { dept: "Calvados (14)", region: "Normandie", distance: "85 km" },
  lisieux: { dept: "Calvados (14)", region: "Normandie", distance: "70 km" },
  bayeux: { dept: "Calvados (14)", region: "Normandie", distance: "95 km" },
  alencon: { dept: "Orne (61)", region: "Normandie", distance: "80 km" },
  argentan: { dept: "Orne (61)", region: "Normandie", distance: "70 km" },
  "saint-lo": { dept: "Manche (50)", region: "Normandie", distance: "95 km" },
  cherbourg: { dept: "Manche (50)", region: "Normandie", distance: "100 km" },
};

function formatCityName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("De L ", "de l'")
    .replace("Sur ", "sur-")
    .replace("Le ", "Le ")
    .replace("Les ", "Les ")
    .replace("Saint ", "Saint-");
}

export function CityPage() {
  const { city } = useParams<{ city: string }>();
  const citySlug = city?.toLowerCase() || "";
  const cityInfo = CITY_DATA[citySlug] || { dept: "Normandie", region: "Normandie", distance: "< 100 km" };
  const cityName = formatCityName(citySlug);

  const services = [
    "Rachat de cuivre, aluminium, laiton, inox",
    "Collecte de ferraille à domicile ou sur chantier",
    "Enlèvement d'engins agricoles et poids lourds",
    "Débarras industriel (ateliers, usines, entrepôts)",
    "Démolition légère et évacuation",
    "Location de bennes 10-35 m³",
  ];

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d1a10 0%, #080808 100%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.1) 0%, transparent 60%)",
          }}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#22c55e",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <MapPin size={12} /> {cityInfo.dept} — {cityInfo.distance} de Chaignes
            </span>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #fff 0%, #d1d5db 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ferrailleur {cityName} — Rachat & Recyclage de Métaux
            </h1>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "1rem",
                lineHeight: 1.8,
                maxWidth: "620px",
                marginBottom: "2rem",
              }}
            >
              La Société Normande de Recyclage (SNR) intervient à {cityName} et ses environs pour le rachat, la collecte et la valorisation de ferraille et de métaux ferreux et non ferreux. Service professionnel, rapide et au meilleur prix.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="tel:0232386009"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                fontWeight: 700,
                boxShadow: "0 0 25px rgba(34,197,94,0.35)",
              }}
            >
              <Phone size={18} /> Appeler maintenant
            </a>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 600 }}
            >
              <FileText size={18} /> Devis gratuit
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "1.25rem" }}>
                Votre ferrailleur à {cityName}
              </h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
                Implantée à Chaignes (27120) dans l'Eure, la SNR est votre partenaire de confiance pour le recyclage de métaux à {cityName} et dans un rayon de 100 km. Nous accompagnons aussi bien les particuliers que les artisans, agriculteurs et industriels.
              </p>
              <p style={{ color: "#9ca3af", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Notre équipe intervient rapidement à {cityName} avec du matériel professionnel adapté : camion plateau, grappin, bennes. Nous prenons en charge tous types de métaux et toutes les quantités.
              </p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>
                Nos services à {cityName}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {services.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-[#22c55e] shrink-0 mt-0.5" />
                    <span style={{ color: "#d1d5db", fontSize: "0.875rem", lineHeight: 1.5 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* FAQ locale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.25rem", fontSize: "1.1rem" }}>
                FAQ — Ferrailleur {cityName}
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    q: `Où trouver un ferrailleur à ${cityName} ?`,
                    a: `La Société Normande de Recyclage (SNR) est votre ferrailleur à ${cityName}. Basés à Chaignes (27120), nous intervenons régulièrement à ${cityName} pour collecter, racheter et valoriser vos métaux.`,
                  },
                  {
                    q: `Qui rachète les métaux à ${cityName} ?`,
                    a: `La SNR rachète cuivre, aluminium, laiton, inox, acier et tous métaux à ${cityName}. Appelez le 02 32 38 60 09 pour connaître nos tarifs du jour.`,
                  },
                  {
                    q: `L'enlèvement de ferraille est-il gratuit à ${cityName} ?`,
                    a: `Oui, dans la majorité des cas. L'enlèvement gratuit est possible selon les quantités collectées. Contactez-nous pour une estimation personnalisée.`,
                  },
                ].map((item, i) => (
                  <div key={i} style={{ borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: "1rem" }}>
                    <h3 style={{ color: "#f3f4f6", fontWeight: 600, marginBottom: "0.4rem", fontSize: "0.95rem" }}>{item.q}</h3>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65 }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="p-6 rounded-2xl sticky top-24"
              style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <h3 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem" }}>
                Intervenir à {cityName}
              </h3>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  { label: "Secteur", value: cityInfo.dept },
                  { label: "Distance", value: cityInfo.distance },
                  { label: "Délai", value: "24-48h" },
                  { label: "Devis", value: "Gratuit" },
                ].map((info) => (
                  <div key={info.label} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{info.label}</span>
                    <span style={{ color: "#f3f4f6", fontSize: "0.85rem", fontWeight: 600 }}>{info.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:0232386009"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontWeight: 700,
                    boxShadow: "0 0 20px rgba(34,197,94,0.3)",
                  }}
                >
                  <Phone size={16} /> 02 32 38 60 09
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl transition-colors hover:bg-white/5"
                  style={{ border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontWeight: 600 }}
                >
                  <FileText size={16} /> Devis en ligne
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
