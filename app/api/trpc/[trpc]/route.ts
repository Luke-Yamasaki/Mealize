import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { auth } from "@clerk/nextjs/server";

import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";

export const runtime = "nodejs";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const { userId } = await auth();
      return createTRPCContext({ headers: req.headers, userId });
    },
  });
}

export { handler as GET, handler as POST };
