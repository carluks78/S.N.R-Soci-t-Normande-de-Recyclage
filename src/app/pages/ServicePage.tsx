import { useParams, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, FileText, CheckCircle, ArrowLeft, Star, MapPin, Truck, Wrench, Clock } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// ─── SVG ILLUSTRATIONS ──────────────────────────────────────────────────────

const ScrapMetalIllustration = () => (
  <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
    <defs>
      <linearGradient id="steel1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4b5563" />
        <stop offset="100%" stopColor="#1f2937" />
      </linearGradient>
      <linearGradient id="copper1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Pile de ferraille */}
    <ellipse cx="210" cy="185" rx="180" ry="18" fill="rgba(0,0,0,0.4)" />
    {/* Poutres acier */}
    <rect x="60" y="120" width="140" height="18" rx="3" fill="url(#steel1)" transform="rotate(-8 130 129)" />
    <rect x="80" y="100" width="160" height="14" rx="2" fill="#374151" transform="rotate(5 160 107)" />
    <rect x="40" y="140" width="120" height="16" rx="3" fill="#4b5563" transform="rotate(-3 100 148)" />
    {/* Câbles cuivre */}
    <path d="M 200 90 Q 240 70 280 100 Q 300 120 260 140" fill="none" stroke="url(#copper1)" strokeWidth="8" strokeLinecap="round" />
    <path d="M 190 110 Q 230 85 270 110 Q 285 125 250 145" fill="none" stroke="#b45309" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
    {/* Tôles aluminium */}
    <polygon points="140,80 220,75 230,110 130,115" fill="#6b7280" opacity="0.85" />
    <polygon points="145,77 225,72 227,80 143,83" fill="url(#shine)" />
    {/* Roue ferraille */}
    <circle cx="320" cy="150" r="40" fill="url(#steel1)" />
    <circle cx="320" cy="150" r="30" fill="#111827" />
    <circle cx="320" cy="150" r="8" fill="#374151" />
    {[0,45,90,135,180,225,270,315].map((a, i) => (
      <line key={i} x1="320" y1="150"
        x2={320 + 28 * Math.cos(a * Math.PI / 180)}
        y2={150 + 28 * Math.sin(a * Math.PI / 180)}
        stroke="#4b5563" strokeWidth="3" />
    ))}
    <circle cx="320" cy="150" r="40" fill="url(#shine)" />
    {/* Reflets verts SNR */}
    <circle cx="150" cy="95" r="4" fill="#22c55e" filter="url(#glow)" opacity="0.8" />
    <circle cx="280" cy="80" r="3" fill="#22c55e" filter="url(#glow)" opacity="0.6" />
    <circle cx="350" cy="130" r="2" fill="#22c55e" filter="url(#glow)" opacity="0.5" />
  </svg>
);

const EpaveIllustration = () => (
  <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
    <defs>
      <linearGradient id="carBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <linearGradient id="rust" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="50%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <filter id="glow2">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* Sol / ombre */}
    <ellipse cx="210" cy="195" rx="170" ry="12" fill="rgba(0,0,0,0.5)" />
    {/* Carrosserie écrasée */}
    <rect x="60" y="120" width="290" height="65" rx="8" fill="url(#carBody)" />
    {/* Toit enfoncé */}
    <path d="M 110 120 L 140 75 L 280 72 L 310 120 Z" fill="#1f2937" />
    <path d="M 110 120 L 140 75 L 280 72 L 310 120 Z" fill="url(#rust)" opacity="0.3" />
    {/* Pare-brise fissuré */}
    <path d="M 148 78 L 272 76 L 305 118 L 115 120 Z" fill="#0f172a" opacity="0.9" />
    <line x1="200" y1="78" x2="220" y2="118" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    <line x1="180" y1="80" x2="240" y2="116" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <line x1="215" y1="76" x2="190" y2="119" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    {/* Rouille taches */}
    <circle cx="130" cy="145" r="18" fill="url(#rust)" opacity="0.7" />
    <circle cx="290" cy="135" r="14" fill="url(#rust)" opacity="0.6" />
    <circle cx="200" cy="160" r="10" fill="url(#rust)" opacity="0.5" />
    {/* Roues à plat */}
    <ellipse cx="130" cy="185" rx="35" ry="14" fill="#111827" />
    <ellipse cx="130" cy="185" rx="28" ry="10" fill="#1f2937" />
    <ellipse cx="130" cy="185" rx="12" ry="5" fill="#374151" />
    <ellipse cx="295" cy="185" rx="35" ry="14" fill="#111827" />
    <ellipse cx="295" cy="185" rx="28" ry="10" fill="#1f2937" />
    <ellipse cx="295" cy="185" rx="12" ry="5" fill="#374151" />
    {/* Crochet/grappin SNR */}
    <line x1="210" y1="0" x2="210" y2="72" stroke="#22c55e" strokeWidth="3" strokeDasharray="5,3" opacity="0.7" />
    <path d="M 195 58 Q 210 72 225 58" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" filter="url(#glow2)" />
    <circle cx="210" cy="10" r="8" fill="none" stroke="#22c55e" strokeWidth="3" />
    {/* Texte épave */}
    <text x="210" y="215" textAnchor="middle" fill="#22c55e" fontSize="10" fontFamily="monospace" opacity="0.6">SNR — ENLÈVEMENT ÉPAVE 27</text>
  </svg>
);

const TruckIllustration = () => (
  <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
    <defs>
      <linearGradient id="truck" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#166534" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
      <filter id="g3">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="210" cy="178" rx="185" ry="10" fill="rgba(0,0,0,0.4)" />
    {/* Benne */}
    <rect x="120" y="80" width="220" height="85" rx="4" fill="#1f2937" />
    <rect x="118" y="78" width="224" height="10" rx="2" fill="#374151" />
    {/* Contenu benne - ferraille */}
    <rect x="130" y="90" width="50" height="8" rx="1" fill="#4b5563" transform="rotate(-5 155 94)" />
    <rect x="160" y="95" width="70" height="6" rx="1" fill="#6b7280" transform="rotate(3 195 98)" />
    <rect x="200" y="88" width="40" height="10" rx="1" fill="#374151" transform="rotate(-8 220 93)" />
    <circle cx="270" cy="100" r="12" fill="#374151" stroke="#4b5563" strokeWidth="2" />
    <circle cx="270" cy="100" r="5" fill="#1f2937" />
    <rect x="290" y="92" width="35" height="7" rx="1" fill="#b45309" opacity="0.7" transform="rotate(4 307 95)" />
    {/* Cabine */}
    <rect x="30" y="95" width="95" height="70" rx="6" fill="url(#truck)" />
    <rect x="40" y="102" width="55" height="35" rx="4" fill="#0f172a" opacity="0.9" />
    <rect x="40" y="102" width="55" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
    {/* Phares */}
    <circle cx="35" cy="148" r="7" fill="#fbbf24" opacity="0.9" filter="url(#g3)" />
    <circle cx="35" cy="148" r="4" fill="#fef3c7" />
    {/* Roues */}
    {[80, 180, 295, 345].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="170" r="20" fill="#111827" />
        <circle cx={x} cy="170" r="14" fill="#1f2937" />
        <circle cx={x} cy="170" r="5" fill="#374151" />
      </g>
    ))}
    {/* Logo SNR */}
    <text x="155" y="150" textAnchor="middle" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold" filter="url(#g3)">SNR</text>
    <text x="155" y="162" textAnchor="middle" fill="#4b5563" fontSize="7" fontFamily="monospace">RECYCLAGE · 27</text>
  </svg>
);

const DemoIllustration = () => (
  <svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-90">
    <defs>
      <linearGradient id="flame" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
      </linearGradient>
      <filter id="gf">
        <feGaussianBlur stdDeviation="5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <ellipse cx="210" cy="185" rx="175" ry="10" fill="rgba(0,0,0,0.4)" />
    {/* Structure métallique */}
    <rect x="100" y="60" width="16" height="120" fill="#374151" />
    <rect x="200" y="40" width="16" height="140" fill="#4b5563" />
    <rect x="300" y="70" width="16" height="110" fill="#374151" />
    <line x1="100" y1="80" x2="200" y2="60" stroke="#6b7280" strokeWidth="8" />
    <line x1="200" y1="60" x2="300" y2="80" stroke="#6b7280" strokeWidth="8" />
    <line x1="100" y1="120" x2="200" y2="100" stroke="#4b5563" strokeWidth="6" />
    <line x1="200" y1="100" x2="316" y2="115" stroke="#4b5563" strokeWidth="6" />
    {/* Chalumeau */}
    <rect x="210" y="90" width="60" height="10" rx="5" fill="#1f2937" transform="rotate(-30 240 95)" />
    <path d="M 232 78 Q 240 62 248 72" fill="url(#flame)" filter="url(#gf)" opacity="0.95" />
    <circle cx="240" cy="68" r="8" fill="#f59e0b" opacity="0.4" filter="url(#gf)" />
    {/* Étincelles */}
    {[[245,55],[258,62],[250,45],[265,50]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r={i%2===0?2:1.5} fill="#fbbf24" opacity={0.7-i*0.1} />
    ))}
    {/* Débris */}
    <polygon points="140,175 155,160 165,178" fill="#374151" />
    <rect x="260" y="165" width="20" height="8" rx="1" fill="#4b5563" transform="rotate(15 270 169)" />
    <circle cx="320" cy="170" r="8" fill="#1f2937" stroke="#374151" strokeWidth="2" />
    <text x="210" y="210" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="monospace" opacity="0.5">DÉCOUPE · ÉVACUATION · RECYCLAGE</text>
  </svg>
);

// ─── ZONES D'INTERVENTION ───────────────────────────────────────────────────

const VILLES_EURE = [
  "Évreux", "Vernon", "Bernay", "Les Andelys", "Louviers",
  "Gisors", "Pont-Audemer", "Gaillon", "Breteuil", "Conches-en-Ouche",
  "Nonancourt", "Pacy-sur-Eure", "Fleury-sur-Andelle", "Bourg-Achard",
  "Rugles", "Beuzeville", "Brionne", "Bourgtheroulde", "Écos", "Thiberville",
];

const VILLES_LIMITROPHES = [
  "Rouen (76)", "Dreux (28)", "Mantes-la-Jolie (78)", "Lisieux (14)", "Alençon (61)", "Argentan (61)",
];

const ZonesIntervention = () => (
  <div
    className="p-6 rounded-2xl mb-6"
    style={{ background: "rgba(18,18,20,0.9)", border: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div className="flex items-center gap-2 mb-4">
      <MapPin size={18} className="text-[#22c55e]" />
      <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem" }}>
        Zones d'intervention — Eure (27) &amp; Normandie
      </h2>
    </div>
    <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "1rem" }}>
      Basés à <strong style={{ color: "#9ca3af" }}>Chaignes (27)</strong>, nous intervenons dans un rayon de 100 km
      pour le rachat, l'enlèvement et le recyclage de ferraille et métaux.
    </p>
    <div className="mb-3">
      <p style={{ color: "#22c55e", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Eure (27)</p>
      <div className="flex flex-wrap gap-1.5">
        {VILLES_EURE.map((v) => (
          <span
            key={v}
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
              color: "#9ca3af",
              fontSize: "0.72rem",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
    <div>
      <p style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Départements limitrophes</p>
      <div className="flex flex-wrap gap-1.5">
        {VILLES_LIMITROPHES.map((v) => (
          <span
            key={v}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#6b7280",
              fontSize: "0.72rem",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// ─── PARTICULES MÉTALLIQUES ─────────────────────────────────────────────────

const MetalParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#22c55e" : p.id % 3 === 1 ? "#b45309" : "#6b7280",
            boxShadow: p.id % 3 === 0 ? "0 0 6px rgba(34,197,94,0.8)" : "none",
          }}
          animate={{
            y: [-10, -40, -10],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─── DONNÉES SERVICES ───────────────────────────────────────────────────────

const ILLUSTRATION_MAP: Record<string, React.FC> = {
  "rachat-metaux": ScrapMetalIllustration,
  "collecte-ferraille": TruckIllustration,
  "demolition": DemoIllustration,
  "location-benne": TruckIllustration,
  "debarras-industriel": ScrapMetalIllustration,
  "enlevement-ferraille": TruckIllustration,
  "enlevement-epaves": EpaveIllustration,
};

const SERVICES_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  seoGeo: string;
  metaux?: string[];
  avantages: string[];
  faq: { q: string; a: string }[];
  schema: {
    service: string;
    areaServed: string;
    priceRange: string;
  };
}> = {
  "rachat-metaux": {
    title: "Rachat de Métaux",
    subtitle: "Ferreux & Non Ferreux — Meilleur prix garanti",
    description: "Rachat de métaux au meilleur prix dans l'Eure (27) : cuivre, aluminium, laiton, inox, acier. Estimation gratuite, paiement rapide à Évreux, Vernon, Bernay et toute la Normandie.",
    longDesc: `La Société Normande de Recyclage (SNR), basée à Chaignes dans l'Eure (27), rachète l'ensemble des métaux ferreux et non ferreux dans tout le département et en Normandie. Que vous soyez à Évreux, Vernon, Bernay, Les Andelys, Louviers, Gisors ou Pont-Audemer, nous nous déplaçons jusqu'à vous.\n\nNous proposons le meilleur prix du marché, aligné sur les cours officiels LME pour le cuivre, l'aluminium, le laiton, l'inox, le plomb et le zinc. Pas de frais cachés, paiement rapide et transparent, particuliers comme professionnels.\n\nNotre service couvre l'intégralité du département 27 ainsi que les départements limitrophes : Seine-Maritime (76), Calvados (14), Orne (61), Seine-et-Marne (78) et Eure-et-Loir (28). Appelez-nous pour connaître le cours du jour.`,
    seoGeo: "Rachat métaux Évreux • Rachat cuivre Vernon • Achat ferraille Bernay • Récupération métaux Eure 27",
    metaux: ["Cuivre", "Aluminium", "Laiton", "Inox", "Plomb", "Zinc", "Acier", "Fonte", "Bronze", "Câbles électriques", "Radiateurs", "Canalisations"],
    avantages: [
      "Prix aligné sur le cours LME du jour",
      "Estimation gratuite sur place",
      "Paiement rapide et sécurisé",
      "Intervention sous 24h dans le 27",
      "Tous volumes acceptés (10 kg à 100 t)",
      "Particuliers, artisans, industries",
      "Attestation de rachat fournie",
    ],
    faq: [
      { q: "Quel prix pour le cuivre dans l'Eure ?", a: "Le prix du cuivre varie selon le cours LME. Appelez le 02 32 38 60 09 pour connaître le tarif du jour. Nous intervenons à Évreux, Vernon, Louviers et dans tout le 27." },
      { q: "Vous déplacez-vous à domicile dans le 27 ?", a: "Oui, nous intervenons gratuitement chez vous dans tout le département de l'Eure (27) et dans un rayon de 100 km autour de Chaignes." },
      { q: "Acceptez-vous les petites quantités ?", a: "Oui, nous acceptons tous les volumes, des quelques kilos aux tonnes. Particuliers et professionnels bienvenus." },
    ],
    schema: { service: "Rachat de métaux ferreux et non ferreux", areaServed: "Eure (27), Normandie", priceRange: "Cours LME du jour" },
  },

  "collecte-ferraille": {
    title: "Collecte de Ferraille",
    subtitle: "Enlèvement gratuit — Particuliers, artisans, agriculteurs",
    description: "Enlèvement gratuit de ferraille dans l'Eure (27) : domicile, chantier, ferme, atelier. Intervention rapide à Évreux, Vernon, Bernay et toute la Normandie.",
    longDesc: `Notre service de collecte de ferraille couvre l'intégralité de l'Eure (27) et les départements limitrophes dans un rayon de 100 km autour de Chaignes. Que vous soyez à Évreux, Vernon, Louviers, Bernay, Les Andelys, Gaillon ou Nonancourt, nous venons chez vous.\n\nNos équipes interviennent rapidement avec du matériel professionnel adapté : camion plateau, grappin, chargeuse. Ferraille noire, inox, aluminium, cuivre, câbles électriques, matériel agricole hors d'usage — tout est valorisé.\n\nL'enlèvement est souvent gratuit selon les quantités collectées. Nous intervenons chez les particuliers, artisans, agriculteurs, industries et collectivités du département 27.`,
    seoGeo: "Collecte ferraille Évreux • Enlèvement ferraille Vernon • Récupération métaux Louviers • Ferraille gratuite Eure 27",
    avantages: [
      "Enlèvement gratuit selon quantités",
      "Matériel professionnel adapté",
      "Intervention sous 24-48h dans le 27",
      "Tous types de ferraille acceptés",
      "Particuliers et professionnels",
      "Attestation de collecte fournie",
      "Couverture 100 km autour de Chaignes",
    ],
    faq: [
      { q: "L'enlèvement est-il vraiment gratuit dans l'Eure ?", a: "Oui, dans la majorité des cas. La gratuité dépend des quantités et de la distance. Nous couvrons Évreux, Vernon, Bernay et tout le 27. Appelez-nous pour confirmer." },
      { q: "Quels types de ferraille collectez-vous ?", a: "Tous : ferraille noire, inox, aluminium, cuivre, câbles électriques, matériel agricole, véhicules, équipements industriels." },
      { q: "Intervenez-vous sur les fermes dans le 27 ?", a: "Oui, nous intervenons chez les agriculteurs de l'Eure pour récupérer vieux tracteurs, matériel agricole, bennes et ferraille diverse." },
    ],
    schema: { service: "Collecte et enlèvement de ferraille", areaServed: "Eure (27), Normandie", priceRange: "Gratuit selon quantité" },
  },

  "demolition": {
    title: "Démolition",
    subtitle: "Découpe industrielle & Évacuation — Eure (27)",
    description: "Démolition, découpe et évacuation de ferraille dans l'Eure (27). Chalumeau, cisaille, matériel lourd. Devis gratuit sous 24h à Évreux, Vernon, Bernay et en Normandie.",
    longDesc: `Notre équipe réalise des travaux de démolition légère, de découpe au chalumeau ou à la cisaille, et d'évacuation de ferraille sur tous types de sites dans l'Eure (27) et en Normandie.\n\nNous disposons du matériel adapté pour intervenir en toute sécurité : chalumeau oxy-acétylénique, cisaille hydraulique, chargeuse sur pneus. Réactifs et efficaces, nous répondons à tous les besoins : démolition d'ouvrages métalliques, découpe de structures, désassemblage de machines industrielles.\n\nNous intervenons auprès des particuliers, entreprises, collectivités et industries à Évreux, Vernon, Bernay, Louviers, Pont-Audemer et dans tout le 27. Recyclage 100% des matériaux issus de la démolition.`,
    seoGeo: "Démolition métallique Évreux • Découpe ferraille Vernon • Évacuation métaux Eure 27 • Démolition industrielle Normandie",
    avantages: [
      "Découpe au chalumeau et cisaille",
      "Matériel lourd disponible",
      "Évacuation complète en une intervention",
      "Respect des normes sécurité",
      "Recyclage 100% des matériaux",
      "Devis gratuit sous 24h",
      "Intervention dans tout le 27",
    ],
    faq: [
      { q: "Quelle taille de chantier dans l'Eure ?", a: "Des petits travaux chez le particulier aux débarras d'usines complètes. Nous couvrons tout l'Eure (27) et la Normandie." },
      { q: "Assurez-vous l'évacuation complète ?", a: "Oui, nous assurons la démolition, la découpe ET l'évacuation complète. Zéro déchet laissé sur place." },
      { q: "Intervenez-vous dans tout le département 27 ?", a: "Oui, de Gisors à Pont-Audemer, d'Évreux à Nonancourt. Devis gratuit sous 24h." },
    ],
    schema: { service: "Démolition et découpe de structures métalliques", areaServed: "Eure (27), Normandie", priceRange: "Devis gratuit" },
  },

  "location-benne": {
    title: "Location de Benne",
    subtitle: "10 à 35 m³ — Ferraille, gravats, encombrants",
    description: "Location de bennes professionnelles 10 à 35 m³ dans l'Eure (27). Livraison et reprise incluses. Service disponible à Évreux, Vernon, Bernay et toute la Normandie.",
    longDesc: `Nous proposons la location de bennes de 10 à 35 m³ pour la collecte de ferraille, métaux, gravats, encombrants et déchets industriels dans l'Eure (27) et en Normandie. Livraison et reprise incluses dans nos tarifs.\n\nNos bennes, équipées de portes arrière, permettent un chargement simple et sécurisé. Nous livrons à Évreux, Vernon, Louviers, Bernay, Les Andelys, Gaillon, Pont-Audemer et dans tout le département 27.\n\nTarifs clairs et transparents pour des besoins ponctuels ou réguliers. Solutions sur mesure pour les professionnels : chantiers, industries, collectivités.`,
    seoGeo: "Location benne Évreux • Benne ferraille Vernon • Location benne Eure 27 • Benne chantier Normandie",
    avantages: [
      "Bennes de 10, 15, 20, 30 et 35 m³",
      "Portes arrière pour chargement facile",
      "Livraison et reprise incluses",
      "Location courte ou longue durée",
      "Tarifs dégressifs pour les pros",
      "Livraison dans tout le 27",
      "Devis sur mesure",
    ],
    faq: [
      { q: "Quelle taille de benne choisir pour l'Eure ?", a: "Pour un particulier : 10-15 m³. Pour un chantier : 20-35 m³. Nous livrons partout dans le 27." },
      { q: "La livraison est-elle incluse ?", a: "Oui, livraison et reprise de la benne sont incluses dans nos tarifs partout dans l'Eure (27) et alentours." },
      { q: "Quels déchets peut-on mettre dans une benne ?", a: "Ferraille, gravats, encombrants, déchets industriels non dangereux." },
    ],
    schema: { service: "Location de bennes à déchets", areaServed: "Eure (27), Normandie", priceRange: "Devis sur mesure" },
  },

  "debarras-industriel": {
    title: "Débarras Industriel",
    subtitle: "Ateliers, entrepôts, usines, bureaux — Eure 27",
    description: "Débarras industriel complet dans l'Eure (27) : tri, évacuation, recyclage et remise en état. Intervention rapide à Évreux, Vernon, Bernay et en Normandie.",
    longDesc: `Nous assurons le débarras complet de vos locaux professionnels et industriels dans l'Eure (27) et en Normandie : ateliers, entrepôts, usines, bureaux, hangars. Notre équipe prend en charge l'intégralité de la prestation depuis Chaignes.\n\nNous intervenons à Évreux, Vernon, Louviers, Bernay, Pont-Audemer, Les Andelys et dans tout le département 27. Tri, évacuation de ferraille et de métaux, recyclage et remise en état des lieux — prestation clé en main.\n\nDevis gratuit sous 24h, prise en charge complète, certificats de valorisation. Valorisation maximale des matériaux pour réduire le coût de votre débarras.`,
    seoGeo: "Débarras industriel Évreux • Vide usine Vernon • Débarras atelier Eure 27 • Évacuation ferraille Normandie",
    avantages: [
      "Prestation clé en main complète",
      "Tri et valorisation maximale",
      "Remise en état des lieux incluse",
      "Intervention rapide sous 48h",
      "Certificats de valorisation",
      "Particuliers et grandes industries",
      "Couverture tout le département 27",
    ],
    faq: [
      { q: "Combien de temps dure un débarras d'usine dans le 27 ?", a: "D'une journée pour un atelier à plusieurs semaines pour une usine. Nous couvrons tout l'Eure (27)." },
      { q: "Remettez-vous les lieux en état ?", a: "Oui, remise en état basique incluse. Devis détaillé pour les grosses opérations." },
      { q: "Intervenez-vous dans toute la Normandie ?", a: "Oui, basés à Chaignes dans le 27, nous intervenons dans un rayon de 100 km : Seine-Maritime, Calvados, Orne." },
    ],
    schema: { service: "Débarras et évacuation de locaux industriels", areaServed: "Eure (27), Normandie", priceRange: "Devis gratuit sous 24h" },
  },

  "enlevement-ferraille": {
    title: "Enlèvement Ferraille",
    subtitle: "Engins agricoles • Poids lourds • Matériels TP",
    description: "Rachat et enlèvement d'engins agricoles et poids lourds dans l'Eure (27). Roulants ou non roulants. Intervention 24h à Évreux, Vernon, Bernay et en Normandie.",
    longDesc: `La SNR assure le rachat et l'enlèvement d'engins agricoles (tracteurs, moissonneuses, chargeurs), de poids lourds et de matériels de travaux publics dans tout l'Eure (27) et en Normandie.\n\nNous disposons du matériel nécessaire pour tracter, charger et transporter tous types d'engins roulants ou non roulants, depuis Évreux jusqu'à Gisors, de Vernon à Pont-Audemer, en passant par Bernay, Brionne, et tous les villages du 27.\n\nÉvaluation gratuite sur photo ou sur place. Paiement selon le poids de ferraille et le cours des métaux. Une solution simple pour valoriser vos vieux équipements agricoles ou industriels.`,
    seoGeo: "Enlèvement tracteur Eure • Récupération engins agricoles 27 • Rachat ferraille agricole Vernon • Épave tracteur Normandie",
    avantages: [
      "Engins roulants et non roulants",
      "Matériel de manutention adapté",
      "Estimation gratuite sur photo",
      "Prise en charge rapide sous 24h",
      "Intervention dans tout le 27",
      "Paiement selon valeur ferraille",
      "Agriculteurs et entreprises TP",
    ],
    faq: [
      { q: "Reprenez-vous les tracteurs hors service dans l'Eure ?", a: "Oui, nous reprenons tous engins agricoles roulants ou non dans le 27, pour valorisation ferraille." },
      { q: "Comment est calculé le prix d'un engin ?", a: "En fonction du poids en ferraille et du cours des métaux au moment de l'enlèvement." },
      { q: "Intervenez-vous dans les fermes isolées du 27 ?", a: "Oui, nous couvrons tout le département de l'Eure, y compris les communes rurales. Appelez-nous." },
    ],
    schema: { service: "Enlèvement et rachat d'engins agricoles et poids lourds", areaServed: "Eure (27), Normandie", priceRange: "Cours ferraille du jour" },
  },

  // ── NOUVELLE PAGE ─────────────────────────────────────────────────────────
  "enlevement-epaves": {
    title: "Enlèvement d'Épaves",
    subtitle: "Voitures, motos, utilitaires — Gratuit & Certificat de destruction",
    description: "Enlèvement gratuit d'épaves dans l'Eure (27) : voitures, motos, utilitaires hors d'usage. Certificat de destruction officiel. Intervention sous 24h à Évreux, Vernon, Bernay et toute la Normandie.",
    longDesc: `La Société Normande de Recyclage assure l'enlèvement gratuit de vos épaves de véhicules dans l'intégralité de l'Eure (27) et des départements normands voisins. Voiture accidentée, moteur cassé, contrôle technique refusé, moto hors d'usage — nous prenons tout en charge.\n\nNous intervenons à Évreux, Vernon, Louviers, Bernay, Les Andelys, Gaillon, Gisors, Pont-Audemer, Nonancourt, Pacy-sur-Eure et dans toutes les communes du 27. Votre véhicule est récupéré à votre domicile, sur votre terrain ou en voirie (avec accord mairie).\n\nUn certificat de destruction officiel (au sens de l'article L. 322-10 du Code de la route) vous est remis lors de l'enlèvement. Ce document vous dégage de toute responsabilité civile et permet de procéder à la désinscription auprès de la préfecture. Recyclage 100% réglementaire des fluides, pièces et carrosseries.\n\nNous acceptons toutes les marques et tous les modèles : Peugeot, Renault, Citroën, Volkswagen, Mercedes, Toyota, Ford… roulants ou non roulants, avec ou sans roues. L'enlèvement est gratuit dans la grande majorité des cas pour les véhicules du département 27.`,
    seoGeo: "Enlèvement épave Évreux • Épave gratuite Vernon • Enlevement voiture hors usage Eure 27 • Certificat destruction Normandie • Épave Louviers • Récupération épave Bernay",
    metaux: ["Carrosserie acier", "Aluminium moteur", "Cuivre câblage", "Catalyseur (platine)", "Jantes aluminium", "Radiateur cuivre/alu", "Batterie plomb"],
    avantages: [
      "Enlèvement 100% gratuit dans le 27",
      "Certificat de destruction officiel",
      "Véhicules roulants ou non roulants",
      "Intervention sous 24h",
      "Toutes marques & modèles acceptés",
      "Recyclage 100% réglementaire",
      "Désinscription préfecture facilitée",
      "Couverture tout le département Eure",
    ],
    faq: [
      { q: "L'enlèvement d'épave est-il gratuit dans l'Eure (27) ?", a: "Oui, l'enlèvement est gratuit dans la grande majorité des cas pour les véhicules du département 27 et des communes limitrophes. Contactez-nous pour confirmer selon votre localisation." },
      { q: "Qu'est-ce que le certificat de destruction ?", a: "C'est un document officiel qui vous dégage de toute responsabilité pour le véhicule. Il est obligatoire pour la désinscription en préfecture et prouve que l'épave a été traitée légalement." },
      { q: "Mon véhicule n'est pas roulant, le prenez-vous quand même ?", a: "Oui. Que votre véhicule soit roulant ou non, avec ou sans roues, accidenté ou brûlé, nous disposons du matériel pour le charger et l'emporter dans tout le 27." },
      { q: "Intervenez-vous pour les motos et utilitaires ?", a: "Oui, nous récupérons voitures, motos, scooters, utilitaires, fourgons et petits camping-cars épaves dans l'Eure et en Normandie." },
      { q: "Faut-il la carte grise pour l'enlèvement d'épave ?", a: "La carte grise est recommandée mais pas toujours obligatoire. Nous vous guidons dans les démarches. Appelez le 02 32 38 60 09 pour plus d'informations." },
      { q: "Quelle zone couvrez-vous pour les épaves en Normandie ?", a: "Tout l'Eure (27) et dans un rayon de 100 km : Rouen (76), Lisieux (14), Dreux (28), Mantes-la-Jolie (78). Gratuit dans le 27." },
    ],
    schema: { service: "Enlèvement gratuit d'épaves de véhicules", areaServed: "Eure (27), Normandie", priceRange: "Gratuit dans le 27" },
  },
};

// ─── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES_DATA[slug] : null;
  const Illustration = slug ? (ILLUSTRATION_MAP[slug] || ScrapMetalIllustration) : ScrapMetalIllustration;
  const heroRef = useRef<HTMLDivElement>(null);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080808" }}>
        <div className="text-center">
          <h1 style={{ color: "#fff", marginBottom: "1rem" }}>Service non trouvé</h1>
          <Link to="/" className="text-[#22c55e] hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  const isEpave = slug === "enlevement-epaves";

  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>

      {/* ── SEO JSON-LD structuré ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Société Normande de Recyclage",
            "description": service.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Chaignes",
              "addressRegion": "Normandie",
              "postalCode": "27130",
              "addressCountry": "FR"
            },
            "telephone": "+33232386009",
            "areaServed": service.schema.areaServed,
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": service.schema.service,
              "itemListElement": [{
                "@type": "Offer",
                "itemOffered": { "@type": "Service", "name": service.schema.service },
                "areaServed": service.schema.areaServed,
                "priceSpecification": { "@type": "PriceSpecification", "description": service.schema.priceRange },
              }]
            }
          })
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-32 pb-0 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0d1a10 0%, #080808 100%)" }}
      >
        <MetalParticles />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: "radial-gradient(circle at 25% 55%, rgba(34,197,94,0.12) 0%, transparent 55%)" }}
        />

        <div className="relative max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 hover:text-[#22c55e] transition-colors"
            style={{ color: "#6b7280", fontSize: "0.875rem" }}
          >
            <ArrowLeft size={16} /> Retour à l'accueil
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  color: "#22c55e",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                SNR — Chaignes, Eure (27)
              </span>
              <h1
                style={{
                  fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
                  fontWeight: 800,
                  lineHeight: 1.12,
                  marginBottom: "0.6rem",
                  background: "linear-gradient(135deg, #fff 0%, #d1d5db 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {service.title}
              </h1>
              <p style={{ color: "#22c55e", fontSize: "0.95rem", marginBottom: "0.75rem", fontWeight: 600 }}>
                {service.subtitle}
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.7 }}>
                {service.description}
              </p>

              {/* Badges SEO geo discrets */}
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {["Eure (27)", "Normandie", "Intervention 24h", "Gratuit"].map((b) => (
                  <span
                    key={b}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#6b7280",
                      fontSize: "0.72rem",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="tel:0232386009"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontWeight: 700,
                    boxShadow: "0 0 28px rgba(34,197,94,0.4)",
                  }}
                >
                  <Phone size={18} /> Appeler maintenant
                </motion.a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#d1d5db", fontWeight: 600 }}
                >
                  <FileText size={18} /> Devis gratuit
                </Link>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden lg:block"
              style={{ height: "240px" }}
            >
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(15,24,14,0.8)",
                  border: "1px solid rgba(34,197,94,0.12)",
                  boxShadow: "0 0 60px rgba(34,197,94,0.08) inset",
                }}
              >
                <Illustration />
              </div>
              {/* Badge prix flottant */}
              {isEpave && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    boxShadow: "0 0 20px rgba(34,197,94,0.5)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                  }}
                >
                  ✓ 100% Gratuit dans le 27
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bandeau info rapide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-4xl mx-auto mt-10 mb-0 grid grid-cols-2 sm:grid-cols-4 gap-0 rounded-t-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", borderBottom: "none" }}
        >
          {[
            { icon: <Clock size={15} />, label: "Intervention", value: "24-48h" },
            { icon: <MapPin size={15} />, label: "Zone", value: "Eure (27) + 100 km" },
            { icon: <Truck size={15} />, label: "Déplacement", value: "Gratuit" },
            { icon: <Star size={15} fill="#f59e0b" stroke="none" />, label: "Note Google", value: "4.9 / 5" },
          ].map(({ icon, label, value }, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-4 gap-1"
              style={{
                background: "rgba(12,12,14,0.95)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <span style={{ color: "#22c55e" }}>{icon}</span>
              <span style={{ color: "#6b7280", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
              <span style={{ color: "#e5e7eb", fontSize: "0.85rem", fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CONTENU ──────────────────────────────────────────────────────── */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description longue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "1.15rem" }}>
                Notre service en détail
              </h2>
              {service.longDesc.split("\n\n").map((para, i) => (
                <p key={i} style={{ color: "#9ca3af", lineHeight: 1.85, marginBottom: "1rem", fontSize: "0.93rem" }}>
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Illustration mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:hidden rounded-2xl overflow-hidden"
              style={{ height: "180px", border: "1px solid rgba(34,197,94,0.1)", background: "rgba(15,24,14,0.8)" }}
            >
              <Illustration />
            </motion.div>

            {/* Métaux */}
            {service.metaux && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-8 rounded-2xl"
                style={{ background: "rgba(18,18,20,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1rem", fontSize: "1.05rem" }}>
                  {isEpave ? "Matériaux valorisés" : "Métaux acceptés"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service.metaux.map((m) => (
                    <motion.span
                      key={m}
                      whileHover={{ scale: 1.06, borderColor: "rgba(34,197,94,0.5)" }}
                      className="px-3 py-1.5 rounded-lg cursor-default"
                      style={{
                        background: "rgba(34,197,94,0.06)",
                        border: "1px solid rgba(34,197,94,0.18)",
                        color: "#22c55e",
                        fontSize: "0.82rem",
                        transition: "all 0.2s",
                      }}
                    >
                      {m}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Zone d'intervention */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ZonesIntervention />
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-8 rounded-2xl"
              style={{ background: "rgba(18,18,20,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.25rem", fontSize: "1.05rem" }}>
                Questions fréquentes
              </h2>
              <div className="flex flex-col gap-0">
                {service.faq.map((item, i) => (
                  <FaqItem key={i} item={item} isLast={i === service.faq.length - 1} />
                ))}
              </div>
            </motion.div>

            {/* Balise SEO géographique discrète */}
            <p
              style={{
                color: "rgba(107,114,128,0.4)",
                fontSize: "0.7rem",
                lineHeight: 1.6,
                padding: "0 4px",
              }}
            >
              {service.seoGeo} • Société Normande de Recyclage, Chaignes 27130 — Couverture : {service.schema.areaServed}
            </p>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-2xl sticky top-24"
              style={{ background: "rgba(18,18,20,0.95)", border: "1px solid rgba(34,197,94,0.18)" }}
            >
              <h3 style={{ color: "#22c55e", fontWeight: 700, marginBottom: "1rem", fontSize: "0.9rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Nos avantages
              </h3>
              <ul className="space-y-2.5 mb-6">
                {service.avantages.map((av) => (
                  <motion.li
                    key={av}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-2.5 cursor-default"
                    style={{ transition: "transform 0.15s" }}
                  >
                    <CheckCircle size={15} style={{ color: "#22c55e", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "#d1d5db", fontSize: "0.85rem", lineHeight: 1.5 }}>{av}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <motion.a
                  href="tel:0232386009"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff",
                    fontWeight: 700,
                    boxShadow: "0 0 22px rgba(34,197,94,0.35)",
                    fontSize: "0.95rem",
                  }}
                >
                  <Phone size={16} /> 02 32 38 60 09
                </motion.a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl transition-colors hover:bg-white/5"
                  style={{ border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontWeight: 600, fontSize: "0.9rem" }}
                >
                  <FileText size={16} /> Devis gratuit
                </Link>
              </div>

              {/* Zone info */}
              <div
                className="mt-5 pt-5 flex items-center gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <MapPin size={13} style={{ color: "#22c55e", flexShrink: 0 }} />
                <p style={{ color: "#6b7280", fontSize: "0.75rem", lineHeight: 1.5 }}>
                  Basés à <strong style={{ color: "#9ca3af" }}>Chaignes (27)</strong><br />
                  Intervention dans tout l'Eure (27)
                </p>
              </div>

              {/* Avis */}
              <div
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={13} fill="#f59e0b" stroke="none" />)}
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>4.9/5 — 80+ avis Google</p>
                <p style={{ color: "#4b5563", fontSize: "0.7rem", marginTop: "2px" }}>« Intervention rapide, sérieux et bon prix » — Client Évreux</p>
              </div>

              {/* Prix rapide */}
              <div
                className="mt-4 pt-4 rounded-xl p-3"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(34,197,94,0.04)",
                  border: "1px solid rgba(34,197,94,0.1)",
                  marginTop: "1rem",
                }}
              >
                <p style={{ color: "#22c55e", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                  {service.schema.priceRange}
                </p>
                <p style={{ color: "#4b5563", fontSize: "0.7rem" }}>
                  Appelez-nous pour connaître les tarifs du jour
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQ ACCORDION ──────────────────────────────────────────────────────────

function FaqItem({ item, isLast }: { item: { q: string; a: string }; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: !isLast ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-start justify-between gap-3"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ color: "#f3f4f6", fontWeight: 600, fontSize: "0.92rem", lineHeight: 1.4 }}>{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "#22c55e", flexShrink: 0, fontSize: "1.2rem", lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, paddingBottom: "1rem", paddingRight: "2rem" }}>
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}