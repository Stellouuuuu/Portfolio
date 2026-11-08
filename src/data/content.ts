import { samples, type Sample } from './samples';

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
  /** More pictures, a code excerpt and a terminal result, for the featured projects. */
  sample?: Sample;
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    no: '01',
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
    sample: samples['AegisAI'],
    links: [{ label: 'Source on GitHub', url: 'https://github.com/Stellouuuuu/aegisai' }],
  },
  {
    no: '02',
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
    sample: samples['Mnemo'],
    links: [{ label: 'Source on GitHub', url: 'https://github.com/Stellouuuuu/mnemo' }],
  },
  {
    featured: false,
    metrics: [
      { value: '88.6%', label: 'accuracy on 72,303 chess positions never seen in training' },
      { value: '0', label: 'neural-network libraries: NumPy only, backpropagation checked by gradient check' },
    ],
    title: 'MyTorch',
    category: 'Machine Learning · Epitech project, pair',
    status: 'Delivered',
    bloom: false,
    description: 'A neural-network framework written by hand, and a network trained with it to tell whether a chess position is check, checkmate or neither.',
    stack: 'Python · NumPy · Make',
    letter: 'M',
    gradient: 'linear-gradient(160deg,#EFE6DA,#D9C7B0)',
    story: [
      { label: 'The problem', text: 'Classify 723,019 labelled chess positions (FEN) into five states, without PyTorch, TensorFlow, scikit-learn or any rules engine.' },
      { label: 'The idea', text: 'We split the work in two. My partner wrote the network module (layers, losses, optimisers). I wrote everything around it: FEN parsing and validation, the encoder, the stratified 80/10/10 split, the analyzer command line, metrics, and the training, hyperparameter search and benchmark scripts, with tests.' },
      { label: 'The build', text: 'A reproducible pipeline: fixed seeds, class weights for the imbalanced classes, and comparisons of optimisers, initialisations and architectures, each with a chart.' },
      { label: 'The challenge', text: 'The delivered network reaches 88.6% on the test set. Its main mistake is confusing check with checkmate of the same colour; it never confuses the colour.' },
      { label: 'The lesson', text: 'Never tune on the test set, and write down every seed. Being able to rerun an experiment identically mattered more than any single score.' },
    ],
    links: [],
  },
  {
    featured: false,
    metrics: [
      { value: '10', label: 'widgets across 5 services, declared in a single registry' },
      { value: '240', label: 'of the 249 commits of the repository' },
    ],
    title: 'Threshold',
    category: 'Full stack · Epitech project, pair',
    status: 'Delivered',
    bloom: false,
    description: 'A personal dashboard that gathers weather, GitHub activity, RSS feeds, exchange rates and Hacker News in widgets you configure and reorder.',
    stack: 'React · TypeScript · Express · PostgreSQL · Drizzle · Docker',
    letter: 'T',
    gradient: 'linear-gradient(160deg,#F1E8DC,#E0CDB8)',
    story: [
      { label: 'The problem', text: 'One screen that stays up to date across several services, where each user decides what to see.' },
      { label: 'The idea', text: 'Adding a widget means adding one entry to a registry with a typed schema. The public service description is generated from that registry, so it cannot drift from the code.' },
      { label: 'The build', text: 'Accounts with e-mail confirmation by one-time code, GitHub OAuth, widget instances that refresh on their own timer, a drag-and-drop grid and an admin view. Beyond the brief: history as a sparkline, threshold alerts by e-mail, an AI daily brief and an installable app.' },
      { label: 'The challenge', text: 'Handling secrets properly: passwords are hashed with bcrypt, one-time codes and refresh tokens are stored only as hashes, OAuth tokens are encrypted, and signing keys are generated on first start.' },
      { label: 'The lesson', text: 'We prepared the defence by checking every claim against the code, with the file and line next to it. That habit is the one I kept.' },
    ],
    links: [
      { label: 'Open the app', url: 'https://threshold-frontend-t7yu.onrender.com/' },
      { label: 'Source on GitHub', url: 'https://github.com/Stellouuuuu/Dashboard' },
    ],
  },
  {
    featured: false,
    metrics: [
      { value: '5 KB/s', label: 'bandwidth budget per player, enforced by a test that fails the build' },
      { value: '4', label: 'bots simulated at 150 ms delay and up to 30% packet loss' },
    ],
    title: 'R-Type',
    category: 'Systems · Epitech project, team of 4',
    status: 'Delivered',
    bloom: false,
    description: 'A networked horizontal shooter in C++: an authoritative UDP server runs the game, and the engine, the binary protocol and the rules are separate libraries.',
    stack: 'C++20 · CMake · UDP · SFML · GitHub Actions',
    letter: 'R',
    gradient: 'linear-gradient(160deg,#EEE5DA,#D6C5B4)',
    story: [
      { label: 'The problem', text: 'A multiplayer game where the server decides everything, over UDP, which can lose, duplicate or reorder messages, and must never crash on a bad one.' },
      { label: 'The idea', text: 'The team of four split the game by folder. I owned communication: the binary protocol and the server, including lobbies and several rooms at once.' },
      { label: 'The build', text: 'Important events (a player joins or leaves) are resent until the other side acknowledges them. Malformed messages are ignored. I wrote a virtual network to benchmark the real server logic with delay and loss.' },
      { label: 'The challenge', text: 'At 2% loss every event was delivered; at 30%, 8 of 1,812 were not acknowledged in 12 tries, and I documented that limit. A full room also sent about 9 KB/s, so I cut snapshots to 10 per second and capped missiles at 32.' },
      { label: 'The lesson', text: 'A number written in a document drifts. A number enforced by a test stays true: the build now fails if a full room exceeds 5 KB/s.' },
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
    shot: { src: 'assets/img/boutique-home.png', alt: 'The home page of the Gestion de boutique web app: manage your shop, stock, sales and inventories from a phone' },
    letter: 'G',
    gradient: 'linear-gradient(160deg,#F6E3E4,#EBD3C9)',
    story: [
      { label: 'The problem', text: 'A shop needs to know what it has and what it sold, even when the connection drops.' },
      { label: 'The idea', text: 'An app that records sales offline, synchronises when it can, and produces balances and inventories.' },
      { label: 'The build', text: 'Expo and React Native with a local database, Supabase for sync, and a free web version that can be added to an iPhone home screen.' },
      { label: 'The challenge', text: 'Getting the web version to run in production: a local database in the browser needs specific security headers, and the hosting refused folders named node_modules, so the build renames them.' },
      { label: 'The lesson', text: 'Most of the work in a real app is the unglamorous part: offline, sync and deployment.' },
    ],
    sample: samples['Gestion de boutique'],
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
export const portrait = 'assets/img/portrait.jpg';

export const contact = {
  email: 'stellagbaguidi68@gmail.com',
  /** Shown under the main address, for school and internship contacts. */
  schoolEmail: 'stella.gbaguidi@epitech.eu',
  github: 'https://github.com/Stellouuuuu',
  /** Fill these in to show the links: an empty value keeps the link hidden. */
  linkedin: 'https://www.linkedin.com/in/stella-gbaguidi-2424b7358/',
  /** The CV for the public site has no phone number. One file per language. */
  resume: 'cv/stella-gbaguidi-cv-en.pdf',
  resumeFr: 'cv/stella-gbaguidi-cv-fr.pdf',
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
