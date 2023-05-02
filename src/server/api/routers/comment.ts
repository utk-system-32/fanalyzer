import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({

  createComment: publicProcedure
   .input(z.object({ postId: z.string(), comment: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.comment.create({
      data: {
        authorId: ctx.session?.user?.id,
        postId: input.postId,
        comment: input.comment,
      }
    })
  }),

  deletePostComments: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.comment.deleteMany({
     where: {
       postId: input
     }
   })
 }),

  getComments: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
    return ctx.prisma.comment.findMany({
      where: {
        postId: input
      },
      include: { 
        author: true 
      }
    });
  }),

  getComment: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.comment.findMany({
      where: {
        postId: input
      },
      include: { 
        author: true 
      }
    });
  }),
});