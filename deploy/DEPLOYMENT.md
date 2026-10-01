# ROI Mantra — Production Deployment Guide

> **Current production** runs on AlmaLinux 9 with the apps in `~/apps/roi-frontend` and `~/apps/roi-backend` (Strapi on `127.0.0.1:1338`, SQLite) and Nginx config in `/etc/nginx/conf.d/roi-frontend.conf`. The runbook below (`server-setup.sh`) targets a **fresh Ubuntu** host and refuses to run elsewhere. For routine updates on the current server, see "Updating production" at the end.

Next.js 16 frontend + Strapi 5.52 CMS on one Linux host (Ubuntu 22.04/24.04), behind Nginx.

| Item | Value |
|---|---|
| Host | `103.25.128.182`, SSH on a custom port (`$SSH_PORT`), sudo user `$DEPLOY_USER` (kept out of this public repo) |
| Frontend | `/var/www/roi-frontend`, Next.js on `127.0.0.1:3000`, PM2 `roi-frontend` |
| Backend | `/var/www/roi-backend`, Strapi on `127.0.0.1:1337`, PM2 `roi-backend` |
| Database | PostgreSQL (local only) `roi_strapi` / `roi_strapi`. MySQL is supported via `DB_ENGINE=mysql` |
| Public | `http://103.25.128.182/` (site) and `http://103.25.128.182/admin` (CMS) |

Commands below use `$SSH_PORT` and `$DEPLOY_USER`. Set them once per shell with the real values, which are deliberately not stored in this public repo. In PowerShell: `$SSH_PORT="<port>"; $DEPLOY_USER="<user>"`. In bash: `SSH_PORT=<port> DEPLOY_USER=<user>`.

Files in this folder:

- `server-setup.sh`: the runbook. It is idempotent and split into phases (`system db backend frontend nginx pm2 firewall verify`).
- `nginx-roi.conf`: the reverse-proxy template that the script renders into `/etc/nginx/sites-available/roi`.

> **Security first.** The SSH password was shared in plain text, so treat it as compromised. Do step 0 before anything else, and never put the password in a script, `.env` or repo.

---

## 0. Lock down SSH (from Windows PowerShell)

```powershell
ssh -p $SSH_PORT $DEPLOY_USER@103.25.128.182          # log in once with the current password
passwd                                       # on the server: set a NEW password
exit

# Back on Windows: create a key and install it
ssh-keygen -t ed25519 -C "roi-deploy"
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -p $SSH_PORT $DEPLOY_USER@103.25.128.182 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
ssh -p $SSH_PORT $DEPLOY_USER@103.25.128.182          # should now log in without a password
```

Once key login works, disable password logins on the server:

```bash
sudo sed -i -E 's/^#?PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo sshd -t && sudo systemctl reload ssh     # keep your current session open until a new one works
```

---

## 1. Prepare and transfer the backend code

**Add the database driver first.** `package.json` only has `better-sqlite3`, so Strapi cannot reach Postgres or MySQL without `pg` or `mysql2`. The script installs the driver on the server if it is missing, but committing it keeps `git pull` clean:

```powershell
cd C:\Users\Omveer\Downloads\Roi-BackEnd-Web-main\Roi-BackEnd-Web-main
npm install pg --save          # or: npm install mysql2 --save
```

### Option A: Git (recommended)

This folder is already a git repo, with `origin` set to `https://github.com/Shivammishra2001/Roi-BackEnd-Web.git` and in sync with `main`. You only need to commit and push:

```powershell
git add package.json package-lock.json
git commit -m "Add pg driver for production PostgreSQL"
git push origin main
```

To start fresh from a folder that is *not* a repo yet:

```powershell
git init -b main
git add .                      # .gitignore already excludes node_modules, .env, .tmp, dist, uploads
git commit -m "Initial backend commit"
git remote add origin https://github.com/Shivammishra2001/Roi-BackEnd-Web.git
git push -u origin main
```

If the repo is private, the server needs read access. Add a deploy key (`ssh-keygen` on the server, then GitHub → repo → Settings → Deploy keys) and use the `git@github.com:...` URL as `BACKEND_REPO`.

### Option B: direct upload with `scp`

```powershell
cd C:\Users\Omveer\Downloads\Roi-BackEnd-Web-main
tar -czf roi-backend.tar.gz --exclude=node_modules --exclude=dist --exclude=.cache `
    --exclude=.tmp --exclude=.env --exclude=.git --exclude=*.stackdump `
    -C Roi-BackEnd-Web-main .
scp -P $SSH_PORT roi-backend.tar.gz $DEPLOY_USER@103.25.128.182:/tmp/
```

Note that `scp` takes a capital `-P` for the port, while `ssh` takes a lowercase `-p`. Your user can't write to `/var/www` directly, so the archive goes to `/tmp` first. Then on the server:

```bash
sudo mkdir -p /var/www/roi-backend
sudo tar -xzf /tmp/roi-backend.tar.gz -C /var/www/roi-backend
sudo chown -R $USER:$USER /var/www/roi-backend
rm /tmp/roi-backend.tar.gz
```

When you run the script in step 2, pass `BACKEND_REPO=""` so it uses the uploaded code. The local `.env` is excluded on purpose: production gets freshly generated secrets.

---

## 2. Run the runbook

```powershell
# From the frontend repo on Windows
cd "C:\Users\Omveer\Downloads\roimantra 3\roimantra"
scp -P $SSH_PORT deploy/server-setup.sh deploy/nginx-roi.conf $DEPLOY_USER@103.25.128.182:~/
ssh -p $SSH_PORT $DEPLOY_USER@103.25.128.182
```

```bash
sudo bash ~/server-setup.sh                     # all phases (Option A)
sudo BACKEND_REPO="" bash ~/server-setup.sh     # Option B (scp upload)
sudo DB_ENGINE=mysql bash ~/server-setup.sh     # MySQL instead of PostgreSQL
sudo bash ~/server-setup.sh nginx verify        # re-run only some phases
```

Then **open `http://103.25.128.182/admin` right away and create the super-admin.** Until you do, anyone who reaches that page first can claim the account.

### What each phase does

| Phase | Actions |
|---|---|
| `system` | `apt upgrade`; installs git, build tools, Nginx and UFW; adds 2 GB swap if RAM is under 3.5 GB (Strapi and Next builds get OOM-killed otherwise); installs Node.js 22 LTS (NodeSource) and PM2 globally; creates `/var/www/roi-*` owned by the deploy user |
| `db` | Installs PostgreSQL, which listens on localhost only. Creates role `roi_strapi` with a random 48-hex-char password and database `roi_strapi`, and grants the `public` schema. Re-runs reuse the password from `.env` |
| `backend` | Clone or `git pull`. Writes `.env` once (below). `npm ci` and the DB driver. Uploads permissions. `NODE_ENV=production npm run build`. PM2 start/reload. Waits for `/_health`. `npm run migrate:content` loads `data/content-v2` (pages, blog, case studies, media) into the empty DB; it is a no-op on re-runs |
| `frontend` | Clone or pull. Writes `.env.production`. `npm ci && npm run build`. PM2 `roi-frontend` on `127.0.0.1:3000` |
| `nginx` | Renders `nginx-roi.conf`, removes the default site, `nginx -t`, reload |
| `pm2` | `pm2 startup systemd -u <deploy user>`, `pm2 save`, `pm2-logrotate` (20 MB × 14) |
| `firewall` | Allows the SSH port (auto-detected)/80/443 **before** enabling UFW, denies 1337/3000, default deny incoming |
| `verify` | `pm2 ls`, listening sockets, HTTP status of `/`, `/api/home-page/full`, `/admin`, `/_health` |

### Backend `.env` (generated once, `chmod 600`)

```ini
NODE_ENV=production
HOST=127.0.0.1                 # Strapi is reachable only through Nginx
PORT=1337                      # the repo default is 1338; this overrides it
PUBLIC_URL=http://103.25.128.182
CORS_ORIGINS=http://103.25.128.182
APP_KEYS=<4 × random base64>
API_TOKEN_SALT=<random>   ADMIN_JWT_SECRET=<random>   TRANSFER_TOKEN_SALT=<random>
JWT_SECRET=<random>       ENCRYPTION_KEY=<random>
DATABASE_CLIENT=postgres  DATABASE_HOST=127.0.0.1  DATABASE_PORT=5432
DATABASE_NAME=roi_strapi  DATABASE_USERNAME=roi_strapi  DATABASE_PASSWORD=<random>
```

Back this file up somewhere safe, such as a password manager. If you lose `ENCRYPTION_KEY` or `APP_KEYS`, stored tokens become unusable and every admin is logged out. Re-runs never regenerate these values. They only update `PORT`, `PUBLIC_URL` and `CORS_ORIGINS`.

To generate a secret by hand: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`.

### Persistent uploads

The script sets `public/uploads` to owner = the deploy user, group `www-data`, dirs `2775` (setgid) and files `0664`. The folder is git-ignored, so `git pull` and redeploys never touch it. Back it up together with the database (see section 5).

### PM2 commands (what the script runs)

```bash
cd /var/www/roi-backend  && pm2 start ecosystem.config.js
#   ≡ pm2 start npm --name roi-backend -- run start   (+ NODE_ENV=production, 1 GB restart guard)
cd /var/www/roi-frontend && NODE_ENV=production pm2 start node_modules/next/dist/bin/next --name roi-frontend -- start -H 127.0.0.1 -p 3000
#   ≡ pm2 start npm --name roi-frontend -- start, but bound to localhost
pm2 startup systemd -u $USER --hp $HOME && pm2 save
```

---

## 3. Frontend and API binding

Every page (home, about, contact, blog, blog posts) and the header, footer and loader are rendered **per request** from Strapi (`lib/strapi.ts`, `dynamic = "force-dynamic"`). A published CMS edit shows up on the next page load, with no rebuild and no webhook. The exception is case studies, which are temporarily static (`components/CaseStudies/data/caseStudiesData.js`) until the redesigned case-study schema is in Strapi.

- `STRAPI_URL` is the server-side base, e.g. `http://127.0.0.1:1338`.
- `NEXT_PUBLIC_STRAPI_URL` is the browser base used by the contact form, e.g. `http://103.25.128.182`.
- Put both in `.env.production.local`. It's gitignored, so it survives `git reset --hard`.
- The contact form POSTs `{ fullName, phone, budget, service, message }` to `/api/contact-submissions`. Strapi requires `fullName`, `message`, and a phone or an email.
- CMS copy changes from the localhost design pass are applied with `npm run sync:localhost` in the backend (`-- --dry-run` to preview).

---

## 4. Nginx routing

| Path | Upstream |
|---|---|
| `/api`, `/admin`, `/uploads`, `/i18n` | Strapi `:1337` |
| `/content-manager`, `/content-type-builder`, `/upload`, `/users-permissions`, `/email`, `/content-releases`, `/review-workflows`, `/_health` | Strapi `:1337` |
| everything else (`/`, `/_next/*`, `/blog`, …) | Next.js `:3000` |

The second row is needed because the Strapi 5 admin panel calls its plugin APIs at the root path, not under `/admin`. If you proxy only the four paths you listed, the admin loads but login, the Content Manager and the Media Library fail.

The config also sets `client_max_body_size 100M`, 300 s timeouts for large uploads, and WebSocket `Upgrade`/`Connection` headers on every route. It adds long cache headers for `/_next/static` and `/uploads`.

**Route-name clash:** a frontend page named `/upload`, `/email` or `/api` would be captured by Strapi. The current pages (`blog`, `case-studies`, `contact`, `privacy-policy`, …) don't clash.

### HTTPS (strongly recommended)

Let's Encrypt can't issue a certificate for a bare IP, so you need a domain first. Point an A record at `103.25.128.182`, then run:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo PUBLIC_HOST=roimantra.com bash ~/server-setup.sh nginx        # set server_name first
sudo certbot --nginx -d roimantra.com -d www.roimantra.com --redirect
sudo PUBLIC_HOST=roimantra.com SCHEME=https bash ~/server-setup.sh backend frontend
```

The last command updates `PUBLIC_URL` and `CORS_ORIGINS` and rebuilds the frontend with the https URLs. Certbot installs a renewal timer automatically.

---

## 5. Routine operations

**Redeploy after a push.** The script does `git pull --ff-only`, reinstalls, rebuilds and reloads:

```bash
sudo bash ~/server-setup.sh backend      # or: frontend
```

**Logs and status:** `pm2 ls`, `pm2 logs roi-backend --lines 100`, `pm2 monit`, and `sudo tail -f /var/log/nginx/error.log`.

**Nightly backup (database + uploads + .env).** Run `crontab -e` as the deploy user:

```cron
30 2 * * * mkdir -p ~/backups && sudo -u postgres pg_dump -Fc roi_strapi > ~/backups/db-$(date +\%F).dump && tar -czf ~/backups/uploads-$(date +\%F).tgz -C /var/www/roi-backend public/uploads .env && find ~/backups -mtime +14 -delete
```

That `sudo -u postgres` call needs passwordless sudo for `pg_dump`. Alternatively, use `PGPASSWORD=<from .env> pg_dump -h 127.0.0.1 -U roi_strapi`. Copy the backups off the server too.

**Restore:** `sudo -u postgres pg_restore --clean -d roi_strapi db-YYYY-MM-DD.dump`, then extract the uploads tarball into `/var/www/roi-backend`.

---

## 6. Troubleshooting

| Symptom | Fix |
|---|---|
| Build killed / `JavaScript heap out of memory` | Check that swap is active (`swapon --show`), or run `NODE_OPTIONS=--max-old-space-size=2048 npm run build` |
| `Cannot find module 'pg'` | Run `cd /var/www/roi-backend && npm install pg` (and commit it, see step 1) |
| Admin login fails over plain HTTP, log says *Cannot send secure cookie over unencrypted connection* | Strapi marks auth cookies `secure` in production. Use HTTPS (section 4) and add `proxy: true,` to `config/server.ts` so Strapi trusts Nginx's `X-Forwarded-Proto`, then rebuild |
| Admin panel loads but shows API errors | Make sure the Nginx regex lists that plugin's prefix, and check the browser devtools Network tab for the failing path |
| `413 Request Entity Too Large` | Raise `client_max_body_size` in `/etc/nginx/sites-available/roi`, then `sudo nginx -t && sudo systemctl reload nginx` |
| Uploads vanish after redeploy | Make sure nothing runs `git clean -fdx` in the backend, and that `public/uploads` is still git-ignored |
| Locked out after UFW | Use the provider's web console: `sudo ufw allow <ssh-port>/tcp` |
| Site shows old content after an `.env.production` change | Rebuild: `npm run build && pm2 reload roi-frontend` |
| Existing local CMS edits (SQLite) need to move to the server | Locally run `npx strapi export --no-encrypt -f roi-export`, `scp -P $SSH_PORT` the `.tar.gz` over, then on the server run `npx strapi import -f roi-export.tar.gz`. This replaces the server's content. Admin users aren't transferred |

---

## Updating production (current AlmaLinux server)

```bash
# Backend. The server has no GitHub credentials for the private repo, so ship a bundle from a dev machine:
#   (dev) git -C Roi-BackEnd-Web-main bundle create roi-backend.bundle main && scp -P $SSH_PORT roi-backend.bundle $DEPLOY_USER@103.25.128.182:
cd ~/apps/roi-backend
cp .tmp/data.db .tmp/backups/data-$(date +%F-%H%M).db
git fetch ~/roi-backend.bundle main:refs/remotes/origin/main && git reset --hard origin/main
npm install && NODE_ENV=production npm run build
npm run sync:localhost -- --dry-run      # review, then run without --dry-run (once)
pm2 restart roi-backend --update-env

# Frontend (public repo)
cd ~/apps/roi-frontend
git fetch origin main && git reset --hard origin/main
npm install && npm run build
pm2 restart roi-frontend --update-env && pm2 save
```
