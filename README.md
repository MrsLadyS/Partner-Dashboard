# Dreamlife-Sim Partner Dashboard — static site for Git hosting

Standalone **static site** for the Partner Dashboard demo. Same design and logo as Dreamlife-Sim. No server, no database, no auth — just HTML, CSS, and JS you can host on **GitHub Pages**, GitLab Pages, or any static host.

## Run locally

```bash
cd partner-dashboard
npm install
npm run dev
```

Opens at **http://localhost:5174**.

## Build static output (for Git hosting)

```bash
npm run build
```

Output is in **`dist/`**. That folder is the entire site: upload it to any static host or use the GitHub Action below.

### GitHub Pages (project site)

If the site is served at `https://<user>.github.io/<repo>/` (project Pages), set the base path when building:

**Windows (PowerShell):**
```powershell
$env:BASE_PATH="/192026Dreamlife/"; npm run build
```

**macOS/Linux:**
```bash
BASE_PATH=/192026Dreamlife/ npm run build
```

Replace `192026Dreamlife` with your actual repo name. Then deploy the contents of `dist/` to the branch or folder your Git host uses for Pages (e.g. `gh-pages` branch or `docs/`).

### Deploy from its own Git repo (recommended)

If you move or copy `partner-dashboard` into a **separate repo** and turn on GitHub Pages there:

1. Copy `.github-workflows-example/deploy-pages.yml` into that repo as `.github/workflows/deploy-pages.yml`.
2. Push to `main`; the workflow will build and deploy the static site to the `gh-pages` branch.
3. In the repo: **Settings → Pages → Source**: Deploy from branch → branch `gh-pages`, root.

The workflow sets `BASE_PATH` to your repo name so asset URLs work on `https://<user>.github.io/<repo>/`.

### Root or custom domain

If the site is at the root (e.g. custom domain or `username.github.io`), just run `npm run build` and deploy `dist/` as-is.

## Logo

The repo includes `public/logo.svg` (Dreamlife text). To use your own logo, replace it with `public/logo.svg` or add `public/logo.png` and update `index.html` and the header in `src/App.tsx` to reference it.

## What this is

- **Static only** — no backend; safe for Git-based hosting.
- **Demo/mockup** — mock data only.
- **Separate from main app** — changing this folder does not affect the Dreamlife-Sim web/Android/iOS app.
- Same style: Raleway, primary green (#456432), brand green (#A4BE86).
