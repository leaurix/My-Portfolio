# Louis Yvan Alcayde: Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript, no build step.

- `index.html`: page content
- `styles.css`: all styling
- `script.js`: all interactive features
- `resume.pdf`: downloadable resume (replace this file to update it)
- `favicon.svg`, `favicon.png`: browser tab and home-screen icons
- `og-image.png`: preview image shown when the link is shared

## Preview locally

Open `index.html` in any browser.

## Editing

- **Skills board:** edit the `PARTS` object at the top of `script.js` (title, description, skill chips, "Used in" links).
- **Experience / Projects / Education:** plain HTML in those sections of `index.html`. Give each project a `data-tags` value to match the filter buttons (`FILTERS` in `script.js`).
- **Colours and fonts:** CSS variables in `:root` at the top of `styles.css`. Dark mode values sit just below.

## Setup after hosting

1. **Share preview:** in `index.html`, change `og:image` to the full URL of `og-image.png` (LinkedIn and Discord ignore relative paths).
2. **Contact form:** create a free form at [formspree.io](https://formspree.io), then paste its ID into `FORMSPREE_ID` near the middle of `script.js`. Until then the form opens the visitor's email app.
3. **Project links:** each project in `index.html` has a commented-out link. Uncomment it and add the repo or demo URL.

## Features

- Interactive circuit board: each part is a skill area. Link straight to one with `#skills-qa`, `#skills-hw`, `#skills-code` etc.
- Expandable experience timeline; "Used in" links jump to and highlight the matching role or project.
- Thesis section with a live CPU scheduling demo (FCFS, SJF, Round Robin) and Gantt chart.
- Project list with filters.
- Resume download in the header and hero; contact form (Formspree, with an email-app fallback).
- Sticky header with active-section highlight and scroll progress bar.
- Light/dark mode, print-friendly layout, social share tags, responsive, respects reduced motion.

## Publishing

GitHub Pages on a **private** repo needs a paid GitHub plan (Pro, Team or Enterprise). On a free plan, make the repo public or deploy with Netlify, Vercel or Cloudflare Pages.
