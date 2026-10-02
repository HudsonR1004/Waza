# Krama's Jerked Beef — website

Live at **https://kramasjerkedbeef.com.au** (Netlify site `f6d85eb0-1058-4757-a9a1-6ad02984cefe`).
Static HTML, no build step. Five pages, one stylesheet, one script, one config file.

```
kramas-jerked-beef/
├─ index.html          home: hero, flavours (tap for ingredients + NIP), bundles, monthly, how it's made, newsletter, contact
├─ thanks.html         Stripe redirects here after payment
├─ 404.html            custom not-found page (Netlify serves it automatically)
├─ privacy.html        privacy policy
├─ terms.html          terms & conditions (shipping, subscriptions, refunds, allergens)
├─ css/site.css        every page's styles
├─ js/config.js        ← THE ONLY FILE YOU EDIT: Stripe links, MailerLite IDs, flavours/NIP, contact, analytics
├─ js/site.js          behaviour (mobile menu, flavour panels, ship date, newsletter, Stripe buttons)
├─ images/             logo + product photos — see images/README.md for the exact filenames
├─ favicon.svg, site.webmanifest, robots.txt, sitemap.xml
├─ netlify.toml        forces HTTPS + apex domain, security headers, caching, 404
└─ scripts/optimise-images.sh   shrinks photos before upload
```

## Before you deploy (do these in order)

1. **Stripe links** — open `js/config.js`, paste the 5 live Payment Links into `STRIPE_LINKS`.
   Until each one is filled, its button reads "Coming soon" rather than going nowhere.
2. **Magic Chilli label** — in `FLAVOURS.magicChilli`, paste the ingredients line, allergen statement
   and the per-100g numbers off the back sticker. The panel on the site builds the FSANZ-style
   nutrition table from those numbers (per-serve is calculated for a 25g serve). Until then the
   panel says the label is being finalised and offers an email link.
3. **Photos** — drop them into `images/` using the names in `images/README.md`, then run
   `./scripts/optimise-images.sh`. Every slot shows a kraft placeholder card until its file exists.
   `images/og.jpg` (1200×630) is what Facebook / iMessage / WhatsApp show when someone shares the link.
4. **MailerLite** — paste the account ID and form ID into `MAILERLITE`. Sign-ups also land in
   Netlify Forms regardless, so nothing is lost while this is empty.
5. **Analytics (optional)** — set `ANALYTICS.domain` to turn on Plausible (cookie-free, so no banner
   needed). Or switch on Netlify Analytics in the dashboard and leave this blank.

## Deploy

From this folder on the laptop that's logged in to Netlify CLI:

```sh
netlify deploy --prod --dir .
```

## Launch checklist (what's already handled)

- No horizontal scroll at 320–1366px, tested in Chromium on every page
- Mobile hamburger menu; logo links home; phone and email are tap-to-call / tap-to-email
- Unique title + meta description, Open Graph + Twitter cards, canonical URLs, JSON-LD on every page
- Favicon (SVG + PNG + apple-touch-icon + web manifest)
- Custom 404, privacy policy, terms & conditions, footer links to all of them
- robots.txt + sitemap.xml (thanks page is noindex)
- HTTPS forced, www → apex, HSTS, CSP and other security headers via `netlify.toml`
- Newsletter form: inline validation, success + error messages, honeypot spam trap, Netlify Forms backup
- Stripe buttons never render as dead links; Payment Links are public URLs (no secrets in the frontend)
- Colour contrast checked: small red text uses the deeper red (4.56:1 on kraft)
- Copyright year updates itself; alt text on every image; `loading="lazy"` on below-the-fold photos
- One primary call to action: **Order**, in the nav, the hero and every bundle card

## Legal pages

`privacy.html` and `terms.html` are written for a small SA food business selling online with Stripe,
Australia Post and MailerLite. They're a solid starting point, not legal advice — worth a once-over
by someone qualified before you lean on them.
