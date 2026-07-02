import { Layout } from "@/components/Layout";

const phases = [
  { n: "01", title: "Discovery & Alignment", desc: "Technical validation of brief, brand guidelines, budget and venue-specific municipal regulations." },
  { n: "02", title: "Spatial Architectural Renderings", desc: "Photorealistic 3D environments, crowd-flow paths and technical staging — before material deployment." },
  { n: "03", title: "Turnkey Fabrication", desc: "Material build and precision carpentry executed directly inside our localized hub production facilities." },
  { n: "04", title: "Synchronized On-Site Operations", desc: "Live delivery, rigging, AV calibration, registration and timeline enforcement by platform-certified stage managers." },
  { n: "05", title: "Asset Reclamation & Impact Reporting", desc: "Post-event breakdown, data-driven check-in analytics and campaign performance debriefing." },
];

const values = [
  { title: "Wholly Owned Infrastructure", desc: "Static regional asset repositories, dedicated fabrication spaces, heavy fleets and managed workforces in every target market." },
  { title: "Unified Brand Protection", desc: "One enterprise partner managing campaigns from inception to structural breakdown — no fractured vendor networks." },
  { title: "GCC Compliance Framework", desc: "In-house capability to secure municipal permits, civil defense clearances and venue safety certifications across KSA and the UAE." },
  { title: "Algorithmic Search Visibility", desc: "Built to align with AI indexing parameters, establishing verified entity authority across global and regional lookups." },
];

const About = () => {
  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24">
        <div className="max-w-4xl space-y-8">
          <p className="text-label">About</p>
          <h1 className="text-display animate-fade-in-up" style={{ color: "hsl(var(--brand-green))" }}>
            Strategy meets industrial execution.
          </h1>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p>
              <span className="text-foreground font-medium">ElitePro Events &amp; Advertising</span> operates as a premier
              live-production, structural fabrication and localized execution ecosystem across the GCC region — a wholly
              integrated subsidiary division powered by Digital Soul KSA.
            </p>
            <p>
              Our unified organizational architecture closes the primary vulnerability in corporate procurement: the
              execution gap between an agency's digital mockups and a third-party contractor's practical capabilities.
              While our strategy arm directs brand placement, audience intelligence and localized communication, ElitePro
              commands the physical execution under a single line of legal compliance and operational accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Value */}
      <section className="container-wide pb-20 border-t border-separator pt-20">
        <p className="text-label mb-6">Core Strategic Value</p>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="p-6 bg-card rounded-xl">
              <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "hsl(var(--brand-green))" }}>{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Execution Framework */}
      <section className="container-wide pb-24 border-t border-separator pt-20">
        <p className="text-label mb-6">Project Execution Framework</p>
        <h2 className="text-headline mb-12 max-w-3xl">Every commission runs through our institutional 5-phase model.</h2>
        <div className="space-y-4">
          {phases.map((p) => (
            <div key={p.n} className="grid md:grid-cols-12 gap-4 py-6 border-t border-separator items-start">
              <div className="md:col-span-2 font-display text-3xl font-bold" style={{ color: "hsl(var(--brand-green))" }}>{p.n}</div>
              <div className="md:col-span-4 font-display text-xl font-semibold">{p.title}</div>
              <div className="md:col-span-6 text-muted-foreground">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default About;
