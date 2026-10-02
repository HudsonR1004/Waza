# Images — what goes where

Drop the photos from `01 - Branding & Marketing/product photos` in here using
these exact filenames. Every slot shows a branded kraft card until its file
exists, so nothing on the site ever looks broken while you're filling them in.

| File | Where it shows | Size (px) | Notes |
|---|---|---|---|
| `logo.png` | Nav, footer, thank-you page, favicon fallback | 512×512, transparent | Already on the live site. Keep it. |
| `og.jpg` | Link previews on Facebook, Instagram, iMessage, WhatsApp | **1200×630** | Your best lifestyle shot: pouches on a board, bit of kraft. Under 300 KB. |
| `products/hero.jpg` | Big hero photo, top of the home page | 800×1000 (portrait) | Open bag, strips spilling out. This is the money shot. |
| `products/honey-sriracha.jpg` | Honey Sriracha flavour card | 800×600 | The 50g pouch, front label visible. |
| `products/magic-chilli.jpg` | Magic Chilli flavour card | 800×600 | The 50g pouch, front label visible. |
| `products/bundle-basic.jpg` | Basic Bundle card | 800×500 | Four pouches together. |
| `products/bundle-smoko.jpg` | Smoko Run card | 800×500 | Ten pouches, or a satchel full. |
| `products/bundle-junkie.jpg` | Jerky Junkie card | 800×500 | Twenty pouches, the whole batch. |
| `products/made-1.jpg` | How it's made, step 1 | 800×600 | Slicing the topside. |
| `products/made-2.jpg` | How it's made, step 2 | 800×600 | Rubbing the seasoning in. |
| `products/made-3.jpg` | How it's made, step 3 | 800×600 | Finished strips on the dehydrator tray. |

## Compress before you upload

Phone photos are 3–8 MB each; the site wants them under ~200 KB. Run this from
the site folder (needs ImageMagick, which ships with macOS Homebrew: `brew install imagemagick`):

```sh
./scripts/optimise-images.sh
```

It resizes anything in `images/` to a sensible max width, strips camera metadata,
re-saves JPEGs at quality 82, and writes a `.webp` next to each one. Or use
[squoosh.app](https://squoosh.app) in the browser, one photo at a time.

## Alt text

Every `<img>` on the site already has descriptive alt text. If you swap a photo
for something different (say, the hero becomes a shot of Jasper slicing), update
the `alt` on that tag in `index.html` so it still describes what's in the picture.
