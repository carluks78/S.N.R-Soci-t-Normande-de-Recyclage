/**
 * EpavePage.tsx — Page "Enlèvement d'Épaves" ultra-optimisée SEO géo-local
 * SNR — Société Normande de Recyclage, Chaignes (27)
 *
 * Routes supportées :
 *   /enlevement-epaves            → page générique Eure (27)
 *   /enlevement-epaves/evreux     → page dédiée Évreux
 *   /enlevement-epaves/vernon     → page dédiée Vernon
 *   … (toutes les villes du tableau VILLES)
 *
 * Utilisé avec React Router v6+ :
 *   <Route path="/enlevement-epaves" element={<EpavePage />} />
 *   <Route path="/enlevement-epaves/:ville" element={<EpavePage />} />
 */

import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Phone, FileText, CheckCircle, MapPin, Star, Clock,
  Truck, Shield, ArrowRight, ChevronDown, Zap, Award,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES VILLES — Eure (27) + limitrophes
// Chaque ville génère une URL dédiée avec contenu unique
// ─────────────────────────────────────────────────────────────────────────────

interface VilleData {
  slug: string;
  nom: string;
  cp: string;
  dept: string;
  region: string;
  distanceChaignes: number; // km
  description: string;
  quartiers?: string[];
  communes?: string[];
}

const VILLES: VilleData[] = [
  // ── Eure (27) ──────────────────────────────────────────────────────────────
  { slug: "evreux", nom: "Évreux", cp: "27000", dept: "Eure", region: "Normandie", distanceChaignes: 30,
    description: "Préfecture de l'Eure, nous intervenons dans tous les quartiers d'Évreux.",
    quartiers: ["Nétreville", "Navarre", "Madeleine", "Clos-au-Duc", "Saint-Michel"],
    communes: ["Saint-André-de-l'Eure", "Gravigny", "Le Vieil-Évreux", "Incarville"] },
  { slug: "vernon", nom: "Vernon", cp: "27200", dept: "Eure", region: "Normandie", distanceChaignes: 45,
    description: "Ville de la vallée de la Seine, enlèvement d'épaves rapide à Vernon.",
    quartiers: ["Centre-ville", "Saint-Nicolas", "Les Boutardes"],
    communes: ["Vernonnet", "Saint-Marcel", "Gasny", "Giverny", "Pacy-sur-Eure"] },
  { slug: "bernay", nom: "Bernay", cp: "27300", dept: "Eure", region: "Normandie", distanceChaignes: 55,
    description: "Sous-préfecture de l'Eure, intervention épaves à Bernay et alentours.",
    communes: ["Serquigny", "Menneval", "Calleville", "La Chapelle-Réanville"] },
  { slug: "louviers", nom: "Louviers", cp: "27400", dept: "Eure", region: "Normandie", distanceChaignes: 40,
    description: "Commune de la vallée de l'Eure, enlèvement épaves à Louviers et Val-de-Reuil.",
    communes: ["Val-de-Reuil", "Incarville", "Le Manoir", "Saint-Pierre-du-Vauvray"] },
  { slug: "les-andelys", nom: "Les Andelys", cp: "27700", dept: "Eure", region: "Normandie", distanceChaignes: 35,
    description: "Ville au pied du Château Gaillard, épaves récupérées aux Andelys sous 24h.",
    communes: ["Château-sur-Epte", "Cantiers", "Courcelles-sur-Seine"] },
  { slug: "gisors", nom: "Gisors", cp: "27140", dept: "Eure", region: "Normandie", distanceChaignes: 55,
    description: "Porte du Vexin Normand, enlèvement gratuit d'épaves à Gisors.",
    communes: ["Dangu", "Neuf-Marché", "Trie-Château", "Chaumont-en-Vexin"] },
  { slug: "pont-audemer", nom: "Pont-Audemer", cp: "27500", dept: "Eure", region: "Normandie", distanceChaignes: 65,
    description: "Perle de la Normandie, enlèvement d'épaves à Pont-Audemer et Risle.",
    communes: ["Quillebeuf-sur-Seine", "Bourg-Achard", "Montfort-sur-Risle"] },
  { slug: "gaillon", nom: "Gaillon", cp: "27600", dept: "Eure", region: "Normandie", distanceChaignes: 38,
    description: "Commune de l'axe Seine, enlèvement épave à Gaillon et communes voisines.",
    communes: ["Aubevoye", "Heuqueville", "Saint-Pierre-la-Garenne"] },
  { slug: "nonancourt", nom: "Nonancourt", cp: "27320", dept: "Eure", region: "Normandie", distanceChaignes: 42,
    description: "Ville du Pays d'Avre, intervention rapide épaves à Nonancourt.",
    communes: ["Saint-Rémy-sur-Avre", "Tillières-sur-Avre", "Illiers-l'Évêque"] },
  { slug: "breteuil", nom: "Breteuil-sur-Iton", cp: "27160", dept: "Eure", region: "Normandie", distanceChaignes: 28,
    description: "Commune du pays d'Iton, enlèvement d'épaves à Breteuil-sur-Iton.",
    communes: ["Bourth", "Rugles", "Francheville"] },
  { slug: "conches-en-ouche", nom: "Conches-en-Ouche", cp: "27190", dept: "Eure", region: "Normandie", distanceChaignes: 22,
    description: "Commune de l'Ouche, enlèvement épave rapide à Conches.",
    communes: ["Beaumesnil", "La Barre-en-Ouche", "Mesnil-en-Ouche"] },
  { slug: "rugles", nom: "Rugles", cp: "27250", dept: "Eure", region: "Normandie", distanceChaignes: 30,
    description: "Enlèvement d'épaves à Rugles et dans le pays d'Ouche.",
    communes: ["Saint-Antonin-de-Sommaire", "La Chapelle-Bayvel"] },
  { slug: "beuzeville", nom: "Beuzeville", cp: "27210", dept: "Eure", region: "Normandie", distanceChaignes: 75,
    description: "Commune du Pays de Beuzeville, récupération épaves sous 48h.",
    communes: ["Quetteville", "Brestot", "Boulleville"] },
  { slug: "brionne", nom: "Brionne", cp: "27800", dept: "Eure", region: "Normandie", distanceChaignes: 48,
    description: "Commune de la Risle, enlèvement épave à Brionne et vallée.",
    communes: ["Saint-Étienne-l'Allier", "Le Noyer-en-Ouche"] },
  { slug: "pacy-sur-eure", nom: "Pacy-sur-Eure", cp: "27120", dept: "Eure", region: "Normandie", distanceChaignes: 40,
    description: "Commune sur l'Eure, enlèvement épave à Pacy-sur-Eure.",
    communes: ["Ménilles", "Hardencourt-Cocherel", "Hécourt"] },
  { slug: "thiberville", nom: "Thiberville", cp: "27230", dept: "Eure", region: "Normandie", distanceChaignes: 62,
    description: "Commune du Lieuvin, récupération d'épaves à Thiberville.",
    communes: ["Broglie", "Saint-Pierre-de-Salerne"] },
  { slug: "bourgtheroulde", nom: "Bourgtheroulde", cp: "27520", dept: "Eure", region: "Normandie", distanceChaignes: 50,
    description: "Commune de la plaine de Saint-André, épaves enlevées sous 24h.",
    communes: ["Incarville", "Le Thuit-Anger", "Bosrobert"] },
  // ── Limitrophes ────────────────────────────────────────────────────────────
  { slug: "rouen", nom: "Rouen", cp: "76000", dept: "Seine-Maritime", region: "Normandie", distanceChaignes: 70,
    description: "Capitale de Normandie, intervention épaves à Rouen et agglomération.",
    quartiers: ["Rive Droite", "Rive Gauche", "Sotteville", "Grand-Quevilly"],
    communes: ["Bois-Guillaume", "Darnétal", "Bihorel", "Mont-Saint-Aignan"] },
  { slug: "lisieux", nom: "Lisieux", cp: "14100", dept: "Calvados", region: "Normandie", distanceChaignes: 85,
    description: "Ville du Pays d'Auge, enlèvement d'épaves à Lisieux sur demande.",
    communes: ["Orbec", "Saint-Julien-de-Mailloc", "Mézidon-Canon"] },
  { slug: "dreux", nom: "Dreux", cp: "28100", dept: "Eure-et-Loir", region: "Centre-Val de Loire", distanceChaignes: 60,
    description: "Ville d'Eure-et-Loir, proche de l'Eure, enlèvement épave possible.",
    communes: ["Anet", "Vernouillet", "Nogent-le-Roi"] },
  { slug: "mantes-la-jolie", nom: "Mantes-la-Jolie", cp: "78200", dept: "Yvelines", region: "Île-de-France", distanceChaignes: 80,
    description: "Ville de bord de Seine, enlèvement d'épaves à Mantes-la-Jolie.",
    communes: ["Limay", "Rosny-sur-Seine", "Bonnières-sur-Seine"] },
  { slug: "argentan", nom: "Argentan", cp: "61200", dept: "Orne", region: "Normandie", distanceChaignes: 90,
    description: "Sous-préfecture de l'Orne, épaves récupérées sur demande à Argentan.",
    communes: ["Écouché", "Sées", "Mortrée"] },
];

// Index pour lookup rapide
const VILLES_BY_SLUG: Record<string, VilleData> = Object.fromEntries(
  VILLES.map((v) => [v.slug, v])
);

// Données génériques quand pas de ville
const VILLE_GENERIQUE: VilleData = {
  slug: "",
  nom: "l'Eure (27)",
  cp: "27000",
  dept: "Eure",
  region: "Normandie",
  distanceChaignes: 0,
  description: "Enlèvement d'épaves gratuit dans tout l'Eure (27) et la Normandie.",
};

// ─────────────────────────────────────────────────────────────────────────────
// MOTS-CLÉS SEO — 1000+ variations générées dynamiquement
// ─────────────────────────────────────────────────────────────────────────────

const TYPES_VEHICULES = [
  "voiture", "automobile", "véhicule", "auto", "berline", "citadine", "monospace",
  "break", "SUV", "4x4", "coupé", "cabriolet", "sportive", "familiale",
  "moto", "moto-cross", "scooter", "cyclomoteur", "deux-roues", "quad",
  "utilitaire", "fourgon", "fourgonnette", "camionnette", "van", "minibus", "remorque", "tracteur", "engin agricole",
];

const ETATS_VEHICULES = [
  "épave", "hors d'usage", "accidentée", "accidenté", "non roulante", "non roulant",
  "en panne", "HS", "hors service", "à la casse", "pour la casse", "irréparable",
  "brûlée", "brûlé", "rouillée", "rouillé", "délabrée", "délabré",
  "sans contrôle technique", "sans CT", "sans vignette", "abandonnée", "abandonné",
];

const ACTIONS = [
  "enlèvement", "enlevement", "récupération", "recuperation", "enlever", "récupérer",
  "ramassage", "collecte", "rachat", "reprise", "retrait", "évacuation",
  "débarras", "mise à la casse", "destruction",
];

const ADJECTIFS = [
  "gratuit", "gratuite", "rapide", "urgent", "express", "immédiat",
  "professionnel", "sérieux", "fiable", "officiel",
];

// Génère N mots-clés combinés pour une ville
function generateKeywords(villeNom: string, villeSlug: string, cp: string): string[] {
  const keywords: string[] = [];
  // Combinaisons action + type + état + ville
  for (const action of ACTIONS.slice(0, 6)) {
    for (const type of TYPES_VEHICULES.slice(0, 10)) {
      for (const etat of ETATS_VEHICULES.slice(0, 6)) {
        keywords.push(`${action} ${type} ${etat} ${villeNom}`);
        if (keywords.length > 400) break;
      }
      if (keywords.length > 400) break;
    }
    if (keywords.length > 400) break;
  }
  // Combinaisons avec CP
  ACTIONS.forEach(a => keywords.push(`${a} épave ${cp}`));
  ADJECTIFS.forEach(adj => keywords.push(`${adj} ${villeNom} épave enlèvement`));
  // Formules longues
  keywords.push(
    `enlèvement épave gratuit ${villeNom}`,
    `récupération voiture hors d'usage ${villeNom}`,
    `mise à la casse gratuite ${villeNom}`,
    `enlever ma voiture épave ${villeNom}`,
    `qui enlève les épaves gratuitement ${villeNom}`,
    `destruction véhicule hors d'usage ${villeNom}`,
    `certificat destruction épave ${villeNom}`,
    `enlèvement épave ${cp} ${villeNom}`,
    `casse voiture ${villeNom} gratuit`,
    `récupération moto épave ${villeNom}`,
    `enlèvement scooter hors d'usage ${villeNom}`,
    `voiture accidentée à enlever ${villeNom}`,
    `fourgon épave ${villeNom}`,
    `épave roulante ${villeNom}`,
    `épave non roulante ${villeNom}`,
    `enlèvement camionnette épave ${villeNom}`,
    `rachat épave ${villeNom}`,
    `ferrailler voiture ${villeNom}`,
    `casse auto ${villeNom} 27`,
    `SNR épave ${villeNom}`,
    `société normande recyclage épave ${villeNom}`,
    `normandie recyclage épave ${villeNom}`,
    `24h enlèvement épave ${villeNom}`,
    `intervention épave ${villeNom} rapide`,
  );
  return keywords.slice(0, 1000);
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG ILLUSTRATIONS
// ─────────────────────────────────────────────────────────────────────────────

const EpaveHeroSVG = () => (
  <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="carGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#0d1117" />
      </linearGradient>
      <linearGradient id="rustGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#92400e" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#78350f" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#451a03" stopOpacity="0.4" />
      </linearGradient>
      <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#111827" />
        <stop offset="100%" stopColor="#030712" />
      </linearGradient>
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <filter id="glowFx" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="softShadow">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
      </filter>
      <filter id="metalSheen">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
        <feBlend in="SourceGraphic" in2="gray" mode="screen" result="blended" />
        <feComposite in="blended" in2="SourceGraphic" operator="in" />
      </filter>
      <clipPath id="carClip">
        <rect x="80" y="80" width="400" height="200" rx="4" />
      </clipPath>
    </defs>

    {/* Sol béton fissuré */}
    <rect x="0" y="260" width="640" height="60" fill="url(#groundGrad)" />
    <line x1="0" y1="260" x2="640" y2="260" stroke="#1f2937" strokeWidth="2" />
    {[80,200,320,440,560].map((x, i) => (
      <line key={i} x1={x} y1="260" x2={x + 30} y2="300" stroke="#111827" strokeWidth="1" opacity="0.5" />
    ))}

    {/* Ombre portée */}
    <ellipse cx="290" cy="268" rx="200" ry="15" fill="rgba(0,0,0,0.7)" />

    {/* Carrosserie principale — forme aplatie/accidentée */}
    <path
      d="M 85 200 L 88 160 L 120 120 L 160 100 L 320 98 L 400 100 L 430 115 L 455 160 L 460 200 Z"
      fill="url(#carGrad)"
      filter="url(#softShadow)"
    />
    {/* Bas de caisse */}
    <rect x="85" y="200" width="375" height="48" rx="4" fill="#1f2937" />
    {/* Carrosserie rouille taches */}
    <ellipse cx="150" cy="175" rx="28" ry="18" fill="url(#rustGrad)" />
    <ellipse cx="360" cy="165" rx="22" ry="14" fill="url(#rustGrad)" />
    <ellipse cx="240" cy="210" rx="18" ry="10" fill="url(#rustGrad)" />
    <circle cx="420" cy="190" r="12" fill="url(#rustGrad)" />

    {/* Toit enfoncé */}
    <path d="M 125 120 L 160 90 L 320 87 L 395 92 L 425 118 Z" fill="#111827" />
    {/* Pare-brise fissuré */}
    <path d="M 134 120 L 168 92 L 310 89 L 385 93 L 418 118 Z" fill="#0f172a" opacity="0.95" />
    {/* Fissures pare-brise */}
    {[[220,92,240,118],[250,89,210,119],[290,91,270,117],[200,95,230,118]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="rgba(255,255,255,0.12)" strokeWidth={i%2===0 ? 1.5 : 1} />
    ))}

    {/* Vitre arrière */}
    <path d="M 135 121 L 118 165 L 165 165 L 160 121 Z" fill="#0f172a" opacity="0.8" />
    <path d="M 396 118 L 428 162 L 385 165 L 392 118 Z" fill="#0f172a" opacity="0.8" />

    {/* Roues — à plat */}
    {[148, 395].map((cx, i) => (
      <g key={i}>
        <ellipse cx={cx} cy={250} rx={48} ry={16} fill="#0a0a0a" />
        <ellipse cx={cx} cy={250} rx={40} ry={13} fill="#111827" />
        <ellipse cx={cx} cy={250} rx={22} ry={7} fill="#1f2937" />
        <ellipse cx={cx} cy={250} rx={9} ry={3} fill="#374151" />
        {[0,60,120,180,240,300].map((deg, j) => (
          <line key={j}
            x1={cx} y1={250}
            x2={cx + 18 * Math.cos(deg * Math.PI / 180)}
            y2={250 + 6 * Math.sin(deg * Math.PI / 180)}
            stroke="#374151" strokeWidth="2" />
        ))}
      </g>
    ))}

    {/* Phare cassé avant */}
    <ellipse cx="88" cy="185" rx="12" ry="8" fill="#111827" stroke="#374151" strokeWidth="1.5" />
    <ellipse cx="88" cy="185" rx="6" ry="4" fill="#1e3a2f" />

    {/* Phare arrière */}
    <ellipse cx="455" cy="185" rx="14" ry="8" fill="#1a0505" stroke="#7f1d1d" strokeWidth="1.5" />

    {/* Crochet / grappin SNR qui descend du haut */}
    <line x1="290" y1="0" x2="290" y2="87" stroke="#22c55e" strokeWidth="3" strokeDasharray="8,5" opacity="0.8" />
    <path d="M 272 74 Q 290 88 308 74" fill="none" stroke="#22c55e" strokeWidth="4"
      strokeLinecap="round" filter="url(#glowFx)" />
    <rect x="283" y="0" width="14" height="18" rx="3" fill="#22c55e" opacity="0.9" />
    {/* Glow crochet */}
    <ellipse cx="290" cy="82" rx="30" ry="12" fill="url(#glow1)" opacity="0.5" />

    {/* Nuage d'étincelles / fumée */}
    {[[145,110,4],[160,95,3],[130,105,2],[175,100,3.5],[120,115,2.5]].map(([x,y,r],i) => (
      <motion.circle key={i} cx={x} cy={y} r={r}
        fill={i%2===0 ? "#f59e0b" : "#9ca3af"} opacity={0.6 - i*0.08} />
    ))}

    {/* Marque SNR */}
    <rect x="226" y="135" width="100" height="28" rx="6" fill="rgba(0,0,0,0.7)"
      stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
    <text x="276" y="154" textAnchor="middle" fill="#22c55e" fontSize="13"
      fontFamily="monospace" fontWeight="bold">SNR · 27</text>

    {/* Particules ferraille */}
    {[[60,210,2],[520,180,3],[540,240,2],[55,150,1.5],[600,200,2.5]].map(([x,y,r],i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={i%2===0 ? "#b45309":"#4b5563"} opacity="0.6" />
    ))}
  </svg>
);

const CertificatSVG = () => (
  <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <defs>
      <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    <rect x="30" y="10" width="220" height="180" rx="8" fill="url(#docGrad)"
      stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
    {/* En-tête document */}
    <rect x="30" y="10" width="220" height="35" rx="8" fill="rgba(34,197,94,0.1)" />
    <rect x="30" y="35" width="220" height="10" fill="rgba(34,197,94,0.1)" />
    <text x="140" y="32" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="monospace"
      fontWeight="bold">CERTIFICAT DE DESTRUCTION</text>
    <text x="140" y="56" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="monospace">
      Art. L.322-10 du Code de la Route
    </text>
    {/* Lignes de texte */}
    {[70,82,94,106].map((y, i) => (
      <rect key={i} x="50" y={y} width={140 + i*8} height="5" rx="2" fill="#1f2937" />
    ))}
    <rect x="50" y="120" width="90" height="5" rx="2" fill="#1f2937" />
    {/* Tampon rond */}
    <circle cx="200" cy="130" r="28" fill="none" stroke="rgba(34,197,94,0.25)" strokeWidth="2" />
    <circle cx="200" cy="130" r="22" fill="none" stroke="rgba(34,197,94,0.15)" strokeWidth="1" />
    <text x="200" y="126" textAnchor="middle" fill="#22c55e" fontSize="7"
      fontFamily="monospace" fontWeight="bold">SNR</text>
    <text x="200" y="135" textAnchor="middle" fill="#4b5563" fontSize="5" fontFamily="monospace">
      CHAIGNES 27
    </text>
    {/* Signature */}
    <path d="M 60 155 Q 80 145 100 155 Q 120 165 140 155" fill="none"
      stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Checkmarks */}
    {[[55,168],[75,168],[95,168]].map(([x,y],i) => (
      <g key={i}>
        <rect x={x} y={y-6} width="12" height="8" rx="1" fill="rgba(34,197,94,0.1)"
          stroke="rgba(34,197,94,0.3)" strokeWidth="0.8" />
        <path d={`M ${x+2} ${y-2} L ${x+5} ${y+1} L ${x+10} ${y-5}`}
          fill="none" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ))}
    <text x="60" y="185" fill="#4b5563" fontSize="6" fontFamily="monospace">Document officiel · Valable en préfecture</text>
  </svg>
);

const ProcessSVG = ({ step, icon }: { step: number; icon: string }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 64 }}>
    <defs>
      <radialGradient id={`stepGrad${step}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(34,197,94,0.2)" />
        <stop offset="100%" stopColor="rgba(34,197,94,0.05)" />
      </radialGradient>
    </defs>
    <circle cx="40" cy="40" r="36" fill={`url(#stepGrad${step})`}
      stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" />
    <text x="40" y="46" textAnchor="middle" fontSize="24">{icon}</text>
    <text x="40" y="14" textAnchor="middle" fill="#22c55e" fontSize="9"
      fontFamily="monospace" fontWeight="bold">{String(step).padStart(2,'0')}</text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function FaqAccordion({ faq }: { faq: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faq.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", background: "none", border: "none",
              cursor: "pointer", padding: "1.1rem 0",
              display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem",
            }}
          >
            <span style={{ color: "#f3f4f6", fontWeight: 600, fontSize: "0.92rem", lineHeight: 1.45 }}>
              {item.q}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              style={{ color: "#22c55e", flexShrink: 0, fontSize: "1.3rem", lineHeight: 1, marginTop: "2px" }}
            >+</motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ overflow: "hidden" }}
              >
                <p style={{
                  color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.75,
                  paddingBottom: "1.1rem", paddingRight: "2rem",
                }}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Particules flottantes
function FloatingParticles() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: i % 4 === 0 ? "#22c55e" : i % 4 === 1 ? "#b45309" : i % 4 === 2 ? "#6b7280" : "#374151",
    dur: 10 + Math.random() * 15,
    delay: Math.random() * 8,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {items.map((p) => (
        <motion.div key={p.id}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: p.color,
            boxShadow: p.id % 4 === 0 ? `0 0 ${p.size * 3}px ${p.color}` : "none",
          }}
          animate={{ y: [-8, -35, -8], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// Compteur animé
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 35);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export function EpavePage() {
  const { ville: villeSlug } = useParams<{ ville?: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showVilles, setShowVilles] = useState(false);

  const ville = villeSlug ? (VILLES_BY_SLUG[villeSlug] || null) : null;
  const villeData = ville || VILLE_GENERIQUE;
  const isGeneric = !ville;

  // Mots-clés générés pour cette ville
  const keywords = generateKeywords(villeData.nom, villeData.slug, villeData.cp);

  // Villes filtrées par recherche
  const villesFiltrees = VILLES.filter(v =>
    v.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.cp.includes(searchQuery)
  );

  // FAQ dynamique selon la ville
  const faq = [
    {
      q: `L'enlèvement d'épave est-il vraiment gratuit à ${villeData.nom} ?`,
      a: `Oui, l'enlèvement d'épave est gratuit dans la grande majorité des cas à ${villeData.nom} (${villeData.cp}) et dans tout le département ${villeData.dept}. La gratuité s'applique pour les véhicules standard de moins de 3,5 tonnes. Appelez le 02 32 38 60 09 pour confirmation selon votre situation exacte.`,
    },
    {
      q: `Combien de temps pour enlever une épave à ${villeData.nom} ?`,
      a: `Nous intervenons généralement sous 24 à 48 heures à ${villeData.nom}${villeData.distanceChaignes > 0 ? ` (à environ ${villeData.distanceChaignes} km de notre dépôt de Chaignes)` : ""}. Pour les cas urgents, contactez-nous directement pour un enlèvement express le jour même.`,
    },
    {
      q: `Quels véhicules enlevez-vous comme épaves à ${villeData.nom} ?`,
      a: `Nous enlevons à ${villeData.nom} : voitures, motos, scooters, utilitaires, fourgonnettes, tracteurs et engins agricoles. Roulants ou non roulants, brûlés, accidentés, sans contrôle technique — tout est accepté.`,
    },
    {
      q: `Comment obtenir le certificat de destruction à ${villeData.nom} ?`,
      a: `Le certificat de destruction officiel (article L.322-10 du Code de la route) vous est remis lors de l'enlèvement à ${villeData.nom}. Ce document vous dégage de toute responsabilité et vous permet de désinscrire le véhicule en préfecture de ${villeData.dept}.`,
    },
    {
      q: `Faut-il la carte grise pour enlèvement d'épave à ${villeData.nom} ?`,
      a: `La carte grise est recommandée mais non obligatoire dans tous les cas. Si vous ne l'avez plus, nous vous aidons dans les démarches. Pour les épaves à ${villeData.nom} (${villeData.cp}), appelez-nous pour connaître les documents nécessaires selon votre situation.`,
    },
    {
      q: `Quelle est la différence entre une épave roulante et non roulante à ${villeData.nom} ?`,
      a: `Une épave roulante peut encore se déplacer seule ou être tractée. Une épave non roulante nécessite un équipement spécial (plateau, grappin). Nous disposons du matériel pour les deux cas à ${villeData.nom} et dans tout ${villeData.dept} — l'enlèvement est inclus dans les deux situations.`,
    },
    {
      q: `Peut-on enlever une épave sur la voie publique à ${villeData.nom} ?`,
      a: `Pour une épave sur voie publique à ${villeData.nom}, il faut au préalable un accord de la mairie ou des autorités locales. Nous pouvons vous guider dans ces démarches. Pour les épaves sur propriété privée (jardin, garage, parking), l'enlèvement se fait directement.`,
    },
    {
      q: `Intervenez-vous dans les communes autour de ${villeData.nom} ?`,
      a: `Oui, nous intervenons à ${villeData.nom} et dans toutes les communes environnantes${villeData.communes ? ` : ${villeData.communes.join(", ")}` : ""}. Notre rayon d'intervention couvre 100 km autour de Chaignes dans l'Eure (27).`,
    },
  ];

  const handleVilleClick = useCallback((v: VilleData) => {
    navigate(`/enlevement-epaves/${v.slug}`);
    setShowVilles(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  return (
    <div style={{ background: "#060608", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── SEO : JSON-LD Schema.org ────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": "https://snr-normandie.fr/#business",
            "name": "Société Normande de Recyclage",
            "alternateName": "SNR",
            "description": `Enlèvement gratuit d'épaves à ${villeData.nom} et dans tout l'Eure (27). Certificat de destruction officiel, intervention sous 24h.`,
            "url": "https://snr-normandie.fr",
            "telephone": "+33232386009",
            "priceRange": "Gratuit",
            "image": "https://snr-normandie.fr/og-image.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Route de Chaignes",
              "addressLocality": "Chaignes",
              "postalCode": "27130",
              "addressRegion": "Normandie",
              "addressCountry": "FR"
            },
            "geo": { "@type": "GeoCoordinates", "latitude": 49.0, "longitude": 1.35 },
            "areaServed": [
              { "@type": "AdministrativeArea", "name": "Eure", "containsPlace": { "@type": "AdministrativeArea", "name": villeData.nom } },
              { "@type": "AdministrativeArea", name: "Normandie" }
            ],
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:30", "closes": "18:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "12:00" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services d'enlèvement d'épaves",
              "itemListElement": [
                { "@type": "Offer", "name": `Enlèvement épave gratuit ${villeData.nom}`, "price": "0", "priceCurrency": "EUR" },
                { "@type": "Offer", "name": "Certificat de destruction officiel", "price": "0", "priceCurrency": "EUR" },
              ]
            },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "83" }
          },
          {
            "@type": "Service",
            "name": `Enlèvement d'épave ${villeData.nom}`,
            "provider": { "@id": "https://snr-normandie.fr/#business" },
            "areaServed": { "@type": "City", "name": villeData.nom, "postalCode": villeData.cp },
            "description": `Service professionnel d'enlèvement et de destruction d'épaves de véhicules à ${villeData.nom} (${villeData.cp}). Gratuit, certificat de destruction fourni, intervention sous 24h.`,
            "serviceType": "Enlèvement d'épaves",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "availability": "InStock" }
          },
          {
            "@type": "FAQPage",
            "mainEntity": faq.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a }
            }))
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://snr-normandie.fr" },
              { "@type": "ListItem", "position": 2, "name": "Enlèvement d'Épaves", "item": "https://snr-normandie.fr/enlevement-epaves" },
              ...(ville ? [{ "@type": "ListItem", "position": 3, "name": ville.nom, "item": `https://snr-normandie.fr/enlevement-epaves/${ville.slug}` }] : []),
            ]
          }
        ]
      })}} />

      {/* ── MOTS-CLÉS SEO CACHÉS (pour indexation) ───────────────────────── */}
      <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
        aria-hidden="true">
        {keywords.map((kw, i) => <span key={i}>{kw} </span>)}
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: "7rem", paddingBottom: "0", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #0c1810 0%, #060608 100%)",
      }}>
        <FloatingParticles />
        {/* Glow radial */}
        <div style={{
          position: "absolute", top: "10%", left: "15%", width: 500, height: 300,
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "5%", width: 400, height: 300,
          background: "radial-gradient(circle, rgba(180,83,9,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
            <Link to="/" style={{ color: "#4b5563", fontSize: "0.8rem", textDecoration: "none" }}>Accueil</Link>
            <span style={{ color: "#374151" }}>›</span>
            <Link to="/enlevement-epaves" style={{ color: ville ? "#4b5563" : "#22c55e", fontSize: "0.8rem", textDecoration: "none" }}>
              Enlèvement d'Épaves
            </Link>
            {ville && <>
              <span style={{ color: "#374151" }}>›</span>
              <span style={{ color: "#22c55e", fontSize: "0.8rem" }}>{ville.nom}</span>
            </>}
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
            className="hero-grid">
            {/* Texte */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>

              <span style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 999,
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
                color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.12em",
                textTransform: "uppercase", marginBottom: "1.1rem",
              }}>
                SNR — Chaignes, Eure (27) • Service gratuit
              </span>

              <h1 style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 900, lineHeight: 1.08,
                marginBottom: "0.6rem",
                background: "linear-gradient(135deg, #ffffff 0%, #d1fae5 40%, #a7f3d0 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {isGeneric
                  ? "Enlèvement d'Épaves Gratuit dans l'Eure (27)"
                  : `Enlèvement d'Épave Gratuit à ${ville.nom}`}
              </h1>

              <p style={{ color: "#22c55e", fontSize: "1rem", fontWeight: 600, marginBottom: "0.8rem" }}>
                {isGeneric
                  ? "Voitures, motos, utilitaires — Certificat de destruction officiel"
                  : `${ville.nom} (${ville.cp}) • ${ville.dept} • Intervention sous 24h`}
              </p>

              <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                La <strong style={{ color: "#e5e7eb" }}>Société Normande de Recyclage (SNR)</strong> assure
                l'enlèvement gratuit de vos épaves de véhicules
                {ville ? ` à ${ville.nom} (${ville.cp}) et dans les communes environnantes` : " dans tout l'Eure (27) et la Normandie"}.
                Certificat de destruction officiel remis lors de l'enlèvement.
                Intervention sous 24 à 48 heures.
              </p>

              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {[
                  { icon: "✓", text: "100% Gratuit" },
                  { icon: "📄", text: "Certificat officiel" },
                  { icon: "⚡", text: "Sous 24h" },
                  { icon: "🔧", text: "Roulants & non roulants" },
                  ...(ville ? [{ icon: "📍", text: ville.cp }] : [{ icon: "🗺️", text: "Eure (27)" }]),
                ].map((b, i) => (
                  <motion.span key={i} whileHover={{ scale: 1.07, borderColor: "rgba(34,197,94,0.45)" }}
                    style={{
                      padding: "4px 12px", borderRadius: 999,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "#9ca3af", fontSize: "0.75rem", cursor: "default",
                    }}>
                    {b.icon} {b.text}
                  </motion.span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <motion.a href="tel:0232386009"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(34,197,94,0.55)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.85rem 1.75rem", borderRadius: 12,
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                    color: "#fff", fontWeight: 800, fontSize: "1rem",
                    boxShadow: "0 0 28px rgba(34,197,94,0.4)",
                    textDecoration: "none",
                  }}>
                  <Phone size={18} /> Appeler maintenant
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Link to="/contact" style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.85rem 1.75rem", borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#d1d5db", fontWeight: 600,
                    textDecoration: "none",
                  }}>
                    <FileText size={18} /> Demande en ligne
                  </Link>
                </motion.div>
              </div>

              {/* Sélecteur de ville */}
              <div style={{ marginTop: "1.25rem", position: "relative" }}>
                <button onClick={() => setShowVilles(!showVilles)} style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#6b7280", fontSize: "0.82rem",
                }}>
                  <MapPin size={14} style={{ color: "#22c55e" }} />
                  {ville ? `Changer de ville →` : "Choisir votre ville →"}
                  <motion.span animate={{ rotate: showVilles ? 180 : 0 }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {showVilles && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: "absolute", top: "100%", left: 0, zIndex: 50,
                        background: "#111318", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 14, padding: "0.75rem", width: 380, maxHeight: 380,
                        overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
                        marginTop: "0.5rem",
                      }}>
                      {/* Recherche */}
                      <input
                        placeholder="Rechercher une ville ou un code postal..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        autoFocus
                        style={{
                          width: "100%", padding: "0.6rem 0.8rem", borderRadius: 8,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#e5e7eb", fontSize: "0.85rem", outline: "none",
                          marginBottom: "0.6rem", boxSizing: "border-box",
                        }}
                      />
                      {/* Eure (27) */}
                      <p style={{ color: "#4b5563", fontSize: "0.68rem", textTransform: "uppercase",
                        letterSpacing: "0.1em", marginBottom: "0.4rem", padding: "0 4px" }}>
                        Eure (27)
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.8rem" }}>
                        {villesFiltrees.filter(v => v.dept === "Eure").map(v => (
                          <motion.button key={v.slug}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleVilleClick(v)}
                            style={{
                              padding: "4px 12px", borderRadius: 8,
                              background: ville?.slug === v.slug ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)",
                              border: ville?.slug === v.slug ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.07)",
                              color: ville?.slug === v.slug ? "#22c55e" : "#9ca3af",
                              fontSize: "0.8rem", cursor: "pointer",
                            }}>
                            {v.nom}
                          </motion.button>
                        ))}
                      </div>
                      {/* Autres */}
                      {villesFiltrees.filter(v => v.dept !== "Eure").length > 0 && <>
                        <p style={{ color: "#4b5563", fontSize: "0.68rem", textTransform: "uppercase",
                          letterSpacing: "0.1em", marginBottom: "0.4rem", padding: "0 4px" }}>
                          Départements limitrophes
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {villesFiltrees.filter(v => v.dept !== "Eure").map(v => (
                            <motion.button key={v.slug}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleVilleClick(v)}
                              style={{
                                padding: "4px 12px", borderRadius: 8,
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                color: "#6b7280", fontSize: "0.78rem", cursor: "pointer",
                              }}>
                              {v.nom} ({v.cp.slice(0,2)})
                            </motion.button>
                          ))}
                        </div>
                      </>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", height: 280 }}
              className="hero-illustration">
              <div style={{
                width: "100%", height: "100%", borderRadius: 20,
                overflow: "hidden",
                background: "rgba(10,18,12,0.9)",
                border: "1px solid rgba(34,197,94,0.12)",
                boxShadow: "0 0 80px rgba(34,197,94,0.06) inset, 0 24px 60px rgba(0,0,0,0.5)",
              }}>
                <EpaveHeroSVG />
              </div>
              {/* Badge flottant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                style={{
                  position: "absolute", bottom: -16, right: -16,
                  padding: "0.6rem 1rem", borderRadius: 12,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  boxShadow: "0 0 24px rgba(34,197,94,0.5)",
                  color: "#fff", fontWeight: 900, fontSize: "0.82rem",
                }}>
                ✓ Enlèvement GRATUIT
              </motion.div>
              {/* Badge avis */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
                style={{
                  position: "absolute", top: -14, left: -14,
                  padding: "0.5rem 0.9rem", borderRadius: 10,
                  background: "#111318",
                  border: "1px solid rgba(245,158,11,0.3)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={11} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <span style={{ color: "#e5e7eb", fontSize: "0.78rem", fontWeight: 700 }}>4.9/5</span>
                <span style={{ color: "#6b7280", fontSize: "0.7rem" }}>83 avis</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              borderRadius: "16px 16px 0 0",
              border: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "none", overflow: "hidden", marginTop: "2.5rem",
            }}
            className="stats-bar">
            {[
              { val: 100, suffix: "%", label: "Gratuit dans le 27" },
              { val: 24, suffix: "h", label: "Délai intervention" },
              { val: 100, suffix: " km", label: "Rayon couverture" },
              { val: 83, suffix: "+", label: "Avis 5 étoiles" },
            ].map(({ val, suffix, label }, i) => (
              <div key={i} style={{
                padding: "1.1rem 0.5rem", textAlign: "center",
                background: "rgba(10,12,14,0.97)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ color: "#22c55e", fontSize: "1.5rem", fontWeight: 900, lineHeight: 1 }}>
                  <CountUp to={val} suffix={suffix} />
                </div>
                <div style={{ color: "#4b5563", fontSize: "0.7rem", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION PROCESSUS ───────────────────────────────────────────── */}
      <section style={{ padding: "4.5rem 1.25rem", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 999,
              background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.12em",
              textTransform: "uppercase", marginBottom: "0.8rem",
            }}>
              Comment ça marche
            </span>
            <h2 style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800,
              background: "linear-gradient(135deg, #fff 0%, #9ca3af 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Enlèvement d'épave à {villeData.nom} en 4 étapes
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.25rem",
        }}>
          {[
            { emoji: "📞", title: "Appelez-nous", desc: `Contactez la SNR au 02 32 38 60 09. Nous établissons un devis gratuit pour votre épave à ${villeData.nom} en quelques minutes.` },
            { emoji: "📅", title: "On fixe un RDV", desc: `Nous convenons d'un créneau d'intervention à ${villeData.nom}. Sous 24 à 48h dans la majorité des cas.` },
            { emoji: "🚛", title: "On enlève l'épave", desc: `Nos techniciens interviennent avec le matériel adapté. Véhicule roulant ou non, nous chargeons et emportons tout.` },
            { emoji: "📄", title: "Certificat remis", desc: `Le certificat de destruction officiel vous est remis sur place. Vous êtes déchargé de toute responsabilité civile.` },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(34,197,94,0.35)" }}
                style={{
                  padding: "1.75rem 1.5rem", borderRadius: 16,
                  background: "rgba(14,16,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.2s",
                  position: "relative", overflow: "hidden",
                }}>
                {/* Numéro en fond */}
                <span style={{
                  position: "absolute", top: -10, right: 12,
                  fontSize: "5rem", fontWeight: 900, lineHeight: 1,
                  color: "rgba(34,197,94,0.04)", userSelect: "none",
                }}>
                  {i + 1}
                </span>
                <ProcessSVG step={i + 1} icon={step.emoji} />
                <h3 style={{ color: "#f3f4f6", fontWeight: 700, margin: "0.8rem 0 0.4rem", fontSize: "1rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SECTION VÉHICULES ACCEPTÉS ───────────────────────────────────── */}
      <section style={{
        padding: "3.5rem 1.25rem", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <FadeIn>
          <h2 style={{
            fontSize: "clamp(1.35rem, 2.5vw, 1.9rem)", fontWeight: 800, marginBottom: "0.5rem",
            color: "#f3f4f6",
          }}>
            Tous les véhicules épaves acceptés à {villeData.nom}
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 620 }}>
            Quelle que soit la taille, l'état ou la marque du véhicule, nous enlevons votre épave
            à {villeData.nom} ({villeData.cp}) sans frais.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
          {[
            { emoji: "🚗", cat: "Voitures", types: "Berlines, breaks, SUV, citadines, coupés" },
            { emoji: "🏍️", cat: "Deux-roues", types: "Motos, scooters, cyclomoteurs, quads" },
            { emoji: "🚐", cat: "Utilitaires", types: "Fourgons, camionnettes, vans, minibus" },
            { emoji: "🚛", cat: "Poids lourds légers", types: "Jusqu'à 3,5 t, sur demande au-delà" },
            { emoji: "🚜", cat: "Engins agricoles", types: "Tracteurs, moissonneuses, chargeurs" },
          ].map((v, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ scale: 1.04, borderColor: "rgba(34,197,94,0.3)" }}
                style={{
                  padding: "1.25rem 1rem", borderRadius: 12,
                  background: "rgba(14,16,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  cursor: "default",
                }}>
                <span style={{ fontSize: "1.8rem" }}>{v.emoji}</span>
                <h3 style={{ color: "#e5e7eb", fontWeight: 700, fontSize: "0.9rem", margin: "0.5rem 0 0.25rem" }}>
                  {v.cat}
                </h3>
                <p style={{ color: "#4b5563", fontSize: "0.76rem", lineHeight: 1.5 }}>{v.types}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Marques */}
        <FadeIn delay={0.2}>
          <div style={{ marginTop: "2rem", padding: "1.25rem 1.5rem", borderRadius: 12,
            background: "rgba(14,16,18,0.8)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p style={{ color: "#4b5563", fontSize: "0.75rem", marginBottom: "0.75rem",
              textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Toutes marques acceptées
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Renault", "Peugeot", "Citroën", "Volkswagen", "Ford", "Toyota", "BMW", "Mercedes",
                "Audi", "Opel", "Fiat", "Nissan", "Honda", "Hyundai", "Kia", "Seat", "Skoda",
                "Dacia", "Volvo", "Suzuki", "Mazda", "Mitsubishi", "Jeep", "Land Rover"].map((m, i) => (
                <span key={i} style={{
                  padding: "3px 10px", borderRadius: 6,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "#6b7280", fontSize: "0.78rem",
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CERTIFICAT DE DESTRUCTION ────────────────────────────────────── */}
      <section style={{
        padding: "3.5rem 1.25rem", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
          className="cert-grid">
          <FadeIn>
            <h2 style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)", fontWeight: 800,
              color: "#f3f4f6", marginBottom: "0.8rem",
            }}>
              Certificat de destruction officiel à {villeData.nom}
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1rem" }}>
              Conformément à l'article L.322-10 du Code de la route, nous vous remettons un
              certificat de destruction officiel lors de chaque enlèvement d'épave à {villeData.nom}.
              Ce document est obligatoire pour la désinscription de votre véhicule en préfecture
              de {villeData.dept}.
            </p>
            <p style={{ color: "#9ca3af", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Il vous décharge de toute responsabilité civile (amendes, accidents, fourrière…)
              liée au véhicule à compter de la date d'enlèvement. Il atteste également que le
              véhicule a été traité dans une installation agréée, conformément à la réglementation
              sur la fin de vie des véhicules (directive 2000/53/CE).
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                "Déchargement de responsabilité civile immédiat",
                "Valable pour désinscription en préfecture",
                "Recyclage 100% réglementaire des fluides",
                "Traçabilité complète du véhicule détruit",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <CheckCircle size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                  <span style={{ color: "#d1d5db", fontSize: "0.88rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{
              height: 260, borderRadius: 16, overflow: "hidden",
              border: "1px solid rgba(34,197,94,0.15)",
              background: "rgba(12,18,14,0.8)",
            }}>
              <CertificatSVG />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AVANTAGES ────────────────────────────────────────────────────── */}
      <section style={{
        padding: "3.5rem 1.25rem", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <FadeIn>
          <h2 style={{
            fontSize: "clamp(1.3rem, 2.5vw, 1.85rem)", fontWeight: 800,
            color: "#f3f4f6", marginBottom: "0.5rem",
          }}>
            Pourquoi choisir SNR pour votre épave à {villeData.nom} ?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.88rem", marginBottom: "2rem" }}>
            {ville
              ? `À ${ville.nom} (${ville.cp}), à seulement ${ville.distanceChaignes} km de notre dépôt de Chaignes.`
              : "Basés à Chaignes (27), au cœur de l'Eure et de la Normandie."
            }
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            { icon: <Zap size={20} />, title: "Intervention express", desc: `Nous intervenons sous 24 à 48h à ${villeData.nom}. Pour les urgences, appelez-nous pour un enlèvement le jour même.` },
            { icon: <Shield size={20} />, title: "Aucun frais caché", desc: `L'enlèvement est 100% gratuit pour les véhicules standards dans le ${villeData.dept}. Aucune commission, aucune surprise.` },
            { icon: <Award size={20} />, title: "Agréé et réglementaire", desc: "Nous sommes agréés pour le traitement des véhicules hors d'usage. Recyclage 100% conforme à la réglementation européenne." },
            { icon: <Truck size={20} />, title: "Matériel professionnel", desc: "Camion plateau, grappin hydraulique, sangles et équipements de sécurité pour tout type de véhicule épave." },
            { icon: <MapPin size={20} />, title: `Couverture ${villeData.dept}`, desc: `Nous couvrons ${villeData.nom} et toutes les communes environnantes dans un rayon de 100 km autour de Chaignes.` },
            { icon: <Clock size={20} />, title: "Disponible 6j/7", desc: "Disponibles du lundi au samedi. Interventions d'urgence possibles le samedi matin à Évreux, Vernon et dans le 27." },
          ].map((adv, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(34,197,94,0.3)" }}
                style={{
                  padding: "1.5rem", borderRadius: 14,
                  background: "rgba(14,16,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.2s",
                }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#22c55e", marginBottom: "0.9rem",
                }}>
                  {adv.icon}
                </div>
                <h3 style={{ color: "#f3f4f6", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                  {adv.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.83rem", lineHeight: 1.65 }}>
                  {adv.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CONTENU SEO LONG ─────────────────────────────────────────────── */}
      <section style={{
        padding: "3.5rem 1.25rem", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2.5rem" }} className="content-grid">
          <div>
            <FadeIn>
              <div style={{
                padding: "2rem", borderRadius: 16,
                background: "rgba(14,16,18,0.95)",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "1.5rem",
              }}>
                <h2 style={{ color: "#f3f4f6", fontWeight: 800, fontSize: "1.15rem", marginBottom: "1rem" }}>
                  Enlèvement d'épave à {villeData.nom} : tout ce que vous devez savoir
                </h2>
                <p style={{ color: "#9ca3af", lineHeight: 1.85, fontSize: "0.92rem", marginBottom: "1rem" }}>
                  Vous avez une voiture épave, une moto hors d'usage ou un utilitaire accidenté
                  à {villeData.nom} ({villeData.cp}) et vous ne savez pas comment vous en débarrasser ?
                  La Société Normande de Recyclage (SNR), basée à Chaignes dans l'Eure (27), est
                  votre solution de proximité.
                  {ville && ` À seulement ${ville.distanceChaignes} km de votre commune, nous intervenons
                  rapidement sur ${ville.nom} et les communes avoisinantes.`}
                </p>
                <p style={{ color: "#9ca3af", lineHeight: 1.85, fontSize: "0.92rem", marginBottom: "1rem" }}>
                  L'enlèvement d'une épave est gratuit dans la grande majorité des cas à {villeData.nom}.
                  Contrairement à certains prestataires qui facturent le déplacement ou la manutention,
                  nous prenons en charge l'intégralité de l'opération sans frais : déplacement,
                  chargement, transport, dépollution et recyclage du véhicule.
                </p>
                <p style={{ color: "#9ca3af", lineHeight: 1.85, fontSize: "0.92rem" }}>
                  La réglementation impose que tout véhicule hors d'usage (VHU) soit traité
                  par un professionnel agréé. En choisissant SNR pour votre épave à {villeData.nom},
                  vous êtes certain que votre véhicule sera dépollué et recyclé conformément
                  à la directive européenne 2000/53/CE et au Code de l'environnement français.
                </p>
              </div>
            </FadeIn>

            {/* FAQ */}
            <FadeIn delay={0.1}>
              <div style={{
                padding: "2rem", borderRadius: 16,
                background: "rgba(14,16,18,0.95)",
                border: "1px solid rgba(255,255,255,0.05)",
                marginBottom: "1.5rem",
              }}>
                <h2 style={{ color: "#f3f4f6", fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.25rem" }}>
                  Questions fréquentes — Épave à {villeData.nom}
                </h2>
                <FaqAccordion faq={faq} />
              </div>
            </FadeIn>

            {/* Communes couvertes */}
            {ville?.communes && (
              <FadeIn delay={0.15}>
                <div style={{
                  padding: "1.75rem", borderRadius: 16,
                  background: "rgba(14,16,18,0.95)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                    <MapPin size={16} style={{ color: "#22c55e" }} />
                    <h3 style={{ color: "#f3f4f6", fontWeight: 700, fontSize: "0.98rem" }}>
                      Communes couvertes autour de {ville.nom}
                    </h3>
                  </div>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                    Nous enlevons également les épaves dans ces communes proches :
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {ville.communes.map((c, i) => (
                      <span key={i} style={{
                        padding: "3px 10px", borderRadius: 6,
                        background: "rgba(34,197,94,0.05)",
                        border: "1px solid rgba(34,197,94,0.12)",
                        color: "#4b5563", fontSize: "0.78rem",
                      }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar sticky */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                padding: "1.5rem", borderRadius: 18,
                background: "rgba(14,16,18,0.98)",
                border: "1px solid rgba(34,197,94,0.2)",
                position: "sticky", top: "5.5rem",
                boxShadow: "0 0 40px rgba(34,197,94,0.06)",
              }}>
              <div style={{
                padding: "0.8rem 1rem", borderRadius: 10, marginBottom: "1.25rem",
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
              }}>
                <p style={{ color: "#22c55e", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                  Enlèvement GRATUIT
                </p>
                <p style={{ color: "#4b5563", fontSize: "0.75rem", margin: "2px 0 0" }}>
                  {ville ? `À ${ville.nom} (${ville.cp})` : "Dans tout l'Eure (27)"}
                </p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem 0", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {[
                  "Enlèvement 100% gratuit",
                  "Certificat de destruction inclus",
                  "Roulant ou non roulant",
                  "Intervention sous 24h",
                  "Toutes marques acceptées",
                  "Sans carte grise dans certains cas",
                  "Recyclage réglementaire garanti",
                ].map((a, i) => (
                  <motion.li key={i} whileHover={{ x: 3 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CheckCircle size={14} style={{ color: "#22c55e", flexShrink: 0 }} />
                    <span style={{ color: "#d1d5db", fontSize: "0.83rem" }}>{a}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.a href="tel:0232386009"
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(34,197,94,0.55)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "0.5rem", padding: "0.9rem", borderRadius: 12,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff", fontWeight: 800, fontSize: "1rem",
                  boxShadow: "0 0 22px rgba(34,197,94,0.4)",
                  textDecoration: "none", marginBottom: "0.7rem",
                  width: "100%", boxSizing: "border-box",
                }}>
                <Phone size={17} /> 02 32 38 60 09
              </motion.a>

              <Link to="/contact" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", padding: "0.8rem", borderRadius: 12,
                border: "1px solid rgba(34,197,94,0.25)",
                color: "#22c55e", fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none", marginBottom: "1.25rem",
                width: "100%", boxSizing: "border-box",
              }}>
                <FileText size={16} /> Demande en ligne
              </Link>

              {/* Avis */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" stroke="none" />)}
                </div>
                <p style={{ color: "#6b7280", fontSize: "0.78rem", margin: 0 }}>4.9/5 — 83 avis Google</p>
                <p style={{ color: "#374151", fontSize: "0.72rem", marginTop: 4, fontStyle: "italic" }}>
                  « Très professionnel, venu le lendemain, certificat remis. »
                </p>
              </div>

              {/* Distance info */}
              {ville && (
                <div style={{
                  marginTop: "1rem", paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                }}>
                  <MapPin size={13} style={{ color: "#22c55e" }} />
                  <p style={{ color: "#4b5563", fontSize: "0.75rem", margin: 0 }}>
                    <strong style={{ color: "#6b7280" }}>{ville.distanceChaignes} km</strong>{" "}
                    de Chaignes (27) — Délai garanti 24-48h
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GRILLE VILLES SEO ─────────────────────────────────────────────── */}
      <section style={{
        padding: "3.5rem 1.25rem", maxWidth: 1100, margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <FadeIn>
          <h2 style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", fontWeight: 800,
            color: "#f3f4f6", marginBottom: "0.5rem",
          }}>
            Enlèvement d'épaves dans toute la Normandie et l'Eure (27)
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "1.75rem" }}>
            Choisissez votre ville pour accéder aux informations locales
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.65rem" }}>
          {VILLES.map((v, i) => (
            <FadeIn key={v.slug} delay={i * 0.025}>
              <motion.div whileHover={{ scale: 1.04, borderColor: "rgba(34,197,94,0.4)" }}
                whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/enlevement-epaves/${v.slug}`}
                  style={{
                    display: "block", padding: "0.85rem 1rem", borderRadius: 10,
                    background: ville?.slug === v.slug ? "rgba(34,197,94,0.1)" : "rgba(14,16,18,0.95)",
                    border: ville?.slug === v.slug ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)",
                    textDecoration: "none",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{
                      color: ville?.slug === v.slug ? "#22c55e" : "#e5e7eb",
                      fontWeight: 700, fontSize: "0.87rem",
                    }}>
                      {v.nom}
                    </span>
                    <ArrowRight size={13} style={{ color: "#374151", flexShrink: 0, marginTop: 2 }} />
                  </div>
                  <span style={{ color: "#4b5563", fontSize: "0.72rem" }}>{v.cp} · {v.distanceChaignes > 0 ? `${v.distanceChaignes}km` : "Siège"}</span>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 1.25rem", textAlign: "center" }}>
        <FadeIn>
          <div style={{
            maxWidth: 700, margin: "0 auto", padding: "3rem 2rem", borderRadius: 20,
            background: "rgba(12,22,16,0.95)",
            border: "1px solid rgba(34,197,94,0.2)",
            boxShadow: "0 0 80px rgba(34,197,94,0.06) inset",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(circle at 50% 100%, rgba(34,197,94,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
            <h2 style={{
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900,
              background: "linear-gradient(135deg, #fff, #a7f3d0)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "0.6rem",
            }}>
              Faites enlever votre épave à {villeData.nom}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.92rem", marginBottom: "2rem" }}>
              Gratuit · Rapide · Officiel · {villeData.nom} ({villeData.cp})
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.a href="tel:0232386009"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,197,94,0.6)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  padding: "1rem 2rem", borderRadius: 14,
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  color: "#fff", fontWeight: 800, fontSize: "1.05rem",
                  boxShadow: "0 0 30px rgba(34,197,94,0.45)",
                  textDecoration: "none",
                }}>
                <Phone size={20} /> 02 32 38 60 09
              </motion.a>
              <Link to="/contact" style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "1rem 2rem", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#d1d5db", fontWeight: 600,
                textDecoration: "none",
              }}>
                <FileText size={18} /> Demande en ligne
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Balise SEO footer */}
      <footer style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 2.5rem",
        borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.5rem",
      }}>
        <p style={{ color: "rgba(75,85,99,0.5)", fontSize: "0.68rem", lineHeight: 1.8 }}>
          Société Normande de Recyclage (SNR) — Enlèvement d'épaves gratuit Eure 27 —
          {VILLES.map(v => ` Enlèvement épave ${v.nom} (${v.cp})`).join(" —")} —
          Certificat de destruction officiel — Intervention 24h — Normandie
        </p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-illustration { display: none !important; }
          .cert-grid { grid-template-columns: 1fr !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
