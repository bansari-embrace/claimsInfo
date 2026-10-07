# Claims Reference Hub

A personal, single-page reference tool for Claims applications, database info, wiki links, and ticket tracking.

- Pure static HTML/CSS/JS — no backend, no build step.
- Data is saved in the browser's `localStorage` (per device/browser).
- Each tab has an **Export CSV** button to back up or move data (opens fine in Excel).

## Run locally

Just open `index.html` in a browser — no server needed.

## Host on GitHub Pages

Already pushed to: https://github.com/bansari-embrace/claimsInfo

Remaining step (do this on GitHub, one time):
1. Go to the repo → **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Site goes live at: **https://bansari-embrace.github.io/claimsInfo/** (takes a minute or two the first time).

## Notes

- Since data lives in `localStorage`, it is **per browser/device** — it won't sync between your work laptop and the hosted site automatically. Use **Export CSV** on one and re-enter on the other if you need the same data in both places.
- Seeded with the Claims applications, DB info, and tickets already gathered — edit or delete anything that doesn't match your actual environment.
