import { Layout } from "@/components/Layout";
import { Mail, Phone, Instagram, Linkedin, MapPin, Globe } from "lucide-react";
import logo from "@/assets/elitepro/logo.png";

const Contact = () => {
  return (
    <Layout showEchelonFooter>
      <section className="container-wide py-16 md:py-24 min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            <div>
              <p className="text-label mb-4">Contact</p>
              <h1 className="text-display mb-6 animate-fade-in-up" style={{ color: "hsl(var(--brand-green))" }}>
                Let's build<br />your next event.
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Strategic proposals, RFPs, and venue briefs — our team responds across KSA and the UAE.
              </p>
            </div>

            <div className="space-y-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <a href="tel:+966537060245" className="flex items-center gap-4 text-lg hover:text-primary group transition-colors">
                <Phone size={20} className="text-primary" />
                <span>+966 53 706 0245 <span className="text-xs uppercase tracking-widest text-muted-foreground ml-2">Strategic Proposal Hotline</span></span>
              </a>
              <a href="mailto:firash@eliteproeventsksa.com" className="flex items-center gap-4 text-lg hover:text-primary group transition-colors">
                <Mail size={20} className="text-primary" />
                <span className="break-all">firash@eliteproeventsksa.com <span className="text-xs uppercase tracking-widest text-muted-foreground ml-2 block md:inline">RFP Intake</span></span>
              </a>
              <a href="https://www.eliteproeventsksa.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-primary group transition-colors">
                <Globe size={20} className="text-primary" />
                <span>www.eliteproeventsksa.com</span>
              </a>
              <a href="https://linkedin.com/company/digital-soul-ksa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                <Linkedin size={20} className="text-primary" />
                <span>linkedin.com/company/digital-soul-ksa</span>
              </a>
              <a href="https://instagram.com/eliteproevents.ksa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                <Instagram size={20} className="text-primary" />
                <span>@eliteproevents.ksa</span>
              </a>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-label mb-2">Head Office</p>
              <p className="text-lg flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-primary" />
                King Abdulaziz Road, Industrial Zone, Dammam,<br />Eastern Province, Kingdom of Saudi Arabia
              </p>
              <p className="text-sm text-muted-foreground mt-4 ml-8">
                Services delivered across Saudi Arabia &amp; the UAE — Riyadh · Jeddah · Dammam · Dubai
              </p>
            </div>
          </div>

          <div className="hidden lg:block sticky top-32">
            <div className="aspect-square rounded-3xl flex items-center justify-center p-16"
              style={{ background: "linear-gradient(135deg, hsl(var(--muted)), hsl(var(--card)))" }}>
              <img src={logo} alt="ElitePro" className="w-full h-full object-contain" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-6">
              {["Riyadh", "Jeddah", "Dammam", "Dubai"].map((c) => (
                <div key={c} className="text-center py-3 border border-border rounded-md text-sm font-medium">{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
