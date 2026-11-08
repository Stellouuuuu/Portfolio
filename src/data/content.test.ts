import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as content from './content';

const STEPS = ['The problem', 'The idea', 'The build', 'The challenge', 'The lesson'];

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

describe('project content', () => {
  it('tells every project in the same five steps, in order', () => {
    for (const project of content.projects) {
      expect(project.story.map((step) => step.label), project.title).toEqual(STEPS);
      expect(project.story.every((step) => step.text.length > 40), project.title).toBe(true);
    }
  });

  it('numbers the featured projects 01..n and lists the rest without a number', () => {
    const featured = content.projects.filter((p) => p.featured);
    expect(featured.map((p) => p.no)).toEqual(featured.map((_, index) => String(index + 1).padStart(2, '0')));
    expect(content.projects.filter((p) => !p.featured).every((p) => p.no === undefined)).toBe(true);
    expect(new Set(content.projects.map((p) => p.title)).size).toBe(content.projects.length);
  });

  it('shows two or three checkable facts on every project', () => {
    for (const project of content.projects) {
      expect(project.metrics.length, project.title).toBeGreaterThanOrEqual(2);
      expect(project.metrics.length, project.title).toBeLessThanOrEqual(3);
      for (const metric of project.metrics) {
        expect(metric.value.length).toBeGreaterThan(0);
        expect(metric.label.length).toBeGreaterThan(10);
      }
    }
  });

  it('keeps the strongest projects up front: only the ones with a link or a live app are featured', () => {
    for (const project of content.projects.filter((p) => p.featured)) {
      expect(project.links.length, project.title).toBeGreaterThan(0);
    }
  });

  it('only links to https addresses', () => {
    const links = [...content.projects.flatMap((p) => p.links.map((l) => l.url)), content.contact.github];
    expect(links.length).toBeGreaterThan(0);
    for (const url of links) expect(url.startsWith('https://')).toBe(true);
  });

  it('ships the screenshots it points to, with a description for each', () => {
    for (const project of content.projects) {
      if (!project.shot) continue;
      expect(existsSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../public', project.shot.src)), project.shot.src).toBe(true);
      expect(project.shot.alt.length).toBeGreaterThan(20);
    }
  });

  it('has valid contact details', () => {
    for (const address of [content.contact.email, content.contact.schoolEmail]) {
      expect(address).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    }
    expect(content.contact.linkedin.startsWith('https://www.linkedin.com/in/')).toBe(true);
  });

  it('has a petal density and a label for every section', () => {
    for (const id of content.sections) {
      expect(content.petalDensity[id]).toBeGreaterThan(0);
      expect(content.railLabels[id].length).toBeGreaterThan(0);
    }
  });

  it('keeps the text plain: no em dash and no emoji', () => {
    const text = allStrings([content.projects, content.mindItems, content.facts, content.futureColumns, content.path]);
    for (const line of text) {
      expect(line.includes('—'), line).toBe(false);
      expect(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(line), line).toBe(false);
    }
  });
});
