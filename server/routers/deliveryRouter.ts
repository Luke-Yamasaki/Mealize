import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "@/server/trpc";

const deliveryInclude = {
  post: {
    include: { category: true },
  },
  business: true,
  nonprofit: true,
  volunteer: true,
  feedback: {
    orderBy: { createdAt: "desc" as const },
    include: {
      user: { select: { id: true, firstName: true, lastName: true } },
    },
  },
} as const;

function csvEscape(cell: string): string {
  if (/[",\r\n]/.test(cell)) {
    return `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
}

export const deliveryRouter = router({
  /** Deliveries tied to the viewer's org or where they are the volunteer. */
  listMine: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { clerkId: ctx.userId },
    });
    if (!user) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "App user profile not found.",
      });
    }
    return ctx.prisma.delivery.findMany({
      where: {
        OR: [
          { businessId: user.organizationId },
          { nonprofitId: user.organizationId },
          { userId: user.id },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: deliveryInclude,
    });
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { clerkId: ctx.userId },
      });
      if (!user) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "App user profile not found.",
        });
      }
      const row = await ctx.prisma.delivery.findUnique({
        where: { id: input.id },
        include: deliveryInclude,
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Delivery not found" });
      }
      const allowed =
        row.businessId === user.organizationId ||
        row.nonprofitId === user.organizationId ||
        row.userId === user.id;
      if (!allowed) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not allowed to view this delivery" });
      }
      return row;
    }),

  create: protectedProcedure
    .input(
      z.object({
        isDropoff: z.boolean(),
        postId: z.number().int(),
        businessId: z.number().int(),
        nonprofitId: z.number().int(),
        date: z.coerce.date(),
        time: z.string().min(1).max(50),
        completed: z.number().int().default(0),
      }),
    )
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
      return ctx.prisma.delivery.create({
        data: {
          isDropoff: input.isDropoff,
          postId: input.postId,
          userId: user.id,
          businessId: input.businessId,
          nonprofitId: input.nonprofitId,
          date: input.date,
          time: input.time,
          completed: input.completed,
        },
        include: deliveryInclude,
      });
    }),

  /** CSV of deliveries visible to the viewer (same scope as listMine). */
  exportMineCsv: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { clerkId: ctx.userId },
    });
    if (!user) {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "App user profile not found.",
      });
    }
    const rows = await ctx.prisma.delivery.findMany({
      where: {
        OR: [
          { businessId: user.organizationId },
          { nonprofitId: user.organizationId },
          { userId: user.id },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: deliveryInclude,
    });

    const header = [
      "delivery_id",
      "post_title",
      "category",
      "date",
      "time",
      "business",
      "nonprofit",
      "volunteer",
      "is_dropoff",
      "completed_code",
      "created_at",
    ];

    const lines = [
      header.join(","),
      ...rows.map((r) =>
        [
          String(r.id),
          r.post.title,
          r.post.category.category,
          r.date.toISOString().slice(0, 10),
          r.time,
          r.business.name,
          r.nonprofit.name,
          `${r.volunteer.firstName} ${r.volunteer.lastName}`,
          r.isDropoff ? "yes" : "no",
          String(r.completed),
          r.createdAt.toISOString(),
        ]
          .map((c) => csvEscape(c))
          .join(","),
      ),
    ];

    return {
      filename: `mealize-deliveries-org-${user.organizationId}.csv`,
      csv: lines.join("\n"),
    };
  }),

  submitFeedback: protectedProcedure
    .input(
      z.object({
        deliveryId: z.number().int(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().max(500).optional(),
      }),
    )
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
      const row = await ctx.prisma.delivery.findUnique({
        where: { id: input.deliveryId },
      });
      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Delivery not found" });
      }
      const allowed =
        row.businessId === user.organizationId ||
        row.nonprofitId === user.organizationId ||
        row.userId === user.id;
      if (!allowed) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not allowed to rate this delivery" });
      }

      return ctx.prisma.deliveryFeedback.upsert({
        where: {
          deliveryId_userId: { deliveryId: input.deliveryId, userId: user.id },
        },
        create: {
          deliveryId: input.deliveryId,
          userId: user.id,
          rating: input.rating,
          comment: input.comment?.trim() || null,
        },
        update: {
          rating: input.rating,
          comment: input.comment?.trim() || null,
        },
        include: {
          user: { select: { id: true, firstName: true, lastName: true } },
        },
      });
    }),
});
