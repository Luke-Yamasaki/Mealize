import { router, publicProcedure } from "@/server/trpc";

export const categoryRouter = router({
  list: publicProcedure.query(({ ctx }) =>
    ctx.prisma.category.findMany({
      orderBy: { id: "asc" },
    }),
  ),
});
