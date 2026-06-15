# CLAUDE.md
This project is a personal website where I (Evgeny Chernov) share my experience working as
a machine learning and artificial intelligence engineer.

It's a static site hosted on GitHub Pages (a user site published at
https://euchernov.github.io). See https://docs.github.com/en/pages/quickstart

## Architecture
Plain static site — **no build step, no framework, no Jekyll**. GitHub Pages serves the
files at the repo root as-is.

- `index.html` — the entire site: a single page with `header`, `hero` (intro + contact
  chips), `About`, `Experience` (company/project cards), and `footer`.
- `styles.css` — all styling. Theming is driven by CSS custom properties on `:root`, with a
  `[data-theme="dark"]` block overriding them for dark mode. Layout is responsive/mobile-first.
- `main.js` — small, dependency-free: dark/light theme toggle (persisted in `localStorage`,
  honors `prefers-color-scheme` on first visit) and the auto-updating footer year. A tiny
  inline script in `index.html`'s `<head>` sets the theme before first paint to avoid a flash.
- `.nojekyll` — tells GitHub Pages to skip Jekyll and serve files as-is.
- `README.md` — short English repo description (also the GitHub repo landing page).
- `refs/rus/` — the **Russian source of truth** for all site content.

Icons (theme toggle, home button, contact chips) are inline SVGs using `currentColor`, so
they inherit theme colors. There is no image/asset pipeline.

## Conventions
- Keep it dependency-free and buildless. New content goes into the existing
  `index.html` sections; reuse the established classes (`.card`, `.company__*`,
  `.project__*`, `.contact-bar`, `.btn`, `.section*`) and CSS variables rather than adding
  ad-hoc styles or colors.
- Any new color must work in **both** light and dark themes (define it as a variable in
  `:root` and `[data-theme="dark"]`).
- Interactive controls need an `aria-label`; new SVGs get `aria-hidden="true"`.

## Content rule (important)
The website content must stay in sync with the Russian source in `refs/rus`. When you add
or change visible content, update **both** the Russian source (`refs/rus/readme_rus.md`) and
its English rendering in `index.html`. See full rules below.

## Preview
No build needed. Serve locally and open in a browser:
```
python3 -m http.server 8000   # then visit http://localhost:8000
```
Verify: theme toggle works and persists across reloads, layout is responsive, and the copy
matches `refs/rus`.

## Rules
The rules can be found in @RULES.md
