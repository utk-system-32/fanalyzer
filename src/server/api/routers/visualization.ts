import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const visualizationRouter = createTRPCRouter({
  createVisualization: publicProcedure
    .input(z.object({ title: z.string(), data: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.visualization.create({
        data: {
          authorId: ctx.session?.user?.id,
          name: input.title,
          data: input.data,
        },
      });
    }),

    deleteVisualization: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
     return ctx.prisma.visualization.delete({
       where: {
         id: input
       }
     })
   }),

    getUserVisualizations: publicProcedure.input(z.string()).query(({ ctx, input }) => {
      return ctx.prisma.visualization.findMany({
          where: {
            authorId: ctx.session?.user?.id
          },
          orderBy: {
            id: 'desc',
          },
      });
    }),
});
