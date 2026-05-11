import { z } from "zod";

import { router, protectedProcedure } from "@/server/trpc";

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.user.findUnique({
      where: { clerkId: ctx.userId },
      include: {
        organization: true,
        favorites: true,
      },
    }),
  ),

  /** Creates the domain user row after Clerk sign-up (until a dedicated onboarding flow exists). */
  ensureProfile: protectedProcedure
    .input(
      z.object({
        organizationId: z.number().int(),
        isNonprofit: z.boolean(),
        isManager: z.boolean(),
        firstName: z.string().min(1).max(50),
        lastName: z.string().min(1).max(50),
        email: z.string().email(),
        phone: z.string().min(10).max(20),
        dob: z.coerce.date(),
        profileImageUrl: z.string().url().max(2048),
        deaf: z.boolean().optional(),
        wheelchair: z.boolean().optional(),
        learningDisabled: z.boolean().optional(),
        lgbtq: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.prisma.user.upsert({
        where: { clerkId: ctx.userId },
        create: {
          clerkId: ctx.userId,
          ...input,
        },
        update: {
          organizationId: input.organizationId,
          isNonprofit: input.isNonprofit,
          isManager: input.isManager,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          dob: input.dob,
          profileImageUrl: input.profileImageUrl,
          deaf: input.deaf,
          wheelchair: input.wheelchair,
          learningDisabled: input.learningDisabled,
          lgbtq: input.lgbtq,
        },
        include: { organization: true, favorites: true },
      }),
    ),
});
