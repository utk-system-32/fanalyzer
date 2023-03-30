import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({

  getUsers: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany();
  }),

  getUserById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findMany({
      where: {
        id: input,
      }
    });
  }),

  getIdByUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({
      where: {
        username: input,
      }
    });
  }),

  getUserByUsername: publicProcedure
  .input(z.string())
  .mutation(({ ctx, input }) => {
   return ctx.prisma.user.findMany({
     where: {
      username: input
     } 
   })
 }),
});