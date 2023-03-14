import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

  createPost: publicProcedure
   .input(z.object({ title: z.string(), content: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.post.create({
      data: {
        authorId: ctx.session?.user?.id,
        title: input.title,
        content: input.content,
      }
    })
  }),

  getByUser: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      where: {
        authorId: ctx.session?.user?.id,
      }
    });
  })
});