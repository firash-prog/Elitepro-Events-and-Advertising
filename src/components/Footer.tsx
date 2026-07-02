import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/elitepro/logo.png.asset.json";

interface FooterProps {
  variant?: "default" | "echelon";
}

export function Footer({ variant = "default" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === "echelon") {
    return (
      <footer className="border-t border-separator mt-auto bg-secondary/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-3">
              <p className="text-label">Headquarters</p>
              <div className="text-sm text-foreground space-y-1">
                <p>King Abdulaziz Road</p>
                <p>Industrial Zone, Dammam</p>
                <p>Eastern Province, KSA</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-label">Navigate</p>
              <div className="text-sm space-y-1">
                <Link to="/work" className="block text-foreground hover:text-primary transition-colors">Services</Link>
                <Link to="/about" className="block text-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/contact" className="block text-foreground hover:text-primary transition-colors">Contact</Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-label">Contact</p>
              <div className="text-sm text-foreground space-y-1">
                <a href="mailto:firash@eliteproeventsksa.com" className="block hover:text-primary transition-colors break-all">
                  firash@eliteproeventsksa.com
                </a>
                <a href="tel:+966537060245" className="block hover:text-primary transition-colors">+966 53 706 0245</a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-label">Social</p>
              <div className="text-sm space-y-1">
                <a href="https://linkedin.com/company/digital-soul-ksa" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">LinkedIn</a>
                <a href="https://instagram.com/eliteproevents.ksa" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">Instagram</a>
                <a href="https://www.eliteproeventsksa.com" target="_blank" rel="noopener noreferrer" className="block hover:text-primary transition-colors">eliteproeventsksa.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-separator overflow-hidden py-6 md:py-8">
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold mx-12"
                style={{ color: "hsl(var(--brand-green))" }}
              >
                ELITEPRO • EVENTS &amp; ADVERTISING •
              </span>
            ))}
          </div>
        </div>
        <div className="container-wide py-4 text-xs text-muted-foreground text-center">
          © {currentYear} ElitePro Events &amp; Advertising — A Digital Soul KSA company. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-separator bg-secondary/40">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="ElitePro" className="h-12 w-auto" />
              <div>
                <p className="font-display text-lg font-bold">ELITEPRO</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Events &amp; Advertising</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premier live-production, fabrication and event execution across the GCC. Powered by Digital Soul KSA.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3"><MapPin size={16} className="mt-1 text-primary" /><span>King Abdulaziz Road, Industrial Zone, Dammam, KSA</span></div>
            <div className="flex items-center gap-3"><Phone size={16} className="text-primary" /><a href="tel:+966537060245" className="hover:text-primary">+966 53 706 0245</a></div>
            <div className="flex items-center gap-3"><Mail size={16} className="text-primary" /><a href="mailto:firash@eliteproeventsksa.com" className="hover:text-primary break-all">firash@eliteproeventsksa.com</a></div>
          </div>

          <div className="flex md:justify-end items-start gap-4">
            <a href="https://linkedin.com/company/digital-soul-ksa" target="_blank" rel="noopener noreferrer" className="p-2 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"><Linkedin size={18} /></a>
            <a href="https://instagram.com/eliteproevents.ksa" target="_blank" rel="noopener noreferrer" className="p-2 border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-separator text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <p>© {currentYear} ElitePro Events &amp; Advertising. All rights reserved.</p>
          <p>Serving Saudi Arabia &amp; the UAE — Riyadh • Jeddah • Dammam • Dubai</p>
        </div>
      </div>
    </footer>
  );
}
