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

- A `docker-compose.yml` for local dev so a new contributor doesn't need to install MongoDB or juggle two `npm run dev` terminals.
- Have CI actually gate deploys on tests and lint passing, right now the GitHub Actions workflows run lint but deploy regardless.
- Consider migrating off Create React App (it's no longer maintained) to Vite, mostly a build-tooling swap, not a rewrite.
- Consider TypeScript if you want stronger guarantees around the book/user shapes as the app grows.

## For the portfolio presentation specifically

- A short architecture diagram (frontend, backend, database, how auth flows between them) goes a long way for anyone skimming the repo.
- A "known limitations" section in the main README, listing things like the current test coverage or the CORS setup, reads as self-aware rather than incomplete. Recruiters and other engineers tend to trust a project more when it's honest about its own gaps.
- A short demo GIF or video embedded in the README, since not everyone will spin up the project locally to see it in action.
