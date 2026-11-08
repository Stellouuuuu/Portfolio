import type { Metric, ProjectStory } from './content';

/** French text of a project. The English entry in content.ts stays the reference for everything else. */
export interface ProjectFr {
  category: string;
  status: string;
  description: string;
  metrics: Metric[];
  story: ProjectStory[];
  links: string[];
  alt?: string;
  sample?: { gallery: { alt: string; caption: string }[]; codeCaption?: string; terminalCaption?: string };
}

export const projectsFr: Record<string, ProjectFr> = {
  AegisAI: {
    category: 'Sécurité · Applications d’IA',
    status: 'En fleur · open source',
    description: 'Un scanner qui attaque des chatbots, des agents et des applications RAG par leur API, et ne signale une faille que s’il peut la prouver.',
    metrics: [
      { value: '25', label: 'scénarios d’attaque, rejoués avant tout signalement' },
      { value: '245', label: 'tests automatisés' },
    ],
    alt: 'Le tableau de bord d’AegisAI listant quatorze failles prouvées contre un chatbot volontairement vulnérable',
    story: [
      { label: 'Le problème', text: 'Les applications d’IA sont mises en ligne après quelques bonnes démonstrations. Personne ne vérifie, de façon répétable, si on peut les pousser à divulguer un secret ou à exécuter une action destructrice.' },
      { label: 'L’idée', text: 'Un scanner en boîte noire : envoyer des attaques par l’API, chercher des preuves objectives, rejouer chaque attaque, et ne signaler que ce qui tient, avec la correspondance OWASP LLM Top 10.' },
      { label: 'La construction', text: 'Un moteur Python avec 25 scénarios, des détecteurs, un score de risque et un connecteur pour toute API HTTP ou compatible OpenAI, plus une CLI, une API REST, un tableau de bord React, des rapports PDF et SARIF, et une revue statique du code source.' },
      { label: 'Le défi', text: 'Les modèles ne sont pas déterministes. J’ai tout mesuré sur un vrai modèle local, et un essai témoin a montré que mes « attaques adaptatives » apportaient peu par rapport à un simple nouvel essai. J’ai réécrit ce que j’avais affirmé.' },
      { label: 'La leçon', text: 'Mesurer avant de dire que ça marche, garder un témoin, et écrire les limites à côté des chiffres.' },
    ],
    sample: {
      gallery: [
        { alt: 'Une faille dans AegisAI : l’attaque envoyée, la réponse qui a divulgué un secret planté, la règle violée et comment corriger', caption: 'Chaque faille montre l’attaque envoyée, la réponse, la règle violée et la correction.' },
        { alt: 'La vue d’ensemble d’AegisAI : un labo vulnérable à 0 et sa variante corrigée à 100', caption: 'Un labo vulnérable obtient 0, sa variante corrigée obtient 100.' },
      ],
    },
    links: ['Démo en ligne', 'Code source sur GitHub'],
  },
  Mnemo: {
    category: 'Intelligence artificielle · Assistant local',
    status: 'En fleur · en développement',
    description: 'Un assistant privé qui tourne sur ma propre machine : il retient ce que je choisis de partager, répond à partir de mes documents et peut utiliser des outils sans qu’on lui fasse confiance.',
    metrics: [
      { value: '35 / 35', label: 'demandes de suppression injectées, retenues pour approbation par le serveur' },
      { value: '3', label: 'modèles locaux comparés sur le même code' },
    ],
    alt: 'Mnemo répondant à une question sur un cours importé et citant le passage utilisé',
    story: [
      { label: 'Le problème', text: 'La plupart des assistants envoient tout aux serveurs de quelqu’un d’autre. Je voulais un assistant qui reste en local, me connaît et lit mes propres documents.' },
      { label: 'L’idée', text: 'Un modèle local avec une mémoire que je peux lire et modifier, des réponses qui citent le document et la page d’où elles viennent, et des outils dont les permissions sont décidées par le serveur, jamais par le modèle.' },
      { label: 'La construction', text: 'Une interface React avec réponses en streaming, une API Node, PostgreSQL avec pgvector pour la recherche hybride, un OCR local pour les PDF scannés, et un agent qui enchaîne des outils dans la limite d’un budget d’étapes.' },
      { label: 'Le défi', text: 'Mon premier modèle d’embeddings ne distinguait pas une question pertinente d’une question sans rapport en français : j’en ai mesuré deux sur 26 questions et je l’ai remplacé. Puis j’ai audité toute l’application avec mon propre scanner : 35 demandes injectées pour supprimer une mémoire, toutes arrêtées par le serveur.' },
      { label: 'La leçon', text: 'Mettre les garanties dans le code, pas dans le prompt. Le modèle choisi change le score d’audit, de 69 à 30 sur 100 à la dernière comparaison, mais pas ce que le serveur autorise.' },
    ],
    sample: {
      gallery: [
        { alt: 'Mnemo demandant une approbation avant d’effacer un souvenir : un bandeau avec les boutons Autoriser et Refuser au-dessus de la conversation', caption: 'Une action sensible m’attend. Le modèle dit que c’est fait ; le serveur n’a encore rien fait.' },
        { alt: 'L’écran de mémoire de Mnemo listant ce qu’il sait de l’utilisateur, chaque élément avec des boutons Modifier et Oublier', caption: 'L’écran de mémoire : ce que Mnemo sait de moi, chaque élément modifiable ou oubliable.' },
      ],
    },
    links: ['Code source sur GitHub'],
  },
  MyTorch: {
    category: 'Apprentissage automatique · Projet Epitech, en binôme',
    status: 'Livré',
    description: 'Un framework de réseaux de neurones écrit à la main, et un réseau entraîné avec lui pour dire si une position d’échecs est un échec, un mat ou rien de tout cela.',
    metrics: [
      { value: '88,6 %', label: 'de précision sur 72 303 positions jamais vues à l’entraînement' },
      { value: '0', label: 'bibliothèque de réseaux de neurones : NumPy seul, rétropropagation vérifiée par gradient check' },
    ],
    story: [
      { label: 'Le problème', text: 'Classer 723 019 positions d’échecs étiquetées (FEN) en cinq états, sans PyTorch, TensorFlow, scikit-learn ni moteur de règles.' },
      { label: 'L’idée', text: 'Nous avons coupé le travail en deux. Mon binôme a écrit le module de réseau (couches, pertes, optimiseurs). J’ai écrit tout ce qui l’entoure : lecture et validation des FEN, encodeur, découpage stratifié 80/10/10, ligne de commande de l’analyzer, métriques, et scripts d’entraînement, de recherche d’hyperparamètres et de benchmark, avec leurs tests.' },
      { label: 'La construction', text: 'Un pipeline reproductible : graines fixées, poids de classe pour les classes déséquilibrées, et comparaisons d’optimiseurs, d’initialisations et d’architectures, chacune avec son graphique.' },
      { label: 'Le défi', text: 'Le réseau rendu atteint 88,6 % sur le jeu de test. Son erreur principale est de confondre échec et mat de la même couleur ; il ne confond jamais la couleur.' },
      { label: 'La leçon', text: 'Ne jamais régler les paramètres sur le jeu de test, et noter chaque graine. Pouvoir refaire une expérience à l’identique comptait plus que n’importe quel score.' },
    ],
    links: [],
  },
  Threshold: {
    category: 'Full stack · Projet Epitech, en binôme',
    status: 'Livré',
    description: 'Un tableau de bord personnel qui réunit météo, activité GitHub, flux RSS, taux de change et Hacker News dans des widgets qu’on configure et qu’on réordonne.',
    metrics: [
      { value: '10', label: 'widgets sur 5 services, déclarés dans un registre unique' },
      { value: '240', label: 'des 249 commits du dépôt' },
    ],
    story: [
      { label: 'Le problème', text: 'Un seul écran, à jour sur plusieurs services, où chaque utilisateur choisit ce qu’il voit.' },
      { label: 'L’idée', text: 'Ajouter un widget revient à ajouter une entrée dans un registre avec un schéma typé. La description publique des services est générée à partir de ce registre, donc elle ne peut pas s’écarter du code.' },
      { label: 'La construction', text: 'Des comptes avec confirmation par e-mail grâce à un code à usage unique, OAuth GitHub, des instances de widgets qui se rafraîchissent avec leur propre minuteur, une grille en glisser-déposer et une vue administrateur. En plus du sujet : historique en courbe, alertes par e-mail sur seuil, un résumé quotidien par IA et une application installable.' },
      { label: 'Le défi', text: 'Gérer les secrets correctement : mots de passe hachés avec bcrypt, codes à usage unique et jetons de rafraîchissement stockés uniquement sous forme de hachages, jetons OAuth chiffrés, et clés de signature générées au premier démarrage.' },
      { label: 'La leçon', text: 'Nous avons préparé la soutenance en vérifiant chaque affirmation dans le code, avec le fichier et la ligne à côté. C’est l’habitude que j’ai gardée.' },
    ],
    links: ['Ouvrir l’application', 'Code source sur GitHub'],
  },
  'R-Type': {
    category: 'Systèmes · Projet Epitech, équipe de 4',
    status: 'Livré',
    description: 'Un jeu de tir horizontal en réseau, en C++ : un serveur UDP faisant autorité fait tourner le jeu, et le moteur, le protocole binaire et les règles sont des bibliothèques séparées.',
    metrics: [
      { value: '5 Ko/s', label: 'de bande passante par joueur, imposés par un test qui fait échouer le build' },
      { value: '4', label: 'bots simulés avec 150 ms de délai et jusqu’à 30 % de perte de paquets' },
    ],
    story: [
      { label: 'Le problème', text: 'Un jeu multijoueur où le serveur décide de tout, en UDP, qui peut perdre, dupliquer ou réordonner des messages, et ne doit jamais planter sur un message invalide.' },
      { label: 'L’idée', text: 'L’équipe de quatre s’est répartie le jeu par dossier. Je m’occupais de la communication : le protocole binaire et le serveur, avec les salons et plusieurs parties en même temps.' },
      { label: 'La construction', text: 'Les événements importants (un joueur arrive ou part) sont renvoyés jusqu’à ce que l’autre côté les acquitte. Les messages mal formés sont ignorés. J’ai écrit un réseau virtuel pour mesurer la vraie logique du serveur avec délai et pertes.' },
      { label: 'Le défi', text: 'À 2 % de perte, tous les événements ont été livrés ; à 30 %, 8 sur 1 812 n’ont pas été acquittés en 12 essais, et j’ai documenté cette limite. Une salle pleine envoyait aussi environ 9 Ko/s : j’ai réduit les instantanés à 10 par seconde et plafonné les missiles à 32.' },
      { label: 'La leçon', text: 'Un chiffre écrit dans un document dérive. Un chiffre imposé par un test reste vrai : le build échoue maintenant si une salle pleine dépasse 5 Ko/s.' },
    ],
    links: [],
  },
  'Gestion de boutique': {
    category: 'Application mobile et web · Commerce',
    status: 'En ligne',
    description: 'Une application de gestion de boutique pour suivre le stock et les ventes, enregistrer des ventes hors ligne et préparer les inventaires.',
    metrics: [
      { value: 'Hors ligne', label: 'ventes enregistrées sans connexion, synchronisées ensuite' },
      { value: 'En ligne', label: 'version web déployée et installable sur un téléphone' },
    ],
    alt: 'La page d’accueil de l’application web Gestion de boutique : gérer son commerce, son stock, ses ventes et ses inventaires depuis un téléphone',
    story: [
      { label: 'Le problème', text: 'Une boutique doit savoir ce qu’elle a et ce qu’elle a vendu, même quand la connexion coupe.' },
      { label: 'L’idée', text: 'Une application qui enregistre les ventes hors ligne, se synchronise dès que possible, et produit des bilans et des inventaires.' },
      { label: 'La construction', text: 'Expo et React Native avec une base locale, Supabase pour la synchronisation, et une version web gratuite qu’on peut ajouter à l’écran d’accueil d’un iPhone.' },
      { label: 'Le défi', text: 'Faire tourner la version web en production : une base locale dans le navigateur demande des en-têtes de sécurité précis, et l’hébergeur refusait les dossiers nommés node_modules, donc le build les renomme.' },
      { label: 'La leçon', text: 'L’essentiel du travail d’une vraie application est la partie peu glorieuse : hors ligne, synchronisation et déploiement.' },
    ],
    sample: {
      gallery: [
        { alt: 'La liste des produits de l’application dans un cadre de téléphone : huile, riz, savon, lait et sucre avec leur stock et leur prix', caption: 'La liste des produits, avec stock et prix en un coup d’œil.' },
      ],
    },
    links: ['Ouvrir l’application'],
  },
};

export const mindItemsFr = [
  { title: 'Génie logiciel', text: 'Concevoir des systèmes clairs, robustes et faits pour durer.' },
  { title: 'Intelligence artificielle', text: 'Apprendre aux machines à apprendre, et se demander pourquoi faire.' },
  { title: 'Entrepreneuriat', text: 'Transformer une idée en quelque chose que les gens utilisent vraiment.' },
  { title: 'Innovation', text: 'Regarder des problèmes familiers jusqu’à ce qu’une meilleure réponse apparaisse.' },
  { title: 'Technologie et société', text: 'Construire en sachant à qui cela sert, et ce que cela change.' },
  { title: 'Pensée créative', text: 'Le goût, l’esthétique et l’imagination comme part de l’ingénierie.' },
];

export const factsFr = [
  { label: 'Actuellement', value: 'Études d’informatique à Epitech' },
  { label: 'Centre d’intérêt', value: 'Génie logiciel et IA' },
  { label: 'Moteur', value: 'Impact, savoir-faire et ambition' },
];

export const pathFr = [
  { title: 'Études', caption: 'Là où tout a commencé' },
  { title: 'Bâtisseur', caption: 'Vous êtes ici' },
  { title: 'Ingénierie logicielle', caption: 'Devenir' },
  { title: 'Innovation en IA', caption: 'La vision' },
];

export const futureColumnsFr = [
  { label: 'J’explore en ce moment', text: 'L’apprentissage automatique, les modèles de langage, et comment construire des produits d’IA auxquels on peut faire confiance.' },
  { label: 'Je construis ensuite', text: 'Mnemo et AegisAI, et des outils qui résolvent de vrais problèmes autour de moi.' },
  { label: 'Je deviens', text: 'Quelqu’un qui construit une technologie à l’impact durable, en ingénierie comme en entrepreneuriat.' },
];
