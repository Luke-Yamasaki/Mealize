import type { User as ClerkUser } from "@clerk/backend";
import { clerkClient } from "@clerk/nextjs/server";

import {
  type DemoPersona,
  type DemoPersonaId,
  DEMO_PERSONAS,
} from "@/lib/demo-personas";
import { withPublicImageFallback } from "@/lib/demoMediaUrl";
import { prisma } from "@/lib/prisma";

async function findClerkUserByExternalId(
  externalId: string,
): Promise<ClerkUser | null> {
  const client = await clerkClient();
  const listed = await client.users.getUserList({
    externalId: [externalId],
    limit: 1,
  });
  return listed.data[0] ?? null;
}

async function findClerkUserByEmail(email: string): Promise<ClerkUser | null> {
  const client = await clerkClient();
  const listed = await client.users.getUserList({
    emailAddress: [email],
    limit: 1,
  });
  return listed.data[0] ?? null;
}

/** Creates or reuses the Clerk user for a demo persona (no password; ticket sign-in only). */
export async function ensureDemoClerkUser(
  persona: DemoPersona,
): Promise<ClerkUser> {
  const existing =
    (await findClerkUserByExternalId(persona.externalId)) ??
    (await findClerkUserByEmail(persona.email));
  if (existing) return existing;

  const client = await clerkClient();
  return client.users.createUser({
    externalId: persona.externalId,
    emailAddress: [persona.email],
    firstName: persona.firstName,
    lastName: persona.lastName,
    skipPasswordRequirement: true,
    skipPasswordChecks: true,
    publicMetadata: {
      mealizeDemo: true,
      persona: persona.id,
    },
  });
}

/**
 * Ensures the domain `users` row matches the Clerk demo identity and role flags.
 * Requires seeded organizations (and seed users 1 / 12 for manager personas).
 */
export async function ensureDemoDomainUser(
  persona: DemoPersona,
  clerkUserId: string,
) {
  const org = await prisma.organization.findUnique({
    where: { id: persona.organizationId },
  });
  if (!org) {
    throw new Error(
      `Demo organization ${persona.organizationId} is missing. Run \`npm run db:seed\` against your database first.`,
    );
  }

  const profileImageUrl = withPublicImageFallback(
    "https://mealizeaa.s3.amazonaws.com/nonprofit-manager.jpg",
    `demo-${persona.id}`,
  );

  const byClerk = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
  if (byClerk) {
    return prisma.user.update({
      where: { id: byClerk.id },
      data: {
        organizationId: persona.organizationId,
        isNonprofit: persona.isNonprofit,
        isManager: persona.isManager,
        firstName: persona.firstName,
        lastName: persona.lastName,
        email: persona.email,
        phone: persona.phone,
        profileImageUrl,
      },
    });
  }

  const bySeedId = await prisma.user.findUnique({
    where: { id: persona.seedUserId },
  });
  if (bySeedId) {
    return prisma.user.update({
      where: { id: bySeedId.id },
      data: {
        clerkId: clerkUserId,
        organizationId: persona.organizationId,
        isNonprofit: persona.isNonprofit,
        isManager: persona.isManager,
        firstName: persona.firstName,
        lastName: persona.lastName,
        email: persona.email,
        phone: persona.phone,
        profileImageUrl,
      },
    });
  }

  const byEmail = await prisma.user.findUnique({ where: { email: persona.email } });
  if (byEmail) {
    return prisma.user.update({
      where: { id: byEmail.id },
      data: {
        clerkId: clerkUserId,
        organizationId: persona.organizationId,
        isNonprofit: persona.isNonprofit,
        isManager: persona.isManager,
        firstName: persona.firstName,
        lastName: persona.lastName,
        phone: persona.phone,
        profileImageUrl,
      },
    });
  }

  return prisma.user.create({
    data: {
      id: persona.seedUserId,
      clerkId: clerkUserId,
      organizationId: persona.organizationId,
      isNonprofit: persona.isNonprofit,
      isManager: persona.isManager,
      firstName: persona.firstName,
      lastName: persona.lastName,
      email: persona.email,
      phone: persona.phone,
      dob: new Date("1990-01-01"),
      deaf: false,
      wheelchair: false,
      learningDisabled: false,
      lgbtq: false,
      profileImageUrl,
    },
  });
}

export async function createDemoSignInToken(personaId: DemoPersonaId) {
  const persona = DEMO_PERSONAS[personaId];
  const clerkUser = await ensureDemoClerkUser(persona);
  await ensureDemoDomainUser(persona, clerkUser.id);

  const client = await clerkClient();
  const token = await client.signInTokens.createSignInToken({
    userId: clerkUser.id,
    expiresInSeconds: 60 * 5,
  });

  return {
    personaId,
    token: token.token,
    url: token.url,
  };
}
