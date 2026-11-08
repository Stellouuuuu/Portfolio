import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { facts, futureColumns, mindItems, path, projects, railLabels, type Project, type SectionId } from './data/content';
import { factsFr, futureColumnsFr, mindItemsFr, pathFr, projectsFr } from './data/content.fr';

export type Lang = 'en' | 'fr';

const STORAGE_KEY = 'portfolio-lang';

export interface Strings {
  skip: string;
  home: string;
  switchTo: string;
  cv: string;
  cvLabel: string;
  menuOpen: string;
  menuClose: string;
  nav: Record<'about' | 'mind' | 'build' | 'beyond' | 'future' | 'connect', string>;
  rail: Record<SectionId, string>;
  hero: { eyebrow: string; tagA: string; tagB: string; tagEm: string; meta: [string, string, string]; discover: string; connect: string; treeLabel: string; treeCaption: string; scroll: string };
  about: { portraitAlt: string; portrait: string; head: string; h2a: string; h2em: string; h2z: string; lead: string; body1: string; body2: string };
  mind: { head: string; h2a: string; h2em: string; h2z: string; intro: string };
  build: { slideOverview: string; slideStory: string; slideCode: string; slidePictures: string; scrollHint: string; head: string; h2a: string; h2em: string; h2b: string; intro: string; more: string; readStory: string; closeStory: string };
  beyond: {
    head: string; h2a: string; h2em: string; intro: string;
    t1: [string, string, string]; quote: string; t3: [string, string, string];
    t4: [string, string, string[]]; t5: [string, string, string];
  };
  future: { head: string; quoteA: string; quoteEm: string };
  connect: { head: string; h2a: string; h2em: string; sub: string; copy: string; copied: string; student: string; resume: string; made: string; back: string };
  title: string;
}

const en: Strings = {
  skip: 'Skip to content',
  home: 'Stella Gbaguidi, back to the top',
  switchTo: 'Passer en français',
  cv: 'CV',
  cvLabel: 'Open my CV (PDF)',
  menuOpen: 'Open the menu',
  menuClose: 'Close the menu',
  nav: { about: 'About', mind: 'Mind', build: 'Work', beyond: 'Beyond', future: 'Future', connect: 'Contact' },
  rail: railLabels,
  hero: {
    eyebrow: 'Welcome to my world',
    tagA: 'I build things. I explore ideas.',
    tagB: 'I create ',
    tagEm: 'possibilities.',
    meta: ['Student at Epitech', 'Software Engineering', 'Artificial Intelligence'],
    discover: 'Discover my work',
    connect: 'Let’s connect',
    treeLabel: 'A blossoming tree swaying in the wind',
    treeCaption: 'move your cursor, feel the wind',
    scroll: 'Scroll · watch it grow',
  },
  about: {
    portraitAlt: 'Portrait of Stella Gbaguidi',
    portrait: 'Portrait',
    head: 'Who am I · The roots',
    h2a: 'A curious mind, ',
    h2em: 'rooted',
    h2z: ' in building.',
    lead: 'I’m Stella, a computer science student who believes code is one of the most elegant ways to turn an idea into something real.',
    body1: 'I’m drawn to software engineering for its rigor, and to artificial intelligence for its possibilities. But what truly moves me is the moment a problem becomes a product: understanding what people need, designing the right solution, and building it until it works, beautifully.',
    body2: 'Beyond the screen, I’m an entrepreneur at heart. I like to experiment, to start things, and to build with the ambition of creating something that lasts.',
  },
  mind: {
    head: 'My mind · The trunk',
    h2a: 'What ',
    h2em: 'feeds',
    h2z: ' my curiosity.',
    intro: 'My mind doesn’t live in a single discipline. These are the worlds I keep returning to, the ones that shape how I think, and what I choose to build.',
  },
  build: {
    head: 'What I build · The branches',
    h2a: 'Ideas, ',
    h2em: 'grown',
    h2b: ' into systems.',
    intro: 'Every project starts with a question. Here is what I set out to solve, how I built it, and what it taught me.',
    more: 'More work',
    slideOverview: 'Overview',
    slideStory: 'The story',
    slideCode: 'Under the hood',
    slidePictures: 'In pictures',
    scrollHint: 'Keep scrolling',
    readStory: 'Read the story ',
    closeStory: 'Close the story ',
  },
  beyond: {
    head: 'Beyond code · The leaves',
    h2a: 'More than ',
    h2em: 'a developer.',
    intro: 'The ideas, the initiatives and the taste that shape the way I build.',
    t1: ['01 · Entrepreneurship', 'Starting things.', 'Learning by building, testing ideas in the real world, and turning them into projects that create value.'],
    quote: 'I like things that are built well: code, ideas, and lives.',
    t3: ['02 · Creativity', 'The details.', 'Design, aesthetics, and the care nobody asks for.'],
    t4: ['03 · Currently', 'On my desk', ['Mnemo: vision, next', 'AegisAI: code analysis', 'A local model that resists injection']],
    t5: ['04 · Habit', 'Writing down what failed', 'Every project keeps a journal of what did not work and what I learned from it. The failures are the useful part.'],
  },
  future: { head: 'The future · The bloom', quoteA: 'I’m not just building a career. I’m building a ', quoteEm: 'vision.' },
  connect: {
    head: 'Let’s connect · The petals',
    h2a: 'Let’s build something ',
    h2em: 'beyond the ordinary.',
    sub: 'Open to internships, research opportunities, collaborations and university admissions.',
    copy: 'Copy',
    copied: 'Email copied',
    student: 'Student address: ',
    resume: 'Résumé',
    made: 'Designed & built by Stella · MMXXVI',
    back: 'Back to the seed ↑',
  },
  title: 'Stella Gbaguidi · Beyond the Ordinary',
};

const fr: Strings = {
  skip: 'Aller au contenu',
  home: 'Stella Gbaguidi, retour en haut de page',
  switchTo: 'Switch to English',
  cv: 'CV',
  cvLabel: 'Ouvrir mon CV (PDF)',
  menuOpen: 'Ouvrir le menu',
  menuClose: 'Fermer le menu',
  nav: { about: 'À propos', mind: 'Esprit', build: 'Projets', beyond: 'Au-delà', future: 'Avenir', connect: 'Contact' },
  rail: { hero: 'Graine', about: 'Racines', mind: 'Tronc', build: 'Branches', beyond: 'Feuilles', future: 'Floraison', connect: 'Pétales' },
  hero: {
    eyebrow: 'Bienvenue dans mon monde',
    tagA: 'Je construis des choses. J’explore des idées.',
    tagB: 'Je crée des ',
    tagEm: 'possibles.',
    meta: ['Études à Epitech', 'Génie logiciel', 'Intelligence artificielle'],
    discover: 'Découvrir mes projets',
    connect: 'Me contacter',
    treeLabel: 'Un arbre en fleurs agité par le vent',
    treeCaption: 'bougez le curseur, sentez le vent',
    scroll: 'Défilez · regardez-le pousser',
  },
  about: {
    portraitAlt: 'Portrait de Stella Gbaguidi',
    portrait: 'Portrait',
    head: 'Qui suis-je · Les racines',
    h2a: 'Un esprit curieux, ',
    h2em: 'enraciné',
    h2z: ' dans la construction.',
    lead: 'Je m’appelle Stella, je fais des études d’informatique et je crois que le code est l’une des plus belles façons de transformer une idée en réalité.',
    body1: 'Le génie logiciel m’attire par sa rigueur, et l’intelligence artificielle par ses possibilités. Mais ce qui me touche vraiment, c’est le moment où un problème devient un produit : comprendre ce dont les gens ont besoin, concevoir la bonne solution, et la construire jusqu’à ce qu’elle fonctionne, et qu’elle soit belle.',
    body2: 'Au-delà de l’écran, j’ai l’esprit entrepreneur. J’aime expérimenter, lancer des choses, et construire avec l’ambition de créer quelque chose qui dure.',
  },
  mind: {
    head: 'Mon esprit · Le tronc',
    h2a: 'Ce qui ',
    h2em: 'nourrit',
    h2z: ' ma curiosité.',
    intro: 'Mon esprit ne vit pas dans une seule discipline. Voici les mondes auxquels je reviens sans cesse, ceux qui façonnent ma manière de penser et ce que je choisis de construire.',
  },
  build: {
    head: 'Ce que je construis · Les branches',
    h2a: 'Des idées, ',
    h2em: 'devenues',
    h2b: ' des systèmes.',
    intro: 'Chaque projet commence par une question. Voici ce que je voulais résoudre, comment je l’ai construit, et ce qu’il m’a appris.',
    more: 'Autres projets',
    slideOverview: 'Aperçu',
    slideStory: 'L’histoire',
    slideCode: 'Sous le capot',
    slidePictures: 'En images',
    scrollHint: 'Continuez à défiler',
    readStory: 'Lire l’histoire ',
    closeStory: 'Fermer l’histoire ',
  },
  beyond: {
    head: 'Au-delà du code · Les feuilles',
    h2a: 'Plus que ',
    h2em: 'des lignes de code.',
    intro: 'Les idées, les initiatives et le goût qui façonnent ma manière de construire.',
    t1: ['01 · Entrepreneuriat', 'Lancer des choses.', 'Apprendre en construisant, tester des idées dans le monde réel, et en faire des projets qui créent de la valeur.'],
    quote: 'J’aime les choses bien faites : le code, les idées et les vies.',
    t3: ['02 · Créativité', 'Les détails.', 'Le design, l’esthétique, et le soin que personne ne demande.'],
    t4: ['03 · En ce moment', 'Sur mon bureau', ['Mnemo : la vision, ensuite', 'AegisAI : l’analyse de code', 'Un modèle local qui résiste à l’injection']],
    t5: ['04 · Habitude', 'Noter ce qui a échoué', 'Chaque projet garde un journal de ce qui n’a pas marché et de ce que j’en ai appris. Les échecs sont la partie utile.'],
  },
  future: { head: 'L’avenir · La floraison', quoteA: 'Je ne construis pas seulement une carrière. Je construis une ', quoteEm: 'vision.' },
  connect: {
    head: 'Me contacter · Les pétales',
    h2a: 'Construisons quelque chose ',
    h2em: 'hors du commun.',
    sub: 'Pour des stages, des opportunités de recherche, des collaborations et des admissions universitaires : écrivez-moi.',
    copy: 'Copier',
    copied: 'E-mail copié',
    student: 'Adresse étudiante : ',
    resume: 'CV',
    made: 'Conçu et réalisé par Stella · MMXXVI',
    back: 'Retour à la graine ↑',
  },
  title: 'Stella Gbaguidi · Hors du commun',
};

const dictionaries: Record<Lang, Strings> = { en, fr };

export interface Localized {
  projects: Project[];
  mindItems: typeof mindItems;
  facts: typeof facts;
  path: { state: 'done' | 'now' | 'next'; title: string; caption: string }[];
  futureColumns: typeof futureColumns;
}

export function localizeProject(project: Project, lang: Lang): Project {
  const text = lang === 'fr' ? projectsFr[project.title] : undefined;
  if (!text) {
    return project;
  }
  return {
    ...project,
    category: text.category,
    status: text.status,
    description: text.description,
    metrics: text.metrics,
    story: text.story,
    links: project.links.map((link, index) => ({ ...link, label: text.links[index] ?? link.label })),
    shot: project.shot && text.alt ? { ...project.shot, alt: text.alt } : project.shot,
    sample:
      project.sample && text.sample
        ? {
            ...project.sample,
            gallery: project.sample.gallery.map((figure, index) => ({ ...figure, ...text.sample!.gallery[index] })),
            code: project.sample.code && { ...project.sample.code, caption: text.sample.codeCaption ?? project.sample.code.caption },
            terminal: project.sample.terminal && {
              ...project.sample.terminal,
              caption: text.sample.terminalCaption ?? project.sample.terminal.caption,
            },
          }
        : project.sample,
  };
}

export function localize(lang: Lang): Localized {
  if (lang === 'en') {
    return { projects, mindItems, facts, path: [...path], futureColumns };
  }
  return {
    projects: projects.map((project) => localizeProject(project, lang)),
    mindItems: mindItemsFr,
    facts: factsFr,
    path: path.map((node, index) => ({ ...node, ...pathFr[index]! })),
    futureColumns: futureColumnsFr,
  };
}

interface LangValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
  content: Localized;
}

const LangContext = createContext<LangValue>({ lang: 'en', setLang: () => {}, t: en, content: localize('en') });

function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'fr' || stored === 'en' ? stored : null;
  } catch {
    return null;
  }
}

export function LangProvider({ children }: { children: ReactNode }) {
  // The pre-rendered page is English, so the first render must be English too; the stored or browser language applies right after.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const preferred = readStoredLang() ?? (navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en');
    setLangState(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the choice just is not remembered */
    }
  }, []);

  const value = useMemo<LangValue>(() => ({ lang, setLang, t: dictionaries[lang], content: localize(lang) }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangValue {
  return useContext(LangContext);
}
