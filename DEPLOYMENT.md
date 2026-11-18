# ROI Mantra — Deployment & Server Operations

> Canonical runbook for deploying **ROI Mantra** (`www.roimantra.com`). Read this
> before **any** git push, build, or server operation.
>
> **No passwords, keys, or tokens live in this file.** Connection secrets, if
> needed locally, go in a **gitignored** `.env.deploy.local` (see §3).
>
> ⚠️ **This is PRODUCTION.** There is no separate ROI staging server — every
> deploy here is live. **Get explicit confirmation before deploying**, and never
> `pm2 delete` / `pm2 kill` a process (use `restart` / `reload`).
>
> 🚫 **Not this project:** Unimrkt Research is a *different* system on a
> *different* server (`103.25.130.61`, user `stagingunimrkt`, PM2 `unimrkt-*`).
> Never run ROI commands there or vice-versa.

---

## 1. Environment & Repositories

| App | Repo | Visibility | Stack |
| --- | --- | --- | --- |
| Frontend | `github.com/Shivammishra2001/Roi-FrontEnd-Web` | **public** | Next.js 16 (App Router) |
| Backend  | `github.com/Shivammishra2001/Roi-BackEnd-Web`  | **private** | Strapi 5 + SQLite |

- **Builds happen on the server** as part of every deploy (`npm run build` after
  the pull). A local build is only for pre-deploy verification, and it needs a
  reachable Strapi (the frontend pre-renders pages from the CMS at build time).
- The **real site is `https://www.roimantra.com`**. The bare IP
  `http://103.25.128.182/` serves the AlmaLinux default test page — **not** the
  site. Always verify against the domain.

## 2. Server, Directories & Processes

**SSH** (AlmaLinux 9):

```bash
ssh -p 5726 MLSJDLW@103.25.128.182
```

| Field | Value |
| --- | --- |
| Host / Port | `103.25.128.182` / `5726` |
| User | `MLSJDLW` |
| Auth | SSH key preferred. A password was shared in plaintext earlier — **treat it as compromised, rotate it, and never put it in a tracked file.** |

| App | Path | PM2 process | Port | Branch |
| --- | --- | --- | --- | --- |
| Frontend (Next.js) | `~/apps/roi-frontend` | `roi-frontend` | `3000` | `main` |
| Backend (Strapi)   | `~/apps/roi-backend`  | `roi-backend`  | `1338` | `main` |

- **Database:** SQLite at `~/apps/roi-backend/.tmp/data.db`.
- **Nginx:** `/etc/nginx/conf.d/roi-frontend.conf` — routes `/` → Next `:3000`;
  `/api`, `/admin`, `/uploads`, `/content-manager`, … → Strapi `:1338`; serves
  HTTPS for `www.roimantra.com` (non-www and bare host 301 → www).
- **URLs:** site `https://www.roimantra.com` · Strapi admin
  `https://www.roimantra.com/admin`.
- Full infra setup lives in [`deploy/`](./deploy/) (`server-setup.sh`,
  `nginx-roi.conf`, `deploy/DEPLOYMENT.md`).

## 3. Secrets & `.env.deploy.local`

- Every `.env*` (except `.env.example`) is gitignored — see §6.
- Any local-only deploy secret (SSH password/key path, API token) goes in a
  **gitignored** `.env.deploy.local` at the repo root. A template is provided;
  fill in your own values. **Never** paste secrets into this or any tracked file.
- Backend `.env` holds real secrets (`APP_KEYS`, `JWT_SECRET`, `ENCRYPTION_KEY`,
  `ADMIN_JWT_SECRET`, …). It is generated once on the server and **never**
  rotated on redeploy (rotating keys logs every admin out and breaks tokens).

## 4. Pre-Deploy Checklist & Git Safety

Before **any** `git add` / `commit`:

1. `git status` and `git diff` — stage **only** intended files.
2. Never commit `.env*` (except `.env.example`), database files/dumps
   (`*.db`, `*.sql`, `*.sqlite`), backups/archives (`*.tar.gz`, `*.zip`),
   keys/certs (`*.pem`, `*.key`, `*.ppk`, `credentials*.json`), or build output.
3. Confirm `.gitignore` covers the above (§6), then `git ls-files | grep -iE '\.env$|\.env\.|\.pem$|\.key$|credential|\.db$|\.sql$|backup'` returns **nothing** tracked.
4. Push **backend first** if the Strapi schema changed, then the frontend.

## 5. Deployment Pipeline (production)

> Confirm with the owner before starting. Take the backup in step 2 **first**.

**1 — Local: commit & push**

```bash
# Frontend (public repo): push directly
git push origin main
# Backend (private repo, server has no GitHub creds): ship a bundle
git -C backend bundle create roi-backend.bundle main
scp -P 5726 roi-backend.bundle MLSJDLW@103.25.128.182:~/
```

**2 — Server: mandatory timestamped backup (before any pull/migration)**

```bash
ssh -p 5726 MLSJDLW@103.25.128.182
cd ~/apps/roi-backend
cp .tmp/data.db .tmp/backups/data-$(date +%F-%H%M).db      # DB snapshot
tar -czf ~/backups/uploads-$(date +%F-%H%M).tgz public/uploads  # uploads (optional)
```

**3 — Backend deploy** (only if backend changed)

```bash
cd ~/apps/roi-backend
git fetch ~/roi-backend.bundle main:refs/remotes/origin/main && git reset --hard origin/main
npm install            # only if package-lock.json changed
NODE_ENV=production npm run build
# Content/seed scripts, as needed (idempotent):
#   npm run seed:about && npm run seed:about-images
#   npm run seed:discovery && npm run seed:legal
#   npm run sync:localhost        # review first; applies CMS copy changes
pm2 restart roi-backend --update-env
```

**4 — Frontend deploy**

```bash
cd ~/apps/roi-frontend
git fetch origin main && git reset --hard origin/main
npm install            # only if package-lock.json changed
npm run build
pm2 restart roi-frontend --update-env && pm2 save
```

**5 — Post-deploy health checks**

```bash
pm2 ls                                   # roi-frontend & roi-backend "online"
for p in / /about-us /blog /case-studies /contact; do
  curl -s -o /dev/null -w "%{http_code} $p\n" "https://www.roimantra.com$p"
done
curl -s -o /dev/null -w "admin %{http_code}\n" https://www.roimantra.com/admin
```

All routes should return `200` (`/about` 301→`/about-us`). Spot-check the live
page in a browser.

## 6. Required `.gitignore` coverage (both repos)

```
# Env & deploy secrets
.env, .env.*, .env.local, .env.deploy.local, .env.staging, .env.production   (keep !.env.example)
# Keys / certs / credentials
*.pem, *.key, *.ppk, credentials*.json
# Databases, dumps, backups, archives
*.sqlite, *.db, *.sql, *.tar.gz, *.zip, .tmp/, backups/
# Runtime uploads (keep the folder, drop contents)   public/uploads/*  + !public/uploads/.gitkeep
# Build / cache / deps
.next/, dist/, build/, .cache/, node_modules/
```

## 7. Rollback

```bash
ssh -p 5726 MLSJDLW@103.25.128.182
# Backend: restore DB + previous code
cd ~/apps/roi-backend
cp .tmp/backups/data-<TIMESTAMP>.db .tmp/data.db
git reset --hard <previous-good-commit>
NODE_ENV=production npm run build && pm2 restart roi-backend --update-env
# Frontend: revert to the previous commit
cd ~/apps/roi-frontend
git reset --hard <previous-good-commit>
npm run build && pm2 restart roi-frontend --update-env && pm2 save
```

If a bad commit already reached `origin/main`, revert it locally
(`git revert <sha>` or `git reset --hard <good-sha>` + force-push with care) and
redeploy, rather than leaving the server ahead of the remote.
