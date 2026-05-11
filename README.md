# Mealize

PoC that connects food businesses and nonprofits to reduce waste. The **runtime** app is the Next.js project in [`web/`](web/) (TypeScript, Clerk, tRPC, Zod, Prisma, Postgres/Neon, S3 presigned uploads).

The original **Create React App** UI lives in [`react-app/`](react-app/) and is kept as the visual and UX reference while screens are ported into `web/`. It is not wired to CI or production deploys in this branch.

![home](https://user-images.githubusercontent.com/89368363/172500968-3b3ac765-2c9f-42ae-8ba7-529f1294664e.png)

## Run locally

1. Copy [`web/.env.example`](web/.env.example) to `web/.env.local` and set at least `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY`.

2. Install, migrate, seed, and dev:

   ```bash
   cd web && npm install && npm run db:setup && npm run dev
   ```

   (`db:setup` runs `prisma migrate deploy` then `db:seed`. Seeds require tables created by migrations.)

   **`npm run db:seed`** rebuilds demo data from the historical Python seed files still readable via **`git show main:`** (`app/seeds/organizations.py`, `app/seeds/posts.py`). You need **`main`** in your local clone; the script clears existing rows in those tables first.

3. Open [http://localhost:3000](http://localhost:3000).

Optional: configure a Clerk webhook to `https://<your-host>/api/webhooks/clerk` and set `CLERK_WEBHOOK_SECRET` in `web/.env.local` (see `web/.env.example`).

## Docker (optional)

From the repo root:

```bash
docker build -t mealize-web --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... --build-arg CLERK_SECRET_KEY=sk_live_... .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... \
  -e CLERK_SECRET_KEY=sk_live_... \
  mealize-web
```

## Technologies

Next.js, React, TypeScript, Tailwind, Clerk, tRPC, TanStack Query, Zod, Prisma, PostgreSQL, AWS S3.

## Features (original product; UI port is ongoing)

### Light mode, dark mode and background customization

![dark mode](https://user-images.githubusercontent.com/89368363/172501703-5bb7eba2-025c-42bd-b553-459344914014.png)

### Post a request as a nonprofit manager

![request](https://user-images.githubusercontent.com/89368363/172500624-66a3949e-bf92-4e9c-a49e-929bba504e70.png)

### Post surplus food as a business manager

![item](https://user-images.githubusercontent.com/89368363/172500706-96ac7d6d-74f0-492a-87d5-fe7a6a8bee69.png)

### Add posts to favorites list

![favorites](https://user-images.githubusercontent.com/89368363/172501469-8b97ea15-d6c2-44ac-8e96-ba73c55ba06e.png)

### Notify managers about good items you find

![notify](https://user-images.githubusercontent.com/89368363/172501491-9dedb0e0-6804-434a-a2b6-c3b1cba9d4e0.png)

### Send pick up request to business owners (nonprofit managers)

![requestForm](https://user-images.githubusercontent.com/89368363/172501581-885299bd-f8a1-40e6-be37-2b2d2e7a846f.png)

### Accept or decline pick up requests (business managers)

![validate](https://user-images.githubusercontent.com/89368363/172501589-a996fc67-569e-4ee1-8ae0-2007a4f04a30.png)

### Check pending and accepted deliveries

![pending](https://user-images.githubusercontent.com/89368363/172501609-3b5e7349-c17d-4929-95e1-52d4f31e5b43.png)

### Filter by category and search items by keywords

![filter](https://user-images.githubusercontent.com/89368363/172502192-dd145fb9-88bc-4ead-bba2-19b9e4e05e9f.png)

![search](https://user-images.githubusercontent.com/89368363/172502081-ce828236-6441-42f1-9a75-b556c10c6df2.png)
