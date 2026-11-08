export interface ProjectStory {
  label: string;
  text: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  /** Number shown on a featured project. Other projects are listed without one. */
  no?: string;
  featured: boolean;
  /** Two or three facts that can be checked in the project itself. */
  metrics: Metric[];
  title: string;
  category: string;
  status: string;
  /** A project in bloom gets the rose status pill. */
  bloom: boolean;
  description: string;
  stack: string;
  letter: string;
  gradient: string;
  shot?: { src: string; alt: string };
  story: ProjectStory[];
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    no: '01',
    featured: true,
    metrics: [{ value: '35 / 35', label: 'injected deletion requests held for approval by the server' }, { value: '3', label: 'local models compared on the same code' }],
    title: 'Mnemo',
    category: 'Artificial Intelligence · Local assistant',
    status: 'In bloom · in development',
    bloom: true,
    description:
      'A private assistant that runs on my own machine: it remembers what I choose to share, answers from my documents, and can use tools without being trusted to.',
    stack: 'React · TypeScript · Node · PostgreSQL + pgvector · Ollama',
    letter: 'M',
    gradient: 'linear-gradient(160deg,#F6E3E4,#E9C6CB)',
    shot: {
      src: 'assets/img/mnemo-chat.png',
      alt: 'Mnemo answering a question about an uploaded course and citing the passage it used',
    },
    story: [
      { label: 'The problem', text: 'Most assistants send everything to someone else’s servers. I wanted one that stays local, remembers me, and reads my own documents.' },
      { label: 'The idea', text: 'A local model with a memory I can read and edit, answers that cite the document and page they came from, and tools whose permissions are decided by the server, never by the model.' },
      { label: 'The build', text: 'React front end with streaming replies, a Node API, PostgreSQL with pgvector for hybrid search, local OCR for scanned PDFs, and an agent that chains tools within a step budget.' },
      { label: 'The challenge', text: 'My first embedding model could not tell a relevant question from an unrelated one in French, so I measured two models on 26 questions and replaced it. Then I audited the whole app with my own scanner: 35 injected requests to delete a memory, all stopped by the server.' },
      { label: 'The lesson', text: 'Put the guarantees in code, not in the prompt. The model I choose changes the audit score, from 69 to 30 out of 100 on the latest comparison, but not what the server allows.' },
    ],
    links: [{ label: 'Source on GitHub', url: 'https://github.com/Stellouuuuu/mnemo' }],
  },
  {
    no: '02',
    featured: true,
    metrics: [{ value: '25', label: 'attack scenarios, replayed before anything is reported' }, { value: '245', label: 'automated tests' }],
    title: 'AegisAI',
    category: 'Security · AI applications',
    status: 'In bloom · open source',
    bloom: true,
    description: 'A scanner that attacks chatbots, agents and RAG apps through their API, and only reports a flaw it can prove.',
    stack: 'Python · FastAPI · React · SQLite · OWASP LLM Top 10',
    letter: 'Æ',
    gradient: 'linear-gradient(160deg,#E5EAE0,#C9D2C1)',
    shot: {
      src: 'assets/img/aegisai-scan.png',
      alt: 'The AegisAI dashboard listing fourteen proven findings against a deliberately vulnerable chatbot',
    },
    story: [
      { label: 'The problem', text: 'AI applications go live after a few good demos. Nobody checks, in a repeatable way, whether one can be talked into leaking a secret or running a destructive action.' },
      { label: 'The idea', text: 'A black-box scanner: send attacks through the API, look for objective evidence, replay each one, and report only what holds up, mapped to the OWASP LLM Top 10.' },
      { label: 'The build', text: 'A Python engine with 25 scenarios, detectors, a risk score and a connector for any HTTP or OpenAI-compatible API, plus a CLI, a REST API, a React dashboard, PDF and SARIF reports, and a static review of source code.' },
      { label: 'The challenge', text: 'Models are not deterministic. I measured everything on a real local model, and a control run showed that my “adaptive attacks” gained little over simply trying again. I rewrote what I had claimed.' },
      { label: 'The lesson', text: 'Measure before saying it works, keep a control, and write the limits next to the numbers.' },
    ],
    links: [{ label: 'Source on GitHub', url: 'https://github.com/Stellouuuuu/aegisai' }],
  },
  {
    featured: false,
    metrics: [{ value: '0 to 100', label: 'delay-risk score with its explaining factors' }, { value: '3', label: 'approaches compared: rules, logistic regression, boosting' }],
    title: 'BatiPredict',
    category: 'Machine Learning · Construction',
    status: 'Prototype · simulated data',
    bloom: false,
    description: 'A tool that estimates the risk of delay on a building site, explains why, and suggests what to do about it.',
    stack: 'React · Express · MySQL · FastAPI · scikit-learn',
    letter: 'B',
    gradient: 'linear-gradient(160deg,#F1E8DC,#DFCCB3)',
    story: [
      { label: 'The problem', text: 'Small construction companies often discover a delay once it is too late to fix it cheaply.' },
      { label: 'The idea', text: 'Turn the follow-up they already do (progress, crew, weather, supplier delays) into a 0 to 100 risk score, with the factors that drive it and a recommendation.' },
      { label: 'The build', text: 'A dashboard per site, a prediction service in Python, daily weather updates and email alerts, separate accounts per company, and automatic fallback to business rules if the model is unavailable.' },
      { label: 'The challenge', text: 'There was no real data. The model is trained on simulated sites, so its metrics show that it recovers my assumptions, not that it works on real sites. I wrote that limit in the project itself.' },
      { label: 'The lesson', text: 'A prediction is only as honest as its data. The architecture is ready for retraining on real sites, and that is the next step.' },
    ],
    links: [],
  },
  {
    featured: false,
    metrics: [{ value: '10', label: 'functional modules in the MVP' }, { value: 'Docker + CI', label: 'local setup and GitHub Actions' }],
    title: 'AgriERP',
    category: 'Enterprise software · Agriculture',
    status: 'MVP built',
    bloom: false,
    description: 'An ERP for farms and cooperatives: plots, harvests, stock, staff, finances and a dashboard, per company.',
    stack: 'React · TypeScript · Express · PostgreSQL · Prisma · Docker',
    letter: 'A',
    gradient: 'linear-gradient(160deg,#F4ECE6,#E6D3CC)',
    story: [
      { label: 'The problem', text: 'Farms often run on paper and spreadsheets, with production, stock and money tracked in different places.' },
      { label: 'The idea', text: 'One platform where each company manages its plots, crops, harvests, stock, employees and finances.' },
      { label: 'The build', text: 'A multi-company application with authentication and roles, around ten functional modules, a KPI dashboard, Docker Compose for local setup and CI on GitHub Actions.' },
      { label: 'The challenge', text: 'Keeping each company’s data separate, and keeping the app useful when an optional service such as the cache is missing.' },
      { label: 'The lesson', text: 'Ship the core modules first. Maps, weather and yield forecasting stayed on the second version’s list on purpose.' },
    ],
    links: [],
  },
  {
    no: '03',
    featured: true,
    metrics: [{ value: 'Offline', label: 'sales recorded without a connection, synced later' }, { value: 'Live', label: 'web version deployed and installable on a phone' }],
    title: 'Gestion de boutique',
    category: 'Mobile & web app · Retail',
    status: 'Live',
    bloom: true,
    description: 'A shop management app to follow stock and sales, record sales offline, and prepare stock counts.',
    stack: 'Expo · React Native · Supabase · SQLite',
    letter: 'G',
    gradient: 'linear-gradient(160deg,#F6E3E4,#EBD3C9)',
    story: [
      { label: 'The problem', text: 'A shop needs to know what it has and what it sold, even when the connection drops.' },
      { label: 'The idea', text: 'An app that records sales offline, synchronises when it can, and produces balances and inventories.' },
      { label: 'The build', text: 'Expo and React Native with a local database, Supabase for sync, and a free web version that can be added to an iPhone home screen.' },
      { label: 'The challenge', text: 'Getting the web version to run in production: a local database in the browser needs specific security headers, and the hosting refused folders named node_modules, so the build renames them.' },
      { label: 'The lesson', text: 'Most of the work in a real app is the unglamorous part: offline, sync and deployment.' },
    ],
    links: [{ label: 'Open the app', url: 'https://gestion-boutique.pages.dev/' }],
  },
];

export const mindItems = [
  { title: 'Software Engineering', text: 'Designing systems that are clear, robust and built to last.' },
  { title: 'Artificial Intelligence', text: 'Teaching machines to learn, and asking what they should learn for.' },
  { title: 'Entrepreneurship', text: 'Turning an idea into something people actually use.' },
  { title: 'Innovation', text: 'Looking at familiar problems until a better answer appears.' },
  { title: 'Technology & Society', text: 'Building with a sense of who it serves, and what it changes.' },
  { title: 'Creative Thinking', text: 'Taste, aesthetics and imagination as part of engineering.' },
];

export const facts = [
  { label: 'Currently', value: 'Computer Science Student, Epitech' },
  { label: 'Focus', value: 'Software Engineering & AI' },
  { label: 'Driven by', value: 'Impact, craft & ambition' },
];

export const path = [
  { state: 'done', title: 'Student', caption: 'Where it began' },
  { state: 'now', title: 'Builder', caption: 'You are here' },
  { state: 'next', title: 'Software Engineer', caption: 'Becoming' },
  { state: 'next', title: 'AI Innovator', caption: 'The vision' },
] as const;

export const futureColumns = [
  { label: 'Exploring now', text: 'Machine learning, language models, and how to build AI products people can trust.' },
  { label: 'Building next', text: 'Mnemo and AegisAI, and tools that solve real problems around me.' },
  { label: 'Becoming', text: 'An engineer and founder who builds technology with lasting impact.' },
];

/** Path of a portrait photo inside public/ (for example 'assets/img/portrait.jpg'). Empty shows the silhouette. */
export const portrait = '';

export const contact = {
  email: 'stellagbaguidi68@gmail.com',
  /** Shown under the main address, for school and internship contacts. */
  schoolEmail: 'stella.gbaguidi@epitech.eu',
  github: 'https://github.com/Stellouuuuu',
  /** Fill these in to show the links: an empty value keeps the link hidden. */
  linkedin: 'https://www.linkedin.com/in/stella-gbaguidi-2424b7358/',
  resume: '',
};

export const sections = ['hero', 'about', 'mind', 'build', 'beyond', 'future', 'connect'] as const;
export type SectionId = (typeof sections)[number];

export const railLabels: Record<SectionId, string> = {
  hero: 'Seed',
  about: 'Roots',
  mind: 'Trunk',
  build: 'Branches',
  beyond: 'Leaves',
  future: 'Bloom',
  connect: 'Petals',
};

/** How many petals drift down while each section is on screen. */
export const petalDensity: Record<SectionId, number> = {
  hero: 18,
  about: 7,
  mind: 6,
  build: 5,
  beyond: 9,
  future: 34,
  connect: 44,
};
