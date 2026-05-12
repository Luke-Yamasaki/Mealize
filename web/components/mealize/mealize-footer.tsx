"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-foreground underline decoration-border underline-offset-2 transition hover:decoration-primary"
    >
      {children}
    </a>
  );
}

export function MealizeFooter() {
  const muted = "text-muted-foreground";
  const label = "text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground";

  return (
    <footer className="mt-auto w-full border-t border-border bg-card text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0 space-y-2 lg:max-w-[min(100%,20rem)]">
          <p className={label}>Built with</p>
          <p className="text-sm font-semibold leading-snug text-foreground">
            Next.js, React, tRPC, Prisma, PostgreSQL, AWS S3
          </p>
          <p className={`text-xs font-medium leading-snug ${muted}`}>Design tooling includes Illustrator & XD.</p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:gap-10 lg:gap-14">
          <div className="space-y-2">
            <p className={label}>Mealize</p>
            <FooterLink href="https://github.com/Luke-Yamasaki/Mealize/wiki">About (wiki)</FooterLink>
            <Link
              href="/welcome"
              prefetch={false}
              className="block text-sm font-semibold text-foreground underline decoration-border underline-offset-2 transition hover:decoration-primary"
            >
              Welcome page
            </Link>
            <Link
              href="/organizations"
              prefetch={false}
              className="block text-sm font-semibold text-foreground underline decoration-border underline-offset-2 transition hover:decoration-primary"
            >
              Organizations
            </Link>
          </div>

          <div className="space-y-3">
            <p className={label}>Author</p>
            <p className="text-sm font-semibold leading-snug text-foreground">
              Luke Yamasaki — design & development
            </p>
            <ul className="flex items-center gap-3" aria-label="Social links">
              <li>
                <a
                  href="https://github.com/Luke-Yamasaki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="size-5" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/lukeyamasaki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" strokeWidth={2} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/lukeyamasac140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md px-2 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
