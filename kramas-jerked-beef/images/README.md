# Images — what's in place and what's still to come

Every slot shows a branded kraft card until its file exists, so nothing on the
site looks broken while a photo is missing.

| File | Where it shows | Status |
|---|---|---|
| `og.jpg` (1200×630) | Link previews on Facebook, Instagram, iMessage, WhatsApp | ✅ cropped from the doorstep box shot |
| `products/honey-sriracha.jpg` | Honey Sriracha flavour card | ✅ |
| `products/magic-chilli.jpg` | Magic Chilli flavour card | ✅ red-background pouch shot |
| `products/bundle-basic.jpg` | Basic Bundle card | ✅ Honey Sriracha pouch with honey dipper |
| `products/bundle-smoko.jpg` | Smoko Run card | ✅ doorstep box of pouches |
| `products/bundle-junkie.jpg` | Jerky Junkie card | ✅ Magic Chilli at sunset over the vines |
| `products/label-magic-chilli.jpg` | Not shown on the site; kept as the source for the Magic Chilli NIP in `js/config.js` | ✅ |
| `logo.png` (512×512, transparent) | Hero label, nav, footer, thank-you page, favicon | ✅ |
| `products/made-1.jpg` (800×600) | How it's made, step 1: slicing the topside | ⬜ |
| `products/made-2.jpg` (800×600) | How it's made, step 2: rubbing the seasoning in | ⬜ |
| `products/made-3.jpg` (800×600) | How it's made, step 3: finished strips on the tray | ⬜ |

A `.webp` sits next to every JPEG. Browsers that support it get the smaller
file automatically where the HTML uses `<picture>`; otherwise the JPEG is served.

## Adding or replacing a photo

Drop it in with the filename above, then run from the site folder:

```sh
./scripts/optimise-images.sh
```

That resizes to a sensible maximum, strips camera metadata, re-saves at
quality 82 and writes the matching `.webp`. If you swap a photo for something
different, update the `alt` text on that `<img>` in `index.html` so it still
describes what's in the picture.
