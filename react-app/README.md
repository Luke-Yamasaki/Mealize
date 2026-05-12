# Mealize legacy UI (Vite)

This folder is the historical Mealize UI (React 17, Redux, styled-components, React Router v5). It is **not** the production stack—that is [`../web/`](../web/) (**Next.js**). Next.js uses its own bundler (Turbopack/Webpack), not Vite.

## Scripts

- **`npm run dev`** — Vite dev server at [http://localhost:5173](http://localhost:5173) with `/api` proxied to `http://localhost:5000` (same as the old CRA `proxy`).
- **`npm run build`** — Production bundle in `dist/`.
- **`npm run preview`** — Serve the production build locally.

## Requirements

Run a backend that serves the legacy REST API on port **5000**, or change the proxy target in `vite.config.mjs`.

## Notes

- `babel-plugin-styled-components` is applied via `@vitejs/plugin-react`.
- Redux devtools compose is used in development; `redux-logger` was removed so the store works as ESM under Vite.
- All modules under `src/` use the **`.jsx`** extension so Vite can parse JSX. CRA allowed JSX in `.js` files; Vite’s import analysis does not.
