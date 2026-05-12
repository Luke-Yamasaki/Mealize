import "dotenv/config";
import { execSync } from "node:child_process";
import path from "node:path";

import { Prisma, PrismaClient } from "@prisma/client";

import {
  parseOrganizationSeedSource,
  parsePostSeedSource,
} from "./seedSourceParser";
import { withPublicImageFallback } from "../lib/demoMediaUrl";

const prisma = new PrismaClient();

const CATEGORY_NAMES = ["Dairy", "Vegetables", "Fruits", "Grains", "Protein"];

/** Loads text from `git show main:<path>` (repo root = parent of `web/`). */
function loadSeedSourceFromGit(relPath: string): string {
  const repoRoot = path.join(process.cwd(), "..");
  try {
    return execSync(`git show main:${relPath}`, {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });
  } catch {
    throw new Error(
      `Could not run \`git show main:${relPath}\` from ${repoRoot}. ` +
        `Ensure branch main exists and paths app/seeds/organizations.py and app/seeds/posts.py are available in history.`,
    );
  }
}

/** Normalize imported date strings (e.g. 2022-9-08) for Postgres DATE */
function normalizeExpDate(s: string): Date {
  const parts = s.split("-").map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [y, mo, d] = parts;
    return new Date(Date.UTC(y, mo - 1, d));
  }
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return new Date(t);
  return new Date("2022-09-18");
}

async function clearDomainTables() {
  try {
    await prisma.message.deleteMany();
    await prisma.messageboard.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.delivery.deleteMany();
    await prisma.post.deleteMany();
    await prisma.event.deleteMany();
    await prisma.watchlist.deleteMany();
    await prisma.calendar.deleteMany();
    await prisma.user.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.category.deleteMany();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2021") {
      throw new Error(
        "Database tables are missing. From the web/ directory run:\n" +
          "  npx prisma migrate deploy\n" +
          "Then run npm run db:seed again.\n" +
          "(Or use: npm run db:setup — applies migrations then seeds.)",
      );
    }
    throw e;
  }
}

async function seedCategories() {
  for (const name of CATEGORY_NAMES) {
    await prisma.category.create({ data: { category: name } });
  }
}

async function seedUsersForOrganizations(orgCount: number) {
  for (let id = 1; id <= orgCount; id++) {
    const isNonprofit = id <= 11;
    await prisma.user.create({
      data: {
        clerkId: `seed_clerk_${id}`,
        organizationId: id,
        isNonprofit,
        isManager: true,
        firstName:
          id === 1 ? "Nonprofit" : id === 12 ? "Business" : "Manager",
        lastName: id === 1 ? "Demo" : id === 12 ? "Demo" : String(id),
        email: `seed_user_${id}@mealize.local`,
        phone: String(7200000000 + id),
        dob: new Date("1990-01-01"),
        deaf: false,
        wheelchair: false,
        learningDisabled: false,
        lgbtq: false,
        profileImageUrl: withPublicImageFallback(
          "https://mealizeaa.s3.amazonaws.com/nonprofit-manager.jpg",
          `seed-user-${id}`,
        ),
      },
    });
  }
}

async function main() {
  const orgSource = loadSeedSourceFromGit("app/seeds/organizations.py");
  const postSource = loadSeedSourceFromGit("app/seeds/posts.py");
  const orgRows = parseOrganizationSeedSource(orgSource);
  const postRows = parsePostSeedSource(postSource);

  if (orgRows.length === 0) {
    throw new Error("Parsed zero organizations from seed source files.");
  }

  await clearDomainTables();
  await seedCategories();

  for (const o of orgRows) {
    await prisma.organization.create({
      data: {
        federalId: o.federalId,
        isNonprofit: o.isNonprofit,
        logoUrl: withPublicImageFallback(o.logoUrl, `seed-org-${o.phone}-logo`),
        imageUrl: withPublicImageFallback(o.imageUrl, `seed-org-${o.phone}-hero`),
        hoursOpen: o.hoursOpen,
        hoursClose: o.hoursClose,
        timeslot: o.timeslot,
        name: o.name.slice(0, 100),
        description: o.description,
        street: o.street,
        zip: o.zip,
        city: o.city,
        state: o.state,
        phone: o.phone,
        email: o.email,
      },
    });
  }

  await seedUsersForOrganizations(orgRows.length);

  for (const p of postRows) {
    await prisma.post.create({
      data: {
        isItem: p.isItem,
        organizationId: p.organizationId,
        userId: p.userId,
        title: p.title,
        description: p.description,
        quantity: p.quantity,
        categoryId: p.categoryId,
        imageUrl: withPublicImageFallback(p.imageUrl, `seed-post-${p.title}-${p.organizationId}`),
        expDate: normalizeExpDate(p.expDate),
        status: p.status,
      },
    });
  }

  console.log(
    `Seed complete: ${orgRows.length} organizations, ${orgRows.length} seed users, ${postRows.length} posts, ${CATEGORY_NAMES.length} categories.`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
