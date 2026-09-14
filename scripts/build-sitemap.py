#!/usr/bin/env python3
"""Regenerate sitemap.xml.

This is a static site with no build step, so the sitemap is a committed file
rather than something generated at request time. Run this after adding,
removing or renaming a public page:

    python3 scripts/build-sitemap.py

lastmod comes from each file's last commit date, so it stays honest without
anyone having to remember to update it.
"""
import pathlib
import subprocess

BASE = "https://www.davidfagan.co.uk"
ROOT = pathlib.Path(__file__).resolve().parent.parent

# Public, indexable, canonical pages only. Deliberately excluded: 404.shtml,
# the orphaned legacy pages (see robots.txt), and /work/, which is a separate
# sign-in-gated application deployed from its own repository.
PAGES = [
    ("/",                         "index.html",                     "monthly", "1.0"),
    ("/services.html",            "services.html",                  "monthly", "0.9"),
    ("/about.html",               "about.html",                     "yearly",  "0.7"),
    ("/photos.html",              "photos.html",                    "monthly", "0.7"),
    ("/designs.html",             "designs.html",                   "monthly", "0.7"),
    ("/videos.html",              "videos.html",                    "yearly",  "0.6"),
    ("/assets/docs/privacy/",     "assets/docs/privacy/index.html",  "yearly",  "0.3"),
    ("/assets/docs/cookies/",     "assets/docs/cookies/index.html",  "yearly",  "0.3"),
]


def lastmod(relpath: str) -> str:
    out = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", relpath],
        capture_output=True, text=True, cwd=ROOT,
    ).stdout.strip()
    if not out:
        raise SystemExit(f"no commit date for {relpath} — is it committed?")
    return out


def main() -> None:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        "<!-- Regenerate with: python3 scripts/build-sitemap.py -->",
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url, relpath, changefreq, priority in PAGES:
        if not (ROOT / relpath).exists():
            raise SystemExit(f"missing page: {relpath}")
        lines += [
            "  <url>",
            f"    <loc>{BASE}{url}</loc>",
            f"    <lastmod>{lastmod(relpath)}</lastmod>",
            f"    <changefreq>{changefreq}</changefreq>",
            f"    <priority>{priority}</priority>",
            "  </url>",
        ]
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n")
    print(f"wrote sitemap.xml with {len(PAGES)} URLs")


if __name__ == "__main__":
    main()
