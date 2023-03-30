import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({

  getUsers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany();
  }),

  getUserByUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        username: input,
      }
    });
  }),

  getUserByUsernameMut: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.user.findMany({
     where: {
      username: input
     } 
   })
 }),

 getUserFollowers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.user.count({
    where: {
      following: {
        some: {
          followingId: input
        }
      }
    }
  });
}),

 getUserFollowing: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  return ctx.prisma.user.count({
    where: {
      followers: {
        some: {
          followerId: input
        }
      }
    }
  });
}),
 
});