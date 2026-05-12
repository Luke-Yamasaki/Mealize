import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { prisma } from "@/lib/prisma";

export async function createTRPCContext(opts: {
  headers: Headers;
  userId: string | null;
}) {
  return {
    prisma,
    userId: opts.userId,
  };
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
