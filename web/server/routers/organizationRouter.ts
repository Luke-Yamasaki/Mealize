import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "@/server/trpc";

export const organizationRouter = router({
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
      return org;
    }),
});
