# Ideas for Taking This Further

Rough list of what would make this project stronger, grouped by how much effort each one takes. Pick what fits the time you have, none of this needs to happen at once.

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

## Build tooling

Create React App still works fine here, but it's no longer maintained upstream. Moving to Vite is mostly a build-tooling swap rather than a rewrite, it would mean renaming the `REACT_APP_*` env variables to `VITE_*` and updating a few config files. TypeScript is worth considering too, for stronger guarantees around the book and user shapes as the app grows. Neither is urgent, both are reasonable to pick up later.
