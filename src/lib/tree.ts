import { PINKS } from './palette';

const NS = 'http://www.w3.org/2000/svg';

interface Branch {
  g: SVGGElement;
  level: number;
  x: number;
  y: number;
  ang: number;
  phase: number;
  delay: number;
}

function svgEl<K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, name);
  for (const key in attrs) {
    node.setAttribute(key, String(attrs[key]));
  }
  return node;
}

/** A small deterministic random generator: the same tree grows every time. */
export function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export interface TreeOptions {
  /** Fewer generations on a small screen. */
  mobile: boolean;
  /** Skip the growing animation and the sway. */
  reduceMotion: boolean;
  seed?: number;
}

export interface Tree {
  branchCount: number;
  /** Position every branch for time `t` (seconds) and the current wind. */
  frame(t: number, gust: number): void;
}

/**
 * Draws a blossoming tree into `svg`. Branches are built recursively; each one grows in with a
 * delay by depth and then sways with the wind, more at the tips.
 */
export function createTree(svg: SVGSVGElement, { mobile, reduceMotion, seed = 11 }: TreeOptions): Tree {
  const R = seededRandom(seed);
  svg.replaceChildren();

  const defs = svgEl('defs');
  defs.innerHTML = `
      <g id="fl">${[0, 72, 144, 216, 288]
        .map((a) => `<ellipse cx="0" cy="-4.4" rx="3.3" ry="4.9" transform="rotate(${a})"/>`)
        .join('')}
        <circle r="1.5" fill="#C9A15F"/></g>
      <linearGradient id="bark" x1="0" x2="1"><stop offset="0" stop-color="#6A4C3D"/><stop offset=".55" stop-color="#3F2D24"/><stop offset="1" stop-color="#2C1F19"/></linearGradient>`;
  svg.appendChild(defs);

  svg.appendChild(svgEl('ellipse', { cx: 300, cy: 742, rx: 190, ry: 13, fill: 'rgba(59,42,34,.07)' }));
  const roots = svgEl('g', { stroke: '#4A3529', fill: 'none', 'stroke-linecap': 'round', opacity: 0.85 });
  const rootSpecs: [number, number, number, number][] = [
    [-1, 90, 14, 5], [1, 110, 10, 4], [-1, 50, 22, 3], [1, 60, 20, 3], [-1, 140, 6, 2], [1, 150, 8, 1.6],
  ];
  for (const [s, dx, dy, w] of rootSpecs) {
    roots.appendChild(svgEl('path', { d: `M300 736 q${s * dx * 0.4} ${-2} ${s * dx} ${dy * 0.5}`, 'stroke-width': w }));
  }
  svg.appendChild(roots);

  for (let i = 0; i < 14; i += 1) {
    svg.appendChild(
      svgEl('ellipse', {
        cx: 150 + R() * 300, cy: 736 + R() * 12, rx: 2.4, ry: 1.3, fill: PINKS[i % PINKS.length]!,
        transform: `rotate(${R() * 60 - 30} ${150 + R() * 300} 740)`, class: 'fl',
      }),
    );
  }

  const branches: Branch[] = [];
  const maxDepth = mobile ? 5 : 6;

  function blossoms(g: SVGGElement, x: number, y: number, n: number, spread: number): void {
    for (let i = 0; i < n; i += 1) {
      const use = svgEl('use', {
        href: '#fl', class: 'fl', fill: PINKS[(R() * PINKS.length) | 0]!,
        transform: `translate(${(x + (R() - 0.5) * spread).toFixed(1)},${(y + (R() - 0.5) * spread * 0.85).toFixed(1)}) rotate(${(R() * 72) | 0}) scale(${(0.55 + R() * 0.8).toFixed(2)})`,
      });
      use.style.transitionDelay = `${(1.6 + R() * 1.8).toFixed(2)}s`;
      g.appendChild(use);
    }
    for (let i = 0; i < 2; i += 1) {
      const bud = svgEl('circle', {
        cx: (x + (R() - 0.5) * spread * 1.1).toFixed(1), cy: (y + (R() - 0.5) * spread).toFixed(1),
        r: (1.3 + R() * 1.2).toFixed(1), fill: '#E2A0AE', class: 'fl',
      });
      bud.style.transitionDelay = `${(2 + R() * 1.5).toFixed(2)}s`;
      g.appendChild(bud);
    }
  }

  function grow(parent: SVGElement, len: number, w: number, depth: number, level: number): Branch {
    const g = svgEl('g');
    parent.appendChild(g);
    const bend = (R() - 0.5) * len * 0.28;
    const w2 = Math.max(w * 0.64, 1.1);
    g.appendChild(
      svgEl('path', {
        d: `M${-w / 2},2 Q${bend - (w + w2) / 4},${-len / 2} ${-w2 / 2},${-len} L${w2 / 2},${-len} Q${bend + (w + w2) / 4},${-len / 2} ${w / 2},2 Z`,
        fill: 'url(#bark)',
      }),
    );
    if (w > 4) {
      g.appendChild(
        svgEl('path', {
          d: `M${-w * 0.18},-3 Q${bend - w * 0.12},${-len / 2} ${-w2 * 0.18},${-len + 3}`,
          stroke: '#9A7A64', 'stroke-width': (w * 0.1).toFixed(2), fill: 'none', opacity: 0.45, 'stroke-linecap': 'round',
        }),
      );
    }
    const branch: Branch = { g, level, x: 0, y: 0, ang: 0, phase: R() * 6.283, delay: level * 0.32 + R() * 0.18 };
    branches.push(branch);

    if (depth === 0) {
      blossoms(g, 0, -len, 7 + ((R() * 4) | 0), 30);
      return branch;
    }
    if (level >= maxDepth - 2) {
      blossoms(g, bend * 0.3, -len * 0.55, 2 + ((R() * 3) | 0), 22);
    }

    const n = level < 1 ? 2 : R() < 0.32 ? 3 : 2;
    for (let i = 0; i < n; i += 1) {
      const t = i === n - 1 ? 1 : 0.5 + R() * 0.35;
      const spread = 17 + R() * 20 + level * 2.5;
      const side = n === 2 ? (i === 0 ? -1 : 1) : [-1, 0.2, 1][i]!;
      const child = grow(g, len * (0.7 + R() * 0.14), w2 * 0.94, depth - 1, level + 1);
      child.x = 2 * (1 - t) * t * bend * 0.5;
      child.y = -len * t;
      child.ang = side * spread + (R() - 0.5) * 8;
    }
    return branch;
  }

  const trunk = grow(svg, mobile ? 175 : 168, 30, maxDepth, 0);
  trunk.x = 300;
  trunk.y = 738;
  trunk.ang = -3;

  return {
    branchCount: branches.length,
    frame(t: number, gust: number): void {
      for (const b of branches) {
        const p = reduceMotion ? 1 : Math.min(1, Math.max(0, (t - b.delay) / 1.1));
        const e = 1 - Math.pow(1 - p, 3);
        const amp = reduceMotion ? 0 : 0.22 + b.level * 0.55;
        const sway = amp * (Math.sin(t * 1.35 + b.phase) * 0.42 + gust);
        b.g.setAttribute(
          'transform',
          `translate(${b.x.toFixed(2)},${b.y.toFixed(2)}) rotate(${(b.ang + sway).toFixed(2)}) scale(${e.toFixed(3)})`,
        );
      }
    },
  };
}
