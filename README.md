# Portfolio

Personal site of Stella Gbaguidi: software engineering and AI projects, with a tree that grows and
sways as you move, and petals that follow the scroll.

No build step and no dependency: open `index.html`, or serve the folder.

```bash
python3 -m http.server 8000      # then http://localhost:8000
```

## Structure

| Path | What it is |
|---|---|
| `index.html` | The page: hero, about, mind, projects, beyond, future, contact |
| `css/site.css` | Design tokens (colours, type, spacing), layout and animations |
| `js/site.js` | The SVG tree and wind, the falling petals, scroll reveals, project stories, copy-email |
| `assets/img/` | Project screenshots and, when you add it, `portrait.jpg` |
| `design/reference.html` | The original single-file design this site was built from |

## To fill in

- **Portrait:** put a photo at `assets/img/portrait.jpg` (about 4:5). Until then the page shows the silhouette.
- **Email:** `hello@stellagbaguidi.com` is the address from the design. Change it in `index.html` (`#mail`) if it is not yours.
- **LinkedIn and Résumé:** the two links are hidden. Set their `href` in `index.html` and remove the `hidden` attribute.
- **Projects:** each project is one `<article class="proj">`. The story is five short steps; AegisAI, Mnemo and
  Gestion de boutique link to their source or live app. BatiPredict and AgriERP have no public link yet.

## Design notes

Ivory and chocolate palette with blush, gold and sage accents, Cormorant Garamond with Inter. Motion respects
`prefers-reduced-motion`; the page works without JavaScript (content is shown, only the animations are lost).
