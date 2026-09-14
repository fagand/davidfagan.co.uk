#!/usr/bin/env python3
"""Generate 1000px-wide thumbnails for the gallery pages.

The galleries display images in roughly 250-430px slots but were serving the
camera originals — several of them 5000-6000px wide, which is where photos.html
picked up its ~16MB page weight. This writes a 1000px derivative next to each
original (enough for a 2x display in the largest slot) into a `thumb/`
subfolder; the HTML references both via srcset and keeps the original as the
lightbox target.

Re-run after adding images:

    python3 scripts/build-thumbs.py

Requires `sips`, which ships with macOS. Originals are never modified.
"""
import pathlib
import subprocess
import sys

WIDTH = 1000
# sips maps formatOptions to low|normal|high|best; a numeric value lands near
# "high" and barely compresses. "normal" is the quality/size balance we want.
HEAVY_BYTES = 200 * 1024
ROOT = pathlib.Path(__file__).resolve().parent.parent
DIRS = ["images/photos", "images/designs", "images/designs/new", "darkimages"]


def main() -> None:
    made = skipped = 0
    for d in DIRS:
        src_dir = ROOT / d
        if not src_dir.is_dir():
            continue
        out_dir = src_dir / "thumb"
        for src in sorted(src_dir.iterdir()):
            if src.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            out = out_dir / (src.stem + ".jpg")
            if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
                skipped += 1
                continue
            w = subprocess.run(["sips", "-g", "pixelWidth", str(src)],
                               capture_output=True, text=True).stdout
            try:
                natural = int(w.split("pixelWidth:")[1].split()[0])
            except (IndexError, ValueError):
                continue
            # Two reasons to write a derivative: the image is wider than any
            # slot that displays it, or it is small enough but simply saved at
            # a wasteful quality. Several originals here are under 900px yet
            # still 300-450KB.
            oversized = natural > WIDTH
            heavy = src.stat().st_size > HEAVY_BYTES
            if not oversized and not heavy:
                skipped += 1        # already small enough to serve as-is
                continue
            target = min(natural, WIDTH)
            out_dir.mkdir(exist_ok=True)
            subprocess.run(["sips", "--resampleWidth", str(target),
                            "-s", "format", "jpeg", "-s", "formatOptions", "normal",
                            str(src), "--out", str(out)],
                           capture_output=True, check=True)
            made += 1
    print(f"thumbnails written: {made}, skipped (already current or small): {skipped}")
    if made == 0 and skipped == 0:
        sys.exit("no source images found")


if __name__ == "__main__":
    main()
