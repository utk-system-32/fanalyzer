import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const followRouter = createTRPCRouter({
  followUser: publicProcedure
   .input(z.object({ user: z.string() }))
   .mutation(({ ctx, input }) => {
    return ctx.prisma.follows.create({
      data: {
        follower: { connect: { id: ctx.session?.user?.id } },
        following: { connect: { id: input.user } },
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