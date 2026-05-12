import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { mapUserWithDemoMedia } from "@/server/lib/mapUserMedia";
import { router, protectedProcedure } from "@/server/trpc";

const userInclude = {
  organization: true,
  favorites: {
    include: {
      post: true,
    },
  },
} as const;

export const favoriteRouter = router({
  add: protectedProcedure
    .input(z.object({ postId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { clerkId: ctx.userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "App user profile not found.",
        });
      }
      const existing = await ctx.prisma.favorite.findFirst({
        where: { userId: user.id, postId: input.postId },
      });
      if (existing) {
        const full = await ctx.prisma.user.findUnique({
          where: { id: user.id },
          include: userInclude,
        });
        return mapUserWithDemoMedia(full!);
      }
      await ctx.prisma.favorite.create({
        data: { userId: user.id, postId: input.postId },
      });
      const full = await ctx.prisma.user.findUnique({
        where: { id: user.id },
        include: userInclude,
      });
      return mapUserWithDemoMedia(full!);
    }),

  removeByPostId: protectedProcedure
    .input(z.object({ postId: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { clerkId: ctx.userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "App user profile not found.",
        });
      }
      await ctx.prisma.favorite.deleteMany({
        where: { userId: user.id, postId: input.postId },
      });
      const full = await ctx.prisma.user.findUnique({
        where: { id: user.id },
        include: userInclude,
      });
      return mapUserWithDemoMedia(full!);
    }),
});
