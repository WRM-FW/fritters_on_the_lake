# Fritters on the Lake — website

Static, mobile-first site for **Fritters on the Lake**, a family owned apple
fritter bakery at 217 King Street, Niagara-on-the-Lake, Ontario.

No build step, no dependencies: `index.html`, one stylesheet, one small script.
Deployed as-is on GitHub Pages.

```
index.html
assets/css/styles.css
assets/js/app.js
assets/img/            webp + jpg, plus app icons
favicon.svg  manifest.webmanifest  .nojekyll
```

## Run it locally

Open `index.html` directly, or serve the folder:

```
python -m http.server 8000
```

## What is on the page, and where it came from

Everything factual on the site is traceable to the material package, the
restaurant's own Instagram posts, its Google Maps listing, or the *Niagara This
Week* article framed in the shop. The verification log — including the claims
that were **dropped** because they could not be confirmed — lives in
[`docs/verified-facts.md`](docs/verified-facts.md).

Short version:

| Item | Value | Source |
| --- | --- | --- |
| Address | 217 King St, Niagara-on-the-Lake, ON L0S 1J0 | Google Maps listing, Niagara This Week, TasteToronto |
| Phone | +1 905-246-2312 | Google Maps listing (`tel:+19052462312`) |
| Hours | Thu–Sun 10:00 am – 5:00 pm; Mon–Wed closed | the shop's own "Opening Hours" card on Instagram |
| Menu + prices | Dozen $29.00 · Half dozen $18.50 · Lake Special $12.50 · Double $7.50 · syrups $2.50 · Water $3.50 / Perrier $4.00 / Soda $3.50 | photo of the counter board (July 2026) |
| Rating | 4.9 · 643 reviews | Google Maps listing |
| Order link | Google "Order online" action for this place | provided in the brief; matches the listing's own button |

## Images

The material package contained no standalone photo files — only screenshots of
the restaurant's Instagram profile and its Google Maps photo gallery, plus a
metadata-only research package. Every image on the site is cropped from those
screenshots, so they are the restaurant's real photos at the resolution the
screenshots allow (large images ~900 px wide; the small gallery tiles are
~230 px, shown at that size). Swapping in original files, when available, is
the single biggest upgrade the site can get.

## Notes for whoever maintains this

- Colours are sampled from the shop's signage: sign green `#5C8547`, cream
  `#FBF7EE`, cinnamon `#A9682E`. The research package described a red-apple
  palette; the actual signage and packaging are green with a white apple mark.
- Hours are seasonal (winter is shorter, and the shop closes for a few weeks
  each spring). `assets/js/app.js` computes open/closed in `America/Toronto`
  from the posted Thursday–Sunday schedule only — update the `OPEN` map if the
  shop changes its hours, and keep the "check Instagram" wording.
- All asset paths are relative, so the site works under the
  `/fritters_on_the_lake/` project-pages subpath. Absolute URLs in
  `<link rel="canonical">`, the Open Graph tags and the JSON-LD assume
  `https://wrm-fw.github.io/fritters_on_the_lake/`; update them if the site
  moves to a custom domain.
