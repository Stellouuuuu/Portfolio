import { PINKS } from './palette';
import type { Wind } from './wind';

interface Petal {
  x: number; y: number; vx: number; vy: number;
  r: number; vr: number; s: number; f: number; vf: number;
  c: string; o: number; w: number;
}

export interface Petals {
  resize(): void;
  /** Move and draw every petal for time `t` (seconds). */
  frame(t: number): void;
  /** Number of petals alive, for tests. */
  readonly count: number;
}

export interface PetalOptions {
  /** How many petals should be drifting right now. */
  target: () => number;
  /** Where the tree is: new petals fall from its crown while it is on screen. */
  treeRect: () => DOMRect | null;
  treeVisible: () => boolean;
  wind: Wind;
  mobile: boolean;
}

export function createPetals(canvas: HTMLCanvasElement, { target, treeRect, treeVisible, wind, mobile }: PetalOptions): Petals {
  const ctx = canvas.getContext('2d')!;
  let W = 0;
  let H = 0;
  const petals: Petal[] = [];

  function resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  function spawn(initial: boolean): void {
    let x: number;
    let y: number;
    const rect = treeRect();
    if (treeVisible() && rect && rect.bottom > 0 && Math.random() < 0.75 && !initial) {
      x = rect.left + rect.width * (0.18 + Math.random() * 0.64);
      y = rect.top + rect.height * (0.1 + Math.random() * 0.4);
    } else {
      x = Math.random() * W * 1.2 - W * 0.1;
      y = initial ? Math.random() * H : -20;
    }
    petals.push({
      x, y, vx: 0, vy: 0.3 + Math.random() * 0.55, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03,
      s: 4 + Math.random() * 5, f: Math.random() * 6.28, vf: 0.02 + Math.random() * 0.035,
      c: PINKS[(Math.random() * PINKS.length) | 0]!, o: 0, w: Math.random() * 6.28,
    });
  }

  for (let i = 0; i < 8; i += 1) {
    spawn(true);
  }

  return {
    resize,
    get count() {
      return petals.length;
    },
    frame(t: number): void {
      ctx.clearRect(0, 0, W, H);
      const tgt = mobile ? target() * 0.55 : target();
      if (petals.length < tgt && Math.random() < 0.09) {
        spawn(false);
      }
      for (let i = petals.length - 1; i >= 0; i -= 1) {
        const p = petals[i]!;
        p.vx += (wind.gust * 0.55 - p.vx) * 0.02;
        const dx = p.x - wind.x;
        const dy = p.y - wind.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const d = Math.sqrt(d2) || 1;
          p.x += (dx / d) * 1.6;
          p.y += (dy / d) * 1.1;
          p.vr += 0.004;
        }
        p.x += p.vx + Math.sin(t * 1.2 + p.w) * 0.35;
        p.y += p.vy;
        p.f += p.vf;
        p.r += p.vr;
        p.vr *= 0.995;
        p.o = Math.min(0.92, p.o + 0.02);
        if (p.y > H + 30 || p.x < -60 || p.x > W + 60) {
          petals.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.scale(Math.cos(p.f) * 0.8 + 0.2 * Math.sign(Math.cos(p.f) || 1), 1);
        ctx.globalAlpha = p.o;
        ctx.fillStyle = p.c;
        const s = p.s;
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.bezierCurveTo(s * 0.95, s * 0.4, s * 0.8, -s * 0.75, s * 0.18, -s);
        ctx.lineTo(0, -s * 0.72);
        ctx.lineTo(-s * 0.18, -s);
        ctx.bezierCurveTo(-s * 0.8, -s * 0.75, -s * 0.95, s * 0.4, 0, s);
        ctx.fill();
        ctx.restore();
      }
    },
  };
}
