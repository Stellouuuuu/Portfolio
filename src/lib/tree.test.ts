import { describe, expect, it } from 'vitest';
import { createTree, seededRandom } from './tree';
import { createWind } from './wind';

/** The trunk is the last group directly under the svg (the roots group comes before it). */
function trunkOf(el: SVGSVGElement): Element {
  return [...el.children].filter((child) => child.tagName === 'g').at(-1)!;
}

function svg(): SVGSVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
}

describe('seededRandom', () => {
  it('repeats the same sequence for the same seed, and stays in [0, 1)', () => {
    const a = seededRandom(11);
    const b = seededRandom(11);
    for (let i = 0; i < 50; i += 1) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});

describe('createTree', () => {
  it('grows the same tree every time', () => {
    const one = createTree(svg(), { mobile: false, reduceMotion: false });
    const two = createTree(svg(), { mobile: false, reduceMotion: false });
    expect(one.branchCount).toBe(two.branchCount);
    expect(one.branchCount).toBeGreaterThan(50);
  });

  it('grows fewer branches on a small screen', () => {
    const big = createTree(svg(), { mobile: false, reduceMotion: false });
    const small = createTree(svg(), { mobile: true, reduceMotion: false });
    expect(small.branchCount).toBeLessThan(big.branchCount);
  });

  it('adds blossoms that wait for the bloom class', () => {
    const el = svg();
    createTree(el, { mobile: false, reduceMotion: false });
    expect(el.querySelectorAll('use.fl').length).toBeGreaterThan(100);
  });

  it('starts every branch at scale 0 and ends fully grown', () => {
    const el = svg();
    const tree = createTree(el, { mobile: false, reduceMotion: false });
    tree.frame(0, 0);
    const trunk = trunkOf(el);
    expect(trunk.getAttribute('transform')).toContain('scale(0.000)');
    tree.frame(10, 0);
    expect(trunk.getAttribute('transform')).toContain('scale(1.000)');
  });

  it('does not sway when motion is reduced', () => {
    const el = svg();
    const tree = createTree(el, { mobile: false, reduceMotion: true });
    tree.frame(10, 0);
    const calm = trunkOf(el).getAttribute('transform');
    tree.frame(10, 2.5);
    expect(trunkOf(el).getAttribute('transform')).toBe(calm);
  });

  it('sways with the wind when motion is allowed', () => {
    const el = svg();
    const tree = createTree(el, { mobile: false, reduceMotion: false });
    tree.frame(10, 0);
    const still = trunkOf(el).getAttribute('transform');
    tree.frame(10, 2.5);
    expect(trunkOf(el).getAttribute('transform')).not.toBe(still);
  });
});

describe('createWind', () => {
  it('follows a slow gust and is pushed by the cursor', () => {
    const wind = createWind();
    wind.step(0);
    const calm = wind.state.gust;
    window.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 100, clientY: 20 }));
    window.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 400, clientY: 20 }));
    wind.step(0);
    expect(wind.state.gust).toBeGreaterThan(calm);
    expect(wind.state.x).toBe(400);
    for (let i = 0; i < 300; i += 1) wind.step(0);
    expect(Math.abs(wind.state.gust - calm)).toBeLessThan(0.01);
    wind.destroy();
  });
});
