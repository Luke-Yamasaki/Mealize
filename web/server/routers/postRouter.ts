import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const postRouter = router({
  list: publicProcedure.query(({ ctx }) =>
    ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        organization: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            isNonprofit: true,
          },
        },
      },
    }),
  ),

  create: protectedProcedure
    .input(
      z.object({
        isItem: z.boolean(),
        organizationId: z.number().int(),
        title: z.string().min(1).max(25),
        description: z.string().min(1).max(120),
        quantity: z.string().min(1).max(12),
        categoryId: z.number().int(),
        imageUrl: z.string().url().max(2048),
        expDate: z.coerce.date(),
        status: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { clerkId: ctx.userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "App user profile not found. Call user.ensureProfile after sign-up or configure the Clerk webhook.",
        });
      }
      return ctx.prisma.post.create({
        data: {
          ...input,
          userId: user.id,
        },
        include: { category: true },
      });
    }),
});
