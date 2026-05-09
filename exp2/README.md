# Assignment 2 — GitHub, Docker, Angular (Register / Login / Profile)

Minimal demo app in this folder (`exp2`). Code comments in `.ts` files explain services, guards, and templates.

---

## a) GitHub + Git commands

You create the GitHub account in the browser; the repo is created on GitHub, then you link your PC with Git.

**One-time (install Git):** download from [https://git-scm.com](https://git-scm.com).

**Typical flow (run in PowerShell or Git Bash):**

```bash
cd path/to/wad-veda
git init
git add .
git commit -m "Add exp2 Angular assignment"
```

On GitHub: **New repository** → copy the URL (HTTPS or SSH), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace the URL with your real repo. If GitHub shows a different default branch name, use that instead of `main`.

---

## b) Docker environment

This project uses a **normal Docker** setup (Node to build, **Nginx** to serve). That is enough for a static Angular app.

**NVIDIA Container Toolkit** is for **GPU** workloads (ML, CUDA). This Angular app does not need a GPU; your assignment’s “NVIDIA Docker or any other” is satisfied by **Docker + Node + Nginx** here. If a subject specifically requires GPU, install [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) and add `deploy.resources.reservations.devices` in `docker-compose.yml` only when you run GPU images.

**Build and run (from `exp2` folder):**

```bash
docker build -t exp2-app .
docker run -p 8080:80 exp2-app
```

Open **http://localhost:8080**.

Or:

```bash
docker compose up --build
```

---

## c) Angular app — what it does

| Feature | Where |
|--------|--------|
| **Register user** | `register/register.component.ts` → `AuthService.register()` saves to `localStorage` key `app_users` |
| **Login user** | `login/login.component.ts` → `AuthService.login()` checks users, sets session key `session_user` |
| **Profile (show user data)** | `profile/profile.component.ts` reads `AuthService.profile()` |
| **Block /profile when logged out** | `auth.guard.ts` + route `canActivate: [authGuard]` in `app.routes.ts` |

**Run locally (dev server):**

```bash
cd exp2
npm install
npm start
```

Open **http://localhost:4200**. Flow: **Register** → **Login** → **Profile**.

**Concepts:** standalone components, `RouterOutlet` / `routerLink`, template-driven forms (`FormsModule`, `ngModel`), `inject()` + functional route guard, `Injectable` service, `localStorage` as a fake backend (for minimum code only).

---

## File map

- `src/app/auth.service.ts` — register / login / profile / logout
- `src/app/auth.guard.ts` — protect `/profile`
- `src/app/login|register|profile/*.component.ts` — UI + inline templates
- `src/app/app.routes.ts` — routes
- `Dockerfile`, `nginx.conf`, `docker-compose.yml` — container build & SPA routing
