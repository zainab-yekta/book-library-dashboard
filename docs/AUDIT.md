# Project Audit

A review of the current state of the book library dashboard: what's solid, what needs attention, and what was already fixed as part of this pass.

## Overall take

This is a working full-stack project (React frontend, Node/Express backend, MongoDB Atlas) with the basics in place: JWT login, role-based access, CRUD for books, and a deployed frontend/backend. For a learning project or portfolio piece it holds up well. The issues below are normal for a first full-stack build and are all fixable without a rewrite.

## Fixed during this pass

- **`backend/.env` and `frontend/.env` were committed to the repo** with real values (the MongoDB connection string and the JWT secret). Both files are now untracked and ignored going forward. This does *not* erase them from git history, they're still visible in old commits on GitHub. The real fix is to rotate the credentials themselves (see "Needs your action" below).
- **`backend/node_modules` was committed to the repo** (about 7,700 files). Backend had no `.gitignore` at all, which is almost certainly how both the dependency folder and the `.env` file ended up tracked. Added `backend/.gitignore` (ignoring `node_modules`, `.env`, `uploads/*`) and untracked `node_modules` from git.
- **`frontend/.gitignore`** ignored `.env.local` variants but not plain `.env`. Added that entry.
- **`JWT_SECRET` in `backend/.env`** was a weak, guessable placeholder-style value. Replaced it locally with a long random one. Note: this only changes your local file, if the same secret is set in Render's environment variables for the live backend, update it there too, and note that doing so logs out anyone currently signed in.
- **CORS was wide open.** `app.use(cors())` allowed any origin even though an `allowedOrigins` list already existed in the file. It's now wired up (plus `localhost:3000` for local dev).
- **`/api/admin/stats` wasn't actually admin-only on the server.** It only checked that you were logged in. It now requires `adminOnly` like the other admin route.
- **Two versions of book creation existed.** The unused `createBook` controller and the duplicate inline version in `bookRoutes.js` are now one: the route calls the controller.
- **Stray `console.log` calls and commented-out dead code** in `authMiddleware.js`, `bookController.js`, `userRoutes.js`, `HomePage.js`, `LoginPage.js`, and `RegisterPage.js` are cleaned up.
- **Added `.env.example`** for both `frontend` and `backend`.
- **The backend README's routes/middleware list didn't match the code** (documented an `/api/auth` prefix, `adminMiddleware`, `errorHandler`, `morgan`, none of which exist). Updated it to reflect the real routes and middleware, also fixed a broken folder tree, a typo, and an unclosed code fence.
- **The frontend README had a few of its own inaccuracies**: two wrong component filenames, a "fake login" feature that isn't real, and a "toasts are done" claim when the code still uses plain `alert()` calls. Corrected.
- **Added Docker support**: a multi-stage `Dockerfile` in `backend/` and `frontend/` (a `dev` stage for local work, a `production` stage that builds a real deployable image, nginx for the frontend, plain `node` for the backend), plus a root `docker-compose.yml` that runs MongoDB, the backend, and the frontend together for local development against the `dev` stage. Both CI workflows now also run `docker build --target production` so a broken image gets caught before it ever reaches a deploy. Not runtime-tested here since Docker isn't installed in this environment, worth a quick `docker compose up` on your end to confirm it starts cleanly.
- **CI didn't actually gate anything.** `backend-ci.yml` only ran lint, never tests, and `deploy-backend.yml` deployed to Render on every push to `main` regardless of whether CI passed. `frontend-ci.yml` deployed to Vercel *before* running its lint step, and that lint step was silently broken anyway (the frontend had no `lint` script, so `npm run lint` always failed). Fixed: backend CI now runs tests, the Render deploy only fires after backend CI succeeds on `main`, the frontend now has a working lint script, lint runs before the Vercel deploy, and that deploy step is restricted to `main`.
- **Added an architecture diagram** (`docs/architecture.svg`), a **Known Limitations** section, and a preview GIF, all now in the main README.

These were small, low-risk changes that match the existing code style, no new dependencies or architecture changes beyond Docker and the CI wiring itself.

## Needs your action (can't be done for you)

- **Rotate the MongoDB Atlas password.** The old connection string has been sitting in a public repo's history. Untracking the file doesn't remove it from past commits, so treat that password as burned and change it from the Atlas dashboard.
- **Update the `JWT_SECRET` on Render** to match (or replace) the new value, if you want the deployed backend to use it.
- **Consider scrubbing git history** of the old `.env` commits (tools like `git filter-repo` or GitHub's own guide for removing sensitive data) if you want the old credentials gone from the repo entirely, not just from the current snapshot. This rewrites history and needs a force-push, so it's optional and worth doing carefully.
- `completed Tasks.txt` and `BACKEND SUMMARY.docx` in the repo root are personal working notes, one of them has plaintext credentials and a real JWT in it. They were never committed to git, but they're sitting on disk next to a public repo. Worth moving somewhere private or deleting once you've pulled anything useful out of them.
- **Add `MONGO_URI` and `JWT_SECRET` as GitHub Actions repository secrets** (Settings → Secrets and variables → Actions). The new backend test step needs them to connect to a database in CI, without them, `backend-ci.yml` will fail on the test step.

## Still open

- **No server-side validation beyond "field is required."** No rate limiting, no `helmet`, no central error handler.
- **Tests hit the live database.** `backend/tests/*.test.js` connect straight to `MONGO_URI`, there's no separate test database or in-memory Mongo. Coverage is thin too: three assertions total, nothing for register, book CRUD, or admin routes.
- **No frontend tests**, even though Testing Library is installed as a dependency.
- **The live backend is currently down** because the MongoDB Atlas free-tier cluster's trial period expired. This is why the mockups in this pass were built as static pages instead of screenshots of the running app, that's a billing/account issue on the Atlas side, not a code problem, and needs your login to resolve (renew the cluster or spin up a new free-tier one and update `MONGO_URI`).
- **Create React App is deprecated upstream** and Express 5 is a fairly recent major version. Neither is broken today, but both are worth keeping in mind if you revisit the stack later.

See [EXPANSION_IDEAS.md](EXPANSION_IDEAS.md) for how to approach these.

## Bottom line

Nothing here is a dealbreaker for a portfolio piece. The urgent gaps (`.env`/`node_modules` tracking, open CORS, the under-protected admin route, dead code) are closed. What's left is either a bigger effort (real test coverage) or a one-time account action only you can do (rotating the Mongo password).
