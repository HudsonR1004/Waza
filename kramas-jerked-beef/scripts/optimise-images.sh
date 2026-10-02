#!/usr/bin/env bash
# Resize, strip metadata and re-compress every JPEG/PNG under images/, and
# write a WebP copy beside each. Safe to re-run; originals are backed up once
# to images/.originals/ the first time they're touched.
set -euo pipefail
cd "$(dirname "$0")/.."
command -v magick >/dev/null 2>&1 || command -v convert >/dev/null 2>&1 || {
  echo "ImageMagick not found. Install it (brew install imagemagick) or use https://squoosh.app"; exit 1; }
IM=$(command -v magick || command -v convert)
mkdir -p images/.originals
find images -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) ! -path 'images/.originals/*' | while read -r f; do
  rel=${f#images/}
  bak="images/.originals/$rel"
  [ -f "$bak" ] || { mkdir -p "$(dirname "$bak")"; cp "$f" "$bak"; }
  case "$rel" in
    og.jpg)       max=1200 ;;
    logo.png)     max=512 ;;
    products/*)   max=1200 ;;
    *)            max=1600 ;;
  esac
  "$IM" "$bak" -auto-orient -strip -resize "${max}x${max}>" -quality 82 "$f"
  "$IM" "$bak" -auto-orient -strip -resize "${max}x${max}>" -quality 80 "${f%.*}.webp"
  printf '%-40s %8s -> %8s (+webp)\n' "$rel" "$(du -h "$bak" | cut -f1)" "$(du -h "$f" | cut -f1)"
done
echo "Done. Originals are in images/.originals/ (ignored by git)."
