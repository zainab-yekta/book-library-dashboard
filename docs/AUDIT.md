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
- **The backend's lint step was silently broken.** `npx eslint .` always pulls the latest ESLint version since it was never pinned as a dependency, and ESLint v9+ requires a new-style `eslint.config.js` file that the backend never had. This meant the lint step failed on every single CI run. It never mattered before because the old deploy workflow deployed regardless of CI result, but once deploy was gated on CI passing, this pre-existing gap started blocking every deploy. Added a minimal `backend/eslint.config.js` and confirmed `npm run lint` passes.
- **Tests hit the live database.** `backend/tests/*.test.js` used to connect straight to `MONGO_URI`, which meant CI needed real Atlas credentials as GitHub secrets, and test runs could touch production data. Added `mongodb-memory-server`: a `globalSetup`/`globalTeardown` pair now spins up a temporary, in-memory MongoDB instance for the test run and tears it down after, with a throwaway `JWT_SECRET` set alongside it. No real database, no GitHub secrets, and no cost, needed for tests to pass. Confirmed locally: all 3 tests pass with no `.env` present at all.

These were small, low-risk changes that match the existing code style, no new dependencies or architecture changes beyond Docker, the CI wiring, and the in-memory test database.

## Needs your action (can't be done for you)

- **Rotate the MongoDB Atlas password.** The old connection string has been sitting in a public repo's history. Untracking the file doesn't remove it from past commits, so treat that password as burned and change it from the Atlas dashboard.
- **Update the `JWT_SECRET` on Render** to match (or replace) the new value, if you want the deployed backend to use it.
- **Consider scrubbing git history** of the old `.env` commits (tools like `git filter-repo` or GitHub's own guide for removing sensitive data) if you want the old credentials gone from the repo entirely, not just from the current snapshot. This rewrites history and needs a force-push, so it's optional and worth doing carefully.
- `completed Tasks.txt` and `BACKEND SUMMARY.docx` in the repo root are personal working notes, one of them has plaintext credentials and a real JWT in it. They were never committed to git, but they're sitting on disk next to a public repo. Worth moving somewhere private or deleting once you've pulled anything useful out of them.
- **The live backend still needs a real database to actually serve users.** The in-memory database above only covers CI tests. What broke the live site is that the MongoDB Atlas cluster's hostname no longer resolves at all (`ENOTFOUND`), consistent with a time-limited trial ending rather than the free tier itself expiring, Atlas's M0 tier is free indefinitely, not a trial. Recreating a free M0 cluster and updating `MONGO_URI` (locally, and in Render's environment variables) is the fix, this needs your own Atlas login.

## Still open

- **No server-side validation beyond "field is required."** No rate limiting, no `helmet`, no central error handler.
- **No frontend tests**, even though Testing Library is installed as a dependency. Backend test coverage is also still thin, three assertions total, nothing for register, book CRUD, or admin routes.
- **Create React App is deprecated upstream** and Express 5 is a fairly recent major version. Neither is broken today, but both are worth keeping in mind if you revisit the stack later.

See [EXPANSION_IDEAS.md](EXPANSION_IDEAS.md) for how to approach these.

## Bottom line

Nothing here is a dealbreaker for a portfolio piece. The urgent gaps (`.env`/`node_modules` tracking, open CORS, the under-protected admin route, dead code, the broken CI gates) are closed, and CI no longer depends on any paid service or secret. What's left is either a bigger effort (real test coverage) or account actions only you can do (rotating the Mongo password, recreating the Atlas cluster).
