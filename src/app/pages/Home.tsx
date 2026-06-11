import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import {
  Phone, FileText, Star, ChevronDown, CheckCircle,
  Recycle, Truck, Building2, Wrench, Package, Zap,
  MapPin, Clock, Award, Users, ArrowRight, ChevronUp
} from "lucide-react";
import img1 from "../../imports/snr_1.png";
import img3 from "../../imports/snr_3.png";
import img4 from "../../imports/snr_4.png";
import img5 from "../../imports/snr_5.png";

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    slug: "rachat-metaux",
    icon: <Recycle size={28} />,
    title: "Rachat de Métaux",
    subtitle: "Cuivre • Aluminium • Laiton • Inox • Plomb • Zinc",
    description: "Nous rachetons tous types de métaux ferreux et non ferreux au meilleur prix du marché. Estimation gratuite et paiement immédiat.",
    color: "#22c55e",
  },
  {
    slug: "collecte-ferraille",
    icon: <Truck size={28} />,
    title: "Collecte de Ferraille",
    subtitle: "Particuliers • Artisans • Agriculteurs • Entreprises",
    description: "Enlèvement gratuit de ferraille directement sur vos sites, chantiers ou domicile dans l'Eure et toute la Normandie.",
    color: "#16a34a",
  },
  {
    slug: "demolition",
    icon: <Wrench size={28} />,
    title: "Démolition",
    subtitle: "Découpe • Évacuation • Recyclage",
    description: "Travaux de démolition, découpe et évacuation de ferraille avec solutions adaptées. Réactifs, efficaces, écologiques.",
    color: "#22c55e",
  },
  {
    slug: "location-benne",
    icon: <Package size={28} />,
    title: "Location de Benne",
    subtitle: "10 à 35 m³ • Ferraille • Gravats • Déchets",
    description: "Bennes équipées de portes arrière pour un chargement simple. Solutions ponctuelles ou régulières avec tarifs clairs.",
    color: "#16a34a",
  },
  {
    slug: "debarras-industriel",
    icon: <Building2 size={28} />,
    title: "Débarras Industriel",
    subtitle: "Ateliers • Entrepôts • Usines • Bureaux",
    description: "Débarras complet de vos locaux avec tri, évacuation, recyclage et remise en état. Devis gratuit et intervention rapide.",
    color: "#22c55e",
  },
  {
    slug: "enlevement-ferraille",
    icon: <Zap size={28} />,
    title: "Enlèvement Ferraille",
    subtitle: "Engins agricoles • Poids lourds • Matériels TP",
    description: "Rachat et enlèvement d'engins agricoles, poids lourds et matériels TP, roulants ou non roulants. Intervention sous 24h.",
    color: "#16a34a",
  },
];

const STATS = [
  { value: 10000, suffix: "+", label: "Tonnes recyclées", icon: <Recycle size={24} /> },
  { value: 500, suffix: "+", label: "Clients Particuliers et Professionnels satisfaits", icon: <Users size={24} /> },
  { value: 24, suffix: "h", label: "Délai d'intervention", icon: <Clock size={24} /> },
  { value: 100, suffix: "%", label: "Valorisation", icon: <Award size={24} /> },
];

const PROCESS = [
  { step: "01", title: "Contact", desc: "Appelez-nous ou remplissez notre formulaire. Réponse sous 2h." },
  { step: "02", title: "Estimation", desc: "Évaluation gratuite de vos métaux. Prix au cours du marché." },
  { step: "03", title: "Collecte", desc: "Nos équipes interviennent directement sur votre site." },
  { step: "04", title: "Tri", desc: "Séparation et identification des métaux valorisables." },
  { step: "05", title: "Recyclage", desc: "Traitement et recyclage dans le respect de l'environnement." },
  { step: "06", title: "Valorisation", desc: "Vos métaux reprennent vie dans l'industrie locale." },
];

const REVIEWS = [
  { name: "Marc D.", city: "Évreux", rating: 5, text: "Service impeccable. L'équipe SNR est venue enlever ma ferraille en moins de 24h. Très professionnel et prix honnête." },
  { name: "Sophie L.", city: "Rouen", rating: 5, text: "Excellent rapport qualité-prix pour le rachat de cuivre. Paiement rapide. Je recommande vivement." },
  { name: "Jean-Pierre M.", city: "Vernon", rating: 5, text: "Débarras complet de mon atelier en une journée. Équipe sérieuse, ponctuelle et vraiment efficace." },
  { name: "Agriculteur 27", city: "Louviers", rating: 5, text: "Rachat d'engins agricoles roulants et non roulants sans problème. Très satisfait de la transaction." },
  { name: "Entreprise BTP", city: "Caen", rating: 5, text: "Partenaire régulier pour la collecte de ferraille sur nos chantiers. Toujours disponibles et réactifs." },
  { name: "Mme. Petit", city: "Les Andelys", rating: 5, text: "Enlèvement gratuit de ma vieille ferraille. Équipe sympathique, rapide et respectueuse. Merci SNR !" },
];

const FAQ = [
  { q: "Quel est le prix du cuivre aujourd'hui ?", a: "Le prix du cuivre varie selon le cours du marché LME (London Metal Exchange). Contactez-nous pour connaître le tarif actuel au kg. Nous nous alignons toujours sur les cours officiels pour vous garantir le meilleur prix." },
  { q: "Comment vendre sa ferraille à la SNR ?", a: "Appelez-nous au 02 32 38 60 09 ou remplissez notre formulaire en ligne. Nous venons évaluer vos métaux directement sur place, sans frais ni engagement. Paiement rapide après collecte." },
  { q: "Qui rachète les métaux dans l'Eure (27) ?", a: "La Société Normande de Recyclage (SNR) est votre ferrailleur de référence dans l'Eure. Basés à Chaignes (27120), nous intervenons sur tout le département 27 et les zones limitrophes dans un rayon de 100 km." },
  { q: "Comment se passe un enlèvement de ferraille ?", a: "Après votre appel ou formulaire, nous planifions une intervention. Notre équipe vient avec le matériel adapté (camion plateau, grappin) pour charger et emporter vos métaux. L'enlèvement est souvent gratuit selon les quantités." },
  { q: "Quels métaux ont le plus de valeur ?", a: "Le cuivre est le métal le plus valorisé, suivi du laiton, de l'aluminium et de l'inox. Le plomb, le zinc et les métaux précieux ont aussi une bonne valeur. La ferraille ordinaire (acier, fonte) est moins rentable mais acceptée en grande quantité." },
  { q: "Intervenez-vous pour les particuliers ?", a: "Oui, absolument. Nous collectons la ferraille des particuliers : vieux vélos, électroménager, matériaux de construction, machines, etc. L'enlèvement à domicile est proposé selon les quantités et la distance." },
  { q: "Quelle est votre zone d'intervention ?", a: "Nous intervenons principalement dans l'Eure (27) et un rayon de 100 km autour de Chaignes : Évreux, Vernon, Louviers, Rouen, Caen, Le Havre, Alençon et bien d'autres villes de Normandie." },
  { q: "Reprenez-vous les engins agricoles et poids lourds ?", a: "Oui ! Nous rachetons les engins agricoles, poids lourds et matériels TP, qu'ils soient roulants ou non roulants. Contactez-nous pour une estimation gratuite sur place." },
];

const ZONES = [
  { dept: "Eure (27)", cities: ["Évreux", "Vernon", "Louviers", "Gisors", "Val-de-Reuil", "Les Andelys", "Gaillon", "Pacy-sur-Eure", "Saint-André-de-l'Eure"] },
  { dept: "Seine-Maritime (76)", cities: ["Rouen", "Dieppe", "Le Havre", "Yvetot"] },
  { dept: "Calvados (14)", cities: ["Caen", "Lisieux", "Bayeux"] },
  { dept: "Orne (61)", cities: ["Alençon", "Argentan"] },
  { dept: "Manche (50)", cities: ["Saint-Lô", "Cherbourg"] },
];

const BLOG_ARTICLES = [
  { title: "Prix du cuivre 2026 : cours et tendances", slug: "prix-cuivre-2026", excerpt: "Tout savoir sur le cours du cuivre en 2026, les facteurs qui influencent son prix et comment maximiser votre rachat.", date: "15 mai 2026" },
  { title: "Où vendre ses métaux dans l'Eure ?", slug: "vendre-metaux-eure", excerpt: "Guide complet pour trouver le meilleur ferrailleur dans le département 27 et obtenir le meilleur prix pour vos métaux.", date: "2 mai 2026" },
  { title: "Comment reconnaître et trier le cuivre, laiton et aluminium", slug: "reconnaitre-cuivre-laiton-aluminium", excerpt: "Apprenez à identifier vos métaux pour mieux les valoriser. Astuces pratiques pour trier avant la vente.", date: "20 avril 2026" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

function FadeInWhenVisible({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <FadeInWhenVisible className="text-center mb-12 md:mb-16">
      <span
        className="inline-block px-4 py-1.5 rounded-full mb-4"
        style={{
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.25)",
          color: "#22c55e",
          fontSize: "0.78rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          background: "linear-gradient(135deg, #fff 0%, #d1d5db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: subtitle ? "0.75rem" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "#6b7280", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
    </FadeInWhenVisible>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={img1} alt="Société Normande de Recyclage - ferrailleur Eure" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.85) 60%, rgba(8,8,8,1) 100%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {[
            { icon: <Star size={12} fill="#22c55e" stroke="none" />, text: "4.9 Google" },
            { icon: <MapPin size={12} className="text-[#22c55e]" />, text: "Chaignes, Eure (27)" },
            { icon: <Clock size={12} className="text-[#22c55e]" />, text: "Intervention 24h" },
          ].map((badge) => (
            <span
              key={badge.text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#d1d5db",
                fontSize: "0.78rem",
                backdropFilter: "blur(8px)",
              }}
            >
              {badge.icon}
              {badge.text}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1.25rem",
            letterSpacing: "-0.01em",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #fff 0%, #e5e7eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ferrailleur dans l'Eure (27)
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Collecte & Recyclage de Métaux
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            color: "#9ca3af",
            fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
            maxWidth: "640px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Spécialiste du rachat, de la collecte et de la valorisation des métaux ferreux et non ferreux pour particuliers et professionnels en Normandie.
        </motion.p>

        {/* Info métier */}
<div
  style={{
    marginTop: "1.5rem",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(34,197,94,0.25)",
    background: "rgba(34,197,94,0.08)",
    color: "#d1d5db",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    maxWidth: "720px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  ✔️ <strong>Particuliers & professionnels</strong> : enlèvement ou dépôt direct de vos métaux et ferraille sur site  
  ✔️ <strong>Paiement immédiat</strong> après pesée et estimation  
  ✔️ <strong>VHU (véhicules hors d’usage)</strong> : réception et enlèvement des véhicules  
  ✔️ Traitement réalisé chez notre partenaire agréé{" "}
  <strong>Eure Métal</strong> (centre VHU agréé)  
  ⚠️ Nous ne prenons pas les caravanes
</div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="tel:0232386009"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              boxShadow: "0 0 30px rgba(34,197,94,0.4)",
            }}
          >
            <Phone size={20} />
            Appeler maintenant
          </a>
          <Link
            to="/contact"
            className="flex items-center gap-2.5 px-8 py-4 rounded-xl transition-all hover:bg-white/10"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#e5e7eb",
              fontWeight: 600,
              fontSize: "1.05rem",
              backdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <FileText size={20} />
            Obtenir un devis gratuit
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ color: "#4b5563" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Nos Services"
          title="Solutions complètes de recyclage"
          subtitle="De la collecte à la valorisation, nous accompagnons particuliers et professionnels dans l'Eure et toute la Normandie."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <FadeInWhenVisible key={service.slug} delay={i * 0.08}>
              <Link
                to={`/services/${service.slug}`}
                className="group block h-full p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, rgba(18,18,20,1), rgba(22,22,26,1))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}22, ${service.color}11)`,
                    border: `1px solid ${service.color}33`,
                    color: service.color,
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    color: "#f3f4f6",
                    fontWeight: 700,
                    marginBottom: "0.35rem",
                    fontSize: "1.05rem",
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ color: service.color, fontSize: "0.75rem", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>
                  {service.subtitle}
                </p>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {service.description}
                </p>
                <div
                  className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: service.color, fontSize: "0.8rem" }}
                >
                  En savoir plus <ArrowRight size={14} />
                </div>
              </Link>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #080808 0%, #0d1a10 50%, #080808 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {STATS.map((stat, i) => (
          <FadeInWhenVisible key={stat.label} delay={i * 0.1}>
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#22c55e",
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #22c55e, #4ade80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  marginBottom: "0.4rem",
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{stat.label}</div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-20 md:py-28 px-4" style={{ background: "#080808" }}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Notre Processus"
          title="Simple, rapide et transparent"
          subtitle="Nous vous accompagnons à chaque étape, de la prise de contact à la valorisation de vos métaux."
        />
        <div className="relative">
          {/* Vertical line desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-0.5"
            style={{ background: "linear-gradient(180deg, transparent, rgba(34,197,94,0.3), transparent)" }}
          />
          <div className="flex flex-col gap-8">
            {PROCESS.map((step, i) => (
              <FadeInWhenVisible key={step.step} delay={i * 0.1}>
                <div className={`flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`inline-block p-5 rounded-2xl ${i % 2 === 0 ? "md:ml-auto" : ""}`}
                      style={{
                        background: "rgba(18,18,20,0.8)",
                        border: "1px solid rgba(34,197,94,0.1)",
                        maxWidth: "340px",
                      }}
                    >
                      <h3 style={{ color: "#f3f4f6", fontWeight: 600, marginBottom: "0.35rem" }}>
                        {step.title}
                      </h3>
                      <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {/* Step number */}
                  <div className="shrink-0 relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#22c55e] shadow-lg"
                    style={{ background: "#080808", boxShadow: "0 0 20px rgba(34,197,94,0.3)" }}>
                    <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "0.9rem" }}>{step.step}</span>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-16 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Nos Réalisations" title="Interventions sur le terrain" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FadeInWhenVisible className="md:col-span-2 md:row-span-2">
            <div className="relative h-64 md:h-full rounded-2xl overflow-hidden group" style={{ minHeight: "300px" }}>
              <img src={img4} alt="Collecte de ferraille avec grappin" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  Collecte grappin
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <div className="relative h-52 rounded-2xl overflow-hidden group">
              <img src={img3} alt="Transport ferraille Normandie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  Transport & Enlèvement
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <div className="relative h-52 rounded-2xl overflow-hidden group">
              <img src={img5} alt="Recyclage batteries et accumulateurs" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                  Batteries & Accumulateurs
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 px-4" style={{ background: "#080808" }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Avis Clients"
          title="Ce que disent nos clients"
          subtitle="Des centaines de particuliers et professionnels nous font confiance en Normandie."
        />

        {/* Stars summary */}
        <FadeInWhenVisible className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={24} fill="#f59e0b" stroke="none" />
            ))}
          </div>
          <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "1.2rem" }}>4.9/5</span>
          <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>• 80+ avis Google</span>
        </FadeInWhenVisible>

        {/* Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.slice(current % REVIEWS.length, current % REVIEWS.length + 3).concat(
            REVIEWS.slice(0, Math.max(0, current % REVIEWS.length + 3 - REVIEWS.length))
          ).slice(0, 3).map((review, i) => (
            <FadeInWhenVisible key={`${current}-${i}`} delay={i * 0.08}>
              <div
                className="p-6 rounded-2xl h-full"
                style={{
                  background: "rgba(18,18,20,0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p style={{ color: "#d1d5db", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                  "{review.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ color: "#f3f4f6", fontWeight: 600, fontSize: "0.875rem" }}>{review.name}</span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: "0.72rem" }}
                  >
                    {review.city}
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === current % REVIEWS.length ? "#22c55e" : "rgba(255,255,255,0.15)",
                transform: i === current % REVIEWS.length ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ZonesSection() {
  return (
    <section id="zones" className="py-20 md:py-28 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Zones d'Intervention"
          title="100 km autour de Chaignes"
          subtitle="Nous intervenons dans l'Eure et tous les départements normands. Intervention rapide partout en Normandie."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {ZONES.map((zone, i) => (
            <FadeInWhenVisible key={zone.dept} delay={i * 0.08}>
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(18,18,20,0.9)",
                  border: "1px solid rgba(34,197,94,0.1)",
                }}
              >
                <h3
                  style={{
                    color: "#22c55e",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    fontSize: "0.9rem",
                    borderBottom: "1px solid rgba(34,197,94,0.15)",
                    paddingBottom: "0.5rem",
                  }}
                >
                  {zone.dept}
                </h3>
                <ul className="space-y-1.5">
                  {zone.cities.map((city) => (
                    <li key={city}>
                      <Link
                        to={`/ferrailleur-${city.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e").replace(/[àâ]/g, "a").replace(/[ôo]/g, "o").replace(/[ûü]/g, "u").replace(/[îï]/g, "i").replace(/[ç]/g, "c").replace(/'/g, "-")}`}
                        className="flex items-center gap-2 hover:text-[#22c55e] transition-colors"
                        style={{ color: "#9ca3af", fontSize: "0.82rem" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]/40 shrink-0" />
                        Ferrailleur {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Map CTA */}
        <FadeInWhenVisible className="mt-10 text-center">
          <a
            href="tel:0232386009"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#22c55e",
              fontWeight: 600,
            }}
          >
            <MapPin size={18} />
            Vérifier mon secteur — 02 32 38 60 09
          </a>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 px-4" style={{ background: "#080808" }}>
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="FAQ"
          title="Questions fréquentes"
          subtitle="Tout ce que vous devez savoir sur nos services de recyclage de métaux dans l'Eure."
        />
        <div className="flex flex-col gap-3">
          {FAQ.map((item, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.05}>
              <div
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(18,18,20,0.9)",
                  border: openIndex === i
                    ? "1px solid rgba(34,197,94,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span style={{ color: "#f3f4f6", fontWeight: 600, fontSize: "0.95rem", paddingRight: "1rem" }}>
                    {item.q}
                  </span>
                  <div
                    className="shrink-0 transition-transform duration-300"
                    style={{ color: "#22c55e", transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className="px-5 pb-5"
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        paddingTop: "0.75rem",
                      }}
                    >
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="py-20 md:py-28 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Blog & Conseils"
          title="Actualités recyclage"
          subtitle="Conseils, prix des métaux et informations utiles pour particuliers et professionnels."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article, i) => (
            <FadeInWhenVisible key={article.slug} delay={i * 0.1}>
              <div
                className="p-6 rounded-2xl group cursor-pointer transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(18,18,20,0.9)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  className="inline-block px-2.5 py-1 rounded-full mb-4"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: "0.72rem" }}
                >
                  {article.date}
                </span>
                <h3
                  className="group-hover:text-[#22c55e] transition-colors"
                  style={{ color: "#f3f4f6", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.4 }}
                >
                  {article.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {article.excerpt}
                </p>
                <div
                  className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#22c55e", fontSize: "0.8rem" }}
                >
                  Lire la suite <ArrowRight size={14} />
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: "#080808" }}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.15) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <FadeInWhenVisible>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#22c55e",
              fontSize: "0.8rem",
            }}
          >
            <CheckCircle size={14} />
            Devis gratuit • Réponse sous 2h • Sans engagement
          </div>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #fff, #d1d5db)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Prêt à valoriser vos métaux ?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.7 }}>
            Contactez-nous dès maintenant. Nous intervenons dans l'Eure et toute la Normandie, souvent sous 24 heures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0232386009"
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.05rem",
                boxShadow: "0 0 30px rgba(34,197,94,0.4)",
              }}
            >
              <Phone size={20} />
              02 32 38 60 09
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-2.5 px-8 py-4 rounded-xl transition-all hover:bg-white/5"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#d1d5db",
                fontWeight: 600,
                fontSize: "1.05rem",
              }}
            >
              <FileText size={20} />
              Formulaire de devis
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <GallerySection />
      <ProcessSection />
      <ReviewsSection />
      <ZonesSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
