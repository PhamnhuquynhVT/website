# PHQ Portfolio — Design System

Spec for building `index.html` and every `projects/**/index.html`. The CSS is `styles.css` and the living demo is
`design/styleguide.html`. Open the style guide next to the PDF spreads (`projects/*/pages/*.jpg`) while you build.

**North star:** the site is the printed art magazine, turned page by page. Use paper and ink for the interface,
let colour come only from the artwork, keep display type huge and tight next to tiny dense body text, and use
asymmetric placement with generous empty paper.

---

## 1. Setup

```html
<!-- In <head>, before styles.css (required: styles.css has no @import) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Imperial+Script&family=Space+Grotesk:wght@300;400;500&display=swap">
<script>document.documentElement.classList.add('js');</script>  <!-- enables reveal hidden state -->
<link rel="stylesheet" href="styles.css">            <!-- project pages: ../../../styles.css -->
```
Every page loads the fonts with these `<link>` tags. The `@import` has been removed from `styles.css`.

Small accent text (labels and side-credit titles) is automatically mixed toward `--tone` so it stays AA-legible:
darker on paper, lighter on dark spreads. Set `--label-color` or `--credit-color` when a ground needs a specific colour.

Project pages set their accent on `<body>`:
```html
<body style="--accent: #ef7eaf">
```

## 2. Tokens

### Colour
| Token | Value | Use |
|---|---|---|
| `--paper` | `#ededed` + `assets/source/texture-739.jpg` grain | page ground (set on `body`) |
| `--paper-2` | `#e4e3e1` | recessed paper |
| `--charcoal` | `#333332` | default text; dark spread ground |
| `--charcoal-2` | `#2b2b2b` | deeper dark ground (`.spread--darker`) |
| `--ink` | `#000` | pure black accents, seal |
| `--grey` | `#b1b0af` | folios / muted text on dark |
| `--grey-ink` | `#6e6d6b` | muted text on paper (AA) |
| `--pink` `--magenta` | `#ef7eaf` `#d45e94` | Hermès · Goddess / Fresco / Typography |
| `--orange` | `#fe763c` | Book Covers · Beyond Space · Mid-Autumn |
| `--blue` `--blue-deep` | `#009fe3` `#1877b2` | Passport / Bubble · Gangnam / Forgotten Dreams |
| `--red` `--crimson` | `#e2412a` `#c8323a` | Agent Orange · Parasite |
| `--signal-red` `--royal` | `#e30613` `#1d1dd8` | Britanica specimen |
| `--yellow` `--teal` | `#f5c518` `#4cc4a4` | Tarot |
| `--jade` `--ochre` | `#1f8a6f` `#b98a3e` | Photography |
| `--obang-*` | red, green, blue, pink, yellow | Gangnam palette strips |

**Contextual variables.** You set these; the components read them.
- `--accent` is the label, script capital and quote colour, and the ground of `.spread--accent`.
- `--accent-ink` is text on an accent ground (default `--ink`).
- `--accent-label` is the label colour on an accent ground (for example yellow on orange).
- `--fg`, `--muted` and `--bg` are set automatically by the `.spread` variants.

Rule: colour is never decorative UI chrome. Every accent must trace back to the project's artwork.

### Type
| Token | Size (390 → 1440px) | Used by |
|---|---|---|
| `--step--2` | 11px | meta, credits, folio strip |
| `--step--1` | 12–13 | `.body--sm`, entry sub/desc |
| `--step-0` | 14–16 | `.body`, `.label` |
| `--step-1` | 17–22 | entry title, kicker, pill |
| `--step-2` | 22–34 | pager title, `.quote--sm` |
| `--step-3` | 32–60 | `.display--section`, `.quote` |
| `--step-4` | 42–96 | `.display--project` |
| `--step-5` | 52–124 | `.display--issue` |
| `--folio-size` | 24–44 | `.folio` |

Line-heights: `--lh-display` .86, `--lh-tight` 1.1, `--lh-body` 1.28. Measures: `--measure` 42ch, `--measure-narrow` 32ch.

### Space, grid, shape, motion
- Spacing: `--space-1` (.25rem) through `--space-8` (6→12rem, fluid).
- Grid: 4 columns below 800px and 12 from 800px. `--margin` is 16→44px and `--gutter` is 12→24px. `--pad-top` is the spread top padding, which the bleeds use.
- Spread height: `--spread-h` is `min(100svh, 64vw)` on desktop (a printed spread ratio) and `auto` on mobile.
- Shape: `--radius-pill` 50% (a true oval), `--border-hair` 1px, `--border-thin` 1.5px, `--shadow-print`.
- Motion: `--dur-fast` 160ms, `--dur` 420ms, `--dur-slow` 900ms, `--ease-out` and `--ease-page`.

## 3. Typography rules

| Role | Font | Settings |
|---|---|---|
| Display (titles) | Archivo | mix `type-cond` (wdth 62, 500, uppercase words) with `type-exp` (wdth 125, 800) and `type-italic`, all inside one title; letter-spacing −.02em; lh .86 |
| Script initial | **Imperial Script** (fallback Pinyon Script) | `.script-cap` only, on the **first letter** of a display title, pager-sized titles or larger. Never in body text, never on a whole word. |
| Labels | Archivo wdth 125, 700 | accent colour, sentence case (`Brief`, `Creative Intention`, `Project Brief`, `Target Audiences`) |
| Body | Archivo wdth 112, 400 | 14–16px, lh 1.28, max 42ch, ragged-right; `.body--justify` only for the About text (as in the PDF) |
| Index / kicker | Archivo wdth 125 italic 500–700 | `(001) “Title”` |
| Meta / credits / tools | Space Grotesk 300 | 11px |
| Folios | Archivo wdth 100, 300 | grey, bottom corners |

**Why Imperial Script?** I compared Pinyon Script, Italianno, Monsieur La Doulaise, Great Vibes, Parisienne, Alex Brush,
Rouge Script, Petit Formal Script, Mea Culpa, Ballet and Luxurious Script. Imperial Script's capitals have the
same hairline, loop-led flourished form as Charoly and Chaviera in the PDF (see the I, G, P, D, C and H). Pinyon is
thicker and more copperplate. Great Vibes and Mea Culpa are too heavy, and Ballet and Monsieur are too ornate to
read at display size.

**Accessibility.** Split titles such as `ILLUs / tration` need `aria-label="Illustration"` on the heading.

## 4. Components

Each item gives the class names, markup and modifiers. See `styleguide.html` for working examples.

### Masthead
```html
<header class="masthead">
  <a class="masthead__brand" href="index.html"><img class="masthead__seal" src="assets/brand/phq-seal.svg" width="185" height="214" alt="">PHAM Nhu Quynh</a>
  <nav class="masthead__nav" aria-label="Issues"><ul class="masthead__list">
    <li><a class="masthead__link" href="index.html#issue-1"><b>01</b>Illustration</a></li> …
  </ul></nav>
  <a class="masthead__aside" href="#contact">Contact</a>
</header>
```
The masthead is sticky. JS adds `.is-scrolled` once the page scrolls past 8px, which shows a hairline. On the
current Issue, set `aria-current="true"`. Below 800px the nav becomes a horizontally scrolling row.

### Cover (home, PDF p1)
```html
<header class="cover">
  <p class="cover__year">2024/2025</p>
  <h1 class="cover__title" aria-label="Graphic Design Portfolio by PHAM Nhu Quynh">
    <span class="cover__line" style="--i:1"><span class="script-cap">G</span>raphic</span>
    <span class="cover__line" style="--i:2.4"><span class="script-cap">D</span>esign</span>
    <span class="cover__line" style="--i:0"><span class="script-cap">P</span>ortfolio<span class="cover__by">by</span></span>
    <span class="cover__line cover__line--name" style="--i:1.6">PHAM Nhu</span>
    <span class="cover__line cover__line--name" style="--i:3.1">Quynh</span>
  </h1>
  <div class="cover__foot"><p class="cover__meta">…<a href="mailto:…">…</a></p><img class="cover__seal" …></div>
</header>
```
`--i` sets the staggered indent of each line, measured in em.

### Grid & cells
```html
<div class="grid">
  <div class="cell" style="--c: 7 / span 5; --r: 1 / span 2; --mt: 3rem; --js: end; --as: end">…</div>
</div>
```
`--c`, `--r`, `--mt`, `--js` and `--as` apply at 800px and up only. Below that every cell is full width, in source
order, so **write the source in reading order**. Modifiers are `.grid--flush` (no side margins) and `.grid--tight`.

### Display title + script capital + issue pill
```html
<h2 class="display display--issue" aria-label="Issue 1: Illustration">
  <span class="display__line"><span class="script-cap">I</span><span class="type-cond">LLUs</span><span class="issue-pill">Issue 1</span></span>
  <span class="display__line type-exp type-italic">tration</span>
</h2>
```
- Sizes: `.display--issue`, `.display--project` and `.display--section`.
- Lines: `.display__line--indent` (with `--indent`) and `.display__line--right`.
- `.display__aside` is the small italic block beside a line ("Vietnamese / Folk Pattern"); `--below` stacks it under the line.
- `.script-cap--tight` pulls the next letter in, and `.script-cap--accent` colours the capital.
- `.issue-pill` also works standalone, sized with `--pill-size`.

Titles from the PDF:
- Issue openers: `I·LLUs / tration`, `G·RAPHIC / [pill] D·esign`, `T·YPO- / graphy`, `P·HOTO / graphy`.
- Project titles: `“C·ARRÉ / H·ERMÈS” / Collection`, `C·OMIS / S·tRIP`, `F·RESCO`, `T·AROT`, `P·ASSPORT / Project`, `“B·EYOND / S·PACE” / Magazine`.

### Issue opener (home)
```html
<section class="issue spread--fold" id="issue-1" aria-labelledby="issue-1-title">
  <ol class="grid issue__index" role="list">
    <li class="cell" style="--c:1 / span 6"><h2 id="issue-1-title" class="display display--issue" …>…</h2></li>
    <li class="cell" style="--c:8 / span 5; --r:1">…entry…</li>
    <li class="cell" style="--c:1 / span 6; --mt:2rem">…entry…</li> …
  </ol>
  <footer class="folio-bar">…</footer>
</section>
```
Place entries to echo the PDF index page for that Issue (p3, p12, p25, p28, p33). Alternate the left and right
pages, stagger with `--mt`, and use `--js:end` on some right-page items. If you use a heading inside the `<ol>`,
wrap it in an `<li>`, or put the `<h2>` just before the list.

### Index entry
```html
<a class="entry" href="projects/01-illustration/01-carre-hermes/index.html">
  <span class="entry__text">
    <span class="entry__folio"><b>P.06</b> [06–09]</span>
    <span class="entry__title"><span class="entry__num">(001)</span> “Carré Hermès” collection</span>
    <span class="entry__sub">Vietnamese Folk Pattern</span>
    <span class="entry__desc">Inspiration from traditional Vietnamese architecture</span>
  </span>
  <span class="arrow" aria-hidden="true"></span>
  <img class="entry__thumb" src="…" width="…" height="…" alt="" loading="lazy">
</a>
```
- Layout: `.entry--reverse` puts the thumbnail first (pair it with `.arrow--left`), `.entry--stacked` puts the arrow under the text, and `.entry--arrow-under` is the other stacked variant.
- `.entry__folio--cond` gives a condensed folio number (as on P.10 and P.14 in the PDF).
- Entry thumbnails use `alt=""` because the link text already names the project.
- Folio numbers are the printed page numbers from each README's "printed" range.

### Arrow
Use `<span class="arrow" aria-hidden="true"></span>`. Modifiers are `--left`, `--bold` (short and heavy),
`--short`, `--long` and `--accent`. The length is `--arrow-len`, and it grows on hover of `.entry` or `.pager__link`.

### Spread (page primitive)
```html
<section class="spread spread--dark spread--fold" style="--accent: var(--pink)">
  <p class="side-credit">…</p>                       <!-- optional -->
  <div class="spread__body grid">…cells…</div>
  <footer class="folio-bar">…</footer>
</section>
```
| Modifier | Effect |
|---|---|
| (none) | paper ground |
| `.spread--dark` / `.spread--darker` | charcoal + light grain, light text |
| `.spread--accent` | `--accent` ground + dark grain, `--accent-ink` text, `--accent-label` labels |
| `.spread--paper` | forces paper (inside dark pages) |
| `.spread--fold` | faint centre fold line (desktop) |
| `.spread--center` | vertically centres the body |

### Two-page split
```html
<section class="split [split--wide-left|split--wide-right]" style="--accent:…">
  <div class="split__page split__page--media" style="--ratio: 3 / 4"><img …></div>
  <div class="split__page [split__page--dark|split__page--accent]">…<footer class="folio-bar">…</footer></div>
</section>
```
`--media` pages are full bleed with `object-fit: cover`. On mobile they use `--ratio` (default 4/5).

### Folio bar
```html
<footer class="folio-bar">
  <span class="folio">06</span>
  <span class="folio-bar__strip"><span>Issue 01</span><span>Illustration</span><span class="folio-bar__rule"></span></span>
  <span class="folio folio--right">07</span>
</footer>
```
The strip is hidden below 800px. You can put an `.arrow--accent` before the right folio (as on PDF p4 and p6).
Folio numbers match the printed page numbers in the PDF.

### Side credit
```html
<p class="side-credit [side-credit--left]">
  <span class="side-credit__title">“Passport” of an imaginary country</span>
  Concept, Visual Identity, Editorial Layout — Group Project · Adobe Lightroom, Adobe Illustrator
</p>
```
Place it as the first child of `.spread` or `.split__page` (a positioned parent). From 800px it is rotated along
the right edge, reading top to bottom; `--left` puts it on the left edge, reading bottom to top. Below 800px it is
plain inline text. Use it for the Tags and Tools lines from the README.

### Text block
```html
<div class="text-block"><h3 class="label">Brief</h3><p class="body">…</p></div>
```
- Label modifiers: `.label--caps` and `.label--arrow` (for the `Brief →` treatment).
- Body modifiers: `.body--sm`, `.body--justify` and `.body--light`.
- Also available: `.kicker` (italic subtitle) and `.meta-list` (tags).

### Media
```html
<figure class="media [media--cutout|media--shadow|media--device|media--cover] [bleed-right bleed-top …]">
  <img src="…" width="…" height="…" alt="…" loading="lazy" data-lightbox>
  <figcaption class="media__caption">…</figcaption>
</figure>
```
- Use `--cutout` (drop-shadow that follows the alpha) for `.webp` mockups.
- Use `--shadow` for flat covers and posters.
- Bleeds: `.bleed-left`, `.bleed-right`, `.bleed-x`, `.bleed-top`, and from 800px `.bleed-bottom` and `.overhang-right`.

### Collage / scatter
```html
<div class="collage collage--interactive [collage--shadow]" style="--ratio: 24 / 9">
  <figure class="collage__item" style="--x:1%; --y:4%; --w:17%; --r:-5deg; --z:2" data-reveal="tilt"><img …></figure>
</div>
```
From 800px items are positioned absolutely in percentages of the collage box. On mobile the collage is a staggered
2-column grid with half rotation. Use `.collage__item--wide` to span both columns on mobile. Keep rotations within
±8°. On paper with photos (Cubism p35), use no rotation.

### Photo wall
```html
<div class="photo-wall" style="--row: 2.6vw">
  <figure class="photo-wall__item" style="--c: 3 / span 2; --r: 1 / span 7; --z: 2"><img …></figure>
</div>
```
From 800px this is a 12-column grid whose row height is `--row`. Tiles may overlap, and `--z` sets which sits on
top. On mobile it is 2 columns, with every third tile at full width.

### Quote
```html
<blockquote class="quote [quote--sm]">
  <p><span class="quote__mark">“</span><span class="script-cap">T</span>radition helps you understand who you are. …”</p>
  <cite class="quote__cite">— Phạm Ngọc Thái Linh, artist</cite>
</blockquote>
```
The quote uses the accent colour. Override it with `--quote-color`.

### Pager (prev / next)
```html
<nav class="pager" aria-label="More projects">
  <a class="pager__link pager__link--prev" href="…">
    <span class="pager__dir"><span class="arrow arrow--left" aria-hidden="true"></span>Previous</span>
    <span class="pager__title"><span class="entry__num">(001)</span> “Carré Hermès” collection</span>
    <span class="pager__issue">Issue 01 — Illustration</span>
    <img class="pager__thumb" src="…" alt="" loading="lazy">
  </a>
  <a class="pager__link pager__link--next" href="…">…<span class="pager__dir">Next<span class="arrow" aria-hidden="true"></span></span>…</a>
</nav>
```
Order is project order across all Issues, and it wraps: the first project's "previous" is the last project and
the last project's "next" is the first. A `.pager__home` link below goes back to the project's Issue on the home page.

### Contact & site footer
```html
<section class="spread spread--dark contact" id="contact" style="--spread-h:auto">
  <div class="spread__body grid">
    <h2 class="cell display display--issue" style="--c:1 / span 7"><span class="display__line"><span class="script-cap">C</span><span class="type-cond">ONTACT</span></span></h2>
    <div class="cell" style="--c:9 / -1; --js:end"><img class="contact__seal" src="assets/brand/phq-seal.svg" alt="PHQ seal logo"></div>
    <div class="cell"><a class="contact__email" href="mailto:Quynhpham261097@gmail.com">Quynhpham261097@gmail.com</a></div>
    <ul class="cell meta-list"><li>Graphic Design</li><li>Illustration</li><li>Photography</li><li>UX-UI</li></ul>
  </div>
  <footer class="folio-bar">…</footer>
</section>
<footer class="site-footer">
  <img class="site-footer__signature" src="assets/brand/signature.svg" alt="Signature of PHAM Nhu Quynh">
  <div class="site-footer__bottom"><span>© 2025 PHAM Nhu Quynh — Graphic Design Portfolio</span><a href="#top">Back to cover ↑</a></div>
</footer>
```
Seal and signature images are inverted automatically inside `.spread--dark`. Use `.on-dark-invert` elsewhere.

### Lightbox (JS contract)
Put a single instance near the end of `<body>`:
```html
<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" hidden>
  <span class="lightbox__count"></span>
  <button class="lightbox__close" type="button">Close</button>
  <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image"><span class="arrow arrow--left" aria-hidden="true"></span></button>
  <figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>
  <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image"><span class="arrow" aria-hidden="true"></span></button>
</div>
```
Triggers are `img[data-lightbox]`. To open: remove `hidden`, add `.is-open` on the next frame, and move focus to
Close. To close: remove `.is-open`, then set `hidden` after about 300ms. Support Esc and the left/right arrow keys,
and return focus to the trigger. The style guide's inline script is the reference implementation.

### Reveal on scroll
Content is visible without JS. Once `<html class="js">` is set, `[data-reveal]` elements start hidden, and JS adds
`.is-revealed` via IntersectionObserver with `rootMargin: '0px 0px -40px 0px'`.
- Variants: `data-reveal` (up), `="left"`, `="right"`, `="fade"` and `="tilt"` (for collage items, which keeps their rotation).
- Stagger with `style="--reveal-delay:120ms"`.
- `prefers-reduced-motion` disables all motion.

Use reveal sparingly: titles, text blocks and collage items. Never apply it to the cover's first screen.

## 5. Page templates

### Home (`index.html`)
1. `.masthead`
2. `.cover`, which is the only `<h1>`
3. **About:** a `.spread.spread--fold` with the illustration `p02-1.webp` (`bleed-left`, 7 columns, bottom aligned), the seal at 8/span 2, the signature at the top right and the three About paragraphs in `.body--sm.body--justify` at 9/span 4 (PDF p2)
4. Five `.issue` openers (`#issue-1`…`#issue-5`), each with its title, pill, entries and `.folio-bar`. Issue 4 has no correct opener in the PDF (p28 repeats the ILLUs title), so use `U·X– / UI` with the Issue 4 pill. Issue 3 has a single entry; give it a big thumbnail (`--thumb-w: 18rem`) and the pink kicker "EARTH, WIND, WATER & FIRE: Modular typeface conception" (PDF p25).
5. `.contact` (dark) followed by `.site-footer`
6. The `.lightbox` instance

### Project case study (`projects/<issue>/<project>/index.html`)
1. Start with `<body style="--accent:…">` and the `.masthead`, with the parent Issue marked `aria-current`.
2. **Hero spread:** the first PDF spread for the project, rebuilt in HTML. The project `<h1>` is a `.display--project` with a script capital. Use the ground and layout from the table below, add the `Brief` / `Intention` text blocks, and put the Tags and Tools in a `.side-credit`. The folio bar shows the printed page numbers and `Issue 0N | Discipline`.
3. **Following spreads:** one section per remaining PDF spread, mirroring its layout with `.grid` cells, `.split`, `.collage` or `.photo-wall`. Every README text section becomes a `.text-block`. The rendered `pages/spread-NN.jpg` files are layout references only; do not display them as images, except where noted below.
4. `.pager`, then `.site-footer` and the `.lightbox`.

## 6. Per-project art direction

| # | Folder | Ground | Accent | Layout idea (from PDF) | Feature images |
|---|---|---|---|---|---|
| 1.1 | `01-illustration/01-carre-hermes` | charcoal hero → full pink spread (`--pink`, ink text) | `--pink` #ef7eaf | p4: Brief top-left, title `“C·ARRÉ / H·ERMÈS” Collection` with aside, hanging scarf bleeding top-right, stacked scarves bottom-left + Intention. p5 pink ground: three scarf squares in 3 columns, each with a bold caption and text (Lý dragon / Nghê / Thọ), signature top-centre | `p04-2` (hero), `p04-6`, `p05-1` `p05-2` `p05-3` |
| 1.2 | `01-illustration/02-comis-strip-mother-goddess` | split: artwork page / paper → charcoal quote spread | `--magenta` #d45e94 | p6: `.split` with full-bleed poster left; right `C·OMIS / S·tRIP` + "Mother Goddess Worship" aside, `Brief →`, About + line sketch. p7: dark, sketch `p07-3` as a ghosted right page, Creative Intention top-left, giant pink `.quote` across the bottom | `p06-1`, `p06-2`, `p07-3` |
| 1.3 | `01-illustration/03-fresco-hat-boi` | paper | `--magenta` | p8: Creative Intention top-left; title `F·RESCO` (condensed caps on pink highlight blocks) mid-left + “–Traditional Vietnamese Opera” italic; artwork square bleeds on the right page | `p08-1` |
| 1.4 | `01-illustration/04-book-covers-vietnamese-stories` | `--orange` ground → paper | `--orange`; title/labels `--accent-label:#ffe14d` | p9: orange spread, `BOOK COVERS` in yellow expanded caps, each cover with a caps story title + body, zig-zag with orange arrows (5 × `.grid` rows alternating sides). p10: paper, scattered overlapping hardcover mockup (use `p10-1` large, bleeding) | `p09-1…5`, `p10-1` |
| 1.5 | `01-illustration/05-tarot-freaky-folklore-monster` | charcoal | `--yellow` title, `--teal` script title | p11: kicker "Vietnamese Folk Tradition", yellow `Freaky Folklore Monster`, teal `T·AROT`; box mockup left, fanned cards right, text bottom-right | `p11-1`, `p11-2` |
| 2.1 | `02-graphic-design/01-gangnam-restaurant` | charcoal → paper/pink → full-bleed menus | `--blue-deep` #1877b2 labels; Obangsaek swatches | p13: dark, Project Brief top-left, big blue `GANG / NAM` expanded + italic, logo board on right page, blue arrow. p14: Graphic Principle Board image left, pink right page with Creative Intention. p15: logo grid on paper + dark sign photo. p16: pink collage of merchandise + tins bleeding. p17: menu spread full-bleed | `p15-1` (sign), `p14-1` `p14-2` `p14-3`, `p16-1…10`, `p17-1` (`p14-6/7/8` are dark background strips) |
| 2.2 | `02-graphic-design/02-passport-eunoia` | `--blue` → charcoal | `--blue`; labels pastel pink `#f7b6d8` | p18: blue spread, `P·ASSPORT / Project`, Creative Intention bottom-left, passport cover on right page, `.side-credit`. p19: dark, 3×2 grid of interior page mockups + short text bottom-right | `p18-1`, `p19-1…9` |
| 2.3 | `02-graphic-design/03-beyond-space-magazine` | charcoal → split paper/orange → dark scattered | `--orange` | p20: cover left (with `.side-credit--left`), `“B·EYOND / S·PACE” Magazine` in orange right with Project Brief + big bold arrow. p21: paper left with article mockup overlapping onto orange right page (`.split` + `overhang-right`), Artistic Direction + Target Audiences. p22: dark full-bleed rotated spreads collage | `p20-1`, `p20-6`, `p21-*`, `p22-*` |
| 2.4 | `02-graphic-design/04-forgotten-dreams-map` | charcoal (single page) | `--blue-deep` | p23 left: poster large, `.side-credit--left` "CARTOGRAPHY/SUBJECTIVE MAPPING", Creative Intention bottom. Pair with 2.5 as a `.split` look if desired | `p23-1` |
| 2.5 | `02-graphic-design/05-agent-orange-poster` | charcoal (single page) | `--red` #e2412a | p23 right: one-line intention top, poster centred, red rotated side credit | `p23-2` |
| 2.6 | `02-graphic-design/06-parasite-poster` | split: framed poster photo full-bleed left / paper right | `--crimson` | p24: photo of poster against concrete left; flat poster right with `.side-credit` "MOVIE POSTER: PARASITE", Intention bottom-right | `p24-1`, `p24-2` |
| 3.1 | `03-typography/01-bubble-cluster-typeface` | paper → charcoal → full-bleed pink alphabet | `--magenta` + `--blue` | p25: `T·YPO- / graphy` opener energy, pink caps kicker "EARTH, WIND, WATER & FIRE…", text right page. p26: dark, blue caps title, specimen poster grid (`p26-1…12` in a 4-col tight grid). p27: alphabet `p27-1` full-bleed | `p26-*`, `p27-1` |
| 4.1 | `04-ux-ui/01-britanica-type-specimen` | paper → mid grey `#5d5d5c` | `--signal-red` + `--royal` | p29: laptop photo bleeding top-left, phone mockup right, Brief bottom-left, Choice text top-right. p30: row of mobile screens + stacked laptop screens on grey | `p29-1`, `p29-2`, `p30-1…4` (`.media--cutout`) |
| 4.2 | `04-ux-ui/02-mid-autumn-festival` | `--orange` → charcoal | `--orange`; site red `#7a0c0c`/gold `#f2a23a` | p31: orange, intention top-left, "Event Identity: Mid-Autumn Festival" title top-right, dark laptop photo bottom-right, `.side-credit`. p32: 4 phone screens in a row on dark | `p31-1`, `p32-1…4` |
| 5.1 | `05-photography/01-cubism-portrait` | paper | `--jade` (sparingly) | p34: text top-left small, portrait `p34-*` right page. p35: `.collage` scatter of 8 shots, no rotation, some bleeding edges. p36: final portrait `p36-1` full-bleed left page, empty paper right | `p34-1`, `p35-1` … `p35-6`, `p36-1` |
| 5.2 | `05-photography/02-autumn-theme` | paper | `--ochre` (folio strip only) | p37: `.photo-wall` of 10 tiles abutting/overlapping, edges bleed; no body text | `p37-*` |
| 5.3 | `05-photography/03-color-grading` | paper | `--jade` | p38: three tall images, asymmetric: left bleeds top, middle higher/shorter, right large bleeding right & bottom | `p38-1…3` |
| — | `00-about` | paper | ink | Home cover + About (see templates); seal `page-40` and signature `spread-39` become footer marks | `p02-1`, brand SVGs |

## 6b. Languages (EN / FR)

Both languages live in the same HTML file (no `/fr/` copies, no fetch, works from `file://`). The rules are in `CLAUDE.md`.

**Markup pattern**
```html
<!-- block text: duplicate the element, same classes and inline custom properties -->
<p class="cell body" style="--c: 4 / -1" data-l="en" lang="en">Create an illustrated poster…</p>
<p class="cell body" style="--c: 4 / -1" data-l="fr" lang="fr">Créer une affiche illustrée…</p>

<!-- short inline strings (labels, pills, folio strips, quotes in display titles): two sibling spans -->
<h2 class="label"><span data-l="en" lang="en">Creative Intention</span><span data-l="fr" lang="fr">Intention créative</span></h2>

<!-- attributes: English in the attribute, French in data-fr-* (script.js swaps them) -->
<img src="…" alt="Pink silk scarf…" data-fr-alt="Carré de soie rose…">
<h1 aria-label="Passport Project" data-fr-aria-label="Projet Passport">…</h1>
<title data-fr-title="…">…</title>  <meta name="description" content="…" data-fr-content="…">
```
- Never duplicate images or layout, only text. An element that carries an `id` (headings used by `aria-labelledby`) is not duplicated: put the two spans inside it.
- In display titles duplicate only what differs (`graphy` / `graphie`, “ ” / « »). Project titles and proper nouns stay as they are.
- CSS hides the inactive language from `<html data-lang>`; with no attribute (JS off) English shows. `styles.css` §23 also cancels the sibling margin a first French paragraph would inherit from its hidden English twin.
- French typography: a no-break space before `:` and inside « », a narrow no-break space before `; ! ?`.

**Detection** (inline `<script>` in `<head>`, right after `<title>`, before the stylesheet): `localStorage.lang` if it is `fr`/`en`, else `fr` when one of the first two `navigator.languages` starts with `fr` (fr-FR, fr-BE, fr-CH, fr-CA…), else `en`. It sets `lang`, `data-lang` and swaps `document.title`.

**Language switch** (masthead, after Contact)
```html
<div class="lang-switch" role="group" aria-label="Language" data-fr-aria-label="Langue">
  <button class="lang-switch__btn" type="button" data-set-lang="fr" lang="fr" aria-pressed="false">FR</button>
  <span class="lang-switch__sep" aria-hidden="true">/</span>
  <button class="lang-switch__btn" type="button" data-set-lang="en" lang="en" aria-pressed="true">EN</button>
</div>
```
Space Grotesk small caps in grey ink, with the active language in charcoal, weight 500 and underlined. It is hidden without JS. On click `script.js` saves the choice, updates `lang` / `data-lang` / `aria-pressed`, swaps the attributes and title, and fires a `langchange` event (the lightbox refreshes its caption). The lightbox button labels are bilingual in the markup.

**Vocabulary:** Issue → Numéro · Graphic Design → Design graphique · Typography → Typographie · Photography → Photographie · Creative Intention → Intention créative · Project Brief → Brief du projet · Target Audiences → Publics cibles · Artistic Direction → Direction artistique · Deliverables → Livrables · Previous / Next → Précédent / Suivant · Back to Issue 02 → Retour au numéro 02.

## 7. Asset notes
- The paper-grain overlays that the first extraction saved as images (Cubism `p34-3`, `p35-9`, `p35-10`, `p35-12`,
  `p35-13`; Gangnam `p15-4`, `p16-11`; Passport `p18-6`) have been **deleted**. Nothing needs re-extraction:
  the real photos are the remaining files. The Gangnam sign photo is `p15-1.jpg`, the Cubism shots are `p34-1` and
  `p35-1` … `p35-6`, and the final Cubism portrait is `p36-1`.
- `00-about/images/p01-1.jpg` is the cover's paper texture, not artwork. Use the CSS paper texture instead.
- Gangnam `p14-6.jpg`, `p14-7.jpg` and `p14-8.jpg` are plain dark background strips from the Graphic Principle Board.
  The logo, logo grid, palette and typeface panels on p13–15 are vectors, so they were rendered from the PDF as
  `board-logo-p13.jpg`, `board-graphic-principles-p14.jpg` and `board-logo-grid-p15.jpg` (cropped without PDF folios
  or side text). The case study uses these renders, and the sign photo `p15-1.jpg` sits beside the logo grid, as in the PDF.
- Beyond Space `p20-6.jpg` is the empty plastic sleeve used as the "Back cover" image.

## 8. Do / don't
- **Do** leave generous empty paper. A spread with two elements is fine.
- **Do** keep body text in narrow columns (32–45ch) set small.
- **Do** bleed artwork off at least one edge on most spreads.
- **Don't** use rounded cards, drop-shadowed UI panels, gradients, icons, or buttons with fill colour.
- **Don't** use the script font for anything other than one initial capital per title.
- **Don't** invent copy. All text comes from the project READMEs.
- **Don't** display the `pages/spread-*.jpg` renders as a substitute for rebuilding a layout.
