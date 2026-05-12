import { TRPCError } from "@trpc/server";
import type { Prisma } from "@prisma/client";

import { mapPostListMedia } from "@/server/lib/mapPostMedia";
import { router, protectedProcedure } from "@/server/trpc";

const postInclude = {
  category: true,
  organization: {
    select: {
      id: true,
      name: true,
      logoUrl: true,
      isNonprofit: true,
      street: true,
      city: true,
      state: true,
      zip: true,
    },
  },
} as const;

type PostMatchRow = Prisma.PostGetPayload<{ include: typeof postInclude }>;

function buildWhere(args: {
  myOrgId: number;
  myIsNonprofit: boolean;
  myStateTrimmed: string;
  excludeIds: number[];
}): Prisma.PostWhereInput {
  const wantItem = args.myIsNonprofit;
  const wantOrgNonprofit = !args.myIsNonprofit;
  const state = args.myStateTrimmed;

  return {
    status: 0,
    isItem: wantItem,
    organizationId: { not: args.myOrgId },
    organization: {
      isNonprofit: wantOrgNonprofit,
      ...(state.length > 0 ? { state: { equals: state, mode: "insensitive" } } : {}),
    },
    ...(args.excludeIds.length > 0 ? { id: { notIn: args.excludeIds } } : {}),
  };
}

export const matchRouter = router({
  /**
   * Rule-based suggestions: opposite org type, open posts, prefer same state as your organization.
   * Falls back to national opposite-type listings when the state filter is too thin.
   */
  suggestedForMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { clerkId: ctx.userId },
      include: { organization: true },
    });
    if (!user) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "App user profile not found.",
      });
    }

    const myOrg = user.organization;
    const stateTrimmed = myOrg.state.trim();

    const primary = await ctx.prisma.post.findMany({
      where: buildWhere({
        myOrgId: myOrg.id,
        myIsNonprofit: myOrg.isNonprofit,
        myStateTrimmed: stateTrimmed,
        excludeIds: [],
      }),
      orderBy: { createdAt: "desc" },
      take: 18,
      include: postInclude,
    });

    let combined: PostMatchRow[] = primary;
    if (primary.length < 6 && stateTrimmed.length > 0) {
      const excludeIds = primary.map((p) => p.id);
      const fallback = await ctx.prisma.post.findMany({
        where: buildWhere({
          myOrgId: myOrg.id,
          myIsNonprofit: myOrg.isNonprofit,
          myStateTrimmed: "",
          excludeIds,
        }),
        orderBy: { createdAt: "desc" },
        take: 18,
        include: postInclude,
      });
      const seen = new Set(primary.map((p) => p.id));
      combined = [...primary];
      for (const row of fallback) {
        if (combined.length >= 18) break;
        if (!seen.has(row.id)) {
          seen.add(row.id);
          combined.push(row);
        }
      }
    }

    const caption =
      stateTrimmed.length > 0
        ? `Open listings from ${myOrg.isNonprofit ? "businesses" : "nonprofits"} in ${stateTrimmed}, with a wider match if the local pool is small.`
        : `Open listings from ${myOrg.isNonprofit ? "businesses" : "nonprofits"} (add a state on your organization profile for tighter local matching).`;

    return {
      caption,
      state: stateTrimmed || null,
      posts: mapPostListMedia(combined),
    };
  }),
});
