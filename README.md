# Claims Reference Hub

A personal, single-page reference tool for Claims applications, database info, wiki links, and ticket tracking.

- Pure static HTML/CSS/JS — no backend, no build step.
- Data is saved in the browser's `localStorage` (per device/browser).
- Each tab has an **Export CSV** button to back up or move data (opens fine in Excel).

## Run locally

Just open `index.html` in a browser — no server needed.

## Host on GitHub Pages

1. Create a new GitHub repo (e.g. `claims-hub`), public or private (Pages works on both with GitHub Pro/Team, public repos get it free).
2. From this folder, push to it:
   ```
   git init
   git add .
   git commit -m "Initial Claims Reference Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/claims-hub.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / root**.
4. Your site goes live at `https://<your-username>.github.io/claims-hub/`.

## Notes

- Since data lives in `localStorage`, it is **per browser/device** — it won't sync between your work laptop and the hosted site automatically. Use **Export CSV** on one and re-enter on the other if you need the same data in both places.
- Seeded with the Claims applications, DB info, and tickets already gathered — edit or delete anything that doesn't match your actual environment.
