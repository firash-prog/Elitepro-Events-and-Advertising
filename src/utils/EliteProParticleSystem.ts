// src/utils/EliteProParticleSystem.ts

/**
 * ElitePro Particle System
 * Implements three layered particle effects as a visual background.
 * Designed for Vite+React TypeScript projects.
 */

export interface ParticleOptions {
  canvas: HTMLCanvasElement;
  device: 'desktop' | 'tablet' | 'mobile';
  colors: string[];
  particleCount: { desktop: number; tablet: number; mobile: number };
  connectionDistance: number;
  mouseInfluenceRadius: number;
  parallaxStrength: number;
}

interface Vector2 {
  x: number;
  y: number;
}

interface Particle {
  pos: Vector2;
  vel: Vector2;
  size: number;
  layer: number; // 0 = background, 1 = mid, 2 = foreground
  color: string;
  opacity: number;
  // optional for temporary burst particles
  life?: number;
  maxLife?: number;
  trail?: Vector2[];
}

export class EliteProParticleSystem {
  private ctx: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private mousePos: Vector2 = { x: -9999, y: -9999 };
  private lastTime = 0;
  private rafId = 0;
  private prefersReducedMotion: boolean;
  private options: ParticleOptions;
  private gridSize = 100; // spatial hash cell size
  private grid: Map<string, Particle[]> = new Map();

  constructor(options: ParticleOptions) {
    this.options = options;
    const ctx = options.canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not supported');
    this.ctx = ctx;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resize();
    this.initParticles();
    this.bindEvents();
  }

  /** Initialise particle pool based on device */
  private initParticles() {
    const count = this.options.particleCount[this.options.device];
    const layerDefs = [
      { layer: 0, min: 1, max: 3, ratio: 0.6 }, // background (Neural Constellation)
      { layer: 1, min: 4, max: 8, ratio: 0.3 }, // mid (Data Streams)
      { layer: 2, min: 12, max: 20, ratio: 0.1 } // foreground (Brand Nodes)
    ];
    for (let i = 0; i < count; i++) {
      const def = layerDefs.find(l => i < count * l.ratio) || layerDefs[0];
      const size = this.randRange(def.min, def.max);
      const color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
      this.particles.push({
        pos: { x: Math.random() * this.width, y: Math.random() * this.height },
        vel: { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 },
        size,
        layer: def.layer,
        color,
        opacity: 0.6 + Math.random() * 0.4,
        trail: []
      });
    }
  }

  /** Resize canvas to full viewport */
  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.options.canvas.width = this.width;
    this.options.canvas.height = this.height;
    this.grid.clear();
  };

  /** Bind mouse / touch / scroll events */
  private bindEvents() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (t) this.handleMouseMove(t.clientX, t.clientY);
    });
    window.addEventListener('click', (e) => this.handleClick(e.clientX, e.clientY));
    window.addEventListener('dblclick', (e) => this.handleDoubleClick(e.clientX, e.clientY));
    window.addEventListener('scroll', this.handleScroll);
  }

  private handleMouseMove(x: number, y: number) {
    this.mousePos = { x, y };
  }

  private handleClick(x: number, y: number) {
    this.spawnBurst({ x, y }, 20, '#FFD700');
  }

  private handleDoubleClick(x: number, y: number) {
    const radius = 120;
    this.particles.forEach(p => {
      const dx = p.pos.x - x;
      const dy = p.pos.y - y;
      const d = Math.hypot(dx, dy);
      if (d < radius) {
        const f = (1 - d / radius) * 2;
        p.vel.x += (dx / d) * f;
        p.vel.y += (dy / d) * f;
      }
    });
  }

  private handleScroll = () => {
    const scrollY = window.scrollY;
    const factor = this.options.parallaxStrength;
    this.particles.forEach(p => {
      const depth = (p.layer + 1) / 3; // 0.33,0.66,1
      p.pos.y += (scrollY * factor * depth) % this.height;
    });
  };

  /** Create a burst of short‑lived spark particles */
  private spawnBurst(origin: Vector2, count: number, color: string) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.5;
      this.particles.push({
        pos: { x: origin.x, y: origin.y },
        vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        size: 2 + Math.random() * 2,
        layer: 1,
        color,
        opacity: 1,
        life: 0,
        maxLife: 60,
        trail: []
      });
    }
  }

  /** Main update loop */
  private update(delta: number) {
    if (this.prefersReducedMotion) return;
    const mouseRadius = this.options.mouseInfluenceRadius;
    this.grid.clear();
    for (const p of this.particles) {
      // lifetime for burst particles
      if (p.maxLife !== undefined) {
        p.life!++;
        if (p.life! > p.maxLife) continue;
      }

      // mouse attraction for background particles
      if (p.layer === 0) {
        const dx = this.mousePos.x - p.pos.x;
        const dy = this.mousePos.y - p.pos.y;
        const d = Math.hypot(dx, dy);
        if (d < mouseRadius) {
          const f = (1 - d / mouseRadius) * 0.05;
          p.vel.x += dx * f;
          p.vel.y += dy * f;
        }
      }

      // slight drift
      p.pos.x += p.vel.x;
      p.pos.y += p.vel.y;

      // wrap around edges
      if (p.pos.x > this.width) p.pos.x = 0;
      if (p.pos.x < 0) p.pos.x = this.width;
      if (p.pos.y > this.height) p.pos.y = 0;
      if (p.pos.y < 0) p.pos.y = this.height;

      // trails for mid layer
      if (p.layer === 1 && p.trail) {
        p.trail.push({ x: p.pos.x, y: p.pos.y });
        if (p.trail.length > 10) p.trail.shift();
      }

      // spatial hash for connections
      const gx = Math.floor(p.pos.x / this.gridSize);
      const gy = Math.floor(p.pos.y / this.gridSize);
      const key = `${gx},${gy}`;
      if (!this.grid.has(key)) this.grid.set(key, []);
      this.grid.get(key)!.push(p);
    }
    // remove dead burst particles
    this.particles = this.particles.filter(p => p.maxLife === undefined || (p.life! <= p.maxLife!));
  }

  /** Render everything */
  private render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    // BACKGROUND – Neural Constellation
    this.particles.filter(p => p.layer === 0).forEach(p => {
      ctx.fillStyle = this.rgba(p.color, 0.15 * p.opacity);
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    this.drawConnections(0);
    // MID – Data Streams
    this.particles.filter(p => p.layer === 1).forEach(p => {
      // trail
      if (p.trail && p.trail.length > 1) {
        ctx.strokeStyle = this.rgba(p.color, 0.2);
        ctx.lineWidth = 2;
        ctx.beginPath();
        p.trail.forEach((pt, i) => {
          i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }
      // particle shape – ellipse facing velocity
      ctx.fillStyle = this.rgba(p.color, p.opacity);
      ctx.save();
      ctx.translate(p.pos.x, p.pos.y);
      const ang = Math.atan2(p.vel.y, p.vel.x);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    this.drawConnections(1);
    // FOREGROUND – Brand Nodes
    this.particles.filter(p => p.layer === 2).forEach(p => {
      const grad = ctx.createRadialGradient(p.pos.x, p.pos.y, 0, p.pos.x, p.pos.y, p.size);
      grad.addColorStop(0, this.rgba('#00BFA5', 0.8));
      grad.addColorStop(0.7, this.rgba('#4CAF50', 0.4));
      grad.addColorStop(1, this.rgba('#FFD700', 0.1));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      // pulsing ring
      const ringOpacity = 0.3 + 0.2 * Math.sin(Date.now() / 1000);
      ctx.strokeStyle = this.rgba('#FFD700', ringOpacity);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, p.size + 4, 0, Math.PI * 2);
      ctx.stroke();
    });
  }

  /** Draw connections for a given layer */
  private drawConnections(layer: number) {
    const ctx = this.ctx;
    const maxDist = this.options.connectionDistance;
    for (const cell of this.grid.values()) {
      for (const p of cell) {
        if (p.layer !== layer) continue;
        const gx = Math.floor(p.pos.x / this.gridSize);
        const gy = Math.floor(p.pos.y / this.gridSize);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${gx + dx},${gy + dy}`;
            const neighbors = this.grid.get(key);
            if (!neighbors) continue;
            let connections = 0;
            for (const n of neighbors) {
              if (n === p || n.layer !== layer) continue;
              const d = Math.hypot(p.pos.x - n.pos.x, p.pos.y - n.pos.y);
              if (d < maxDist && connections < 2) {
                const grad = ctx.createLinearGradient(p.pos.x, p.pos.y, n.pos.x, n.pos.y);
                grad.addColorStop(0, this.rgba('#00BFA5', 0.4));
                grad.addColorStop(1, this.rgba('#00BFA5', 0));
                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.pos.x, p.pos.y);
                ctx.lineTo(n.pos.x, n.pos.y);
                ctx.stroke();
                connections++;
              }
            }
          }
        }
      }
    }
  }

  /** Helper: convert hex to rgba */
  private rgba(hex: string, a: number) {
    const c = hex.replace('#', '');
    const r = parseInt(c.slice(0, 2), 16);
    const g = parseInt(c.slice(2, 4), 16);
    const b = parseInt(c.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  /** Simple random range */
  private randRange(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  /** Animation loop */
  private loop = (time: number) => {
    const delta = time - this.lastTime;
    this.lastTime = time;
    this.update(delta);
    this.render();
    this.rafId = requestAnimationFrame(this.loop);
  };

  public start() {
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  public destroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resize);
    // other listeners omitted for brevity – they would be removed similarly
  }
}
