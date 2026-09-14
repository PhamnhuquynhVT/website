# PHAM Nhu Quynh — Graphic Design Portfolio

Personal portfolio website of PHAM Nhu Quynh (illustration, graphic design, typography, UX-UI and photography),
designed as an editorial art magazine. The content and visual style come from `PORTFOLIO_PHAM_Nhu_Quynh.pdf`.

Plain HTML, CSS and vanilla JS. There is no framework, package manager or build step.

The site is bilingual (English / French): both languages live in each page, the language follows the visitor's browser (French for `fr-*`), and the `FR / EN` switch in the masthead remembers the choice. See `design/DESIGN_SYSTEM.md` §6b.

## Open locally

- Double-click `index.html`. The site works from `file://`, and every path is relative.
- Or serve the folder with `python3 -m http.server 8000` and open http://localhost:8000.

## Where things live

| Path | What |
|---|---|
| `index.html` | Home: cover, about, the five Issue openers with the project index, contact |
| `projects/<NN-issue>/<NN-project>/index.html` | One case study page per project |
| `projects/**/README.md` | Content source for each project (copy, tags, tools, image list) |
| `projects/**/images/` | Artwork extracted from the PDF (use these on pages) |
| `projects/**/pages/` | PDF spreads rendered as JPG (layout reference only) |
| `styles.css` | The design system: tokens, type, grid and components |
| `script.js` | Progressive enhancement: reveal on scroll, masthead state, lightbox |
| `design/DESIGN_SYSTEM.md` | Component markup, page templates and per-project art direction |
| `design/styleguide.html` | Living style guide for `styles.css` |
| `assets/` | Favicon, brand marks (`brand/`) and paper textures (`source/`) |

## Add a project

1. Create `projects/<NN-issue>/<NN-slug>/` with `README.md`, `images/` and `pages/`, following an existing project.
2. Write its `index.html` from the Project template in `design/DESIGN_SYSTEM.md`. Set `--accent` on `<body>`,
   link `../../../styles.css` and `../../../script.js`, and give every image `width`, `height` and `alt`.
3. Add an index entry to its Issue section in `index.html`.
4. Update the previous/next pager links on the neighbouring project pages.

Read `CLAUDE.md` for the full rules (source of truth, stack constraints, design language).
