import { headers } from "next/headers";
import { Webhook } from "svix";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ClerkUserCreated = {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string | null;
  };
};

/**
 * Optional: keeps a minimal `User` row in sync when `CLERK_WEBHOOK_SECRET` is set in the dashboard.
 * Uses `DEFAULT_ORGANIZATION_ID` (seeded org) until a full onboarding flow exists.
 */
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new Response("Webhook secret not configured", { status: 501 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkUserCreated;
  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserCreated;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created" && evt.type !== "user.updated") {
    return new Response("Ignored", { status: 200 });
  }

  const orgIdRaw = process.env.DEFAULT_ORGANIZATION_ID ?? "1";
  const organizationId = Number.parseInt(orgIdRaw, 10);
  if (Number.isNaN(organizationId)) {
    return new Response("DEFAULT_ORGANIZATION_ID invalid", { status: 500 });
  }

  const org = await prisma.organization.findUnique({ where: { id: organizationId } });
  if (!org) {
    return new Response(`Organization ${organizationId} not found. Run prisma db seed.`, {
      status: 500,
    });
  }

  const primary = evt.data.email_addresses?.[0]?.email_address;
  if (!primary) {
    return new Response("No primary email on Clerk user", { status: 400 });
  }

  const phone = `clerk-${evt.data.id.replace(/[^a-zA-Z0-9]/g, "").slice(-16)}`.padEnd(10, "0").slice(0, 20);

  await prisma.user.upsert({
    where: { clerkId: evt.data.id },
    create: {
      clerkId: evt.data.id,
      organizationId,
      isNonprofit: org.isNonprofit,
      isManager: false,
      firstName: evt.data.first_name?.trim() || "User",
      lastName: evt.data.last_name?.trim() || "Name",
      email: primary,
      phone,
      dob: new Date("1990-01-01"),
      profileImageUrl: evt.data.image_url || "https://placehold.co/256x256/png?text=Mealize",
      deaf: null,
      wheelchair: null,
      learningDisabled: null,
      lgbtq: null,
    },
    update: {
      email: primary,
      firstName: evt.data.first_name?.trim() || undefined,
      lastName: evt.data.last_name?.trim() || undefined,
      profileImageUrl: evt.data.image_url || undefined,
    },
  });

  return new Response("OK", { status: 200 });
}
