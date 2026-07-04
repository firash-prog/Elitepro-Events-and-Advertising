import { createRoot } from "react-dom/client";
import { EliteProParticleSystem } from "./utils/EliteProParticleSystem";

// create canvas element for particle background
const canvas = document.createElement('canvas');
canvas.id = 'elitepro-particles';
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
// prepend to body so it sits behind content (content will have higher z-index)
document.body.prepend(canvas);

// simple device detection for particle counts
const getDevice = (): 'desktop' | 'tablet' | 'mobile' => {
  const w = window.innerWidth;
  if (w >= 1024) return 'desktop';
  if (w >= 600) return 'tablet';
  return 'mobile';
};

const particleSystem = new EliteProParticleSystem({
  canvas,
  device: getDevice(),
  colors: ['#00BFA5', '#FFD700', '#4CAF50'],
  particleCount: { desktop: 600, tablet: 360, mobile: 180 },
  connectionDistance: 80,
  mouseInfluenceRadius: 150,
  parallaxStrength: 0.5
});
particleSystem.start();
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
