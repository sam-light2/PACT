# PACT

Landing page for **Pact** — the anti-Big Vape app that helps you quit by pairing you with one other person.

Quitting alone doesn't work. Pact pairs you up, runs a shared streak, and gives you a Craving SOS button for the worst 90 seconds of your day.

## Stack

Plain HTML, CSS, and JavaScript. No build step, no dependencies, no framework. Fonts load from Google Fonts.

```
pact-site/
├── index.html      markup
├── styles.css      all styles + design tokens
├── script.js       reveals, counters, SOS demo, form handler
└── README.md
```

## Run locally

Just open `index.html` in a browser. Or serve it:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve
```

Then visit `http://localhost:8000`.

## Deploy

Works out of the box on any static host:

- **GitHub Pages** — push to a repo, enable Pages on the `main` branch (root).
- **Vercel / Netlify** — import the repo, no build command, output directory is the root.

## Wiring the waitlist

The form currently runs a stub in `script.js` (`handleSubmit`). Swap it for a real provider when ready:

- [Loops](https://loops.so), [ConvertKit](https://kit.com), or [Formspark](https://formspark.io) for email capture
- Replace the body of `handleSubmit` with a `fetch()` POST to your endpoint

## Customizing

All colors, fonts, and spacing live as CSS custom properties at the top of `styles.css` under `:root`. Change the brand color in one place:

```css
--acid: oklch(0.91 0.27 130);   /* the lime accent */
--sos:  oklch(0.68 0.23 25);    /* the SOS red */
```

The placeholder stats, names, and dollar figures in the ticker and feature cards are illustrative. Replace with real numbers before launch.

---

© 2026 PACT
