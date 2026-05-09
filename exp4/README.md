# exp4 — jQuery Mobile + Full-stack mini (Education) + AWS notes

Small **Education** domain app: mobile-first UI (jQuery Mobile), **Node/Express** API, **MongoDB** persistence.

---

## a) jQuery Mobile (what the code does)

| Concept | Where |
|--------|--------|
| **Multi-page template** | Several `<div data-role="page" id="...">` in one HTML file; jQM shows one at a time. |
| **Header / content** | `data-role="header"` and `data-role="content"` structure each screen. |
| **Listview** | `data-role="listview"` for tappable lists and menus. |
| **Navigation** | `<a href="#courses">` switches pages; `data-icon="home"` adds toolbar icons. |
| **Lifecycle** | `$(document).on('pageinit', '#courses', ...)` runs when that page is first built — good place for `$.getJSON`. |
| **AJAX** | `$.getJSON('/api/courses')` and `$.ajax` POST to `/api/enroll` hit the same Express server (no CORS issues). |

Files: **`public/index.html`** (all UI + inline script comments).

---

## b) Full stack (mini project)

| Layer | Tech |
|-------|------|
| Front | jQuery Mobile (CDN) in **`public/`** |
| Back | **`server.js`** — Express + JSON routes |
| Data | **MongoDB** — `Enrollment` documents: `studentName`, `courseTitle`, `enrolledAt` |

**APIs**

- `GET /api/courses` — catalog (fixed array in code).
- `POST /api/enroll` — `{ studentName, courseTitle }` → saves to DB.
- `GET /api/enrollments` — list for “My enrollments”.

**Run locally**

```bash
cd exp4
copy .env.example .env
npm install
npm start
```

Open **http://localhost:3000** (use phone emulator or narrow browser for “mobile” feel). MongoDB must be running, or set **`MONGODB_URI`** to **MongoDB Atlas**.

---

## c) Deploy on **AWS Elastic Beanstalk** (typical for this Node app)

You do these steps in the **AWS Console** (or EB CLI); the repo only needs **`package.json`** + **`Procfile`**.

1. Zip the **`exp4`** folder contents (include `package.json`, `server.js`, `public/`, `Procfile` — **not** `node_modules`; EB runs `npm install`).
2. **Elastic Beanstalk** → Create environment → **Web server environment** → Platform: **Node.js**.
3. Upload the zip. EB sets **`PORT`**; **`server.js`** already uses `process.env.PORT`.
4. **Configuration** → Software → **Environment properties**: add **`MONGODB_URI`** (e.g. Atlas connection string, or DocumentDB inside a VPC).
5. Health check path: use **`/`** (static `index.html` loads).

**Mongo in cloud:** easiest is **MongoDB Atlas** + allow EB outbound IP (or `0.0.0.0/0` for class demos only). For **VPC-only** DB, place the EB environment in the **same VPC** as the database and open the DB security group to the EB instance security group.

---

## d) **AWS VPC** (short)

A **VPC** is your private network in AWS. **Elastic Beanstalk** can launch EC2 instances **inside a VPC** so traffic to a private **MongoDB/DocumentDB** subnet never hits the public internet. Steps (high level): create VPC + subnets → create EB environment and choose that VPC + subnets → security groups allow app → database on private subnets.

You don’t need custom VPC for a public Atlas URI; you **do** need VPC planning for enterprise-style private databases.

---

## File map

- **`Procfile`** — `web: node server.js` for Elastic Beanstalk.
- **`server.js`** — static + Mongo + REST (commented).
- **`public/index.html`** — jQuery Mobile + AJAX (commented).

---

## Security note

Demo only: no auth on APIs. Production would add login, HTTPS, and validation.
