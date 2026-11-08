# Portfolio

Personal site of Stella Gbaguidi: software engineering and AI projects, with a tree that grows and
sways as you move, and petals that follow the scroll.

React 19, TypeScript and Vite. No UI library: the design is plain CSS, taken from `design/reference.html`.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # content, tree, wind and project-story tests
npm run build      # type-checks, then writes dist/ (relative paths: works from any folder)
```

## Structure

| Path | What it is |
|---|---|
| `src/data/content.ts` | All the text: projects and their five-step stories, mind items, facts, links |
| `src/components/` | One component per section (`Hero`, `About`, `Mind`, `Build`, `Beyond`, `Future`, `Connect`), plus `Nav`, `Rail`, `Reveal` |
| `src/components/Scene.tsx` | The one animation loop: tree, wind and the petals canvas |
| `src/lib/tree.ts`, `petals.ts`, `wind.ts` | The effects, as plain modules with no React in them |
| `src/hooks/` | Scroll reveal, active section, scroll progress |
| `src/styles.css` | Design tokens (colours, type, spacing), layout and animations |
| `public/assets/img/` | Project screenshots and, when you add it, `portrait.jpg` |
| `design/reference.html` | The original single-file design this was built from |

The React version was checked against the first static version of the site: same page height at
desktop and mobile widths, and less than 0.02 % of the pixels differ once motion is frozen.

## To fill in

- **Portrait:** put a photo at `public/assets/img/portrait.jpg` (about 4:5). Until then the page shows the silhouette.
- **Résumé:** set `contact.resume` in `src/data/content.ts`. An empty value keeps the link hidden.
- **Contact details** (main and student email, LinkedIn, GitHub) are in `contact`, in the same file.
- **Projects:** add or edit an object in `projects`. The test checks that every project has the five story steps in order, links over https, existing screenshots, and no em dash or emoji in the text.

## Design notes

Ivory and chocolate palette with blush, gold and sage accents, Cormorant Garamond with Inter. Motion respects
`prefers-reduced-motion` (the tree is drawn fully grown and still, and there are no petals). A skip link and
visible focus styles are included. The page content is rendered by JavaScript, so a link preview shows only the
title and description in `index.html`.
