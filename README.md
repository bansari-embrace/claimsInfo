# Claims Reference Hub

A personal, single-page reference tool for Claims applications, database info, wiki links, and ticket tracking.

- Pure static HTML/CSS/JS — no build step, hosted on GitHub Pages.
- Data for each tab lives in its own file under `data/` (`projects.json`, `dbinfo.json`, `wikilinks.json`, `tickets.json`) — nothing is hard-coded in the HTML.
- **Every Add/Edit/Delete is committed straight back to those `data/*.json` files on GitHub** via the GitHub API, so anyone who opens the page sees the same shared data — it isn't stuck in one browser.
- Each tab has **Add** (also used to Edit — click the pencil icon on a row), a delete (trash) icon, search, sortable columns, pagination (50 rows per page by default), and **Export JSON** / **Export CSV** buttons for manual backups.
- **Delete is non-destructive**: it only hides the row from the table. The row stays in `data/*.json` (and in `Export JSON` output), so nothing is actually lost.

## One-time setup: connect access so saving works

Click the gear icon in the top bar and paste in an **Access Token** — create a [fine-grained PAT](https://github.com/settings/personal-access-tokens/new) scoped to just this repo, with **Contents: Read and write** permission.

The token is stored only in that browser's `localStorage` — it's never committed or sent anywhere except directly to GitHub's API. Do this once per device/browser you use to edit. Without it, the page is still fully readable, but edits won't save anywhere. The top bar shows **Connected** / **Disconnected** depending on whether a token is set.

## Run locally

Because the page loads `data/*.json` with `fetch()`, opening `index.html` by double-clicking it (`file://`) will fail to load the data (browsers block `fetch` of local files that way). Serve the folder instead, e.g.:

```
npx serve .
```

then open the printed `http://localhost:...` URL.

## Host on GitHub Pages

Already pushed to: https://github.com/bansari-embrace/claimsInfo

Remaining step (do this on GitHub, one time):
1. Go to the repo → **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Site goes live at: **https://bansari-embrace.github.io/claimsInfo/** (takes a minute or two the first time).

## Notes

- Saving writes a new commit to this repo, so GitHub Pages takes a short moment to rebuild after an edit before other people see it.
- Seeded with the Claims applications, DB info, and tickets already gathered in `data/*.json` — edit or delete anything that doesn't match your actual environment, or edit those JSON files directly.
