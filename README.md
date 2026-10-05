# Louis Yvan Alcayde: Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript, no build step.

- `index.html`: page content
- `styles.css`: all styling
- `script.js`: board, greeting, copy-email and theme toggle

## Preview locally

Open `index.html` in any browser.

## Editing

- **Skills board:** edit the `PARTS` object at the top of `script.js` (title, description, skill chips, "Used in" links).
- **Experience / Education:** plain HTML in the `#experience` and `#education` sections.
- **Colours and fonts:** CSS variables in `:root` at the top of `styles.css`. Dark mode values sit just below.

## Features

- Interactive circuit board: each part is a skill area; selecting one lights its traces and shows details.
- Expandable experience timeline; "Used in" links jump to and highlight the matching role.
- Greeting switcher (English, Filipino, Russian), copy-email button, light/dark mode.
- Responsive down to phone width; respects reduced-motion settings.

## Publishing

GitHub Pages on a **private** repo needs a paid GitHub plan (Pro, Team or Enterprise). On a free plan, make the repo public or deploy with Netlify, Vercel or Cloudflare Pages.
