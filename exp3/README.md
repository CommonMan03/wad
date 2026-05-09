# Assignment 3 — Node static site + Express + MongoDB (4 APIs)

Minimal server for **Assignment 2**-style flows: **register**, **login**, **show profile (get user)**, **delete user**.

---

## a) Static website

- Files in **`public/`** are served by Express: `express.static(path.join(__dirname, 'public'))`.
- Open **http://localhost:3000/** → **`public/index.html`** is returned for `/` (default document behavior).

---

## b) Four APIs (MongoDB)

| Method | Path | Role (Assignment 2 concept) |
|--------|------|-----------------------------|
| `POST` | `/api/register` | **Register** — insert user |
| `POST` | `/api/login` | **Login** — verify email/password, return `id`, `name`, `email` |
| `GET` | `/api/user/:id` | **Profile / user data** — read one user (no password in JSON) |
| `DELETE` | `/api/user/:id` | **Remove user** — delete document (extra CRUD op for “four operations”) |

`id` is the MongoDB `_id` string returned from **register** or **login**.

---

## Setup

1. **MongoDB** running locally, or use Atlas and set `MONGODB_URI` in `.env`.
2. Copy env file and install:

```bash
cd exp3
copy .env.example .env
npm install
npm start
```

3. Browser: **http://localhost:3000**  
4. APIs: base URL **http://localhost:3000**

---

## Quick tests (curl)

Replace `USER_ID` with an `id` from register/login response.

```bash
curl -X POST http://localhost:3000/api/register -H "Content-Type: application/json" -d "{\"name\":\"A\",\"email\":\"a@b.com\",\"password\":\"123\"}"

curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"email\":\"a@b.com\",\"password\":\"123\"}"

curl http://localhost:3000/api/user/USER_ID

curl -X DELETE http://localhost:3000/api/user/USER_ID
```

---

## Code map

- **`server.js`** — `dotenv`, `express`, `cors`, `mongoose.connect`, static middleware, four route handlers.
- **`public/`** — static HTML/CSS/assets only.

---

## Linking Assignment 2 (Angular)

Point `AuthService` HTTP calls to `http://localhost:3000/api/...` and use `HttpClient` instead of `localStorage` if your teacher wants full stack; this README keeps Assignment 3 as a **small API + static** server only.

---

## Security note

Passwords are stored **in plain text** for minimum lab code only. Real apps must **hash** (e.g. bcrypt) and use **HTTPS** + tokens (JWT/sessions).
