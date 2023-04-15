import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const followRouter = createTRPCRouter({
  followUser: publicProcedure
   .input(z.string())
   .mutation(({ ctx, input }) => {
    return ctx.prisma.follows.create({
      data: {
        follower: { 
          connect: { 
            id: ctx.session?.user?.id 
          } 
        },
        following: { 
          connect: { 
            id: input
          } 
        },
      }
    })
  }),

  unfollowUser: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.follows.deleteMany({
    where: {
      followerId: ctx.session?.user?.id,
      followingId: input
    },
 }) 
}),

  userIsFollowing: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.follows.findMany({
      where: {
        followerId: ctx.session?.user?.id,
        followingId: input
      }
    });
  }),

});