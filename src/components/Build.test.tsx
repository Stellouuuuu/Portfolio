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
    expect(el.querySelectorAll('article.proj')).toHaveLength(projects.length);
    expect(el.querySelectorAll('.steps li')).toHaveLength(projects.length * 5);
    expect(el.textContent).toContain('In bloom · in development');
  });

  it('opens and closes a story, and says so to assistive technology', () => {
    const el = mount();
    const button = el.querySelector<HTMLButtonElement>('.story-btn')!;
    const card = button.closest('.proj')!;
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
