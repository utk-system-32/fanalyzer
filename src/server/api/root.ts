import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { followRouter } from "./routers/follow";
import { visualizationRouter } from "./routers/visualization";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  follow: followRouter,
  visualization: visualizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
