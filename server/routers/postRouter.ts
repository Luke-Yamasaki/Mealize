import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { mapPostListMedia } from "@/server/lib/mapPostMedia";
import { router, publicProcedure, protectedProcedure } from "@/server/trpc";

export const postRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const row = await ctx.prisma.post.findUnique({
        where: { id: input.id },
        include: {
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
        },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      const out = mapPostListMedia([row]);
      return out[0];
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
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
      },
    });
    return mapPostListMedia(rows);
  }),

  /** Title/description substring search (legacy `/search/:searchword`). */
  search: publicProcedure
    .input(z.object({ q: z.string().min(1).max(200) }))
    .query(async ({ ctx, input }) => {
      const q = input.q.trim();
      const rows = await ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
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
        },
      });
      return mapPostListMedia(rows);
    }),

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
