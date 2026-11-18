# Project Guidance for Claude — ROI Mantra (Frontend)

## Deployment & server operations

**Always read and strictly follow [`DEPLOYMENT.md`](./DEPLOYMENT.md) before any
git push, build, or server deployment.** Full detail is there; the
non-negotiables:

- **Production only.** `www.roimantra.com` is live and has no separate staging
  server — **get explicit confirmation before deploying.** Never `pm2 delete` /
  `pm2 kill`; use `pm2 restart` / `reload`.
- **Server:** `ssh -p 5726 MLSJDLW@103.25.128.182` (SSH key preferred). **Never
  store the SSH password in a tracked file** — it was shared in plaintext and
  should be rotated. Local-only secrets go in a gitignored `.env.deploy.local`.
- **Different project ≠ Unimrkt.** Unimrkt Research runs on `103.25.130.61`
  (`stagingunimrkt`, PM2 `unimrkt-*`). Never mix the two servers.
- **Before any `git add`/`commit`:** run `git status` / `git diff`, stage only
  intended files, and verify `.gitignore` blocks `.env*` (keep `.env.example`),
  `*.pem`/`*.key`/`*.ppk`/`credentials*.json`, `*.db`/`*.sql`/`*.sqlite`,
  `*.tar.gz`/`*.zip`, `.tmp/`/`backups/`, `public/uploads/*`, and
  `.next/`/`dist/`/`build/`/`node_modules/`.
- **Deploy order:** backend (private repo, shipped as a git bundle) first if the
  Strapi schema changed, then this frontend (public repo, pulled directly).

## Repository map

- **Frontend** (this repo) → `Roi-FrontEnd-Web` → server `~/apps/roi-frontend`,
  PM2 `roi-frontend`, port `3000` (Next.js 16).
- **Backend** → `Roi-BackEnd-Web` → server `~/apps/roi-backend`, PM2
  `roi-backend`, port `1338` (Strapi 5, SQLite at `.tmp/data.db`).
- Detailed infra (Nginx, server setup) lives in [`deploy/`](./deploy/).
