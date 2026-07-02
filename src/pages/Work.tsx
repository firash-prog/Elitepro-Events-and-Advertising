import { Layout } from "@/components/Layout";
import { ProjectListItem } from "@/components/ProjectListItem";
import { projects } from "@/data/projects";

const serviceMatrix: { category: string; items: string[] }[] = [
  {
    category: "A · Strategic Events & Brand Activations",
    items: ["Corporate Event Management", "Exhibitions", "Product Launches", "Brand Activations", "Mall Activations"],
  },
  {
    category: "B · Stand Construction, 3D Design & Spatial Branding",
    items: ["Exhibition Booths", "Designing (2D/3D)", "Signages", "Name Boards"],
  },
  {
    category: "C · Event Rentals & Technical Infrastructure",
    items: ["Event Technology Rental", "Furniture Rental", "Audio Visual Rental"],
  },
  {
    category: "D · Commercial Production & Branded Collateral",
    items: ["Advertising (OOH & B2B)", "Large-Format Printing", "ID Cards & Lanyards", "Trophies & Souvenirs"],
  },
  {
    category: "E · On-Site Logistics & Technical Operations",
    items: ["Event Registration", "Crowd Management", "Logistics & Freight", "Venue Booking & Permits"],
  },
  {
    category: "F · Event Staffing & On-Site Support",
    items: ["Bilingual Ushers", "Food & Catering", "Labor Supply", "Janitorial Services"],
  },
];

const Work = () => {
  return (
    <Layout showEchelonFooter>
      <section className="container-wide pt-16 md:pt-24 pb-12">
        <p className="text-label mb-4">26 Services · 6 Categories</p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight" style={{ color: "hsl(var(--brand-green))" }}>
          Services &amp; Projects
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From strategy to structural breakdown, we deliver every layer of a live event under one roof.
        </p>
      </section>

      {/* Services matrix */}
      <section className="container-wide pb-20 border-t border-separator pt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceMatrix.map((cat) => (
            <div key={cat.category} className="p-6 bg-card rounded-xl">
              <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "hsl(var(--brand-green))" }}>
                {cat.category}
              </p>
              <ul className="space-y-2">
                {cat.items.map((i) => (
                  <li key={i} className="text-sm text-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">▸</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Project list */}
      <section className="border-t border-separator">
        <div className="container-wide pt-12 pb-6">
          <p className="text-label">Recent Productions</p>
        </div>
        {projects.map((project, index) => (
          <ProjectListItem
            key={project.id}
            id={project.id}
            title={project.title}
            tags={project.tags}
            year={project.year}
            image={project.coverImage}
            index={index}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Work;
