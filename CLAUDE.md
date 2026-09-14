# CLAUDE.md

Personal portfolio website of **PHAM Nhu Quynh**, a graphic designer working in illustration,
graphic design, typography, UX-UI and photography.

## Source of truth

`PORTFOLIO_PHAM_Nhu_Quynh.pdf` (a 40-page InDesign export for 2024/2025) is the **single source of truth**
for both **content** and **visual style**.

- If the website and the PDF disagree, the PDF wins.
- Never invent projects, clients, awards, quotes, or copy. Rewrite PDF text only to fix typos and
  line-break hyphenation, or to shorten it for the web. Keep the meaning and the voice.
- Never ship placeholder boxes such as `[Image: ...]`. Every visual comes from `projects/`.
- The first-version `index.html`, `styles.css` and `script.js` (the "dossier / case study" look) are
  obsolete. Do not reuse their layout or styling.
- The PDF is 26 MB. Do not commit it unless the user asks.

## Stack and constraints

- Static site: plain HTML, CSS and vanilla JS. No framework, bundler, package manager, or build step.
- The site must work when `index.html` is opened directly from disk (`file://`). That means:
  no `fetch()` of local JSON, no ES module `import`, and no absolute `/` paths. Use relative paths only.
- Preview locally with `python3 -m http.server 8000` and open http://localhost:8000.
- Only external resources allowed: Google Fonts. No analytics and no CDN JS unless the user asks.
- Keep JS optional. Content must be readable with JS disabled, and JS only adds progressive enhancement
  (reveal-on-scroll, lightbox, nav state).

## Languages (FR / EN)

- The site is bilingual: English and French. Both languages live in the same HTML file, so there is
  no `/fr/` copy and no fetch, and it still works over `file://`.
- Mark language-specific markup with `data-l="en"` or `data-l="fr"` plus a matching `lang` attribute, for
  example `<p class="body" data-l="fr" lang="fr">…</p>`. CSS hides the inactive language based on
  `<html data-lang="…">`. Without JS, English shows.
- For attributes (`alt`, `aria-label`, `title`, `<meta name="description">`), put English in the attribute
  and French in `data-fr-alt`, `data-fr-aria-label`, `data-fr-title` or `data-fr-content`. `script.js`
  swaps them.
- Language choice happens in a tiny inline script in `<head>`, before first paint:
  1. a saved choice in `localStorage` (`lang`)
  2. otherwise, if one of the first two `navigator.languages` is French (`fr`, `fr-BE`, `fr-CA`…) or has a
     France region tag (`en-FR`), use French
  3. otherwise, if the device time zone is `Europe/Paris` or `Europe/Monaco`, use French. This means
     visitors in France get French even with an English browser. There is no IP geolocation: the site is
     static and must not call third-party services.
  4. otherwise English.
  It sets `<html lang>` and `data-lang`.
- The `FR / EN` switch in the masthead saves the choice and applies it without reloading.
- Every text change must be made in both languages. Each project `README.md` holds `## EN` and
  `## FR` copy. Proper nouns and project titles (Carré Hermès, Gangnam, Beyond Space…) stay untranslated.
- French must read like a native French design portfolio: natural wording, not a literal translation. Use
  French typography: a non-breaking space before `: ; ! ?`, and « guillemets ».

## Repository layout

```
index.html              Home: cover, about, the 5 "Issues" (chapters) with project index, contact
styles.css              Global design system (tokens, type, grid, components)
script.js               Progressive enhancement only
assets/                 Site-wide assets (favicon, fonts, logo, signature, paper texture)
projects/
  00-about/             Cover, about text, PHQ seal logo, signature (PDF p1, p2, p39, p40)
  01-illustration/      Issue 1
    01-carre-hermes/
      README.md         Content for this project: title, tags, tools, brief, intention, source pages
      index.html        Case study page for this project
      pages/            PDF spreads rendered as JPG (reference and full-spread visuals)
      images/           Artwork extracted from the PDF (use these on the site)
    ...
  02-graphic-design/    Issue 2
  03-typography/        Issue 3
  04-ux-ui/             Issue 4
  05-photography/       Issue 5
```

Rules:
- **One project = one folder.** Its `README.md` is the content source for its page. Update the README
  first when copy changes, then the HTML.
- Folder names use the `NN-kebab-slug` pattern, ordered as in the PDF.
- Project pages link to shared CSS/JS with relative paths (`../../../styles.css`).
- To add a project, create its folder with the same structure, then add it to the Issue index in
  `index.html`, and add prev/next links on its neighbours.
- Image filenames reference the PDF page they came from (`p04-2.jpg`, `spread-04.jpg`), so they can
  be traced back to the source. `.webp` files have transparency (cut-out mockups), and `.jpg` files are opaque.
- Brand marks are vectors extracted from the PDF: `assets/brand/phq-seal.svg` and `assets/brand/signature.svg`.
  The paper grain textures are in `assets/source/`.
- To re-extract from the PDF, use PyMuPDF (`pip install pymupdf`), render spreads at 110 dpi, and keep
  images at 2000px or less on the long edge.

## Content map (PDF → folders)

| Issue | Chapter | Projects (PDF pages) |
|---|---|---|
| — | About | cover p1, about p2, signature p39, seal p40 |
| 1 | Illustration | Carré Hermès p4–5 · Comis Strip / Mother Goddess p6–7 · Fresco / Hát Bội p8 · Book Covers p9–10 · Tarot / Freaky Folklore Monster p11 |
| 2 | Graphic Design | Gangnam Restaurant p13–17 · Passport / Eunoia p18–19 · Beyond Space p20–22 · Forgotten Dreams p23 left · Agent Orange p23 right · Parasite p24 |
| 3 | Typography | Bubble Cluster p25–27 |
| 4 | UX-UI | Britanica Type Specimen p29–30 · Mid-Autumn Festival p31–32 |
| 5 | Photography | Cubism Portrait p34–36 · Autumn Theme p37 · Color Grading p38 |

Chapter opener pages (p3, p12, p28, p33) are indexes and are rebuilt as HTML, not shown as images.
Contact: `Quynhpham261097@gmail.com`.

## Design language (taken from the PDF)

The portfolio is designed as an **editorial art magazine**. Each discipline is an "Issue". The website
should feel like browsing the printed book, not like a generic template or a SaaS landing page.

**Structure**
- Magazine chapters: `Issue 1 Illustration`, `Issue 2 Graphic Design`, `Issue 3 Typography`,
  `Issue 4 UX-UI`, `Issue 5 Photography`.
- Chapter openers use a huge two-line title, for example `ILLUS / tration`, `TYPO- / graphy` or
  `PHOTO / graphy`. The first letter is a flourished swash script capital, and the rest is a heavy
  expanded grotesque. Next to the title sits an outlined oval pill label reading "Issue N".
- Project index entries: `P.06 [06–09]` (bold folio plus bracketed range), then `(001)` and an italic
  project title, then an underlined subtitle and a plain descriptor line, with a thumbnail and a long,
  thin arrow `→` or `←`.
- The page chrome is a spread with a big page number in the bottom corners, and a footer strip reading
  `Issue 01 | Illustration ______`.
- Credits and tools are set in small type rotated 90° along the page edge.
- Text blocks start with a small label in the project's accent colour (`Brief`, `Creative Intention`,
  `Project Brief`, `Target Audiences`), followed by compact body text.

**Colour**
- Paper: warm off-white `#ededed` / `#e9e9e9`, with a subtle grain texture.
- Ink: `#000000` and charcoal `#333332`. Muted grey: `#b1b0af`.
- Dark spreads: charcoal `#333332` / `#2b2b2b` with light text.
- Each project owns a full-bleed accent ground or accent label colour, taken from its artwork:
  pink `#d45e94` / `#ef7eaf` (Hermès, Mother Goddess, Typography), orange `#fe763c`
  (Book Covers, Beyond Space, Mid-Autumn), blue `#009fe3` / `#1877b2` (Gangnam, Passport,
  Forgotten Dreams), and the Gangnam Obangsaek palette (red, green, blue, pink, yellow).
- Colour comes from the artwork. The UI itself stays monochrome paper and ink.

**Typography**
- The PDF uses **Britanica** (an expanded grotesque in many widths) for almost everything, a swash
  **script capital** (Charoly / Chaviera) for display initials, and **Space Grotesk Light** for tiny meta.
- Web substitutes, unless licensed Britanica webfonts are added to `assets/fonts/`:
  - Display and body: `Archivo` via Google Fonts, using the `wdth` axis (125 = expanded,
    62–75 = condensed) with weights 300–900.
  - Script initials: a Google swash script such as `Pinyon Script`. Use it only for the first capital
    of display titles.
  - Meta: `Space Grotesk` 300.
- Display type is very large, tight (`letter-spacing` slightly negative, `line-height` ~0.85), and
  mixes widths and italics inside one title. Body text is small, dense and justified-left, with a
  `line-height` around 1.25.

**Imagery and layout**
- Artwork is the hero. Use full-bleed images, mockups that bleed off the edge, and overlapping,
  scattered collages (tarot cards, book covers, photo walls).
- Asymmetric editorial grid with generous empty paper. Text columns are narrow (~32–45ch).
- Brand marks: the PHQ square seal logo and the handwritten signature. Use them on the cover, footer
  and favicon.

## Web implementation rules

- Mobile-first and responsive. Spreads collapse to a single column below ~800px, and rotated side
  credits become normal inline text.
- Use semantic HTML, one `h1` per page, and `alt` text describing the artwork, plus visible focus
  states and `prefers-reduced-motion` support.
- Images: `loading="lazy"` below the fold, explicit `width`/`height`, and keep files under ~2400px on
  the long edge.
- Motion stays subtle and editorial (fades and slight slides, like turning pages). No parallax circus.
- Put design tokens (colours, fonts, spacing, type scale) as CSS custom properties in `:root` in
  `styles.css`. Per-project accents are set via a `--accent` variable on the page's `<body>`.
- Before calling work done, open the pages in a browser at desktop and ~390px widths, and compare
  them side by side with the matching PDF spread.
