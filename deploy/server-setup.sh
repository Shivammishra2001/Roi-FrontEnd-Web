#!/usr/bin/env bash
# =============================================================================
# ROI Mantra — production server runbook (Next.js frontend + Strapi 5 backend)
#
# Target : Ubuntu 22.04 / 24.04, single host, routed by IP through Nginx
# Run as : the sudo user, e.g.   sudo bash server-setup.sh            (all phases)
#                                sudo bash server-setup.sh nginx      (one phase)
# Phases : system db backend frontend nginx pm2 firewall verify
#
# Safe to re-run. Secrets are generated ONCE and kept in the backend .env; a
# re-run never rotates them (rotating ENCRYPTION_KEY / APP_KEYS would break
# stored tokens and log every admin out).
#
# NOTHING in this file is a secret. Do not add the SSH password here.
# =============================================================================
set -Eeuo pipefail
trap 'echo "!! failed at line $LINENO: $BASH_COMMAND" >&2' ERR

# ----------------------------------------------------------------------------
# Configuration (override with env vars:  sudo PUBLIC_HOST=example.com bash ...)
# ----------------------------------------------------------------------------
PUBLIC_HOST="${PUBLIC_HOST:-103.25.128.182}"   # IP or domain browsers use
SCHEME="${SCHEME:-http}"                         # switch to https after certbot
# SSH port defaults to the one sshd is listening on, so the firewall never locks you out.
SSH_PORT="${SSH_PORT:-$(sshd -T 2>/dev/null | awk '/^port /{print $2; exit}')}"
DEPLOY_USER="${DEPLOY_USER:-${SUDO_USER:-}}"
NODE_MAJOR="${NODE_MAJOR:-22}"                   # Strapi 5.52 supports Node 20–26

FRONTEND_DIR="${FRONTEND_DIR:-/var/www/roi-frontend}"
FRONTEND_REPO="${FRONTEND_REPO:-https://github.com/Shivammishra2001/Roi-FrontEnd-Web.git}"
FRONTEND_PORT="${FRONTEND_PORT:-3000}"

BACKEND_DIR="${BACKEND_DIR:-/var/www/roi-backend}"
# Leave empty if the code was uploaded with scp (Option B in DEPLOYMENT.md).
BACKEND_REPO="${BACKEND_REPO:-https://github.com/Shivammishra2001/Roi-BackEnd-Web.git}"
BACKEND_PORT="${BACKEND_PORT:-1337}"

DB_ENGINE="${DB_ENGINE:-postgres}"               # postgres | mysql
DB_NAME="${DB_NAME:-roi_strapi}"
DB_USER="${DB_USER:-roi_strapi}"

BASE_URL="${SCHEME}://${PUBLIC_HOST}"
DEPLOY_HOME="$(getent passwd "$DEPLOY_USER" | cut -d: -f6)"

log()  { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m!!  %s\033[0m\n' "$*" >&2; }
as_user() { sudo -u "$DEPLOY_USER" -H bash -lc "$*"; }
rand() { openssl rand -base64 "${1:-32}" | tr -d '\n'; }
rand_alnum() { openssl rand -hex "${1:-24}"; }   # safe in URLs / shell / SQL

[[ $EUID -eq 0 ]] || { echo "Run with sudo: sudo bash $0" >&2; exit 1; }
[[ -n "$DEPLOY_USER" ]] || { echo "Run via sudo from the deploy user, or set DEPLOY_USER=<user>" >&2; exit 1; }
[[ -n "$DEPLOY_HOME" ]] || { echo "User $DEPLOY_USER does not exist" >&2; exit 1; }
command -v apt-get >/dev/null || {
  echo "This runbook targets Ubuntu/Debian (apt, ufw). Detected: $(. /etc/os-release 2>/dev/null; echo "${PRETTY_NAME:-unknown}")." >&2
  echo "RHEL-family hosts (Alma/Rocky/CentOS) need dnf, firewalld and SELinux steps instead." >&2
  exit 1
}

# ----------------------------------------------------------------------------
phase_system() {
  log "System update + base packages"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y
  apt-get upgrade -y
  apt-get install -y curl ca-certificates gnupg git build-essential python3 \
                     nginx ufw unzip openssl

  # Strapi admin build + next build each want ~1.5–2 GB RAM. Add swap on
  # small VPSes so the builds don't get OOM-killed.
  local mem_mb; mem_mb=$(awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo)
  if (( mem_mb < 3500 )) && ! swapon --show | grep -q /swapfile; then
    log "Low RAM (${mem_mb} MB) — creating 2 GB swap"
    fallocate -l 2G /swapfile && chmod 600 /swapfile
    mkswap /swapfile && swapon /swapfile
    grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  fi

  log "Node.js ${NODE_MAJOR}.x LTS"
  if ! command -v node >/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" != "$NODE_MAJOR" ]]; then
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
    apt-get install -y nodejs
  fi
  node -v && npm -v

  log "PM2"
  command -v pm2 >/dev/null || npm install -g pm2
  pm2 -v

  mkdir -p "$FRONTEND_DIR" "$BACKEND_DIR"
  chown "$DEPLOY_USER":"$DEPLOY_USER" "$FRONTEND_DIR" "$BACKEND_DIR"
}

# ----------------------------------------------------------------------------
# DB password lives only in the backend .env. Read it back if already set.
db_password() {
  local f="$BACKEND_DIR/.env"
  if [[ -f $f ]] && grep -q '^DATABASE_PASSWORD=' "$f"; then
    grep '^DATABASE_PASSWORD=' "$f" | cut -d= -f2-
  else
    rand_alnum 24
  fi
}

phase_db() {
  DB_PASS="${DB_PASS:-$(db_password)}"
  if [[ $DB_ENGINE == postgres ]]; then
    log "PostgreSQL"
    apt-get install -y postgresql postgresql-contrib
    systemctl enable --now postgresql
    # Listens on localhost only by default — no firewall rule needed.
    sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
DO \$\$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASS}';
  ELSE
    ALTER ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASS}';
  END IF;
END \$\$;
SQL
    sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'" | grep -q 1 \
      || sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"
    sudo -u postgres psql -d "$DB_NAME" -c "GRANT ALL ON SCHEMA public TO ${DB_USER};" >/dev/null
  else
    log "MySQL"
    apt-get install -y mysql-server
    systemctl enable --now mysql
    mysql <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
ALTER USER '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL
  fi
  export DB_PASS
}

# ----------------------------------------------------------------------------
write_backend_env() {
  local f="$BACKEND_DIR/.env"
  if [[ -f $f ]] && grep -q '^APP_KEYS=' "$f" && ! grep -q 'tobemodified\|toBeModified' "$f"; then
    log "Backend .env exists — keeping secrets, refreshing non-secret values"
    sed -i -E \
      -e "s|^PORT=.*|PORT=${BACKEND_PORT}|" \
      -e "s|^PUBLIC_URL=.*|PUBLIC_URL=${BASE_URL}|" \
      -e "s|^CORS_ORIGINS=.*|CORS_ORIGINS=${BASE_URL}|" "$f"
    return
  fi
  log "Generating backend .env (new secrets)"
  local db_client db_port
  if [[ $DB_ENGINE == postgres ]]; then db_client=postgres; db_port=5432
  else db_client=mysql; db_port=3306; fi
  cat > "$f" <<ENV
# Generated by server-setup.sh on $(date -u +%FT%TZ). Back this file up —
# losing ENCRYPTION_KEY / APP_KEYS invalidates stored tokens and sessions.
NODE_ENV=production
HOST=127.0.0.1
PORT=${BACKEND_PORT}
PUBLIC_URL=${BASE_URL}
CORS_ORIGINS=${BASE_URL}

APP_KEYS=$(rand),$(rand),$(rand),$(rand)
API_TOKEN_SALT=$(rand)
ADMIN_JWT_SECRET=$(rand)
TRANSFER_TOKEN_SALT=$(rand)
JWT_SECRET=$(rand)
ENCRYPTION_KEY=$(rand)

DATABASE_CLIENT=${db_client}
DATABASE_HOST=127.0.0.1
DATABASE_PORT=${db_port}
DATABASE_NAME=${DB_NAME}
DATABASE_USERNAME=${DB_USER}
DATABASE_PASSWORD=${DB_PASS}
DATABASE_SSL=false
ENV
  chown "$DEPLOY_USER":"$DEPLOY_USER" "$f"
  chmod 600 "$f"
}

phase_backend() {
  [[ -n "${DB_PASS:-}" ]] || DB_PASS="$(db_password)"

  log "Backend code → $BACKEND_DIR"
  if [[ -d $BACKEND_DIR/.git ]]; then
    as_user "cd '$BACKEND_DIR' && git pull --ff-only"
  elif [[ -f $BACKEND_DIR/package.json ]]; then
    echo "Using uploaded (scp) code already in $BACKEND_DIR"
  elif [[ -n $BACKEND_REPO ]]; then
    as_user "git clone '$BACKEND_REPO' '$BACKEND_DIR'"
  else
    echo "No backend code in $BACKEND_DIR and BACKEND_REPO is empty" >&2; exit 1
  fi
  chown -R "$DEPLOY_USER":"$DEPLOY_USER" "$BACKEND_DIR"

  write_backend_env

  log "Backend dependencies"
  # Full install (incl. devDependencies): `npm run migrate:content` needs tsx.
  as_user "cd '$BACKEND_DIR' && npm ci --no-audit --no-fund"
  local driver; [[ $DB_ENGINE == postgres ]] && driver=pg || driver=mysql2
  if ! as_user "cd '$BACKEND_DIR' && node -e \"require.resolve('$driver')\"" 2>/dev/null; then
    warn "'$driver' is not in package.json — installing it here. Commit it in the repo too (see DEPLOYMENT.md)."
    as_user "cd '$BACKEND_DIR' && npm install --no-audit --no-fund $driver"
  fi

  log "Persistent uploads directory"
  mkdir -p "$BACKEND_DIR/public/uploads"
  chown -R "$DEPLOY_USER":www-data "$BACKEND_DIR/public"
  find "$BACKEND_DIR/public/uploads" -type d -exec chmod 2775 {} +   # setgid keeps group
  find "$BACKEND_DIR/public/uploads" -type f -exec chmod 0664 {} +

  log "Strapi production build"
  as_user "cd '$BACKEND_DIR' && NODE_ENV=production npm run build"

  log "Start/reload roi-backend under PM2"
  # ecosystem.config.js in the repo = `pm2 start npm --name roi-backend -- run start`
  # with NODE_ENV=production and a 1 GB memory guard.
  as_user "cd '$BACKEND_DIR' && (pm2 describe roi-backend >/dev/null 2>&1 \
            && pm2 reload ecosystem.config.js --update-env \
            || pm2 start ecosystem.config.js)"

  log "Waiting for Strapi on :$BACKEND_PORT"
  for _ in $(seq 1 60); do
    curl -fsS "http://127.0.0.1:${BACKEND_PORT}/_health" >/dev/null 2>&1 && break
    sleep 2
  done
  curl -fsS -o /dev/null -w 'Strapi /_health → %{http_code}\n' "http://127.0.0.1:${BACKEND_PORT}/_health" \
    || { warn "Strapi not healthy yet — check: pm2 logs roi-backend"; }

  # Boots its own in-process Strapi (no port) and loads data/content-v2 + media.
  # It stores a marker in the DB, so re-runs are a no-op unless `-- --force`.
  log "Loading site content into the database (npm run migrate:content)"
  as_user "cd '$BACKEND_DIR' && NODE_ENV=production npm run migrate:content" \
    || warn "Content migration failed — rerun: cd $BACKEND_DIR && npm run migrate:content"
}

# ----------------------------------------------------------------------------
phase_frontend() {
  log "Frontend code → $FRONTEND_DIR"
  if [[ -d $FRONTEND_DIR/.git ]]; then
    as_user "cd '$FRONTEND_DIR' && git pull --ff-only"
  else
    as_user "git clone '$FRONTEND_REPO' '$FRONTEND_DIR'"
  fi

  log "Frontend .env.production"
  # NEXT_PUBLIC_* values are inlined at BUILD time: change them → rebuild.
  # Same origin as the site, so the browser never needs CORS for these.
  # REVALIDATE_SECRET is kept across runs: the Strapi webhook stores it.
  local reval
  reval="$(grep -s '^REVALIDATE_SECRET=' "$FRONTEND_DIR/.env.production" | cut -d= -f2-)"
  [[ -n $reval ]] || reval="$(rand_alnum 24)"
  cat > "$FRONTEND_DIR/.env.production" <<ENV
NEXT_PUBLIC_SITE_URL=${BASE_URL}
NEXT_PUBLIC_STRAPI_URL=${BASE_URL}
NEXT_PUBLIC_API_URL=${BASE_URL}/api
# Server-side fetches (SSR / ISR) skip Nginx and hit Strapi directly:
STRAPI_INTERNAL_URL=http://127.0.0.1:${BACKEND_PORT}
# Strapi webhook → POST http://127.0.0.1:${FRONTEND_PORT}/revalidate, header x-revalidate-secret
REVALIDATE_SECRET=${reval}
ENV
  chown "$DEPLOY_USER":"$DEPLOY_USER" "$FRONTEND_DIR/.env.production"
  chmod 600 "$FRONTEND_DIR/.env.production"

  log "Frontend install + build"
  as_user "cd '$FRONTEND_DIR' && npm ci --no-audit --no-fund && npm run build"

  log "Start/reload roi-frontend under PM2"
  # Equivalent to `pm2 start npm --name roi-frontend -- start`, but bound to
  # 127.0.0.1 so :3000 is unreachable from outside even if UFW is off.
  as_user "cd '$FRONTEND_DIR' && (pm2 describe roi-frontend >/dev/null 2>&1 \
            && pm2 reload roi-frontend --update-env \
            || NODE_ENV=production pm2 start node_modules/next/dist/bin/next \
                 --name roi-frontend -- start -H 127.0.0.1 -p ${FRONTEND_PORT})"
}

# ----------------------------------------------------------------------------
phase_nginx() {
  log "Nginx reverse proxy"
  local here; here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  local src="$here/nginx-roi.conf"
  [[ -f $src ]] || { echo "Missing $src (upload it next to this script)" >&2; exit 1; }
  sed -e "s|__SERVER_NAME__|${PUBLIC_HOST}|g" \
      -e "s|__FRONTEND_PORT__|${FRONTEND_PORT}|g" \
      -e "s|__BACKEND_PORT__|${BACKEND_PORT}|g" \
      "$src" > /etc/nginx/sites-available/roi
  ln -sf /etc/nginx/sites-available/roi /etc/nginx/sites-enabled/roi
  rm -f /etc/nginx/sites-enabled/default
  nginx -t
  systemctl enable nginx
  systemctl reload nginx || systemctl restart nginx
}

# ----------------------------------------------------------------------------
phase_pm2() {
  log "PM2 boot persistence"
  env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$DEPLOY_USER" --hp "$DEPLOY_HOME" >/dev/null
  as_user "pm2 save"
  # Keep PM2 logs from filling the disk.
  as_user "pm2 module:list 2>/dev/null | grep -q pm2-logrotate || pm2 install pm2-logrotate"
  as_user "pm2 set pm2-logrotate:max_size 20M && pm2 set pm2-logrotate:retain 14" >/dev/null
  systemctl is-enabled "pm2-${DEPLOY_USER}" && echo "pm2-${DEPLOY_USER}.service enabled"
}

# ----------------------------------------------------------------------------
phase_firewall() {
  log "UFW firewall"
  [[ $SSH_PORT =~ ^[0-9]+$ ]] || { echo "Could not detect the SSH port; rerun with SSH_PORT=<port>" >&2; exit 1; }
  # SSH rule FIRST, before enabling, or you will lock yourself out.
  ufw allow "${SSH_PORT}/tcp" comment 'SSH (custom port)'
  ufw allow 80/tcp  comment 'HTTP'
  ufw allow 443/tcp comment 'HTTPS'
  ufw deny "${BACKEND_PORT}/tcp"  comment 'Strapi: Nginx only'
  ufw deny "${FRONTEND_PORT}/tcp" comment 'Next.js: Nginx only'
  ufw default deny incoming
  ufw default allow outgoing
  ufw status | grep -q "Status: active" || ufw --force enable
  ufw status verbose
}

# ----------------------------------------------------------------------------
phase_verify() {
  log "Verification"
  as_user "pm2 ls"
  echo "-- listening sockets (1337/3000 should be 127.0.0.1 only):"
  ss -ltnp | grep -E ":(80|443|${BACKEND_PORT}|${FRONTEND_PORT}|5432|3306|${SSH_PORT})\b" || true
  for path in / /api/home-page/full /admin /_health; do
    printf '%-24s ' "$path"
    curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1${path}" -H "Host: ${PUBLIC_HOST}"
  done
  echo
  echo "Site  : ${BASE_URL}/"
  echo "Admin : ${BASE_URL}/admin   (first visit creates the super-admin — do it now)"
}

# ----------------------------------------------------------------------------
ALL=(system db backend frontend nginx pm2 firewall verify)
if (( $# )); then PHASES=("$@"); else PHASES=("${ALL[@]}"); fi
for p in "${PHASES[@]}"; do
  declare -F "phase_$p" >/dev/null || { echo "Unknown phase: $p (valid: ${ALL[*]})" >&2; exit 1; }
  "phase_$p"
done
log "Done: ${PHASES[*]}"
