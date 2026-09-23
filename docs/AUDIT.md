# Project Audit

A review of the current state of the book library dashboard: what's solid, what needs attention, and what was already fixed as part of this pass.

## Overall take

This is a working full-stack project (React frontend, Node/Express backend, MongoDB Atlas) with the basics in place: JWT login, role-based access, CRUD for books, and a deployed frontend/backend. For a learning project or portfolio piece it holds up well. The issues below are normal for a first full-stack build and are all fixable without a rewrite.

## Fixed during this pass

- **`backend/.env` and `frontend/.env` were committed to the repo** with real values (the MongoDB connection string and the JWT secret). Both files are now untracked and ignored going forward. This does *not* erase them from git history, they're still visible in old commits on GitHub. The real fix is to rotate the credentials themselves (see "Needs your action" below).
- **`backend/node_modules` was committed to the repo** (about 7,700 files). Backend had no `.gitignore` at all, which is almost certainly how both the dependency folder and the `.env` file ended up tracked. Added `backend/.gitignore` (ignoring `node_modules`, `.env`, `uploads/*`) and untracked `node_modules` from git.
- **`frontend/.gitignore`** ignored `.env.local` variants but not plain `.env`. Added that entry.
- **`JWT_SECRET` in `backend/.env`** was a weak, guessable placeholder-style value. Replaced it locally with a long random one. Note: this only changes your local file, if the same secret is set in Render's environment variables for the live backend, update it there too, and note that doing so logs out anyone currently signed in.

None of this touched application code, only `.gitignore` files and the local `.env` value.

## Needs your action (can't be done for you)

- **Rotate the MongoDB Atlas password.** The old connection string has been sitting in a public repo's history. Untracking the file doesn't remove it from past commits, so treat that password as burned and change it from the Atlas dashboard.
- **Update the `JWT_SECRET` on Render** to match (or replace) the new value, if you want the deployed backend to use it.
- **Consider scrubbing git history** of the old `.env` commits (tools like `git filter-repo` or GitHub's own guide for removing sensitive data) if you want the old credentials gone from the repo entirely, not just from the current snapshot. This rewrites history and needs a force-push, so it's optional and worth doing carefully.
- `completed Tasks.txt` and `BACKEND SUMMARY.docx` in the repo root are personal working notes, one of them has plaintext credentials and a real JWT in it. They were never committed to git, but they're sitting on disk next to a public repo. Worth moving somewhere private or deleting once you've pulled anything useful out of them.

## Other things worth knowing about

- **CORS is wide open.** `backend/index.js` builds an `allowedOrigins` list but never uses it, the actual call is `app.use(cors())` with no restriction, so any site can call the API. The list is right there in the file, just needs wiring up.
- **`/api/admin/stats` isn't actually admin-only on the server.** It only checks that you're logged in, not that you're an admin. The comment in the code says enforcement happens "in the frontend," but a regular user can hit the endpoint directly and get the stats.
- **Two versions of book creation exist.** `bookController.js` has a `createBook` function that's never used, the actual route in `bookRoutes.js` re-implements it inline and is missing the `genre`/`year` fields the controller version handles. Worth picking one and deleting the other.
- **No server-side validation beyond "field is required."** No rate limiting, no `helmet`, no central error handler, even though the backend README describes one.
- **The backend README doesn't match the code.** It documents an `/api/auth` prefix, an `adminMiddleware`, `morgan`, and `concurrently`, none of which exist in the actual project. Worth a pass to bring it in line, or trim it down to what's real.
- **Tests hit the live database.** `backend/tests/*.test.js` connect straight to `MONGO_URI`, there's no separate test database or in-memory Mongo. Coverage is thin too: three assertions total, nothing for register, book CRUD, or admin routes.
- **No frontend tests**, even though Testing Library is installed as a dependency.
- **A few stray `console.log` calls** left in `authMiddleware.js` and `bookController.js`, including one that logs a full user object. Harmless in a demo but worth cleaning up before calling it done.
- **Some commented-out old code** sitting in `LoginPage.js`, `RegisterPage.js`, and `HomePage.js`.
- **The live backend is currently down** because the MongoDB Atlas free-tier cluster's trial period expired. This is why the mockups in this pass were built as static pages instead of screenshots of the running app, that's a billing/account issue on the Atlas side, not a code problem, and needs your login to resolve (renew the cluster or spin up a new free-tier one and update `MONGO_URI`).
- **Create React App is deprecated upstream** and Express 5 is a fairly recent major version. Neither is broken today, but both are worth keeping in mind if you revisit the stack later.

## Bottom line

Nothing here is a dealbreaker for a portfolio piece, and the two changes made in this pass (the `.gitignore` fixes and getting `.env`/`node_modules` out of tracking) close the most urgent gap. The remaining items are either quick code fixes (CORS, the admin route, dead code) or one-time account actions only you can do (rotating the Mongo password).
