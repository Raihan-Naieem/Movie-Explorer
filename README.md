# 🎬 Movie Explorer

A responsive movie and TV show explorer built with **React**, **Vite**, **Tailwind CSS**, and the **TMDB API**. Browse trending titles, search for movies or shows by name, and open a detail modal with ratings, genres, release dates, and an overview.

## ✨ Features

- **Landing page** with a hero banner, feature sections, and a call-to-action.
- **Trending titles** — weekly trending TV shows are shown by default on the listing page.
- **Search** — search across movies and TV shows from the navbar (`/shows?search=...`).
- **Movie/show cards** — poster, title, release date, rating, and vote count.
- **Details modal** — full summary, genres, NSFW flag, rating, and release date. Closes on backdrop click or the X button, and locks page scrolling while open.
- **Responsive layout** — mobile-first grid and navbar using Tailwind CSS.
- **Loading and error states** while data is being fetched.
- **Normalized API data** — movie and TV responses are mapped into one consistent object shape, including `mediaType`.

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | Lucide React |
| Data | [TMDB API](https://developer.themoviedb.org/docs) |
| Linting | ESLint |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (or [Bun](https://bun.sh/))
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone git@github.com:Raihan-Naieem/Movie-Explorer.git
cd Movie-Explorer
bun install      # or: npm install
```

### API key



Copy `.env.example`

```bash
cp .example.env .env
```
and add your free API key

```env
VITE_TMDB_APIKEY=your_tmdb_api_key_here
```

### Run the app

```bash
bun run dev      # or: npm run dev
```

Vite starts a local dev server (usually at `http://localhost:5173`).

### Other scripts

```bash
bun run build    # production build into dist/
bun run preview  # preview the production build
bun run lint     # run ESLint
```

## 📁 Project Structure

```text
Movie-Explorer/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── package.json
└── src/
    ├── main.jsx                  # App entry + router setup
    ├── index.css                 # Tailwind import
    ├── Layouts/
    │   └── AppLayout.jsx         # Shared navbar/footer layout
    ├── Components/
    │   ├── Home.jsx              # Landing page
    │   ├── Navbar.jsx            # Navigation + search bar
    │   ├── SearchBar.jsx         # Search form (GET /shows?search=...)
    │   ├── Shows.jsx             # Listing page with grid + states
    │   ├── Card.jsx              # Individual title card
    │   ├── MoreDetailsPopUp.jsx  # Details modal
    │   ├── Footer.jsx            # Footer
    │   └── Socials.jsx           # Social icons
    ├── hooks/
    │   └── useShows.jsx          # Fetch + state for the listing page
    ├── services/
    │   └── TMDB.api.js           # TMDB endpoints and response formatting
    └── utils/
        └── Genre.enum.js         # TMDB genre ID → name mapping
```

## 🗺️ Routes

| Route | Description |
| --- | --- |
| `/` | Home / landing page |
| `/shows` | Weekly trending TV shows |
| `/shows?search=<query>` | Multi-search results for movies and TV shows |

## 🔌 API Endpoints Used

All requests go through `src/services/TMDB.api.js`:

| Function | TMDB Endpoint | Purpose | Status |
| --- | --- | --- | --- |
| `getTrendingShows` | `/trending/tv/week` | Weekly trending TV shows | ✅ Used |
| `getMoviesAndShowsByKeyWord` | `/search/multi` | Search movies + TV shows | ✅ Used |
| `getPopularShows` | `/tv/popular` | Popular TV shows | ⏳ Not used yet |
| `getPopularMovies` | `/movie/popular` | Popular movies | ⏳ Not used yet |
| `getTrendingMovies` | `/trending/movie/week` | Weekly trending movies | ⏳ Not used yet |
| `getShowsBYKeyWord` | `/search/tv` | Search TV shows only | ⏳ Not used yet |
| `getMoviesBYKeyWord` | `/search/movie` | Search movies only | ⏳ Not used yet |

Each fetch already returns pagination metadata alongside the normalized results:

```js
{
  pageTitle,
  results,
  totalPages,    // TMDB total_pages
  totalResults   // TMDB total_results
}
```

Responses are normalized into a consistent shape before reaching the UI:

```js
{
  id,
  title,          // title ?? name
  mediaType,      // media_type ?? inferred from title/name
  genres,         // resolved genre names
  releaseDate,    // release_date ?? first_air_date
  rating,         // vote_average
  voteCount,
  summary,        // overview
  isSafeForWork,  // adult
  imgURL          // full TMDB poster URL
}
```

## 📝 Notes

- The listing page currently shows **weekly trending TV shows** by default and switches to multi-search results when a `search` query is present.
- `totalPages` and `totalResults` are returned by the service layer but are **not yet consumed** by `useShows` or the UI.
- The app does not send a `page` parameter yet, so every request returns TMDB page 1.
- Poster images are loaded from `https://image.tmdb.org` at the `original` size.
- The search form submits as a `GET` request, so searches are shareable/bookmarkable via the URL.

## 🚧 Future Improvements

Planned enhancements, roughly in priority order:

### 1. Dedicated browse pages

Split the single listing page into focused routes so each TMDB feed has its own page:

| Planned route | Feed |
| --- | --- |
| `/movies/popular` | Popular movies |
| `/movies/trending` | Weekly trending movies |
| `/shows/popular` | Popular TV shows |
| `/shows/trending` | Weekly trending TV shows |
| `/trending/week` | Movies + shows trending this week |
| `/trending/day` | Daily trending titles |

- Add these links/tabs to the navbar and home page.
- Keep `/shows` as a combined browse/search page, or redirect it to a default feed.
- Reuse a shared `ListingPage` component and a generic data hook instead of duplicating logic.

### 2. Use more of the TMDB API

Wire up the service functions that already exist but are currently unused:

- `getPopularShows` — popular TV shows page.
- `getPopularMovies` — popular movies page.
- `getTrendingMovies` — trending movies page.
- `getShowsBYKeyWord` — TV-only search tab.
- `getMoviesBYKeyWord` — movie-only search tab.

Add new service functions and pages for:

- **Details:** `/movie/{id}`, `/tv/{id}` (full detail page instead of only a modal).
- **Cast & crew:** `/movie/{id}/credits`, `/tv/{id}/credits`.
- **Trailers:** `/movie/{id}/videos`, `/tv/{id}/videos`.
- **Recommendations:** `/movie/{id}/recommendations`, `/tv/{id}/recommendations`.
- **More feeds:** `/movie/top_rated`, `/movie/upcoming`, `/movie/now_playing`, `/tv/top_rated`, `/tv/airing_today`, `/tv/on_the_air`.
- **Discover + filters:** `/discover/movie`, `/discover/tv` with genre, year, rating, and sort filters.
- **People:** `/person/{id}` for actor pages.

### 3. Proper pagination

Replace the current page-1-only behavior with real, URL-driven pagination:

- Read and write a `page` query param (for example `/shows?page=2` or `/shows?search=batman&page=3`).
- Pass `page` through the service layer and append `&page={page}` to TMDB requests.
- Use the `totalPages` value already returned by `fetchPageData` to bound the controls.
- Add a reusable `Pagination` component in this style:

  ```text
  [<< 0 1 2 3 4 5 >>]
  ```

  - First/last buttons (`<<`, `>>`) jump to the first/last page.
  - Show a sliding window of page numbers (e.g. 5–7 at a time) with `…` ellipsis for skipped ranges.
  - Highlight the active page.
  - Disable `<<` on page 1 and `>>` on the last page.
  - Keep the current `search` term when changing pages.
  - Scroll back to the top of the grid after a page change.

- Reset to page 1 whenever the search term changes.
- Show "no results" cleanly when `totalResults` is 0.

### 4. UX and quality

- **Loading skeletons** instead of a plain "Loading..." message.
- **Debounced search** so results update while typing.
- **Caching / request cancellation** to avoid duplicate fetches and race conditions (AbortController or a data library such as TanStack Query).
- **Better error handling** — surface TMDB error messages and add a retry button.
- **Accessibility** — focus trap in the modal, `Escape` to close, ARIA labels, and keyboard-navigable pagination.
- **Image optimization** — use TMDB's `w500`/`w780` sizes for cards instead of `original`.
- **Favorites / watchlist** persisted in `localStorage`.
- **Dark/light theme** toggle.
- **Tests** — unit tests for `formatResults` and the pagination helpers, plus component tests for the card and modal.
- **Deployment** — add a CI workflow and deploy to Vercel/Netlify with `VITE_TMDB_APIKEY` configured.

## 📄 License

Copyright (c) 2026 Raihan-Naieem. All Rights Reserved.
