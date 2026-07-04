// src/utils/AmbientParticles.ts
/**
 * AmbientParticles – lightweight single‑layer dust effect.
 * Particles drift slowly in negative space of their parent section.
 * No connections, no trails, no heavy physics – optimized for 60fps.
 */
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  phase: number;
}

export class AmbientParticles {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private section: HTMLElement;
  private contentElements: HTMLElement[] = [];
  private mouse = { x: -1000, y: -1000 };
  private isVisible = false;
  private animationId: number | null = null;
  private prefersReduced: boolean;
  private lowPower: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D not supported');
    this.ctx = ctx;
    this.section = canvas.closest('section') as HTMLElement;
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.checkLowPower();
    this.init();
  }

  private async checkLowPower() {
    // Battery API may be unavailable – fail silently.
    try {
      const battery = await (navigator as any).getBattery?.();
      if (battery && !battery.charging && battery.level < 0.2) {
        this.lowPower = true;
      }
    } catch {}
  }

  private init() {
    this.resize();
    this.collectContentElements();
    this.spawnParticles();
    this.bindEvents();
    this.observeVisibility();
  }

  private resize() {
    const rect = this.section.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  private collectContentElements() {
    const selectors =
      'h1, h2, h3, h4, p, img, .card, button, a, .btn, input, textarea, .team-photo, .service-card, .event-card, .stat-number, .award-item, .process-step';
    this.contentElements = Array.from(this.section.querySelectorAll<HTMLElement>(selectors));
  }

  private getParticleCount(): number {
    const w = window.innerWidth;
    if (this.lowPower) return 10;
    if (w < 768) return 20;
    if (w < 1024) return 35;
    return 60;
  }

  private randomColor(): string {
    // 10% gold, rest teal
    return Math.random() < 0.1 ? 'rgba(255,215,0,0.2)' : 'rgba(0,191,165,0.25)';
  }

  private spawnParticles() {
    const count = this.getParticleCount();
    const attempts = 30;
    for (let i = 0; i < count; i++) {
      let pos = null;
      for (let a = 0; a < attempts; a++) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        if (this.isSafePosition(x, y)) {
          pos = { x, y };
          break;
        }
      }
      if (!pos) pos = { x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };
      this.particles.push({
        x: pos.x,
        y: pos.y,
        originX: pos.x,
        originY: pos.y,
        size: 1 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.08,
        opacity: 0.15 + Math.random() * 0.15,
        color: this.randomColor(),
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private isSafePosition(x: number, y: number): boolean {
    const buffer = 60;
    for (const el of this.contentElements) {
      const r = el.getBoundingClientRect();
      const secRect = this.canvas.getBoundingClientRect();
      const rel = {
        left: r.left - secRect.left,
        right: r.right - secRect.left,
        top: r.top - secRect.top,
        bottom: r.bottom - secRect.top,
      };
      if (
        x > rel.left - buffer &&
        x < rel.right + buffer &&
        y > rel.top - buffer &&
        y < rel.bottom + buffer
      ) {
        return false;
      }
    }
    return true;
  }

  private bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.collectContentElements();
    });
    if (!this.prefersReduced && window.innerWidth >= 1024) {
      this.section.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });
      this.section.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
    }
  }

  private observeVisibility() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.startLoop();
        } else {
          this.isVisible = false;
          if (this.animationId) cancelAnimationFrame(this.animationId);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(this.section);
  }

  private startLoop() {
    const loop = (time: number) => {
      if (!this.isVisible) return;
      this.update();
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  private update() {
    if (this.prefersReduced) return;
    this.particles.forEach((p) => {
      // sine drift
      p.phase += 0.003;
      p.x += Math.sin(p.phase) * 0.08 + p.speedX;
      p.y += Math.cos(p.phase * 0.7) * 0.05 + p.speedY;

      // mouse push
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 200 && dist > 0) {
        const force = (200 - dist) / 200;
        p.x += (dx / dist) * force * 0.5;
        p.y += (dy / dist) * force * 0.5;
      }

      // return to origin slowly
      p.x += (p.originX - p.x) * 0.008;
      p.y += (p.originY - p.y) * 0.008;

      // wrap
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
    });
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((p) => {
      // fade near content
      const near = !this.isSafePosition(p.x, p.y);
      const opacity = near ? 0 : p.opacity;
      if (opacity <= 0) return;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color.replace('0.', opacity.toString());
      this.ctx.fill();
    });
  }
}
