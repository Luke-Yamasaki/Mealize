import { router } from "@/server/trpc";
import { categoryRouter } from "@/server/routers/categoryRouter";
import { postRouter } from "@/server/routers/postRouter";
import { uploadRouter } from "@/server/routers/uploadRouter";
import { userRouter } from "@/server/routers/userRouter";

export const appRouter = router({
  category: categoryRouter,
  post: postRouter,
  upload: uploadRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
