# Claims Hub Server

A tiny Express API that does real CRUD on the `data/*.json` files in this folder — this is what the Claims Reference Hub frontend (hosted on GitHub Pages) talks to for saving data. GitHub Pages only serves static files, so this piece has to run somewhere else.

## Run locally

```
cd server
npm install
npm start
```

Starts on `http://localhost:4000`. The frontend's Settings (gear icon) defaults to this URL.

## API

All endpoints are scoped to one of 4 tabs: `projects`, `dbinfo`, `wikilinks`, `tickets`.

| Method | Path              | Body                | Does                                      |
|--------|-------------------|----------------------|--------------------------------------------|
| GET    | `/api/:tab`       | —                    | Returns the full array for that tab        |
| POST   | `/api/:tab`       | `{ ...fields }`      | Creates a row, server assigns `id`         |
| PUT    | `/api/:tab/:id`   | `{ ...fields }`      | Updates the row with that `id`             |
| DELETE | `/api/:tab/:id`   | —                    | Soft-deletes: sets `_deleted: true`, keeps the row in the file |

Data lives in `server/data/*.json` on whatever machine runs this server — that's the single source of truth once you connect the frontend to it.

## Deploying so the GitHub Pages site can reach it

The frontend is static and lives on GitHub Pages; this server needs its own host that keeps it running and reachable over HTTPS. Pick one:

- **Render** (render.com) — free tier, connect this `server/` folder as a Web Service, build command `npm install`, start command `npm start`.
- **Railway** (railway.app) — similar free-tier flow, point it at the `server/` folder.
- **Azure App Service** — if you'd rather stay on Azure: create a Linux Node Web App, deploy this folder (zip deploy or GitHub Actions), set `PORT` is handled automatically by App Service.

Whichever you pick, note the public HTTPS URL it gives you (e.g. `https://claims-hub-api.onrender.com`) and paste it into the frontend's Settings (gear icon) → **API Base URL**. CORS is already open on the server (`cors()` with no restrictions) so the GitHub Pages origin can call it.

⚠️ This server has no authentication — anyone with the URL can read and write the data. Fine for a personal/team reference tool behind an obscure URL; don't put anything sensitive in it.
