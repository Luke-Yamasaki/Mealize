import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { withPublicImageFallback } from "@/lib/demoMediaUrl";
import { router, publicProcedure } from "@/server/trpc";

export const organizationRouter = router({
  /** All organizations (single list, stable sort: businesses then nonprofits, then name). */
  list: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.prisma.organization.findMany({
      orderBy: [{ isNonprofit: "asc" }, { name: "asc" }],
    });
    return rows.map((o) => ({
      ...o,
      logoUrl: withPublicImageFallback(o.logoUrl, `org-list-${o.id}-logo`),
      imageUrl: withPublicImageFallback(o.imageUrl, `org-list-${o.id}-hero`),
    }));
  }),

  /** Legacy `getBatchedOrganizations` shape: split by `isNonprofit`. */
  batched: publicProcedure.query(async ({ ctx }) => {
    const all = await ctx.prisma.organization.findMany({
      orderBy: { id: "asc" },
    });
    return {
      businesses: all.filter((o) => !o.isNonprofit),
      nonprofits: all.filter((o) => o.isNonprofit),
    };
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const org = await ctx.prisma.organization.findUnique({
        where: { id: input.id },
      });
      if (!org) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Organization not found" });
      }
      return {
        ...org,
        logoUrl: withPublicImageFallback(org.logoUrl, `org-${org.id}-logo`),
        imageUrl: withPublicImageFallback(org.imageUrl, `org-${org.id}-hero`),
      };
    }),

  /** Aggregate counts and rough impact numbers for the public org profile. */
  impactStats: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const orgId = input.id;
      const [activePosts, deliveryTouchCount, completedTouchCount] = await Promise.all([
        ctx.prisma.post.count({ where: { organizationId: orgId, status: 0 } }),
        ctx.prisma.delivery.count({
          where: { OR: [{ businessId: orgId }, { nonprofitId: orgId }] },
        }),
        ctx.prisma.delivery.count({
          where: {
            OR: [{ businessId: orgId }, { nonprofitId: orgId }],
            NOT: { completed: 0 },
          },
        }),
      ]);

      const estimatedPoundsReported = completedTouchCount * 22 + activePosts * 6;
      const estimatedMealsEquivalent = Math.round(completedTouchCount * 2.5 + activePosts * 0.8);

      return {
        activePosts,
        deliveryRelationships: deliveryTouchCount,
        completedDeliveriesTouchingOrg: completedTouchCount,
        estimatedPoundsReported,
        estimatedMealsEquivalent,
        estimationNote:
          "Rough, goodwill estimates from completed deliveries and open posts. Replace with logged weights when your workflow captures them.",
      };
    }),
});
