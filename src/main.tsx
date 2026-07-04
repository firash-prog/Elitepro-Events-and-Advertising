import { createRoot } from "react-dom/client";
import { AmbientParticles } from "./utils/AmbientParticles";
import App from "./App.tsx";
import "./index.css";

// Initialize ambient particle backgrounds for each section after DOM loads
function initAmbientParticles() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    const computed = window.getComputedStyle(section);
    if (computed.position === 'static') {
      (section as HTMLElement).style.position = 'relative';
    }
    section.appendChild(canvas);
    // eslint-disable-next-line no-new
    new AmbientParticles(canvas);
  });
}

document.addEventListener('DOMContentLoaded', initAmbientParticles);

createRoot(document.getElementById("root")!).render(<App />);
