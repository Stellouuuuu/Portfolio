export interface Figure {
  src: string;
  alt: string;
  caption: string;
}

export interface CodeSample {
  file: string;
  caption: string;
  code: string;
}

export interface TerminalSample {
  command: string;
  caption: string;
  output: string[];
}

export interface Sample {
  gallery: Figure[];
  code?: CodeSample;
  terminal?: TerminalSample;
}

/** Real excerpts and real output from each project, shown beside its screenshots. */
export const samples: Record<string, Sample> = {
  AegisAI: {
    gallery: [
      { src: 'assets/img/aegisai-proof.png', alt: 'A finding in AegisAI: the attack sent, the reply that leaked a planted secret, the rule violated and how to fix it', caption: 'Each finding shows the attack sent, the reply, the rule violated and the fix.' },
      { src: 'assets/img/aegisai-dashboard.png', alt: 'The AegisAI overview: a vulnerable lab scoring 0 and its patched variant scoring 100', caption: 'A vulnerable lab scores 0, its patched variant scores 100.' },
    ],
  },
  Mnemo: {
    gallery: [
      { src: 'assets/img/mnemo-approval.png', alt: 'Mnemo asking for approval before erasing a memory: a banner with the Allow and Refuse buttons above the conversation', caption: 'A sensitive action waits for me. The model says it is done; the server has not done anything yet.' },
      { src: 'assets/img/mnemo-memory.png', alt: 'Mnemo’s memory screen listing what it knows about the user, each item with Edit and Forget buttons', caption: 'The memory screen: what Mnemo knows about me, each item editable or forgotten.' },
    ],
  },
  'Gestion de boutique': {
    gallery: [
      { src: 'assets/img/boutique-steps.png', alt: 'The product list of the app in a phone frame: oil, rice, soap, milk and sugar with their stock and price', caption: 'The product list, with stock and price at a glance.' },
    ],
  },
};
