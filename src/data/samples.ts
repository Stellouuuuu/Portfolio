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
      { src: 'assets/img/boutique-features.png', alt: 'The features section of the presentation site: stock management and fast checkout', caption: 'Stock management and a fast checkout.' },
    ],
    code: {
      file: 'src/db/alertesStock.ts',
      caption: 'The low-stock list: one query, most urgent first, and it changes nothing.',
      code: `export async function listerAlertesStock(
  db: AlertesDb,
  boutiqueId: string,
  seuil: number
): Promise<ArticleAlerte[]> {
  return db.getAllAsync<ArticleAlerte>(
    \`SELECT id, nom, stock FROM (
       SELECT a.id AS id, a.nom AS nom, \${stockExpr('a.id')} AS stock
       FROM articles a
       WHERE a.boutique_id = ? AND a.actif = 1 AND COALESCE(a.suivi_stock, 1) = 1
     ) WHERE stock <= ? ORDER BY stock ASC, nom COLLATE NOCASE ASC\`,
    [boutiqueId, bornerSeuil(seuil)]
  );
}`,
    },
    terminal: {
      command: 'npm test',
      caption: 'The test suite of the app, run on my machine.',
      output: ['1..88', '# tests 303', '# suites 88', '# pass 303', '# fail 0', '# cancelled 0', '# skipped 0', '# duration_ms 1008.98'],
    },
  },
};
