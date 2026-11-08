import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { futureColumns, mindItems, path, projects } from './data/content';
import { factsFr, futureColumnsFr, mindItemsFr, pathFr, projectsFr } from './data/content.fr';
import { facts } from './data/content';
import { localize } from './i18n';

describe('French content', () => {
  for (const project of projects) {
    it(`${project.title} is fully translated`, () => {
      const fr = projectsFr[project.title];
      expect(fr).toBeDefined();
      expect(fr!.metrics).toHaveLength(project.metrics.length);
      expect(fr!.story).toHaveLength(project.story.length);
      expect(fr!.links.length).toBe(project.links.length);
      if (project.shot) {
        expect(fr!.alt).toBeTruthy();
      }
    });
  }

  it('has no entry for a project that does not exist', () => {
    expect(Object.keys(projectsFr).sort()).toEqual(projects.map((project) => project.title).sort());
  });

  it('translates every list with the same length', () => {
    expect(mindItemsFr).toHaveLength(mindItems.length);
    expect(factsFr).toHaveLength(facts.length);
    expect(pathFr).toHaveLength(path.length);
    expect(futureColumnsFr).toHaveLength(futureColumns.length);
  });

  it('keeps the links and numbers of the English version', () => {
    const fr = localize('fr').projects;
    fr.forEach((project, index) => {
      expect(project.links.map((link) => link.url)).toEqual(projects[index]!.links.map((link) => link.url));
      expect(project.no).toBe(projects[index]!.no);
    });
  });

  it('uses no em dash and no emoji', () => {
    const text = JSON.stringify([projectsFr, mindItemsFr, factsFr, pathFr, futureColumnsFr]);
    expect(text).not.toContain('—');
    expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
  });
});

describe('Showcase samples', () => {
  it('has a sample for every featured project, translated', () => {
    for (const project of projects.filter((p) => p.featured)) {
      expect(project.sample).toBeDefined();
      expect(project.sample!.gallery.length).toBeGreaterThan(0);
      const fr = projectsFr[project.title]!.sample;
      expect(fr?.gallery).toHaveLength(project.sample!.gallery.length);
    }
  });
});

describe('Showcase pictures', () => {
  const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public');
  it('only points at files that exist', () => {
    for (const project of projects) {
      for (const figure of project.sample?.gallery ?? []) {
        expect(existsSync(resolve(publicDir, figure.src)), figure.src).toBe(true);
      }
    }
  });
});
