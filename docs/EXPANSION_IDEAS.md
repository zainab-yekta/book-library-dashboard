# Ideas for Taking This Further

Rough list of what would make this project stronger, grouped by how much effort each one takes. Pick what fits the time you have, none of this needs to happen at once.

## Quick wins (done)

These were small enough to just fix directly rather than leave as a suggestion:

- CORS is now restricted to the deployed frontend origins (plus `localhost:3000` for local dev) instead of allowing any origin.
- `/api/admin/stats` now requires `adminOnly`, not just `protect`.
- The duplicate inline book-creation logic in `bookRoutes.js` is gone, the route now calls the existing `createBook` controller.
- Leftover `console.log` calls and commented-out dead code are cleaned up across the backend and the frontend pages.
- Added `.env.example` for both `frontend` and `backend`.
- Updated the backend README so its routes and middleware list match the actual code.

## Testing

- Point backend tests at an in-memory database (`mongodb-memory-server`) instead of the real one, so `npm test` can't touch production data.
- Add coverage for registration, book CRUD, and the admin-only routes, right now only three assertions exist.
- Add a handful of frontend component tests since Testing Library is already installed and unused.

## Features worth adding

- A dedicated book detail page instead of everything living on the dashboard.
- Pagination or infinite scroll once the book list grows past a page or two.
- Book cover uploads, or pull cover art from a public API (Open Library, Google Books) instead of a single static placeholder image.
- Categories or tags, plus filtering by them.
- Ratings or a simple "want to read / reading / finished" status per book.
- A real About page instead of the current placeholder heading.

## Infrastructure and developer experience

- **Done:** added `docker-compose.yml` plus a `Dockerfile` in `frontend/` and `backend/`, so `docker compose up` starts MongoDB, the backend, and the frontend together, no local Node/Mongo install needed. See the "Running with Docker" section in the main README.
- **Done:** CI now actually gates deploys. `backend-ci.yml` runs the test suite (it only ran lint before), and `deploy-backend.yml` triggers off that workflow succeeding instead of firing on every push to main regardless. `frontend-ci.yml` now runs lint before the Vercel deploy step instead of after, and the deploy step only fires on `main`. The frontend also had no `lint` script at all, added one, so that gate was previously a no-op.
- Not done yet, still worth considering: migrating off Create React App (no longer maintained) to Vite. Mostly a build-tooling swap, not a rewrite, but touches env variable names (`REACT_APP_*` → `VITE_*`) and a few config files, so it's a deliberate task on its own rather than something to bundle in silently.
- Not done yet, still worth considering: TypeScript, if you want stronger guarantees around the book/user shapes as the app grows. This one's a genuine, gradual migration (rename files, add types incrementally), not a quick pass.

## For the portfolio presentation specifically

- A short architecture diagram (frontend, backend, database, how auth flows between them) goes a long way for anyone skimming the repo.
- A "known limitations" section in the main README, listing things like the current test coverage or the CORS setup, reads as self-aware rather than incomplete. Recruiters and other engineers tend to trust a project more when it's honest about its own gaps.
- A short demo GIF or video embedded in the README, since not everyone will spin up the project locally to see it in action.
