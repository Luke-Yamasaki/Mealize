/**
 * Shared demo personas for recruiter / portfolio walkthroughs.
 * Clerk users are ensured at sign-in time; seed links DB rows by id.
 */

export const DEMO_PERSONA_IDS = [
  "nonprofit_manager",
  "volunteer",
  "business_manager",
] as const;

export type DemoPersonaId = (typeof DEMO_PERSONA_IDS)[number];

export type DemoPersona = {
  id: DemoPersonaId;
  /** Stable Clerk externalId for idempotent create/lookup. */
  externalId: string;
  email: string;
  firstName: string;
  lastName: string;
  label: string;
  description: string;
  /** Prisma `users.id` after a full seed (1 = nonprofit org, 12 = first business). */
  seedUserId: number;
  organizationId: number;
  isNonprofit: boolean;
  isManager: boolean;
  phone: string;
};

export const DEMO_PERSONAS: Record<DemoPersonaId, DemoPersona> = {
  nonprofit_manager: {
    id: "nonprofit_manager",
    externalId: "mealize-demo-nonprofit-manager",
    email: "demo.nonprofit.manager@mealize.demo",
    firstName: "Nonprofit",
    lastName: "Demo",
    label: "Nonprofit manager",
    description: "Post requests, message businesses, manage pickups",
    seedUserId: 1,
    organizationId: 1,
    isNonprofit: true,
    isManager: true,
    phone: "7200000001",
  },
  volunteer: {
    id: "volunteer",
    externalId: "mealize-demo-volunteer",
    email: "demo.volunteer@mealize.demo",
    firstName: "Volunteer",
    lastName: "Demo",
    label: "Nonprofit volunteer",
    description: "Browse feed, favorites, and message managers",
    seedUserId: 1001,
    organizationId: 1,
    isNonprofit: true,
    isManager: false,
    phone: "7200001001",
  },
  business_manager: {
    id: "business_manager",
    externalId: "mealize-demo-business-manager",
    email: "demo.business.manager@mealize.demo",
    firstName: "Business",
    lastName: "Demo",
    label: "Business manager",
    description: "List surplus, review pickup requests",
    seedUserId: 12,
    organizationId: 12,
    isNonprofit: false,
    isManager: true,
    phone: "7200000012",
  },
};

export function isDemoPersonaId(value: string): value is DemoPersonaId {
  return (DEMO_PERSONA_IDS as readonly string[]).includes(value);
}

export function isDemoEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase().endsWith("@mealize.demo");
}
