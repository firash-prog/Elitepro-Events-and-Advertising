import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/Layout";
import { projects } from "@/data/projects";
import logo from "@/assets/elitepro/logo.png";

const hubs = [
  { city: "Riyadh", role: "Capital Epicenter" },
  { city: "Jeddah", role: "Coastal Experiential Center" },
  { city: "Dammam", role: "Industrial & Logistical Powerhouse" },
  { city: "Dubai", role: "Global Gateway Cross-Border Hub" },
];

const serviceCategories = [
  { title: "Event Management", count: "5 services", desc: "Corporate galas, exhibitions, product launches, brand & mall activations." },
  { title: "Stand Construction & 3D Design", count: "4 services", desc: "Turnkey booth fabrication, spatial design, signage and dimensional name boards." },
  { title: "Event Rentals & Technology", count: "3 services", desc: "Interactive tech, premium furniture and tour-grade audio-visual systems." },
  { title: "Production & Branded Collateral", count: "4 services", desc: "OOH advertising, large-format printing, ID/lanyards and bespoke trophies." },
  { title: "On-Site Logistics", count: "4 services", desc: "Registration, crowd management, freight logistics and venue procurement." },
  { title: "Event Staffing", count: "4 services", desc: "Bilingual ushers, catering, certified labor and janitorial crews." },
];

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 6);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  return (
    <Layout showEchelonFooter noPadding>
      {/* HERO */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen overflow-hidden pt-24 md:pt-32 pb-16"
      >
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, hsl(var(--muted)) 0%, transparent 50%), radial-gradient(circle at 80% 60%, hsl(var(--primary) / 0.2) 0%, transparent 55%)",
          }}
        />

        <div className="container-wide grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/40 bg-primary/10 text-primary text-xs tracking-widest uppercase rounded-full">
              <Sparkles size={14} /> GCC's Unified Event Ecosystem
            </div>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-[0.95]"
              style={{ color: "hsl(var(--brand-green))" }}
            >
              We engineer<br />
              <span className="text-foreground">unforgettable</span><br />
              live experiences.
            </h1>
            <p className="text-lg md:text-xl max-w-2xl text-muted-foreground leading-relaxed">
              ElitePro Events &amp; Advertising is a premier live-production, structural fabrication and
              localized execution ecosystem across Saudi Arabia and the UAE — powered by Digital Soul KSA.
              One partner. End-to-end accountability. Zero execution gap.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors rounded-md"
              >
                Request a Proposal <ArrowRight size={18} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-primary hover:text-primary transition-colors rounded-md"
              >
                Explore Services
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 max-w-xl">
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold" style={{ color: "hsl(var(--brand-green))" }}>26</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Capabilities</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold" style={{ color: "hsl(var(--brand-green))" }}>4</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Regional Hubs</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold" style={{ color: "hsl(var(--brand-green))" }}>5</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Phase Delivery</p>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-5 relative aspect-square max-w-md mx-auto transition-transform duration-500 ease-out"
            style={{ transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-primary/30 rounded-3xl" />
            <img src={logo} alt="ElitePro" className="relative w-full h-full object-contain p-10" />
          </div>
        </div>
      </section>

      {/* HUBS */}
      <section className="container-wide py-20 border-t border-separator">
        <p className="text-label mb-6">Quad-Hub Infrastructure</p>
        <h2 className="text-headline mb-12 max-w-3xl" style={{ color: "hsl(var(--brand-green))" }}>
          Wholly owned operations across the GCC.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((h) => (
            <div key={h.city} className="p-6 bg-card rounded-xl border border-separator hover:border-primary transition-colors">
              <p className="font-display text-2xl font-bold text-foreground">{h.city}</p>
              <p className="text-sm text-muted-foreground mt-2">{h.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-wide py-20 border-t border-separator">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
          <div>
            <p className="text-label mb-4">The 26-Services Capabilities Matrix</p>
            <h2 className="text-headline max-w-2xl" style={{ color: "hsl(var(--brand-green))" }}>
              Six categories. One enterprise partner.
            </h2>
          </div>
          <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:text-accent">
            See projects <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((s) => (
            <div key={s.title} className="p-6 border border-separator bg-background rounded-xl hover:bg-card transition-colors">
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <span className="text-xs text-primary uppercase tracking-widest">{s.count}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container-wide py-20 border-t border-separator">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-label mb-4">Selected Work</p>
            <h2 className="text-headline" style={{ color: "hsl(var(--brand-green))" }}>Live productions.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link to={`/work/${p.id}`} key={p.id} className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-card">
                <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="pt-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <h3 className="font-display text-xl font-semibold mt-1 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.client}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide py-20">
        <div className="rounded-3xl p-10 md:p-16 text-center" style={{ background: "linear-gradient(135deg, hsl(var(--brand-green)), hsl(var(--primary)))" }}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto leading-tight">
            Ready to brief your next campaign?
          </h2>
          <p className="text-white/90 mt-6 max-w-xl mx-auto">
            From discovery to asset reclamation, our 5-phase delivery framework keeps every project on brand, on budget and on the day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a href="mailto:firash@eliteproeventsksa.com" className="px-6 py-3 bg-white text-foreground font-medium rounded-md hover:bg-card transition-colors">
              firash@eliteproeventsksa.com
            </a>
            <a href="tel:+966537060245" className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-foreground transition-colors">
              +966 53 706 0245
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
