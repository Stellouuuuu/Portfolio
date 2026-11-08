import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { projects } from '../data/content';
import { Build } from './Build';

let root: Root | null = null;
let host: HTMLElement | null = null;

beforeAll(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  class Observer {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as { IntersectionObserver: unknown }).IntersectionObserver = Observer;
});

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
});

function mount() {
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
  act(() => root!.render(<Build />));
  return host;
}

describe('Build section', () => {
  it('lists every project with its status and story', () => {
    const el = mount();
    const featured = projects.filter((p) => p.featured);
    expect(el.querySelectorAll('.sc-panel')).toHaveLength(featured.length * 3 + featured.filter((p) => (p.sample?.gallery.length ?? 0) > 2).length);
    expect(el.querySelectorAll('article.more-row')).toHaveLength(projects.filter((p) => !p.featured).length);
    expect(el.querySelectorAll('.metrics dt')).toHaveLength(projects.reduce((sum, p) => sum + p.metrics.length, 0));
    expect(el.querySelectorAll('.sc-steps li')).toHaveLength(featured.length * 5);
    expect(el.querySelectorAll('.steps li')).toHaveLength((projects.length - featured.length) * 5);
    expect(el.querySelectorAll('.sc-card.code')).toHaveLength(featured.length);
    expect(el.querySelectorAll('.sc-card.term')).toHaveLength(featured.length);
    expect(el.textContent).toContain('In bloom · in development');
    expect(el.textContent).toContain('35 / 35');
  });

  it('opens and closes a story, and says so to assistive technology', () => {
    const el = mount();
    const button = el.querySelector<HTMLButtonElement>('.story-btn')!;
    const card = button.closest('.more-row')!;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    act(() => button.click());
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(card.classList.contains('open')).toBe(true);
    expect(button.textContent).toContain('Close the story');
    act(() => button.click());
    expect(card.classList.contains('open')).toBe(false);
    expect(button.textContent).toContain('Read the story');
    expect(document.getElementById(button.getAttribute('aria-controls')!)).not.toBeNull();
  });

  it('opens outside links safely and only shows links a project has', () => {
    const el = mount();
    const links = [...el.querySelectorAll<HTMLAnchorElement>('.links a')];
    expect(links.length).toBe(projects.flatMap((p) => p.links).length);
    for (const link of links) {
      expect(link.rel).toContain('noopener');
      expect(link.target).toBe('_blank');
    }
  });
});
