# Evergrow Electrical Service, marketing site

Static site. No framework, no build step. Open `index.html` or serve the folder.

```
python3 -m http.server 8917   # then http://localhost:8917
```

## One page

The whole site is `index.html`, plus `404.html` for stray links. Five separate
pages were collapsed into one after the content turned out to be thinner than the
structure. Sections carry ids and the nav is anchors:

| Anchor | Section |
|---|---|
| `#capability` | The capability schedule |
| `#trade` | Main contractors and ID firms |
| `#business` | Businesses and building owners |
| `#homes` | Homeowners |
| `#contact` | Contact |

The old `subcontract.html`, `commercial.html`, `residential.html` and
`contact.html` are in git history at commit `dc57ef6` if they are ever wanted back.

`css/site.css` holds the whole design system. `js/site.js` runs the EN / 中文 toggle
and the mobile action dock. `sitemap.xml`, `robots.txt` and the `LocalBusiness`
JSON-LD in `index.html` handle discovery.

The dock is the sticky WhatsApp / Call bar on phones. It appears only when no
in-page contact link is on screen, so it never sits under a button already visible.

## Language

Every translatable node carries `data-en` and `data-zh`. The toggle swaps `textContent`
and sets `<html lang>`; the choice persists in `localStorage`. To add copy, add both
attributes. A node with `data-en` and no `data-zh` will not translate.

## Design system

Deep earth green surface with a copper accent. Green from the firm's name and the
protective earth conductor, copper from the material inside every cable. Type is
Archivo, one family, using its expanded heavy weights for headings so they read like
equipment nameplates. Noto Sans SC carries Chinese.

All colour tokens are OKLCH and every text pair was checked against WCAG AA.
Nothing on the site is set below 16px.

## Still to supply

These are marked on the pages with dashed copper boxes. They are deliberately empty
rather than filled with plausible guesses.

- [ ] **Logo.** Currently a text wordmark in `.wordmark`. Swap the text for an image; the slot is sized for it.
- [ ] **Real job photos.** Two stock images are in use (`index.html`, opening and continuity blocks). Replace with Evergrow's own as soon as they arrive.
- [ ] **Works log** (`index.html`). Five to ten real jobs, one line each: type of work, building type, area.
- [ ] **bizSAFE level and BCA CRS registration and grade** (the `#trade` section). Main contractors screen on both.
- [ ] **Office address, business hours, out of hours availability, registered company name and UEN.**
- [ ] **Chinese company name**, if the firm has a registered one. The 中文 pages currently use "Evergrow Electrical Service" as-is.
- [ ] **A price signal for homeowners.** The residential page promises "a realistic range" but the site never gives one. Cost is the first thing a homeowner screens on, and its absence is the largest remaining gap on the direct-consumer side. A callout fee, or a from-price on two or three common jobs, would close it.
- [ ] **Address and business hours in the structured data.** `index.html`'s JSON-LD deliberately omits `address`, `openingHours` and `priceRange`. Local search ranking wants all three.
- [ ] **Licensing wording review** (the `#business` and LEW sections). The LEW and installation licence copy describes Singapore's regime in general terms. Read it once and correct anything that does not match how the firm actually operates.

## Before going public

`<meta name="robots" content="noindex, nofollow">` sits in every page, flagged with a
comment. Remove that line from `index.html` once the placeholders are filled. If a
custom domain is added at the apex, also change `/evergrow-site/` to `/` in `404.html`
and update the URLs in `sitemap.xml`, `robots.txt` and the JSON-LD.

## Deliberately left out

Not claimed anywhere on the site, pending confirmation:

- EV charger installation
- Fire alarm work
- Data and communications work

## Content rules

No emoji, SVG icons only. No em or en dashes. No claims about competitors. No credential
that has not been confirmed. `EMA-licensed` is stated without a licence number.

## Checks

```
node <impeccable>/scripts/detect.mjs index.html subcontract.html commercial.html residential.html contact.html css/site.css
```

Verified at 1440px and 390px, in English and 中文, across all five pages: no horizontal
overflow, no console errors, no sub-16px text, no untranslated nodes.
