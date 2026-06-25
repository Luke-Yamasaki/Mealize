import "dotenv/config";
import { execSync } from "node:child_process";

import { Prisma, PrismaClient } from "@prisma/client";

import {
  parseOrganizationSeedSource,
  parsePostSeedSource,
} from "./seedSourceParser";
import { withPublicImageFallback } from "../lib/demoMediaUrl";

const prisma = new PrismaClient();

const CATEGORY_NAMES = ["Dairy", "Vegetables", "Fruits", "Grains", "Protein"];

/** Loads text from `git show main:<path>` (runs at repo root). */
function loadSeedSourceFromGit(relPath: string): string {
  const repoRoot = process.cwd();
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
        "Database tables are missing. From the repo root run:\n" +
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

  /** Set in `.env` so your Clerk user maps to seed user 1 and sees demo threads after `db:seed`. */
  const devClerk = process.env.MEALIZE_DEV_CLERK_ID?.trim();
  if (devClerk) {
    await prisma.user.update({
      where: { id: 1 },
      data: { clerkId: devClerk },
    });
    console.log("MEALIZE_DEV_CLERK_ID: linked seed user id=1 to your Clerk account for message demos.");
  }
}

/** Demo DM threads between seed users (requires at least users 1–3). */
async function seedDemoMessageBoards(firstPostId: number | undefined) {
  const userCount = await prisma.user.count();
  if (userCount < 3) {
    console.log("Skipping demo messages: need at least 3 users.");
    return;
  }

  const board12 = await prisma.messageboard.create({
    data: { userOne: 1, userTwo: 2 },
  });
  const board13 = await prisma.messageboard.create({
    data: { userOne: 1, userTwo: 3 },
  });
  const board23 = await prisma.messageboard.create({
    data: { userOne: 2, userTwo: 3 },
  });

  const t0 = Date.now();

  await prisma.message.create({
    data: {
      boardId: board12.id,
      senderId: 2,
      content:
        "Hi! I saw your post about the extra produce. Is Friday pickup still open?",
      postId: firstPostId,
      createdAt: new Date(t0 - 1000 * 60 * 120),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board12.id,
      senderId: 1,
      content:
        "Yes — we still have slots between 2–5pm. I can leave a crate by the loading dock.",
      createdAt: new Date(t0 - 1000 * 60 * 118),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board12.id,
      senderId: 2,
      content: "Perfect. I'll bring reusable bins. Thanks so much!",
      createdAt: new Date(t0 - 1000 * 60 * 90),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board12.id,
      senderId: 1,
      content: "Sounds great. Ping me when you're about 10 minutes out.",
      createdAt: new Date(t0 - 1000 * 60 * 88),
    },
  });

  await prisma.message.create({
    data: {
      boardId: board13.id,
      senderId: 1,
      content: "Quick question on the dairy listing—does anything need to stay refrigerated in transit?",
      createdAt: new Date(t0 - 1000 * 60 * 200),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board13.id,
      senderId: 3,
      content: "If it's under two hours we're fine with insulated cooler bags.",
      createdAt: new Date(t0 - 1000 * 60 * 198),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board13.id,
      senderId: 1,
      content: "Got it—we'll pack with ice packs just to be safe.",
      createdAt: new Date(t0 - 1000 * 60 * 195),
    },
  });

  await prisma.message.create({
    data: {
      boardId: board23.id,
      senderId: 3,
      content: "Are you still coordinating Saturday drop-offs for the shelter route?",
      createdAt: new Date(t0 - 1000 * 60 * 300),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board23.id,
      senderId: 2,
      content: "Yes—same window as last week. I can take two stops if that helps.",
      createdAt: new Date(t0 - 1000 * 60 * 298),
    },
  });
  await prisma.message.create({
    data: {
      boardId: board23.id,
      senderId: 3,
      content: "That would be amazing. I'll send the stop list in a bit.",
      createdAt: new Date(t0 - 1000 * 60 * 295),
    },
  });

  const msgCount = await prisma.message.count();
  const boardCount = await prisma.messageboard.count();
  console.log(`Demo messages: ${boardCount} boards, ${msgCount} total messages (including demos).`);
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

  const firstPost = await prisma.post.findFirst({
    orderBy: { id: "asc" },
    select: { id: true },
  });
  await seedDemoMessageBoards(firstPost?.id);

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
