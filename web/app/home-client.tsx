"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

import { trpc } from "@/lib/trpc/react";

export function HomeClient() {
  const { isLoaded, isSignedIn } = useAuth();
  const categories = trpc.category.list.useQuery();
  const posts = trpc.post.list.useQuery();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Mealize</h1>
          <p className="text-sm text-zinc-600">
            Next.js, Clerk, tRPC, Zod, Prisma, Neon, and S3 presigned uploads.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isLoaded && !isSignedIn ? (
            <>
              <Link
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                href="/sign-up"
              >
                Sign up
              </Link>
            </>
          ) : null}
          {isLoaded && isSignedIn ? <UserButton /> : null}
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Categories</h2>
        {categories.isLoading ? (
          <p className="mt-2 text-sm text-zinc-600">Loading…</p>
        ) : categories.error ? (
          <p className="mt-2 text-sm text-red-600">
            Could not load categories. Set `DATABASE_URL` and run migrations plus seed.
          </p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {categories.data?.map((c) => (
              <li
                key={c.id}
                className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800"
              >
                {c.category}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Posts</h2>
        {posts.isLoading ? (
          <p className="mt-2 text-sm text-zinc-600">Loading…</p>
        ) : posts.error ? (
          <p className="mt-2 text-sm text-red-600">
            Could not load posts. Apply migrations when the database is available.
          </p>
        ) : posts.data?.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-600">No posts yet. Seed data or create one via tRPC.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {posts.data?.map((p) => (
              <li key={p.id} className="rounded-xl border border-zinc-100 p-3">
                <p className="font-medium text-zinc-900">{p.title}</p>
                <p className="text-sm text-zinc-600">{p.description}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {p.organization.name} · {p.category.category}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
