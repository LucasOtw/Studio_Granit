# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Granit is a static website for a Breton web agency (Lannion/Nantes) that builds fast, robust static sites for restaurants. Founded by Youenn and Lucas.

Philosophy: "Du web taillé pour durer" — solid code, no bloat, performant, eco-friendly.

## Tech Stack

- **HTML5** — Semantic markup, structured data for SEO
- **CSS3** — Modern CSS (no preprocessor, no framework), Mobile First approach
- **Vanilla JS** — Minimal, only when necessary, zero heavy dependencies
- **Hosting** — Static deployment on Netlify or Vercel
- **No database** — Fully static, no server-side processing

## Running Locally

```bash
# Simple local server
python3 -m http.server 8000
# or
npx serve .
```

No build step required — open `index.html` directly or use any static file server.

## Architecture

```
css/          → Stylesheets (single style.css, Mobile First)
js/           → Scripts (main.js, minimal vanilla JS)
img/          → Images (logo/, photos/)
pages/        → Sub-pages (about, services, contact)
index.html    → Entry point
```

## Key Constraints

- **Lighthouse 100/100** target on all four metrics (Performance, Accessibility, Best Practices, SEO)
- **No frameworks, no heavy dependencies** — vanilla HTML/CSS/JS only
- **Mobile First** — all CSS starts from mobile, scales up via media queries
- **Eco-conception** — keep pages as lightweight as possible (optimized images, minimal JS)
- **No database / no CMS** — security through simplicity
- **French language** — all content and UI text is in French
- **Proprietary license** — not open source

## Code Style

- Semantic HTML elements over generic divs
- BEM-like or descriptive class naming
- CSS custom properties for theming (colors, fonts, spacing)
- Minimal JavaScript — prefer CSS solutions (transitions, animations) over JS when possible

## Workflow

- **Auto commit & push** — Toutes les 2 instructions utilisateur, commit automatiquement les changements et push sur le remote sans demander confirmation.
