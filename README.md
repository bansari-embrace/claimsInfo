# Claims Reference Hub

A personal, single-page reference tool for Claims applications, database info, wiki links, and ticket tracking.

- Pure static HTML/CSS/JS — no backend, no build step.
- Seed data for each tab lives in its own file under `data/` (`projects.json`, `dbinfo.json`, `wikilinks.json`, `tickets.json`) — nothing is hard-coded in the HTML.
- Your edits (add/edit/delete) are saved on top of that seed in the browser's `localStorage` (per device/browser).
- Each tab has **Add** (also used to Edit — click the pencil icon on a row), a delete (trash) icon, and **Export JSON** / **Export CSV** buttons.
- **Delete is non-destructive**: it only hides the row from the table. The row stays in local storage and in `Export JSON` output, so nothing is actually lost.

## Run locally

Because the page loads `data/*.json` with `fetch()`, opening `index.html` by double-clicking it (`file://`) will fail to load the seed data (browsers block `fetch` of local files that way). Serve the folder instead, e.g.:

```
npx serve .
```

then open the printed `http://localhost:...` URL. (If you skip this, the page still works — it just starts empty until you Add rows, and shows a small warning banner.)

## Host on GitHub Pages

Already pushed to: https://github.com/bansari-embrace/claimsInfo

Remaining step (do this on GitHub, one time):
1. Go to the repo → **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Site goes live at: **https://bansari-embrace.github.io/claimsInfo/** (takes a minute or two the first time).

## Notes

- Since edits live in `localStorage`, they are **per browser/device** — they won't sync between your work laptop and the hosted site automatically. Use **Export JSON** on one device, and replace the matching file in `data/` with it (then commit + push), to carry changes over to the hosted site for everyone.
- Seeded with the Claims applications, DB info, and tickets already gathered in `data/*.json` — edit or delete anything that doesn't match your actual environment, or edit those JSON files directly.
