import gala from "@/assets/elitepro/gala-banquet.jpg";
import aramcoTrophy from "@/assets/elitepro/aramco-trophy.png";
import trophies from "@/assets/elitepro/trophies.jpg";
import booths from "@/assets/elitepro/exhibition-booths.jpg";
import svp from "@/assets/elitepro/svp-recognition.jpg";
import archway from "@/assets/elitepro/desert-archway.jpg";
import oasisKit from "@/assets/elitepro/collective-oasis-kit.jpg";
import oasisTeam from "@/assets/elitepro/collective-oasis-team.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: string;
  client: string;
  description: string;
  coverImage: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: "svp-recognition",
    title: "Sr. Vice President's Recognition",
    category: "Corporate Gala",
    tags: ["EVENT MANAGEMENT", "AV PRODUCTION", "STAGE DESIGN"],
    year: "2026",
    client: "Aramco — Upstream & Downstream Project Management",
    description: "A full-scale executive recognition gala for Aramco's Senior Vice President. ElitePro delivered end-to-end production — custom branded stage architecture, seamless multi-panel LED matrix, AV calibration, banquet styling for hundreds of guests, and live show direction inside a 5-star convention hall.",
    coverImage: svp,
    images: [svp],
  },
  {
    id: "continuous-improvement-forum",
    title: "Continuous Improvement Forum",
    category: "Exhibition",
    tags: ["EXHIBITION BOOTHS", "FABRICATION", "SPATIAL BRANDING"],
    year: "2025",
    client: "Aramco — Organization Consulting Department",
    description: "Turnkey design, fabrication and installation of a multi-pavilion exhibition aisle for Aramco's 4th Annual Continuous Improvement Forum. Each booth was custom-built with backlit branding, interactive display zones, and integrated lighting — engineered to host VIP visitors and live demonstrations.",
    coverImage: booths,
    images: [booths],
  },
  {
    id: "aramco-trophies",
    title: "Aramco Recognition Trophies",
    category: "Trophies & Souvenirs",
    tags: ["TROPHIES", "CRAFTSMANSHIP", "BRANDED COLLATERAL"],
    year: "2025",
    client: "Aramco",
    description: "Bespoke crystal and acrylic trophies engineered for Aramco's recognition ceremonies. Each piece is custom designed, laser-engraved and finished to elite executive presentation standards — including bilingual layouts and the brand's signature blue-green gradient identity.",
    coverImage: trophies,
    images: [trophies, aramcoTrophy],
  },
  {
    id: "collective-oasis",
    title: "The Collective Oasis",
    category: "Brand Activation",
    tags: ["BRAND ACTIVATION", "EXPERIENTIAL", "TEAM ENGAGEMENT"],
    year: "2026",
    client: "Aramco — Team Engagement",
    description: "An immersive desert glamping activation for Aramco teams. ElitePro produced the full experiential build — illuminated archway, macramé selfie frames, custom curated welcome kits, sustainable branded merchandise, and on-site hospitality across the dunes.",
    coverImage: oasisTeam,
    images: [oasisTeam, oasisKit, archway],
  },
  {
    id: "executive-banquet",
    title: "Executive Banquet Production",
    category: "Corporate Event",
    tags: ["EVENT MANAGEMENT", "FURNITURE RENTAL", "CATERING"],
    year: "2026",
    client: "Confidential — KSA",
    description: "A black-and-gold executive banquet for hundreds of guests. ElitePro handled furniture rental, custom table styling with gold charger plates, floral centerpieces, full AV rigging on overhead truss, and synchronized service across the hall.",
    coverImage: gala,
    images: [gala],
  },
  {
    id: "desert-archway",
    title: "Saharan Camp Archway",
    category: "Structural Fabrication",
    tags: ["FABRICATION", "SIGNAGE", "NIGHT INSTALLATION"],
    year: "2025",
    client: "Aramco Saharan Camp",
    description: "Hand-fabricated wooden archway with intricate Islamic mashrabiya patterns, integrated warm lighting, and bilingual signage. Designed and installed on-site as the welcome threshold for Aramco's desert hospitality experience.",
    coverImage: archway,
    images: [archway],
  },
];
