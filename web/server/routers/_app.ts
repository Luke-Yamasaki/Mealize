import { router } from "@/server/trpc";
import { categoryRouter } from "@/server/routers/categoryRouter";
import { deliveryRouter } from "@/server/routers/deliveryRouter";
import { favoriteRouter } from "@/server/routers/favoriteRouter";
import { messageRouter } from "@/server/routers/messageRouter";
import { organizationRouter } from "@/server/routers/organizationRouter";
import { postRouter } from "@/server/routers/postRouter";
import { uploadRouter } from "@/server/routers/uploadRouter";
import { userRouter } from "@/server/routers/userRouter";

export const appRouter = router({
  category: categoryRouter,
  delivery: deliveryRouter,
  favorite: favoriteRouter,
  message: messageRouter,
  organization: organizationRouter,
  post: postRouter,
  upload: uploadRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
