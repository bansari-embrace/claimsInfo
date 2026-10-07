# Claims Reference Hub

A personal reference tool for Claims applications, database info, wiki links, and ticket tracking — a static frontend plus a small backend API.

- **Frontend** (`index.html`, this folder): pure static HTML/CSS/JS, hosted on GitHub Pages. No storage of its own.
- **Backend** (`server/`): a small Express API that does real CRUD (Create/Read/Update/Delete) against `data/*.json` files on its own disk. GitHub Pages can only serve static files, so this piece has to run somewhere else — see `server/README.md` for hosting options.
- Each tab has **Add** (also used to Edit — click the pencil icon on a row), a delete (trash) icon, search, sortable columns, and pagination (50 rows per page by default).
- **Delete is non-destructive**: it only hides the row from the table. The row stays in the backend's data, marked `_deleted: true`.
- Because all data lives on the backend, not in any one browser, everyone pointed at the same backend URL sees the same data.

## One-time setup: point the page at your backend

Click the gear icon in the top bar and set **API Base URL** to wherever `server/` is running — e.g. `http://localhost:4000` for local development, or the HTTPS URL you deployed it to. This is saved per-browser in `localStorage`. Without it (or if the backend is unreachable), the page shows a warning banner and tables stay empty.

## Run the backend

```
cd server
npm install
npm start
```

See `server/README.md` for the full API reference and deployment options (Render, Railway, Azure App Service, etc.) — pick one, since GitHub Pages won't run it for you.

## Run the frontend locally

Just open `index.html` in a browser — it's static. Point it at your running backend via the gear icon.

## Host the frontend on GitHub Pages

Already pushed to: https://github.com/bansari-embrace/claimsInfo

Remaining step (do this on GitHub, one time):
1. Go to the repo → **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Site goes live at: **https://bansari-embrace.github.io/claimsInfo/** (takes a minute or two the first time).

Once live, open it, click the gear icon, and set the API Base URL to your deployed backend's HTTPS URL.

## Notes

- The top-level `data/*.json` files in this folder are the original seed data, kept for reference — the live copy the app actually reads/writes is `server/data/*.json`, wherever the backend is deployed.
- The backend has no authentication (see `server/README.md`) — fine for a personal/team tool behind an obscure URL, not for anything sensitive.
